const mongoose = require("mongoose");

const offerLetterSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    package: {
      type: String,
      required: true,
    },

    pdfPath: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "Generated",
    },

    offerStatus: {
      type: String,
      enum: ["Pending", "Accepted", "Declined"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("OfferLetter", offerLetterSchema);
