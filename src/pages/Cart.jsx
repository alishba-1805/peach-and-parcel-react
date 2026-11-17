import { Link } from "react-router-dom";
import ProductImage from "../components/ProductImage.jsx";
import QuantityControl from "../components/QuantityControl.jsx";
import OrderSummary, { money } from "../components/OrderSummary.jsx";
import { checkMinimum, getLineTotal } from "../utils/rules.js";

export default function Cart({
  cart,
  products,
  totals,
  issues,
  onUpdate,
  onRemove,
}) {
  if (!cart.length)
    return (
      <section className="empty-state">
        <p className="eyebrow">YOUR PARCEL</p>
        <h1>A little room for something lovely.</h1>
        <p>Your parcel is empty. Start with a favourite from the menu.</p>
        <Link className="button" to="/shop">
          Find your dessert →
        </Link>
      </section>
    );
  const valid = !issues.length && checkMinimum(totals.subtotal).valid;
  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">A FEW GOOD CHOICES</p>
        <h1>
          Your <em>parcel.</em>
        </h1>
        <p>
          Change a quantity, add a little more, or take out anything you no
          longer need.
        </p>
      </section>
      <div className="checkout-layout">
        <section aria-label="Selected desserts" className="cart-items">
          {cart.map((item) => {
            const product = products.find((product) => product.id === item.id);
            const itemIssues = issues.filter((issue) => issue.id === item.id);
            return (
              <article className="cart-item" key={item.id}>
                {product && (
                  <Link className="cart-image" to={"/products/" + item.id}>
                    <ProductImage product={product} />
                  </Link>
                )}
                <div className="cart-item-copy">
                  <h2>
                    {product ? (
                      <Link to={"/products/" + item.id}>{product.name}</Link>
                    ) : (
                      "Unavailable saved dessert: " + item.id
                    )}
                  </h2>
                  <p className="muted">
                    {product
                      ? product.servings +
                        " · " +
                        (product.eggFree ? "Egg-free recipe" : "Contains egg")
                      : "This ID is no longer in the catalog."}
                  </p>
                  {product && (
                    <>
                      <p>
                        {money(product.price)} each · {product.stock} available
                      </p>
                      <QuantityControl
                        product={product}
                        quantity={item.quantity}
                        onChange={(quantity) => onUpdate(item.id, quantity)}
                      />
                    </>
                  )}
                  {product && (
                    <strong className="line-total">
                      {money(getLineTotal(item, product))}
                    </strong>
                  )}
                  <button
                    className="text-button remove-button"
                    onClick={() => onRemove(item.id)}
                  >
                    Remove {product ? product.name : "saved dessert"}
                  </button>
                  {itemIssues.map((issue) => (
                    <p className="error-text" key={issue.message}>
                      {issue.message}
                    </p>
                  ))}
                  {product && itemIssues.length > 0 && product.stock > 0 && (
                    <button
                      className="secondary-button"
                      onClick={() =>
                        onUpdate(
                          item.id,
                          Math.min(
                            product.stock,
                            Math.max(1, Math.floor(item.quantity)),
                          ),
                        )
                      }
                    >
                      Use an available quantity
                    </button>
                  )}
                </div>
              </article>
            );
          })}
          <Link className="text-link" to="/shop">
            ← Add something else
          </Link>
        </section>
        <OrderSummary totals={totals}>
          {valid ? (
            <Link className="button full-width" to="/checkout">
              Continue to checkout →
            </Link>
          ) : (
            <>
              <button className="button full-width" disabled>
                Resolve your parcel to continue
              </button>
              <p className="error-text">
                Correct the quantity conflicts and meet the product minimum.
              </p>
            </>
          )}
        </OrderSummary>
      </div>
    </>
  );
}
