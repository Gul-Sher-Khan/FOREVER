import React, { useState, useEffect } from "react";
import axiosInstance from "../../Utils/axiosInstance";

const ManageInventory = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch the products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/vendor/products", {});
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdateStock = async (id, newStock) => {
    try {
      await axiosInstance.put(`/vendor/products/${id}/stock`, {
        stock: newStock,
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? { ...product, stock: newStock } : product
        )
      );
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axiosInstance.delete(`/vendor/products/${id}`);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Manage Inventory
        </h1>
        <p className="text-sm text-gray-500">
          Overview and management of your products
        </p>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-800">Total Products</h2>
          <p className="text-3xl font-bold text-blue-600">{products.length}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-800">Low Stock</h2>
          <p className="text-3xl font-bold text-red-600">
            {products.filter((product) => product.stock < 10).length}
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-800">Out of Stock</h2>
          <p className="text-3xl font-bold text-yellow-600">
            {products.filter((product) => product.stock === 0).length}
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover object-top"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-lg font-bold text-blue-600">
                ${product.price}
              </p>
              <p
                className={`mt-2 text-sm font-medium ${
                  product.stock === 0
                    ? "text-red-600"
                    : product.stock < 10
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {product.stock === 0
                  ? "Out of Stock"
                  : `Stock: ${product.stock}`}
              </p>
              <button
                onClick={() => openModal(product)}
                className="mt-4 py-2 px-4 bg-blue-600 text-white text-sm font-semibold rounded-lg"
              >
                Edit Stock
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Stock for {selectedProduct.name}
            </h2>
            <input
              type="number"
              value={selectedProduct.stock}
              onChange={(e) =>
                setSelectedProduct((prev) => ({
                  ...prev,
                  stock: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleUpdateStock(selectedProduct._id, selectedProduct.stock)
                }
                className="py-2 px-4 bg-blue-600 text-white rounded-lg"
              >
                Update Stock
              </button>
              <button
                onClick={() => handleDeleteProduct(selectedProduct._id)}
                className="py-2 px-4 bg-red-600 text-white rounded-lg"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageInventory;
