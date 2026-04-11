import { useState, useEffect } from "react";
import HrNavbar from "../../components/HrNavbar";
import JobCard from "../../components/JobCard.jsx";
import "../../Styles/ManageJobs.css";
import { getAllJobs, createJob } from "../../Services/api";
 
function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newJob, setNewJob] = useState({
    jobtitle: "",
    jobdescription: "",
    job_type: "",
    location: "",
    company_name: "",
    skills_required: "",
    work_mode: "",
  });
 
  useEffect(() => {
    getAllJobs()
      .then((res) => setJobs(res.data))
      .catch(() => alert("Failed to load jobs."));
  }, []);
 
  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };
 
  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createJob(newJob);
      alert("Job Posted Successfully!");
      // Refresh jobs list
      const updated = await getAllJobs();
      setJobs(updated.data);
      setShowForm(false);
      setNewJob({ jobtitle: "", jobdescription: "", job_type: "", location: "", company_name: "", skills_required: "", work_mode: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post job.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
      <HrNavbar />
      <div className="manageJobs-container">
        <div className="jobs-card">
          {jobs.map((job) => (
            <JobCard key={job.job_id} job={job} />
          ))}
        </div>
 
        <button className="post-btn" onClick={() => setShowForm(true)}>
          <span style={{ fontSize: "25px" }}>+</span> Post Job
        </button>
 
        {showForm && (
          <div className="postjob-overlay">
            <form className="job-form" onSubmit={handlePost}>
              <h2>Post New Job</h2>
              <table className="job-table">
                <tbody>
                  <tr>
                    <td>Job Title</td>
                    <td><input name="jobtitle" placeholder="Enter job title" onChange={handleChange} required /></td>
                  </tr>
                  <tr>
                    <td>Company Name</td>
                    <td><input name="company_name" placeholder="Enter company name" onChange={handleChange} required /></td>
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
                    <td><input name="location" placeholder="Enter location" onChange={handleChange} required /></td>
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
                    <td><input name="skills_required" placeholder="React, Node, MySQL" onChange={handleChange} required /></td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td><textarea name="jobdescription" rows="5" placeholder="Enter job description" onChange={handleChange} required /></td>
                  </tr>
                </tbody>
              </table>
              <div className="form-buttons">
                <button type="submit" disabled={loading}>{loading ? "Posting..." : "Post Job"}</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
 
export default ManageJobs;