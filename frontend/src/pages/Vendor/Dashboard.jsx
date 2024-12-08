import React, { useEffect, useState } from "react";
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
import axiosInstance from "../../Utils/axiosInstance";

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
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Fetch dashboard data from backend
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get("/vendor/dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) return <div>Loading...</div>;

  const barData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Sales",
        data: dashboardData.monthlySales, // Use the monthlySales array from backend
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(dashboardData.categorySales),
    datasets: [
      {
        data: Object.values(dashboardData.categorySales),
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
          <p className="text-3xl font-bold text-blue-600">
            ${dashboardData.totalSales}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-800">Total Orders</h2>
          <p className="text-3xl font-bold text-green-600">
            {dashboardData.totalOrders}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-800">
            Customer Reviews
          </h2>
          <p className="text-3xl font-bold text-pink-600">
            {dashboardData.avgRating}/5
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Bar Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Monthly Sales
          </h2>
          {dashboardData.monthlySales &&
          dashboardData.monthlySales.some((sale) => sale > 0) ? (
            <Bar data={barData} />
          ) : (
            <p className="text-gray-500 text-center">No Sales Yet</p>
          )}
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Sales by Category
          </h2>
          {Object.values(dashboardData.categorySales).some(
            (sales) => sales > 0
          ) ? (
            <Doughnut data={doughnutData} />
          ) : (
            <p className="text-gray-500 text-center">No Sales Yet</p>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Top Products</h2>
        {dashboardData.topProducts && dashboardData.topProducts.length > 0 ? (
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
                {dashboardData.topProducts.map((row) => (
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
        ) : (
          <p className="text-gray-500 text-center">No Top Products</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
  