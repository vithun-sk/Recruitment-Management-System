import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import JobCard from "../../components/JobCard";
import "../../Styles/Showjobs.css";
import "../../Styles/Admin.css";
import { adminGetAllJobs, adminDeleteJob } from "../../Services/api";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    adminGetAllJobs()
      .then((res) => setJobs(res.data))
      .catch(() => alert("Failed to load jobs."));
  }, []);

  async function handleDelete(job_id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?",
    );
    if (!confirmed) return;
    try {
      await adminDeleteJob(job_id);
      setJobs(jobs.filter((j) => j.job_id !== job_id));
      alert("Job deleted successfully!");
    } catch {
      alert("Failed to delete job.");
    }
  }

  return (
    <>
      <AdminNavbar />
      <div className="jobs-page">
        <h1 className="page-title">
          All Jobs{" "}
          <span
            style={{ fontSize: "18px", color: "#64748b", fontWeight: "400" }}
          >
            ({jobs.length} total)
          </span>
        </h1>
        <div className="jobs-container">
          {jobs.length === 0 ? (
            <p
              style={{ fontSize: "24px", color: "#6b7280", marginTop: "100px" }}
            >
              No jobs found.
            </p>
          ) : (
            jobs.map((job) => (
              <div key={job.job_id} className="admin-job-wrapper">
                <JobCard job={job} showApply={false} />
                <button
                  className="admin-delete-btn"
                  onClick={() => handleDelete(job.job_id)}
                >
                  🗑 Delete Job
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AdminJobs;
