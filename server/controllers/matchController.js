const Resume = require("../models/Resume");
const Job = require("../models/Job");

exports.getJobMatches = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const jobs = await Job.find();
    const matches = jobs.map((job) => {
      const matchingSkills = job.skillsRequired.filter((skill) =>
        resume.skills.includes(skill),
      );

      const matchScore = Math.round(
        (matchingSkills.length / job.skillsRequired.length) * 100,
      );

      const missingSkills = job.skillsRequired.filter(
        (skill) => !resume.skills.includes(skill),
      );

      return {
        jobId: job._id,
        title: job.title,
        company: job.company,
        matchScore,
        matchingSkills,
        missingSkills,
      };
    });

    matches.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({
      success: true,
      matches,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
