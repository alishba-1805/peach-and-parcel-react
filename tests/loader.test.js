import test from "node:test";
import assert from "node:assert/strict";
import { loadProducts } from "../src/utils/loadProducts.js";
test("normal loader returns twelve records", async () =>
  assert.equal((await loadProducts()).length, 12));
test("failure rejects, retry succeeds", async () => {
  await assert.rejects(loadProducts("failure"), /could not be loaded/);
  assert.equal((await loadProducts()).length, 12);
});
test("empty loader is distinct from failed loader", async () =>
  assert.deepEqual(await loadProducts("empty"), []));
test("cancelled loader aborts safely", async () => {
  const controller = new AbortController();
  const pending = loadProducts("normal", controller.signal);
  controller.abort();
  await assert.rejects(pending, { name: "AbortError" });
});
