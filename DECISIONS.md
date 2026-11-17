# Frontend decisions

The original observations and dated captures are preserved in [docs/INVESTIGATION.md](docs/INVESTIGATION.md). They describe the reference UI inspected on 17 November 2026, not a newly asserted current defect.

## 1. Put comparison facts beside the price

**Problem:** The captured Cakewalk store cards show images, names and prices without consistent serving sizes, recipe egg status or stock.

**Decision:** Every product card displays servings, recipe status, numerical availability and price, with explicit sold-out text. Mobile uses one readable column.

**Alternative:** Keep cards minimal and show comparison facts only on details.

**Reason:** Customers can compare portions and recipe suitability before making a selection. This is the information-hierarchy decision.

**Tradeoff:** Each card uses more vertical space.

**Code location:** src/components/ProductCard.jsx; src/pages/Shop.jsx; src/styles.css.

**Evidence screenshot + reproduction steps:** [Reference](docs/screenshots/reference/01-comparison-desktop.png) → [app](docs/screenshots/app/desktop-shop.png). Open /shop; compare bento and cupcakes, then find sold-out red velvet. All 12 cards expose the same comparison fields.

## 2. Provide immediate search and retain browsing context

**Problem:** Cakewalk's inspected store/menu has sorting and four numbered pages without a visible direct product-search field.

**Decision:** Combine controlled text search, category/recipe filters and price sorting. Keep filters in App while navigating between results and details.

**Alternative:** Require manual category/page scanning or reset discovery controls each time the customer returns.

**Reason:** Customers searching for a flavour can narrow options quickly and compare details without repeating work. This is the interaction/state decision.

**Tradeoff:** Filters persist for the visit, not in a shareable URL or after a full reload.

**Code location:** src/pages/Shop.jsx, updateFilter and matches/visible; src/App.jsx, filters state; src/pages/ProductDetails.jsx, Back to results link.

**Evidence screenshot + reproduction steps:** [Reference](docs/screenshots/reference/02-no-search-mobile.png) → [mobile app](docs/screenshots/app/mobile-shop.png) / [empty results](docs/screenshots/app/empty-results.png). Search CHOCOLATE, select Cookies & bars, then egg-free: counts go 2 → 1 → 0. Reset, sort high, open details and use Back/Forward; context stays selected.

## 3. Use one explicit delivery calculation

**Problem:** The captured free-shipping banner implies a PKR 3,000 threshold, while the footer states nationwide free delivery over PKR 2,500 and a separate local fee. The selected product says local delivery; the banner does not qualify its promise.

**Decision:** Disclose one fixed PKR 200 fee and a separate PKR 1,200 product minimum before checkout. Shared pure functions calculate and validate totals.

**Alternative:** Use area-specific free-delivery tiers with qualified progress offers.

**Reason:** Customers can reconcile eligibility, shortfall and totals across cart, checkout and receipt.

**Tradeoff:** There is no promotional free-delivery incentive.

**Code location:** src/utils/rules.js, checkMinimum/getLineTotal/getTotals; src/components/OrderSummary.jsx; src/pages/Checkout.jsx, handleSubmit; src/App.jsx, completeOrder.

**Evidence screenshot + reproduction steps:** [Reference](docs/screenshots/reference/03-shipping-threshold-conflict.png) → [cart](docs/screenshots/app/cart.png) / [checkout](docs/screenshots/app/checkout.png). One loaf shows a PKR 600 shortfall and blocks checkout. Two loaves give 1,200 + 200 = 1,400 through confirmation. Reference-site final checkout charges were not tested; the original finding concerns communication, not overcharging.
