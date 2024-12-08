const Order = require("../models/Order");
const Product = require("../models/Product");

exports.purchaseProduct = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product || product.stock < quantity) {
      return res
        .status(400)
        .json({ message: "Product not available or insufficient stock" });
    }

    const total = product.price * quantity;

    const order = new Order({
      user: userId,
      products: [{ productId, quantity }],
      total,
      address: { ...req.body.address }, // assuming address details are passed in request
      status: "Pending",
    });

    await order.save();
    await Product.findByIdAndUpdate(productId, { $inc: { stock: -quantity } });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};
