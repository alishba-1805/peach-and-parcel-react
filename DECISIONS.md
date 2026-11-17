# Design decisions

## Show comparison facts on product cards

**Choice:** Display price, serving size, recipe status and current stock on each card.

**Reason:** Customers can compare suitable options before opening a detail page. Sold-out products remain visible with a clear status.

**Alternative:** Show only an image, name and price, with all other facts on the detail page.

**Tradeoff:** Cards contain more text. The mobile layout uses one column to keep that information readable.

**Implementation:** src/components/ProductCard.jsx, src/pages/Shop.jsx and src/styles.css.

## Keep browsing context and cart state together

**Choice:** Store the cart, catalog and browsing filters in App. Pass values and action callbacks to the relevant pages.

**Reason:** Search, categories and sorting work together, and navigating to details does not discard the current results. The header, cards, cart and checkout share one selection.

**Alternative:** Give each page independent state or introduce a separate state-management dependency.

**Tradeoff:** Shared state makes App responsible for coordinating page actions. Filter state lasts for the visit rather than becoming a shareable URL.

**Implementation:** src/App.jsx, src/pages/Shop.jsx and src/pages/ProductDetails.jsx.

## Keep delivery calculations explicit

**Choice:** Apply a fixed PKR 200 delivery fee and a separate PKR 1,200 product minimum through shared pure functions.

**Reason:** Cart, checkout and confirmation can use the same calculation. Customers see the exact shortfall before continuing.

**Alternative:** Introduce delivery tiers or promotional free-delivery thresholds.

**Tradeoff:** A fixed fee provides fewer promotional options but keeps eligibility and totals straightforward.

**Implementation:** src/utils/rules.js, src/components/OrderSummary.jsx and src/pages/Checkout.jsx.
