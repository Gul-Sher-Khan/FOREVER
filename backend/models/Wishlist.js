const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    date_added: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

wishlistSchema.index({ user: 1 });

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;