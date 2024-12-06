import React, { useState } from "react";

const ManageInventory = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product A",
      category: "Clothing",
      price: 50,
      stock: 20,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product B",
      category: "Electronics",
      price: 200,
      stock: 10,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Product C",
      category: "Groceries",
      price: 15,
      stock: 50,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Product D",
      category: "Accessories",
      price: 75,
      stock: 5,
      image: "https://via.placeholder.com/150",
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateStock = (id, newStock) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, stock: newStock } : product
      )
    );
    closeModal();
  };

  const handleDeleteProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
    closeModal();
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
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover"
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

              {/* Action Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => openModal(product)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Manage {selectedProduct.name}
            </h2>
            <div>
              <p className="text-sm text-gray-500">Update Stock:</p>
              <input
                type="number"
                defaultValue={selectedProduct.stock}
                className="w-full border border-gray-300 rounded-lg p-2 mt-2 focus:ring focus:ring-blue-500 focus:outline-none"
                onChange={(e) =>
                  handleUpdateStock(
                    selectedProduct.id,
                    parseInt(e.target.value)
                  )
                }
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => handleDeleteProduct(selectedProduct.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete Product
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageInventory;
