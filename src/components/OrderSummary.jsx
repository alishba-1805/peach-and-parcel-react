import { checkMinimum } from "../utils/rules.js";
export function money(value) {
  return "PKR " + value.toLocaleString("en-PK");
}
export default function OrderSummary({ totals, children }) {
  const minimum = checkMinimum(totals.subtotal);
  return (
    <aside className="order-summary">
      <p className="eyebrow">THOUGHTFULLY TALLIED</p>
      <h2>Your parcel, at a glance</h2>
      <dl>
        <div>
          <dt>Items ({totals.count})</dt>
          <dd>{money(totals.subtotal)}</dd>
        </div>
        <div>
          <dt>Delivery · fixed fee</dt>
          <dd>{money(totals.delivery)}</dd>
        </div>
        <div className="grand-total">
          <dt>Total</dt>
          <dd>{money(totals.total)}</dd>
        </div>
      </dl>
      <p className={minimum.valid ? "success-text" : "error-text"}>
        {minimum.message}
      </p>
      <p className="fine">
        Product minimum PKR 1,200. F-6, F-7, F-8, G-9 and G-10, Islamabad.
      </p>
      {children}
      <p className="fine">Demo only · No payment · No real delivery</p>
    </aside>
  );
}
