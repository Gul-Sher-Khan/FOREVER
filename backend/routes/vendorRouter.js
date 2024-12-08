const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendorController");

// Get Vendor Dashboard Data
router.get("/dashboard", vendorController.getDashboardData);
// Get orders for vendor
router.get("/orders", vendorController.getOrders);

// Update order status (from Pending to Delivered, etc.)
router.put("/orders/update", vendorController.updateOrderStatus);

// Route to get all products for the authenticated vendor
router.get("/products", vendorController.getProducts);

// Route to create a new product
router.post("/products", vendorController.createProduct);

// Route to update stock of a product
router.put("/products/:productId/stock", vendorController.updateProductStock);

// Route to delete a product
router.delete("/products/:productId", vendorController.deleteProduct);

router.get("/analytics", vendorController.getAnalyticsData);

module.exports = router;
