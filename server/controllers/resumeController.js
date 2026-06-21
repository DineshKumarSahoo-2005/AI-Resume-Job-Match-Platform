const Resume = require("../models/Resume");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const path = require("path");

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

exports.uploadResume = async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;
    const skills = extractSkills(extractedText);
    const resume = await Resume.create({
      user: req.user._id,
      originalName: req.file.originalname,
      filePath: req.file.path,
      extractedText,
      skills,
    });
    res.status(201).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getMyResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.downloadResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const filePath = path.join(__dirname, "..", resume.filePath);

    res.download(filePath, resume.originalName);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
