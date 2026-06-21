const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  generateOfferLetter,
  getMyOffers,
  updateOfferStatus,
  getRecruiterOffers,
} = require("../controllers/offerController");

router.post(
  "/generate",
  protect,
  authorizeRoles("recruiter"),
  generateOfferLetter,
);

router.get("/my-offers", protect, getMyOffers);

router.put("/:id/status", protect, updateOfferStatus);

router.get(
  "/recruiter",
  protect,
  authorizeRoles("recruiter"),
  getRecruiterOffers,
);

module.exports = router;
