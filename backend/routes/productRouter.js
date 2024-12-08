// productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/latest", productController.getLatestCollection);
router.get("/bestsellers", productController.getBestSellers);
router.get("/:id", productController.getProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/:id/related", productController.getRelatedProducts);

module.exports = router;
