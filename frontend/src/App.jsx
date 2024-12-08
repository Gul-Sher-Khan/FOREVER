import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/User/Home";
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";
import Login from "./pages/User/Login";
import SearchBar from "./components/User/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VendorLayout from "./Layouts/VendorLayout";
import AdminLayout from "./Layouts/AdminLayout";
import UserLayout from "./Layouts/UserLayout";
import { AuthGuard } from "./Utils/authGuard";


const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={` transition-opacity duration-300 ${
        menuOpen ? "opacity-90 pointer-events-none" : "opacity-100"
      }`}
    >
      <AuthGuard />
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
              <Navbar setMenuOpen={setMenuOpen} />
              <SearchBar />
              <Home />
              <Footer />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar setMenuOpen={setMenuOpen} />
              <SearchBar />
              <Login />
              <Footer />
            </>
          }
        />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/vendor/*" element={<VendorLayout />} />
        <Route path="/user/*" element={<UserLayout />} />
      </Routes>
    </div>
  );
};

export default App;
