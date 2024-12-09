const express = require("express");
const router = express.Router();
const {
  getDashboardData,
  getUsersAndVendors,
  updateUserDetails,
  deleteUser,
  getVendorsAndStores,
  getProductsByStore,
  deleteProduct,
  getAdminAnalytics,
} = require("../controllers/adminController");

// Route to fetch dashboard data
router.get("/dashboard", getDashboardData);
// Get all users and vendors
router.get("/users", getUsersAndVendors);

// Update user/vendor details
router.put("/users/:id", updateUserDetails);

// Delete a user/vendor
router.delete("/users/:id", deleteUser);

router.get("/vendors-and-stores", getVendorsAndStores);
router.get("/products/:storeId", getProductsByStore);
router.delete("/product/:productId", deleteProduct);
router.get("/analytics", getAdminAnalytics);

module.exports = router;
