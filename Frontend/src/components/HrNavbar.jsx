import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import profileImage from '../assets/ProfileImage.png'
import '../Styles/Navbar.css'

const HrNavbar = () => {
    const navigate = useNavigate();
    return (
        <>
            <nav className='hr-navBar'>
                <div className='website-name'>
                    <h1>Recruit<i style={{ color: '#d97706' }}>Hub</i></h1>
                </div>
                <div className='nav-pages'>
                    <NavLink className='list' to='/hr/dashboard' > <span>Dashboard</span></NavLink>
                    <NavLink className='list' to='/hr/jobs' ><span>Manage Jobs</span></NavLink>
                    <NavLink className='list' to='/hr/applications' ><span>Applications</span></NavLink>
                </div>
<<<<<<< HEAD
                <NavLink className='nav-profile' to='/profile'>
                    <img src={profileImage} alt="img" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
                </NavLink>
=======
                <div className='nav-profile'>
                    <img src={profileImage} alt="img" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
                </div>
>>>>>>> febabfa7e6703aca8db2108dfeecc25d0d05a008
            </nav>

        </>
    )
}

export default HrNavbar