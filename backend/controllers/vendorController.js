const Order = require("../models/Order");
const Store = require("../models/Store");
const Review = require("../models/Review");
const moment = require("moment");
const Product = require("../models/Product");
const mongoose = require("mongoose");

// Get Vendor Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get the store owned by the user (vendor)
    const store = await Store.findOne({ owner: userId });

    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }

    // Get orders where the storeId matches the store owned by the user
    const orders = await Order.find({
      "products.storeId": store._id, // Match storeId in products array
    }).populate("products.productId"); // Correctly populate 'productId' field

    // If no orders found for the store
    if (orders.length === 0) {
      return res.status(200).json({
        message: "No orders found for your store.",
        dashboardData: {
          totalSales: 0,
          totalOrders: 0,
          avgRating: 0,
          categorySales: {},
          topProducts: [],
          monthlySales: Array(12).fill(0),
        },
      });
    }

    // Calculate total sales (sum of all order amounts)
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

    // Get total number of orders
    const totalOrders = orders.length;

    // Get average customer review rating for products in the store
    const reviews = await Review.find({ product: { $in: store.products } });
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        : 0;

    // Get sales by category from orders (category per product in the order)
    const categorySales = {};
    orders.forEach((order) => {
      order.products.forEach((productItem) => {
        const product = productItem.productId;
        if (product.store.toString() === store._id.toString()) {
          const category = product.category;
          const salesAmount = productItem.quantity * product.price;

          if (!categorySales[category]) {
            categorySales[category] = 0;
          }
          categorySales[category] += salesAmount;
        }
      });
    });

    // Get top products based on quantity sold (from orders)
    const productSales = {};
    orders.forEach((order) => {
      order.products.forEach((productItem) => {
        const product = productItem.productId;
        if (product.store.toString() === store._id.toString()) {
          if (!productSales[product._id]) {
            productSales[product._id] = {
              name: product.name,
              category: product.category,
              sales: 0,
            };
          }
          productSales[product._id].sales +=
            productItem.quantity * product.price;
        }
      });
    });

    // Sort products by total sales and pick the top 5
    const sortedProducts = Object.values(productSales)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    // Calculate monthly sales data
    const monthlySales = Array(12).fill(0); // Initialize array for 12 months (January to December)

    orders.forEach((order) => {
      const orderMonth = moment(order.createdAt).month(); // Get month (0-11)
      monthlySales[orderMonth] += order.total; // Add sales to the corresponding month
    });

    // Prepare the data to send to the frontend
    const dashboardData = {
      totalSales,
      totalOrders,
      avgRating,
      categorySales,
      topProducts: sortedProducts,
      monthlySales, // Array with monthly sales data
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching dashboard data." });
  }
};

// Get Vendor Dashboard Data
exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get the store owned by the user (vendor)
    const store = await Store.findOne({ owner: userId });

    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }

    // Fetch orders for the store, populate product and user details
    const orders = await Order.find({
      "products.storeId": store._id, // Match storeId in products array
    })
      .populate("products.productId") // Populate the 'productId' field in products
      .populate("user"); // Populate the 'user' field

    // Return the orders for the vendor
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders." });
  }
};

// Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body; // Expecting orderId and status in the body

    // Validate status
    if (!["Pending", "Shipped", "Delivered", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    // Update order status
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order status." });
  }
};

// Create a product for the vendor's store
exports.createProduct = async (req, res) => {
  try {
    const vendorId = req.user._id;

    // Find the vendor's store
    const store = await Store.findOne({ owner: vendorId });
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      subcategory: req.body.subcategory,
      image: req.body.image,
      stock: req.body.stock,
      sizes: req.body.sizes,
      store: store._id, // Associate product with vendor's store
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update the stock of a product
exports.updateProductStock = async (req, res) => {
  try {
    const productId = req.params.productId;
    const vendorId = req.user._id;
    const newStock = req.body.stock;

    const product = await Product.findOne({
      _id: productId,
    });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found or unauthorized" });
    }

    product.stock = newStock;
    await product.save();

    return res
      .status(200)
      .json({ message: "Stock updated successfully", product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const vendorId = req.user._id;

    const product = await Product.findOne({
      _id: productId,
      store: { $in: [vendorId] },
    });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found or unauthorized" });
    }

    await Product.deleteOne({ _id: productId });
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all products for a vendor
exports.getProducts = async (req, res) => {
  try {
    const vendorId = req.user._id;

    // Find the vendor's store
    const store = await Store.findOne({ owner: vendorId });
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // Get all products belonging to the vendor's store
    const products = await Product.find({ store: store._id });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAnalyticsData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get the store owned by the user (vendor)
    const store = await Store.findOne({ owner: userId });

    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }

    // Get orders where the storeId matches the store owned by the user
    const orders = await Order.find({
      "products.storeId": store._id, // Match storeId in products array
    }).populate("products.productId"); // Correctly populate 'productId' field

    // If no orders found for the store
    if (orders.length === 0) {
      return res.status(200).json({
        message: "No orders found for your store.",
        analyticsData: {
          totalRevenue: 0,
          totalSales: 0,
          avgRating: 0,
          categorySales: {},
          topProducts: [],
          monthlySales: Array(12).fill(0),
          quarterlySales: Array(4).fill(0), // Quarterly sales initialized to 0
        },
      });
    }

    // Calculate total revenue (sum of all order amounts)
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    // Get total number of sales (orders)
    const totalSales = orders.length;

    // Get average customer review rating for products in the store
    const reviews = await Review.find({ product: { $in: store.products } });
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        : 0;

    // Get sales by category from orders (category per product in the order)
    const categorySales = {};
    orders.forEach((order) => {
      order.products.forEach((productItem) => {
        const product = productItem.productId;
        if (product.store.toString() === store._id.toString()) {
          const category = product.category;
          const salesAmount = productItem.quantity * product.price;

          if (!categorySales[category]) {
            categorySales[category] = 0;
          }
          categorySales[category] += salesAmount;
        }
      });
    });

    // Get top products based on quantity sold (from orders)
    const productSales = {};
    orders.forEach((order) => {
      order.products.forEach((productItem) => {
        const product = productItem.productId;
        if (product.store.toString() === store._id.toString()) {
          if (!productSales[product._id]) {
            productSales[product._id] = {
              name: product.name,
              category: product.category,
              sales: 0,
            };
          }
          productSales[product._id].sales +=
            productItem.quantity * product.price;
        }
      });
    });

    // Sort products by total sales and pick the top 5
    const sortedProducts = Object.values(productSales)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    // Calculate monthly sales data (January to December)
    const monthlySales = Array(12).fill(0); // Initialize array for 12 months

    orders.forEach((order) => {
      const orderMonth = moment(order.createdAt).month(); // Get month (0-11)
      monthlySales[orderMonth] += order.total; // Add sales to the corresponding month
    });

    // Calculate quarterly sales data (4 quarters)
    const quarterlySales = Array(4).fill(0); // Initialize array for 4 quarters

    orders.forEach((order) => {
      const orderMonth = moment(order.createdAt).month(); // Get month (0-11)
      const quarter = Math.floor(orderMonth / 3); // 0 -> Q1, 1 -> Q2, etc.
      quarterlySales[quarter] += order.total; // Add sales to the corresponding quarter
    });

    // Prepare the data to send to the frontend
    const analyticsData = {
      totalRevenue,
      totalSales,
      avgRating: avgRating.toFixed(1), // Rounded to 1 decimal place
      categorySales,
      topProducts: sortedProducts,
      monthlySales, // Array with monthly sales data
      quarterlySales, // Array with quarterly sales data
    };

    res.status(200).json(analyticsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching analytics data." });
  }
};
