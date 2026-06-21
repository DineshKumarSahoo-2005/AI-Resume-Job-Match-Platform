const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  generateInterviewQuestions,
} = require("../controllers/aiInterviewController");

router.get("/:jobId", protect, generateInterviewQuestions);

module.exports = router;
