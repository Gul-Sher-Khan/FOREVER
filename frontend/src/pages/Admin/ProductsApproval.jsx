import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../Utils/axiosInstance";

const ProductsApproval = () => {
  const [vendors, setVendors] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [products, setProducts] = useState([]);

  // Fetch vendors and stores
  useEffect(() => {
    const fetchVendorsAndStores = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/vendors-and-stores");
        setVendors(data.vendors);
        setStores(data.stores);
      } catch (error) {
        console.error("Error fetching vendors and stores:", error);
      }
    };

    fetchVendorsAndStores();
  }, []);

  // Fetch products for selected store
  useEffect(() => {
    if (!selectedStore) return;

    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/admin/products/${selectedStore}`
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedStore]);

  // Delete product
  const handleDeleteProduct = async (productId) => {
    try {
      await axiosInstance.delete(`/admin/product/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Vendor Management
        </h1>
        <p className="text-gray-700 mt-2">
          Manage vendors, stores, and their products efficiently.
        </p>
      </header>

      {/* Store Selector */}
      <div className="mb-8 bg-white shadow rounded-lg p-6">
        <label
          htmlFor="storeSelect"
          className="block text-lg font-semibold text-gray-700 mb-3"
        >
          Select a Store
        </label>
        <select
          id="storeSelect"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
        >
          <option value="">-- Choose a Store --</option>
          {stores.map((store) => (
            <option key={store._id} value={store._id}>
              {store.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Products</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <motion.div
                key={product._id}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-1">
                  <strong>Price:</strong> ${product.price.toFixed(2)}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong>Stock:</strong> {product.stock}
                </p>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products found for this store.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsApproval;
