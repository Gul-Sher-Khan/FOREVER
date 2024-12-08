const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendorController");

// Get Vendor Dashboard Data
router.get("/dashboard", vendorController.getDashboardData);
// Get orders for vendor
router.get("/orders", vendorController.getOrders);

// Update order status (from Pending to Delivered, etc.)
router.put(
  "/orders/update",

  vendorController.updateOrderStatus
);

module.exports = router;
