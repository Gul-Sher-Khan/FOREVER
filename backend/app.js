const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const { requireAuth, isAdmin, isVendor } = require("./middleware/auth.js");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://forever-puce.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the authentication API!");
});

app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/products", require("./routes/productRouter"));
app.use("/api/orders", requireAuth, require("./routes/orderRouter"));
app.use("/api/wishlist", requireAuth, require("./routes/wishlistRouter"));
app.use("/api/vendor", requireAuth, isVendor, require("./routes/vendorRouter"));
app.use("/api/admin", requireAuth, isAdmin, require("./routes/adminRouter"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
