import { products } from "../data/products.js";

export async function loadProducts(mode = "normal", signal) {
  await new Promise((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer);
      reject(new DOMException("Loading cancelled", "AbortError"));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", abort);
      resolve();
    }, 450);
    if (signal?.aborted) abort();
    else signal?.addEventListener("abort", abort, { once: true });
  });
  if (mode === "failure")
    throw new Error(
      "The demo catalog could not be loaded. Your saved parcel is safe.",
    );
  return mode === "empty" ? [] : products.map((product) => ({ ...product }));
}
