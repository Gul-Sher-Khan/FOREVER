const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      image,
      stock,
      sizes,
      store,
    } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      subcategory,
      image,
      stock,
      sizes,
      store,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      image,
      stock,
      sizes,
    } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        subcategory,
        image,
        stock,
        sizes,
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error });
  }
};

exports.getRelatedProducts = async (req, res) => {
  const { id } = req.params; // ID of the product for which related products are sought

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Fetch products that are in the same category or subcategory but are not the same as the current product
    const relatedProducts = await Product.find({
      _id: { $ne: id }, // Exclude the current product
      $or: [{ category: product.category }],
    }).limit(5); // Limit to 5 related products; adjust as necessary

    res.status(200).json(relatedProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching related products", error });
  }
};

exports.getBestSellers = async (req, res) => {
  try {
    // Aggregate to calculate total sales per product
    const bestSellers = await Order.aggregate([
      { $unwind: "$products" }, // Deconstructs the products array
      {
        $group: {
          _id: "$products.productId", // Group by product ID
          totalSold: { $sum: "$products.quantity" }, // Sum up all quantities sold per product
        },
      },
      { $sort: { totalSold: -1 } }, // Sort by totalSold in descending order
      { $limit: 10 }, // Limit to top 10
      {
        $lookup: {
          from: "products", // Join with Product collection
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" }, // Flatten the productDetails array
      {
        $project: {
          _id: 1,
          totalSold: 1,
          name: "$productDetails.name",
          description: "$productDetails.description",
          image: "$productDetails.image",
          price: "$productDetails.price",
        },
      },
    ]);

    // Check if any best sellers were found
    if (bestSellers.length === 0) {
      // Fallback to get any products if no best-sellers found
      const anyProducts = await Product.find().limit(10);
      res
        .status(200)
        .json(
          anyProducts.length > 0
            ? anyProducts
            : "Fallback: No products available."
        );
    } else {
      res.status(200).json(bestSellers);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching best-selling products", error });
  }
};

exports.getLatestCollection = async (req, res) => {
  try {
    let products = await Product.find().sort({ createdAt: -1 }).limit(10);
    if (products.length === 0) {
      // Fallback: Fetch any 10 products if no latest products are available
      products = await Product.find().limit(10);
    }
    res
      .status(200)
      .json(
        products.length > 0 ? products : "Fallback: No products available."
      );
  } catch (error) {
    res.status(500).json({ message: "Error fetching latest products", error });
  }
};

// Retrieve products (filter by store if provided)
exports.getProducts = async (req, res) => {
  try {
    const { storeId } = req.query; // Optional filter by store
    const products = storeId
      ? await Product.find({ store: storeId })
      : await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

// Approve a product
exports.approveProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { status: "Approved" },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error approving product", error });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
