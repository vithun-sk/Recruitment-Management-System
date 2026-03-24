import { useState } from "react";
import JobCard from "../../components/JobCard.jsx";
import { jobsData } from "../../assets/Data.js";
import CandidateNav from "../../components/CandidateNavbar.jsx";
import "../../Styles/Showjobs.css";

function ShowJobs() {
    
    const [jobs, setJobs] = useState(jobsData);
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState([]);

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
    }
    function handleSubmit(e) {
        e.preventDefault();
        setAppliedJobs(prev => [...prev, selectedJob.job_id]);
        alert("Application submitted successfully!");
        setShowApplyForm(false);
        setSelectedJob(null);
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
                        <button
                            className="close-btn"
                            onClick={closeApplyForm}
                        >
                            ✖
                        </button>

                        <h2>Apply for {selectedJob.jobtitle}</h2>
                        <h3>{selectedJob.company_name}</h3>

                        <form className="apply-form" onSubmit={handleSubmit}>

                            <label>Why should we hire you?</label>
                            <textarea required></textarea>

                            <label>When can you start?</label>
                            <input required type="text" />

                            <label>Briefly describe about your projects</label>
                            <textarea required></textarea>

                            <label>Upload Resume</label>
                            <input required type="file" />

                            <button className="submit-btn">
                                Submit Application
                            </button>

                        </form>

                    </div>

                </div>

            )}

        </>
    );
}

export default ShowJobs;