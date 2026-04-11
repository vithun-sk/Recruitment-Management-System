import { useState, useEffect } from "react";
import JobCard from "../../components/JobCard.jsx";
import CandidateNav from "../../components/CandidateNavbar.jsx";
import "../../Styles/Showjobs.css";
import { getAllJobs, applyForJob, getMyApplications } from "../../Services/api";
 
function ShowJobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyForm, setApplyForm] = useState({
    whyHire: "",
    startDate: "",
    projects: "",
    resume: null,
  });
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    // Fetch all jobs
    getAllJobs()
      .then((res) => setJobs(res.data))
      .catch(() => alert("Failed to load jobs."));
 
    // Fetch already applied job IDs
    getMyApplications()
      .then((res) => {
        // We need job_ids — fetch from applications
        // Since getMyApplications returns joined data with job info,
        // we store appli_id + job info, so let's track by job title + company for now
        // Better: fetch applied job_ids separately
        setAppliedJobIds(res.data.map((a) => a.job_id));
      })
      .catch(() => {});
  }, []);
 
  function handleApply(job) {
    if (appliedJobIds.includes(job.job_id)) {
      alert("You have already applied for this job.");
      return;
    }
    setSelectedJob(job);
    setShowApplyForm(true);
  }
 
  function closeApplyForm() {
    setShowApplyForm(false);
    setSelectedJob(null);
    setApplyForm({ whyHire: "", startDate: "", projects: "", resume: null });
  }
 
  function handleFormChange(e) {
    setApplyForm({ ...applyForm, [e.target.name]: e.target.value });
  }
 
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
 
    const formData = new FormData();
    formData.append("job_id", selectedJob.job_id);
    formData.append("why_should_hire", applyForm.whyHire);
    formData.append("briefly_describe_your_project", applyForm.projects);
    formData.append("when_you_join", applyForm.startDate);
    formData.append("resume", applyForm.resume);
 
    try {
      await applyForJob(formData);
      alert("Application submitted successfully!");
      setAppliedJobIds([...appliedJobIds, selectedJob.job_id]);
      closeApplyForm();
    } catch (err) {
      alert(err.response?.data?.message || "Application failed.");
    } finally {
      setLoading(false);
    }
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
              isApplied={appliedJobIds.includes(job.job_id)}
            />
          ))}
        </div>
      </div>
 
      {showApplyForm && (
        <div className="apply-overlay">
          <div className="apply-modal">
            <button className="close-btn" onClick={closeApplyForm}>✖</button>
            <h2>Apply for {selectedJob.jobtitle}</h2>
            <h3>{selectedJob.company_name}</h3>
            <form className="apply-form" onSubmit={handleSubmit}>
              <label>Why should we hire you?</label>
              <textarea name="whyHire" required onChange={handleFormChange}></textarea>
 
              <label>When can you start?</label>
              <input name="startDate" type="date" required onChange={handleFormChange} />
 
              <label>Briefly describe about your projects</label>
              <textarea name="projects" required onChange={handleFormChange}></textarea>
 
              <label>Upload Resume (PDF)</label>
              <input
                required
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setApplyForm({ ...applyForm, resume: e.target.files[0] })}
              />
 
              <button className="submit-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
 
export default ShowJobs;