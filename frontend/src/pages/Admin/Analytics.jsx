import React from "react";
import {
  FaUsers,
  FaDollarSign,
  FaChartBar,
  FaBoxOpen,
  FaArrowUp,
} from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const AnalyticsPage = () => {
  // Sample data for charts
  const dataLineChart = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales Over Time",
        data: [30, 50, 45, 70, 90, 120],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const dataBarChart = {
    labels: ["Product A", "Product B", "Product C", "Product D", "Product E"],
    datasets: [
      {
        label: "Product Sales",
        data: [50, 100, 150, 200, 250],
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Overview of key metrics and performance data
        </p>
      </header>

      {/* Stats Section (KPIs Cards) */}
      <div className="flex flex-wrap justify-between gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-auto">
          <div className="flex items-center gap-4">
            <FaUsers className="text-blue-500 text-4xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Total Users
              </h3>
              <p className="text-gray-600 text-3xl">1,250</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-auto">
          <div className="flex items-center gap-4">
            <FaDollarSign className="text-green-500 text-4xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Revenue</h3>
              <p className="text-gray-600 text-3xl">$30,500</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-auto">
          <div className="flex items-center gap-4">
            <FaChartBar className="text-purple-500 text-4xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Product Sales
              </h3>
              <p className="text-gray-600 text-3xl">450</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-auto">
          <div className="flex items-center gap-4">
            <FaBoxOpen className="text-yellow-500 text-4xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Orders Processed
              </h3>
              <p className="text-gray-600 text-3xl">1,200</p>
            </div>
          </div>
        </div>
      </div>

      {/* Graphs Section (Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Sales Over Time
          </h3>
          <Line data={dataLineChart} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Product Sales Breakdown
          </h3>
          <Bar data={dataBarChart} />
        </div>
      </div>

      {/* Performance Stats Section */}
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Performance Overview
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-green-100 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FaArrowUp className="text-green-500 text-3xl" />
              <div>
                <p className="text-xl font-semibold text-gray-800">
                  Growth Rate
                </p>
                <p className="text-gray-600">+25% this month</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FaArrowUp className="text-yellow-500 text-3xl" />
              <div>
                <p className="text-xl font-semibold text-gray-800">
                  Active Users
                </p>
                <p className="text-gray-600">+150 this week</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-100 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FaArrowUp className="text-blue-500 text-3xl" />
              <div>
                <p className="text-xl font-semibold text-gray-800">
                  Sales Volume
                </p>
                <p className="text-gray-600">+10% this quarter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
