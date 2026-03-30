import React from 'react'
import CandidateNav from '../../components/CandidateNavbar.jsx'
import '../../Styles/JobsApplied.css'

const JobsApplied = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const allApplications = JSON.parse(localStorage.getItem("applications")) || [];
    const myApplications = allApplications.filter(
        app => app.candidate_email === loggedInUser?.email
    );

    return (
        <>
            <CandidateNav />
            <div className='jobsapplied-page'>
                <h1 className='jobsapplied-title'>My Applications</h1>

                {myApplications.length === 0 ? (
                    <div className='no-applications'>
                        <p>You haven't applied for any jobs yet!</p>
                    </div>
                ) : (
                    <table className='jobsapplied-table'>
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Company</th>
                                <th>Applied Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myApplications.map(app => (
                                <tr key={app.application_id}>
                                    <td>{app.jobtitle}</td>
                                    <td>{app.company_name}</td>
                                    <td>{app.applied_date}</td>
                                    <td>
                                        <span className={`status status-${app.status.toLowerCase()}`}>
                                            {app.status}
                                        </span>
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

export default JobsApplied