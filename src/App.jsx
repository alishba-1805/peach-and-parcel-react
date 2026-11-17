import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { products } from './data/products.js';
import { checkMinimum, checkStock, getCartIssues, getTotals } from './utils/rules.js';
import { CART_KEY, ORDER_KEY, readCart, readReceipt } from './utils/storage.js';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Confirmation from './pages/Confirmation.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const [restored] = useState(readCart);
  const [cart, setCart] = useState(restored.cart);
  const [notice, setNotice] = useState(restored.notice);
  const [order, setOrder] = useState(readReceipt);
  const [filters, setFilters] = useState({ search: '', category: 'All', eggFree: false, sort: 'studio' });
  const location = useLocation();
  const totals = getTotals(cart, products);
  const issues = getCartIssues(cart, products);

  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart.map(({ id, quantity }) => ({ id, quantity })))); }
    catch { setNotice('Browser storage is unavailable. Keep this tab open to retain your parcel.'); }
  }, [cart]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Peach & Parcel Â· ' + (location.pathname === '/' ? 'Dessert studio' : location.pathname.split('/')[1]);
    document.getElementById('main')?.focus();
  }, [location.pathname]);

  function add(id, quantity) {
    const product = products.find(product => product.id === id);
    const existing = cart.find(item => item.id === id);
    const nextQuantity = (existing?.quantity || 0) + quantity;
    const result = checkStock(quantity, product?.stock);
    const combined = checkStock(nextQuantity, product?.stock);
    if (!result.valid || !combined.valid) { setNotice(!result.valid ? result.message : combined.message); return; }
    setCart(previous => existing ? previous.map(item => item.id === id ? { ...item, quantity: item.quantity + quantity } : item) : [...previous, { id, quantity }]);
    setNotice(product.name + ' added. Your parcel now has ' + nextQuantity + ' of this dessert.');
  }

  function update(id, quantity) {
    const product = products.find(product => product.id === id);
    const result = checkStock(quantity, product?.stock);
    if (!result.valid) { setNotice(result.message); return; }
    setCart(previous => previous.map(item => item.id === id ? { ...item, quantity } : item));
    setNotice('Quantity updated.');
  }

  function remove(id) {
    setCart(previous => previous.filter(item => item.id !== id));
    setNotice('Dessert removed from your parcel.');
  }

  function complete(eggFreeOnly) {
    if (!cart.length || getCartIssues(cart, products, eggFreeOnly).length || !checkMinimum(totals.subtotal).valid) return false;
    const items = cart.map(item => { const product = products.find(product => product.id === item.id); return { id: item.id, quantity: item.quantity, name: product.name, price: product.price }; });
    const receipt = { reference: 'PP-' + Date.now().toString(36).toUpperCase(), items, ...totals };
    try { sessionStorage.setItem(ORDER_KEY, JSON.stringify(receipt)); }
    catch { setNotice('Receipt storage is unavailable. This confirmation will last until refresh.'); }
    setOrder(receipt);
    setCart([]);
    return true;
  }

  return <><a className="skip-link" href="#main">Skip to content</a><Header count={totals.count}/><div className="notice-wrap" aria-live="polite">{notice && <div className="notice"><p>{notice}</p><button aria-label="Dismiss message" onClick={() => setNotice('')}>Ã—</button></div>}</div><main id="main" tabIndex="-1"><Routes><Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop products={products} filters={filters} setFilters={setFilters} cart={cart} onAdd={add}/>}/><Route path="/products/:id" element={<ProductDetails products={products} onAdd={add}/>}/><Route path="/cart" element={<Cart cart={cart} products={products} totals={totals} issues={issues} onUpdate={update} onRemove={remove}/>}/><Route path="/checkout" element={<Checkout cart={cart} products={products} totals={totals} onComplete={complete}/>}/><Route path="/confirmation" element={<Confirmation order={order}/>}/><Route path="*" element={<NotFound/>}/></Routes></main><footer><p className="brand">peach & parcel</p><p>A fictional dessert studio Â· Islamabad Â· Demo orders only</p><p className="fine">F-6 Â· F-7 Â· F-8 Â· G-9 Â· G-10</p></footer></>;
}
