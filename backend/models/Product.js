const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subcategory: { type: String },
    image: { type: String },
    stock: { type: Number, required: true, min: 0 },
    sizes: { type: [String], default: [] },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ name: 1, category: 1 });
productSchema.index({ store: 1 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
