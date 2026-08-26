"use client";

/**
 * src/motion/use-hero-parallax.ts
 *
 * Implements Motion_3D_Specification.md §4 — Storyboard A, the homepage
 * hero's bounded 2.5D pointer-parallax + depth-staggered entrance.
 *
 * Contract for consumers (documented here since the hook is imported by
 * another workstream's component, not wired up by this file):
 *
 *   <section ref={heroRef} className="hero-collage">
 *     <img data-parallax-layer="z2" ... />   // primary/LCP image, minimal travel
 *     <img data-parallax-layer="z3" ... />   // secondary media (may be 2 elements)
 *     <img data-parallax-layer="z3" ... />
 *     <img data-parallax-layer="z4" ... />   // foreground accent, largest travel
 *   </section>
 *
 *   useHeroParallax(heroRef);
 *
 * - `data-parallax-layer="z2"|"z3"|"z4"` is the attribute convention this
 *   hook reads. Zero matches for any of the three is a safe no-op (GSAP's
 *   own selector resolution handles it) — do not assert non-zero counts.
 * - Mobile layout only renders 2 of these tags (z2 + z4); the hook adapts
 *   automatically since it queries by attribute, not by an expected count.
 * - This hook never gates, delays, or reads any commerce/cart state — it is
 *   purely decorative and purely scoped to `containerRef`'s own DOM subtree.
 *   Do not await anything this hook exports; it exports nothing to await.
 */

import gsap from "gsap";
import { useLayoutEffect, type RefObject } from "react";
import {
  HERO_ENTRY_PHASE_SEC,
  HERO_PARALLAX_COEFFICIENT,
  HERO_PARALLAX_MAX_PX,
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_OPACITY_SOFT,
  MOTION_QUERY,
} from "./tokens";

const SELECTOR = {
  z2: '[data-parallax-layer="z2"]',
  z3: '[data-parallax-layer="z3"]',
  z4: '[data-parallax-layer="z4"]',
} as const;

const RESTING_ROTATE_DEG = -6;
const ENTRY_ROTATE_START_DEG = -8;

export function useHeroParallax(containerRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    // Safety contract point 1: no-op if the ref isn't populated yet.
    if (!containerRef.current) return;

    const ctx = gsap.context((self) => {
      const mm = gsap.matchMedia();

      // Safety contract point 2: reduced-motion is gated independently,
      // inside this hook's own gsap.context(), via context.matchMedia().
      mm.add(
        {
          reduce: MOTION_QUERY.reducedMotion,
          mobile: MOTION_QUERY.mobile,
          pointerCapable: MOTION_QUERY.finePointerHover,
        },
        (context) => {
          const { reduce, mobile, pointerCapable } = context.conditions as {
            reduce: boolean;
            mobile: boolean;
            pointerCapable: boolean;
          };

          const z2 = self?.selector?.(SELECTOR.z2) ?? [];
          const z3 = self?.selector?.(SELECTOR.z3) ?? [];
          const z4 = self?.selector?.(SELECTOR.z4) ?? [];

          if (reduce) {
            // Full final composition renders immediately. The mousemove
            // listener is never attached at all (we return here, before
            // any pointer handler is registered below).
            gsap.set([z2, z3, z4], { x: 0, y: 0, opacity: 1, clearProps: "rotate" });
            return;
          }

          // ENTRY: depth-staggered settle, runs once regardless of breakpoint.
          const entryDistance = mobile ? HERO_PARALLAX_MAX_PX.mobile : undefined;
          gsap.fromTo(
            z2,
            { y: entryDistance ?? 6, opacity: MOTION_OPACITY_SOFT },
            {
              y: 0,
              opacity: 1,
              duration: HERO_ENTRY_PHASE_SEC.z2.end - HERO_ENTRY_PHASE_SEC.z2.start,
              delay: HERO_ENTRY_PHASE_SEC.z2.start,
              ease: MOTION_EASE.enter,
            },
          );
          if (!mobile) {
            gsap.fromTo(
              z3,
              { y: 10, opacity: MOTION_OPACITY_SOFT },
              {
                y: 0,
                opacity: 1,
                duration: HERO_ENTRY_PHASE_SEC.z3.end - HERO_ENTRY_PHASE_SEC.z3.start,
                delay: HERO_ENTRY_PHASE_SEC.z3.start,
                ease: MOTION_EASE.enter,
              },
            );
          }
          gsap.fromTo(
            z4,
            {
              y: entryDistance ?? 14,
              opacity: MOTION_OPACITY_SOFT,
              rotate: mobile ? RESTING_ROTATE_DEG : ENTRY_ROTATE_START_DEG,
            },
            {
              y: 0,
              opacity: 1,
              rotate: RESTING_ROTATE_DEG,
              duration: HERO_ENTRY_PHASE_SEC.z4.end - HERO_ENTRY_PHASE_SEC.z4.start,
              delay: HERO_ENTRY_PHASE_SEC.z4.start,
              ease: MOTION_EASE.enter,
            },
          );

          // BUILD/PEAK: desktop pointer-driven parallax only. Mobile and
          // narrow-desktop/tablet (no hover) never attach a mousemove
          // listener at all — ENTRY-only for those breakpoints.
          if (mobile || !pointerCapable) return;

          const container = containerRef.current;
          if (!container) return;

          const quickZ2X = gsap.quickTo(z2, "x", { duration: 0.4, ease: MOTION_EASE.standard });
          const quickZ2Y = gsap.quickTo(z2, "y", { duration: 0.4, ease: MOTION_EASE.standard });
          const quickZ3X = gsap.quickTo(z3, "x", { duration: 0.4, ease: MOTION_EASE.standard });
          const quickZ3Y = gsap.quickTo(z3, "y", { duration: 0.4, ease: MOTION_EASE.standard });
          const quickZ4X = gsap.quickTo(z4, "x", { duration: 0.4, ease: MOTION_EASE.standard });
          const quickZ4Y = gsap.quickTo(z4, "y", { duration: 0.4, ease: MOTION_EASE.standard });

          const clamp = (value: number, max: number) => Math.max(-max, Math.min(max, value));

          const onMouseMove = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relX = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            const relY = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);

            quickZ2X(clamp(relX * HERO_PARALLAX_MAX_PX.z2 * HERO_PARALLAX_COEFFICIENT.z2, HERO_PARALLAX_MAX_PX.z2));
            quickZ2Y(clamp(relY * HERO_PARALLAX_MAX_PX.z2 * HERO_PARALLAX_COEFFICIENT.z2, HERO_PARALLAX_MAX_PX.z2));
            quickZ3X(clamp(relX * HERO_PARALLAX_MAX_PX.z3 * HERO_PARALLAX_COEFFICIENT.z3, HERO_PARALLAX_MAX_PX.z3));
            quickZ3Y(clamp(relY * HERO_PARALLAX_MAX_PX.z3 * HERO_PARALLAX_COEFFICIENT.z3, HERO_PARALLAX_MAX_PX.z3));
            quickZ4X(clamp(relX * HERO_PARALLAX_MAX_PX.z4 * HERO_PARALLAX_COEFFICIENT.z4, HERO_PARALLAX_MAX_PX.z4));
            quickZ4Y(clamp(relY * HERO_PARALLAX_MAX_PX.z4 * HERO_PARALLAX_COEFFICIENT.z4, HERO_PARALLAX_MAX_PX.z4));

            gsap.set([z2, z3, z4], { willChange: "transform" });
          };

          const resetLayers = () => {
            gsap.to([z2, z3, z4], {
              x: 0,
              y: 0,
              duration: MOTION_DURATION.local,
              ease: MOTION_EASE.standard,
              overwrite: true,
              onComplete: () => gsap.set([z2, z3, z4], { clearProps: "willChange" }),
            });
          };

          container.addEventListener("mousemove", onMouseMove);
          container.addEventListener("mouseleave", resetLayers);

          // Context-scoped cleanup for this specific matchMedia branch —
          // torn down automatically whenever this branch stops matching
          // (resize/orientation change) or the whole context reverts.
          return () => {
            container.removeEventListener("mousemove", onMouseMove);
            container.removeEventListener("mouseleave", resetLayers);
            gsap.set([z2, z3, z4], { clearProps: "willChange" });
          };
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}
