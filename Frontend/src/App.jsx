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



function App () {
  return (
    <Routes>
        <Route path ="/" element ={<LandingPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />        
        <Route path="/hr/dashboard" element={<HrDashboard />} />        
        <Route path="/hr/jobs" element={<HrJobs />} />        
        <Route path="/hr/applications" element={<HrApplications />} />        
        <Route path="/hr/applications/:jobId" element={<JobApplications />} />        
        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />        
        <Route path="/candidate/jobs" element={<CandidateJobs />} />        
        <Route path="/candidate/jobsApplied" element={<CandidateJobsApplied />} />        
    </Routes>
  )
}

export default App