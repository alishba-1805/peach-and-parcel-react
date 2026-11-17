import { products } from './data/products.js';
export default function App() {
  return <main><h1>Peach & Parcel</h1><p>A fictional dessert studio in Islamabad.</p><ul>{products.map(product => <li key={product.id}>{product.name} · PKR {product.price}</li>)}</ul></main>;
}
