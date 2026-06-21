const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  getUserProfile,
  getMyResume,
  updateProfile,
  changePassword,
} = require("../controllers/userController");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { getDashboardStats } = require("../controllers/dashboardController");

router.get("/profile", protect, getUserProfile);
router.get(
  "/recruiter-dashboard",
  protect,
  authorizeRoles("recruiter"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome Recruiter",
    });
  },
);
router.get("/dashboard-stats", protect, getDashboardStats);
router.get("/my-resume", protect, getMyResume);

router.put("/update-profile", protect, updateProfile);

router.put("/change-password", protect, changePassword);

router.put("/profile", protect, updateProfile);

module.exports = router;
