const express=require("express");
const cors=require("cors");

require("dotenv").config();

require("./config/db");

const authRoutes=require("./routes/authRoutes");

const studentRoutes = require("./routes/studentRoutes");

const internshipRoutes = require("./routes/internshipRoutes");

const applicationRoutes = require("./routes/applicationRoutes");

const employerRoutes = require("./routes/employerRoutes");

console.log("Student routes loaded");

const app=express();

app.use(cors());

app.use(express.json());

app.use("/api/auth",authRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/internships", internshipRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/employers", employerRoutes);

app.get("/",(req,res)=>{

    res.send("Smart University Internship & Career Placement System API");

});

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{

    console.log(`Server Running on ${PORT}`);

});