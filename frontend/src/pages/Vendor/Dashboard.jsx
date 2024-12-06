import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1900, 3000, 5000, 2000, 3000],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ["Clothing", "Electronics", "Groceries", "Others"],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: [
          "rgba(34, 197, 94, 0.7)",
          "rgba(59, 130, 246, 0.7)",
          "rgba(236, 72, 153, 0.7)",
          "rgba(249, 115, 22, 0.7)",
        ],
        hoverBackgroundColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(249, 115, 22, 1)",
        ],
      },
    ],
  };

  const tableData = [
    { id: 1, name: "Product A", category: "Clothing", sales: 300 },
    { id: 2, name: "Product B", category: "Electronics", sales: 450 },
    { id: 3, name: "Product C", category: "Groceries", sales: 200 },
    { id: 4, name: "Product D", category: "Others", sales: 150 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of your store's performance
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Cards */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-800">Total Sales</h2>
          <p className="text-3xl font-bold text-blue-600">$25,000</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-800">Total Orders</h2>
          <p className="text-3xl font-bold text-green-600">1,200</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-800">
            Customer Reviews
          </h2>
          <p className="text-3xl font-bold text-pink-600">4.8/5</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Bar Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Monthly Sales
          </h2>
          <Bar data={barData} />
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Sales by Category
          </h2>
          <Doughnut data={doughnutData} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Top Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product Name</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-center">Sales</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {tableData.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{row.name}</td>
                  <td className="py-3 px-6 text-left">{row.category}</td>
                  <td className="py-3 px-6 text-center">{row.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;