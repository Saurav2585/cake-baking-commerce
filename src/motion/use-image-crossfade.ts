"use client";

/**
 * src/motion/use-image-crossfade.ts
 *
 * Implements Motion_3D_Specification.md §6 — Storyboard C, the PDP
 * variant-owned atomic pack crossfade, replacing a hard-cut `key`-remount
 * (e.g. `product-detail.tsx`'s current `<Image key={media.src} .../>`)
 * with a coordinated, interruption-safe crossfade of the image plus any
 * paired fact-panel text.
 *
 * Contract for consumers (this hook does not render anything itself):
 *
 *   const primaryRef = useRef<HTMLDivElement>(null);
 *   useImageCrossfade(primaryRef, variant.id); // or media.src — any string
 *                                               // that changes exactly when
 *                                               // the pack selection changes
 *
 *   <div ref={primaryRef} className="pdp-primary-region">
 *     <div className="pdp-primary">
 *       <Image key={media.src} data-crossfade-image src={media.src} ... />
 *     </div>
 *     <div data-crossfade-with>
 *       <p className="pdp-price">{formatINR(variant.price_inr_minor)}</p>
 *       <p>{variant.normalized_sell_quantity.display_label}</p>
 *     </div>
 *   </div>
 *
 * Required consumer contract (documented here because this hook cannot
 * enforce it at the type level):
 *  - The single element tagged `data-crossfade-image` MUST be given a React
 *    `key` derived from `activeKey` (exactly as `product-detail.tsx` already
 *    does with `key={media.src}`), so React mounts a genuinely new DOM node
 *    per key rather than mutating one node's attributes in place. This hook
 *    captures a *live reference* to the outgoing node while it is still
 *    current, then re-inserts that exact node as a faded-out overlay when a
 *    new key arrives — this only works if the old node is a distinct object
 *    the browser hasn't already mutated to the new content.
 *  - Any number of `data-crossfade-with` elements, nested anywhere inside
 *    `containerRef`, crossfade (opacity only) in the same 220ms window —
 *    generic, no fixed count assumed.
 *  - `data-crossfade-image`'s nearest positioned ancestor must be the
 *    reserved, fixed-size frame (`.pdp-primary` in the existing codebase)
 *    so the re-inserted outgoing overlay lays exactly on top of the
 *    incoming image with zero CLS, per Motion_Performance_Budget.md's CLS
 *    ceiling of 0.000 for this region.
 *
 * Interruption contract (the reason this is GSAP, not a CSS transition):
 * if `activeKey` changes again before the current crossfade finishes, the
 * in-flight timeline is killed immediately and a new crossfade starts from
 * whatever opacity/scale the layers are currently at, resolving to the
 * latest `activeKey` — never queued, never settling on an abandoned
 * intermediate key.
 */

import gsap from "gsap";
import { useLayoutEffect, useRef, type RefObject } from "react";
import {
  CROSSFADE_DURATION_SEC,
  MOTION_EASE,
  MOTION_OPACITY_SOFT,
  MOTION_QUERY,
  MOTION_SCALE,
} from "./tokens";

const IMAGE_SELECTOR = "[data-crossfade-image]";
const WITH_SELECTOR = "[data-crossfade-with]";

interface CrossfadeState {
  key: string;
  imageNode: HTMLElement | null;
}

export function useImageCrossfade(
  containerRef: RefObject<HTMLElement | null>,
  activeKey: string,
) {
  const conditionsRef = useRef({ reduce: false, coarse: false });
  const stateRef = useRef<CrossfadeState | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // One-time (per mount) context: tracks reduced-motion / coarse-pointer
  // conditions reactively via context.matchMedia(), independent of any
  // other hook's reduced-motion check. Reverted only on unmount.
  useLayoutEffect(() => {
    // Safety contract point 1: no-op if the ref isn't populated yet.
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: MOTION_QUERY.reducedMotion,
          coarse: MOTION_QUERY.coarsePointer,
        },
        (context) => {
          const { reduce, coarse } = context.conditions as {
            reduce: boolean;
            coarse: boolean;
          };
          conditionsRef.current = { reduce, coarse };
        },
      );
    }, containerRef);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      // Remove any outgoing overlay left mid-flight so a rapid
      // mount/unmount/remount (React 19 Strict Mode) never leaks a node.
      const outgoing = stateRef.current?.imageNode;
      if (outgoing?.parentElement && outgoing.hasAttribute("aria-hidden")) {
        outgoing.remove();
      }
      stateRef.current = null;
      ctx.revert();
    };
  }, [containerRef]);

  // Per-activeKey crossfade trigger.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const currentImage = container.querySelector<HTMLElement>(IMAGE_SELECTOR);
    const withEls = Array.from(
      container.querySelectorAll<HTMLElement>(WITH_SELECTOR),
    );
    const prev = stateRef.current;

    // Interruption contract: a new activeKey always kills the prior
    // in-flight tween first, never queues behind it.
    timelineRef.current?.kill();
    timelineRef.current = null;

    if (!prev || prev.key === activeKey) {
      // First run, or activeKey unchanged: nothing to crossfade — settle
      // to final state and record this content as the next baseline.
      if (currentImage)
        gsap.set(currentImage, { opacity: 1, clearProps: "scale" });
      if (withEls.length) gsap.set(withEls, { opacity: 1 });
      stateRef.current = { key: activeKey, imageNode: currentImage };
      return;
    }

    const { reduce, coarse } = conditionsRef.current;
    const outgoing = prev.imageNode;

    if (reduce || !outgoing) {
      // Immediate atomic replacement: no crossfade, no scale — matches
      // exactly the content the animated version eventually settles into.
      if (outgoing?.parentElement) outgoing.remove();
      if (currentImage)
        gsap.set(currentImage, { opacity: 1, clearProps: "scale" });
      if (withEls.length) gsap.set(withEls, { opacity: 1 });
      stateRef.current = { key: activeKey, imageNode: currentImage };
      return;
    }

    // Re-attach the captured outgoing node as an absolutely-positioned
    // overlay so it can fade out while the already-rendered incoming node
    // fades in, both inside the same reserved frame (zero CLS).
    if (
      currentImage?.parentElement &&
      !currentImage.parentElement.contains(outgoing)
    ) {
      outgoing.setAttribute("aria-hidden", "true");
      outgoing.style.position = "absolute";
      outgoing.style.inset = "0";
      outgoing.style.pointerEvents = "none";
      outgoing.style.margin = "0";
      currentImage.parentElement.appendChild(outgoing);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        outgoing.remove();
        if (timelineRef.current === tl) timelineRef.current = null;
      },
    });
    timelineRef.current = tl;

    if (currentImage) {
      tl.fromTo(
        currentImage,
        { opacity: 0, scale: coarse ? 1 : MOTION_SCALE.enter },
        {
          opacity: 1,
          scale: 1,
          duration: CROSSFADE_DURATION_SEC,
          ease: MOTION_EASE.standard,
        },
        0,
      );
    }
    tl.to(
      outgoing,
      {
        opacity: 0,
        duration: CROSSFADE_DURATION_SEC,
        ease: MOTION_EASE.standard,
      },
      0,
    );
    if (withEls.length) {
      tl.fromTo(
        withEls,
        { opacity: MOTION_OPACITY_SOFT },
        {
          opacity: 1,
          duration: CROSSFADE_DURATION_SEC,
          ease: MOTION_EASE.standard,
        },
        0,
      );
    }

    stateRef.current = { key: activeKey, imageNode: currentImage };
  }, [containerRef, activeKey]);
}
