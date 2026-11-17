# Ten-minute viva guide

Understand the submitted code and explain assistance honestly. Practice without reading a script.

| Time | Demonstrate / explain |
| --- | --- |
| 0:00–1:00 | Fictional dessert studio, students/young professionals, five Islamabad sectors, valid simulated delivery request. Show original reference evidence and distinguish observation from inferred business effect. |
| 1:00–2:00 | Shop search CHOCOLATE, category and recipe filters, price sort. Explain filter → copy/sort → map with stable IDs. Open details and return with context intact. |
| 2:00–3:00 | Add two loaves. Show App owns the cart; Header, cards, cart and summary get props. QuantityControl calls a callback; it does not mutate shared state. |
| 3:00–4:00 | Open rules.js. Stock 4 accepts 2 and 4, rejects 5. Egg-free requirement checks every selected product. Product minimum 1,200 excludes fee 200. Explain exact boundary tests. |
| 4:00–5:00 | Invalid checkout: valid sample name stays while other errors appear. Controlled fields read from values; onChange uses object spread. submit calls preventDefault and shared validators before completing. |
| 5:00–6:00 | Correct sample form and confirm. Explain derived totals, itemized simulated receipt, cart clear only after valid completion, receipt refresh and no personal data in storage. |
| 6:00–7:00 | Reload cart and demonstrate reduced stock/old ID conflict. Explain IDs/quantities persisted, current catalog is authoritative, conflicting saved items stay until corrected/removed. |
| 7:00–8:00 | Loading failure → retry; empty catalog vs no matching search. Explain Promise, async/await, try/catch, effect dependencies and AbortController cleanup. |
| 8:00–9:00 | Mobile and keyboard: one-column cards, focus, labels, text errors, primary actions. Explain all three DECISIONS entries and tradeoffs. |
| 9:00–10:00 | Run npm test, show same imported checkStock is used in UI. Locate a small constant/function edit. Show genuine commit history and public deployment when available. |

## Likely questions

**What is a component?** A function returning JSX for one meaningful part of the UI. ProductCard displays one product passed as a prop.

**Why callback props?** Child components report an action to App, which owns the cart. This keeps one source of truth.

**Why lift state?** Header count, product selections, cart and checkout must agree. Each reads the same App cart rather than keeping independent copies.

**Why functional updates?** `setCart(previous => ...)` calculates from the latest state React provides. Updates return new arrays/objects; map changes one entry, filter removes one, spread adds one.

**Why not store totals as state?** They can be recalculated from cart/catalog using reduce. A separate total state could go stale.

**Why copy before sort?** sort mutates its array; copying avoids modifying existing data.

**Why stable keys?** Product IDs identify the same record across sorting/filtering, unlike array indices.

**What does useEffect do here?** It synchronizes with storage and the mock loader. The loader effect depends on request; cleanup aborts the previous request. The storage effect depends on cart. A route effect updates title, scroll and focus.

**Is the mock loader a real API?** No. It is a delayed Promise over local data. It genuinely rejects in the documented failure mode, so loading/error/retry behavior is demonstrable.

**Why keep invalid saved items?** Silently removing them would hide what changed. Explain the conflict, block confirmation and let the customer correct/remove.

**Why localStorage and sessionStorage?** Cart can survive browser restarts; the receipt only needs to survive refresh in the same tab. Customer fields are never persisted.

**What if storage JSON is corrupt?** parseCart catches parsing errors and returns an empty usable cart with a visible notice. Unknown but readable IDs remain as conflicts.

**How do routes work?** BrowserRouter supplies history; Routes matches paths; useParams reads the product ID; navigate moves to confirmation after success. The host rewrite lets refresh on a nested path load the SPA.

**How do you prevent bypass?** Add/update use checkStock; cart/checkout derive current conflicts; submit checks form and rules; App.complete checks the current cart again. Empty/repeated checkout has a useful fallback.

**What was actually tested?** 40 Node tests, 116 recorded browser assertions, both widths and keyboard; public deployment remains blocked until login. Show docs/VERIFICATION.md.

**What are the tradeoffs?** Dense comparison cards take space, visit-only filter state is not shareable, and fixed fees give no promotional incentive. Those choices keep the assessed task understandable.

## Three practice edits

1. **Delivery fee:** src/utils/rules.js → DELIVERY_FEE. Change 200 to 250, update visible disclosure strings in Header/ProductDetails/OrderSummary/Home and docs, update total assertions, run npm test/build. The subtotal minimum must stay 1,200. Explain why fee does not count toward it.
2. **Stock:** src/data/products.js → strawberry-bento stock 4. Change to 3 and reload a saved quantity 4. Explain the conflict and correct it explicitly; update stock fixture expectations only if the test depends on catalog data.
3. **Search field:** src/pages/Shop.jsx → matches filter. Add servings to searchable text, search “6 squares”, and confirm category/recipe/sort still combine. Explain why the query is trimmed/lowercased.

Check every changed condition and its boundary, commit the actual change, redeploy if submitted, and regenerate matching artifacts.
