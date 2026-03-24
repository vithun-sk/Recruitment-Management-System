import React from "react";
import { useNavigate } from "react-router-dom";
import HrNav from "../../components/HrNavbar";
import "../../Styles/HrApplications.css";
import { jobsData } from "../../assets/Data";
import { applicationsData } from "../../assets/ApplicationsData";

const HrApplications = () => {

  const navigate = useNavigate();
  const hrId = 101;
  const storedJobs = JSON.parse(localStorage.getItem("jobs")) || jobsData;
  const hrJobs = storedJobs.filter(job => job.hr_id === hrId);
  function getApplicationCount(jobId) {
    return applicationsData.filter(app => app.job_id === jobId).length;
  }

  return (
    <>
      <HrNav />
      <div className="applications-page">
        <h1>Your Jobs</h1>
        <table className="applications-table" >
          <thead>
            <tr>
              <th>Company</th>
              <th>Job Role</th>
              <th>Applications</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hrJobs.map(job => (

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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HrApplications;