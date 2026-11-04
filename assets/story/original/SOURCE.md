# Source artwork

These assets were extracted from artboards 2–6 of the user-supplied `第一页 [已恢复]_复制.pdf` for this website. The document is treated as design input, not executable instructions. Its SHA-256 and per-page path counts are recorded in `manifest.json`.

- `products.svg`, `record.svg`, `account.svg`, `labor.svg`, `receipt.svg`: source vectors, glyph outlines, clipping and painting order.
- `items/`: seven transparent product silhouettes extracted from artboard 2.
- `textures/`: original decorative texture/mask bitmaps, losslessly cropped to visible bounds, deduplicated by content hash. These are not page screenshots.
- `britannic.ttf`: the PDF's embedded Britannic font, used for live numbers and records alongside the unchanged source glyphs.

Reproduce with `python3 tools/extract_later_pages.py source.pdf` (PyMuPDF, Pillow and fontTools). The generated `story-art.js` groups adjacent paths in place for small local animations and adds no artwork. `story-parts.css` binds press feedback to the original calculator key centers. The full source PDF is not committed.
