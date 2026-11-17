# Verification

Checked on 18 November 2026 against the production build in the main worktree. The supplied React notes and all nine original assignment pages were reviewed before source changes. Fresh baseline results were recorded instead of relying on earlier conversation claims.

## Commands and actual results

| Command | Baseline | After refactor |
| --- | --- | --- |
| npm install | Existing installation inspected before baseline | Exit 0; lockfile and dependency declarations unchanged |
| npm test | 40 passed, 0 failed | 46 passed, 0 failed; original 40 retained, six focused tests added |
| npm run build | Exit 0 | Exit 0; 59 modules transformed |
| node scripts/run-browser-checks.mjs | 116 passed | 150 passed; original 116 retained, 34 additional recovery/access assertions |
| npm run lint | NOT RUN: no lint script | NOT RUN: no lint script |
| Before/after rule comparison | Original rule output retained as reference | 73 comparisons passed across quantities, stocks, totals, issue ordering and minima |
| Visual comparison | Original production captures retained | 12 selected before/after PNGs are byte-identical |

Exact command stdout/stderr, individual assertions, visual results and preserved source records are in [verification/results.json](verification/results.json).

The isolated final preview was started with:
```text
node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4175 --strictPort
```

The browser run used the optional BROWSER_BASE_URL override:
```powershell
$env:BROWSER_BASE_URL='http://127.0.0.1:4175'
node scripts/run-browser-checks.mjs
```

Without that override, the runner uses the ordinary preview at http://127.0.0.1:4173. Browser: Edge/Chromium 157 on Windows.

## Requirement matrix

| ID | Status | Code location (under src/) | Actual evidence |
| --- | --- | --- | --- |
| FR01 | PASS | App.jsx; Header.jsx | Routes, unknown-page recovery, Back/Forward and retained context; journey/access checks. |
| FR02 | PASS | ProductDetails.jsx | Known/unknown IDs and direct product refresh at 390/1280; detail.png. |
| FR03 | PASS | data/products.js | 12 unique unchanged IDs; catalog test and rendered count. |
| FR04 | PASS | Shop.jsx: matches | Case-insensitive title/description/category search; CHOCOLATE gives 2 results. |
| FR05 | PASS | Shop.jsx: matches/visible | Search/category/recipe combine; low/high price sorting; slice preserves input. |
| FR06 | PASS | ProductDetails.jsx | Facts, image, recipe, stock, terms and quantity; detail.png. |
| FR07 | PASS | App: addToCart/changeQuantity/removeFromCart | Add/remove/increase/decrease, stock checks and explicit recovery; cart.png. |
| FR08 | PASS | App.jsx | One lifted cart for header/cards/details/cart/checkout; existing browser coverage. |
| FR09 | PASS | Checkout.jsx: values/updateField | Name, phone, address, sector and preference remain controlled. |
| FR10 | PASS | Checkout: handleSubmit; rules: validateForm | Four specific errors, valid values retained and associated labels/errors at both widths. |
| FR11 | PASS | rules: getLineTotal/getTotals; OrderSummary | Live count, lines, subtotal, fee, total and shortfall; 1,200 + 200 = 1,400. |
| FR12 | PASS | rules.js; App: completeOrder | All stock/recipe/minimum rules block invalid completion; direct checkout also checked. |
| FR13 | PASS | storage.js; App cart effect | Reload, malformed JSON, old IDs, overstock and explicit repair; storage/browser tests. |
| FR14 | PASS | loadProducts.js; App fetchCatalog effect | Loading/failure/retry, AbortController cleanup and superseded-request recovery. |
| FR15 | PASS | CatalogStatus.jsx; Shop.jsx | Zero records vs zero matches; Restore/Reset paths preserve existing selections. |
| FR16 | PASS | App: completeOrder; Confirmation; readReceipt | Unchanged simulated receipt, safe refresh/no receipt, privacy and cleared cart. |
| FR17 | PASS | styles.css; control labels | Full pointer/keyboard journeys at 390/1280; focus, assets and no page-wide overflow. |
| FR18 | PASS | ProductCard; Shop; OrderSummary; DECISIONS.md | Three original observations and unchanged reference captures restored; improvements retested. |
| FR19 | BLOCKED | vercel.json; docs/DEPLOYMENT.md | Local nested refresh passes. No configured/supplied public deployment URL or public source verification. |

## Business-rule boundaries

| Rule | Executed cases | Result |
| --- | --- | --- |
| Stock | Stock 4 accepts quantities 2/4; rejects 5, 0, negatives, fractions, NaN, infinity and numeric strings | PASS in shared Node functions; invalid 0/-1/1.5 and exact/over-limit adds also exercised in browser |
| Restored/decreased stock | Unknown saved ID; saved 5 vs stock 4; existing 4 becomes 0; existing cupcakes 4 becomes 2 | PASS: items retained, conflict shown, direct checkout blocked, explicit repair/removal succeeds |
| Egg-free preference | One compatible item, one incompatible item, ordinary preference, and correction by unchecking | PASS: product-specific conflict and completion blocking; no allergy guarantee |
| Delivery | Subtotals 1,199 / 1,200 / 1,201; subtotal 1,000 plus 200 fee; two loaves 1,200 + 200 | PASS: fee excluded from minimum; exact threshold succeeds |
| Sector/form | Five supported sectors; unsupported sector and invalid name/mobile/address | PASS: four field-specific rules; other valid input retained |

## Browser coverage and recovery

The 150 passing browser assertions comprise 25 desktop journey + 26 recovery + 25 mobile journey + 40 keyboard/layout/asset + 34 additional regressions.

- Full pointer journey at 1280 × 900 and 390 × 844.
- Full keyboard journey and six-route layout/asset sweep at 1280 × 900 and 390 × 900.
- Back/Forward; retained filters; unknown page/product; nested product/cart/checkout/confirmation reload behavior.
- Empty cart and repeated checkout; explicit simulated receipt; nonpersonal session refresh.
- Missing image fallback; long product name; no horizontal overflow; visible 3px keyboard focus.
- Corrupt JSON, old IDs, overstock and changed availability without silent deletion.
- Real loader rejection/retry; zero records vs no matches; selection retained across empty/failed loading.
- Rapid failure/reset: a superseded request cannot replace the restored catalog.
- Explicit htmlFor/id associations and aria-describedby targets; incomplete form has four associated errors.
- Privacy: name, phone and address absent from saved cart/receipt.

The first isolated-browser attempt found a test-harness URL literal still pointing to the stopped original preview; the configurable base URL was corrected. A subsequent 60-second tool invocation timed out before the expanded suite finished; rerunning with sufficient tool time completed all 150 checks. No application assertion was removed or weakened.

## Investigated improvements: actions / expected / observed

| Improvement | Actions | Expected | Observed |
| --- | --- | --- | --- |
| Comparison information | Open shop, compare bento/cupcakes and sold-out red velvet | Serving, recipe, stock and price visible consistently | PASS: all 12 cards; [desktop shop](screenshots/app/desktop-shop.png) |
| Search/context | CHOCOLATE → Cookies & bars → egg-free; reset; detail/Back/Forward | Counts 2 → 1 → 0; reset path; context retained | PASS: exact counts and retained sorting; [empty results](screenshots/app/empty-results.png) |
| Delivery clarity | One loaf → increase to two → checkout → confirm | Shortfall 600, then subtotal 1,200 + 200 = 1,400 | PASS: blocked below threshold, matching itemized totals; [cart](screenshots/app/cart.png), [checkout](screenshots/app/checkout.png) |

Original observations are dated 17 November 2026 and restored unchanged from the local archive. Seven reference screenshot hashes were checked after restoration. No new reference-site defect or measured sales impact is claimed.

## Design and regression limits

CSS, product data, local artwork, package.json, lockfile, route configuration and tooling configuration are unchanged in Git. All twelve selected PNG comparisons are byte-identical, including mobile, details, cart, form errors and stock conflict. Confirmation was excluded from byte comparison because its reference is time-based.

Browser console: zero errors and warnings. Both baseline and final builds emit two non-fatal React Router module-directive warnings that “use client” is ignored by the client-side bundle; builds complete. These dependency warnings were recorded rather than suppressed. npm install still reports four development-chain audit findings; npm audit --omit=dev --json completed with zero production vulnerabilities.

No public deployment URL is configured/supplied. GitHub's sole/default branch is main, but local preview checks do not satisfy FR19. No full screen-reader/WCAG certification or real order is claimed.

## Git and artifacts

Work is performed in a linked main worktree because the primary checkout's .git/HEAD is write-protected. Existing history is preserved and only new commits are added. Pushes target alishba-1805/peach-and-parcel-react/main without force.

The tracked report retains [FINAL_COMMIT_HASH]. After the final commit, the submission generator inserts the actual hash into an external standalone report and archives HEAD. Student name/roll are Alishba Inam / 24i-2036. Section and a verified public Vercel URL remain outstanding.
