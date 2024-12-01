import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudnary from './config/cloudinary.js';
import userRouter from "./routes/userRoute.js";
// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 4000;

// Connect to the database
connectDB();

//connect cloudinary

connectCloudnary();

// Middleware
app.use(express.json());
app.use(cors());

//Api Endpoints
app.use('/api/user',userRouter);

// API Routes
app.get("/", (_req, res) => {
  res.send("API is working!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
