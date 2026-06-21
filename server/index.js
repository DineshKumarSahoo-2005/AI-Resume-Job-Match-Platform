const http = require("http");
const { Server } = require("socket.io");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

app.use(cors());
app.use(express.json()); //Allows backend to read JSON From Frontend

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db");
connectDB();

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const resumeRoutes = require("./routes/resumeRoutes");
app.use("/api/resume", resumeRoutes);

const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

const matchRoutes = require("./routes/matchRoutes");
app.use("/api/match", matchRoutes);

const aiRoutes = require("./routes/aiRoutes");
app.use("/api/ai", aiRoutes);

const interviewRoutes = require("./routes/interviewRoutes");
app.use("/api/interviews", interviewRoutes);

const aiInterviewRoutes = require("./routes/aiInterviewRoutes");
app.use("/api/interview-questions", aiInterviewRoutes);

const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/applications", applicationRoutes);

const analyticsRoutes = require("./routes/analyticsRoutes");
app.use("/api/analytics", analyticsRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/offers", express.static(path.join(__dirname, "offers")));

const offerRoutes = require("./routes/offerRoutes");
app.use("/api/offers", offerRoutes);

const searchRoutes = require("./routes/searchRoutes");
app.use("/api/search", searchRoutes);

const notificationRoutes = require("./routes/notificationRoutes");
app.use("/api/notifications", notificationRoutes);

const publicRoutes = require("./routes/publicRoutes");

app.use("/api/public", publicRoutes);

io.on("connection", (socket) => {

  socket.on("join", (userId) => {
    socket.join(userId);

  });

  socket.on("disconnect", () => {
  });
});

server.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
