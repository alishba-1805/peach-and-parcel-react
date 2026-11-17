# React alignment audit

Audited before source changes on 18 November 2026, at commit 350bb106d00abbb42c43f10889548414b93701c7.

Read both supplied alignment documents in full, all nine scanned ReactWeb.pdf pages and all twelve note photographs, and the original nine-page Assignment 02 PDF recovered from the local archive.

## Fresh baseline

- npm test: 40 passed, no failures or skips.
- npm run build: passed; two non-fatal React Router module-directive warnings on stderr.
- node scripts/run-browser-checks.mjs: 116 passed, zero browser errors/warnings.
- Browser: Edge/Chromium 157. Complete journeys: 390 × 844 and 1280 × 900. Keyboard/layout sweeps: 390 × 900 and 1280 × 900.
- Baseline command output and screenshots retained locally under the original workspace's .cache/alignment-baseline.json and .cache/alignment-baseline-images/.
- GitHub default and sole public branch: main. The primary checkout's HEAD is write-protected and remains master. Changes are made in a linked main worktree; no history rewrite or force push is required.

## Before-change audit

| File / group | Current purpose | Lecture concept | Finding / action | Risk | Regression evidence |
| --- | --- | --- | --- | --- | --- |
| src/App.jsx | Shared cart, catalog, routing and effects | State, callback props, immutable updates; photos 4, 9 | SIMPLIFY nested stock/add conditions; name cart actions explicitly. KEEP state owner, routes, lazy restore and abort cleanup. | Stock validation or shared state could diverge | Existing full journeys, stock/recovery checks |
| src/pages/Shop.jsx | Combined discovery controls | filter, map, events; photos 3, 5, 7, 8 | SIMPLIFY filter into named checks and sorting into ordinary if statements on slice(). Add explicit label IDs. | Combining controls or sort order | Existing combined search/category/recipe and both sorts |
| src/utils/rules.js | Business rules and totals | Plain conditions, reduce, find; assignment additions | SIMPLIFY flatMap/filter(Boolean) issue construction into a direct loop; use one small shared getLineTotal function. | Invalid saved quantities, totals or issue ordering | Existing rule tests plus focused line-total tests |
| src/pages/Cart.jsx | Display and correct selected items | map and callbacks; photos 4, 7, 8 | REUSE shared line-total helper. KEEP recovery controls and layout. | Invalid saved selection display | Restored unknown/overstock checks; cart totals |
| src/pages/Checkout.jsx | Controlled form and completion | value/onChange, object spread; photos 5, 10 | SIMPLIFY by showing the two text inputs directly instead of a render helper; name updateField/handleSubmit clearly. Reuse line-total helper. | Form identity, retained values or validation | Existing invalid/valid form, keyboard and privacy checks |
| src/components/ProductImage.jsx | Broken-image fallback | State and conditional rendering; photos 2, 8 | SIMPLIFY direct DOM src assignment to useState and an onError callback. | Fallback behavior | Existing intercepted invalid-image browser assertion |
| src/pages/ProductDetails.jsx | Single product, quantity and invalid-ID state | find, state, conditional; PDF pp.3–6 | KEEP; only add an explicit quantity label association. | Accessible name change | Existing details, quantity and invalid-ID checks |
| src/utils/loadProducts.js | Delayed local Promise with failure and abort | Effects/async; photos 9–12 | KEEP. AbortController is justified by existing cancellation behavior and tests. | Stale updates / broken retry | Existing loader tests and failure/retry browser checks |
| src/utils/storage.js | Safe cart and nonpersonal receipt restoration | Objects and arrays; assignment persistence | KEEP. Input-shape checks protect saved-state recovery; simplifying them would remove useful safeguards. | Lost saved entries or PII | Existing storage and privacy tests |
| Header, ProductCard, QuantityControl, OrderSummary | Small reusable UI components | Props, callbacks, children; PDF pp.2–9, photo 4 | KEEP. Already concise, meaningful components. | Unnecessary abstraction | Existing component behavior through full journeys |
| CatalogStatus, ScenarioChecks | Loading/empty/error/retry and recovery controls | Conditional rendering/events; photos 2, 6, 9 | KEEP. States are distinct and controls are required. | Loss of recovery | Existing recovery scenarios |
| Home, Confirmation, NotFound | Identity and safe route outcomes | JSX, props, conditions | KEEP, including exact simulated receipt wording. | Changed content or route contract | Existing route and receipt-refresh checks |
| src/main.jsx | Mount App with Router and StrictMode | React root, modules; PDF pp.1–2, 7 | KEEP. Vite stays; lecture CRA setup is not a migration requirement. | App bootstrap | Build and browser startup |
| src/data/products.js; public/ | 12 records and original local assets | Arrays/objects/map; photos 5, 8 | KEEP byte-for-byte. | Changed IDs, prices, inventory or imagery | SHA-256 preservation and catalog tests |
| src/styles.css | Authored visual system and responsive layouts | className and CSS; notes plus assignment | KEEP byte-for-byte, including both width breakpoints and reduced-motion behavior. | Visual/mobile regression | SHA-256, screenshot comparison and overflow/focus checks |
| package.json, package-lock.json, vercel.json, vite.config.js | Existing tooling and SPA configuration | Assignment infrastructure | KEEP installed versions and lockfile; no new runtime dependency. | Build / direct routes | npm install, lockfile check, build and refresh checks |
| tests and browser scripts | Existing 40 / 116 checks | Assignment testing | KEEP every existing assertion; add only focused coverage for extracted calculations and documented recovery gaps. | Weaker coverage | Counts and individual result records |
| README and documentation | Setup, behavior, design and deployment | Concept explanations | UPDATE actual concept locations; restore requested viva, verification, genuine reference evidence and editable report from the archive. | Stale claims or broken links | Link check and report/artifact validation |

## Scope

No CSS redesign, product changes, route changes, price changes, backend, state library, custom hook, dependency migration or new shopping feature. React-rendered image fallback is the only change from imperative UI mutation. Focus management remains the justified DOM access.

React's official state/effect documentation was cross-checked alongside the supplied notes:
- https://react.dev/learn/updating-arrays-in-state
- https://react.dev/reference/react/useEffect

The notes illustrate concepts, not every correctness requirement: routing, persistence, Node tests, stock/recipe/delivery rules and public deployment still apply.
