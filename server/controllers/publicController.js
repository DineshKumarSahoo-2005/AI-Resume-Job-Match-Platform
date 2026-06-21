const User = require("../models/user");
const Job = require("../models/Job");
const Resume = require("../models/Resume");
const Application = require("../models/Application");

exports.getPublicStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalJobs = await Job.countDocuments();

    const totalResumes = await Resume.countDocuments();

    const totalApplications = await Application.countDocuments();

    res.status(200).json({
      success: true,
      totalUsers,
      totalJobs,
      totalResumes,
      totalApplications,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
