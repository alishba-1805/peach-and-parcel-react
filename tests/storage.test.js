import test from "node:test";
import assert from "node:assert/strict";
import { parseCart, readReceipt, ORDER_KEY } from "../src/utils/storage.js";
test("empty saved cart is safe", () =>
  assert.deepEqual(parseCart(null).cart, []));
test("corrupt saved JSON has a visible notice", () =>
  assert.ok(parseCart("{").notice));
test("non-array saved data has a visible notice", () =>
  assert.ok(parseCart("{}").notice));
test("unknown IDs and overstock remain for correction", () =>
  assert.deepEqual(parseCart('[{"id":"old","quantity":999}]').cart, [
    { id: "old", quantity: 999 },
  ]));
test("customer values are stripped from restored entries", () =>
  assert.deepEqual(
    parseCart('[{"id":"a","quantity":2,"name":"private"}]').cart,
    [{ id: "a", quantity: 2 }],
  ));
test("unreadable entries report repairs", () => {
  const result = parseCart('[null,{"id":"a","quantity":"bad"}]');
  assert.ok(result.notice);
  assert.deepEqual(result.cart, [{ id: "a", quantity: 0 }]);
});
test("duplicate IDs merge with visible repair notice", () => {
  const result = parseCart('[{"id":"a","quantity":1},{"id":"a","quantity":2}]');
  assert.equal(result.cart[0].quantity, 3);
  assert.ok(result.notice);
});
test("missing or malformed receipt gives useful no-receipt state", () => {
  global.sessionStorage = { getItem: () => "{" };
  assert.equal(readReceipt(), null);
  delete global.sessionStorage;
});
test("receipt restores only nonpersonal values and recalculates totals", () => {
  global.sessionStorage = {
    getItem: (key) =>
      key === ORDER_KEY
        ? JSON.stringify({
            reference: "PP-TEST",
            name: "private",
            total: 0,
            items: [{ id: "a", name: "Cake", price: 1200, quantity: 1 }],
          })
        : null,
  };
  const result = readReceipt();
  assert.equal(result.total, 1400);
  assert.equal(result.name, undefined);
  delete global.sessionStorage;
});
