import { useState } from "react";
import authService from "../../Utils/authService";

const VendorRegistration = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    storeName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authService.signup({
      name: formData.name,
      email: formData.email,
      pass: formData.password,
      storeName: formData.storeName,
      role: "vendor",
    });
    setFormData({ name: "", email: "", password: "", storeName: "" });
  };

  return (
    <div className="p-6 sm:p-10 border-t bg-white rounded-lg shadow-md">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
        Vendor Registration
      </h1>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-sm text-gray-600 mb-1">Store Name</label>
          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2"
            placeholder="Enter your store name"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2"
            placeholder="Create a strong password"
            required
          />
        </div>

        <div className="sm:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorRegistration;
