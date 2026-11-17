export const MINIMUM_SUBTOTAL = 1200;
export const DELIVERY_FEE = 200;
export const SECTORS = ["F-6", "F-7", "F-8", "G-9", "G-10"];

export function checkStock(quantity, stock) {
  if (!Number.isSafeInteger(quantity) || quantity < 1) {
    return {
      valid: false,
      message: "Choose a positive whole-number quantity.",
    };
  }
  if (!Number.isSafeInteger(stock) || stock < 1) {
    return {
      valid: false,
      message:
        "This dessert is unavailable. Remove it or restore the demo stock.",
    };
  }
  if (quantity > stock) {
    return {
      valid: false,
      message:
        "Only " +
        stock +
        " available. Reduce the quantity or remove this dessert.",
    };
  }
  return { valid: true, message: "Quantity is available." };
}

export function checkCompatibility(eggFreeOnly, product) {
  return eggFreeOnly && !product.eggFree
    ? {
        valid: false,
        message:
          product.name +
          " contains egg. Remove it or change your egg-free preference.",
      }
    : { valid: true, message: "Recipe matches your preference." };
}

export function checkMinimum(subtotal) {
  const valid = Number.isFinite(subtotal) && subtotal >= MINIMUM_SUBTOTAL;
  return {
    valid,
    message: valid
      ? "Delivery minimum reached."
      : "Add PKR " +
        Math.max(
          0,
          MINIMUM_SUBTOTAL - (Number.isFinite(subtotal) ? subtotal : 0),
        ).toLocaleString("en-PK") +
        " more in products for delivery. The delivery fee does not count.",
  };
}

export function getTotals(cart, products) {
  const subtotal = cart.reduce((sum, item) => {
    const product = products.find((product) => product.id === item.id);
    const quantity =
      Number.isSafeInteger(item.quantity) && item.quantity > 0
        ? item.quantity
        : 0;
    return sum + (product ? product.price * quantity : 0);
  }, 0);
  const count = cart.reduce(
    (sum, item) =>
      sum +
      (Number.isSafeInteger(item.quantity) && item.quantity > 0
        ? item.quantity
        : 0),
    0,
  );
  return {
    count,
    subtotal,
    delivery: DELIVERY_FEE,
    total: subtotal + DELIVERY_FEE,
    needed: Math.max(0, MINIMUM_SUBTOTAL - subtotal),
  };
}

export function getCartIssues(cart, products, eggFreeOnly = false) {
  return cart.flatMap((item) => {
    const product = products.find((product) => product.id === item.id);
    if (!product)
      return [
        {
          id: item.id,
          message:
            "Saved dessert “" +
            item.id +
            "” is no longer in this catalog. Remove it to continue.",
        },
      ];
    const stock = checkStock(item.quantity, product.stock);
    const recipe = checkCompatibility(eggFreeOnly, product);
    return [
      !stock.valid && {
        id: item.id,
        message: product.name + ": " + stock.message,
      },
      !recipe.valid && { id: item.id, message: recipe.message },
    ].filter(Boolean);
  });
}

export function validateForm(values) {
  const errors = {};
  if (values.name.trim().length < 2)
    errors.name = "Enter a sample recipient name with at least 2 characters.";
  if (!/^03\d{9}$/.test(values.phone.trim()))
    errors.phone = "Use 11 digits: 03 followed by 9 digits, e.g. 03001234567.";
  if (values.address.trim().length < 10)
    errors.address =
      "Enter at least 10 characters of fictional delivery instructions.";
  if (!SECTORS.includes(values.sector))
    errors.sector = "Choose F-6, F-7, F-8, G-9 or G-10.";
  return errors;
}
