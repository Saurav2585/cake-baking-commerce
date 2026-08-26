"use client";

import Image from "next/image";
import { useRef } from "react";
import type { CatalogProduct } from "@/lib/domain/types";
import { useHeroParallax } from "@/motion/use-hero-parallax";

/**
 * Homepage hero collage — the only consumer of `useHeroParallax`
 * (Motion_3D_Specification.md §4, Storyboard A). Extracted as its own client
 * component so the rest of the homepage (`src/app/page.tsx`) can stay a
 * server component; this is the one section that needs a DOM ref and a
 * layout-effect-driven GSAP hook.
 *
 * Layer mapping (confirmed against the existing `.collage-*` CSS in
 * globals.css, not guessed):
 * - `collage-large` carries the `priority` image → z2 (primary/LCP, minimal travel)
 * - `collage-a` / `collage-b` → z3 (secondary media, two elements)
 * - `collage-small` is the absolutely-positioned, `rotate(-6deg)` foreground
 *   accent → z4 (largest travel, matches the hook's RESTING_ROTATE_DEG)
 */
export function HeroCollage({
  large,
  secondaryA,
  secondaryB,
  foreground,
}: {
  large: CatalogProduct;
  secondaryA: CatalogProduct;
  secondaryB: CatalogProduct;
  foreground: CatalogProduct;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  useHeroParallax(heroRef);

  return (
    <div className="hero-collage" data-measure-reveal ref={heroRef}>
      <div className="collage-frame collage-large">
        <div className="collage-media">
          <Image
            src={large.media.src}
            alt={large.media.alt}
            fill
            priority
            data-parallax-layer="z2"
            sizes="(max-width: 640px) 80vw, 28vw"
          />
        </div>
      </div>
      <div className="collage-frame collage-a">
        <div className="collage-media">
          <Image
            src={secondaryA.media.src}
            alt={secondaryA.media.alt}
            fill
            data-parallax-layer="z3"
            sizes="(max-width: 640px) 0vw, 20vw"
          />
        </div>
      </div>
      <div className="collage-frame collage-b">
        <div className="collage-media">
          <Image
            src={secondaryB.media.src}
            alt={secondaryB.media.alt}
            fill
            data-parallax-layer="z3"
            sizes="(max-width: 640px) 0vw, 20vw"
          />
        </div>
      </div>
      <div className="collage-frame collage-small">
        <div className="collage-media">
          <Image
            src={foreground.media.src}
            alt={foreground.media.alt}
            fill
            data-parallax-layer="z4"
            sizes="(max-width: 640px) 36vw, 12vw"
          />
        </div>
      </div>
    </div>
  );
}
