const express = require("express");
const router = express.Router();

const {
  addService,
  getServices,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addService);
router.get("/", getServices);
router.put("/:id", protect, updateService);
router.delete("/:id", protect, deleteService);

module.exports = router;