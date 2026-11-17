import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { products } from './data/products.js';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import NotFound from './pages/NotFound.jsx';
export default function App() {
  const [filters, setFilters] = useState({ search: '', category: 'All', eggFree: false, sort: 'studio' });
  return <><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main"><Routes><Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop products={products} filters={filters} setFilters={setFilters}/>}/><Route path="/products/:id" element={<ProductDetails products={products}/>}/><Route path="*" element={<NotFound/>}/></Routes></main><footer><p className="brand">peach & parcel</p><p>A fictional dessert studio Â· Islamabad Â· Demo orders only</p></footer></>;
}
