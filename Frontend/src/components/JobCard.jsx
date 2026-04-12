import "../Styles/JobCard.css";
import { useState } from "react";
 
function JobCard({ job, showApply = false, onApply, isApplied, showDelete = false, onDelete }) {
 
    const [showDetails, setShowDetails] = useState(false);
 
    return (
        <>
            <div className="job-card">
                <h3 className="role">{job.jobtitle}</h3>
                <p className="company">{job.company_name}</p>
                <span className="type">{job.job_type}</span>
                <div className="skills">
                    {job.skills_required.split(",").map((skill, index) => (
                        <span key={index} className="skill-tag">
                            {skill.trim()}
                        </span>
                    ))}
                </div>
                <div className="more-info-btn-div">
                    <button
                        className="info-btn"
                        onClick={() => setShowDetails(true)}
                    >
                        More Info
                    </button>
                    {showApply && (
                        <button
                            className="apply-btn"
                            onClick={() => onApply(job)}
                        >
                            {isApplied ? "Applied" : "Apply"}
                        </button>
                    )}
                    {showDelete && (
                        <button
                            className="delete-btn"
                            
                            onClick={() => onDelete(job.job_id)}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
 
            {showDetails && (
                <div className="moreinfo-overlay">
                    <div className="job-modal">
                        <button
                            className="close-btn"
                            onClick={() => setShowDetails(false)}
                        >
                            ✖
                        </button>
                        <div className="jobTitle-date">
                            <h1>{job.jobtitle}</h1>
                            <p className="date">Posted on: {job.created_at}</p>
                        </div>
                        <div className="modal-content">
                            <h2>{job.company_name}</h2>
                            <p><strong>Type:</strong> {job.job_type}</p>
                            <p><strong>Work Mode:</strong> {job.work_mode}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Skills Required:</strong> {job.skills_required}</p>
                            <p><strong>Description:</strong></p>
                            <p>{job.jobdescription}</p>
                            {showApply && (
                                <button
                                    className="modal-apply-btn"
                                    onClick={() => {
                                        onApply(job);
                                        setShowDetails(false);
                                    }}
                                >
                                    {isApplied ? "Already applied for this job" : "Apply"}
                                </button>
                            )}
                            {showDelete && (
                                <button
                                    className="modal-delete-btn"
                                    onClick={() => {
                                        onDelete(job.job_id);
                                        setShowDetails(false);
                                    }}
                                >
                                    Delete This Job
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
 
export default JobCard;