const Job = require("../models/Job");
const Interview = require("../models/Interview");

exports.getRecruiterAnalytics =
  async (req, res) => {

    try {

      const jobsPosted =
        await Job.countDocuments({
          createdBy: req.user._id,
        });

      const interviewsScheduled =
        await Interview.countDocuments({
          recruiter: req.user._id,
        });

      const selectedCandidates =
        await Interview.countDocuments({
          recruiter: req.user._id,
          status: "Selected",
        });

      const successRate =
        interviewsScheduled > 0
          ? Math.round(
              (selectedCandidates /
                interviewsScheduled) *
                100
            )
          : 0;

      res.status(200).json({
        success: true,
        analytics: {
          jobsPosted,
          interviewsScheduled,
          selectedCandidates,
          successRate,
        },
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };