const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  changePassword,
  updateProfile,
} = require("../controllers/userController");

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