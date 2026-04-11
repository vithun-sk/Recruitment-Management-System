const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
 
const app = express();
 
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
 
const authRoutes = require("./Routes/authRoutes");
const jobRoutes = require("./Routes/jobRoutes");
const applicationRoutes = require("./Routes/applicationRoutes");
const adminRoutes = require("./Routes/adminroutes");
 
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);
 
app.get("/", (req, res) => {
    res.send("✅ RecruitHub API is running...");
});
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
 