import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HrNav from "../../components/HrNavbar";
import "../../Styles/HrApplications.css";
import { getMyJobs, deleteJob } from "../../Services/api";
import { getApplicationsByJob } from "../../Services/api";
 
const HrApplications = () => {
  const navigate = useNavigate();
  const [hrJobs, setHrJobs] = useState([]);
  const [appCounts, setAppCounts] = useState({});
 
  useEffect(() => {
    getMyJobs()
      .then(async (res) => {
        setHrJobs(res.data);
        // Get application count for each job
        const counts = {};
        for (const job of res.data) {
          try {
            const appRes = await getApplicationsByJob(job.job_id);
            counts[job.job_id] = appRes.data.length;
          } catch {
            counts[job.job_id] = 0;
          }
        }
        setAppCounts(counts);
      })
      .catch(() => alert("Failed to load jobs."));
  }, []);
 
  async function handleDeleteJob(job_id) {
    const confirmed = window.confirm("Are you sure you want to delete this job?");
    if (!confirmed) return;
    try {
      await deleteJob(job_id);
      setHrJobs(hrJobs.filter((job) => job.job_id !== job_id));
      alert("Job deleted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed.");
    }
  }
 
  return (
    <>
      <HrNav />
      <div className="applications-page">
        <h1>Your Jobs</h1>
        {hrJobs.length === 0 ? (
          <div className="noJobsPosted-hr">
            <p>You haven't posted any jobs yet!</p>
          </div>
        ) : (
          <table className="applications-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Job Role</th>
                <th>Applications</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {hrJobs.map((job) => (
                <tr key={job.job_id}>
                  <td>{job.company_name}</td>
                  <td>{job.jobtitle}</td>
                  <td>{appCounts[job.job_id] ?? 0}</td>
                  <td>
                    <button className="view-btn" onClick={() => navigate(`/hr/applications/${job.job_id}`)}>
                      View
                    </button>
                    <button className="deleteJob-btn" onClick={() => handleDeleteJob(job.job_id)}>
                      Delete Job
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
 
export default HrApplications;