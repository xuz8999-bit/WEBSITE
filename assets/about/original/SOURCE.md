# Original ABOUT illustrations

Extracted directly from the user-supplied Illustrator PDF `甜点.pdf` (one vector page, 841.89 × 595.276 pt). No rasterization, tracing, recoloring or path simplification.

Original path groups: flour 57; wrapped cakes 202; strawberry sundae 27; purple cone 57. All 343 paths are preserved, with their original transforms and attributes. Each file has an independent transparent crop with 1pt padding. The page background is not included.

Source PDF SHA-256: `986672e799d187b0bb7076af3174dce3e801525a014f45d0b1e74cd4b6998742`.

To reproduce when PyMuPDF is available:

```sh
python3 tools/extract_about_art.py path/to/甜点.pdf assets/about/original
```

These files are used only by ABOUT. The older hand-drawn assets in the parent directory remain unchanged for other pages.
