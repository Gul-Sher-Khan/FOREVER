const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

reviewSchema.index({ product: 1 });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
