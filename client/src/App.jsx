import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CategoryStrip from "./components/CategoryStrip";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <>
      <Navbar />
      <CategoryStrip />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
