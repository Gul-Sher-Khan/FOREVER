import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/User/About";
import Collection from "../pages/User/Collection";
import PlaceOrder from "../pages/User/PlaceOrder";
import Cart from "../pages/User/Cart";
import Product from "../pages/User/Product";
import Contact from "../pages/User/Contact";
import Orders from "../pages/User/Orders";
import Footer from "../components/Shared/Footer";
import Navbar from "../components/Shared/Navbar";
import SearchBar from "../components/User/SearchBar";
import Wishlist from "../pages/User/Wishlist";
import ProfileManagement from "../pages/User/ProfileManagement";
import VendorRegistration from "../pages/User/VendorRegistration";
import { useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axiosInstance from "../Utils/axiosInstance";

const UserLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { setProducts } = useContext(ShopContext);

  const getProducts = async () => {
    try {
      axiosInstance.get("/products").then((res) => {
        setProducts(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div
      className={`px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] transition-opacity duration-300 ${
        menuOpen ? "opacity-90 pointer-events-none" : "opacity-100"
      }`}
    >
      <Navbar setMenuOpen={setMenuOpen} />
      <SearchBar />
      <Routes>
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<ProfileManagement />} />
        <Route path="/vendor-registration" element={<VendorRegistration />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default UserLayout;
