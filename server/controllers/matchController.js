const Resume = require("../models/Resume");
const Job = require("../models/Job");
const Application = require("../models/Application");

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

      const matchScore =
        job.skillsRequired.length > 0
          ? Math.round(
              (matchingSkills.length / job.skillsRequired.length) * 100,
            )
          : 0;

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

const User = require("../models/User");

exports.getCandidatesForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const allResumes = await Resume.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    const uniqueUsers = new Set();

    const resumes = allResumes.filter((resume) => {
      const userId = resume.user._id.toString();

      if (uniqueUsers.has(userId)) {
        return false;
      }

      uniqueUsers.add(userId);
      return true;
    });

    const candidates = await Promise.all(
      resumes.map(async (resume) => {
        const application = await Application.findOne({
          candidate: resume.user._id,
          job: job._id,
        });

        const matchingSkills = job.skillsRequired.filter((skill) =>
          resume.skills.includes(skill),
        );

        const matchScore =
          job.skillsRequired.length > 0
            ? Math.round(
                (matchingSkills.length / job.skillsRequired.length) * 100,
              )
            : 0;

        const missingSkills = job.skillsRequired.filter(
          (skill) => !resume.skills.includes(skill),
        );

        return {
          candidateId: resume.user._id,

          resumeId: resume._id,

          resumeFile: resume.filePath,

          extractedText: resume.extractedText,

          name: resume.user.name,

          email: resume.user.email,

          status: application?.status || "Applied",

          matchScore,

          matchingSkills,

          missingSkills,
        };
      }),
    );

    candidates.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({
      success: true,
      candidates,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
