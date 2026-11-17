export default async (page) => {
  page.setDefaultTimeout(5000);
  const results = [];
  function check(name, condition) {
    results.push({ name, status: condition ? "PASS" : "FAIL" });
    if (!condition) throw new Error(name);
  }
  await page.goto("http://127.0.0.1:4173/shop");
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.reload();
  await page
    .getByRole("button", { name: "Add Little Lemon Loaf", exact: true })
    .waitFor();
  check(
    "FR03 twelve products rendered",
    (await page.locator(".product-card").count()) === 12,
  );
  check(
    "FR18 comparison data visible on cards",
    await page
      .locator(".product-card")
      .first()
      .innerText()
      .then(
        (t) =>
          t.includes("4 available") &&
          t.includes("2–3 people") &&
          t.includes("Contains egg"),
      ),
  );
  await page.getByRole("searchbox").fill("CHOCOLATE");
  await page.waitForTimeout(100);
  check(
    "FR04 case-insensitive title and description search",
    (await page.locator(".product-card").count()) === 2,
  );
  await page
    .getByLabel("Category", { exact: true })
    .selectOption("Cookies & bars");
  await page.waitForTimeout(100);
  check(
    "FR05 combined search and category",
    (await page.locator(".product-card").count()) === 1,
  );
  await page.getByLabel("Egg-free recipes", { exact: true }).check();
  await page.waitForTimeout(100);
  check(
    "FR15 zero matches distinct",
    await page
      .getByRole("heading", { name: "No desserts match your search" })
      .isVisible(),
  );
  await page.screenshot({
    path: "docs/screenshots/app/empty-results.png",
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Reset filters", exact: true })
    .first()
    .click();
  await page.waitForTimeout(100);
  await page.getByLabel("Sort by", { exact: true }).selectOption("low");
  await page.waitForTimeout(100);
  check(
    "FR05 ascending sort",
    (await page.locator(".product-card").first().innerText()).includes(
      "Little Lemon Loaf",
    ),
  );
  await page.getByLabel("Sort by", { exact: true }).selectOption("high");
  await page.waitForTimeout(100);
  check(
    "FR05 descending sort",
    (await page.locator(".product-card").first().innerText()).includes(
      "Rose & Pistachio",
    ),
  );
  await page
    .getByRole("link", { name: "View Rose & Pistachio Cake", exact: true })
    .click();
  await page.waitForTimeout(100);
  check(
    "FR02 parameterized details",
    page.url().endsWith("/products/rose-pistachio"),
  );
  check(
    "FR06 details terms and facts",
    (await page.locator(".detail-copy").innerText()).includes("6–8 people"),
  );
  await page.screenshot({
    path: "docs/screenshots/app/detail.png",
    fullPage: true,
  });
  await page.goBack();
  await page.waitForTimeout(100);
  check(
    "FR01 Back retains sort",
    (await page.getByLabel("Sort by", { exact: true }).inputValue()) === "high",
  );
  await page.goForward();
  await page.waitForTimeout(100);
  check(
    "FR01 Forward restores details route",
    page.url().includes("rose-pistachio"),
  );
  await page.getByRole("link", { name: "Back to your results" }).click();
  await page.waitForTimeout(100);
  check(
    "FR08 filter state kept via results link",
    (await page.getByLabel("Sort by", { exact: true }).inputValue()) === "high",
  );
  await page
    .getByRole("button", { name: "Reset filters", exact: true })
    .first()
    .click();
  await page.waitForTimeout(100);
  await page
    .getByRole("button", { name: "Add Little Lemon Loaf", exact: true })
    .click();
  await page.waitForTimeout(100);
  await page.getByRole("link", { name: /Your parcel/ }).click();
  await page.waitForTimeout(100);
  check(
    "FR11 minimum needed shown",
    (await page.locator("main").innerText()).includes("Add PKR 600 more"),
  );
  check(
    "R3 under minimum blocked",
    await page
      .getByRole("button", { name: "Resolve your parcel to continue" })
      .isDisabled(),
  );
  await page
    .getByRole("button", { name: "Increase Little Lemon Loaf", exact: true })
    .click();
  await page.waitForTimeout(100);
  check(
    "FR07 increase + FR11 exact minimum total",
    (await page.locator(".grand-total").innerText()).includes("1,400"),
  );
  await page
    .getByRole("button", { name: "Decrease Little Lemon Loaf", exact: true })
    .click();
  await page.waitForTimeout(100);
  check(
    "FR07 decrease changes live summary",
    (await page.locator(".grand-total").innerText()).includes("800"),
  );
  await page
    .getByRole("button", { name: "Increase Little Lemon Loaf", exact: true })
    .click();
  await page.waitForTimeout(100);
  await page.reload();
  await page
    .getByRole("link", { name: "Continue to checkout", exact: false })
    .waitFor();
  check(
    "FR13 reload restores IDs and quantities",
    (await page.locator(".quantity-control span").innerText()) === "2",
  );
  await page.screenshot({
    path: "docs/screenshots/app/cart.png",
    fullPage: true,
  });
  await page
    .getByRole("link", { name: "Continue to checkout", exact: false })
    .click();
  await page.waitForTimeout(100);
  await page.locator("#name").fill("Sample Recipient");
  await page.waitForTimeout(100);
  await page
    .getByRole("button", { name: "Confirm request", exact: true })
    .click();
  await page.waitForTimeout(100);
  check(
    "FR10 three inline validation errors",
    (await page.locator('[aria-invalid="true"]').count()) === 3,
  );
  check(
    "FR10 valid name preserved",
    (await page.locator("#name").inputValue()) === "Sample Recipient",
  );
  await page.screenshot({
    path: "docs/screenshots/app/checkout-validation.png",
    fullPage: true,
  });
  await page.locator("#phone").fill("03001234567");
  await page.waitForTimeout(100);
  await page.locator("#address").fill("Sample house 10, pretend street 2");
  await page.waitForTimeout(100);
  await page.locator("#sector").selectOption("F-6");
  await page.waitForTimeout(100);
  await page.getByLabel("Egg-free products only", { exact: true }).check();
  await page.waitForTimeout(100);
  check(
    "R2 compatible single product accepted",
    await page
      .getByRole("button", { name: "Confirm request", exact: true })
      .isEnabled(),
  );
  await page.screenshot({
    path: "docs/screenshots/app/checkout.png",
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Confirm request", exact: true })
    .click();
  await page.waitForTimeout(100);
  await page
    .getByRole("heading", { name: "A little joy, all wrapped up." })
    .waitFor();
  check(
    "FR16 explicit simulated confirmation",
    (await page.locator("main").innerText()).includes(
      "Simulated order — nothing was submitted.",
    ),
  );
  check(
    "FR16 cart cleared after completion",
    (await page.locator(".count").innerText()) === "0",
  );
  const storage = await page.evaluate(() => ({
    local: localStorage.getItem("peach-parcel-cart"),
    receipt: sessionStorage.getItem("peach-parcel-receipt"),
  }));
  check(
    "privacy only nonpersonal receipt stored",
    storage.local === "[]" &&
      !storage.receipt.includes("Sample Recipient") &&
      !storage.receipt.includes("03001234567") &&
      !storage.receipt.includes("pretend"),
  );
  await page.screenshot({
    path: "docs/screenshots/app/confirmation.png",
    fullPage: true,
  });
  await page.reload();
  await page
    .getByText("Simulated order — nothing was submitted.", { exact: true })
    .waitFor();
  check(
    "FR16 confirmation refresh restores receipt",
    (await page.locator(".receipt").innerText()).includes("Little Lemon Loaf"),
  );
  await page.goto("http://127.0.0.1:4173/checkout");
  await page
    .getByRole("heading", { name: "Your parcel is empty", exact: true })
    .waitFor();
  check("FR12 repeated checkout cannot reuse cleared cart", true);
  return results;
};
