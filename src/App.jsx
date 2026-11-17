import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  checkMinimum,
  checkStock,
  getCartIssues,
  getTotals,
} from "./utils/rules.js";
import { CART_KEY, ORDER_KEY, readCart, readReceipt } from "./utils/storage.js";
import { loadProducts } from "./utils/loadProducts.js";
import Header from "./components/Header.jsx";
import CatalogStatus from "./components/CatalogStatus.jsx";
import DemoChecks from "./components/DemoChecks.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Confirmation from "./pages/Confirmation.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const [restored] = useState(readCart);
  const [cart, setCart] = useState(restored.cart);
  const [notice, setNotice] = useState(restored.notice);
  const [order, setOrder] = useState(readReceipt);
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    eggFree: false,
    sort: "studio",
  });
  const [catalog, setCatalog] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [request, setRequest] = useState({ mode: "normal", version: 0 });
  const [reducedStock, setReducedStock] = useState(false);
  const location = useLocation();
  const products = catalog.map((product) =>
    reducedStock &&
    ["strawberry-bento", "vanilla-cupcakes"].includes(product.id)
      ? { ...product, stock: product.id === "strawberry-bento" ? 0 : 2 }
      : product,
  );
  const totals = getTotals(cart, products);
  const issues = getCartIssues(cart, products);
  const ready = status === "ready" && products.length > 0;

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    async function fetchCatalog() {
      try {
        const result = await loadProducts(request.mode, controller.signal);
        if (!controller.signal.aborted) {
          setCatalog(result);
          setStatus("ready");
        }
      } catch (error) {
        if (error.name !== "AbortError" && !controller.signal.aborted) {
          setError(error.message);
          setStatus("error");
        }
      }
    }
    fetchCatalog();
    return () => controller.abort();
  }, [request]);

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart.map(({ id, quantity }) => ({ id, quantity }))),
      );
    } catch {
      setNotice(
        "Browser storage is unavailable. Keep this tab open to retain your parcel.",
      );
    }
  }, [cart]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title =
      "Peach & Parcel · " +
      (location.pathname === "/"
        ? "Dessert studio"
        : location.pathname.split("/")[1]);
    document.getElementById("main")?.focus();
  }, [location.pathname]);

  function requestCatalog(mode) {
    setRequest((previous) => ({ mode, version: previous.version + 1 }));
  }

  function add(id, quantity) {
    const product = products.find((product) => product.id === id);
    const existing = cart.find((item) => item.id === id);
    const nextQuantity = (existing?.quantity || 0) + quantity;
    const result = checkStock(quantity, product?.stock);
    const combined = checkStock(nextQuantity, product?.stock);
    if (!ready || !result.valid || !combined.valid) {
      setNotice(!result.valid ? result.message : combined.message);
      return;
    }
    setCart((previous) =>
      existing
        ? previous.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...previous, { id, quantity }],
    );
    setNotice(
      product.name +
        " added. Your parcel now has " +
        nextQuantity +
        " of this dessert.",
    );
  }

  function update(id, quantity) {
    const product = products.find((product) => product.id === id);
    const result = checkStock(quantity, product?.stock);
    if (!ready || !result.valid) {
      setNotice(result.message);
      return;
    }
    setCart((previous) =>
      previous.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
    setNotice("Quantity updated.");
  }

  function remove(id) {
    setCart((previous) => previous.filter((item) => item.id !== id));
    setNotice("Dessert removed from your parcel.");
  }

  function complete(eggFreeOnly) {
    if (
      !ready ||
      !cart.length ||
      getCartIssues(cart, products, eggFreeOnly).length ||
      !checkMinimum(totals.subtotal).valid
    )
      return false;
    const items = cart.map((item) => {
      const product = products.find((product) => product.id === item.id);
      return {
        id: item.id,
        quantity: item.quantity,
        name: product.name,
        price: product.price,
      };
    });
    const receipt = {
      reference: "PP-" + Date.now().toString(36).toUpperCase(),
      items,
      ...totals,
    };
    try {
      sessionStorage.setItem(ORDER_KEY, JSON.stringify(receipt));
    } catch {
      setNotice(
        "Receipt storage is unavailable. This confirmation will last until refresh.",
      );
    }
    setOrder(receipt);
    setCart([]);
    return true;
  }

  const catalogFeedback = (
    <CatalogStatus
      status={status}
      error={error}
      onRetry={() => requestCatalog("normal")}
    />
  );
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header count={totals.count} />
      <div className="notice-wrap" aria-live="polite">
        {notice && (
          <div className="notice">
            <p>{notice}</p>
            <button aria-label="Dismiss message" onClick={() => setNotice("")}>
              ×
            </button>
          </div>
        )}
      </div>
      <main id="main" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shop"
            element={
              ready ? (
                <Shop
                  products={products}
                  filters={filters}
                  setFilters={setFilters}
                  cart={cart}
                  onAdd={add}
                />
              ) : (
                catalogFeedback
              )
            }
          />
          <Route
            path="/products/:id"
            element={
              ready ? (
                <ProductDetails
                  key={location.pathname}
                  products={products}
                  onAdd={add}
                />
              ) : (
                catalogFeedback
              )
            }
          />
          <Route
            path="/cart"
            element={
              ready ? (
                <Cart
                  cart={cart}
                  products={products}
                  totals={totals}
                  issues={issues}
                  onUpdate={update}
                  onRemove={remove}
                />
              ) : (
                catalogFeedback
              )
            }
          />
          <Route
            path="/checkout"
            element={
              ready ? (
                <Checkout
                  cart={cart}
                  products={products}
                  totals={totals}
                  onComplete={complete}
                />
              ) : (
                catalogFeedback
              )
            }
          />
          <Route
            path="/confirmation"
            element={<Confirmation order={order} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer>
        <p className="brand">peach & parcel</p>
        <p>A fictional dessert studio · Islamabad · Demo orders only</p>
        <p className="fine">F-6 · F-7 · F-8 · G-9 · G-10</p>
        <DemoChecks
          onLoad={requestCatalog}
          onStock={() => {
            setReducedStock(true);
            setNotice(
              "Demo stock reduced. Existing selections are kept; review your parcel for conflicts.",
            );
          }}
          onReset={() => {
            setReducedStock(false);
            requestCatalog("normal");
            setNotice(
              "Ordinary demo catalog and stock restored. Your parcel is kept.",
            );
          }}
        />
      </footer>
    </>
  );
}
