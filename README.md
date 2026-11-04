# Convenience Tax Bureau

A retro flat illustrated website with React 18 client-side routing and HTML/CSS/SVG scenes. React runtimes are bundled locally in `vendor/`; no build or dependency installation is needed to serve. Use `npm ci` only when refreshing the pinned dependencies. Bundled fonts and React have their licenses alongside the assets.

## Run

From `/workspace/WEBSITE`, run `npm run dev` (requires Python 3). The static server listens on port 5173. Use the existing checkout; tasks are isolated and do not require a worktree. `index.html` enters WELCOME; `home.html` remains a direct HOME entry. GitHub Pages serves the main branch root, with hash routes that need no server rewrites.

## Pages and interaction

- `#/`: WELCOME. START triggers press, clock and 400ms color wipe animations and enters HOME without refreshing. CONTINUE and RECORD retain their existing local feedback. Background uses a smooth orange gradient without grain or paper texture. The left green building and cream-roof house are still; the clock tower and right house float gently, with a turning clock, small sound marks and chimney smoke. The green doorway moves with the cream house wall; its pink window is static.
- `#/home`: HOME. Foreground trees grow from the ground; buildings fade in; white cloud-shaped navigation enters from the left while the pink/purple sun rises. Ambient motion begins after arrival. Hovering red fruit drops it temporarily; hovering windows gives a brief wiggle. Home returns to WELCOME; About opens ABOUT. About's siblings `#/consumption` and `#/tax-system` remain placeholder routes that retain HOME and show a temporary notice. Four central service buttons provide selection and press feedback without adding unfinished pages.
- `#/about`: ABOUT, following the provided third-page close-up. The purple sidebar, four section buttons, yellow card and two lower buildings are drawn in SVG/CSS. Four separately drawn SVG objects (flour packet, doughnut tray, strawberry sundae and purple ice cream cone) drift lightly in the reference positions. The cone is behind the green roof. History displays a short Chinese introduction to the Temporal Federation; Background, Regulation and Structure are concise summaries derived solely from the user's provided setting. The ABOUT heading also acts as a return-to-HOME control. Browser back/forward is supported.

All scenes respect `prefers-reduced-motion`. No later pages are implemented. Existing WELCOME and HOME scene templates were preserved while adding ABOUT.

## Validation

Chromium verified START → HOME → ABOUT within one document, four section buttons and their Chinese copy, return-to-HOME, browser history, direct ABOUT hash entry, and desktop sizes 1024×768, 1440×900 and 1920×1080 without horizontal overflow or browser runtime errors. All four ABOUT objects were checked for time-varying transforms; reduced-motion stops all their animations. Final local screenshot: `artifacts/about-final-v1.png` (artifacts are ignored by Git).
