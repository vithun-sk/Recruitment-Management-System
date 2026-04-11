import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import profileImage from '../assets/ProfileImage.png'
import '../Styles/Navbar.css'
 
const AdminNavbar = () => {
    const navigate = useNavigate();
    return (
        <nav className='hr-navBar'>
            <div className='website-name'>
                <h1>Recruit<i style={{ color: '#d97706' }}>Hub</i> <span style={{fontSize:'14px', color:'#d97706', fontWeight:'600'}}>ADMIN</span></h1>
            </div>
            <div className='nav-pages'>
                <NavLink className='list' to='/admin/dashboard'><span>Dashboard</span></NavLink>
                <NavLink className='list' to='/admin/jobs'><span>Jobs</span></NavLink>
                <NavLink className='list' to='/admin/users'><span>Users</span></NavLink>
            </div>
            <div className='nav-profile' onClick={() => {
                localStorage.removeItem('loggedInUser');
                localStorage.removeItem('token');
                navigate('/');
            }} style={{cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', color:'#f1f5f9', fontSize:'16px'}}>
                <img src={profileImage} alt="img" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
            </div>
        </nav>
    )
}
 
export default AdminNavbar