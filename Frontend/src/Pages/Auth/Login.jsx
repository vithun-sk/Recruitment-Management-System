import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password,
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    if (user.role === "HR") {
      navigate("/hr/dashboard");
    } else if (user.role === "CANDIDATE") {
      navigate("/candidate/dashboard");
    }
  }
  return (
    <>
      <div className="auth-login-page">
        <div className="login-container">
          <section className="login-intro">
            <h1>Welcome Back!</h1>
            <h3>
              Login to Recruit<i style={{ color: "#d97706" }}>Hub</i> to manage
              jobs, applications, and recruitment activities.
            </h3>
          </section>
          <section className="login-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required/>
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
              <button type="submit">Login</button>
            </form>
            <p>
              Don't have an Account?
              <span
                className="signup-page-navi"
                onClick={() => navigate("/signUp")}
              >
                sign up
              </span>
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Login;
