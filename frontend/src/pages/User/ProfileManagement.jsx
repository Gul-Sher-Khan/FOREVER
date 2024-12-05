import { useState } from "react";

const ProfileManagement = () => {
  const [profile, setProfile] = useState({
    personalDetails: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
    },
    addresses: [
      "123 Main St, Springfield, USA",
      "456 Elm St, Shelbyville, USA",
    ],
    paymentPreferences: ["Visa **** 1234", "PayPal john.doe@example.com"],
  });

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      personalDetails: { ...profile.personalDetails, [name]: value },
    });
  };

  const addNewAddress = (newAddress) => {
    if (newAddress) {
      setProfile({
        ...profile,
        addresses: [...profile.addresses, newAddress],
      });
    }
  };

  const removeAddress = (index) => {
    setProfile({
      ...profile,
      addresses: profile.addresses.filter((_, i) => i !== index),
    });
  };

  const addNewPaymentMethod = (newPayment) => {
    if (newPayment) {
      setProfile({
        ...profile,
        paymentPreferences: [...profile.paymentPreferences, newPayment],
      });
    }
  };

  const removePaymentMethod = (index) => {
    setProfile({
      ...profile,
      paymentPreferences: profile.paymentPreferences.filter(
        (_, i) => i !== index
      ),
    });
  };

  return (
    <div className="p-6 sm:p-10 border-t bg-gray-50">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Profile Management
      </h1>

      {/* Personal Details */}
      <section className="mb-10">
        <h2 className="text-2xl font-medium text-gray-700 mb-6">
          Personal Details
        </h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={profile.personalDetails.name}
              onChange={handleDetailChange}
              className="w-full border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={profile.personalDetails.email}
              onChange={handleDetailChange}
              className="w-full border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.personalDetails.phone}
              onChange={handleDetailChange}
              className="w-full border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
        </form>
      </section>

      {/* Saved Addresses */}
      <section className="mb-10">
        <h2 className="text-2xl font-medium text-gray-700 mb-6">
          Saved Addresses
        </h2>
        <ul className="space-y-4">
          {profile.addresses.map((address, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm"
            >
              <p className="text-sm text-gray-700">{address}</p>
              <button
                onClick={() => removeAddress(index)}
                className="text-red-500 text-xs hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Add new address"
            className="w-full sm:w-auto border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50 mb-2 sm:mb-0 sm:mr-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addNewAddress(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
      </section>

      {/* Payment Preferences */}
      <section>
        <h2 className="text-2xl font-medium text-gray-700 mb-6">
          Payment Preferences
        </h2>
        <ul className="space-y-4">
          {profile.paymentPreferences.map((payment, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm"
            >
              <p className="text-sm text-gray-700">{payment}</p>
              <button
                onClick={() => removePaymentMethod(index)}
                className="text-red-500 text-xs hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Add new payment method"
            className="w-full sm:w-auto border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50 mb-2 sm:mb-0 sm:mr-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addNewPaymentMethod(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default ProfileManagement;
