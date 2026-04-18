import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import '../Styles/Navbar.css'
 
const AdminNavbar = () => {
    const navigate = useNavigate();
    return (
        <nav className='admin-navBar'>
            <div className='website-name'>
                <h1>Recruit<i style={{ color: '#d97706' }}>Hub</i> <span style={{fontSize:'14px', color:'#d97706', fontWeight:'600'}}>ADMIN</span></h1>
            </div>
            <div className='nav-pages'>
                <NavLink className='list' to='/admin/dashboard'><span>Dashboard</span></NavLink>
                <NavLink className='list' to='/admin/jobs'><span>Jobs</span></NavLink>
                <NavLink className='list' to='/admin/users'><span>Users</span></NavLink>
            </div>
            <div className='admin-nav-profile' onClick={() => {
                localStorage.removeItem('loggedInUser');
                localStorage.removeItem('token');
                navigate('/');
            }}style={{width:'50px', height:'50px',borderRadius:'50%' , display:'flex', justifyContent:'center', alignItems:'center'}}>
                <IoIosLogOut style={{ width: '30px', height: '30px', borderRadius: '50%' }}/>
            </div>
        </nav>
    )
}
 
export default AdminNavbar