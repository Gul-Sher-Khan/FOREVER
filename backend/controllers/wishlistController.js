const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// Add a product to the wishlist
exports.addToWishlist = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      // Create new wishlist if not exist
      const newWishlist = new Wishlist({
        user: userId,
        products: [productId],
      });
      await newWishlist.save();
      return res.status(201).json(newWishlist);
    }

    // Add product to existing wishlist if not already included
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error adding to wishlist", error });
    console.log(error);
  }
};

// Get the user's wishlist
exports.getWishlist = async (req, res) => {
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "products"
    );
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving wishlist", error });
  }
};

// Remove a product from the wishlist
exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (product) => product.toString() !== productId
    );
    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist", error });
  }
};

// Delete the wishlist
exports.deleteWishlist = async (req, res) => {
  const userId = req.user._id;

  try {
    const result = await Wishlist.findOneAndDelete({ user: userId });
    if (!result) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(204).json({ message: "Wishlist deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting wishlist", error });
  }
};
