"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  departmentDisplay,
  departmentTileImage,
  type RealProductDepartment,
} from "@/data/real-products";
import { useGroupedReveal } from "@/motion/use-grouped-reveal";

/**
 * Homepage "Shop by category" atlas. Wires Motion_3D_Specification.md §5
 * Storyboard B's grouped reveal for the existing tile pairing.
 *
 * The pairing is read off the actual CSS, not guessed: globals.css only
 * offsets `.tile-2`/`.tile-3` with `transform: translateY(3rem)`, which
 * — combined with DOM order — means the atlas already reads as a sequence
 * of consecutive pairs (tile-1+tile-2, tile-3+tile-4, tile-5+tile-6,
 * tile-7+tile-8/recipes): each pair contains one baseline tile and one
 * offset tile, producing the dip in row one.
 *
 * Each pair is wrapped in a `display: contents` element carrying
 * `data-reveal-group` so it groups for `useGroupedReveal`'s
 * `querySelectorAll` without adding a real box to the CSS Grid (which would
 * otherwise swallow two grid cells into one and break the 4-column
 * layout). Since a `display: contents` wrapper has no box of its own to
 * animate, `itemSelector: ".department-tile"` targets the two real tiles
 * inside each group as the actual animated elements — they settle together,
 * with no stagger between them, only staggered timing between groups.
 */
export function DepartmentAtlas() {
  const atlasRef = useRef<HTMLDivElement>(null);
  useGroupedReveal(atlasRef, {
    groupSelector: "[data-reveal-group]",
    itemSelector: ".department-tile",
  });

  const shopDepartments = Object.keys(
    departmentDisplay,
  ) as RealProductDepartment[];

  type AtlasTile =
    | { kind: "department"; slug: RealProductDepartment; tileIndex: number }
    | { kind: "recipes"; tileIndex: number };

  const tiles: AtlasTile[] = [
    ...shopDepartments.map(
      (slug, index): AtlasTile => ({
        kind: "department",
        slug,
        tileIndex: index + 1,
      }),
    ),
    { kind: "recipes", tileIndex: shopDepartments.length + 1 },
  ];

  const tilePairs: AtlasTile[][] = [];
  for (let i = 0; i < tiles.length; i += 2) {
    tilePairs.push(tiles.slice(i, i + 2));
  }

  return (
    <div className="department-atlas" ref={atlasRef}>
      {tilePairs.map((pair, pairIndex) => (
        <div key={pairIndex} data-reveal-group style={{ display: "contents" }}>
          {pair.map((tile) => {
            if (tile.kind === "recipes") {
              return (
                <Link
                  key="recipes"
                  href="/recipes"
                  className={`department-tile tile-${tile.tileIndex} recipes-tile`}
                >
                  <h3>Recipes</h3>
                  <p>Turn method into a measured supply plan</p>
                </Link>
              );
            }
            const info = departmentDisplay[tile.slug];
            const image = departmentTileImage[tile.slug];
            return (
              <Link
                key={tile.slug}
                href={`/shop/${tile.slug}`}
                className={`department-tile tile-${tile.tileIndex}`}
              >
                <div className="tile-image">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h3>{info.title}</h3>
                <p>{info.blurb}</p>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
