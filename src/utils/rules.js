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
      message: "This dessert is unavailable. Remove it or restore stock.",
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
  if (eggFreeOnly && !product.eggFree) {
    return {
      valid: false,
      message:
        product.name +
        " contains egg. Remove it or change your egg-free preference.",
    };
  }
  return { valid: true, message: "Recipe matches your preference." };
}

export function checkMinimum(subtotal) {
  if (Number.isFinite(subtotal) && subtotal >= MINIMUM_SUBTOTAL) {
    return { valid: true, message: "Delivery minimum reached." };
  }
  const safeSubtotal = Number.isFinite(subtotal) ? subtotal : 0;
  const shortfall = Math.max(0, MINIMUM_SUBTOTAL - safeSubtotal);
  return {
    valid: false,
    message:
      "Add PKR " +
      shortfall.toLocaleString("en-PK") +
      " more in products for delivery. The delivery fee does not count.",
  };
}

export function getLineTotal(item, product) {
  if (!product || !Number.isSafeInteger(item.quantity) || item.quantity < 1) {
    return 0;
  }
  return product.price * item.quantity;
}

export function getTotals(cart, products) {
  const subtotal = cart.reduce((sum, item) => {
    const product = products.find((product) => product.id === item.id);
    return sum + getLineTotal(item, product);
  }, 0);
  const count = cart.reduce((sum, item) => {
    if (!Number.isSafeInteger(item.quantity) || item.quantity < 1) return sum;
    return sum + item.quantity;
  }, 0);
  return {
    count,
    subtotal,
    delivery: DELIVERY_FEE,
    total: subtotal + DELIVERY_FEE,
    needed: Math.max(0, MINIMUM_SUBTOTAL - subtotal),
  };
}

export function getCartIssues(cart, products, eggFreeOnly = false) {
  const issues = [];
  for (const item of cart) {
    const product = products.find((product) => product.id === item.id);
    if (!product) {
      issues.push({
        id: item.id,
        message:
          "Saved dessert “" +
          item.id +
          "” is no longer in this catalog. Remove it to continue.",
      });
      continue;
    }

    const stock = checkStock(item.quantity, product.stock);
    if (!stock.valid) {
      issues.push({
        id: item.id,
        message: product.name + ": " + stock.message,
      });
    }
    const recipe = checkCompatibility(eggFreeOnly, product);
    if (!recipe.valid) {
      issues.push({ id: item.id, message: recipe.message });
    }
  }
  return issues;
}

export function validateForm(values) {
  const errors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Enter a sample recipient name with at least 2 characters.";
  }
  if (!/^03\d{9}$/.test(values.phone.trim())) {
    errors.phone = "Use 11 digits: 03 followed by 9 digits, e.g. 03001234567.";
  }
  if (values.address.trim().length < 10) {
    errors.address =
      "Enter at least 10 characters of fictional delivery instructions.";
  }
  if (!SECTORS.includes(values.sector)) {
    errors.sector = "Choose F-6, F-7, F-8, G-9 or G-10.";
  }
  return errors;
}
