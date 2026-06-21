const express = require("express");
const router = express.Router();

const Job = require("../models/Job");

router.get("/", async (req, res) => {
  try {
    const q = req.query.q || "";

    const jobs = await Job.find({
      $or: [
        {
          title: {
            $regex: q,
            $options: "i",
          },
        },
        {
          company: {
            $regex: q,
            $options: "i",
          },
        },
        {
          skillsRequired: {
            $in: [new RegExp(q, "i")],
          },
        },
      ],
    });

    res.json({
      results: jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
