import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductImage from "../components/ProductImage.jsx";
export default function ProductDetails({ products, onAdd }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(1);
  if (!product)
    return (
      <section className="empty-state">
        <h1>Dessert not found</h1>
        <p>This link may be old. Your existing parcel is still safe.</p>
        <Link className="button" to="/shop">
          Back to the menu
        </Link>
      </section>
    );
  return (
    <>
      <Link className="text-link back-link" to="/shop">
        ← Back to your results
      </Link>
      <section className="detail-layout">
        <div className="detail-image">
          <ProductImage product={product} />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{product.category} / THE STUDIO COLLECTION</p>
          <h1>{product.name}</h1>
          <p className="detail-price">
            PKR {product.price.toLocaleString("en-PK")}
          </p>
          <p>{product.description}</p>
          <dl className="product-facts">
            <div>
              <dt>Made for</dt>
              <dd>{product.servings}</dd>
            </div>
            <div>
              <dt>Recipe</dt>
              <dd>{product.eggFree ? "Egg-free recipe" : "Contains egg"}</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>
                {product.stock
                  ? product.stock + " available"
                  : "Sold out today"}
              </dd>
            </div>
          </dl>
          <p className="fine">
            Recipe labels are simulated, not an allergy or cross-contamination
            guarantee.
          </p>
          <label>
            Quantity
            <input
              className="quantity-input"
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
          </label>
          {onAdd && (
            <button
              className="button"
              disabled={!product.stock}
              onClick={() => onAdd(id, quantity)}
            >
              {product.stock ? "Add to your parcel" : "Sold out today"}
            </button>
          )}
          <aside className="delivery-note">
            <strong>A note on delivery</strong>
            <p>
              PKR 1,200 product minimum + PKR 200 delivery. F-6, F-7, F-8, G-9
              and G-10 only. Use sample information only. No payment or real
              order.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
