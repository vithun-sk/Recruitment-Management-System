import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile_num: "",
    city: "",
    role: "CANDIDATE",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-signup-page">
      <div className="signup-container">
        
        <section className="signup-form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="mobile_num"
              placeholder="Mobile Number"
              maxLength={10}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              required
            />
            <div className="role-selection">
              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="CANDIDATE"
                  defaultChecked
                  onChange={handleChange}
                />
                Candidate
              </label>
              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="HR"
                  onChange={handleChange}
                />
                HR
              </label>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </section>
        <section className="signup-intro">
          <h1>Join RecruitHub!</h1>
          <h3>
            Create your account and start your journey with Recruit
            <i style={{ color: "#d97706" }}>Hub</i> today.
          </h3>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
