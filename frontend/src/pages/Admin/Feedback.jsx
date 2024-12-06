import React, { useState } from "react";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaFilter,
  FaComments,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FeedbackModeration = () => {
  const [filter, setFilter] = useState("");
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      user: "John Doe",
      product: "Designer Jacket",
      status: "Pending",
      complaint: "Material was damaged upon delivery.",
    },
    {
      id: 2,
      user: "Jane Smith",
      product: "Leather Boots",
      status: "Resolved",
      complaint: "Size was too small.",
    },
    {
      id: 3,
      user: "Mark Lee",
      product: "Handmade Scarf",
      status: "Pending",
      complaint: "Color was different from what was shown.",
    },
  ]);

  const dataLineChart = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Complaints Over Time",
        data: [15, 30, 25, 40, 50, 60],
        fill: false,
        borderColor: "rgba(255,99,132,1)",
        tension: 0.1,
      },
    ],
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleResolveComplaint = (id) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id ? { ...complaint, status: "Resolved" } : complaint
      )
    );
  };

  const handleDeleteComplaint = (id) => {
    setComplaints(complaints.filter((complaint) => complaint.id !== id));
  };

  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;
  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Feedback Moderation & Complaint Resolution
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Manage product reviews and resolve issues raised by users or vendors.
        </p>
      </header>

      {/* Stats Section (KPIs Cards) */}
      <div className="flex flex-wrap justify-between gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-auto">
          <div className="flex items-center gap-4">
            <FaComments className="text-blue-500 text-4xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Total Complaints
              </h3>
              <p className="text-gray-600 text-3xl">{totalComplaints}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-auto">
          <div className="flex items-center gap-4">
            <FaExclamationTriangle className="text-yellow-500 text-4xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Pending Complaints
              </h3>
              <p className="text-gray-600 text-3xl">{pendingComplaints}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-auto">
          <div className="flex items-center gap-4">
            <FaCheckCircle className="text-green-500 text-4xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Resolved Complaints
              </h3>
              <p className="text-gray-600 text-3xl">{resolvedComplaints}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-md">
        <FaFilter className="text-gray-500" />
        <input
          type="text"
          placeholder="Filter by user or product"
          className="w-full md:w-auto px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>

      {/* Complaints Table */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-xl">
        <table className="min-w-full text-left table-auto">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-6 text-gray-800">User</th>
              <th className="py-3 px-6 text-gray-800">Product</th>
              <th className="py-3 px-6 text-gray-800">Complaint</th>
              <th className="py-3 px-6 text-gray-800">Status</th>
              <th className="py-3 px-6 text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints
              .filter(
                (complaint) =>
                  complaint.user.toLowerCase().includes(filter.toLowerCase()) ||
                  complaint.product.toLowerCase().includes(filter.toLowerCase())
              )
              .map((complaint) => (
                <tr key={complaint.id} className="border-b">
                  <td className="py-3 px-6 text-gray-600">{complaint.user}</td>
                  <td className="py-3 px-6 text-gray-600">
                    {complaint.product}
                  </td>
                  <td className="py-3 px-6 text-gray-600">
                    {complaint.complaint}
                  </td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        complaint.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    {complaint.status === "Pending" ? (
                      <button
                        onClick={() => handleResolveComplaint(complaint.id)}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mr-2"
                      >
                        Resolve
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeleteComplaint(complaint.id)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        <FaTimesCircle className="inline-block mr-2" />
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Graph Section */}
      <div className="bg-white p-6 rounded-lg shadow-xl mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Complaints Trend Over Time
        </h3>
        <Line data={dataLineChart} />
      </div>
    </div>
  );
};

export default FeedbackModeration;
