const express = require("express");
const router = express.Router();
const { createJob } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");


router.post("/create", protect, authorizeRoles("recruiter"), createJob);

module.exports = router;
