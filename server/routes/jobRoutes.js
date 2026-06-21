const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const {
  createJob,
  getMyJobs,
  deleteJob,
  getRecruiterAnalytics,
  getJobById,
  updateJob,
} = require("../controllers/jobController");

router.post("/create", protect, authorizeRoles("recruiter"), createJob);
router.get("/my-jobs", protect, authorizeRoles("recruiter"), getMyJobs);

router.delete("/:id", protect, authorizeRoles("recruiter"), deleteJob);

router.get(
  "/analytics",
  protect,
  authorizeRoles("recruiter"),
  getRecruiterAnalytics,
);

router.get("/:id", protect, getJobById);

router.put("/:id", protect, updateJob);

module.exports = router;
