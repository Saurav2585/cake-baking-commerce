"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export function MotionEnhancer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(
      () =>
        gsap.fromTo(
          "[data-measure-reveal]",
          { y: 12 },
          {
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            stagger: 0.07,
            clearProps: "transform",
          },
        ),
      scope,
    );
    return () => context.revert();
  }, []);
  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
