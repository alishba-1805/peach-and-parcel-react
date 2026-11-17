# Verification record

**Date:** 17 November 2026. **Target:** local production build served by Vite preview at http://127.0.0.1:4173. **Browser:** Edge/Chromium 157, Windows. Journey widths: 1280 × 900 and 390 × 844; keyboard/overflow sweeps: 1280 × 900 and 390 × 900. Genuine screenshots are under screenshots/app and screenshots/reference. Raw individual outcomes: browser-results.json.

## Commands actually executed

| Command | Actual result |
| --- | --- |
| npm install | Installed 71 packages and generated package-lock.json |
| npm test | 40 tests PASS, zero failures/skips; Node built-in test runner |
| npm run build | PASS; Vite compiles production dist |
| npm run preview (equivalent Vite CLI launched in background) | Production build opened and tested on port 4173 |
| npm run dev (equivalent Vite CLI) | Initial check exposed missing JSX transform; fixed with vite.config.js; production preview then verified |
| npm audit --omit=dev --json | Zero production vulnerabilities |
| npm audit --json | Four high development-chain findings via picomatch; current registry latest 4.0.7 falls within advisory range |
| Prettier via npm exec | Source formatted; formatting tool is not an app dependency |
| lint | NOT EXECUTED: no lint script configured |

The first browser run found React not defined although the build succeeded. Added Vite's automatic JSX transform. Windows default text decoding also damaged punctuation; corrected files and the UTF-8 writer. Later visual inspection found an offscreen skip link appearing in full-page captures; now it is clipped until keyboard focus. Rebuilt/retested after fixes. Early test-script timing/select naming and native select-popup behavior were corrected in the harness; these were not reported as application failures.

## Individual functional requirements

| ID | Status | Code location (under src/) | Executed evidence |
| --- | --- | --- | --- |
| FR01 | PASS | src/App.jsx; components/Header.jsx | Seven useful routes; Links, Back/Forward; unknown route recovery. browser-results desktop/accessibility. |
| FR02 | PASS | pages/ProductDetails.jsx | Parameterized details and unknown ID tested; detail.png. |
| FR03 | PASS | data/products.js | 12 unique stable IDs; Node catalog assertion and rendered count. |
| FR04 | PASS | pages/Shop.jsx | CHOCOLATE searches title/description without case sensitivity; 2 matches. |
| FR05 | PASS | pages/Shop.jsx | Combined search/category/egg-free; ascending and descending sorting verified. |
| FR06 | PASS | pages/ProductDetails.jsx | Image, description, category, price, servings, stock, recipe, delivery terms and quantity; detail.png. |
| FR07 | PASS | App.add/update/remove; pages/Cart.jsx | Add/remove/increase/decrease; stock overflow feedback; cart.png. |
| FR08 | PASS | src/App.jsx | Header/cards/details/cart/checkout share one cart; filter context retained. |
| FR09 | PASS | pages/Checkout.jsx | Controlled name, phone, address, sector, preference; checkout.png. |
| FR10 | PASS | rules.validateForm; Checkout.submit | Four validation rules; three errors after valid name; retained value; checkout-validation.png. |
| FR11 | PASS | rules.getTotals; OrderSummary.jsx | Live count, line totals, subtotal, fee, total and minimum shortfall; cart.png. |
| FR12 | PASS | utils/rules.js; App.complete; Checkout.jsx | All rule boundaries; direct and repeated checkout; stock-conflict.png, recipe-conflict.png. |
| FR13 | PASS | utils/storage.js; App storage effect | Reload, corrupt JSON, unknown IDs, overstock and explicit correction; browser recovery + Node tests. |
| FR14 | PASS | utils/loadProducts.js; CatalogStatus.jsx | Promise loading/error/retry/abort; loading-error.png, loading-retry.png. |
| FR15 | PASS | CatalogStatus.jsx; Shop.jsx | Empty dataset vs no matching results; useful Restore/Reset; empty-catalog.png, empty-results.png. |
| FR16 | PASS | App.complete; Confirmation.jsx; storage.readReceipt | Itemized demo receipt, refresh, missing receipt, privacy and cleared cart; confirmation.png. |
| FR17 | PASS | styles.css; semantic components | Full journeys + keyboard at 390/1280; no overflow/assets checks on six routes; mobile-shop.png. |
| FR18 | PASS | ProductCard.jsx; Shop.jsx; OrderSummary.jsx | Three distinct observed problems and executed improvements; DECISIONS.md and INVESTIGATION.md. |
| FR19 | BLOCKED | vercel.json; docs/DEPLOYMENT.md | SPA rewrite prepared. Local nested URLs/refresh pass; public GitHub/Vercel require account login. No public claim. |

## Rule boundaries actually executed

- R1 stock 4: 2 valid, 4 valid, 5 invalid in Node; exact 4 and over-limit 5 also tested in UI. Zero stock, zero quantity, negatives, fractions, NaN, infinity and string quantities rejected in Node. Adding an existing quantity past stock leaves count unchanged.
- R2 checked + one egg-free product: enabled and completed. Checked + one egg-containing bento: product-specific conflict and disabled confirmation. Unchecked preference: allowed.
- R3 1,199 fails and exactly 1,200 passes in Node. One 600 loaf in UI: 600 shortfall, checkout blocked. Two loaves: 1,200 subtotal + 200 fee = 1,400. A 1,000 subtotal + 200 fee is still ineligible. All five sectors pass; unsupported F-9 fails.

## Three investigated improvements: actions / expected / observed

| Improvement | Actions | Expected | Observed |
| --- | --- | --- | --- |
| Comparison hierarchy | Open shop, compare bento/cupcakes, locate sold-out red velvet | Consistent recipe, servings, stock and price | PASS: facts on all 12 cards; sold-out label/button distinct; desktop-shop.png |
| Discovery interaction/state | CHOCOLATE → Cookies & bars → egg-free; reset; sort high; detail; Back/Forward | 2 → 1 → 0; helpful reset; sort retained across details | PASS: exact counts and retained selection; empty-results.png, mobile-shop.png |
| Delivery clarity | One loaf → increase to two → checkout → confirm | Shortfall 600; then total 1,400 everywhere | PASS: blocked below minimum, identical itemized totals; cart.png, checkout.png, confirmation.png |

## Recovery and access checklist

| Check | Expected / actual outcome |
| --- | --- |
| Empty cart / direct checkout | PASS: useful menu link; no confirmation bypass |
| Repeated checkout after success | PASS: empty cart prevents second completion |
| Invalid ID / unknown route | PASS: distinct useful messages and navigation |
| Search no matches | PASS: Reset filters; distinct from empty dataset |
| Empty async dataset | PASS: Restore catalog restores 12 records |
| Loader failure/retry | PASS: real rejected Promise; retry succeeds |
| Abort cleanup | PASS: cancelled request rejects AbortError; no stale render update |
| Corrupt localStorage | PASS: visible notice; usable empty cart |
| Old saved ID | PASS: retained, explained, blocked until removed |
| Restored quantity 5, stock 4 | PASS: quantity retained; explicit correction changes to 4 |
| Existing quantity 4 becomes stock 0 | PASS: quantity retained; completion blocked; remove or reset restores flow |
| Fractional/malformed saved quantity | PASS in Node; invalid quantity retained/normalized to conflict with a visible repair notice |
| Missing product image | PASS: intercepted invalid SVG triggers local fallback; image-fallback.png |
| Long product name | PASS: Cinnamon & Brown Butter Blondies detail/cart render at both widths without overflow |
| Invalid form retains valid data | PASS: name stays Demo Guest while phone/address/sector errors appear |
| Confirmation refresh / no receipt | PASS: nonpersonal receipt restores; direct no-receipt access is helpful |
| Personal values in storage | PASS: actual local/session payloads exclude sample name, phone, address |
| Keyboard Tab/Enter/Space | PASS: search, preference, add, form and completion at both widths; focus outline verified |
| Overflow/assets | PASS: six routes × two widths: no page-wide horizontal overflow, images complete |
| Console | PASS: final seven-route sweep zero errors and zero warnings |
| Public direct URLs / deployed source | BLOCKED: Vercel account access/deployment not configured |

**Recorded browser assertions:** 25 desktop + 26 recovery + 25 mobile + 40 keyboard/layout/asset = **116 PASS**. Test function sources are in scripts/browser-*.mjs and were executed through the available Playwright browser tool. These are optional browser checks, not additional runtime dependencies. The standalone runner node scripts/run-browser-checks.mjs was also executed: 116 assertions passed, zero errors/warnings.

## Evidence limits

Public deployment verification is not performed. No real purchase/submission or final reference-site shipping charge was tested. Accessibility checks cover semantic controls, labels, keyboard/focus and layout; no screen-reader audit or full WCAG certification is claimed. Full-page screenshots intentionally preserve their actual states and may require zooming; report figures use readable viewport/element captures where possible.

Public GitHub verified via API: repository visibility PUBLIC, default branch master, remote source SHA matches the pushed local commit. Local remote-config writes were denied, so Git push used the explicit HTTPS URL. Vercel skill fallback attempted: service returned CLI/login instructions instead of a deployment. FR19 remains BLOCKED.
