import React, { useState } from "react";
import "./ProfilePage.css";
import CandidateNavbar from "../../components/CandidateNavbar";
import HrNavbar from "../../components/HrNavbar";
import profileimage from "../../assets/ProfileImage.png";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [showEditPage, setShowEditPage] = useState(false);

  const [editForm, setEditForm] = useState({
    name: loggedInUser?.name || "",
    phone: loggedInUser?.phone || "",
    city: loggedInUser?.city || "",
  });

  function handleChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }

  function handleSave(e) {
    e.preventDefault();
    const updatedUser = { ...loggedInUser, ...editForm };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.id === loggedInUser.id ? updatedUser : u,
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("Profile updated successfully!");
    setShowEditPage(false);
    window.location.reload();
  }
  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  return (
    <>
      {loggedInUser?.role === "HR" ? <HrNavbar /> : <CandidateNavbar />}
      <div className="profile-card-parent">
        <div className="profile-card">
          <div className="profile-image">
            <img
              src={profileimage}
              alt="Profile-Image"
              style={{ width: "200px", height: "200px", borderRadius: "50%" }}
            />
          </div>
          <table className="profile-details">
            <tbody>
              <tr style={{ height: "40px" }}>
                <td style={{ paddingLeft: "80px", fontWeight: "600" }}>Name</td>
                <td style={{ paddingLeft: "40px" }}>{loggedInUser.name}</td>
              </tr>
              <tr style={{ height: "40px" }}>
                <td style={{ paddingLeft: "80px", fontWeight: "600" }}>
                  Email
                </td>
                <td style={{ paddingLeft: "40px" }}>{loggedInUser.email}</td>
              </tr>
              <tr style={{ height: "40px" }}>
                <td style={{ paddingLeft: "80px", fontWeight: "600" }}>City</td>
                <td style={{ paddingLeft: "40px", fontWeight: "400" }}>
                  {loggedInUser.city}
                </td>
              </tr>
              <tr style={{ height: "40px" }}>
                <td style={{ paddingLeft: "80px", fontWeight: "600" }}>
                  Phone Number
                </td>
                <td style={{ paddingLeft: "40px" }}>{loggedInUser.phone}</td>
              </tr>
              <tr style={{ height: "40px" }}>
                <td style={{ paddingLeft: "80px", fontWeight: "600" }}>Role</td>
                <td style={{ paddingLeft: "40px" }}>{loggedInUser.role}</td>
              </tr>
            </tbody>
          </table>
          <div className="profile-actions">
            <button
              className="profile-edit-btn"
              onClick={() => setShowEditPage(true)}
            >
              Edit Profile
            </button>
            <button
              className="profile-logout-btn"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
        {showEditPage && (
          <div className="showEdit-overlay">
            <div className="profile-modal">
              <button
                className="close-btn"
                onClick={() => setShowEditPage(false)}
              >
                ✖
              </button>
              <h2>Edit Profile</h2>
              <form onSubmit={handleSave} className="profile-form">
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleChange}
                    required
                    style={{ marginLeft: "170px" }}
                  />
                </div>
              
                <div>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleChange}
                    minLength={10}
                    maxLength={10}
                    required
                    style={{ marginLeft: "80px" }}
                  />
                </div>
                <div>
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={editForm.city}
                    onChange={handleChange}
                    required
                    style={{ marginLeft: "185px" }}
                  />
                </div>
                <div style={{textAlign:'center'}}>
                  <button type="submit" className="save-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
