import { useState } from "react";
import HrNavbar from "../../components/HrNavbar";
import { jobsData } from "../../assets/Data.js";
import JobCard from "../../components/JobCard.jsx";
import "../../Styles/ManageJobs.css";

function ManageJobs() {

  const [jobs, setJobs] = useState(jobsData);
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({
    jobtitle: "",
    jobdescription: "",
    job_type: "",
    location: "",
    company_name: "",
    skills_required: "",
    work_mode: "",
    created_at: "",
    hr_id: 101
  });

  const handleChange = (e) => {
    setNewJob({
      ...newJob,
      [e.target.name]: e.target.value
    });
  };

  const handlePost = (e) => {
    e.preventDefault();
    setJobs([...jobs, newJob]);
    setShowForm(false);
  };

  return (
    <>
      <HrNavbar />
      <div className="manageJobs-container">
        <div className="jobs-card">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <button
          className="post-btn"
          onClick={() => setShowForm(true)}
        >
          <span style={{ fontSize: '25px' }}>+</span> Post Job
        </button>

        {showForm && (
          <div className="postjob-overlay">

            <form className="job-form" onSubmit={handlePost}>

              <h2>Post New Job</h2>

              <table className="job-table">

                <tbody>

                  <tr>
                    <td>Job Title</td>
                    <td>
                      <input
                        name="jobtitle"
                        placeholder="Enter job title"
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Company Name</td>
                    <td>
                      <input
                        name="company_name"
                        placeholder="Enter company name"
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Job Type</td>
                    <td>
                      <select name="job_type" onChange={handleChange} required>
                        <option value="">Select Job Type</option>
                        <option value="Internship">Internship</option>
                        <option value="Fulltime">Fulltime</option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td>Location</td>
                    <td>
                      <input
                        name="location"
                        placeholder="Enter location"
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Work Mode</td>
                    <td>
                      <select name="work_mode" onChange={handleChange} required>
                        <option value="">Select Work Mode</option>
                        <option value="Remote">Remote</option>
                        <option value="Onsite">Onsite</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td>Skills</td>
                    <td>
                      <input
                        name="skills_required"
                        placeholder="React, Node, MongoDB"
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Description</td>
                    <td>
                      <textarea
                        name="jobdescription"
                        rows="5"
                        placeholder="Enter job description"
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td><input type="date"  name="created_at" onChange={handleChange} /></td>
                  </tr>

                </tbody>

              </table>

              <div className="form-buttons">
                <button type="submit">Post Job</button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        )}
      </div>
    </>
  );
}


export default ManageJobs;