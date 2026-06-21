const express = require("express");

const router = express.Router();

const {
  scheduleInterview,
  getRecruiterInterviews,
  updateInterviewStatus,
} = require("../controllers/interviewController");

const { protect } = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post(
  "/schedule",
  protect,
  authorizeRoles("recruiter"),
  scheduleInterview,
);

router.get(
  "/recruiter",
  protect,
  authorizeRoles("recruiter"),
  getRecruiterInterviews,
);

router.put(
  "/:interviewId/status",
  protect,
  authorizeRoles("recruiter"),
  updateInterviewStatus,
);
module.exports = router;
