const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    originalName: String,
    filePath: String,
    extractedText: {
      type: String,
      default: "",
    },
    skills: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Resume", resumeSchema);
