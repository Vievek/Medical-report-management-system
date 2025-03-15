const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Register a new user
router.post("/register", authController.registerUser);

// Login user
router.post("/login", authController.loginUser);

// Get all users by role
router.get("/users/:role", authController.getUsersByRole);

module.exports = router;
