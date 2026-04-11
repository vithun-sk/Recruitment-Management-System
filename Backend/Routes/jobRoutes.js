const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", jobController.getJobs);                          // All jobs (candidate)
router.get("/myjobs", verifyToken, jobController.getJobsByHr);  // HR's own jobs
router.post("/create", verifyToken, jobController.createJob);   // HR posts job
router.delete("/:job_id", verifyToken, jobController.deleteJob); // HR deletes job

module.exports = router;