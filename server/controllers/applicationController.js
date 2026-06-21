const Application = require("../models/Application");
const Notification = require("../models/Notification");
const Job = require("../models/Job");

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { candidateId, jobId, status } = req.body;

    let application = await Application.findOne({
      candidate: candidateId,
      job: jobId,
    });

    if (!application) {
      application = await Application.create({
        candidate: candidateId,
        job: jobId,
        status,
      });
    } else {
      application.status = status;
      await application.save();
      await Notification.create({
        user: candidateId,

        title: "Application Status Updated",

        message: `Your application status is now ${status}`,

        type: "status",
      });

      const io = req.app.get("io");

      io.to(candidateId).emit("newNotification");
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user._id,
    })
      .populate("job", "title company")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.applyForJob = async (req, res) => {
  try {
    const existingApplication = await Application.findOne({
      candidate: req.user._id,
      job: req.params.jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "Already applied",
      });
    }

    const application = await Application.create({
      candidate: req.user._id,
      job: req.params.jobId,
    });

    const job = await Job.findById(req.params.jobId);

    await Notification.create({
      user: job.createdBy,
      title: "New Application",
      message: `${req.user.name} applied for ${job.title}`,
      type: "application",
    });

    const io = req.app.get("io");

    io.to(job.createdBy.toString()).emit("newNotification");

    res.status(201).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
