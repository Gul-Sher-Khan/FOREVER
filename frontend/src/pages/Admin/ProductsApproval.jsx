import React, { useState } from "react";
import { FaCheckCircle, FaTrash, FaFilter, FaBox } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductApproval = () => {
  const [selectedVendor, setSelectedVendor] = useState("");
  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState([]);

  const vendors = ["Elite Fashion", "Urban Styles", "Trend Hub"];
  const sampleProducts = [
    {
      id: 1,
      name: "Designer Jacket",
      price: 120,
      status: "Pending",
      category: "Clothing",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Leather Boots",
      price: 95,
      status: "Approved",
      category: "Footwear",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Handmade Scarf",
      price: 45,
      status: "Pending",
      category: "Accessories",
      image: "https://via.placeholder.com/150",
    },
  ];

  const retrieveProducts = () => {
    // Simulate product retrieval
    setProducts(sampleProducts);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <header className="mb-6 text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-800">Product Approval</h1>
        <p className="text-gray-600 mt-2">
          Approve or remove products uploaded by vendors.
        </p>
      </header>

      {/* Vendor Selection */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <select
          className="w-full md:w-auto px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.target.value)}
        >
          <option value="">Select a Vendor</option>
          {vendors.map((vendor, index) => (
            <option key={index} value={vendor}>
              {vendor}
            </option>
          ))}
        </select>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
          onClick={retrieveProducts}
        >
          Retrieve Products
        </button>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-lg">
        <FaFilter className="text-gray-500" />
        <input
          type="text"
          placeholder="Filter by name or category"
          className="w-full md:w-auto px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products
          .filter((product) =>
            product.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((product) => (
            <motion.div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-lg relative overflow-hidden hover:shadow-xl transition"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-1">${product.price}</p>
                <span
                  className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    product.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {product.status}
                </span>
              </div>
              <div className="flex justify-between mt-4">
                <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  <FaCheckCircle className="inline-block mr-2" />
                  Approve
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <FaTrash className="inline-block mr-2" />
                  Delete
                </button>
              </div>
              <div className="absolute -top-10 -right-10 bg-blue-100 w-24 h-24 rounded-full transform rotate-45 z-0"></div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default ProductApproval;
