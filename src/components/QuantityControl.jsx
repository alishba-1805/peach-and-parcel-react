export default function QuantityControl({ product, quantity, onChange }) {
  return <div className="quantity-control" aria-label={'Quantity for ' + product.name}>
    <button type="button" aria-label={'Decrease ' + product.name} disabled={quantity <= 1} onClick={() => onChange(quantity - 1)}>âˆ’</button>
    <span aria-live="polite">{quantity}</span>
    <button type="button" aria-label={'Increase ' + product.name} onClick={() => onChange(quantity + 1)}>+</button>
  </div>;
}
