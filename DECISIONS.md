# Frontend decisions

## 1. Put comparison facts beside every price

**Problem:** Cakewalk's captured store cards omit consistent serving, recipe and stock facts (investigation 1).  
**Decision:** Put serving size, explicit egg recipe status, numerical stock and price on every card; distinguish sold out in text.  
**Alternative:** Keep cards minimal and show these facts only on details.  
**Reason:** Small-celebration customers can compare portions and recipe suitability without repeatedly opening pages. This is the information-hierarchy decision.  
**Tradeoff:** More text per card; mobile uses one column for readable comparisons.  
**Code location:** src/components/ProductCard.jsx; src/pages/Shop.jsx; src/styles.css.  
**Evidence screenshot + reproduction steps:** [Reference](docs/screenshots/reference/01-comparison-desktop.png) / [improvement](docs/screenshots/app/desktop-shop.png). Open /shop, compare a bento and cupcakes, then find the sold-out red velvet. All expose price, servings, recipe and stock.

## 2. Make discovery immediate and keep its context

**Problem:** Cakewalk's inspected store/menu exposes sorting and pagination without a direct product-search field (investigation 2).  
**Decision:** Controlled live text search combines with category, egg-free and price sorting; lift filter state into App so detail navigation retains context.  
**Alternative:** Paginate by category and require manual scanning, or reset the query on every return.  
**Reason:** A known-flavour search is a common customer task; retaining search state makes comparison practical. This is the interaction/state decision.  
**Tradeoff:** Filter state lasts for the visit rather than a shareable URL/full reload; more controls occupy space above the menu.  
**Code location:** src/pages/Shop.jsx (filter/sort/reset); src/App.jsx (filters state); src/pages/ProductDetails.jsx (Back to results).  
**Evidence screenshot + reproduction steps:** [Reference](docs/screenshots/reference/02-no-search-mobile.png) / [mobile improvement](docs/screenshots/app/mobile-shop.png) / [zero matches](docs/screenshots/app/empty-results.png). Search CHOCOLATE, select Cookies & bars, enable egg-free, then Reset filters. Sort high to low, open a detail, Back/Forward and return; sort stays selected.

## 3. Use one explicit delivery calculation

**Problem:** Cakewalk's captured unqualified free-shipping progress implies PKR 3,000 while the footer states nationwide free delivery over PKR 2,500 plus a separate local fee; the selected product says local delivery (investigation 3).  
**Decision:** Disclose PKR 200 fixed delivery and PKR 1,200 product minimum from the header/details onward, with one rule/totals module used by cart and checkout.  
**Alternative:** Use free-delivery tiers/progress offers with area-specific qualification.  
**Reason:** A small, five-sector simulated studio benefits from a predictable review total and clear eligibility.  
**Tradeoff:** The fixed fee offers no promotional free-delivery incentive.  
**Code location:** src/utils/rules.js (checkMinimum/getTotals); src/components/OrderSummary.jsx; src/components/Header.jsx; src/pages/Checkout.jsx.  
**Evidence screenshot + reproduction steps:** [Reference](docs/screenshots/reference/03-shipping-threshold-conflict.png) / [cart](docs/screenshots/app/cart.png) / [checkout](docs/screenshots/app/checkout.png). Add one PKR 600 loaf: shortfall 600, checkout blocked. Increase to two: subtotal 1,200, delivery 200, total 1,400. Continue to checkout and confirm; the calculation stays the same.
