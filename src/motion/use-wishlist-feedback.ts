"use client";

/**
 * src/motion/use-wishlist-feedback.ts
 *
 * A small, restrained acknowledgment for a wishlist toggle control that has
 * just been *saved* (never on the remove transition, and never on the first
 * render that merely reflects localStorage-hydrated state) — the same idea
 * as the existing `count-badge--pulse` cart-badge acknowledgment in
 * globals.css, expressed here as a GSAP tween so it stays consistent with
 * the rest of this directory's token-driven, `gsap.context()`-scoped
 * approach rather than introducing a second, CSS-`@keyframes`-based
 * pattern for one control.
 *
 * Contract for consumers:
 *
 *   const heartRef = useRef<HTMLButtonElement>(null);
 *   useWishlistFeedback(heartRef, wishlist.includes(product.id));
 *
 *   <button ref={heartRef} aria-pressed={saved} onClick={...}>...</button>
 *
 * - `saved` must be the live, reactive "is this item currently saved"
 *   boolean the caller already renders from (e.g. `wishlist.includes(id)`).
 * - The hook tracks the *previous* value of `saved` itself and only plays
 *   the acknowledgment on a genuine `false -> true` transition. The very
 *   first effect run after mount only records the starting value — it never
 *   animates — so a page that loads with the item already saved (wishlist
 *   state hydrated from localStorage after mount) never flashes on load.
 * - No-op under `prefers-reduced-motion: reduce`; the final state (no
 *   transform) is identical either way since this hook never sets a resting
 *   transform, only a transient one that resolves back to the default.
 */

import gsap from "gsap";
import { useEffect, useRef, type RefObject } from "react";
import {
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_QUERY,
  MOTION_SCALE,
} from "./tokens";

export function useWishlistFeedback(
  buttonRef: RefObject<HTMLElement | null>,
  saved: boolean,
) {
  const prevSavedRef = useRef<boolean | null>(null);

  useEffect(() => {
    const wasSaved = prevSavedRef.current;
    prevSavedRef.current = saved;

    // First run (mount / hydration) or no change: nothing to acknowledge.
    if (wasSaved === null || wasSaved === saved || !saved) return;

    const button = buttonRef.current;
    if (!button) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia(MOTION_QUERY.reducedMotion).matches
    ) {
      return;
    }

    gsap.fromTo(
      button,
      { scale: 1 },
      {
        scale: MOTION_SCALE.emphasis,
        duration: MOTION_DURATION.feedback,
        ease: MOTION_EASE.emphasis,
        yoyo: true,
        repeat: 1,
        clearProps: "scale",
      },
    );
  }, [saved, buttonRef]);
}
