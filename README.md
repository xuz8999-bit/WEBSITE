# Temporal Federation — illustrated story world

Ten React-managed HTML/CSS/SVG scenes based on the supplied ten-panel reference. The original WELCOME, HOME and ABOUT illustrations are retained; seven new illustrated scenes complete the story. Backgrounds remain smooth, with no grain or paper texture. React runtimes are bundled in `vendor/`, so the site needs no build and no external runtime CDN.

## Run and test

Use the existing `/workspace/WEBSITE` checkout; tasks are isolated and do not require a Git worktree.

```sh
cd /workspace/WEBSITE
npm ci
npm run dev
```

The static server listens on port 5173. With that server running, execute `npm test` in another terminal. Browser tests use Playwright 1.62.1 and `/usr/bin/chromium`; set `CHROMIUM_PATH` to another installed Chromium executable when needed. Tests create ignored screenshots under `artifacts/` and use isolated browser storage.

GitHub Pages serves `main` at the repository root. Hash routes work without server-side rewrites; `home.html` remains a direct HOME entry.

## Routes and story

| Route | Scene | Main interaction |
| --- | --- | --- |
| `#/` | WELCOME | START enters HOME; CONTINUE opens HOME; RECORD opens records |
| `#/home` | HOME | Cloud navigation opens sections; central menu opens records, account, labor or receipt |
| `#/about` | ABOUT | Hover/focus/click History, Background, Regulation or Structure; Back returns HOME; Tax System continues the story |
| `#/tax-system` | TAX SYSTEM | Drawn flow links and nodes lead to the shop |
| `#/consumption` | CONSUMPTION | Select a shelf product to open the product display |
| `#/products` | Product display | Select an item and record the purchase |
| `#/record` | RECORD | Inspect dated consumption rows, filter by date, or open account details |
| `#/account` | ACCOUNT | View animated debt total; keypad chooses labor repayment minutes |
| `#/labor` | LABOR | Select a task and complete it to repay time and issue a receipt |
| `#/receipt` | RECEIPT | Receipt prints in place; Home returns to the blue city |

Purchases add the selected product's convenience and garbage time costs to the account debt. Labor repays up to the selected number of minutes and the outstanding balance. The starting 63-minute debt is a demo value matching the reference. The last receipt, records and balance persist in browser localStorage; there is no server, login or external financial service. A direct receipt visit before completing labor is clearly marked PREVIEW. Records, numeric values and receipt text reflect actual interactions, not continuously changing decorative numbers.

## Motion architecture

- `motion-config.js`: the ten-route registry, story transition mapping and shared timing tiers (760ms transitions, 240ms hover, 6s float, 20s cloud, 3s character loop).
- `script.js`: route and state orchestration, atomic scene swap under an opaque mask, browser history, cancellation, reduced-motion, persistence, and local SVG interactions. Swaps are covered at the midpoint; scenes never animate as a whole. Back/forward cancels unfinished effects safely.
- `scenes.js`: existing WELCOME and HOME artwork. HOME retains the user's slower 2.6-second staged entrance: foreground growth, building fade, clouds from the left and rising sun. Local motion begins after arrival.
- `about-scene.js`: ABOUT illustration, English copy placeholders and four independent food assets under `assets/about/`. Section changes update the text and selected state without replacing the illustration DOM or restarting floating motion. The left cabinet has three compact pink sections and the smaller Back button requested in the close-up.
- `world-scenes.js`: seven new scene templates, product illustrations and data-driven records/account/receipt output.
- `style.css`: local keyframes, content-related transition masks and stable scene layout. Wrappers separate entrance transforms from ambient transforms; hover uses independent properties where needed. Buildings, body text and complete tables do not wobble.

Story transitions: clock/orange reveal; paper turn into ABOUT; collapsing yellow card into drawn tax flow; product scatter into shelves; selected product moving from its actual shelf location toward the center; product shrink into records; collapsing table and moving debt number; time-to-task motif; printer/paper handoff; paper roll and blue/orange return to HOME.

Under `prefers-reduced-motion`, transitions commit immediately and nonessential continuous/hover effects stop. Changing the preference during a transition finishes the pending navigation atomically. Keyboard and touch retain click behavior.

## Validation

`tests/world-flow.cjs` covers all ten routes, 30 route/desktop-size combinations (1024×768, 1440×900, 1920×1080), reduced-motion, purchase → record → debt → selected repayment → receipt, persisted balances, browser history and unchanged ABOUT illustration nodes during section hover.

`tests/transitions.cjs` exercises all ten story transitions with real mouse coordinates, verifies one mounted scene throughout, busy/lock cleanup, cancellation on browser back, and switching reduced-motion during a turn. Browser runtime errors are collected as failures.

Screenshot overview: `artifacts/story-overview-v1.png`. Individual scenes: `artifacts/story-<route>.png`. These are local validation outputs, not page background assets. The new seven scenes are hand-drawn implementations from the small reference, not pixel-identical extracted artwork.

## ABOUT review revision

The latest clean ABOUT reference supersedes the floating-food composition. ABOUT now contains only the purple sidebar, two pink facade panels, yellow introduction card, red/blue left building, green-roof right building and small Back button. Four section hover/click interactions and English summaries remain. Extra foods and the Tax System header shortcut are removed; Back returns to HOME, where Tax System remains available. Further page design work is paused pending this page’s review.

## ABOUT original artwork

The user subsequently supplied `甜点.pdf`. Four independent transparent SVGs were extracted directly from its 343 original vector paths and restored to ABOUT. These replace hand-drawn approximations on ABOUT only; other pages continue using their existing assets. Files and extraction provenance: `assets/about/original/`. The clean reference layout, English card, section interactions and Back remain. The cone is drawn in a foreground SVG layer clipped behind the green roof, preserving its PDF colors without the card gradient tinting it.

## Fourth-page reference and ABOUT audio

TAX SYSTEM now uses `tax-scene.js`, a separately drawn four-step reference composition: hands holding a phone; hourglass, plastic bag and open box; a nine-key calculator with arithmetic symbols; and a citizen portrait. Six fixed color bars and three independently animated white links sit behind the cards. The initial fourth-page pass used a smooth orange-to-cream gradient. The user’s subsequent explicit 1:1 request supersedes that choice on TAX SYSTEM only: its reference’s colored fine-grain gradient is now restored; all other scenes retain their approved backgrounds. The bottom-right Continue opens CONSUMPTION; the TAX SYSTEM title also returns to ABOUT. Node illustrations have only small local idle movement.

`illustration-sound.js` generates four short local Web Audio cues for ABOUT: paper rustle, wrapper crinkle, glass ding and a soft cone tap. No audio files, autoplay loops or external services are used. A genuine pointer/keyboard gesture must unlock audio; the small music-note button enables or mutes it and remembers the mute setting. Hover/focus/tap the original objects to play, with a cooldown to prevent overlap. Text and audio-state changes preserve the illustration DOM and floating animations. `tests/tax-and-audio.cjs` verifies the fourth-page layout/Continue/return and all four real hover cues, gesture gating, mute and keyboard behavior.

The fourth-page reference refinement uses the OFL-licensed Abril Fatface from the official Google Fonts repository (`fonts/abril-fatface-LICENSE.txt`) for closer display typography. At the supplied 1366×768 size, the title ink bounds are approximately (474,33)–(784,74), and Continue approximately (1155,702)–(1304,733). Cards and connectors remain SVG drawings; exact source-illustration equivalence requires the original artwork rather than a screenshot. Current screenshot: `artifacts/tax-system-close-reference-v3.png`.

## Fifth-page shelf reference

`consumption-scene.js` now draws the new CONSUMPTION reference: green shelf dividers, layered yellow/cream/pink/red/blue shelving, 37 independently selectable shelf illustrations, a large blue basket with dotted handles, stacked grocery cartons, parcel and moka pot. The aisle uses its own fine-grain warm background. Shelf bodies stay fixed; individual stock and basket details have only slight motion. A title control returns to TAX SYSTEM; no extra top toolbar is drawn over the reference.

The shop registers its own product IDs and time costs. Choosing a newly drawn item preserves its actual name and illustration in the existing product display, replacing one gallery slot rather than crowding the gallery with all shop products. Mouse and keyboard selection use the same route logic. Existing non-shop product illustrations remain unchanged. Most packaging graphics are hand-drawn approximations from the screenshot; the flour packet uses the original user-supplied PDF asset. Original shop PDF/SVG artwork can replace individual drawings later without changing the composition.

`tests/consumption-reference.cjs` covers reference screenshots, valid catalog bindings, four representative real-pointer item selections, keyboard selection, recording the selected shop item under its actual name, and return to TAX SYSTEM. Screenshot: `artifacts/consumption-reference-v1.png`. This revision is limited to the fifth page and necessary product-selection integration.
