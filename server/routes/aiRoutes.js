const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { getResumeInsights } = require("../controllers/aiController");

router.get("/resume-insights", protect, getResumeInsights);

module.exports = router;
