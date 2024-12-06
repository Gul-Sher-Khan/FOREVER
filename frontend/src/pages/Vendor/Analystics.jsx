import React from "react";
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
import { Line, Bar, Pie } from "react-chartjs-2";

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
  // Sample Data for Charts
  const salesLineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales ($)",
        data: [1200, 1500, 1800, 2200, 2500, 3000],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
      },
    ],
  };

  const revenueBarData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [8000, 12000, 15000, 20000],
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
    labels: ["Clothing", "Electronics", "Groceries", "Accessories"],
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
          <p className="text-3xl font-bold text-green-600">$72,000</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-800">Total Sales</h2>
          <p className="text-3xl font-bold text-blue-600">1,800</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-800">
            Customer Reviews
          </h2>
          <p className="text-3xl font-bold text-pink-600">4.9/5</p>
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

        {/* Additional Chart (e.g., Profit Analysis) */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Profit Analysis
          </h2>
          <Line
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  label: "Profit ($)",
                  data: [300, 500, 700, 1000, 1200, 1500],
                  borderColor: "rgba(236, 72, 153, 1)",
                  backgroundColor: "rgba(236, 72, 153, 0.5)",
                  tension: 0.4,
                  pointRadius: 5,
                  pointBackgroundColor: "rgba(236, 72, 153, 1)",
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
