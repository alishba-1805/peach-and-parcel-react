# React lecture alignment

This map is based on direct inspection of ReactWeb.pdf (all 9 scanned pages) and all 12 photographs in the supplied react notes.zip. The supplied concept-map and alignment prompt were read in full. Private lecture scans are not copied into this public repository.

ReactWeb.pdf page numbers below are one-based. Photos P1–P12 use the archive's order; exact filenames are listed below.

## Concept map

| Lecture topic | Note source | Actual file | Component / function | What it does | 15–30 second demonstration |
| --- | --- | --- | --- | --- | --- |
| React library and component tree | PDF p.1 | src/App.jsx | App | Composes navigation, route pages and footer from small components | Point to Header and Shop inside App; each function owns a clear UI responsibility |
| Root and JSX | PDF pp.1–2, 7 | src/main.jsx; src/components/ProductCard.jsx | createRoot; ProductCard | Mounts App and renders expressions in JSX | Show product.name in braces and the className attribute |
| Function components | PDF pp.2, 7 | src/components/Header.jsx | Header | Returns semantic navigation JSX | Explain that Header is a JavaScript function receiving count |
| Default/named imports and exports | PDF pp.2, 6–9 | src/components/OrderSummary.jsx; src/utils/rules.js | OrderSummary; money; checkStock | Separates UI and independently testable calculations | Show default OrderSummary and named money imports in Cart |
| Props and destructuring | PDF pp.3, 5, 9; P8 | src/components/ProductCard.jsx | ProductCard({ product, onAdd, selected }) | Reads parent-provided product data without mutation | Compare a card's product prop to its visible name/stock |
| Callback props | P4 | src/App.jsx; src/components/QuantityControl.jsx | addToCart; changeQuantity; onChange | Child buttons request changes; App updates shared cart | Increase a cart quantity and watch the header/summary change |
| children | P1, P4 | src/components/OrderSummary.jsx | OrderSummary({ totals, children }) | Shares one summary layout while pages provide links or receipt lines | Compare OrderSummary usage in Cart and Checkout |
| useState | PDF pp.4, 6, 8; P2, P5, P8, P10 | src/App.jsx; src/pages/Checkout.jsx | cart; values/errors | Stores values that affect rendering | Type a sample name and point to value={values.name} |
| Functional state update | State in PDF p.6; callback ownership in P4; safer assignment pattern | src/App.jsx | addToCart; changeQuantity; removeFromCart | Calculates from previous state supplied by React | Explain setCart(previous => previous.filter(...)) |
| Immutable arrays and objects | Spread in P1; state/objects in P4–P5 | src/App.jsx; src/pages/Checkout.jsx | cart handlers; updateField | Returns new arrays/objects rather than mutating state or props | Show ...previous and the updated field in updateField |
| map and stable keys | P3, P7, P8; stable keys required by assignment | src/pages/Shop.jsx; src/pages/Cart.jsx | product/cart maps | Returns one element per record, keyed by stable ID | Sort the menu; IDs still identify the same cards |
| filter | Assignment JavaScript requirement; P3/P7 teach list iteration | src/pages/Shop.jsx | matches | Combines named search/category/recipe checks | CHOCOLATE → Cookies & bars → egg-free gives 2 → 1 → 0 |
| slice and sort | Assignment discovery requirement; ordinary JavaScript | src/pages/Shop.jsx | visible | Copies matches before sorting by price | Select low/high; explain why the catalog is not sorted in place |
| find | Assignment JavaScript requirement; arrays in P8 | src/pages/ProductDetails.jsx; src/utils/rules.js | product lookup; getTotals | Locates a stable product ID | Open a known product and then an unknown ID |
| reduce and computed totals | Assignment summary requirement; ordinary JavaScript | src/utils/rules.js | getTotals; getLineTotal | Derives count, subtotal, fee, total and shortfall from current state | Two lemon loaves → 1,200 + 200 = 1,400 |
| Event handlers | PDF pp.3, 8; P2, P5, P10 | src/pages/Checkout.jsx; src/components/ProductCard.jsx | updateField; handleSubmit; onClick | Handles input/actions through React | Press Add, then submit an incomplete form |
| Controlled forms / preventDefault | P5, P10; submit behavior required by assignment | src/pages/Checkout.jsx | values; updateField; handleSubmit | Keeps form data in one object and prevents page submission | Keep a valid name while three remaining fields show errors |
| Conditional rendering | P2, P6–P9 | src/components/CatalogStatus.jsx; src/components/ProductImage.jsx | CatalogStatus; imageFailed | Chooses loading, error, empty or fallback UI | Trigger failure/retry and inspect the image fallback |
| useEffect / dependencies | P9, P10 | src/App.jsx | fetchCatalog effect; cart storage effect | Synchronizes catalog requests and browser storage with state | Explain [request] and [cart]; reload a selected parcel |
| Cleanup / stale-request protection | Assignment recovery requirement; effect foundation in P9 | src/App.jsx; src/utils/loadProducts.js | controller.abort; loadProducts | Cancels the previous request and avoids stale updates | Trigger failure then reset quickly; the reset catalog wins |
| Promise and async/await | P9, P11, P12 | src/utils/loadProducts.js; src/App.jsx | loadProducts; fetchCatalog | Resolves local data later and catches a real failure | Open Catalog scenarios → failure → Retry loading |
| localStorage | Assignment addition, not detailed in scans | src/utils/storage.js; src/App.jsx | readCart; parseCart; cart effect | Saves IDs/quantities and restores readable conflicts | Reload a saved cart; test an old ID without silently removing it |
| Receipt refresh and privacy | Assignment addition | src/utils/storage.js; src/App.jsx | readReceipt; completeOrder | Stores only nonpersonal itemized summary data in sessionStorage | Confirm with sample values, refresh, inspect storage |
| Routing and URL parameters | Assignment addition, not detailed in scans | src/App.jsx; src/pages/ProductDetails.jsx; src/pages/Checkout.jsx | Routes; useParams; useNavigate | Maps useful paths and navigates after valid completion | Directly open /products/strawberry-bento and use Back/Forward |
| Pure business rules and Node test | Assignment addition | src/utils/rules.js; tests/rules.test.js | checkStock; checkCompatibility; checkMinimum | UI and Node use the same exported rule functions | Run npm test; show stock 2/4/5 against limit 4 |
| Responsive CSS / accessible controls | Assignment addition; className in P1 | src/styles.css; Checkout/Shop labels | width media queries; htmlFor/id | Preserves layout, focus and associated feedback | Use 390px/1280px and complete checkout with keyboard |
| Virtual DOM / rendering | PDF pp.1, 4; P1 | src/main.jsx; ordinary React components | ReactDOM root and React rendering | React calculates UI updates; ReactDOM applies them to the browser | Explain why changing a normal local variable does not update the screen |

## Photograph index

| ID | Filename suffix after “WhatsApp Image 2026-11-18 at” | Visible content |
| --- | --- | --- |
| P1 | 3.13.37 AM.jpeg | Virtual DOM notes, immutable props, spread, children and className |
| P2 | 3.13.38 AM (1).jpeg | Conditional rendering, state and action callback |
| P3 | 3.13.38 AM (2).jpeg | forEach versus map and returning JSX lists |
| P4 | 3.13.38 AM.jpeg | children wrapper, child-to-parent callback and state checks |
| P5 | 3.13.39 AM (1).jpeg | Arrays of objects, controlled input and onChange |
| P6 | 3.13.39 AM.jpeg | if/else view selection |
| P7 | 3.13.40 AM.jpeg | Conditions inside map and JSX list placement |
| P8 | 3.13.48 AM.jpeg | Destructuring, state arrays and passing each object to a component |
| P9 | 3.13.59 AM.jpeg | Effect, dependency choices, async retrieval and conditional list |
| P10 | 3.14.03 AM.jpeg | Effect dependency example and input state |
| P11 | 3.14.10 AM.jpeg | Promise success/failure, POST example and spreading an array |
| P12 | 3.14.14 AM.jpeg | Async/await and a delayed setTimeout example |

## Choices made during the audit

- Kept Vite. The PDF's Create React App commands are a setup example, not a requirement to migrate an existing app.
- Kept ordinary useState, props and callbacks. No Context, custom hook, useReducer, memoization or new state dependency was introduced.
- Replaced nested conditions with named steps where that improved readability.
- Kept AbortController and safe storage parsing because removing them would weaken tested recovery behavior.
- Replaced direct image-src mutation with state and conditional rendering.
- Kept OrderSummary's existing children prop; no unnecessary wrapper component was added.
- Kept all 12 records, exact prices/rules, route contracts, receipt wording, original assets and CSS.

## Classroom examples that need care

A normal counter++ does not request a React render; use the state setter. Do not copy an effect that repeatedly changes its own dependency without a reason. map returns rendered elements; forEach does not return a rendered list. Use stable ID keys even if a classroom snippet omits them. React fragments are valid. The network POST example explains asynchronous JavaScript; this project remains local-only with no backend or real order.

The scans do not comprehensively teach routing, storage, Node testing, deployment or accessibility. Those are retained because the assignment requires them, and are identified as additions in this table rather than attributed to the lecturer.
