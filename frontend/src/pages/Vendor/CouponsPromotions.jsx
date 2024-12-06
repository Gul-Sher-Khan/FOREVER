import React, { useState } from "react";
import Modal from "react-modal";
import {
  FaTag,
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaCalendarAlt,
} from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";

// Modal configuration
Modal.setAppElement("#root");
const modalStyles = {
  content: {
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
    border: "none",
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
};

const CouponsPromotions = () => {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "SUMMER20",
      discount: "20%",
      description: "Summer Sale Discount",
      active: true,
      expiry: "2024-12-31",
    },
    {
      id: 2,
      code: "FREESHIP",
      discount: "Free Shipping",
      description: "Free shipping on all orders",
      active: false,
      expiry: "2024-11-30",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create"); // 'create' or 'edit'
  const [currentCoupon, setCurrentCoupon] = useState(null);

  // Open Modal
  const openModal = (type, coupon = null) => {
    setModalType(type);
    setCurrentCoupon(coupon);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCoupon(null);
  };

  // Handle Save
  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const couponData = {
      id: currentCoupon ? currentCoupon.id : Date.now(),
      code: formData.get("code"),
      discount: formData.get("discount"),
      description: formData.get("description"),
      expiry: formData.get("expiry"),
      active: formData.get("active") === "on",
    };

    if (modalType === "create") {
      setCoupons([...coupons, couponData]);
    } else {
      setCoupons(coupons.map((c) => (c.id === couponData.id ? couponData : c)));
    }

    closeModal();
  };

  // Delete Coupon
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      setCoupons(coupons.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Coupons & Promotions
        </h1>
        <p className="text-sm text-gray-500">
          Manage your discounts and promotional campaigns.
        </p>
      </header>

      {/* Actions */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => openModal("create")}
          className="flex items-center bg-blue-600 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-700"
        >
          <FaPlus className="mr-2" />
          Add New Promotion
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`relative bg-white shadow-lg rounded-lg p-6 border-l-4 ${
              coupon.active ? "border-green-500" : "border-gray-300"
            }`}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaTag className="mr-2 text-gray-500" />
                {coupon.code}
              </h2>
              <div
                className={`text-sm font-medium ${
                  coupon.active ? "text-green-500" : "text-gray-400"
                }`}
              >
                {coupon.active ? (
                  <FiCheckCircle className="inline mr-1" />
                ) : (
                  <BsClockHistory className="inline mr-1" />
                )}
                {coupon.active ? "Active" : "Inactive"}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{coupon.description}</p>
            <p className="text-lg font-bold text-blue-600 mt-4">
              {coupon.discount}
            </p>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <FaCalendarAlt className="mr-2" />
              Expires: {coupon.expiry}
            </p>
            {/* Action Buttons */}
            <div className="flex justify-end mt-4 gap-3">
              <button
                onClick={() => openModal("edit", coupon)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit className="text-lg" />
              </button>
              <button
                onClick={() => handleDelete(coupon.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <h2 className="text-2xl font-bold mb-4">
          {modalType === "create" ? "Create New Promotion" : "Edit Promotion"}
        </h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Code
            </label>
            <input
              type="text"
              name="code"
              defaultValue={currentCoupon?.code || ""}
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Discount
            </label>
            <input
              type="text"
              name="discount"
              defaultValue={currentCoupon?.discount || ""}
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={currentCoupon?.description || ""}
              className="w-full border border-gray-300 rounded-lg p-3"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiry"
              defaultValue={currentCoupon?.expiry || ""}
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3">
            <input
              type="checkbox"
              name="active"
              defaultChecked={currentCoupon?.active || false}
              className="h-5 w-5"
            />
            <label className="text-sm text-gray-700">Active Promotion</label>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CouponsPromotions;
