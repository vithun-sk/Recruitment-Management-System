const db = require("../config/db");
 
// ─── GET ALL USERS ────────────────────────────────────────────
exports.getAllUsers = (req, res) => {
    db.query(
        `SELECT userid, name, email, mobile_num, city, role,
                DATE_FORMAT(register_date, '%Y-%m-%d') AS register_date
         FROM users ORDER BY register_date DESC`,
        (err, results) => {
            if (err) return res.status(500).json({ message: "Database error.", error: err });
            return res.status(200).json(results);
        }
    );
};
 
// ─── GET ALL JOBS ─────────────────────────────────────────────
exports.getAllJobs = (req, res) => {
    db.query(
        `SELECT *, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at
         FROM jobs ORDER BY created_at DESC`,
        (err, results) => {
            if (err) return res.status(500).json({ message: "Database error.", error: err });
            return res.status(200).json(results);
        }
    );
};
 
// ─── DELETE ANY JOB ───────────────────────────────────────────
exports.deleteJob = (req, res) => {
    const { job_id } = req.params;
    db.query(
        "DELETE FROM jobs WHERE job_id = ?",
        [job_id],
        (err, result) => {
            if (err) return res.status(500).json({ message: "Delete failed.", error: err });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Job not found." });
            return res.status(200).json({ message: "Job deleted successfully!" });
        }
    );
};
 
// ─── DELETE ANY USER ──────────────────────────────────────────
exports.deleteUser = (req, res) => {
    const { userid } = req.params;
    
    // Step 1: Delete user's applications first
    db.query("DELETE FROM applications WHERE userid = ?", [userid], (err) => {
        if (err) return res.status(500).json({ message: "Failed to delete applications.", error: err });
        
        // Step 2: Delete user's jobs (and their applications too)
        db.query("DELETE FROM applications WHERE job_id IN (SELECT job_id FROM jobs WHERE hr_id = ?)", [userid], (err) => {
            if (err) return res.status(500).json({ message: "Failed to delete job applications.", error: err });

            // Step 3: Delete user's jobs
            db.query("DELETE FROM jobs WHERE hr_id = ?", [userid], (err) => {
                if (err) return res.status(500).json({ message: "Failed to delete jobs.", error: err });

                // Step 4: Finally delete the user
                db.query("DELETE FROM users WHERE userid = ?", [userid], (err, result) => {
                    if (err) return res.status(500).json({ message: "Failed to delete user.", error: err });
                    if (result.affectedRows === 0) return res.status(404).json({ message: "User not found." });
                    return res.status(200).json({ message: "User deleted successfully!" });
                });
            });
        });
    });
};