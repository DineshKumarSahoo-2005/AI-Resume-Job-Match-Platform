const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
  type: String,
  enum: [
    "Scheduled",
    "Completed",
    "Selected",
    "Rejected",
    "Cancelled",
  ],
  default: "Scheduled",
},
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Interview",
  interviewSchema
);