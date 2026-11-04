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
