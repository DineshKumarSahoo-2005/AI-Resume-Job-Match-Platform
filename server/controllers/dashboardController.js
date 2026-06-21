const Resume = require("../models/Resume");
const Job = require("../models/Job");
const User = require("../models/user");

exports.getDashboardStats = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    let skillsCount = 0;
    let resumeUploaded = false;
    let profileCompletion = 0;

    if (resume) {
      resumeUploaded = true;
      skillsCount = resume.skills.length;
    }

    const user = await User.findById(req.user._id);

    profileCompletion =
      [user.name, user.email, user.github, user.linkedin, user.bio].filter(
        Boolean,
      ).length * 20;

    res.status(200).json({
      success: true,
      resumeUploaded,
      skillsCount,
      jobMatches: 0, // next step
      profileCompletion,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
