import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from "./Pages/Common/LandingPage.jsx";
import Login from "./Pages/Auth/Login.jsx";
import SignUp from "./Pages/Auth/Sign-up.jsx"



function App () {
  return (
    <Routes>
        <Route path ="/" element ={<LandingPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
    </Routes>
  )
}

export default App