import test from "node:test";
import assert from "node:assert/strict";
import {
  checkStock,
  checkMinimum,
  checkCompatibility,
  getCartIssues,
  getTotals,
  validateForm,
  SECTORS,
} from "../src/utils/rules.js";
import { products } from "../src/data/products.js";

for (const [quantity, valid] of [
  [2, true],
  [4, true],
  [5, false],
  [0, false],
  [-1, false],
  [1.5, false],
  [NaN, false],
  [Infinity, false],
  ["2", false],
]) {
  test("stock 4, quantity " + quantity + " → " + valid, () =>
    assert.equal(checkStock(quantity, 4).valid, valid),
  );
}
test("stock zero blocks a positive quantity", () =>
  assert.equal(checkStock(1, 0).valid, false));
test("minimum 1199 fails", () => assert.equal(checkMinimum(1199).valid, false));
test("minimum exactly 1200 passes", () =>
  assert.equal(checkMinimum(1200).valid, true));
test("minimum 1201 passes", () => assert.equal(checkMinimum(1201).valid, true));
test("delivery fee cannot make 1000 qualify", () => {
  const totals = getTotals(
    [{ id: "test", quantity: 1 }],
    [{ id: "test", price: 1000 }],
  );
  assert.equal(totals.total, 1200);
  assert.equal(checkMinimum(totals.subtotal).valid, false);
});
test("one egg-free item is compatible", () =>
  assert.equal(
    checkCompatibility(true, { name: "Cup", eggFree: true }).valid,
    true,
  ));
test("one incompatible item blocks and identifies the product", () => {
  const result = checkCompatibility(true, { name: "Bento", eggFree: false });
  assert.equal(result.valid, false);
  assert.match(result.message, /Bento/);
});
test("ordinary preference permits egg recipes", () =>
  assert.equal(checkCompatibility(false, { eggFree: false }).valid, true));
test("decreased stock keeps item and reports conflict", () => {
  const cart = [{ id: "a", quantity: 4 }];
  assert.equal(
    getCartIssues(cart, [{ id: "a", name: "Cake", stock: 2, eggFree: true }])
      .length,
    1,
  );
  assert.equal(cart[0].quantity, 4);
});
test("unknown saved ID blocks completion", () =>
  assert.equal(
    getCartIssues([{ id: "old-id", quantity: 1 }], products).length,
    1,
  ));
test("totals use live prices and quantities", () =>
  assert.deepEqual(getTotals([{ id: "lemon-loaf", quantity: 2 }], products), {
    count: 2,
    subtotal: 1200,
    delivery: 200,
    total: 1400,
    needed: 0,
  }));
test("invalid quantities never poison calculated totals", () =>
  assert.equal(
    getTotals([{ id: "lemon-loaf", quantity: NaN }], products).subtotal,
    0,
  ));
const validForm = {
  name: "Demo Guest",
  phone: "03001234567",
  address: "Sample house 10, pretend street",
  sector: "F-6",
};
test("sample form passes", () => assert.deepEqual(validateForm(validForm), {}));
test("four field-specific errors", () =>
  assert.deepEqual(
    Object.keys(
      validateForm({
        name: "A",
        phone: "123",
        address: "short",
        sector: "F-9",
      }),
    ),
    ["name", "phone", "address", "sector"],
  ));
test("all five supported sectors pass", () => {
  for (const sector of SECTORS)
    assert.deepEqual(validateForm({ ...validForm, sector }), {});
});
test("name, mobile and address boundaries", () =>
  assert.deepEqual(
    validateForm({
      name: "Ab",
      phone: "03123456789",
      address: "1234567890",
      sector: "G-10",
    }),
    {},
  ));
test("ten-digit mobile fails", () =>
  assert.ok(validateForm({ ...validForm, phone: "0300123456" }).phone));
test("catalog has twelve stable unique IDs and meaningful fields", () => {
  assert.equal(products.length, 12);
  assert.equal(new Set(products.map((p) => p.id)).size, 12);
  for (const p of products) {
    assert.equal(typeof p.eggFree, "boolean");
    assert.ok(p.image && p.description && p.servings);
  }
});
