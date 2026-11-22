# Viva guide

Alishba Inam · 24i-2036 · Section: B

Use the actual application and source while explaining. The goal is to understand the implementation and its tradeoffs, not memorize a script.

## Ten-minute walkthrough

| Time | Show and explain |
| --- | --- |
| 0–1 min | Peach & Parcel's 12 desserts, audience, five Islamabad sectors and simulated order goal |
| 1–2 min | Shop search/category/recipe/sort; open a detail and return without losing context |
| 2–3 min | Add two lemon loaves; show App's shared state and QuantityControl callback |
| 3–4 min | Explain stock, recipe compatibility and the separate product minimum/delivery fee |
| 4–5 min | Submit an incomplete checkout; keep a valid name while other fields show errors |
| 5–6 min | Finish with sample information; inspect the itemized receipt and refresh safely |
| 6–7 min | Restore an outdated cart and demonstrate decreased stock without silent deletion |
| 7–8 min | Trigger loading failure, Retry loading, empty catalog and no matching search |
| 8–9 min | Show keyboard focus and mobile layout; explain the three design decisions |
| 9–10 min | Run npm test and locate a small safe change in source |

The complete lecture-to-file table is in [REACT_NOTES_ALIGNMENT.md](docs/REACT_NOTES_ALIGNMENT.md).

## Ten short questions and answers

1. **What is a component?** A function that returns JSX for one part of the interface. Header in src/components/Header.jsx receives count and returns navigation.
2. **What are props and destructuring?** Props are information passed by a parent. ProductCard({ product, onAdd, selected }) reads named values directly. The child does not change product.
3. **How does a child change the cart?** It calls a callback. QuantityControl calls onChange; Cart passes the request to App.changeQuantity, where shared cart state is updated.
4. **Why use state and functional updates?** React renders again when a setter changes state. App uses setCart(previous => ...) so updates calculate from the latest provided cart.
5. **Why copy arrays and objects?** React state is treated as immutable. App maps/filters into new arrays; Checkout.updateField spreads the previous form object before changing one field.
6. **Why map, filter, find, reduce and slice?** Shop filters matching products, copies before sorting and maps them to cards. ProductDetails finds one ID. rules.getTotals reduces current cart values into totals.
7. **What is a controlled form?** The input's value comes from state, and onChange updates it. Checkout stores one values object, uses handleSubmit with preventDefault and shows field-specific errors.
8. **Why use an effect and cleanup?** App's effects synchronize the loader and storage. The catalog effect depends on request and aborts superseded work; the storage effect depends on cart.
9. **Is the loader a real API?** No. loadProducts returns a delayed Promise from local records. try/catch displays a genuine failure and requestCatalog triggers retry. No server order or personal information is submitted.
10. **How are rules, routes and persistence verified?** UI and Node import the same rule functions. React Router matches paths and product IDs. parseCart retains readable conflicts, while readReceipt restores only a nonpersonal summary. Browser checks exercise the full journey and recovery.

## Three safe practice edits

| Edit | Actual location | Expected effect and check |
| --- | --- | --- |
| Change one stock limit | src/data/products.js, strawberry-bento.stock: 4 → 3 | A saved quantity 4 becomes a visible conflict. Quantity 3 is valid; 4 blocks. Re-run tests and restore original data after practice. |
| Change one display string | src/pages/Home.jsx, “Explore the menu” | The primary link text changes, but its /shop route stays the same. Keyboard/browser tests naming that link must be updated deliberately if this is a real committed change. |
| Change a description or extend simple search | src/data/products.js description, or src/pages/Shop.jsx searchableText | A new descriptive word becomes searchable. Check search combined with category/recipe/sort. Avoid changing stable IDs or prices. |

## Boundaries to explain

Stock 4 accepts 2 and 4; rejects 5, zero, negatives and fractions. Egg-free-only accepts an egg-free product but blocks an egg-containing item by name. Subtotal 1,199 fails; 1,200 passes; fee 200 does not count toward the minimum.

Unknown saved IDs and overstock entries remain until explicit correction/removal. Customer name, phone and address are never persisted. Confirmation clearly states that nothing was submitted.

## Changes kept deliberately small

The audit simplified nested conditions, named cart/form actions, made two controlled inputs explicit and shared one line-total helper. CSS, imagery, data, routes, the asynchronous cancellation mechanism and storage safeguards were retained. See [REACT_AUDIT.md](docs/REACT_AUDIT.md) for KEEP decisions and risks.

Public deployment is now verified at https://peach-and-parcel-react.vercel.app/; section is B. Refer to actual verification results rather than claiming unperformed checks.
