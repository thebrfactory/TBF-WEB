---
description: Convert images to WebP quality 100 and place in the correct public/images folder
---

# image-prep

Converts images from any format (PNG, JPG, JPEG) to WebP at **quality 100** using `cwebp`, places them in the correct folder under `public/images/`, and removes the originals.

## Tool

`cwebp` — available at `/opt/homebrew/bin/cwebp`

## Folder structure

```
public/images/
  tfd/        → The Fiore Daily images
  ruc/        → Runway United Collective images
  tgf/        → The Growth Factory images
  slide1/     → Homepage slides
  slide2/     → Homepage slides
  (root)      → img-01.webp … img-06.webp, thumb-01.webp … thumb-03.webp
```

## Naming conventions

- Hero images: `<label>-hero.webp`
- Section images: `<label>-<section>.webp` (e.g. `tfd-ritual.webp`, `ruc-backstage.webp`)
- Closing/footer images: `<label>-closing.webp`

## Command

Convert all images in a folder:
```bash
for f in /path/to/folder/*.{png,jpg,jpeg}; do
  [ -f "$f" ] || continue
  out="${f%.*}.webp"
  cwebp -q 100 "$f" -o "$out" && echo "✅ $(basename $out)" && rm "$f"
done
```

Convert a single file:
```bash
cwebp -q 100 input.png -o output.webp && rm input.png
```

## Recommended dimensions

- Hero / full-bleed: 2400×1350 (16:9)
- Portrait sections: 2400×1600 (3:2)
- Thumbnails: 800×600

## Notes

- Always confirm the target folder exists before converting
- Never place images outside `public/images/` — Next.js `Image` component requires files to be under `public/`
- After converting, verify with `ls -lh` that the webp files landed correctly before removing originals
