"use client";

/**
 * src/motion/use-grouped-reveal.ts
 *
 * Implements Motion_3D_Specification.md §5 — Storyboard B, the department
 * atlas paired-group entrance and the product-rail single-group settle.
 *
 * Contract for consumers:
 *
 *   useGroupedReveal(sectionRef, { groupSelector: "[data-reveal-group]" });
 *
 * - `groupSelector` must match one element PER GROUP that should settle as
 *   one unit — e.g. a wrapper around a tile pair, or a whole `.rp-rail`
 *   container. **Never point `groupSelector` at individual cards/tiles** —
 *   this hook staggers between matched groups, never between elements
 *   within a group; that split is a hard rule from Motion_3D_Specification.md
 *   §5 ("never stagger result cards"), not a caller preference this hook
 *   can be configured around.
 * - `itemSelector` (optional) lets a group's *visual* children be the
 *   animated targets instead of the group wrapper itself (useful when the
 *   wrapper is a non-visual grouping element). All elements matched by
 *   `itemSelector` within one group animate together, concurrently, with
 *   no internal stagger — only the per-group timing is staggered.
 * - One IntersectionObserver is created per hook call (i.e. per region),
 *   never one per card/tile, per Motion_Performance_Budget.md §3.
 * - A group already visible in the viewport at mount/subscribe time (tall
 *   viewport, back/forward restoration) settles immediately with no delay
 *   and does not replay later.
 */

import gsap from "gsap";
import { useLayoutEffect, type RefObject } from "react";
import {
  GROUPED_REVEAL_THRESHOLD,
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_OPACITY_SOFT,
  MOTION_QUERY,
  MOTION_STAGGER,
} from "./tokens";

export interface UseGroupedRevealOptions {
  /** Selector matching one element per animated GROUP (never per card). */
  groupSelector: string;
  /** Optional selector, scoped within each group, for the actual animated targets. */
  itemSelector?: string;
}

export function useGroupedReveal(
  containerRef: RefObject<HTMLElement | null>,
  options: UseGroupedRevealOptions,
) {
  const { groupSelector, itemSelector } = options;

  useLayoutEffect(() => {
    // Safety contract point 1: no-op if the ref isn't populated yet.
    if (!containerRef.current) return;

    const ctx = gsap.context((self) => {
      const mm = gsap.matchMedia();

      // Safety contract point 2: reduced-motion gated independently, inside
      // this hook's own gsap.context(), via context.matchMedia().
      mm.add({ reduce: MOTION_QUERY.reducedMotion }, (context) => {
        const { reduce } = context.conditions as { reduce: boolean };
        const groups = (self?.selector?.(groupSelector) ?? []) as Element[];

        const targetsFor = (group: Element) =>
          itemSelector
            ? Array.from(group.querySelectorAll(itemSelector))
            : [group];

        if (reduce) {
          // Static final state; IntersectionObserver is never attached.
          groups.forEach((group) =>
            gsap.set(targetsFor(group), { y: 0, opacity: 1 }),
          );
          return;
        }

        if (!groups.length) return;

        let isInitialBatch = true;

        const settle = (group: Element, delaySec: number) => {
          gsap.fromTo(
            targetsFor(group),
            { y: MOTION_DISTANCE.small, opacity: MOTION_OPACITY_SOFT },
            {
              y: 0,
              opacity: 1,
              duration: MOTION_DURATION.section,
              delay: delaySec,
              ease: MOTION_EASE.enter,
            },
          );
        };

        const observer = new IntersectionObserver(
          (entries) => {
            const wasInitialBatch = isInitialBatch;
            isInitialBatch = false;
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const group = entry.target;
              observer.unobserve(group);
              if (wasInitialBatch) {
                // Already visible on mount / restoration: settle instantly,
                // no delay, no replay later.
                gsap.set(targetsFor(group), { y: 0, opacity: 1 });
                return;
              }
              const groupIndex = groups.indexOf(group);
              const delaySec =
                groupIndex >= 0 ? groupIndex * MOTION_STAGGER.tight : 0;
              settle(group, delaySec);
            });
          },
          { threshold: GROUPED_REVEAL_THRESHOLD },
        );

        groups.forEach((group) => observer.observe(group));

        return () => observer.disconnect();
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, groupSelector, itemSelector]);
}
