import React from "react";
import CandidateNav from "../../components/CandidateNavbar.jsx";
import Footer from "../../components/Footer";
import "../../Styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const HrDashBoard = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const allApps = JSON.parse(localStorage.getItem("applications")) || [];
  const myAppsCount = allApps.filter(
    (a) => a.candidate_email === loggedInUser?.email,
  ).length;

  const stats = [
    { label: "Total Jobs in Portal ", value: "1023" },
    { label: "Candidates Hired ", value: "800" },
    { label: "Jobs You Applied", value: myAppsCount },
  ];
  return (
    <>
      <CandidateNav />
      <div className="cand-dashboard">
        <section className="cand-dash-welcome">
          <h1>Welcome Candidate!</h1>
          <p>Explore new opportunities tailored for your skills.</p>
        </section>

        <section className="cand-dash-cards">
          {stats.map((Card, index) => (
            <div className="cannd-dash-card">
              <span className="hr-dash-card-label">{Card.label}</span>
              <span className="hr-dash-card-value">{Card.value}</span>
            </div>
          ))}
        </section>

        <section className="cand-dash-btns">
          <div className="cand-button-actions">
            <button
              className="postJob-btn"
              onClick={() => navigate("/candidate/jobs")}
            >
              Browse All Jobs
            </button>
            <button
              className="reviewApp-btn"
              onClick={() => navigate("/candidate/jobsApplied")}
            >
              My Applications
            </button>
          </div>
        </section>

        <section>
          <h2 className="cand-about">
            About Recruit<i style={{ color: "#d97706" }}>Hub</i>
          </h2>
          <div className="cand-dash-intro">
            <article className="cand-intro">
              <p>
                RecruitHub is designed to put the power back in your hands. We
                bridge the gap between your unique skills and top-tier employers
                by offering a <strong>centralized hub</strong> for your
                professional growth. No more guessing—manage every application,
                follow-up, and offer in one unified space.
              </p>

              <p>
                Our <strong>Live Application Tracking</strong> removes the
                "black hole" of the job hunt. You will receive instant
                transparency as your profile moves through the pipeline. From
                the moment you click apply to the final interview stage, you
                stay informed with real-time status updates and direct feedback.
              </p>
            </article>
            <article className="cand-features-sec">
              <ul className="cand-features">
                <li>✦ Centralized System</li>
                <li>✦ Live Status Updates</li>
                <li>✦ Application History</li>
                <li>✦ One-Click Quick Apply</li>
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
