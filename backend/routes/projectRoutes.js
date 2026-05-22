const express = require("express");
const router = express.Router();

const {
  addProject,
  getProjects,
  getMyProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

/* =========================
   PUBLIC ROUTES
========================= */

// Get approved projects
router.get("/", getProjects);

/* =========================
   USER ROUTES
========================= */

// Add new project
router.post("/", protect, addProject);

// Get logged-in user's projects
router.get("/my-projects", protect, getMyProjects);

// Update own project
router.put("/:id", protect, updateProject);

// Delete own project
router.delete("/:id", protect, deleteProject);

module.exports = router;