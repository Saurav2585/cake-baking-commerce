#!/usr/bin/env python3
"""
R2B1 real-catalog image normalization.

For each of the 48 products in real_catalog_source.mjs, looks for a locally staged
source image (public/real-products/<slug>.*  or  public/real-products-v2/<slug>.*),
and produces two consistent ecommerce derivatives (primary 1200x1200, thumbnail
480x480) as WEBP on a clean neutral canvas with object-fit:contain-style padding,
preserving the original packshot content untouched (no branded-content edits).

Products with no locally staged source get the shared honest placeholder derivatives
instead (never a fabricated/AI image).

Writes production_artifacts/05_catalog_production/tools/.asset_build_output.json,
consumed by generate_real_catalog_assets.mjs to build Catalog_Asset_Manifest.json.
"""
import hashlib
import json
import re
from pathlib import Path
from typing import Optional

from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
SOURCE_DIRS = [ROOT / "public/real-products", ROOT / "public/real-products-v2"]
OUT_DIR = ROOT / "public/assets/catalog/real"
OUT_DIR.mkdir(parents=True, exist_ok=True)
CANVAS = 1200
THUMB = 480
PAD_FRACTION = 0.08  # inner padding so packshots don't touch the frame edge


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def find_source(slug: str) -> Optional[Path]:
    for d in SOURCE_DIRS:
        if not d.exists():
            continue
        for f in d.iterdir():
            if f.stem == slug and f.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp"):
                return f
    return None


def make_canvas(img: Image.Image, size: int) -> Image.Image:
    img = img.convert("RGBA")
    pad = int(size * PAD_FRACTION)
    box = size - 2 * pad
    ratio = min(box / img.width, box / img.height)
    # never upscale a low-res original beyond its native size
    ratio = min(ratio, 1.0) if img.width >= box or img.height >= box else ratio
    new_w, new_h = max(1, round(img.width * ratio)), max(1, round(img.height * ratio))
    resized = img.resize((new_w, new_h), Image.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (255, 255, 255, 255))
    canvas.paste(resized, ((size - new_w) // 2, (size - new_h) // 2), resized)
    return canvas.convert("RGB")


def main():
    real_catalog_source = ROOT / "production_artifacts/05_catalog_production/tools/real_catalog_source.mjs"
    text = real_catalog_source.read_text()
    slugs = re.findall(r'imageSlug:\s*"([^"]+)"', text)
    ids = re.findall(r'id:\s*"(prod_real_[a-z0-9_]+)"', text)
    assert len(slugs) == len(ids), f"slug/id count mismatch: {len(slugs)} vs {len(ids)}"

    results = []
    sourced, missing = 0, 0
    for product_id, slug in zip(ids, slugs):
        src = find_source(slug)
        product_out_dir = OUT_DIR / slug
        product_out_dir.mkdir(exist_ok=True)
        primary_path = product_out_dir / "primary.webp"
        thumb_path = product_out_dir / "thumbnail.webp"

        if src is not None:
            with Image.open(src) as im:
                original_w, original_h = im.size
                make_canvas(im, CANVAS).save(primary_path, "WEBP", quality=90)
            with Image.open(src) as im:
                make_canvas(im, THUMB).save(thumb_path, "WEBP", quality=88)
            status = "sourced"
            sourced += 1
            master_rel = str(src.relative_to(ROOT))
            master_hash = sha256(src)
            with Image.open(src) as im:
                master_w, master_h = im.size
        else:
            primary_path.write_bytes((OUT_DIR / "_placeholder_primary.webp").read_bytes())
            thumb_path.write_bytes((OUT_DIR / "_placeholder_thumbnail.webp").read_bytes())
            status = "missing"
            missing += 1
            master_rel = "public/assets/catalog/real/_placeholder_primary.webp"
            master_hash = sha256(OUT_DIR / "_placeholder_primary.webp")
            with Image.open(OUT_DIR / "_placeholder_primary.webp") as im:
                master_w, master_h = im.size
            original_w = original_h = None

        with Image.open(primary_path) as im:
            primary_w, primary_h = im.size
        with Image.open(thumb_path) as im:
            thumb_w, thumb_h = im.size

        results.append(
            {
                "product_id": product_id,
                "slug": slug,
                "status": status,
                "master": {
                    "path": master_rel,
                    "width": master_w,
                    "height": master_h,
                    "sha256": master_hash,
                    "original_width": original_w,
                    "original_height": original_h,
                },
                "primary": {
                    "path": str(primary_path.relative_to(ROOT)),
                    "width": primary_w,
                    "height": primary_h,
                    "sha256": sha256(primary_path),
                },
                "thumbnail": {
                    "path": str(thumb_path.relative_to(ROOT)),
                    "width": thumb_w,
                    "height": thumb_h,
                    "sha256": sha256(thumb_path),
                },
            }
        )

    out_file = Path(__file__).resolve().parent / ".asset_build_output.json"
    out_file.write_text(json.dumps({"records": results}, indent=2))
    print(json.dumps({"sourced": sourced, "missing": missing, "total": len(results)}, indent=2))


if __name__ == "__main__":
    main()
