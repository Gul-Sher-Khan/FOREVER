const Order = require("../models/Order");
const Product = require("../models/Product");

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { products, address } = req.body;
    const userId = req.user.id;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Products are required." });
    }

    let total = 0;

    // Decrement stock for each product and calculate total
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Product ${item.productId} is out of stock.` });
      }
      product.stock -= item.quantity;
      await product.save();

      total += product.price * item.quantity;
    }

    const order = new Order({
      user: userId,
      products,
      total,
      address,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create order." });
  }
};

// Get All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user products.product");
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve orders." });
  }
};

// Get Single Order
exports.getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user products.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve order." });
  }
};

// Update Order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, shippingAddress } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status, shippingAddress },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update order." });
  }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete order." });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "products.productId"
    );

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve orders." });
  }
};
