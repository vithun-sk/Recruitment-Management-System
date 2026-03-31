import React from "react";
import HrNav from "../../components/HrNavbar.jsx";
import Footer from "../../components/Footer";
import "../../Styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { jobsData } from "../../assets/Data.js";


const HrDashBoard = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const allJobs = JSON.parse(localStorage.getItem("jobs")) || jobsData;
  const myJobsCount = allJobs.filter(
    (j) => j.hr_id === loggedInUser?.id,
  ).length;
  const stats = [
    { label: "Total Jobs in Portal ", value: "1023" },
    { label: "Candidates Hired ", value: "800" },
    { label: "Jobs Posted by You ", value: myJobsCount },
  ];
  return (
    <>
      <HrNav />
      <div className="hr-dashboard">
        <section className="hr-dash-welcome">
          <h1>Welcome HR!</h1>
          <p>Your recruitment pipeline is looking healthy today.</p>
        </section>

        <section className="hr-dash-cards">
          {stats.map((Card, index) => (
            <div className="hr-dash-card">
              <span className="hr-dash-card-label">{Card.label}</span>
              <span className="hr-dash-card-value">{Card.value}</span>
            </div>
          ))}
        </section>

        <section className="hr-dash-btns">
          <div className="hr-button-actions">
            <button
              className="postJob-btn"
              onClick={() => navigate("/hr/jobs")}
            >
              Post a New Job
            </button>
            <button
              className="reviewApp-btn"
              onClick={() => navigate("/hr/applications")}
            >
              Review Applications
            </button>
          </div>
        </section>

        <section>
          <h2 className="hr-about">
            About Recruit<i style={{ color: "#d97706" }}>Hub</i>
          </h2>
          <div className="hr-dash-intro">
            <article className="hr-intro">
              <p>
                RecruitHub acts as your single source of truth for the entire
                recruitment lifecycle. By <strong>centralizing</strong> every
                job post and applicant interaction, we eliminate the need for
                messy spreadsheets and scattered emails.
              </p>

              <p>
                Our <strong>Real-Time Status Tracking</strong> system ensures
                you never lose sight of a top-tier candidate. Monitor every
                stage-from the initial application to the final offer-with a
                transparent pipeline designed for speed and precision.
              </p>
            </article>
            <article className="hr-features-sec">
              <ul className="hr-features">
                <li>✦ Centralized System</li>
                <li>✦ Live Status Updates</li>
                <li>✦ Automated Workflows</li>
                <li>✦ End-to-End Pipeline</li>
              </ul>
            </article>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HrDashBoard;
