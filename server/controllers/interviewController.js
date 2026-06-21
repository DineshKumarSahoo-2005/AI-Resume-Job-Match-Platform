const Interview = require("../models/Interview");
const sendEmail = require("../utils/sendEmail");
const Job = require("../models/Job");
const Application = require("../models/Application");

const User = require("../models/User");

exports.scheduleInterview = async (req, res) => {
  try {
    const { candidateId, jobId, date } = req.body;

    const interview = await Interview.create({
      candidate: candidateId,
      recruiter: req.user._id,
      job: jobId,
      date,
    });

    await Notification.create({
      user: candidateId,

      title: "Interview Scheduled",

      message: `Interview scheduled on ${date}`,

      type: "interview",
    });

    const io = req.app.get("io");

    io.to(candidateId).emit("newNotification");
    await Application.findOneAndUpdate(
      {
        candidate: candidateId,
        job: jobId,
      },
      {
        status: "Scheduled",
      },
      {
        upsert: true,
        new: true,
      },
    );
    const candidate = await User.findById(candidateId);

    const job = await Job.findById(jobId);
    await sendEmail(
      candidate.email,

      "Interview Scheduled - HireSense AI",

      `
Hello ${candidate.name},

Congratulations!

You have been shortlisted for:

${job.title}

Company:
${job.company}

Interview Date:
${new Date(date).toDateString()}

Please be prepared.

Best of luck!

HireSense AI
`,
    );

    res.status(201).json({
      success: true,
      interview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getRecruiterInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      recruiter: req.user._id,
    })
      .populate("candidate", "name email")
      .populate("job", "title company")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateInterviewStatus = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { status } = req.body;

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    interview.status = status;

    await interview.save();

    const candidate = await User.findById(interview.candidate);

    const job = await Job.findById(interview.job);

    if (status === "Selected") {
      await sendEmail(
        candidate.email,

        "Congratulations! You are Selected 🎉",

        `
Hello ${candidate.name},

Congratulations!

You have successfully cleared the interview process.

Position:
${job.title}

Company:
${job.company}

Status:
SELECTED ✅

The recruiter will contact you with further details.

Best Wishes,
HireSense AI
`,
      );
    }

    if (status === "Rejected") {
      await sendEmail(
        candidate.email,

        "Interview Result Update",

        `
Hello ${candidate.name},

Thank you for attending the interview.

Position:
${job.title}

Company:
${job.company}

After careful consideration,
we have decided not to move forward
with your application at this time.

We appreciate your interest and wish
you success in your future opportunities.

Best Regards,
HireSense AI
`,
      );
    }

    if (status === "Completed") {
      await sendEmail(
        candidate.email,

        "Interview Completed",

        `
Hello ${candidate.name},

Your interview for:

${job.title}

at ${job.company}

has been marked as completed.

The recruiter is currently reviewing
your performance.

You will receive an update soon.

Best Regards,
HireSense AI
`,
      );
    }

    await Application.findOneAndUpdate(
      {
        candidate: interview.candidate,
        job: interview.job,
      },
      {
        status,
      },
    );

    res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
