const express = require("express");

const router = express.Router();

const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/messageController");

const { protect } = require("../middleware/authMiddleware");

// Public route
router.post("/", sendMessage);

// Protected admin routes
router.get("/", protect, getMessages);

router.delete("/:id", protect, deleteMessage);

module.exports = router;