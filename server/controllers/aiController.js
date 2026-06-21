const Resume = require("../models/Resume");

exports.getResumeInsights = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const skills = resume.skills || [];

    let score = 0;

    score += Math.min(skills.length * 10, 50);

    const bonusSkills = [
      "React",
      "Node.js",
      "Java",
      "JavaScript",
      "MongoDB",
      "SQL",
    ];

    const matchedBonusSkills = skills.filter((skill) =>
      bonusSkills.includes(skill),
    );

    score += matchedBonusSkills.length * 5;

    if (score > 100) score = 100;

    let level = "Beginner";

    if (score >= 80) {
      level = "Professional";
    } else if (score >= 50) {
      level = "Intermediate";
    }

    const missingSkills = [
      "Docker",
      "AWS",
      "System Design",
      "Kubernetes",
    ].filter((skill) => !skills.includes(skill));

    res.status(200).json({
      success: true,
      score,
      level,
      strengths: skills.slice(0, 5),
      missingSkills,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
