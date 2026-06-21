const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getMyApplications,
  applyForJob,
  updateApplicationStatus,
} = require("../controllers/applicationController");

router.get("/my-applications", protect, getMyApplications);

router.post("/apply/:jobId", protect, applyForJob);

router.put("/status", protect, updateApplicationStatus);

module.exports = router;
