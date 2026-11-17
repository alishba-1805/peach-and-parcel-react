# Peach & Parcel

[STUDENT NAME] · [ROLL NUMBER] · [SECTION]  
CS4032 Web Programming, Assignment 02, FAST-NUCES Islamabad, Fall 2026

A fictional boutique dessert studio for students, young professionals and small celebrations. Twelve original dessert records support discovery, comparison, selection, a fictional delivery form, calculated review and simulated confirmation. Coverage: **F-6, F-7, F-8, G-9 and G-10, Islamabad**. The business goal is a valid simulated dessert-order request.

**GitHub:** https://github.com/alishba-1805/peach-and-parcel-react  
**Vercel:** [NOT DEPLOYED — account login required]

## Run locally

Use Node 22.12+ (tested with Node 24.11.0) and npm.

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

Open the URL printed by Vite. Production preview normally uses http://127.0.0.1:4173. Tests use Node's built-in runner; no Jest/Vitest. No lint script is configured. Only React, React DOM, React Router DOM and Vite are project dependencies. The lockfile records exact installed versions. Optional browser recheck: install Playwright without saving it (npm install --no-save --package-lock=false playwright), run npm run build and npm run preview in a separate terminal, then node scripts/run-browser-checks.mjs. This standalone runner was also executed: 116 passed, zero errors/warnings.

## Routes and features

| Route | Purpose |
| --- | --- |
| / | Brand, audience, delivery terms and primary menu link |
| /shop | Combined case-insensitive search, category/recipe filters and price sorting |
| /products/:id | Full facts, stock, quantity, recipe and delivery terms |
| /cart | Add/remove/increase/decrease, conflicts, totals and minimum progress |
| /checkout | Controlled delivery form, four validations and egg-free preference |
| /confirmation | Nonpersonal itemized demo receipt, safe refresh and empty fallback |
| Other URLs | Useful 404 with a route back to the menu |

Shared cart and catalog state live in App.jsx. Filter state survives details/navigation in this visit; the cart survives reload. Query filters intentionally reset on a full reload. Unknown IDs stay in restored carts for explicit removal.

## Three operating rules

The exact exported functions in **src/utils/rules.js** are used by the UI and Node tests.

| Rule | Condition and communication | Valid / invalid behavior and boundary |
| --- | --- | --- |
| R1: availability | Positive safe integer quantity ≤ current stock. Stock appears on cards/details; conflicts appear in cart/checkout and action messages. | Stock 4: quantity 2 PASS, 4 PASS, 5 blocked. Zero/negative/fractional quantities blocked. Reduced stock retains the item and blocks completion until correction/removal. |
| R2: compatibility | If checkout's egg-free-only preference is on, every product must have eggFree=true. Recipe labels appear on every card/details and beside cart items. | One compatible item passes; one incompatible item produces a product-specific conflict and disables confirmation. Ordinary preference accepts both. Labels are simulated, not allergy/cross-contamination guarantees. |
| R3: delivery | Product subtotal ≥ PKR 1,200; fixed delivery fee PKR 200 is separate and excluded from the minimum. Form sector must be one of the five listed sectors. Terms appear before checkout and in summaries. | 1,199 fails; exactly 1,200 passes; 1,200 + 200 = 1,400. A 1,000 subtotal plus 200 delivery still fails. Cart shows the shortfall; direct checkout also prevents completion. |

## Reproduce recovery cases

Open the footer's **Demo checks · for assessment** on the menu/cart.

1. **Simulate loading failure:** the actual Promise rejects after 450ms. Loading feedback appears, then an error. Click **Retry loading** for the ordinary catalog.
2. **Simulate empty catalog:** the Promise resolves with zero records. Click **Restore catalog**. Compare with searching for `zzzz`, which shows **No desserts match your search** and **Reset filters**.
3. **Reduce demo stock:** first add 4 Strawberry Sunday Bentos or 4 Vanilla Cloud Cupcakes. Reduce demo stock: bento becomes 0 and cupcakes become 2. The original quantity stays; cart/checkout block. Remove the bento or use **Use an available quantity** for the cupcakes.
4. **Reset demo data:** restores ordinary data/stock and keeps the cart. Demo overrides reset on full reload.

Additional cases in DevTools → Application → Local Storage:

```js
localStorage.setItem('peach-parcel-cart', '{broken');
location.reload();
```

A visible recovery notice appears. To test old IDs and overstock:

```js
localStorage.setItem('peach-parcel-cart', JSON.stringify([
  {id:'old-dessert',quantity:2},
  {id:'strawberry-bento',quantity:5}
]));
location.assign('/cart');
```

Both entries remain with specific conflicts. Remove the old entry and explicitly correct the bento quantity. Missing images switch once to /images/fallback.svg. Visit /products/not-real, /not-real, /checkout with an empty cart and /confirmation without a receipt for useful next actions.

## Concept map

| Concept | Real source and use |
| --- | --- |
| Components, modules, JSX, semantic elements | components/Header.jsx, ProductCard.jsx, pages/*.jsx |
| Props and callback props | App → Shop → ProductCard; App → Cart → QuantityControl |
| Events and preventDefault | Checkout.submit; Shop.change; App.add/update/remove |
| useState, controlled fields, object spread | Checkout values/errors and change; Shop filters |
| Functional updates, immutable arrays | App.add/update/remove; filters setFilters |
| map and stable keys | Shop product grid, Cart items, Confirmation receipt |
| Conditional rendering | CatalogStatus, empty Cart, NotFound, field errors |
| Lifted shared state | App cart/catalog/filters and callback props |
| Derived totals and reduce | rules.getTotals, OrderSummary |
| useEffect and cleanup | App async catalog effect uses AbortController; storage effect depends on cart; route effect depends on pathname |
| filter, sort, find, destructuring | Shop results and sort; App and rules product lookups; storage receipt projection |
| Promise, async/await, failure handling | utils/loadProducts.js; App.fetchCatalog try/catch |
| localStorage read/write | utils/storage.js; App cart effect; IDs + quantities only |
| sessionStorage | readReceipt and App.complete, nonpersonal summary only |
| Route parameters/navigation | ProductDetails.useParams; Checkout.useNavigate; Header Links/NavLinks |

## Evidence and quality

See [verification](docs/VERIFICATION.md), [raw browser results](docs/browser-results.json), [investigation](docs/INVESTIGATION.md), [three decisions](DECISIONS.md), [report source](docs/REPORT.html), [viva guide](VIVA_GUIDE.md) and [deployment/submission steps](docs/DEPLOYMENT.md).

Executed: 40 Node tests pass; 116 browser assertions pass across desktop/mobile journeys, recovery, keyboard access, assets and overflow. Final production preview console sweep: zero errors/warnings across seven routes. Browser evidence is Edge/Chromium 157 on Windows. This is a local check, not public deployment verification.

All dessert illustrations and favicon are original locally authored SVGs. No third-party product photography, fonts or hotlinks. Source and rights: docs/ASSETS.md. React Router declarative routing was checked against official documentation: https://reactrouter.com/start/declarative/routing.

## Demo limits

No server, API, payment, account, real orders or real personal-data submission. Use sample information only. Form values stay in component memory and disappear on navigation/reload. Cart storage contains IDs/quantities; session receipt contains product names/prices/quantities/totals/reference only. Tabs do not synchronize live. Stock is simulated and does not decrement as real inventory.

The starting folder had no Git repository or remote. An initial restricted-network auth check failed; a fresh check through the working Windows tool confirmed authenticated access. Genuine staged local commits are published to the public GitHub repository above. The original public-at-the-beginning requirement was not satisfied and no history was fabricated. Public Vercel deployment remains incomplete. Student details must be supplied. Full npm audit reports four high findings in Vite's development-only glob dependency chain; npm audit --omit=dev reports zero production findings. The registry currently offers no patched picomatch version for that advisory; do not expose the development server publicly.
