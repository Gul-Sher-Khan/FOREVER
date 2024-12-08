const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendorController");

// Get Vendor Dashboard Data
router.get("/dashboard", vendorController.getDashboardData);

module.exports = router;
