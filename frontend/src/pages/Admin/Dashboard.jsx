import React, { useEffect, useState } from "react";
import axiosInstance from "../../Utils/axiosInstance";
import {
  FaShoppingCart,
  FaUser,
  FaChartLine,
  FaTags,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    percentageIncreaseTotalRevenue: 0,
    percentageIncreaseActiveUsers: 0,
    percentageIncreaseNewVendors: 0,
    percentageIncreaseMonthlyRevenue: 0,
    activeUsers: 0,
    newVendors: 0,
    topProducts: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get("/admin/dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">
          Monitor and manage platform performance.
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue Card */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-600">Total Revenue</h2>
            <FaShoppingCart className="text-blue-500 text-2xl" />
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-4">
            ${dashboardData.totalRevenue}
          </p>
          <span className="text-sm text-green-600 flex items-center mt-2">
            <FaArrowUp className="mr-1" />
            {dashboardData.percentageIncreaseTotalRevenue} % Increase
          </span>
        </motion.div>

        {/* Active Users Card */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-600">Active Users</h2>
            <FaUser className="text-green-500 text-2xl" />
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-4">
            {dashboardData.activeUsers}
          </p>
          <span className="text-sm text-green-600 flex items-center mt-2">
            <FaArrowUp className="mr-1" />
            {dashboardData.percentageIncreaseActiveUsers} % Increase
          </span>
        </motion.div>

        {/* Monthly Revenue Card */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-600">
              Monthly Revenue
            </h2>
            <FaChartLine className="text-orange-500 text-2xl" />
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-4">
            ${dashboardData.monthlyRevenue}
          </p>
          <span className="text-sm text-green-600 flex items-center mt-2">
            <FaArrowUp className="mr-1" />
            {dashboardData.percentageIncreaseMonthlyRevenue} % Increase
          </span>
        </motion.div>

        {/* New Vendors Card */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-600">New Vendors</h2>
            <FaTags className="text-purple-500 text-2xl" />
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-4">
            {dashboardData.newVendors}
          </p>
          <span className="text-sm text-green-600 flex items-center mt-2">
            <FaArrowUp className="mr-1" />
            {dashboardData.percentageIncreaseNewVendors} % Increase
          </span>
        </motion.div>
      </div>

      {/* Top Products */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-800">Top Products</h2>
        <table className="w-full mt-4 text-sm text-left text-gray-600">
          <thead>
            <tr>
              <th className="py-2">Product</th>
              <th className="py-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.topProducts.map((product, index) => (
              <tr key={index} className="border-t">
                <td className="py-2">{product.productName}</td>
                <td className="py-2">${product.totalRevenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-blue-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-blue-700 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/admin/manage-users">
            <h3 className="text-lg font-bold">Manage Vendors</h3>
            <p className="text-sm">Approve, reject, or monitor vendors.</p>
          </Link>
          <FaUser className="text-4xl" />
        </motion.div>
        <motion.div
          className="bg-green-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-green-700 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/analytics">
            <h3 className="text-lg font-bold">View Analytics</h3>
            <p className="text-sm">Generate detailed reports and insights.</p>
          </Link>
          <FaChartLine className="text-4xl" />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
