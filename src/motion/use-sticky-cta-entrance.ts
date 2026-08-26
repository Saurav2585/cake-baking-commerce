"use client";

/**
 * src/motion/use-sticky-cta-entrance.ts
 *
 * A subtle first-mount entrance for the mobile sticky price + Add-to-Cart
 * bar (Role 4's `.buy-panel > .purchase-actions`, which only becomes
 * `position: sticky; bottom: 0` at the `(max-width: 640px)` breakpoint —
 * see the "Mobile sticky price + Add to Cart bar" comment block in
 * globals.css's `===== R2B2F PDP and Commerce =====` section). A short
 * translate-up-and-settle so the bar reads as a deliberately staged piece
 * of the page rather than an abrupt layout artifact, gated the same way
 * every other hook in this directory is gated:
 *
 *   - `gsap.matchMedia()`, scoped to this hook's own `gsap.context()`.
 *   - Desktop (the bar is never sticky there) never animates at all.
 *   - `prefers-reduced-motion: reduce` never animates at all — the bar
 *     renders directly into its final resting position/opacity, identical
 *     to the post-animation state on every other breakpoint.
 *
 * Contract for consumers:
 *
 *   const ctaRef = useRef<HTMLDivElement>(null);
 *   useStickyCtaEntrance(ctaRef);
 *
 *   <div ref={ctaRef} className="purchase-actions" ...>...</div>
 *
 * This hook never gates, delays, or reads any commerce/cart state — like
 * `useHeroParallax`/`useGroupedReveal`, it is purely decorative and scoped
 * to `ctaRef`'s own element.
 */

import gsap from "gsap";
import { useLayoutEffect, type RefObject } from "react";
import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_OPACITY_SOFT,
  MOTION_QUERY,
} from "./tokens";

export function useStickyCtaEntrance(ctaRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    // Safety contract point 1: no-op if the ref isn't populated yet.
    if (!ctaRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Safety contract point 2: reduced-motion gated independently, inside
      // this hook's own gsap.context(), via context.matchMedia().
      mm.add(
        { reduce: MOTION_QUERY.reducedMotion, mobile: MOTION_QUERY.mobile },
        (context) => {
          const { reduce, mobile } = context.conditions as {
            reduce: boolean;
            mobile: boolean;
          };

          // Desktop never renders the bar as sticky at all — no entrance
          // needed. Reduced-motion: final composition renders immediately,
          // no transform/opacity is ever set here so the DOM's own resting
          // state is already correct.
          if (reduce || !mobile) return;

          const el = ctaRef.current;
          if (!el) return;

          gsap.fromTo(
            el,
            { y: MOTION_DISTANCE.small, opacity: MOTION_OPACITY_SOFT },
            {
              y: 0,
              opacity: 1,
              duration: MOTION_DURATION.overlay,
              ease: MOTION_EASE.enter,
              clearProps: "transform,opacity",
            },
          );
        },
      );
    }, ctaRef);

    return () => ctx.revert();
  }, [ctaRef]);
}
