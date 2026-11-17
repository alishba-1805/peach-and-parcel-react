# Reference-site investigation

Inspected **17 November 2026**, using the actual browser UI. Reference site: Cakewalk, a bakery/ecommerce business in Islamabad. Findings describe the captured state only. No order was submitted and no customer information was entered. A single Coffee Cupcake was added to the reference cart to inspect the shipping-progress display.

Initial candidate https://www.bake1.pk/store returned **HTTP 404**. It is excluded from the three findings. Sorting on Cakewalk worked after asynchronous loading; an early apparent no-change state was discarded. The site has a working mobile menu; no missing-navigation claim is made.

## 1. Comparison information omitted from store cards

- URL: https://www.cakewalk.pk/en/store
- Viewport: **1280 × 900**.
- Task: compare recipes/serving quantities before choosing a celebration dessert.
- Steps: (1) Open the store. (2) Close the order-type chooser. (3) Compare the visible product cards.
- **Observed:** cards show images, product names and PKR prices; the captured store cards do not show recipe egg status, serving quantity or available stock. Some names imply quantity, but there is no consistent serving field.
- Difficulty: a customer seeking a suitable recipe cannot compare these facts directly across cards.
- **Inferred consequence:** additional detail-page visits or inquiries may delay a suitable selection. No sales effect was measured.
- Improvement: consistent serving size, recipe label and stock alongside each price.
- Evidence: [reference](screenshots/reference/01-comparison-desktop.png) → [our desktop menu](screenshots/app/desktop-shop.png).
- Verified outcome: all 12 cards expose the comparison facts; sold-out recipe visibly differs.

## 2. Store has no direct product-search interaction

- URL: https://www.cakewalk.pk/en/store
- Viewport: **390 × 844** (also inspected at desktop).
- Task: find a named/flavoured dessert such as coffee without scanning multiple pages.
- Steps: (1) Open the store at mobile width. (2) Close the chooser. (3) Inspect the store controls and navigation menu. (4) Inspect the product listing and pagination.
- **Observed:** the store exposes sorting and four numbered result pages, but no visible product-search field in the inspected listing/menu. A DOM check found zero search inputs. The screenshot shows the controls and full page, not an assertion about every page on the site.
- Difficulty: a known-item task requires manual browsing/category navigation.
- **Inferred consequence:** slower discovery may cause customers to abandon a search or choose an unrelated item.
- Improvement: immediate controlled search across title/description/category, combined with category/recipe filters and price sorting. Retain those choices while viewing details.
- Evidence: [reference mobile store](screenshots/reference/02-no-search-mobile.png) → [our mobile menu](screenshots/app/mobile-shop.png) and [zero matches with recovery](screenshots/app/empty-results.png).
- Verified outcome: CHOCOLATE gives 2 records; Cookies & bars narrows to 1; egg-free narrows to 0 with Reset filters. Back/Forward and Back to results preserve sort in this visit.

## 3. Shipping-progress promise lacks consistent qualification

- URL: https://www.cakewalk.pk/en/products/coffee-cupcake-707385
- Viewport: **390 × 844**.
- Task: understand delivery eligibility/cost after adding one PKR 350 local-delivery product.
- Steps: (1) Open the Coffee Cupcake details. (2) Close the order-type chooser if present. (3) Add quantity 1. (4) Wait for the cart banner. (5) Compare banner, local-delivery information and footer.
- **Observed:** banner says “Unlock Free Shipping” and “Only PKR 2,650 away” for a PKR 350 selection, implying PKR 3,000. Detail information says local delivery. Footer says Rs 200 flat local delivery and nationwide delivery free over Rs 2,500. The banner does not visibly qualify its promise by delivery area or explain this different threshold.
- Difficulty: customer cannot reconcile the displayed progress promise with the local fee and separately stated nationwide threshold.
- **Inferred consequence:** uncertainty about the final fee could reduce confidence or cause a later change of mind. The actual final checkout charge was not tested; this finding concerns communication, not a claim of overcharging.
- Improvement: one fixed fee and one product minimum, disclosed before checkout and calculated consistently. No free-delivery progress offer.
- Evidence: [reference banner and footer](screenshots/reference/03-shipping-threshold-conflict.png) → [our cart](screenshots/app/cart.png) and [checkout](screenshots/app/checkout.png).
- Verified outcome: two PKR 600 loaves produce subtotal 1,200 + fee 200 = total 1,400 in cart, checkout and receipt. One loaf shows the precise PKR 600 shortfall.
