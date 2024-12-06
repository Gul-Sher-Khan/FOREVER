import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Admin/Navbar";
import Dashboard from "../pages/Admin/Dashboard";
import UserVendorManagement from "../pages/Admin/UserVendorManagement";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manage-users" element={<UserVendorManagement />} />
      </Routes>
    </div>
  );
};

export default AdminLayout;
