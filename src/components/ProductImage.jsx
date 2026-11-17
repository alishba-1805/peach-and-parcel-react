export default function ProductImage({ product }) {
  return <img src={product.image || '/images/fallback.svg'} alt={product.imageAlt || product.name} onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = '/images/fallback.svg'; }} />;
}
