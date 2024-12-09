import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaUser, FaIndustry } from "react-icons/fa";
import { motion } from "framer-motion";
import axiosInstance from "../../Utils/axiosInstance";

const UserVendorManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Fetch users and vendors from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/admin/users");
        setUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAction = (user) => {
    setModalData(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  const handleSaveChanges = async () => {
    if (!modalData) return;

    try {
      await axiosInstance.put(`/admin/users/${modalData.id}`, modalData);
      setUsers((prev) =>
        prev.map((user) => (user.id === modalData.id ? modalData : user))
      );
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Failed to update user.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          User & Vendor Management
        </h1>
      </header>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Manage Users & Vendors
        </h2>
        <table className="w-full text-sm text-left text-gray-600">
          <thead>
            <tr className="border-b">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2 flex items-center gap-2">
                  {user.role === "vendor" ? (
                    <FaIndustry className="text-purple-500" />
                  ) : (
                    <FaUser className="text-blue-500" />
                  )}
                  {user.role}
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleAction(user)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && modalData && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800">Manage User</h2>

            <div className="space-y-4">
              <input
                value={modalData.name}
                onChange={(e) =>
                  setModalData({ ...modalData, name: e.target.value })
                }
              />
              {/* Similar inputs for email and role */}
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button onClick={closeModal}>Cancel</button>
              <button onClick={handleSaveChanges}>Save</button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserVendorManagement;
