const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  getJobMatches,
  getCandidatesForJob,
} = require("../controllers/matchController");

const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/jobs", protect, getJobMatches);

router.get(
  "/job/:jobId/candidates",
  protect,
  authorizeRoles("recruiter"),
  getCandidatesForJob,
);

module.exports = router;
