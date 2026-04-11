import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from "./Pages/Common/LandingPage.jsx";
import Login from "./Pages/Auth/Login.jsx";
import SignUp from "./Pages/Auth/Sign-up.jsx";
import HrDashboard from "./Pages/HR/HrDashBoard.jsx";
import HrJobs from "./Pages/HR/HrJobs.jsx";
import HrApplications from "./Pages/HR/HrApplications.jsx";
import JobApplications from "./Pages/HR/JobApplications.jsx";
import CandidateDashboard from "./Pages/Candidate/CandidateDashboard.jsx";
import CandidateJobs from "./Pages/Candidate/CandidateJobs.jsx";
import CandidateJobsApplied from "./Pages/Candidate/JobsApplied.jsx";
import ProfilePage from './Pages/Common/ProfilePage.jsx';
import AdminDashboard from './Pages/Admin/AdmindashBoard.jsx';
import AdminJobs from './Pages/Admin/Adminjobs.jsx';
import AdminUsers from './Pages/Admin/Adminusers.jsx';
 
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/hr/dashboard" element={<HrDashboard />} />
      <Route path="/hr/jobs" element={<HrJobs />} />
      <Route path="/hr/applications" element={<HrApplications />} />
      <Route path="/hr/applications/:jobId" element={<JobApplications />} />
      <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
      <Route path="/candidate/jobs" element={<CandidateJobs />} />
      <Route path="/candidate/jobsApplied" element={<CandidateJobsApplied />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/jobs" element={<AdminJobs />} />
      <Route path="/admin/users" element={<AdminUsers />} />
    </Routes>
  );
}
 
export default App;