const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const Store = require("../models/Store");
const mongoose = require("mongoose");

// Get Admin Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    const adminId = req.user._id; // Get admin ID from authenticated user

    // Total Revenue from Completed Orders
    const totalRevenue = await Order.aggregate([
      { $match: { status: "Delivered" } }, // Only completed orders
      {
        $unwind: "$products", // Flatten products array to calculate each product revenue
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" }, // Unwind to access product details
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $multiply: ["$products.quantity", "$productDetails.price"],
            },
          }, // Calculate total revenue
        },
      },
    ]);

    // Monthly Revenue from Completed Orders (Last 30 days)
    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          },
        },
      },
      {
        $unwind: "$products", // Flatten products array
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" }, // Unwind to access product details
      {
        $group: {
          _id: null,
          monthlyRevenue: {
            $sum: {
              $multiply: ["$products.quantity", "$productDetails.price"],
            },
          }, // Calculate monthly revenue
        },
      },
    ]);

    // Active Users
    const activeUsers = await User.countDocuments({ role: "user" });

    // Active Users from Previous Month
    const activeUsersPreviousMonth = await User.countDocuments({
      role: "user",
      createdAt: {
        $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    });

    // New Vendors (stores)
    const newVendors = await Store.countDocuments({
      owner: { $in: await User.find({ role: "vendor" }).select("_id") },
    });

    // New Vendors from Previous Month
    const newVendorsPreviousMonth = await Store.countDocuments({
      owner: { $in: await User.find({ role: "vendor" }).select("_id") },
      createdAt: {
        $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    });

    // Calculate Percentage Increase for Total Revenue
    const percentageIncreaseTotalRevenue =
      totalRevenue[0]?.totalRevenue && monthlyRevenue[0]?.monthlyRevenue
        ? ((totalRevenue[0].totalRevenue - monthlyRevenue[0].monthlyRevenue) /
            monthlyRevenue[0].monthlyRevenue) *
          100
        : 0;

    // Calculate Percentage Increase for Active Users
    const percentageIncreaseActiveUsers =
      activeUsers && activeUsersPreviousMonth
        ? ((activeUsers - activeUsersPreviousMonth) /
            activeUsersPreviousMonth) *
          100
        : 0;

    // Calculate Percentage Increase for New Vendors
    const percentageIncreaseNewVendors =
      newVendors && newVendorsPreviousMonth
        ? ((newVendors - newVendorsPreviousMonth) / newVendorsPreviousMonth) *
          100
        : 0;

    // Calculate Percentage Increase for Monthly Revenue
    const percentageIncreaseMonthlyRevenue =
      totalRevenue[0]?.totalRevenue && monthlyRevenue[0]?.monthlyRevenue
        ? ((totalRevenue[0].totalRevenue - monthlyRevenue[0].monthlyRevenue) /
            monthlyRevenue[0].monthlyRevenue) *
          100
        : 0;

    // Top Products by Revenue
    const topProducts = await Order.aggregate([
      { $match: { status: "Delivered" } },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$products.productId",
          productName: { $first: "$productDetails.name" },
          totalRevenue: {
            $sum: {
              $multiply: ["$products.quantity", "$productDetails.price"],
            },
          },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 3 },
    ]);

    res.status(200).json({
      totalRevenue: totalRevenue[0]?.totalRevenue || 0,
      monthlyRevenue: monthlyRevenue[0]?.monthlyRevenue || 0,
      percentageIncreaseTotalRevenue: percentageIncreaseTotalRevenue.toFixed(2),
      percentageIncreaseActiveUsers: percentageIncreaseActiveUsers.toFixed(2),
      percentageIncreaseNewVendors: percentageIncreaseNewVendors.toFixed(2),
      percentageIncreaseMonthlyRevenue:
        percentageIncreaseMonthlyRevenue.toFixed(2),
      activeUsers,
      newVendors,
      topProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch all users and vendors
exports.getUsersAndVendors = async (req, res) => {
  try {
    const users = await User.find(
      { role: { $ne: "admin" } },
      "name email role createdAt"
    ); // Exclude users with admin role
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch users." });
  }
};

// Update user/vendor details (e.g., role)
exports.updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update user." });
  }
};

// Delete user/vendor
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to delete user." });
  }
};

// Get all vendors and their stores
exports.getVendorsAndStores = async (req, res) => {
  try {
    // Fetch all users with role 'vendor'
    const vendors = await User.find({ role: "vendor" }).select("id name email");

    // Fetch stores for these vendors
    const vendorIds = vendors.map((vendor) => vendor._id);
    const stores = await Store.find({ owner: { $in: vendorIds } }).select(
      "id name owner"
    );

    res.json({ vendors, stores });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching vendors and stores" });
  }
};

// Get products for a specific store
exports.getProductsByStore = async (req, res) => {
  const { storeId } = req.params;

  try {
    const products = await Product.find({ store: storeId }).select(
      "id name price stock image"
    );
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching products" });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting product" });
  }
};

exports.getAdminAnalytics = async (req, res) => {
  try {
    // Total Users
    const totalUsers = await User.countDocuments();

    // Total Revenue (Delivered orders)
    const totalRevenue = await Order.aggregate([
      { $match: { status: "Delivered" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    // Total Product Sales (Sold products from delivered orders)
    const totalProductSales = await Order.aggregate([
      { $match: { status: "Delivered" } },
      { $unwind: "$products" },
      { $group: { _id: "$products", totalSold: { $sum: 1 } } },
    ]);

    // Total Orders Processed (Completed orders count)
    const totalOrdersProcessed = await Order.countDocuments({
      status: "Delivered",
    });

    const productSalesBreakdown = await Order.aggregate([
      { $match: { status: "Delivered" } }, // Match only delivered orders
      { $unwind: "$products" }, // Unwind the products array to process each product individually
      {
        $lookup: {
          from: "products", // Join with the products collection
          localField: "products.productId", // Field in the orders that refers to the product
          foreignField: "_id", // Reference field in the Product collection
          as: "productDetails", // Name of the new field containing product details
        },
      },
      { $unwind: "$productDetails" }, // Unwind the productDetails array to access individual product details
      {
        $group: {
          _id: "$productDetails.category", // Group by product category
          totalSales: { $sum: "$products.quantity" }, // Sum the quantity of each product sold
        },
      },
      { $sort: { totalSales: -1 } }, // Sort by total sales (descending)
    ]);

    // If the breakdown is still empty, add a fallback message or log to debug
    if (productSalesBreakdown.length === 0) {
      console.log("No product sales breakdown data found.");
    }

    // Sales Over Time (Using the `Order` model to get daily sales data)
    const salesOverTime = await Order.aggregate([
      { $match: { status: "Delivered" } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: "$total" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Growth Rate: Calculate growth of users in the last month
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) }, // Last 30 days
    });

    const growthRate = ((totalUsers - lastMonthUsers) / lastMonthUsers) * 100;

    // Active Users: Users who have placed an order in the last 30 days
    const activeUsers = await Order.distinct("user", {
      status: "Delivered",
      createdAt: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) },
    });

    // Sales Volume: Calculate the total sales of products in the last quarter
    const lastQuarterSales = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
          createdAt: { $gte: new Date(new Date() - 90 * 24 * 60 * 60 * 1000) },
        },
      },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    res.json({
      totalUsers,
      totalRevenue: totalRevenue[0] ? totalRevenue[0].total : 0,
      totalProductSales: totalProductSales.length, // We are counting the unique products sold in delivered orders
      totalOrdersProcessed,
      productSalesBreakdown,
      salesOverTime, // For graph
      growthRate,
      activeUsers: activeUsers.length,
      salesVolume: lastQuarterSales[0] ? lastQuarterSales[0].total : 0,
    });
  } catch (error) {
    console.error("Error calculating analytics:", error);
    res.status(500).send("Server Error");
  }
};
