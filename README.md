# Convenience Tax Bureau — phase 1

Two desktop pages drawn with HTML, CSS and SVG. No build or package installation is required. The bundled URW Bookman Demi font is distributed with its license in `fonts/LICENSE`.

## Run

From `/workspace/WEBSITE`, run `npm run dev` (requires Python 3). The server listens on port 5173. `index.html` is WELCOME; `home.html` is HOME.

START opens HOME. Its four navigation controls provide pressed state and brief visual feedback only. CONTINUE and RECORD stay on WELCOME; no later pages have been implemented.

The composition keeps the reference's 600:338 proportions and scales to fit the desktop viewport, with neutral margins when necessary.

## Validation

Chromium checks covered START navigation, all four HOME controls, no browser runtime errors, and no horizontal overflow at 1024×768, 1440×900 and 1920×1080. Local screenshots are saved under the ignored `artifacts/` directory.
