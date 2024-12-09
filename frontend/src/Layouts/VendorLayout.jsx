import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductUpload from "../pages/Vendor/ProductUpload";
import Navbar from "../components/Vendor/Navbar";
import Dashboard from "../pages/Vendor/Dashboard";
import Orders from "../pages/Vendor/Orders";
import ManageInventory from "../pages/Vendor/Inventory";
import AnalyticsPage from "../pages/Vendor/Analystics";
import CouponsPromotions from "../pages/Vendor/CouponsPromotions";
import Reviews from "../pages/Vendor/Reviews";

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
          <Route path="/orders" element={<Orders />} />
          <Route path="/inventory" element={<ManageInventory />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/coupons" element={<CouponsPromotions />} />
          <Route path="/messages" element={<Reviews />} />
        </Routes>
      </div>
    </div>
  );
};

export default VendorLayout;
