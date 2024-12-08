// orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/purchase", orderController.purchaseProduct);

module.exports = router;
