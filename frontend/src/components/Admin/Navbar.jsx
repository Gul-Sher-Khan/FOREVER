import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBoxOpen,
  FaChartLine,
  FaTags,
  FaEnvelope,
  FaThList,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const menuItems = [
  { name: "Dashboard", icon: FaHome, path: "/admin/" },
  { name: "Users & Vendors", icon: FaUsers, path: "/admin/manage-users" },
  {
    name: "Product Approvals",
    icon: FaBoxOpen,
    path: "/admin/product-approvals",
  },
  { name: "Analytics", icon: FaChartLine, path: "/admin/analytics" },
  { name: "Feedback", icon: FaEnvelope, path: "/admin/feedback" },
];

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-lg font-semibold text-gray-800">
              Admin Panel
            </Link>
          </div>

          {/* Menu Toggle (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Menu Items */}
          <div
            className={`absolute md:static top-16 left-0 right-0 bg-white sm:flex sm:items-center sm:space-x-6 shadow-md sm:shadow-none ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col sm:flex-row">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-3 sm:py-2 sm:px-4 text-sm rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? "bg-gray-100 text-gray-800 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMenuOpen(false)} // Close menu on item click (mobile)
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  className="flex items-center gap-2 px-4 py-3 sm:py-2 sm:px-4 text-sm rounded-lg transition-colors text-gray-600 hover:bg-gray-100"
                  onClick={() => {
                    authService.logout();
                    navigate("/login");
                  }}
                >
                  <FaHome className="w-4 h-4" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
