const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text, attachmentPath = null) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    if (attachmentPath) {
      mailOptions.attachments = [
        {
          filename: "OfferLetter.pdf",
          path: attachmentPath,
        },
      ];
    }

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Email Error:", error.message);
  }
};

module.exports = sendEmail;
