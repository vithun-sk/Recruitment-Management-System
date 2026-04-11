import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import '../../Styles/HrApplications.css'
import '../../Styles/Admin.css'
import { adminGetAllUsers, adminDeleteUser } from '../../Services/api'
 
const AdminUsers = () => {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState('ALL') // ALL, HR, CANDIDATE
 
    useEffect(() => {
        adminGetAllUsers()
            .then(res => setUsers(res.data))
            .catch(() => alert('Failed to load users.'))
    }, [])
 
    async function handleDelete(userid) {
        const confirmed = window.confirm('Are you sure you want to delete this user? This will also delete all their jobs and applications.')
        if (!confirmed) return
        try {
            await adminDeleteUser(userid)
            setUsers(users.filter(u => u.userid !== userid))
            alert('User deleted successfully!')
        } catch {
            alert('Failed to delete user.')
        }
    }
 
    const filteredUsers = filter === 'ALL' ? users : users.filter(u => u.role === filter)
 
    return (
        <>
            <AdminNavbar />
            <div className='applications-page'>
                <h1>All Users <span style={{fontSize:'18px', color:'#64748b', fontWeight:'400'}}>({users.length} total)</span></h1>
 
                {/* Filter Buttons */}
                <div className='admin-filter-btns'>
                    {['ALL', 'HR', 'CANDIDATE'].map(f => (
                        <button
                            key={f}
                            className={`admin-filter-btn ${filter === f ? 'active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f} {f === 'ALL' ? `(${users.length})` : f === 'HR' ? `(${users.filter(u => u.role === 'HR').length})` : `(${users.filter(u => u.role === 'CANDIDATE').length})`}
                        </button>
                    ))}
                </div>
 
                {filteredUsers.length === 0 ? (
                    <div className='noJobsPosted-hr'><p>No users found.</p></div>
                ) : (
                    <table className='applications-table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>City</th>
                                <th>Role</th>
                                <th>Registered</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user.userid}>
                                    <td>{index + 1}</td>
                                    <td><strong>{user.name}</strong></td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile_num}</td>
                                    <td>{user.city}</td>
                                    <td>
                                        <span className={`admin-role-badge ${user.role === 'HR' ? 'badge-hr' : 'badge-candidate'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{user.register_date}</td>
                                    <td>
                                        <button
                                            className='deleteJob-btn'
                                            onClick={() => handleDelete(user.userid)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}
 
export default AdminUsers