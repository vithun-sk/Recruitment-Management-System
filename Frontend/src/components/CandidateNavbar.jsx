import React from 'react'
import { useNavigate,NavLink } from 'react-router-dom';
import profileImage from '../assets/ProfileImage.png'
import '../Styles/Navbar.css'

const CandidateNavbar = () => {
    const navigate = useNavigate();
    return (
        <>
            <nav className='candidate-navBar'>
                <div className='website-name'>
                    <h1>Recruit<i style={{ color: '#d97706' }}>Hub</i></h1>
                </div>
                <div className='nav-pages'>
                    <NavLink className='list' to='/candidate/dashboard' > <span>Dashboard</span></NavLink>
                    <NavLink className='list' to='/candidate/jobs' ><span>Browse Jobs</span></NavLink>
                    <NavLink className='list' to='/candidate/jobsApplied' ><span>My Applications</span></NavLink>
                </div>
<<<<<<< HEAD
                <NavLink className='nav-profile' to='/profile'>
                    <img src={profileImage} alt="img" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
                </NavLink>
            </nav>
            </>

=======
                <div className='nav-profile'>
                    <img src={profileImage} alt="img" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
                </div>
            </nav></>
>>>>>>> febabfa7e6703aca8db2108dfeecc25d0d05a008
    )
}

export default CandidateNavbar