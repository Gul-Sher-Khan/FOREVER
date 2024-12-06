import React, { useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "John Doe",
      customerAddress: "123 Main St, Springfield",
      email: "johndoe@example.com",
      products: [
        { name: "Product A", quantity: 2, price: 20 },
        { name: "Product B", quantity: 1, price: 50 },
      ],
      status: "Pending",
      total: 90,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      customerAddress: "456 Elm St, Shelbyville",
      email: "janesmith@example.com",
      products: [
        { name: "Product C", quantity: 3, price: 15 },
        { name: "Product D", quantity: 1, price: 100 },
      ],
      status: "Pending",
      total: 145,
    },
  ]);

  const handleStatusChange = (id, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: status } : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
        <p className="text-sm text-gray-500">
          Manage and review customer orders
        </p>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-800">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-800">Pending Orders</h2>
          <p className="text-3xl font-bold text-yellow-600">
            {orders.filter((order) => order.status === "Pending").length}
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-800">
            Completed Orders
          </h2>
          <p className="text-3xl font-bold text-green-600">
            {orders.filter((order) => order.status === "Delivered").length}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Order List</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-center">Products</th>
              <th className="py-3 px-6 text-center">Total</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="py-3 px-6">
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-sm text-gray-500">{order.email}</p>
                </td>
                <td className="py-3 px-6">
                  <p>{order.customerAddress}</p>
                </td>
                <td className="py-3 px-6">
                  <ul>
                    {order.products.map((product, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{product.name}</span>
                        <span>
                          {product.quantity} x ${product.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-3 px-6 text-center">${order.total}</td>
                <td className="py-3 px-6 text-center">
                  <span
                    className={`px-4 py-1 rounded-full text-sm ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  {order.status === "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusChange(order.id, "Delivered")
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(order.id, "Cancelled")
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm ml-2 hover:bg-red-600 transition"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {order.status !== "Pending" && (
                    <span className="text-gray-500 text-sm">No Actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
