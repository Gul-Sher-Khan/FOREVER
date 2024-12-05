import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/User/Home";
import About from "./pages/User/About";
import Collection from "./pages/User/Collection";
import PlaceOrder from "./pages/User/PlaceOrder";
import Login from "./pages/User/Login";
import Cart from "./pages/User/Cart";
import Product from "./pages/User/Product";
import Contact from "./pages/User/Contact";
import Orders from "./pages/User/Orders";
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";
import SearchBar from "./components/User/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] transition-opacity duration-300 ${
        menuOpen ? "opacity-90 pointer-events-none" : "opacity-100"
      }`}
    >
      <ToastContainer />
      <Navbar setMenuOpen={setMenuOpen} />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
