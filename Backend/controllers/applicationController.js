const db = require("../config/db");


// ─── APPLY FOR JOB ────────────────────────────────────────────
exports.applyJob = (req, res) => {
  const userid = req.user.userid;
  const { job_id, why_should_hire, briefly_describe_your_project, when_you_join } = req.body;
  const resume_path = req.file ? req.file.filename : null;
 
  if (!job_id || !why_should_hire || !briefly_describe_your_project || !resume_path) {
    return res.status(400).json({ message: "Please fill all fields and upload resume." });
  }
 
  // Check if already applied
  db.query(
    "SELECT * FROM applications WHERE userid = ? AND job_id = ?",
    [userid, job_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error.", error: err });
 
      if (results.length > 0) {
        return res.status(409).json({ message: "You have already applied for this job." });
      }
 
      db.query(
        "INSERT INTO applications (userid, job_id, resume_path, why_should_hire, briefly_describe_your_project, when_you_join) VALUES (?, ?, ?, ?, ?, ?)",
        [userid, job_id, resume_path, why_should_hire, briefly_describe_your_project, when_you_join || null],
        (err, result) => {
          if (err) return res.status(500).json({ message: "Application failed.", error: err });
          return res.status(201).json({ message: "Application submitted successfully!" });
        }
      );
    }
  );
};
 
// ─── GET MY APPLICATIONS (Candidate) ─────────────────────────
exports.getMyApplications = (req, res) => {
  const userid = req.user.userid;
 
  db.query(
    `SELECT a.appli_id, a.status, DATE_FORMAT(a.when_you_join, '%Y-%m-%d') AS when_you_join, a.job_id,
            DATE_FORMAT(a.applied_date, '%Y-%m-%d') AS applied_date,
            j.jobtitle, j.company_name, j.job_type, j.location
     FROM applications a
     JOIN jobs j ON a.job_id = j.job_id
     WHERE a.userid = ?
     ORDER BY a.applied_date DESC`,
    [userid],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error.", error: err });
      return res.status(200).json(results);
    }
  );
};
 
// ─── GET APPLICATIONS BY JOB (HR) ────────────────────────────
exports.getApplicationsByJob = (req, res) => {
  const { job_id } = req.params;
 
  db.query(
    `SELECT a.appli_id, a.status, a.resume_path,
           a.why_should_hire, a.briefly_describe_your_project, DATE_FORMAT(a.when_you_join, '%Y-%m-%d') AS when_you_join,
            DATE_FORMAT(a.applied_date, '%Y-%m-%d') AS applied_date,
            u.name AS candidate_name, u.email AS candidate_email, u.mobile_num
     FROM applications a
     JOIN users u ON a.userid = u.userid
     WHERE a.job_id = ?
     ORDER BY a.applied_date DESC`,
    [job_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error.", error: err });
      return res.status(200).json(results);
    }
  );
};
 
// ─── UPDATE APPLICATION STATUS (HR) ──────────────────────────
exports.updateStatus = (req, res) => {
  const { appli_id } = req.params;
  const { status } = req.body;
 
  const validStatuses = ["Applied", "Shortlisted", "Interview", "Selected", "Rejected"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }
 
  db.query(
    "UPDATE applications SET status = ? WHERE appli_id = ?",
    [status, appli_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Update failed.", error: err });
      return res.status(200).json({ message: "Status updated successfully!" });
    }
  );
};