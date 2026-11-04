# Original first four artboards

Extracted from the four-page `第一页 [已恢复].pdf` supplied by the user for updating WELCOME, HOME, ABOUT and TAX SYSTEM. The PDF is design input only. Its SHA-256, native dimensions and original path counts are recorded in `manifest.json`.

`welcome.svg`, `home.svg`, `about.svg` and `tax.svg` archive the unmodified original vector painting order, glyph outlines and losslessly cropped texture layers. `broadway.ttf` is the PDF's embedded typeface for dynamic ABOUT section headings. `textures/` holds decorative background/mask bitmaps, not page screenshots.

Reproduce with `python3 tools/extract_front_pages.py source.pdf` (PyMuPDF, Pillow, fontTools). The generated `front-art.js` wraps adjacent paths/glyphs in place for local motion and preserves previous explicit user choices: the stray blank WELCOME capsule extending beyond the artboard is omitted; TAX SYSTEM's Continue stays removed; ABOUT's placeholder letters are replaced by the approved English copy and the four previously supplied original food objects remain.
