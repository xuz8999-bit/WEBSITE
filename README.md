# Convenience Tax Bureau — phase 1

Two desktop pages drawn with HTML, CSS and SVG, with React 18 managing client-side navigation. React runtime files are bundled locally in `vendor/`, so serving the site needs no build or package installation. `npm ci` installs the pinned dependencies when refreshing those runtime files. The bundled URW Bookman Demi font is distributed with its license in `fonts/LICENSE`.

## Run

From `/workspace/WEBSITE`, run `npm run dev` (requires Python 3). The server listens on port 5173. `index.html` is WELCOME; `home.html` is HOME.

START plays a press animation and one clock-hand rotation, then a left-to-right color wipe switches to HOME without reloading the document. The transition lasts 400ms; HOME buildings and four staggered navigation buttons finish entering within 600ms. Reduced-motion preferences skip these effects.

Hash routes work on GitHub Pages without server rewrites: `#/` is WELCOME, `#/home` is HOME. Home returns to WELCOME. About, Consume and Tax System navigate to `#/about`, `#/consumption` and `#/tax-system`; these reserved routes retain HOME and show a brief coming-soon notice rather than introducing unfinished pages. Browser back/forward is supported, including during transitions. `home.html` remains a compatible direct entry. CONTINUE and RECORD stay on WELCOME.

The composition keeps the reference's 600:338 proportions and scales to fit the desktop viewport, with neutral margins when necessary.

## Validation

Chromium checks covered START navigation, all four HOME controls, no browser runtime errors, and no horizontal overflow at 1024×768, 1440×900 and 1920×1080. Local screenshots are saved under the ignored `artifacts/` directory.

React migration validation: Chromium exercised START press/clock/wipe, same-document navigation, all placeholder routes, Home returning to WELCOME, back/forward, back during animation, reduced motion and direct home.html entry. Both settled 1200×676 screenshots were pixel-identical to the pre-migration screenshots.
