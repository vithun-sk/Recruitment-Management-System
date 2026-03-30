import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    role: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.role) {
      alert("Please select a role (HR or Candidate)");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = existingUsers.find(
      (user) => user.email === formData.email,
    );
    if (emailExists) {
      alert("Email already registered. Please login.");
      return;
    }
    const newUser = { ...formData, id: Date.now() };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    alert("Account has been created successfully! Please login.");
    navigate("/login");
  }
  return (
    <div className="auth-signup-page">
      <div className="signup-container">
        <section className="signup-form">
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder=" Enter Full Name" onChange={handleChange}required />
            <input type="email" name="email" placeholder=" Enter email" onChange={handleChange} required/>
            <input type="password" name="password" placeholder=" Enter password" onChange={handleChange} required />
            <input
              type="tel"
              name="phone"
              placeholder=" Enter Mobile number"
              minLength={10}
              maxLength={10}
              onChange={handleChange} 
              required
            />
            <input type="text" name="city" placeholder="Enter city" onChange={handleChange} required />
            <div className="role-selection">
              <label className="role-option">
                <input type="radio" name="role" value="HR"onChange={handleChange}  /> HR
              </label>
              <label className="role-option">
                <input type="radio" name="role" value="CANDIDATE" onChange={handleChange} /> Candidate
              </label>
            </div>
            <button type="submit">Create Account</button>
          </form>
          <p>
            Already have an account?{" "}
            <span
              className="login-page-navi"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </section>
        <section className="signup-intro">
          <h1>
            {" "}
            Start Your Journey with Recruit
            <i style={{ color: "#d97706" }}>Hub</i>{" "}
          </h1>
          <h3>
            Create your account today to explore job opportunities, manage
            applications, and simplify recruitment.
          </h3>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
