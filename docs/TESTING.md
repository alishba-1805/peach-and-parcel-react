# Testing

## Unit tests

```bash
npm test
```

The Node.js built-in runner executes the tests in tests/. These import the same business-rule, loader and persistence modules used by the application.

The suite covers:

- Stock limits, including valid, exact-limit and over-limit quantities.
- Zero, negative, fractional and malformed quantities.
- Egg-free compatibility and product-specific conflicts.
- The PKR 1,200 product minimum and separate PKR 200 delivery fee.
- Delivery-form validation and supported sectors.
- Corrupt saved data, unknown IDs, duplicates and nonpersonal receipt restoration.
- Catalog loading, failure/retry, empty data and cancellation.

## Production build

```bash
npm run build
npm run preview
```

Open the URL printed by Vite. Preview normally uses http://127.0.0.1:4173.

## Browser regression checks

Microsoft Edge is the default browser. Install the optional runner without changing project dependencies:

```bash
npm install --no-save --package-lock=false playwright
```

With production preview running, execute:

```bash
node scripts/run-browser-checks.mjs
```

The browser checks cover the complete shopping journey at 390px and 1280px, keyboard interaction, Back/Forward navigation, loading recovery, cart restoration, form validation, confirmation refresh, image fallbacks, asset loading and horizontal overflow.

Generated screenshots are written to .cache/browser/ and the results to .cache/browser-summary.json. These outputs are ignored by Git. The two README screenshots are maintained separately in docs/images/.

## Recovery scenarios

Open **Catalog scenarios** in the footer:

| Scenario | Expected behavior |
| --- | --- |
| Simulate loading failure | An error appears; Retry loading restores the catalog |
| Simulate empty catalog | A catalog-empty message appears; Restore catalog recovers products |
| Reduce stock | Existing selections remain, with a conflict until corrected or removed |
| Reset catalog | Original stock and products return; the cart is retained |

A search with no matches has its own Reset filters action, separate from an empty catalog.

To inspect corrupt-cart recovery, use browser DevTools:

```js
localStorage.setItem('peach-parcel-cart', '{invalid');
location.reload();
```

To inspect an outdated product selection:

```js
localStorage.setItem('peach-parcel-cart', JSON.stringify([
  { id: 'old-dessert', quantity: 2 },
  { id: 'strawberry-bento', quantity: 5 }
]));
location.assign('/cart');
```

The cart should explain both conflicts and require an explicit correction or removal.

## Verified results

Last checked on 18 November 2026:

- 46 unit tests passed (the original 40 plus six focused calculation/recovery tests).
- 150 browser assertions passed (the original 116 plus 34 additional recovery/access checks).
- Production build completed.
- Browser checks recorded no console errors or warnings.

Public deployment checks are separate from local verification. Keyboard and semantic-control checks do not constitute a full accessibility audit.

## Dependency audit

Run npm audit --omit=dev to inspect production dependencies and npm audit for the full dependency tree. The previous full audit reported development-only findings in Vite's glob dependency chain; no production findings were reported.

The before/after audit, complete requirement matrix and command output are in [VERIFICATION.md](VERIFICATION.md). Set BROWSER_BASE_URL when using a preview port other than 4173.
