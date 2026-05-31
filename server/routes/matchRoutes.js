const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { getJobMatches } = require("../controllers/matchController");

router.get("/jobs", protect, getJobMatches);

module.exports = router;
