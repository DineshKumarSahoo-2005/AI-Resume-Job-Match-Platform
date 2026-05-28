const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json()); //Allows backend to read JSON From Frontend

app.get("/",(req,res)=>{
  res.send("API Running...");
});

const PORT=process.env.PORT || 5000;

const connectDB =require("./config/db");
connectDB();

const userRoutes=require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const resumeRoutes = require("./routes/resumeRoutes");
app.use("/api/resume", resumeRoutes);

app.listen(PORT,()=>{
  console.log(`Server Running at http://localhost:${PORT}`);
})