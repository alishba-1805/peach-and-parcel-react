export default async (page) => {
  const results = [];
  const check = (name, condition) => {
    results.push({ name, status: condition ? "PASS" : "FAIL" });
    if (!condition) throw new Error(name);
  };
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://127.0.0.1:4173/");
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();
    await page.waitForTimeout(650);
    await page.keyboard.press("Tab");
    check(
      width + " keyboard Tab reaches primary action",
      await page.evaluate(() =>
        document.activeElement.textContent.includes("Explore the menu"),
      ),
    );
    const focus = await page.evaluate(() => ({
      style: getComputedStyle(document.activeElement).outlineStyle,
      width: getComputedStyle(document.activeElement).outlineWidth,
    }));
    check(
      width + " visible keyboard focus",
      focus.style === "solid" && focus.width === "3px",
    );
    await page.keyboard.press("Enter");
    await page.waitForTimeout(150);
    check(width + " Enter navigates to shop", page.url().endsWith("/shop"));
    await page.keyboard.press("Tab");
    check(
      width + " Tab reaches search",
      await page.evaluate(() => document.activeElement.type === "search"),
    );
    await page.keyboard.type("lemon");
    await page.waitForTimeout(100);
    check(
      width + " keyboard search updates results",
      (await page.locator(".product-card").count()) === 1,
    );
    await page.getByLabel("Egg-free recipes", { exact: true }).focus();
    await page.keyboard.press("Space");
    await page.waitForTimeout(100);
    check(
      width + " Space toggles checkbox",
      await page.getByLabel("Egg-free recipes", { exact: true }).isChecked(),
    );
    await page
      .getByRole("button", { name: "Add Little Lemon Loaf", exact: true })
      .focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(100);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(100);
    check(
      width + " keyboard add shares count",
      (await page.locator(".count").innerText()) === "2",
    );
    await page.getByRole("link", { name: /Your parcel/ }).focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(100);
    await page
      .getByRole("link", { name: "Continue to checkout", exact: false })
      .focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(100);
    await page.locator("#name").focus();
    await page.keyboard.type("Sample Recipient");
    await page.keyboard.press("Tab");
    await page.keyboard.type("03001234567");
    await page.keyboard.press("Tab");
    await page.keyboard.type("Sample house 10, pretend street 2");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Home");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page.keyboard.press("Escape");
    await page.getByLabel("Egg-free products only", { exact: true }).focus();
    await page.keyboard.press("Space");
    await page
      .getByRole("button", { name: "Confirm request", exact: true })
      .focus();
    await page.keyboard.press("Enter");
    await page
      .getByRole("heading", { name: "A little joy, all wrapped up." })
      .waitFor();
    check(
      width + " full keyboard checkout completes",
      page.url().endsWith("/confirmation"),
    );
    await page.evaluate(() =>
      localStorage.setItem(
        "peach-parcel-cart",
        JSON.stringify([{ id: "cinnamon-blondies", quantity: 2 }]),
      ),
    );
    for (const path of [
      "/",
      "/shop",
      "/products/cinnamon-blondies",
      "/cart",
      "/checkout",
      "/confirmation",
    ]) {
      await page.goto("http://127.0.0.1:4173" + path);
      await page.waitForTimeout(600);
      check(
        width + " no horizontal overflow " + path,
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      check(
        width + " loaded assets " + path,
        await page
          .locator("img")
          .evaluateAll((es) =>
            es.every((e) => e.complete && e.naturalWidth > 0),
          ),
      );
      if (path === "/shop") {
        await page.screenshot({
          path:
            ".cache/browser/" +
            (width === 390 ? "mobile-shop.png" : "desktop-shop.png"),
          fullPage: width === 1280,
        });
        if (width === 390)
          await page.screenshot({
            path: ".cache/browser/mobile-shop-full.png",
            fullPage: true,
          });
      }
      if (path === "/")
        await page.screenshot({
          path:
            ".cache/browser/" +
            (width === 390 ? "mobile-home.png" : "desktop-home.png"),
          fullPage: true,
        });
    }
  }
  return { results, browser: await page.evaluate(() => navigator.userAgent) };
};
