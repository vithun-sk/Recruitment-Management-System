import React from 'react'
import './SignUp.css';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const navigate = useNavigate();
    return (
        <div className='auth-signup-page'>
            <div className='signup-container'>
                <section className='signup-form'>
                    <h1>Create Account</h1>
                    <form action="">
                        <input type="text" placeholder=" Enter Full Name" />
                        <input type="email" placeholder=" Enter email" />
                        <input type="password" placeholder=" Enter password" />
                        <input type="tel" placeholder=" Enter Mobile number" maxLength={10} />
                        <input type="text" placeholder="Enter city" />
                        <div className='role-selection'>
                            <label className='role-option'>
                                <input type="radio" name='role' value="HR" /> HR
                            </label>
                            <label className='role-option'>
                                <input type="radio" name='role' value="CANDIDATE" /> Candidate
                            </label>
                        </div>
                        <button>Create Account</button>
                    </form>
                    <p>Already have an account? <span className='login-page-navi' onClick={() => navigate('/login')}>Login</span></p>

                </section>
                <section className='signup-intro'>
                    <h1> Start Your Journey with Recruit<i style={{ color: '#d97706' }}>Hub</i> </h1>
                    <h3>Create your account today to explore job opportunities,
                        manage applications, and simplify recruitment.</h3>
                </section>
            </div>
        </div>
    )
}

export default SignUp;