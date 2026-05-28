const Job = require("../models/Job");

const SKILLS = ["Java","JavaScript","React","Node.js","Express","MongoDB","Python",
  "SQL","Git","HTML","CSS"];

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
