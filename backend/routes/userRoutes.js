const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

const {
  registerUser,
  verifyOtp,
  loginUser,
  changePassword,
  updateProfile,
} = require("../controllers/userController");

/* GET ALL USERS - ADMIN DASHBOARD */
router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find({
  isVerified: true,
})
.select("-password")
.sort({ createdAt: -1 });
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
router.post("/verify-otp", verifyOtp);

/* SETTINGS */
router.put("/change-password", protect, changePassword);

module.exports = router;
/* DELETE USER */
router.delete("/:id", protect, async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete user",
    });

  }
});