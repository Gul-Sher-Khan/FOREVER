import React, { useState } from "react";
import {
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaIndustry,
} from "react-icons/fa";
import { motion } from "framer-motion";

const UserVendorManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      type: "User",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      type: "Vendor",
      status: "Pending",
    },
    {
      id: 3,
      name: "Michael Lee",
      email: "michael@example.com",
      type: "User",
      status: "Blocked",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      type: "Vendor",
      status: "Active",
    },
  ];

  const handleAction = (user) => {
    setModalData(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          User & Vendor Management
        </h1>
        <p className="text-gray-600">
          Approve and oversee vendor accounts, monitor user activity, and handle
          disputes.
        </p>
      </header>

      {/* User Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Manage Users & Vendors
        </h2>
        <table className="w-full text-sm text-left text-gray-600">
          <thead>
            <tr className="border-b">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Type</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2 flex items-center gap-2">
                  {user.type === "Vendor" ? (
                    <FaIndustry className="text-purple-500" />
                  ) : (
                    <FaUser className="text-blue-500" />
                  )}
                  {user.type}
                </td>
                <td className="py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : user.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-2 flex gap-2">
                  <button
                    onClick={() => handleAction(user)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Modal */}
      {showModal && modalData && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800">Manage User</h2>
            <p className="text-gray-600 mb-4">{modalData.name}</p>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Email:</span>
                <span>{modalData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Type:</span>
                <span>{modalData.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <select
                  defaultValue={modalData.status}
                  className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring focus:ring-blue-200"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserVendorManagement;
