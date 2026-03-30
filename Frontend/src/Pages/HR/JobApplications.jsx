import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HrNav from "../../components/HrNavbar";
import "../../Styles/HrApplications.css";
<<<<<<< HEAD

const JobApplications = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [applications, setApplications] = useState(() => {
    return JSON.parse(localStorage.getItem("applications") )|| [];
  });
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const jobApplications = applications.filter(
    (app) => app.job_id === Number(jobId),
  );
  function openDetails(app) {
    setSelectedApp(app);
    setShowModal(true);
  }
  function closeModal() {
    setShowModal(false);
    setSelectedApp(null);
  }
  function changeStatus(id, newStatus) {
    const updatedApplications = applications.map((app) =>
      app.application_id === id ? { ...app, status: newStatus } : app,
    );
    localStorage.setItem("applications", JSON.stringify(updatedApplications));
    setApplications(updatedApplications);
    setSelectedApp((prev) => ({
      ...prev,
      status: newStatus,
    }));
  }

  return (
    <>
      <HrNav />
      <div className="applications-page">
        <h1>Applications Received</h1>
        <button
          onClick={() => navigate("/hr/applications")}
          className="back-btn"
        >
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
            {jobApplications.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">
                  No Applications Received
                </td>
              </tr>
            ) : (
              jobApplications.map((app) => (
                <tr key={app.application_id}>
                  <td>{app.candidate_name}</td>
                  <td>{app.applied_date}</td>
                  <td>
                    <span
                      className={`status status-${app.status.toLowerCase()}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="details-btn"
                      onClick={() => openDetails(app)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={closeModal}>
              ✖
            </button>
            <div>
              <h1>Candidate Details</h1>
            </div>
            <table className="app-details-table">
              <tbody>
                <tr>
                  <td className="label">
                    <strong>Name</strong>
                  </td>
                  <td className="label2">{selectedApp.candidate_name}</td>
                </tr>

                <tr>
                  <td className="label">
                    <strong>Email</strong>
                  </td>
                  <td>{selectedApp.candidate_email}</td>
                </tr>

                <tr>
                  <td className="label">
                    <strong>Applied Date</strong>
                  </td>
                  <td>{selectedApp.applied_date}</td>
                </tr>
                <tr>
                  <td className="question" colSpan={2}>
                    <strong>Why should we hire you?</strong>
                  </td>
                </tr>
                <tr>
                  <td className="answer" colSpan={2}>
                    {selectedApp.whyHire}
                  </td>
                </tr>
                <tr>
                  <td className="question" colSpan={2}>
                    <strong>Briefly Describe your Project</strong>
                  </td>
                </tr>
                <tr>
                  <td className="answer" colSpan={2}>
                    {selectedApp.projects}
                  </td>
                </tr>
                <tr>
                  <td className="question" colSpan={2}>
                    <strong>Available to start</strong>
                  </td>
                </tr>
                <tr>
                  <td className="answer" colSpan={2}>
                    {selectedApp.startDate}
                  </td>
                </tr>

                <tr>
                  <td className="label">
                    <strong>Resume</strong>
                  </td>
                  <td>
                    <a
                      href={selectedApp.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resume-anchor-tag"
                    >
                      click here to view resume
                    </a>
                  </td>
                </tr>

                <tr>
                  <td className="label">
                    <strong>Status</strong>
                  </td>
                  <td>
                    <select
                      className="select-status"
                      value={selectedApp.status}
                      onChange={(e) =>
                        changeStatus(selectedApp.application_id, e.target.value)
                      }
                    >
                      <option className="options">Applied</option>
                      <option className="options">Shortlisted</option>
                      <option className="options">Interview</option>
                      <option className="options">Selected</option>
                      <option className="options">Rejected</option>
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
=======
import { applicationsData } from "../../assets/ApplicationsData.js";

const JobApplications = () => {
    const navigate = useNavigate();
    const { jobId } = useParams();
    const [applications, setApplications] = useState(applicationsData);
    const [selectedApp, setSelectedApp] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const jobApplications = applications.filter(
        app => app.job_id === Number(jobId)
    );
    function openDetails(app) {
        setSelectedApp(app);
        setShowModal(true);
    }
    function closeModal() {
        setShowModal(false);
        setSelectedApp(null);
    }
    function changeStatus(id, newStatus) {
        setApplications(prev =>
            prev.map(app =>
                app.application_id === id
                    ? { ...app, status: newStatus }
                    : app
            )
        );
        setSelectedApp(prev => ({
            ...prev,
            status: newStatus
        }));
    }

    return (
        <>
            <HrNav />
            <div className="applications-page">
                <h1>Applications Received</h1>
                <button onClick={() => navigate('/hr/applications')} className="back-btn">&lt;&lt;Back</button>

                <table className="applications-table" >
                    <thead>
                        <tr>
                            <th>Candidate Name</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobApplications.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="no-data">
                                    No Applications Received
                                </td>
                            </tr>
                        ) :

                            (
                                jobApplications.map(app => (
                                    <tr key={app.application_id}>
                                        <td>{app.candidate_name}</td>
                                        <td>{app.applied_date}</td>
                                        <td>
                                            <span className={`status status-${app.status.toLowerCase()}`}>{app.status}</span>
                                        </td>
                                        <td>
                                            <button
                                                className="details-btn"
                                                onClick={() => openDetails(app)}
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>

                                ))
                            )}
                    </tbody>
                </table>

            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <button
                            className="close-btn"
                            onClick={closeModal}
                        >
                            ✖
                        </button>
                        <div>
                            <h1>Candidate Details</h1>
                        </div>
                        <table className="app-details-table">
                            <tbody>
                                <tr>
                                    <td className="label"><strong>Name</strong></td>
                                    <td className="label2">{selectedApp.candidate_name}</td>
                                </tr>

                                <tr>
                                    <td className="label" ><strong>Email</strong></td>
                                    <td>{selectedApp.candidate_email}</td>
                                </tr>

                                <tr>
                                    <td className="label"><strong>Applied Date</strong></td>
                                    <td>{selectedApp.applied_date}</td>
                                </tr>
                                <tr >
                                    <td className="question" colSpan={2} ><strong>Why should we hire you?</strong></td>

                                </tr>
                                <tr >
                                    <td className="answer" colSpan={2}>{selectedApp.whyHire}</td>
                                </tr>
                                <tr >
                                    <td className="question" colSpan={2} ><strong>Briefly Describe your Project</strong></td>

                                </tr>
                                <tr >
                                    <td className="answer" colSpan={2}>{selectedApp.projects}</td>
                                </tr>
                                <tr>
                                    <td className="question" colSpan={2}><strong>Available to start</strong></td>
                                </tr>
                                <tr>
                                    <td className="answer" colSpan={2}>{selectedApp.startDate}</td>
                                </tr>


                                <tr>
                                    <td className="label"><strong>Resume</strong></td>
                                    <td>
                                        <a href={selectedApp.resume} target="_blank" rel="noopener noreferrer" className="resume-anchor-tag" >
                                            click here to view resume
                                        </a>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="label"><strong>Status</strong></td>
                                    <td>
                                        <select className="select-status"
                                            value={selectedApp.status}
                                            onChange={(e) =>
                                                changeStatus(selectedApp.application_id, e.target.value)
                                            }
                                        >
                                            <option className="options">Applied</option>
                                            <option className="options">Shortlisted</option>
                                            <option className="options">Interview</option>
                                            <option className="options">Selected</option>
                                            <option className="options">Rejected</option>
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
>>>>>>> febabfa7e6703aca8db2108dfeecc25d0d05a008
