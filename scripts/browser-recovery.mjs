export default async (page) => {
  page.setDefaultTimeout(5000);
  const results = [];
  const check = (name, condition) => {
    results.push({ name, status: condition ? "PASS" : "FAIL" });
    if (!condition) throw new Error(name);
  };
  async function visit(path) {
    await page.goto("http://127.0.0.1:4173" + path);
    await page.waitForTimeout(650);
  }
  async function click(name) {
    await page.getByRole("button", { name, exact: true }).click();
    await page.waitForTimeout(100);
  }
  await visit("/products/strawberry-bento");
  await page.getByLabel("Quantity", { exact: true }).fill("5");
  await click("Add to your parcel");
  check(
    "R1 stock 4 rejects quantity 5 with feedback",
    (await page.locator(".notice").innerText()).includes("Only 4 available"),
  );
  check(
    "R1 rejected add keeps count zero",
    (await page.locator(".count").innerText()) === "0",
  );
  await page.getByLabel("Quantity", { exact: true }).fill("4");
  await click("Add to your parcel");
  check(
    "R1 stock 4 accepts exact quantity 4",
    (await page.locator(".count").innerText()) === "4",
  );
  await page.getByLabel("Quantity", { exact: true }).fill("1");
  await click("Add to your parcel");
  check(
    "R1 existing cart cannot exceed stock",
    (await page.locator(".count").innerText()) === "4",
  );
  await visit("/checkout");
  await page.getByLabel("Egg-free products only", { exact: true }).check();
  await page.waitForTimeout(100);
  check(
    "R2 incompatible single product blocked",
    await page
      .getByRole("button", { name: "Confirm demo request", exact: true })
      .isDisabled(),
  );
  check(
    "R2 product-specific conflict",
    (await page.locator("main").innerText()).includes(
      "Strawberry Sunday Bento contains egg.",
    ),
  );
  await page.screenshot({
    path: "docs/screenshots/app/recipe-conflict.png",
    fullPage: true,
  });
  await page.getByLabel("Egg-free products only", { exact: true }).uncheck();
  await page.waitForTimeout(100);
  check(
    "R2 ordinary preference restores eligibility",
    await page
      .getByRole("button", { name: "Confirm demo request", exact: true })
      .isEnabled(),
  );
  await visit("/cart");
  await page.locator(".demo-checks summary").click();
  await click("Reduce demo stock");
  check(
    "R1 reduced stock retains saved quantity",
    (await page.locator(".quantity-control span").innerText()) === "4",
  );
  check(
    "R1 reduced stock blocks cart",
    await page
      .getByRole("button", { name: "Resolve your parcel to continue" })
      .isDisabled(),
  );
  await page.screenshot({
    path: "docs/screenshots/app/stock-conflict.png",
    fullPage: true,
  });
  await page.getByRole("link", { name: "The menu", exact: true }).click();
  await page.waitForTimeout(100);
  await page.getByRole("link", { name: /Your parcel/ }).click();
  await page.waitForTimeout(100);
  check(
    "R1 conflict survives route navigation",
    (await page.locator("main").innerText()).includes(
      "This dessert is unavailable",
    ),
  );
  await click("Reset demo data");
  await page
    .getByRole("link", { name: "Continue to demo checkout", exact: false })
    .waitFor();
  check(
    "reset restores stock without clearing parcel",
    (await page.locator(".quantity-control span").innerText()) === "4",
  );
  await click("Remove Strawberry Sunday Bento");
  check(
    "FR07 remove reaches useful empty state",
    (await page.locator("main").innerText()).includes("Your parcel is empty."),
  );
  await visit("/shop");
  await page.locator(".demo-checks summary").click();
  await click("Simulate loading failure");
  await page
    .getByRole("button", { name: "Retry loading", exact: true })
    .waitFor();
  check(
    "FR14 genuine loader rejection visible",
    (await page.locator("main").innerText()).includes("could not be loaded"),
  );
  await page.screenshot({
    path: "docs/screenshots/app/loading-error.png",
    fullPage: true,
  });
  await click("Retry loading");
  await page
    .getByRole("button", { name: "Add Little Lemon Loaf", exact: true })
    .waitFor();
  check(
    "FR14 retry returns twelve products",
    (await page.locator(".product-card").count()) === 12,
  );
  await page.screenshot({
    path: "docs/screenshots/app/loading-retry.png",
    fullPage: true,
  });
  await click("Simulate empty catalog");
  await page
    .getByRole("button", { name: "Restore catalog", exact: true })
    .waitFor();
  check(
    "FR15 empty dataset separate from zero matches",
    (await page.locator("main").innerText()).includes(
      "loader returned zero records",
    ),
  );
  await page.screenshot({
    path: "docs/screenshots/app/empty-catalog.png",
    fullPage: true,
  });
  await click("Restore catalog");
  await page
    .getByRole("button", { name: "Add Little Lemon Loaf", exact: true })
    .waitFor();
  check(
    "FR15 restore catalog recovers menu",
    (await page.locator(".product-card").count()) === 12,
  );
  await visit("/products/does-not-exist");
  check(
    "FR02 unknown product useful fallback",
    await page
      .getByRole("heading", { name: "Dessert not found", exact: true })
      .isVisible(),
  );
  await visit("/unknown-page");
  check(
    "FR01 unknown route useful fallback",
    await page
      .getByRole("heading", { name: "This page wandered off.", exact: true })
      .isVisible(),
  );
  await page.evaluate(() =>
    localStorage.setItem("peach-parcel-cart", "{invalid"),
  );
  await visit("/cart");
  check(
    "FR13 malformed storage recovery visible",
    (await page.locator(".notice").innerText()).includes("could not be read"),
  );
  await page.evaluate(() =>
    localStorage.setItem(
      "peach-parcel-cart",
      JSON.stringify([
        { id: "old-dessert", quantity: 2 },
        { id: "strawberry-bento", quantity: 5 },
      ]),
    ),
  );
  await visit("/cart");
  check(
    "FR13 old IDs retained and explained",
    (await page.locator("main").innerText()).includes("old-dessert"),
  );
  check(
    "FR13 restored overstock kept for correction",
    (await page.locator(".quantity-control span").innerText()) === "5",
  );
  check(
    "FR13 conflicting restored cart blocked",
    await page
      .getByRole("button", { name: "Resolve your parcel to continue" })
      .isDisabled(),
  );
  await click("Remove saved dessert");
  await click("Use an available quantity");
  check(
    "FR13 explicit correction repairs to current stock",
    (await page.locator(".quantity-control span").innerText()) === "4",
  );
  await visit("/products/red-velvet");
  check(
    "R1 zero stock add disabled",
    await page
      .getByRole("button", { name: "Sold out today", exact: true })
      .isDisabled(),
  );
  await visit("/products/lemon-loaf");
  await page.route("**/images/lemon-loaf.svg", (route) =>
    route.fulfill({
      status: 200,
      contentType: "image/svg+xml",
      body: "invalid image data",
    }),
  );
  await page.reload();
  await page.waitForTimeout(700);
  check(
    "missing image uses local fallback",
    (await page.locator(".detail-image img").getAttribute("src")) ===
      "/images/fallback.svg",
  );
  await page.screenshot({
    path: "docs/screenshots/app/image-fallback.png",
    fullPage: true,
  });
  await page.unroute("**/images/lemon-loaf.svg");
  await page.evaluate(() => sessionStorage.removeItem("peach-parcel-receipt"));
  await visit("/confirmation");
  check(
    "FR16 direct no-receipt route is useful",
    await page
      .getByRole("heading", { name: "No demo receipt yet", exact: true })
      .isVisible(),
  );
  return results;
};
