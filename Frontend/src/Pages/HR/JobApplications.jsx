import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HrNav from "../../components/HrNavbar";
import "../../Styles/HrApplications.css";
import { getApplicationsByJob, updateApplicationStatus } from "../../Services/api";
 
const JobApplications = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);
 
  useEffect(() => {
    getApplicationsByJob(jobId)
      .then((res) => setApplications(res.data))
      .catch(() => alert("Failed to load applications."));
  }, [jobId]);
 
  function openDetails(app) {
    setSelectedApp(app);
    setShowModal(true);
  }
 
  function closeModal() {
    setShowModal(false);
    setSelectedApp(null);
  }
 
  async function changeStatus(appli_id, newStatus) {
    try {
      await updateApplicationStatus(appli_id, newStatus);
      const updated = applications.map((app) =>
        app.appli_id === appli_id ? { ...app, status: newStatus } : app
      );
      setApplications(updated);
      setSelectedApp((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      alert("Failed to update status.");
    }
  }
 
  return (
    <>
      <HrNav />
      <div className="applications-page">
        <h1>Applications Received</h1>
        <button onClick={() => navigate("/hr/applications")} className="back-btn">
          &lt;&lt;Back
        </button>
        <table className="applications-table">
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">No Applications Received</td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app.appli_id}>
                  <td>{app.candidate_name}</td>
                  <td>{app.applied_date}</td>
                  <td>
                    <span className={`status status-${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <button className="details-btn" onClick={() => openDetails(app)}>
                      Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
 
      {showModal && selectedApp && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={closeModal}>✖</button>
            <h1>Candidate Details</h1>
            <table className="app-details-table">
              <tbody>
                <tr>
                  <td className="label"><strong>Name</strong></td>
                  <td>{selectedApp.candidate_name}</td>
                </tr>
                <tr>
                  <td className="label"><strong>Email</strong></td>
                  <td>{selectedApp.candidate_email}</td>
                </tr>
                <tr>
                  <td className="label"><strong>Phone</strong></td>
                  <td>{selectedApp.mobile_num}</td>
                </tr>
                <tr>
                  <td className="label"><strong>Applied Date</strong></td>
                  <td>{selectedApp.applied_date}</td>
                </tr>
                <tr>
                  <td className="question" colSpan={2}><strong>Why should we hire you?</strong></td>
                </tr>
                <tr>
                  <td className="answer" colSpan={2}>{selectedApp.why_should_hire}</td>
                </tr>
                <tr>
                  <td className="question" colSpan={2}><strong>Briefly Describe your Project</strong></td>
                </tr>
                <tr>
                  <td className="answer" colSpan={2}>{selectedApp.briefly_describe_your_project}</td>
                </tr>
                <tr>
                  <td className="question" colSpan={2}><strong>Available to start</strong></td>
                </tr>
                <tr>
                  <td className="answer" colSpan={2}>{selectedApp.when_you_join}</td>
                </tr>
                <tr>
                  <td className="label"><strong>Resume</strong></td>
                  <td>
                    <a
                      href={`http://localhost:5000/uploads/${selectedApp.resume_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resume-anchor-tag"
                    >
                      Click here to view resume
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="label"><strong>Status</strong></td>
                  <td>
                    <select
                      className="select-status"
                      value={selectedApp.status}
                      onChange={(e) => changeStatus(selectedApp.appli_id, e.target.value)}
                    >
                      <option>Applied</option>
                      <option>Shortlisted</option>
                      <option>Interview</option>
                      <option>Selected</option>
                      <option>Rejected</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
 
export default JobApplications;