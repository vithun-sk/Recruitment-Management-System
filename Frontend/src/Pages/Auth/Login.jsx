import React from 'react'
import './login.css'
import {  useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='auth-login-page'>
        <div className='login-container'>
          <section className='login-intro'>
            <h1>Welcome Back!</h1>
            <h3>Login to Recruit<i style={{ color: '#d97706' }}>Hub</i> to manage jobs,
              applications, and recruitment activities.</h3>
          </section>
          <section className='login-form'>
            <h1>Login</h1>
            <form action="">
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password' />
                <button onClick={()=>navigate('/hr/dashboard')}>Login</button>
            </form>
            <p>Don't have an Account? <span className='signup-page-navi' onClick={()=>navigate('/signup')}>sign up</span></p>
          </section>
        </div>
      </div>
    </>
  )
}

export default Login;