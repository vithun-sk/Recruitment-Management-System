const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admincontroller");
 
router.get("/users", adminController.getAllUsers);
router.get("/jobs", adminController.getAllJobs);
router.delete("/jobs/:job_id", adminController.deleteJob);
router.delete("/users/:userid", adminController.deleteUser);
 
module.exports = router;