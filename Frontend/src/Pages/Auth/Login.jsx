import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/api";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "12345";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // ── Admin check FIRST (no API call needed) ──
    if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
      localStorage.setItem("loggedInUser", JSON.stringify({ name: "Admin", role: "ADMIN", email: ADMIN_EMAIL }));
      navigate("/admin/dashboard");
      return;
    }

    // ── HR / Candidate login ──
    setLoading(true);
    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));
      if (res.data.user.role === "HR") navigate("/hr/dashboard");
      else if (res.data.user.role === "CANDIDATE") navigate("/candidate/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-login-page">
      <div className="login-container">
        <section className="login-intro">
          <h1>Welcome Back!</h1>
          <h3>Login to Recruit<i style={{ color: "#d97706" }}>Hub</i> to manage jobs, applications, and recruitment activities.</h3>
        </section>
        <section className="login-form">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
          </form>
          <p>Don't have an Account? <span className="signup-page-navi" onClick={() => navigate("/signUp")}>sign up</span></p>
        </section>
      </div>
    </div>
  );
};

export default Login;