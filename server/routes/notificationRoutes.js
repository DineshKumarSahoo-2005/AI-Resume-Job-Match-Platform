const express = require("express");

const router = express.Router();

const {
  getMyNotifications,
  markAsRead,
} = require("../controllers/notificationController");

const { protect } = require("../middleware/authMiddleware");

router.get("/my-notifications", protect, getMyNotifications);

router.put("/read/:id", protect, markAsRead);

module.exports = router;
