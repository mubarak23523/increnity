const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

const {
  registerUser,
  loginUser,
  changePassword,
  updateProfile,
} = require("../controllers/userController");

/* GET ALL USERS - ADMIN DASHBOARD */
router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/* PROFILE */
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

/* AUTH */
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, updateProfile);

/* SETTINGS */
router.put("/change-password", protect, changePassword);

module.exports = router;