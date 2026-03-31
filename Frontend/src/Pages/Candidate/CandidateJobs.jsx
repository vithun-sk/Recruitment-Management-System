import { useState } from "react";
import JobCard from "../../components/JobCard.jsx";
import { jobsData } from "../../assets/Data.js";
import CandidateNav from "../../components/CandidateNavbar.jsx";
import "../../Styles/Showjobs.css";

function ShowJobs() {
  const [jobs, setJobs] = useState(() => {
    const storedjobs = localStorage.getItem("jobs");
    return storedjobs ? JSON.parse(storedjobs) : jobsData;
  });

  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyForm, setApplyForm] = useState({
    whyHire: "",
    startDate: "",
    projects: "",
    resume: "",
  });

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const allApplications =
    JSON.parse(localStorage.getItem("applications")) || [];

  const appliedJobs = allApplications
    .filter((a) => a.candidate_email === loggedInUser?.email)
    .map((a) => a.job_id);

  function handleApply(job) {
    if (appliedJobs.includes(job.job_id)) {
      alert("You have already applied for this job.");
      return;
    }
    setSelectedJob(job);
    setShowApplyForm(true);
  }

  function closeApplyForm() {
    setShowApplyForm(false);
    setSelectedJob(null);
    setApplyForm({ whyHire: "", startDate: "", projects: "", resume: "" });
  }

  function handleFormchange(e) {
    setApplyForm({ ...applyForm, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newApplication = {
      application_id: Date.now(),
      job_id: selectedJob.job_id,
      hr_id: selectedJob.hr_id,
      jobtitle: selectedJob.jobtitle,
      company_name: selectedJob.company_name,
      candidate_name: loggedInUser.name,
      candidate_email: loggedInUser.email,
      applied_date: new Date().toLocaleDateString(),
      whyHire: applyForm.whyHire,
      startDate: applyForm.startDate,
      projects: applyForm.projects,
      resume: applyForm.resume,
      status: "Applied",
    };

    const existingApp = JSON.parse(localStorage.getItem("applications")) || [];
    existingApp.push(newApplication);
    localStorage.setItem("applications", JSON.stringify(existingApp));
    alert("Application submitted successfully!");
    closeApplyForm();
  }

  return (
    <>
      <CandidateNav />
      <div className="jobs-page">
        <h1 className="page-title">Available Jobs</h1>
        <div className="jobs-container">
          {jobs.map((job) => (
            <JobCard
              key={job.job_id}
              job={job}
              showApply={true}
              onApply={handleApply}
              isApplied={appliedJobs.includes(job.job_id)}
            />
          ))}
        </div>
      </div>

      {showApplyForm && (
        <div className="apply-overlay">
          <div className="apply-modal">
            <button className="close-btn" onClick={closeApplyForm}>
              ✖
            </button>

            <h2>Apply for {selectedJob.jobtitle}</h2>
            <h3>{selectedJob.company_name}</h3>

            <form className="apply-form" onSubmit={handleSubmit}>
              <label>Why should we hire you?</label>
              <textarea
                name="whyHire"
                required
                onChange={handleFormchange}
              ></textarea>

              <label>When can you start?</label>
              <input
                name="startDate"
                required
                type="text"
                onChange={handleFormchange}
              />

              <label>Briefly describe about your projects</label>
              <textarea
                name="projects"
                required
                onChange={handleFormchange}
              ></textarea>

              <label>Upload Resume</label>
              <input
                required
                type="file"
                onChange={(e) =>
                  setApplyForm({
                    ...applyForm,
                    resume: e.target.files[0]?.name || "",
                  })
                }
              />

              <button className="submit-btn">Submit Application</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowJobs;
