import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Admin/Navbar";
import Dashboard from "../pages/Admin/Dashboard";
import UserVendorManagement from "../pages/Admin/UserVendorManagement";
import ProductApproval from "../pages/Admin/ProductsApproval";
import Analytics from "../pages/Admin/Analytics";
import FeedbackModeration from "../pages/Admin/Feedback";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manage-users" element={<UserVendorManagement />} />
        <Route path="/product-approvals" element={<ProductApproval />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="/feedback" element={<FeedbackModeration /> } />
      </Routes>
    </div>
  );
};

export default AdminLayout;
