import { useState } from "react";
import { jobsData } from "../../assets/Data.js";
import "../../Styles/HrApplications.css";

function Applications() {

  const hrId = "hr1";

  const [jobs,setJobs] = useState(jobsData);

  const hrJobs = jobs.filter(job => job.hrId === hrId);

  const deleteJob = (id) => {

    const updated = jobs.filter(job => job.id !== id);
    setJobs(updated);
  };

  return (

    <div className="app-container">

      <h1>Your Posted Jobs</h1>

      {hrJobs.map((job) => (

        <div className="app-card" key={job.id}>

          <h3>{job.role}</h3>

          <p>{job.skills}</p>

          <button className="view-btn">
            View Applications
          </button>

          <button
            className="delete-btn"
            onClick={()=>deleteJob(job.id)}
          >
            Delete
          </button>

        </div>

      ))}

    </div>
  );
}

export default Applications;