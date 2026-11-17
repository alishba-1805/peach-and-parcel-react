import { Link } from "react-router-dom";
import { money } from "../components/OrderSummary.jsx";
export default function Confirmation({ order }) {
  if (!order)
    return (
      <section className="empty-state">
        <h1>No order summary yet</h1>
        <p>Complete a valid checkout to see an itemized receipt here.</p>
        <Link className="button" to="/shop">
          Explore the menu
        </Link>
      </section>
    );
  return (
    <section className="confirmation">
      <span className="confirmation-mark" aria-hidden="true">
        ✓
      </span>
      <p className="eyebrow">YOUR PARCEL IS READY</p>
      <h1>
        A little joy,
        <br />
        <em>all wrapped up.</em>
      </h1>
      <p>
        <strong>Simulated order — nothing was submitted.</strong>
      </p>
      <p>No payment, real order or delivery has been arranged.</p>
      <div className="receipt">
        <p className="eyebrow">ORDER SUMMARY / {order.reference}</p>
        <ul className="receipt-lines">
          {order.items.map((item) => (
            <li key={item.id}>
              <span>
                {item.quantity} × {item.name}
              </span>
              <strong>{money(item.price * item.quantity)}</strong>
            </li>
          ))}
        </ul>
        <dl>
          <div>
            <dt>Product subtotal</dt>
            <dd>{money(order.subtotal)}</dd>
          </div>
          <div>
            <dt>Delivery</dt>
            <dd>{money(order.delivery)}</dd>
          </div>
          <div className="grand-total">
            <dt>Total</dt>
            <dd>{money(order.total)}</dd>
          </div>
        </dl>
        <p className="fine">
          Only this nonpersonal receipt is kept for refreshes in this tab. Your
          parcel has been cleared.
        </p>
      </div>
      <Link className="button" to="/shop">
        Back to the dessert edit →
      </Link>
    </section>
  );
}
