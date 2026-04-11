const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const verifyToken = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

// Multer setup for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post("/apply", verifyToken, upload.single("resume"), applicationController.applyJob);
router.get("/my", verifyToken, applicationController.getMyApplications);
router.get("/job/:job_id", verifyToken, applicationController.getApplicationsByJob);
router.put("/status/:appli_id", verifyToken, applicationController.updateStatus);

module.exports = router;