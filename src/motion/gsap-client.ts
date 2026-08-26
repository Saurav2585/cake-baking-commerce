/**
 * src/motion/gsap-client.ts
 *
 * Client-only ScrollTrigger registration, per Frontend_GSAP_Architecture.md
 * §4/§6. This module intentionally does nothing at import time — it only
 * exports a function that a consuming hook calls from inside its own
 * `useLayoutEffect`, so registration never runs during SSR or during a
 * server-side module-graph evaluation pass.
 *
 * IMPORTANT: none of the three hooks in this directory currently require
 * ScrollTrigger (Storyboard A is pointer-driven, Storyboard B uses a
 * hand-rolled IntersectionObserver per Motion_3D_Specification.md §8's own
 * "either is acceptable" allowance, and Storyboard C is click-driven). This
 * module exists so a future hook that *does* need ScrollTrigger has a single,
 * already-reviewed, SSR-safe registration path to import instead of
 * reinventing one.
 *
 * Usage (from inside a "use client" file's useLayoutEffect only):
 *
 *   useLayoutEffect(() => {
 *     let cancelled = false;
 *     ensureScrollTrigger().then((ScrollTrigger) => {
 *       if (cancelled || !ScrollTrigger) return;
 *       // ... ScrollTrigger.create(...) inside your own gsap.context() ...
 *     });
 *     return () => { cancelled = true; };
 *   }, []);
 *
 * Never import this module from a Server Component or from src/lib/domain/**.
 */

import type gsapType from "gsap";

let registerPromise: Promise<typeof import("gsap/ScrollTrigger").ScrollTrigger | null> | null =
  null;

/**
 * Dynamically imports and registers GSAP's ScrollTrigger plugin exactly
 * once, guarded so it only ever executes in the browser. Safe to call from
 * multiple hooks/effects concurrently — the underlying import + registration
 * work happens at most once, subsequent callers await the same promise.
 *
 * Resolves to `null` (never throws) if:
 *  - called during SSR (`typeof window === "undefined"`), or
 *  - the dynamic import fails for any reason (network/module error).
 *
 * Callers must treat a `null` resolution identically to "ScrollTrigger is
 * unavailable" and fall back to the DOM's final static state — per the
 * error/fallback contract in Frontend_GSAP_Architecture.md §6, a failed
 * plugin load must never throw or block rendering.
 */
export function ensureScrollTrigger(
  gsapInstance: typeof gsapType,
): Promise<typeof import("gsap/ScrollTrigger").ScrollTrigger | null> {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }
  if (!registerPromise) {
    registerPromise = import("gsap/ScrollTrigger")
      .then(({ ScrollTrigger }) => {
        gsapInstance.registerPlugin(ScrollTrigger);
        return ScrollTrigger;
      })
      .catch(() => null);
  }
  return registerPromise;
}
