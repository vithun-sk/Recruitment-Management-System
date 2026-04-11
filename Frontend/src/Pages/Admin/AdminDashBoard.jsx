import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import "../../Styles/Dashboard.css";
import { adminGetAllUsers, adminGetAllJobs } from "../../Services/api";

const AdminDashboard = () => {
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalHR, setTotalHR] = useState(0);
  const [totalCandidates, setTotalCandidates] = useState(0);

  useEffect(() => {
    adminGetAllJobs()
      .then((res) => setTotalJobs(res.data.length))
      .catch(() => {});

    adminGetAllUsers()
      .then((res) => {
        const hrs = res.data.filter((u) => u.role === "HR").length;
        const candidates = res.data.filter(
          (u) => u.role === "CANDIDATE",
        ).length;
        setTotalHR(hrs);
        setTotalCandidates(candidates);
      })
      .catch(() => {});
  }, []);

  const stats = [
    { label: "Total Jobs Posted", value: totalJobs },
    { label: "Total HR Users", value: totalHR },
    { label: "Total Candidates", value: totalCandidates },
  ];

  return (
    <>
      <AdminNavbar />
      <div className="hr-dashboard">
        <section className="hr-dash-welcome">
          <h1>Admin Dashboard</h1>
          <p>
            Manage all jobs, users and recruitment activities from one place.
          </p>
        </section>

        <section className="hr-dash-cards">
          {stats.map((card, index) => (
            <div className="hr-dash-card" key={index}>
              <span className="hr-dash-card-label">{card.label}</span>
              <span className="hr-dash-card-value">{card.value}</span>
            </div>
          ))}
        </section>

        <section>
          <h2 className="hr-about">
            About Recruit<i style={{ color: "#d97706" }}>Hub</i>
          </h2>
          <div className="hr-dash-intro">
            <article className="hr-intro">
              <p>
                RecruitHub is a centralized recruitment management platform that
                connects HR professionals with talented candidates. As an Admin,
                you have full control over the entire system — manage job
                postings, monitor user activity, and ensure the platform runs
                smoothly.
              </p>
              <p>
                Use the <strong>Jobs</strong> section to view and delete any job
                posted on the platform. Use the <strong>Users</strong> section
                to view all registered HR and Candidate accounts and remove any
                user if needed.
              </p>
            </article>
            <article className="hr-features-sec">
              <ul className="hr-features">
                <li>✦ Full System Control</li>
                <li>✦ Manage All Jobs</li>
                <li>✦ Manage All Users</li>
                <li>✦ Real-Time Stats</li>
              </ul>
            </article>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
