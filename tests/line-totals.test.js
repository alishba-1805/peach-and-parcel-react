import test from "node:test";
import assert from "node:assert/strict";
import { getLineTotal, getTotals, getCartIssues } from "../src/utils/rules.js";

const product = {
  id: "cake",
  name: "Cake",
  price: 600,
  stock: 4,
  eggFree: false,
};

test("line total uses current product price and selected quantity", () => {
  assert.equal(getLineTotal({ quantity: 2 }, product), 1200);
});

test("an unavailable product ID has no invented line price", () => {
  assert.equal(getLineTotal({ quantity: 2 }, undefined), 0);
});

test("invalid saved quantities do not produce misleading line totals", () => {
  for (const quantity of [0, -1, 1.5, NaN, Infinity, "2", null]) {
    assert.equal(getLineTotal({ quantity }, product), 0);
  }
});

test("overstock selection keeps its displayed price until explicit correction", () => {
  assert.equal(getLineTotal({ quantity: 5 }, product), 3000);
  assert.equal(
    getCartIssues([{ id: "cake", quantity: 5 }], [product]).length,
    1,
  );
});

test("summary subtotal equals valid displayed lines with restored conflicts", () => {
  const cart = [
    { id: "cake", quantity: 2 },
    { id: "missing-product", quantity: 1 },
    { id: "cake", quantity: -1 },
  ];
  const lines = cart.map((item) =>
    getLineTotal(
      item,
      [product].find((p) => p.id === item.id),
    ),
  );
  assert.equal(
    getTotals(cart, [product]).subtotal,
    lines.reduce((sum, line) => sum + line, 0),
  );
  assert.equal(getTotals(cart, [product]).total, 1400);
});

test("stock and recipe conflicts preserve product order and do not mutate the cart", () => {
  const cart = [
    { id: "cake", quantity: 5 },
    { id: "old-product", quantity: 1 },
  ];
  const saved = JSON.stringify(cart);
  const issues = getCartIssues(cart, [product], true);
  assert.equal(issues.length, 3);
  assert.deepEqual(
    issues.map((issue) => issue.id),
    ["cake", "cake", "old-product"],
  );
  assert.match(issues[0].message, /Only 4 available/);
  assert.match(issues[1].message, /contains egg/);
  assert.equal(JSON.stringify(cart), saved);
});
