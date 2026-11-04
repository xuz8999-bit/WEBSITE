# Original CONSUMPTION artwork

Source: first artboard of the user-supplied `第一页 [已恢复]_复制.pdf`, 1366 × 768 pt. Only this artboard is used; the other five PDF pages are not published here.

- All 1,696 original vector paths, original title glyph outlines, transforms, colors and drawing order are retained.
- `scene.svg` preserves the extracted scene without interaction wrappers.
- `items/` contains isolated original product vectors, not retracings.
- `textures/` contains only visible portions of the PDF's raster grain layers and masks, losslessly cropped without color changes or resizing. These are not page screenshots.
- `manifest.json` records the PDF checksum and extracted item/texture metadata.
- The website adds transparent interactive hit regions and very small independently grouped product motion; the reference art remains the source of the visual layout.

Reproduce with `python3 tools/extract_consumption_art.py source.pdf` from the repository. PyMuPDF and Pillow are extraction-time dependencies only; the running website remains static HTML/CSS/SVG/React.
