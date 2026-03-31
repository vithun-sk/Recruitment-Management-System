import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HrNav from "../../components/HrNavbar";
import "../../Styles/HrApplications.css";
import { jobsData } from "../../assets/Data";


const HrApplications = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const applicationData =
    JSON.parse(localStorage.getItem("applications")) || [];

  const [storedJobs , setStoredJobs] = useState(()=>{
    return JSON.parse(localStorage.getItem("jobs")) || jobsData;
  })

  const hrJobs = storedJobs.filter((job) => job.hr_id === loggedInUser?.id);

  function handleDeleteJob(jobId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?",
    );
    if (!confirmed) return;
    const updatedJobs = storedJobs.filter((job) => job.job_id !== jobId);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setStoredJobs(updatedJobs)
  }

  function getApplicationCount(jobId) {
    return applicationData.filter((app) => app.job_id === jobId).length;
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

            <tbody className="jobs-posted">
              {hrJobs.map((job) => (
                <tr key={job.job_id}>
                  <td>{job.company_name}</td>
                  <td>{job.jobtitle}</td>
                  <td>{getApplicationCount(job.job_id)}</td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() => navigate(`/hr/applications/${job.job_id}`)}
                    >
                      View
                    </button>
                    <button
                      className="deleteJob-btn"
                      onClick={() => handleDeleteJob(job.job_id)}
                    >
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


