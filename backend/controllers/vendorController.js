const Order = require("../models/Order");
const Store = require("../models/Store");
const Review = require("../models/Review");
const moment = require("moment");

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
