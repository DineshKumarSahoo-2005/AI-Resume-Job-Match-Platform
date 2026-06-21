const Job = require("../models/Job");
const axios = require("axios");

exports.generateInterviewQuestions = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const prompt = `
Generate 10 technical interview questions.

Job Title:
${job.title}

Skills:
${job.skillsRequired.join(", ")}

Return only questions.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const text = response.data.choices[0].message.content;

    const questions = text.split("\n").filter((q) => q.trim());

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error("OpenRouter Error:", error.response?.data || error.message);

    res.status(500).json({
      message: error.response?.data || error.message,
    });
  }
};
