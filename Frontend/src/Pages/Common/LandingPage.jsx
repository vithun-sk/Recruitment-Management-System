import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css"
import { FaBriefcase, FaUserTie, FaUserShield,FaArrowRight } from "react-icons/fa";
import Footer from '../../components/Footer';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <nav className='navbar'>
                <h1>Recruit<i style={{color:'#d97706'}}>Hub</i></h1>
            </nav>
            <div>
                <section className='hero-sec'>
                    <h2>Find the Right Talent. Find the Right Job.</h2>
                    <p>
                        A simple recruitment management system that connects companies
                        with talented candidates.
                    </p>
                
                </section>
                <section className='roles-sec'>
                    <h2>Select Your Role to Continue</h2>
                    <div className='roles-cards'>
                        <div className='card' onClick={() => navigate('/login')}>
                            <h3> <FaBriefcase className='icon' style={{marginRight:'8px', color:'#475569'}}/>HR</h3>
                            <p>Post jobs and manage candidates</p>
                        </div>
                        <div className='card' onClick={() => navigate('/login')}>
                            <h3><FaUserTie className='icon' style={{marginRight:'8px', color:'#475569'}} />Candidate</h3>
                            <p>Search and apply for jobs easily</p>
                        </div>
                        <div className='card' onClick={() => navigate('/login')}>
                            <h3><FaUserShield className='icon'  style={{marginRight:'8px', color:'#475569'}}/>Admin</h3>
                            <p>Manage system users and jobs</p>
                        </div>
                    </div>
                </section>
                <section className='features-sec'>
                    <h2 > Platform Features</h2>
                    <div className="feature-list">
                        <div className="feature">
                            <h4>Easy Job Posting</h4>
                            <p>HR can quickly post new job openings.</p>
                        </div>

                        <div className="feature">
                            <h4>Simple Applications</h4>
                            <p>Candidates can apply for jobs with one click.</p>
                        </div>

                        <div className="feature">
                            <h4>Dashboard Management</h4>
                            <p>Admins can manage users and recruitment data.</p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>


        </>
    )
}

export default LandingPage