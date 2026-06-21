const Job = require("../models/Job");

const SKILLS = [
  "Java",
  "JavaScript",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Python",
  "SQL",
  "Git",
  "HTML",
  "CSS",
];

const extractSkills = (text) => {
  return SKILLS.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase()),
  );
};

exports.createJob = async (req, res) => {
  try {
    const { title, company, description } = req.body;
    const skillsRequired = extractSkills(description);
    const job = await Job.create({
      title,
      company,
      description,
      skillsRequired,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      createdBy: req.user._id,
    });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getRecruiterAnalytics = async (req, res) => {
  try {
    const jobs = await Job.find({
      createdBy: req.user._id,
    });

    const totalJobs = jobs.length;

    let totalCandidates = jobs.length;
    let skillsMap = {};

    jobs.forEach((job) => {
      totalCandidates += 1;

      job.skillsRequired.forEach((skill) => {
        skillsMap[skill] = (skillsMap[skill] || 0) + 1;
      });
    });

    const topSkills = Object.entries(skillsMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    res.status(200).json({
      success: true,
      totalJobs,
      totalCandidates,
      topSkills,
      recentJobs: jobs.slice(-5),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { title, company, description } = req.body;

    const skillsRequired = extractSkills(description);

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    job.title = title;
    job.company = company;
    job.description = description;
    job.skillsRequired = skillsRequired;

    await job.save();

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
