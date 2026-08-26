/**
 * src/motion/tokens.ts
 *
 * Single source of truth for GSAP duration/ease/stagger/distance/scale
 * constants and `gsap.matchMedia()` breakpoint strings, per
 * `Frontend_GSAP_Architecture.md` §4 and the numeric table in
 * `production_artifacts/04_motion_assets/Motion_Tokens.md` (retained
 * verbatim by `Motion_3D_Specification.md` §1).
 *
 * No hook under src/motion/** should hardcode a duration/ease/stagger
 * magic number — import it from here instead, so every storyboard cites
 * the same numbers this file (and the spec docs) do.
 *
 * Durations are exported in seconds (GSAP's native unit for
 * `duration`/`stagger`), not milliseconds — see the *_MS companions
 * below when a millisecond value is genuinely needed (e.g. a raw
 * `setTimeout`/CSS custom property).
 */

/** Duration tokens, in seconds (GSAP `duration`/`stagger` unit). */
export const MOTION_DURATION = {
  /** 0ms — reduced/no-animation, instant state correction. */
  instant: 0,
  /** 120ms — pressed, selected, small icon/state acknowledgement. */
  feedback: 0.12,
  /** 160ms — chip removal, local highlight, tooltip/support. */
  micro: 0.16,
  /** 220ms — suggestions, atomic media/data transition (PDP crossfade). */
  local: 0.22,
  /** 260ms — drawer/dialog opening; close may use 0.18. */
  overlay: 0.26,
  /** 420ms — one editorial group entrance (atlas/rail settle). */
  section: 0.42,
  /** 720ms — coordinated signature sequence base (hero ENTRY span). */
  signature: 0.72,
  /** 900ms — hard ceiling for one triggered signature. */
  signatureMax: 0.9,
} as const;

/** Same values as MOTION_DURATION, in milliseconds, for non-GSAP call sites. */
export const MOTION_DURATION_MS = Object.fromEntries(
  Object.entries(MOTION_DURATION).map(([k, v]) => [k, Math.round(v * 1000)]),
) as Record<keyof typeof MOTION_DURATION, number>;

/** Ease token strings (GSAP accepts raw CSS cubic-bezier strings). */
export const MOTION_EASE = {
  /** Local movement/change. */
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  /** Decelerating entrance — used by every ENTRY phase in this system. */
  enter: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** Quick dismissal. */
  exit: "cubic-bezier(0.4, 0, 1, 1)",
  /** Signatures, once per moment. */
  emphasis: "cubic-bezier(0.22, 1, 0.36, 1)",
  /** Determinate progress only. */
  linear: "linear",
} as const;

/** Stagger tokens, in seconds. */
export const MOTION_STAGGER = {
  /** 35ms — maximum 5 groups (department atlas paired-group settle). */
  tight: 0.035,
  /** 60ms — maximum 4 groups. */
  measured: 0.06,
  /** 240ms — maximum total stagger extension across a whole group set. */
  cap: 0.24,
} as const;

/** Translation-distance ceilings, in px. */
export const MOTION_DISTANCE = {
  none: 0,
  /** 2px — pressed/local feedback. */
  nudge: 2,
  /** 6px — anchored content settle (grouped reveal entrance start offset). */
  small: 6,
  /** 12px — editorial grouping. */
  medium: 12,
  /** 20px — signature object placement maximum (hero parallax ceiling). */
  large: 20,
} as const;

/** Scale-factor tokens. */
export const MOTION_SCALE = {
  /** Pointer/touch press only; never changes layout. */
  pressed: 0.985,
  /** Anchored popover/media layer only (PDP crossfade incoming image). */
  enter: 0.98,
  /** Decorative signature layer maximum (cart-badge pulse peak). */
  emphasis: 1.02,
} as const;

/**
 * `gsap.matchMedia()` / `context.matchMedia()` breakpoint query strings.
 * Always gate on capability (`hover`/`pointer`), never bare viewport width,
 * per Motion_3D_Specification.md §4's explicit instruction.
 */
export const MOTION_QUERY = {
  /** Desktop pointer-parallax gate — capability-based, not width-based. */
  finePointerHover: "(hover: hover) and (pointer: fine)",
  /** Coarse-pointer / touch — no hover to build parallax BUILD/PEAK from. */
  coarsePointer: "(hover: none), (pointer: coarse)",
  mobile: "(max-width: 640px)",
  tabletNarrowDesktop: "(min-width: 641px) and (max-width: 1024px)",
  desktop: "(min-width: 1025px)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;

/**
 * Hero pointer-parallax travel ceilings, in px — Motion_3D_Specification.md
 * §4 PEAK clamp. No layer may ever exceed these regardless of pointer travel.
 */
export const HERO_PARALLAX_MAX_PX = {
  z2: 3,
  z3: 12,
  z4: 18,
  /** Mobile ENTRY-only travel ceiling (no BUILD/PEAK on mobile). */
  mobile: 8,
} as const;

/** Hero parallax BUILD coefficients (share of pointer-offset applied per layer). */
export const HERO_PARALLAX_COEFFICIENT = {
  z2: 0.1,
  z3: 0.4,
  z4: 1,
} as const;

/** Hero ENTRY phase timing (start/end offsets, in seconds, from mount). */
export const HERO_ENTRY_PHASE_SEC = {
  z2: { start: 0, end: 0.42 },
  z3: { start: 0.1, end: 0.52 },
  z4: { start: 0.18, end: 0.62 },
} as const;

/** PDP crossfade composition — `motion-swap-atomic` (local + standard + crossfade). */
export const CROSSFADE_DURATION_SEC = MOTION_DURATION.local; // 220ms
export const CROSSFADE_HIGHLIGHT_DURATION_SEC = MOTION_DURATION.micro; // 160ms

/** Grouped-reveal (Storyboard B) IntersectionObserver visibility threshold. */
export const GROUPED_REVEAL_THRESHOLD = 0.2;

/**
 * Entrance opacity starting point ("soft", per Motion_3D_Specification.md's
 * ENTRY phase language, e.g. hero §4 "opacity: soft(0.72)", atlas/rail §5
 * "opacity: soft → 1"). Not 0 — entrances fade up from a dimmed state, they
 * never start fully invisible.
 */
export const MOTION_OPACITY_SOFT = 0.72;
