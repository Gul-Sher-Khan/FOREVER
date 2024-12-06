import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductUpload from "../pages/Vendor/ProductUpload";
import VendorRegistration from "../pages/Vendor/VendorRegistration";
import Navbar from "../components/Vendor/Navbar";
import Dashboard from "../pages/Vendor/Dashboard";
import Orders from "../pages/Vendor/Orders";

const VendorLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product-upload" element={<ProductUpload />} />
          <Route path="/register" element={<VendorRegistration />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default VendorLayout;
