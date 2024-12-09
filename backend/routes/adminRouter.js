const express = require("express");
const router = express.Router();
const {
  getDashboardData,
  getUsersAndVendors,
  updateUserDetails,
  deleteUser,
} = require("../controllers/adminController");

// Route to fetch dashboard data
router.get("/dashboard", getDashboardData);
// Get all users and vendors
router.get("/users", getUsersAndVendors);

// Update user/vendor details
router.put("/users/:id", updateUserDetails);

// Delete a user/vendor
router.delete("/users/:id", deleteUser);

module.exports = router;
