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

## WELCOME poster refinement

WELCOME now uses 82% side-building scale, wider central negative space, greater button spacing, with no added cloud. Existing colors, grain, font, purple ground and HOME artwork are retained. Idle CSS animation periods: clock hands 12s, tower 5s, house 6s, roof 7s, plant 4s; phases are offset. Building stripes and the pink window have small opacity/brightness variations. Hover uses scale(1.04), active uses scale(.96). Reduced-motion disables all nonessential scene motion and hover scaling. START still uses the short clock/wipe transition.

Chromium verified these periods, changing clock transforms, hover scale, zero running animations under reduced-motion, non-overlapping buttons at three desktop sizes, and all existing routes/history behavior. HOME remained pixel-identical to its prior screenshot. WELCOME's new screenshot is `artifacts/welcome-poster-v2.png`; compare the previous layout in `artifacts/welcome-color-v4.png`. Artifacts are local and ignored by Git.

Additional WELCOME detail: two intermittent drawn sound cues (visual only), a pink shutter that opens/closes over 12s, and three staggered chimney smoke puffs. No background cloud. Reduced-motion stops all animation, hides smoke, and leaves the shutter closed. Browser checks verified changing shutter transforms, smoke/cue counts and reduced-motion behavior; original route/transition checks still pass.

## HOME city motion

HOME animates existing artwork only: white cloud-shaped navigation drifts slowly left/right and vertically, the yellow dome breathes, the pink orb floats, selected window groups occasionally brighten, and independent leaf wrapper groups pivot near the common root while preserving each ellipse's original rotation. The pink stem and pink leaf float gently. Buildings stay still outside the existing one-time entrance sequence; no new chimney or cloud artwork was added.

Navigation uses CSS `translate` for drifting independently of hover scale(1.05) and active scale(.96), so the interactive hit area follows the artwork. Record/Account/Labor/Receipt now use real buttons in the same positions with a slight yellow hover protrusion and CSS press animation; they announce selection without adding pages. Reduced-motion disables ambient motion and scale transitions. Chromium validated actual mouse hits on all moving navigation, menu actions, independent plant/sky motion, all existing routes/history, reduced-motion with zero running animations and no browser errors. Screenshot: `artifacts/home-city-motion-v1.png`.

HOME arrival now reveals foreground trees/plants first (0–260ms), buildings and labels next (120–420ms), white cloud navigation from left to right (180–550ms, staggered), then the pink/purple sun rises (330–580ms). Wrapper groups preserve all existing paths and final stacking order. Ambient animation continues independently after arrival; reduced-motion disables the arrival sequence. Full START-to-HOME recording: `artifacts/welcome-to-home-staged-v4.webm`.

HOME interactive arrival refinement: all foreground greenery (including the fruit bush) grows from the ground over 1.2s; buildings fade in over 1.2s after a 350ms delay. Navigation clouds enter from the left at 900/1060/1220/1380ms over 1s, while the sun rises at 900ms over 1.2s. Arrival state clears at 2.6s. Ambient leaf and sun movement pauses until arrival completes. Fruit hover/tap/keyboard triggers a 950ms drop and fade, restoring after 3.6s; window hover/tap/keyboard triggers a 480ms flat wiggle, with no audio. The navigation container passes pointer events to the SVG while its own buttons remain clickable. Reduced-motion skips arrival and hover animation. Chromium validated actual mouse movement onto fruit/windows, entry timings, delayed ambient motion, reduced-motion and existing navigation. Recording: `artifacts/welcome-to-home-interactive-v5.webm`.
