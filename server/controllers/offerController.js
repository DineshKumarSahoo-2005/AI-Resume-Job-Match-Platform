const OfferLetter = require("../models/OfferLetter");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const User = require("../models/User");
const Job = require("../models/Job");

exports.generateOfferLetter = async (req, res) => {
  try {
    const { candidate, job, joiningDate, package: salaryPackage } = req.body;

    const candidateData = await User.findById(candidate);

    const jobData = await Job.findById(job);

    const offer = await OfferLetter.create({
      candidate,
      job,
      joiningDate,
      package: salaryPackage,
    });

    const pdfName = `offer-${offer._id}.pdf`;

    const pdfPath = path.join(__dirname, "..", "offers", pdfName);

    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(24).text("Offer Letter", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(14);

    doc.text(`Dear ${candidateData.name},`);

    doc.moveDown();

    doc.text(
      `We are pleased to offer you the position of ${jobData.title} at ${jobData.company}.`,
    );

    doc.moveDown();

    doc.text(`Joining Date: ${new Date(joiningDate).toDateString()}`);

    doc.text(`Package: ${salaryPackage}`);

    doc.moveDown();

    doc.text("Congratulations and welcome aboard!");

    doc.moveDown();

    doc.text("Regards,");

    doc.text(`${jobData.company}`);

    doc.end();

    offer.pdfPath = `offers/${pdfName}`;

    await offer.save();

    const Notification = require("../models/Notification");

    await Notification.create({
      user: candidateId,

      title: "Offer Received",

      message: "Congratulations! You received an offer letter.",

      type: "offer",
    });

    const io = req.app.get("io");

    io.to(candidateId).emit("newNotification");

    const sendEmail = require("../utils/sendEmail");

    await sendEmail(
      candidateData.email,

      "Offer Letter - HireSense AI",

      `
Congratulations ${candidateData.name}!

We are delighted to offer you the position of:

${jobData.title}

Company:
${jobData.company}

Package:
${salaryPackage}

Joining Date:
${new Date(joiningDate).toDateString()}

Please find your Offer Letter attached.

Welcome to the team!

Regards,
HireSense AI
`,

      pdfPath,
    );

    res.status(201).json({
      success: true,
      offer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getMyOffers = async (req, res) => {
  try {
    const offers = await OfferLetter.find({
      candidate: req.user._id,
    })
      .populate("job", "title company")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      offers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateOfferStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const offer = await OfferLetter.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        message: "Offer not found",
      });
    }

    offer.offerStatus = status;

    await offer.save();

    res.status(200).json({
      success: true,
      offer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getRecruiterOffers = async (req, res) => {
  try {
    const offers = await OfferLetter.find()

      .populate("candidate", "name email")

      .populate("job", "title company")

      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      offers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
