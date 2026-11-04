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

## Fifth-page original PDF artwork

`consumption-scene.js` now uses the first artboard of the user-supplied `第一页 [已恢复]_复制.pdf` directly. The original 1,696 vector paths, outlined CONSUMPTION title, source colors, shelf architecture, basket, boxes, products and painting order are preserved. The source's grain images are used only as decorative texture layers; the whole page is not a raster background.

`tools/extract_consumption_art.py` reproduces the extraction from that PDF using PyMuPDF and Pillow. Texture assets are losslessly cropped to their visible artboard portions without resampling or recoloring. `assets/consumption/original/scene.svg` keeps the source scene for inspection; its `manifest.json` records the source checksum, asset groups and texture dimensions. The script also produces 34 independent transparent product SVGs and 37 stable click regions. In-place grouping of adjacent paths preserves stacking order while limiting ambient motion to 63 small product groups. Shelves and central architecture stay fixed.

`consumption-original.css` applies tiny hover/press scale around each product's common center; each product's constituent paths move together. Reduced-motion disables this animation and scale. The artboard uses its own native 1366:768 proportions. Source product hit areas retain the original painting order for overlapping stock. The CONSUMPTION title returns to TAX SYSTEM.

The shop retains the existing product IDs and demo time costs. Selecting a shelf item opens its original vector illustration in the existing gallery and records the actual item name on purchase. Existing non-shop illustrations and other page layouts are not redrawn by this change.

Validation: `tests/consumption-reference.cjs` checks catalog bindings, mouse and keyboard selection, correct record naming and return. `tests/consumption-original.cjs` verifies source texture loading, all 37 click regions, original selected-product assets and navigation. The full test suite also covers the existing story/data flow, browser history, reduced-motion, all ten routes and three desktop sizes. Native screenshot: `artifacts/consumption-original-pdf-v2.png`; PDF-render reference: `artifacts/consumption-source-pdf.png`. Browser/PDF rasterization differs slightly at edges, while the underlying source paths are unchanged.

## Pages 6–10: original PDF artboards

`story-art.js` and `later-pages.js` now replace the remaining five prototype layouts with artboards 2–6 of the supplied PDF: product display, RECORD, ACCOUNT, LABOR and RECEIPT. The original paths, source glyph outlines, colors, proportions, clipping and texture layers stay in their original painting order. This supersedes the earlier hand-drawn prototype description for these pages. The first four approved scenes and the original CONSUMPTION scene remain unchanged.

Reproduce source extraction with `python3 tools/extract_later_pages.py source.pdf`. The Python script requires PyMuPDF, Pillow and fontTools. Assets and provenance are in `assets/story/original/`; the generated calculator feedback rules are in `story-parts.css`. `later-pages.css` scopes layout/interaction rules to these five native 1366×768 artboards.

The seven gallery goods use original isolated vectors. A selected shelf product replaces only the cracker position when necessary; selecting a product reveals the existing purchase/record controls in the bottom margin. RECORD overlays live entries on the source's three-row grid, scrolls additional entries, and preserves date filtering. Its native BACK and DEAILS labels remain clickable. ACCOUNT's original Back, BORROWED TIME and ACCOUNT STATUS areas retain their navigation; its original blank keypad accepts numeric entry and presets, and its source display accepts typed repayment minutes. The source debt glyphs remain unchanged at the original 63-minute state; updated balances use the PDF's embedded font in the same position.

LABOR's original objects/category labels select tasks; click the worker/cart to repay the chosen minutes and print a receipt. Back returns to ACCOUNT, and the LABOR heading opens a receipt preview. On RECEIPT the source printer returns to LABOR, the title returns HOME, and the paper opens live repayment details without replacing the original receipt illustration. All graphical hit areas are stationary native buttons with keyboard labels, hover hints and focus feedback. Product actions are keyboard reachable even before being revealed.

Ambient motion affects independent product groups, the avatar, worker arms/legs, cart and individual leaves; tables, buildings, labels and overall artboards remain still. The original receipt paper reveals through a shared SVG clip during entry. Reduced-motion disables nonessential motion.

`npm test` includes `tests/later-original.cjs`, covering all five source artboards and texture loading, the complete purchase→filter→debt→keypad→labor→receipt flow, persisted balances/history, 15 mobile/desktop layouts, fixed hit areas during animation, product hover, continuous repayment typing and paper printing. Browser screenshots are `artifacts/original-<page>.png`. At 1366×768 their mean per-channel differences from the source PDF rasterization are below 1/255; remaining edge differences come from browser/PDF rasterization. These screenshots are verification outputs only, never used as website backgrounds.

## Local-motion refinement

LABOR keeps the same artwork and fixed hit regions while its four small objects sway about their bases (2.2 degrees / 4 source pixels), its arms/legs and cart move more visibly, and leaves sway independently by 4 degrees. ACCOUNT's five package groups respond individually to hover, keyboard focus or tap; the basket, handles and text remain stationary. RECEIPT automatically feeds the rigid source paper downward through a stationary SVG outlet mask over 2.8 seconds, including on direct visits. Clicking the outlet replays printing. Opening repayment details preserves the illustration nodes and does not restart the print. Reduced-motion shows the complete sheet immediately.

## Printed receipt data

The receipt paper now prints real consumption records, purchase date/time, per-item tax and convenience/garbage costs, recorded tax total, debt before the selected labor, repaid minutes, remaining debt and labor task. The reference's sample lettering/photo/barcode is removed from the rendered paper; its paper silhouette, edge detail, printer and feeding animation remain. A deterministic local ID graphic replaces the sample barcode.

Labor completion snapshots the records and before/after balances into the saved receipt. Reloading retains the same issued values. Further purchases show an up-to-date account preview until another labor task issues a new receipt, without overwriting the previously issued snapshot. Legacy receipts fall back to their stored repayment and actual current records/balance. Empty histories explicitly print no records. Longer histories have eight records per sheet and accessible previous/next controls; every record remains available without shrinking the type. `tests/receipt-records.cjs` verifies actual printed data, arithmetic, persistence, issued snapshots/current previews, pagination and legacy/empty states. Screenshot: `artifacts/receipt-real-records.png`. The earlier source pixel-equivalence note now applies to the paper/printer illustration, not the deliberately replaced printed content.
