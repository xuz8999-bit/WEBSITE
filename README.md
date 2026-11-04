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

## First four pages from the new original PDF

The newly supplied four-page `第一页 [已恢复].pdf` now provides WELCOME, HOME, ABOUT and TAX SYSTEM's original vectors, glyph outlines, colors, proportions and texture layers. `front-art.js` is generated by `tools/extract_front_pages.py`; source SVGs, provenance and assets are in `assets/front/original/`. `front-pages.js` overrides the four existing scene templates and retains their established routes/interaction data attributes; the later six scenes, real-record receipts and ledger are unchanged.

WELCOME keeps three source buttons, the clock's center rotation, coordinated wall/door/window float, roof sway and small chimney smoke. Its blank off-artboard duplicate capsule is omitted. HOME's source foreground plants grow first, buildings fade in afterwards, white navigation objects enter from the left and the purple sun rises; settled leaves and navigation shapes move independently. Native hit areas remain fixed. Source fruit and windows retain hover feedback, and all eight navigation/menu destinations remain connected. Buildings remain stable after entry.

ABOUT preserves the original sidebar/facades/card shape and source title. The existing four original food assets/audio and approved English section copy remain; source placeholder letters are removed. Hover changes section content without replacing illustration nodes. TAX SYSTEM uses all four original illustrated steps and connectors; the previous removal of Continue remains, and its phone card still opens CONSUMPTION. The source title returns to ABOUT.

Scoped rules in `front-pages.css` retain reduced-motion support. Source WELCOME textures preload, and matching fallback gradients prevent white backgrounds while texture images load. All source vectors remain foreground SVG geometry, not whole-page screenshot images.

`tests/front-original.cjs` verifies source loading/screenshots, English tabs/food retention, START/shop/back/browser history, stationary navigation hit areas during local movement, fruit/window responses, reduced-motion and 12 mobile/desktop layouts. Screenshots are `artifacts/front-original-<page>.png`. `npm test` also runs the complete ten-page and real-receipt regression suite.

## Requested combined version

The first four scenes keep the newly supplied four-page PDF artwork (`front-art.js` / `front-pages.js`). CONSUMPTION and all five subsequent scenes now match deployment `e3c147f` (the user's selected original-PDF deployment), including the original later-page styling, illustration grouping, receipt illustration and interactions. The later-scene files/assets/extractor are restored directly from that commit. The temporary receipt-to-shop routing change was discarded; navigation matches the selected deployment. Stored consumption records are not cleared.

The subsequent v5 printed-receipt check is retained only as a historical feature test in `tests/archive/receipt-records-v5.cjs`, excluded from the current version's test command. Earlier documentation for those later refinements is historical and superseded by this selected-version restoration. The original later-page, complete flow and transition tests are active alongside the new first-four-page checks.

## Receipt exception and HOME fruit order

The requested original later-page deployment remains the baseline, with one explicit exception: RECEIPT again uses the approved v5 real-record content and 2.8-second paper-feed animation. Only that source SVG template, receipt renderer/styles/events and repayment snapshot are restored; CONSUMPTION, products, RECORD, ACCOUNT and LABOR keep the selected deployment. The real-record receipt test is active again.

HOME's beige foreground bush completes its 1.7-second growth before the red fruit fades/scales in at 1.75, 1.88 and 2.01 seconds. All fruit settles before the existing 2.6-second entry ends, retaining hover-to-drop behaviour and reduced-motion. `tests/front-original.cjs` samples actual animation states during growth, after the beige bush finishes but before fruit appears, and after fruit settles.

## Retained illustration motion

The selected original layouts now also retain the previously approved account-package hover/focus/tap feedback and LABOR object/worker/cart/leaf motion. Each account package wiggles individually; the basket and labels stay still. LABOR's four objects sway independently about their bases, with fixed hit regions. The real-record receipt/printing and HOME bush-before-fruit timing remain unchanged. The normal-motion test checks every account package and all four LABOR objects, including stationary hit areas.

LABOR also has a visible cream Continue → button on the blue ground, aligned with Back, which navigates to RECEIPT. It is navigation only; it does not fabricate completed labor or change debt. The existing worker/cart action still completes a selected task and issues its real repayment receipt.

## Click-to-print receipt

RECEIPT starts with its paper concealed. Clicking the printer (mouse, touch or keyboard) starts the existing 2.8-second feed and displays small retro sound rays beside the machine. The rays stop when printing finishes; reduced-motion keeps them static and reveals the sheet immediately on request. The source content remains real saved consumption/repayment data. Reprinting does not modify that data, and repeated clicks during printing are ignored. Back to LABOR is a separate visible cream button, so the printer itself no longer navigates away. Navigating back into RECEIPT again waits for a new print request; receipt pagination prints the requested next sheet.

## LABOR entrance sequence

Entering LABOR, including a direct visit, moves only the original worker/cart group from the left to its existing destination over 2.8 seconds, with alternating leg motion. Once it arrives, the cup, carton, bag and phone reveal in sequence (2.9–3.8 seconds); their independent idle motion continues afterwards. Background, plant, labels and controls retain their positions. Task/worker activation waits until entry ends, while Back and Continue remain available. Reduced-motion displays the settled scene immediately.

## Select into the blue shopping bag

On CONSUMPTION, selecting stock now adds it to the original blue bag without leaving the shelf. A copy of that original product flies into the bag, a soft local Web Audio pick cue plays after the gesture (honoring mute), and a small badge shows quantity. The bag is a native keyboard/touch target; clicking it opens the next product-display page with only the chosen goods in the existing seven source positions. Repeated picks increase quantity. Goods can be removed one at a time, and additional selected types are paginated rather than dropped. The original shop illustration remains stationary and is not remounted on selection.

Recording the selection creates an actual consumption row per chosen unit and adds exactly their combined time tax, then empties the bag. Merely adding/selecting/opening the bag does not change debt or consumption records. Bag contents survive reload and browser navigation; direct standalone product links retain their previous single-product flow. A small sound toggle is available in the shop. Reduced-motion skips the flight while keeping immediate count feedback.

`tests/shop-bag.cjs` covers flight/selection sound, fixed original SVG nodes, bag navigation, quantities/removal, batch ledger math, saved bag state, keyboard, mute, reduced-motion and selection pagination. `tests/labor-entrance.cjs` samples the actual worker/cart animation and delayed objects, fixed controls and reduced-motion. Earlier shop/flow tests now explicitly open the bag before expecting the next page.

## Preserve the original sixth page

The selected-only gallery is removed. Opening the blue bag now shows the original complete seven-object sixth-page illustration and layout, with no selected-only replacement or gallery pagination. Pending selections still feed the existing Record action accurately. On the shop itself, actual selected product artwork is shown inside the bag opening, behind its original front handles/rim and clipped above the front fabric; the top eight units are visible, while the count and bag tooltip describe the full pending selection. Flight and selection sound remain. The shop test asserts the sixth-page SVG is identical before/after selection and checks that actual product copies appear inside the bag.

## Remove pending goods from the bag

Each visible selected unit in the blue bag now has a stationary native removal hit area, with a small cream × on hover/focus (always shown on touch). Clicking it removes that exact pending unit and updates the miniature contents and count, without navigating or altering existing records, debt or issued receipts. Repeated products are removed one unit at a time. Clearing the last pending item leaves the original empty bag. The original sixth-page artwork is unchanged.
