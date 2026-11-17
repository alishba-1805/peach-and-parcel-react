import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OrderSummary, { money } from "../components/OrderSummary.jsx";
import {
  checkMinimum,
  getCartIssues,
  SECTORS,
  validateForm,
} from "../utils/rules.js";

export default function Checkout({ cart, products, totals, onComplete }) {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    address: "",
    sector: "",
    eggFree: false,
  });
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const issues = getCartIssues(cart, products, values.eggFree);
  const minimum = checkMinimum(totals.subtotal);
  function change(event) {
    const { name, value, checked, type } = event.target;
    setValues((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setSubmitMessage("");
  }
  function submit(event) {
    event.preventDefault();
    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    if (completed) return;
    if (
      Object.keys(nextErrors).length ||
      issues.length ||
      !minimum.valid ||
      !cart.length
    ) {
      setSubmitMessage(
        "Please correct the highlighted fields and parcel conflicts. Your other entries are kept.",
      );
      return;
    }
    setCompleted(true);
    if (onComplete(values.eggFree)) navigate("/confirmation");
    else {
      setCompleted(false);
      setSubmitMessage(
        "Your parcel changed. Review the current stock and try again.",
      );
    }
  }
  function field(name, label, example, type = "text") {
    return (
      <label className="form-field" htmlFor={name}>
        {label}
        <span className="field-hint">{example}</span>
        <input
          id={name}
          name={name}
          type={type}
          value={values[name]}
          onChange={change}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? name + "-error" : undefined}
          autoComplete="off"
        />
        {errors[name] && (
          <span id={name + "-error"} className="error-text">
            {errors[name]}
          </span>
        )}
      </label>
    );
  }
  if (!cart.length)
    return (
      <section className="empty-state">
        <h1>Your parcel is empty</h1>
        <p>Add a dessert before starting a demo delivery request.</p>
        <Link className="button" to="/shop">
          Explore the menu
        </Link>
      </section>
    );
  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">THE FINAL LITTLE DETAILS</p>
        <h1>
          Send some <em>sweetness.</em>
        </h1>
        <p>
          Demo checkout · Use sample information only. Nothing is submitted.
        </p>
      </section>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submit} noValidate>
          <h2>Fictional delivery details</h2>
          <p className="fine">
            These fields stay in memory for this page only. We never save your
            name, phone or address.
          </p>
          {field("name", "Sample recipient name", "For example: Demo Guest")}
          {field(
            "phone",
            "Sample Pakistani mobile",
            "For example: 03001234567",
            "tel",
          )}
          <label className="form-field" htmlFor="address">
            Fictional address / instructions
            <span className="field-hint">
              For example: Sample house 10, pretend street 2
            </span>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={values.address}
              onChange={change}
              aria-invalid={Boolean(errors.address)}
              aria-describedby={errors.address ? "address-error" : undefined}
            />
            {errors.address && (
              <span id="address-error" className="error-text">
                {errors.address}
              </span>
            )}
          </label>
          <label className="form-field" htmlFor="sector">
            Delivery sector
            <select
              id="sector"
              name="sector"
              value={values.sector}
              onChange={change}
              aria-invalid={Boolean(errors.sector)}
              aria-describedby={errors.sector ? "sector-error" : undefined}
            >
              <option value="">Choose a supported sector</option>
              {SECTORS.map((sector) => (
                <option key={sector}>{sector}</option>
              ))}
            </select>
            {errors.sector && (
              <span id="sector-error" className="error-text">
                {errors.sector}
              </span>
            )}
          </label>
          <div className="preference-box">
            <label className="check-label">
              <input
                name="eggFree"
                type="checkbox"
                checked={values.eggFree}
                onChange={change}
              />
              Egg-free products only
            </label>
            <p className="fine">
              Simulated recipe labels are not an allergy or cross-contamination
              guarantee.
            </p>
          </div>
          <div aria-live="polite">
            {issues.map((issue) => (
              <p className="error-text" key={issue.id + issue.message}>
                {issue.message}
              </p>
            ))}
            {!minimum.valid && <p className="error-text">{minimum.message}</p>}
            {submitMessage && (
              <p className="error-box" role="alert">
                {submitMessage}
              </p>
            )}
          </div>
          {issues.length > 0 && (
            <Link className="text-link" to="/cart">
              Correct your parcel →
            </Link>
          )}
          <button
            className="button full-width"
            type="submit"
            disabled={completed || issues.length > 0 || !minimum.valid}
          >
            Confirm demo request
          </button>
          <p className="fine">No order, payment or message will be sent.</p>
        </form>
        <OrderSummary totals={totals}>
          <ul className="receipt-lines">
            {cart.map((item) => {
              const product = products.find(
                (product) => product.id === item.id,
              );
              return (
                <li key={item.id}>
                  <span>
                    {item.quantity} × {product?.name || item.id}
                  </span>
                  <strong>
                    {money(
                      (product?.price || 0) *
                        (Number.isSafeInteger(item.quantity) &&
                        item.quantity > 0
                          ? item.quantity
                          : 0),
                    )}
                  </strong>
                </li>
              );
            })}
          </ul>
          <Link className="text-link" to="/cart">
            Edit your parcel
          </Link>
        </OrderSummary>
      </div>
    </>
  );
}
