import React from "react";
import {
  FaShoppingCart,
  FaUser,
  FaChartLine,
  FaTags,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Dashboard = () => {
  const topProducts = [
    { name: "Wireless Earbuds", sales: 120, revenue: "$3,000" },
    { name: "Smart Watch", sales: 98, revenue: "$2,200" },
    { name: "Gaming Mouse", sales: 76, revenue: "$1,500" },
  ];

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
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-600">Total Sales</h2>
            <FaShoppingCart className="text-blue-500 text-2xl" />
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-4">$45,800</p>
          <span className="text-sm text-green-600 flex items-center mt-2">
            <FaArrowUp className="mr-1" />
            12% Increase
          </span>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-600">Active Users</h2>
            <FaUser className="text-green-500 text-2xl" />
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-4">1,200</p>
          <span className="text-sm text-red-600 flex items-center mt-2">
            <FaArrowDown className="mr-1" />
            5% Decrease
          </span>
        </motion.div>

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
          <p className="text-3xl font-bold text-gray-800 mt-4">$12,300</p>
          <span className="text-sm text-green-600 flex items-center mt-2">
            <FaArrowUp className="mr-1" />
            8% Increase
          </span>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-600">New Vendors</h2>
            <FaTags className="text-purple-500 text-2xl" />
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-4">25</p>
          <span className="text-sm text-green-600 flex items-center mt-2">
            <FaArrowUp className="mr-1" />
            15% Increase
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
              <th className="py-2">Sales</th>
              <th className="py-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product, index) => (
              <tr key={index} className="border-t">
                <td className="py-2">{product.name}</td>
                <td className="py-2">{product.sales}</td>
                <td className="py-2">{product.revenue}</td>
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
          <div>
            <h3 className="text-lg font-bold">Manage Vendors</h3>
            <p className="text-sm">Approve, reject, or monitor vendors.</p>
          </div>
          <FaUser className="text-4xl" />
        </motion.div>
        <motion.div
          className="bg-green-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-green-700 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <div>
            <h3 className="text-lg font-bold">View Analytics</h3>
            <p className="text-sm">Generate detailed reports and insights.</p>
          </div>
          <FaChartLine className="text-4xl" />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
