import { getTotals, MINIMUM_SUBTOTAL } from "./rules.js";
export const CART_KEY = "peach-parcel-cart";
export const ORDER_KEY = "peach-parcel-receipt";

export function parseCart(raw) {
  if (!raw) return { cart: [], notice: "" };
  try {
    const saved = JSON.parse(raw);
    if (!Array.isArray(saved)) throw new Error("Expected an array");
    const cart = [];
    let corrected = false;
    for (const item of saved) {
      if (!item || typeof item.id !== "string" || !item.id.trim()) {
        corrected = true;
        continue;
      }
      const quantity =
        typeof item.quantity === "number" && Number.isFinite(item.quantity)
          ? item.quantity
          : 0;
      if (quantity !== item.quantity) corrected = true;
      const duplicate = cart.find((entry) => entry.id === item.id);
      if (duplicate) {
        duplicate.quantity += quantity;
        corrected = true;
      } else cart.push({ id: item.id, quantity });
    }
    return {
      cart,
      notice: corrected
        ? "Some saved entries needed repair. Review your parcel; unknown desserts and quantity conflicts are kept for you to correct."
        : "",
    };
  } catch {
    return {
      cart: [],
      notice:
        "The saved parcel could not be read. Start a new parcel; no customer information was stored.",
    };
  }
}

export function readCart() {
  try {
    return parseCart(localStorage.getItem(CART_KEY));
  } catch {
    return {
      cart: [],
      notice:
        "Browser storage is unavailable. Your parcel will work for this visit.",
    };
  }
}

export function readReceipt() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(ORDER_KEY));
    if (
      !saved ||
      !/^PP-/.test(saved.reference) ||
      !Array.isArray(saved.items) ||
      !saved.items.length
    )
      return null;
    if (
      !saved.items.every(
        (item) =>
          typeof item.id === "string" &&
          typeof item.name === "string" &&
          Number.isSafeInteger(item.quantity) &&
          item.quantity > 0 &&
          Number.isSafeInteger(item.price) &&
          item.price >= 0,
      )
    )
      return null;
    const items = saved.items.map(({ id, name, price, quantity }) => ({
      id,
      name,
      price,
      quantity,
    }));
    const totals = getTotals(items, items);
    if (totals.subtotal < MINIMUM_SUBTOTAL) return null;
    return { reference: saved.reference, items, ...totals };
  } catch {
    return null;
  }
}
