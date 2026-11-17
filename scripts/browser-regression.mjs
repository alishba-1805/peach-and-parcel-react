const baseUrl = process.env.BROWSER_BASE_URL || "http://127.0.0.1:4173";

export default async function regression(page) {
  const results = [];
  function check(name, condition) {
    results.push({ name, status: condition ? "PASS" : "FAIL" });
    if (!condition) throw new Error(name);
  }
  async function visit(path) {
    await page.goto(baseUrl + path);
    await page.waitForTimeout(650);
  }
  async function click(name) {
    await page.getByRole("button", { name, exact: true }).click();
    await page.waitForTimeout(100);
  }

  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await visit("/shop");
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem("peach-parcel-cart", JSON.stringify([
        { id: "vanilla-cupcakes", quantity: 4 },
      ]));
    });
    await visit("/cart");
    await page.locator(".scenario-checks summary").click();
    await click("Reduce stock");
    check(width + " decreased nonzero stock retains quantity 4",
      await page.locator(".quantity-control span").innerText() === "4");
    check(width + " decreased stock explains current limit 2",
      (await page.locator("main").innerText()).includes("Only 2 available"));
    await page.getByRole("link", { name: "The menu", exact: true }).click();
    await page.waitForTimeout(100);
    await page.goto(baseUrl + "/checkout");
    await page.waitForTimeout(650);
    // A full reload restores ordinary scenario data; reapply the stock change.
    await page.locator(".scenario-checks summary").click();
    await click("Reduce stock");
    check(width + " direct checkout blocks a stock conflict",
      await page.getByRole("button", { name: "Confirm request", exact: true }).isDisabled());
    await page.getByRole("link", { name: "Correct your parcel", exact: false }).click();
    await page.waitForTimeout(100);
    await click("Use an available quantity");
    check(width + " explicit stock correction uses quantity 2",
      await page.locator(".quantity-control span").innerText() === "2");
    check(width + " corrected subtotal and fee total 2600",
      (await page.locator(".grand-total").innerText()).includes("2,600"));

    // A new page load ensures the footer disclosure starts closed.
    await visit("/shop");
    await page.locator(".scenario-checks summary").click();
    await click("Simulate empty catalog");
    await page.getByRole("button", { name: "Restore catalog", exact: true }).waitFor();
    check(width + " empty dataset preserves stored selection",
      await page.evaluate(() => JSON.parse(localStorage.getItem("peach-parcel-cart"))[0].quantity === 2));
    await click("Restore catalog");
    await page.getByRole("button", { name: "Add Vanilla Cloud Cupcakes", exact: true }).waitFor();
    check(width + " restoring catalog preserves selected count",
      await page.locator(".count").innerText() === "2");
    await click("Simulate loading failure");
    await page.getByRole("button", { name: "Retry loading", exact: true }).waitFor();
    check(width + " failed loader preserves stored selection",
      await page.evaluate(() => JSON.parse(localStorage.getItem("peach-parcel-cart"))[0].id === "vanilla-cupcakes"));
    await click("Retry loading");
    await page.getByRole("button", { name: "Add Vanilla Cloud Cupcakes", exact: true }).waitFor();
    check(width + " retry preserves selected count",
      await page.locator(".count").innerText() === "2");
    await page.getByRole("button", { name: "Simulate loading failure", exact: true }).click();
    await page.getByRole("button", { name: "Reset catalog", exact: true }).click();
    await page.getByRole("button", { name: "Add Vanilla Cloud Cupcakes", exact: true }).waitFor();
    check(width + " superseded failing load cannot replace reset catalog",
      await page.locator(".product-card").count() === 12);

    await visit("/products/strawberry-bento");
    for (const quantity of ["0", "-1", "1.5"]) {
      await page.getByLabel("Quantity", { exact: true }).fill(quantity);
      await click("Add to your parcel");
      check(width + " invalid detail quantity " + quantity + " keeps cart intact",
        await page.locator(".count").innerText() === "2" &&
        (await page.locator(".notice").innerText()).includes("positive whole-number"));
    }
    await page.reload();
    await page.getByRole("button", { name: "Add to your parcel", exact: true }).waitFor();
    check(width + " product nested route refresh keeps correct details",
      (await page.locator(".detail-copy h1").innerText()) === "Strawberry Sunday Bento");

    await visit("/checkout");
    check(width + " checkout controls have explicit matching labels",
      await page.locator("main input, main select, main textarea").evaluateAll(controls =>
        controls.every(control => control.id && [...document.querySelectorAll("label")]
          .some(label => label.htmlFor === control.id))));
    await page.getByRole("button", { name: "Confirm request", exact: true }).click();
    await page.waitForTimeout(100);
    check(width + " four empty form fields show associated errors",
      await page.locator('[aria-invalid="true"]').count() === 4 &&
      await page.locator('[aria-invalid="true"]').evaluateAll(controls =>
        controls.every(control => document.getElementById(control.getAttribute("aria-describedby")))));
    await page.reload();
    await page.getByRole("button", { name: "Confirm request", exact: true }).waitFor();
    check(width + " checkout nested refresh preserves cart without PII",
      await page.locator(".count").innerText() === "2" &&
      await page.locator("#name").inputValue() === "");
  }
  return results;
}
