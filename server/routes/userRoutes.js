const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authMiddleware");
const {getUserProfile} = require("../controllers/userController");
const {authorizeRoles} = require("../middleware/roleMiddleware");

router.get("/profile", protect, getUserProfile);
router.get(
    "/recruiter-dashboard",
    protect,
    authorizeRoles("recruiter"),
    (req, res) => {
        res.status(200).json({
            message: "Welcome Recruiter"
        });
    }
);

module.exports = router;