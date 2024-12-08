import React, { useState, useEffect } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axiosInstance from "../../Utils/axiosInstance";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axiosInstance.get("/vendor/analytics");
        setAnalyticsData(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (!analyticsData) return <div>Loading...</div>;

  const {
    totalRevenue,
    totalSales,
    categorySales,
    monthlySales, // Ensure the correct naming here
    avgRating,
    quarterlySales, // Ensure the correct naming here
  } = analyticsData;

  // Chart.js Data Configuration for Analytics Page
  const getLastSixMonths = () => {
    const months = [
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
    ];
    const today = new Date();
    let result = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      result.push(months[date.getMonth()]);
    }
    return result;
  };

  const salesLineData = {
    labels: getLastSixMonths(), // Last 6 months from today
    datasets: [
      {
        label: "Sales ($)",
        data: monthlySales.slice(-6), // Ensure this data exists in the response
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
      },
    ],
  };

  const revenueBarData = {
    labels: ["Q1", "Q2", "Q3", "Q4"], // Quarterly labels
    datasets: [
      {
        label: "Revenue ($)",
        data: quarterlySales, // Data from backend
        backgroundColor: [
          "rgba(34, 197, 94, 0.7)",
          "rgba(59, 130, 246, 0.7)",
          "rgba(236, 72, 153, 0.7)",
          "rgba(249, 115, 22, 0.7)",
        ],
      },
    ],
  };

  const categoryPieData = {
    labels: Object.keys(categorySales), // cateegorySales from backend
    datasets: [
      {
        data: Object.values(categorySales), // Category values from backend
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
        <h1 className="text-2xl font-semibold text-gray-800">Analytics</h1>
        <p className="text-sm text-gray-500">
          Explore insights and performance metrics
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-800">Total Revenue</h2>
          <p className="text-3xl font-bold text-green-600">${totalRevenue}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-800">Total Sales</h2>
          <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-800">
            Customer Reviews
          </h2>
          <p className="text-3xl font-bold text-pink-600">{avgRating}/5</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Line Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Monthly Sales Trends
          </h2>
          <Line data={salesLineData} />
        </div>

        {/* Revenue Bar Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Quarterly Revenue
          </h2>
          <Bar data={revenueBarData} />
        </div>

        {/* Category Pie Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Sales by Category
          </h2>
          <Pie data={categoryPieData} />
        </div>

        {/* Profit Analysis Line Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Profit Analysis
          </h2>
          <Line data={salesLineData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
