const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Store = require("../models/Store");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.signup = async (req, res) => {
  const { name, email, pass, role, storeName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = new User({ name, email, pass: hashedPassword, role });
    await user.save();

    // Create a store if the user is a vendor
    if (role === "vendor") {
      const newStore = new Store({ owner: user._id, name: storeName });
      await newStore.save();
    }

    const token = generateToken(user);
    res.status(201).json({ token, role });
  } catch (error) {
    res.status(500).json({ message: "Error during registration", error });
  }
};

exports.login = async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
