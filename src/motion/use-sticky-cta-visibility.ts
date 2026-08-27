"use client";

/**
 * src/motion/use-sticky-cta-visibility.ts
 *
 * R2B2F-POLISH fix 4/7: native `position: sticky; bottom: 0` on
 * `.purchase-actions` (see the "Mobile sticky price + Add to Cart bar"
 * comment block in globals.css) activates the moment the element's static
 * flow position is geometrically close enough to the viewport bottom —
 * which, on a compact single-variant PDP, is almost immediately. The
 * stuck bar then paints its own stacking context on top of whatever
 * static content (quantity stepper, availability status) happens to sit
 * at those same screen coordinates, since sticky never reserves extra
 * space for the siblings it visually covers. That is the exact
 * "overlapping the product panel" defect the external review flagged —
 * confirmed by inspecting live layout, not just the screenshot evidence.
 *
 * The fix: stop relying on CSS's own activation heuristic. A zero-height
 * sentinel sits at the CTA's natural position (immediately before it in
 * the DOM); once the sentinel has genuinely scrolled above the viewport
 * — i.e. the shopper has scrolled past where the button actually lives —
 * this hook flips `pinned`, and only then does the CTA switch to
 * `position: fixed` (see `.purchase-actions[data-pinned="true"]` in
 * globals.css). A second observer on `.site-footer` forces `pinned` back
 * to false once the footer is in view, so the bar releases before it
 * either covers the footer or duplicates content already on screen.
 *
 * Desktop and reduced-motion are irrelevant here — this hook only ever
 * runs its observers inside the `(max-width: 640px)` match, mirroring
 * every other mobile-only behaviour in this codebase.
 */

import { useEffect, useRef, useState, type RefObject } from "react";

export function useStickyCtaVisibility(
  sentinelRef: RefObject<HTMLElement | null>,
) {
  const [pinned, setPinned] = useState(false);
  const stateRef = useRef({ pastNaturalPosition: false, footerVisible: false });

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const mobileQuery = window.matchMedia("(max-width: 640px)");
    const state = stateRef.current;
    const recompute = () =>
      setPinned(state.pastNaturalPosition && !state.footerVisible);

    let sentinelObserver: IntersectionObserver | undefined;
    let footerObserver: IntersectionObserver | undefined;

    const attach = () => {
      if (!mobileQuery.matches) return;

      sentinelObserver = new IntersectionObserver(
        ([entry]) => {
          // Scrolled past = the sentinel's own box has moved above the
          // viewport's top edge (not just "not intersecting", which is
          // also true before the page has scrolled at all).
          state.pastNaturalPosition =
            !entry.isIntersecting && entry.boundingClientRect.top < 0;
          recompute();
        },
        { threshold: 0 },
      );
      sentinelObserver.observe(sentinel);

      const footer = document.querySelector(".site-footer");
      if (footer) {
        footerObserver = new IntersectionObserver(
          ([entry]) => {
            state.footerVisible = entry.isIntersecting;
            recompute();
          },
          { threshold: 0 },
        );
        footerObserver.observe(footer);
      }
    };

    const detach = () => {
      sentinelObserver?.disconnect();
      footerObserver?.disconnect();
      sentinelObserver = undefined;
      footerObserver = undefined;
      state.pastNaturalPosition = false;
      state.footerVisible = false;
      setPinned(false);
    };

    attach();
    const handleChange = () => {
      detach();
      attach();
    };
    mobileQuery.addEventListener("change", handleChange);

    return () => {
      mobileQuery.removeEventListener("change", handleChange);
      detach();
    };
  }, [sentinelRef]);

  return pinned;
}
