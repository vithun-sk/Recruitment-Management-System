import axios from "axios";
 
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
 
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
 
// ─── AUTH ────────────────────────────────────────────────────
export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);
export const getProfile = () => API.get("/auth/profile");
export const updateProfile = (formData) => API.put("/auth/profile", formData);
 
// ─── JOBS ────────────────────────────────────────────────────
export const getAllJobs = () => API.get("/jobs");
export const getMyJobs = () => API.get("/jobs/myjobs");
export const createJob = (formData) => API.post("/jobs/create", formData);
export const deleteJob = (jobId) => API.delete(`/jobs/${jobId}`);
 
// ─── APPLICATIONS ────────────────────────────────────────────
export const applyForJob = (formData) => API.post("/applications/apply", formData);
export const getMyApplications = () => API.get("/applications/my");
export const getApplicationsByJob = (jobId) => API.get(`/applications/job/${jobId}`);
export const updateApplicationStatus = (appliId, status) =>
  API.put(`/applications/status/${appliId}`, { status });
 
// ─── ADMIN ───────────────────────────────────────────────────
export const adminGetAllUsers = () => API.get("/admin/users");
export const adminGetAllJobs = () => API.get("/admin/jobs");
export const adminDeleteJob = (jobId) => API.delete(`/admin/jobs/${jobId}`);
export const adminDeleteUser = (userid) => API.delete(`/admin/users/${userid}`);
 