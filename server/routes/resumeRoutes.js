const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const {
  uploadResume,
  getMyResume,
  downloadResume,
} = require("../controllers/resumeController");

router.post("/upload", protect, upload.single("resume"), uploadResume);

router.get("/my-resume", protect, getMyResume);

router.get("/download/:id", downloadResume);

module.exports = router;
