const Resume = require("../models/Resume");

exports.uploadResume = async (req, res) => {
    try {
        const resume = await Resume.create({
            user: req.user._id,
            originalName: req.file.originalname,
            filePath: req.file.path,
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