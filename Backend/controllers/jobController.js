const db = require("../config/db");
 
// ─── GET ALL JOBS ─────────────────────────────────────────────
exports.getJobs = (req, res) => {
  db.query(
    "SELECT *, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at FROM jobs ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error.", error: err });
      return res.status(200).json(results);
    }
  );
};
 
// ─── GET JOBS BY HR ───────────────────────────────────────────
exports.getJobsByHr = (req, res) => {
  const hr_id = req.user.userid;
  db.query(
    "SELECT *, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at FROM jobs WHERE hr_id = ? ORDER BY created_at DESC",
    [hr_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error.", error: err });
      return res.status(200).json(results);
    }
  );
};
 
// ─── CREATE JOB ───────────────────────────────────────────────
exports.createJob = (req, res) => {
  const hr_id = req.user.userid;
  const { jobtitle, jobdescription, job_type, location, company_name, skills_required, work_mode } = req.body;
 
  if (!jobtitle || !jobdescription || !job_type || !location || !company_name || !skills_required || !work_mode) {
    return res.status(400).json({ message: "Please fill all fields." });
  }
 
  db.query(
    "INSERT INTO jobs (jobtitle, jobdescription, job_type, location, hr_id, company_name, skills_required, work_mode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [jobtitle, jobdescription, job_type, location, hr_id, company_name, skills_required, work_mode],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Failed to create job.", error: err });
      return res.status(201).json({ message: "Job posted successfully!", job_id: result.insertId });
    }
  );
};
 
// ─── DELETE JOB ───────────────────────────────────────────────
exports.deleteJob = (req, res) => {
  const hr_id = req.user.userid;
  const { job_id } = req.params;
 
  db.query(
    "DELETE FROM jobs WHERE job_id = ? AND hr_id = ?",
    [job_id, hr_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Delete failed.", error: err });
      if (result.affectedRows === 0) return res.status(403).json({ message: "Job not found or unauthorized." });
      return res.status(200).json({ message: "Job deleted successfully!" });
    }
  );
};