import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CategoryStrip from "./components/CategoryStrip";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SearchResults from "./pages/SearchResults";
import OrderConfirmation from "./pages/OrderConfirmation";
import Wishlist from "./pages/Wishlist";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from "./context/CartContext.jsx";

function App() {
  return (
    <>
    <CartProvider>

      <Navbar />
      <CategoryStrip />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmed" element={<OrderConfirmation />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </CartProvider>
    </>
  );
}

export default App;
