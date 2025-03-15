const User = require("../models/User");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const {
      username,
      password,
      role,
      name,
      age,
      gender,
      contact,
      specialization,
    } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create a new user
    const user = new User({
      username,
      password,
      role,
      name,
      age,
      gender,
      contact,
      specialization,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;

    // Validate role
    if (!["patient", "doctor", "admin"].includes(role)) {
      return res.status(400).json({ error: "Invalid role specified" });
    }

    // Find users by role
    const users = await User.find({ role }).select("-password"); // Exclude password field

    res.status(200).json({
      message: `Users with role '${role}' fetched successfully`,
      users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
