# CODEX MASTER PROMPT — CS4032 Assignment 02 (Fall 2026)

You are my coding assistant working inside a real local Git repository. Implement my entire FAST-NUCES Islamabad CS4032 Web Programming Assignment 02: **Business Website Development Using React**. The assignment is individual and assessed out of 100, including a 10-minute viva. If the original PDF `Web Programming_A#02.pdf` is present in the working directory, read all 9 pages carefully before writing code. The requirements below are a self-contained checklist even if that PDF is not accessible. Follow any additional or more exact instruction in the original PDF.

## Working principles

1. Build the simplest complete, correct solution that I can understand and explain line by line during a viva. Use plain **React, Vite, JavaScript, react-router-dom, semantic HTML, custom CSS, and Node's built-in test runner**. Do not use TypeScript, Redux, Zustand, Next.js, backend services, databases, Firebase, Tailwind, Bootstrap, Material UI, shadcn, complete UI kits, templates, complex custom hooks, or unnecessary dependencies. An icon library is allowed but optional.
2. Prefer understandable function components, `useState`, `useEffect`, props, callback props, basic array methods, object spread, `localStorage`, regular functions, and small modules. Lift shared cart/product state to `App.jsx`; avoid an elaborate architecture. Every required React/JavaScript concept must be used meaningfully, not just mentioned in documentation.
3. Use readable, ordinary developer naming and formatting. Comments should be brief and present only where something is not obvious. Avoid robotic copy, repetitive comments, huge files, ornamental animations, generic AI landing-page patterns, unnecessary abstractions, and decorative features unrelated to marking criteria. Do not misrepresent authorship, evidence, actual tests, or Git history.
4. Do the work in real incremental stages. After each coherent stage run relevant checks and make a **real Git commit** that reflects implemented work. Do not fabricate, backdate, split a completed project into fake history, or create empty history. If Git authentication or a remote is unavailable, leave commits local and explain the exact step I must do.
5. Prioritize the actual deliverables and viva. Finish implementation, verify each requirement, capture genuine evidence, write documentation and the PDF report, then do a final comprehensive testing and repair pass. Do not stop at scaffold or partial pages. Do not claim anything is tested if it was not executed.
6. If genuinely blocked by external site access, account authentication, screenshots, or deployment permissions, continue all feasible local work, keep explicit placeholders/TODOs for those exact items, and report precisely what human action remains. Do not invent URLs, screenshots, observed problems, student details, or deployment status.

## Project specification — do not change the concept unless a genuine blocking problem appears

- **Project/brand**: Peach & Parcel — a fictional boutique dessert studio.
- **Domain**: bakery/dessert retail.
- **Operating area**: selected Islamabad sectors, Pakistan (list five plausible sectors consistently in the website, rules, and report; this is simulated service coverage, not a claim about a real company).
- **Audience**: students, young professionals, and people buying desserts for small celebrations.
- **Main customer task**: discover products, compare details, choose quantities, enter a fictional delivery request, check totals, and receive simulated confirmation.
- **Business goal**: complete an accurate simulated dessert-order request.
- **Catalog**: 12 genuinely distinct original products, e.g. strawberry bento cake, vanilla cloud cupcakes, chocolate brownie box, rose pistachio cake, lemon mini loaf, caramel cookie box, red velvet bento, chocolate ganache cake, birthday cupcake box, tiramisu dessert cups, blueberry cheesecake cups, and cinnamon blondie box. Use locally stored data with stable IDs and realistic PKR prices and quantities. Give each product concise specific descriptions, category, price, stock, serving size, suitability (`eggFree` boolean), and meaningful image/placeholder information. Vary fields so searching, filtering, stock, and dietary checks are demonstrable. The names, text, branding, and implementation must be original, not copied from the reference websites.
- **Appearance**: premium but warm, friendly and slightly feminine: soft cream background, restrained peach/blush accents, rich plum/brown text, thoughtful editorial typography, good whitespace, small elegant details, and high-quality dessert imagery with verified usage rights. Avoid huge gradients, excessive shadow cards, generic hero slogans, floating decorative blobs, glassmorphism, and identical sections. Create a realistic mini brand with clear calls to action. Mobile experience is essential.
- **No real commerce**: no payments, API/server, authentication, personal-data submission, or real orders. Mark all checkouts/confirmation as **demo/simulated**. Show “Use sample information only”; do not persist customer name, phone, or address in browser storage. If product photos are from third parties, verify permissions and document source/license; download allowed assets locally. If permissions/access cannot be verified, use original locally authored illustrations or visually clean placeholder blocks and disclose limitations; never hotlink random protected media.

## Mandatory three operating rules (separate pure functions in `src/utils/rules.js`)

**R1 Availability (stock)**: Quantity must be a positive integer, no more than the product's current available stock. A product with 0 stock cannot be added. Adding/increasing past stock is blocked with explicit feedback. For an item with stock 4, quantity 2 is valid, 4 is valid, 5 is invalid. If an item already in the cart becomes unavailable or stock decreases below the selected quantity, show a conflict on cart/checkout; block confirmation and allow correction/removal. Do not silently delete saved cart items.

**R2 Eligibility/compatibility (egg-free requirement)**: Every product is visibly labeled whether it is an egg-free recipe. The checkout includes a controlled `Egg-free products only` preference. If it is checked, any selected item that is not marked egg-free must show a product-specific conflict and prevent order completion until the customer removes/replaces it or changes preference. Explain this is a simulated recipe label and **not an allergy or cross-contamination guarantee**. The ordinary preference imposes no restriction. Support the boundary with one compatible item and with one incompatible item.

**R3 Pricing/fulfilment (minimum delivery order)**: Delivery requires a product subtotal of **PKR 1,200 or more**. A fixed **PKR 200 delivery fee** must be disclosed before checkout and included clearly in the calculated total; shipping does not count toward the minimum. Subtotal PKR 1,199 must fail; exactly PKR 1,200 must pass. Cart should show how much more is needed and disable/prevent invalid completion with helpful feedback. The area must be one of the explicitly listed delivery sectors, validated in the form. Keep calculations simple and consistent.

For each rule, document its exact condition, place where shown, valid and invalid behavior, and a boundary example in `README.md` and the report. Implement pure functions returning useful checkable results such as `{ valid, message }`; React must call those same exported functions. Use a separate helper for totals if helpful; do not duplicate prices and conditions across components.

## Investigation: three real reference-site problems — genuine evidence required

Investigate one or several existing bakery/ecommerce websites **in the same domain**. Possible starting links, subject to checking they are actually reachable: `https://www.bake1.pk/store`, `https://www.bake1.pk/store/c/cakes?sub=cakes-cakes`, `https://www.cakewalk.pk/en`, and `https://lubnabakery.com/`. Use the browser to inspect the actual current UI at desktop and mobile and perform real customer tasks. Do not assume any listed site has a problem, and do not confuse your personal visual preference with a task-impacting defect.

Find **three demonstrably different observed problems** relevant to discovery/comparison, state/navigation, pricing visibility, forms, availability, empty results, or mobile usability. Candidate *hypotheses* to check (not facts): (A) crucial comparison/availability/suitability information is missing until details; (B) navigation/filter changes lose selections or context; (C) form error messages are vague or erase valid input; OR an actual alternative such as fees appearing late. If you cannot reproduce a hypothesis, do not use it: find a real distinct observed issue instead.

For EACH genuine problem save a **real** reference-site screenshot in `docs/screenshots/reference/`, record exact URL, date inspected, viewport, numbered reproduction steps, the user's task, exactly what was visible/observed, why the task was difficult, and a plausible business consequence labeled as inference rather than a made-up statistic. If site interactions are not accessible, explicitly ask for the necessary real screenshots and leave those specific report fields incomplete. Never fabricate evidence or imply that a web text excerpt proves a visual issue.

For each problem implement a directly testable improvement in our website. Create `DECISIONS.md` with exactly three numbered entries, and for each: **Problem, Decision, Alternative, Reason, Tradeoff, Code location, Evidence screenshot + reproduction steps**. Ensure one concerns state/interaction and one concerns information hierarchy/mobile layout. A sensible implementation direction, if the reference research supports it: show stock, egg-free tag, serving size, and price on product cards; preserve cart across search/navigation/reload; provide inline form errors without wiping valid input. Use actual observed reference problems, not made-up ones.

## Required functional behavior — verify every ID individually

- **FR01**: At least three useful routes via `react-router-dom`; navigation, Links, Back and Forward work.
- **FR02**: Parameterized `/products/:id` with helpful unknown-ID handling.
- **FR03**: At least 10 relevant local JavaScript/JSON products with unique stable IDs.
- **FR04**: Case-insensitive search across relevant title/description/category fields, updating results.
- **FR05**: At least one meaningful filter (category or egg-free) and a sort control (price ascending/descending; optional default); search, filter, and sort must combine correctly.
- **FR06**: Real details page with category, image, description, price, servings, stock, egg-free status, terms and quantity.
- **FR07**: Add, remove, increase and decrease cart quantities, with stock checks and clear feedback.
- **FR08**: A single consistent cart state across header, shop, details, cart and checkout.
- **FR09**: At least three controlled editable fields in the main checkout journey: sample recipient name, sample Pakistani phone, fictional delivery instructions/address, sector select; plus egg-free preference. Include labels and examples; no backend submission/storage of personal values.
- **FR10**: At least three meaningful inline validation rules: e.g. name 2+ characters, mobile format `03` plus 9 digits, meaningful address/instructions 10+ characters, supported sector selection. Show field-specific messages; preserve other valid inputs after invalid submit; validate on submit and/or blur without making interaction annoying.
- **FR11**: Cart item count, line totals, subtotal, delivery fee, total and amount needed for minimum, all calculated from live state.
- **FR12**: Enforce all three business rules in add/update/checkout/submit as appropriate; no bypass through direct navigation.
- **FR13**: Save the cart (IDs + quantities only) in localStorage and restore safely. Handle empty/malformed JSON, old IDs, unavailable stock, and quantity conflicts. Show corrections rather than crashing. Avoid storing any customer information.
- **FR14**: Load product data through an asynchronous mock loader using `Promise` and `async/await` or `.then`, with loading, failure and working retry. Include an actual reproducible demo failure mode. Implement cleanup for effects that need it and avoid React warnings/races.
- **FR15**: Distinguish `0 records returned by the mock loader` from `records exist but query/filter has no matches`; show distinct messages and useful next action such as Reset filters or Retry/Restore catalog.
- **FR16**: Completing valid mock checkout leads to clear confirmation page with itemized receipt/reference number and explicit 'Demo order — nothing was submitted'. Safely allow confirmation-route refresh by persisting **nonpersonal order-summary data only** in sessionStorage, or show a useful no-confirmation state if accessed without an order. Clear the cart only after valid completion.
- **FR17**: Full journey works at 390px and 1280px; good keyboard access, accessible focus and no page-wide overflow.
- **FR18**: All three REAL investigated problems are demonstrably solved by working features.
- **FR19**: Public deployment works on direct nested URLs and refresh; assets load and its source corresponds to submitted Git commit.

## Mandatory React/JavaScript concepts — show them in real code

Meaningful small function components, imports/exports, JSX expressions, semantic elements, props, callback props, event handlers and `preventDefault`, `useState`, functional state updates, immutable object and array updates, `map` with stable keys, conditional rendering, lifted shared state, derived totals, `useEffect` with correct dependency list/cleanup, `filter`/`sort`/`find`/`reduce`, spread/destructuring, asynchronous Promise with failure handling, localStorage read/write, route parameters and navigation. Make a small concept map in README linking each concept to specific source files and functions. Do not introduce complexity merely to demonstrate a term.

## Preferred lightweight structure

```text
src/
  components/Header.jsx, ProductCard.jsx, QuantityControl.jsx, OrderSummary.jsx
  data/products.js
  pages/Home.jsx, Shop.jsx, ProductDetails.jsx, Cart.jsx, Checkout.jsx, Confirmation.jsx, NotFound.jsx
  utils/loadProducts.js, rules.js
  App.jsx, main.jsx, styles.css
public/images/ (locally stored permitted images and a fallback)
tests/rules.test.js
scripts/ (only if genuinely helpful)
docs/screenshots/reference/
docs/screenshots/app/
docs/VERIFICATION.md
docs/REPORT.md (or a printable HTML source)
README.md
DECISIONS.md
VIVA_GUIDE.md
vercel.json
package.json
package-lock.json
```

Adjust only when necessary. Keep files concise; do not force an artificial line count. Pass state/actions as props through `App.jsx` instead of complicated state managers. Simple controlled form state can live in Checkout. Keep search/filter state when returning from details (lift it to App, use basic URL search params if genuinely simpler, or show a clear Back to results flow). Use local data; no real API or backend.

## Design/accessibility contract

Hand-author CSS with sensible variables for colors/spacing. Build a coordinated navbar, product grid, detail layout, cart summary, form and confirmation. Design for clear reading, not just decoration. Use appropriate responsive breakpoints, avoid tiny mobile controls, make click/tap targets practical, label input elements, visually show focus, expose errors via text (and `aria-describedby` / `aria-live` when appropriate), use buttons for actions and links for routes, set alt text on meaningful photos, headings in order, visibly distinguish unavailable, selected, error and successful states. Navigation must work with keyboard. Add a mobile menu only if truly needed; simpler wrap or compact navigation is better. Ensure the primary action is obvious on each page. Test 390px and 1280px in current Chrome/Edge.

## Demo/edge-case controls

Add a small clearly labeled, unobtrusive `Demo checks` disclosure (e.g. native `<details>` near footer or shop) so a marker can reproduce:
- simulated product loading failure with a real error and a Retry that successfully loads products;
- simulated empty catalog distinct from no matching results;
- a specific product's stock reduced to 0 or below a previously saved quantity so an existing cart becomes invalid; and
- reset to ordinary demo data.

This must not pollute the main shopping UI or undermine normal functionality. Document exactly how to reproduce each case and how to recover. Also test missing product image fallback, long product names, invalid IDs, 0 stock, old saved IDs, corrupt localStorage, empty cart, invalid form, repeated checkout, browser Back/Forward and refreshing nested URLs. A recovered cart should not silently lose items.

## Automated test and serious quality assurance

Use **Node's built-in test runner**, not Jest/Vitest, for the required rule test. Put `checkStock` (or equivalent) in `src/utils/rules.js`, import that exact function in the React UI and `tests/rules.test.js`, and use `node:test` + `node:assert/strict`. Include at least quantity 2 with stock 4 (valid), quantity 4 with stock 4 (valid boundary), quantity 5 with stock 4 (invalid); also test 0, negative and noninteger quantities. Add small tests for minimum order and compatibility if it remains easy. Provide `npm test` mapped to `node --test` and actually run it. Run `npm install`, `npm test`, `npm run build` and `npm run lint` if configured.

Perform and document manual browser testing of *every* FR01–FR19, rule boundaries, all three investigated improvements, 390px + 1280px layouts, keyboard Tab/Enter/Space navigation, direct URLs, refresh, localStorage restore, loading failure and retry, empty dataset, 0 matches, invalid details URL, malformed storage, invalid forms retaining values, changing stock after a saved selection, and confirmation behavior. Prefer real automated browser actions/screenshots with Playwright if available, but do not add Playwright as a required application dependency solely for this. Inspect console warnings and errors, accessibility/focus, broken assets, and overflow; fix defects. Re-run tests/build after each fix. Report precise passed, failed, blocked and not-executed cases with actual evidence, never simply claim 'all passed' without running them.

## GitHub work and commit milestones

**Do not build everything before committing.** Work from the initialized real repository. Create genuine commits after real, working stages, roughly:
1. `chore: set up React app and dessert catalog`
2. `feat: add product browsing, search and details routes`
3. `feat: add cart, checkout and business rules`
4. `style: finish responsive layout and frontend improvements`
5. `test: handle edge cases and document verification`
6. `docs: add report evidence and deployment setup` (if relevant)

Each commit must reflect the actual stage at the moment it is made; messages and number can change based on real progress. Push to GitHub if access is configured, else give exact push instructions. Exclude `node_modules`, `dist`, `.env`, credentials, and irrelevant screenshots or artifacts; include complete source, data, owned/licensed assets, tests, package/lockfiles, README, DECISIONS and evidence. Record `git rev-parse HEAD` after final commit. Never fake history.

## README, decisions, screenshots, report and ZIP

Write a concise human-readable `README.md` with project and student detail placeholders; short business description; exact `npm install`, `npm run dev`, `npm run build`, `npm test`, `npm run preview`; actual GitHub/deployment links or clearly marked blanks until known; route and feature list; three rules; how to reproduce loader failure, empty catalog and changed stock; demo-only limits; concept-to-file map; and notes for running locally.

Write exactly three concrete `DECISIONS.md` entries with the fields specified in the investigation section. Link to real screenshots and actual code paths. Write `docs/VERIFICATION.md` with concise checklists, test commands and real outcomes, including actions/expected/observed results for all three frontend improvements and edge cases.

Capture current, real application screenshots in `docs/screenshots/app/`: desktop shop, detail, cart, checkout validation, rule conflict, confirmation, mobile shop, loading error/retry, empty results, and before/after examples for the improvements as relevant. Use short annotations in the report to explain hierarchy, mobile behavior and important states. Screenshots must depict actual implemented features, not mockups.

Produce a concise polished **PDF report** in the exact required sequence. **Avoid a self-referential Git hash**: keep the editable report template inside the repository with a `[FINAL_COMMIT_HASH]` placeholder, commit all code/docs/screenshots, then obtain the true final hash after the last commit; generate the final PDF as a submission artifact **outside the tracked repository** with that exact hash, and do not commit that completed PDF afterward. For a real deployment URL, deploy first, update the tracked README with its real URL, make the final commit and let production redeploy, then verify final hash and generate the PDF. No further commits after capturing the final hash unless you redo final verification and report generation.

Report sections:
1. Student/project details: `[STUDENT NAME]`, `[ROLL NUMBER]`, `[SECTION]`, Peach & Parcel, real repository URL, real deployment URL and final commit hash.
2. Business profile: products, audience, area, main task and goal.
3. Three operating rules with condition, user-facing communication, valid/invalid behavior, boundary.
4. Reference-site investigation: URLs, genuine screenshots, user tasks, actual observations, inferred business effects, planned solutions.
5. Three frontend decisions copied accurately from DECISIONS.md, including alternatives, tradeoffs and code locations.
6. Implemented app: actual screenshots of meaningful steps with short annotations.
7. Verification: recovery checklist, actual/expected/observed for improvements, Node test results.
8. Limitations: true incomplete behavior and the simulated nature of checkout.

Use tables and short practical text, not essays. Save both the PDF if the available environment can generate/inspect it and an editable source (`docs/REPORT.md` or `docs/REPORT.html`). If PDF generation or genuine reference screenshots cannot be done here, do not forge them; create the complete editable source with clearly identified evidence placeholders and concise instructions for me to finish those missing parts. Do not add fictional student information or claim live URLs exist before deployment.

Prepare a source ZIP whose name follows `RollNo_Name_Section_A#02.zip` (example `24I1234_AliAhmad_B_A#02.zip`), excluding `.git`, `node_modules`, build output and secrets. If student details are unknown, don't invent them; provide the exact final ZIP command and a placeholder-safe staged ZIP only if appropriate. Ensure repo, ZIP, PDF report and deployed app all match the same final commit. Store the report separately for Classroom submission even if it is also included in the repo.

Write `VIVA_GUIDE.md` with a natural-language 10-minute walk-through and focused explanations for: component/props/callbacks, state/lifting state, functional updates, immutable arrays/objects, effects, async loader and retry, persistence, validation, routes, derived totals, three rules/boundaries, recovering unavailable saved items, test file and why it tests the actual rule, design tradeoffs, and how to make a small constant/function change. Include likely questions and concise beginner-friendly answers, plus three small practice edits with exact file locations.

## Deployment

Include a correct `vercel.json` for this **Vite client-side React SPA** so refreshing `/products/:id`, `/cart`, and `/checkout` resolves to `index.html` and React Router handles the route:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Use sensible Vercel settings: root directory `/`, framework Vite, install `npm install` (or platform default), build `npm run build`, output `dist`. If GitHub/Vercel are connected, deploy and verify public URL, assets, main workflow, nested-route direct access/refresh, and deployed commit. If account permission is missing, explain **precisely** what I must click and then how to validate, without inventing a URL or claiming a deployment succeeded.

## Work sequence and final output

A. Read PDF (if available), inspect existing repo, create a requirement-to-file/test matrix, choose real reference sites and inspect them before making unverified claims.
B. Set up Vite and products, implement navigation/browse/details, run checks, commit.
C. Implement shared cart, forms, rules, persistence, summary and confirmation, check boundaries, commit.
D. Build hand-written polished responsive CSS, keyboard accessibility, real improvements, commit.
E. Add async loader with error/retry, separate empty states, invalid cart recovery, demo controls, Node tests, thorough browser checks, and fixes; commit.
F. Capture *real* reference/app screenshots and evidence, write DECISIONS, README, verification, viva guide and editable report source. Obtain/deploy the real production URL if authorized, update README, and commit the finished source/docs.
G. Run final build/tests, inspect browser console and both widths, check Git status, push final commit, verify deployed source/URL, capture the final hash, then produce the final PDF report with that hash **outside Git** and a source ZIP from HEAD. Do not make another commit afterward. If a fix is needed, repeat final steps with the new hash.

At the end, give me:
- a brief truthful implementation summary;
- a **19-row FR01–FR19 table** with `PASS / FAIL / BLOCKED`, code location and evidence;
- the three business rules with boundary results;
- commands executed and real test results;
- screenshots/report/ZIP paths that truly exist;
- genuine commit list and final hash;
- true GitHub/deployment URLs if created, otherwise exact next steps;
- any remaining human-only tasks (student identity, inaccessible site screenshots, account logins);
- a short viva-first checklist.

**Critical**: Do not stop after writing a plan. Execute the project, test, fix and document it using the tools you actually have. Favor completeness, simplicity, honest evidence, and an explainable implementation over impressively complicated code. If a decision between a clever approach and a plain approach comes up, choose the plain approach whenever it meets the rubric.
