const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

router.post("/", wishlistController.addToWishlist);
router.get("/", wishlistController.getWishlist);
router.patch("/remove", wishlistController.removeFromWishlist);
router.delete("/:userId", wishlistController.deleteWishlist);

module.exports = router;
