# 🏢 RecruitHub – Recruitment Management System

RecruitHub is a full-stack web application designed to solve real-world problems in the recruitment process. Currently, HRs rely on job portals that redirect candidates to Google Forms, leaving application data scattered across Excel sheets with no proper status tracking. RecruitHub provides a centralized platform for HRs, Candidates, and Admins — making the entire recruitment process smooth, organized, and transparent.

---

## 🚀 Live Demo

🔗 **[View Project](#)** *(Coming Soon)*

---

## 📖 About the Project

RecruitHub was built to address a common gap in today's recruitment workflow:

- Job portals like LinkedIn and Indeed redirect applicants to external Google Forms
- Application data gets manually stored in Excel sheets
- Candidates receive no real-time status updates after applying

This system solves all of the above by providing a **unified platform** where HRs can post jobs and manage applications, candidates can apply and track their status, and an admin has full control over the platform.

---

## 🧩 Key Features

### 👨‍💼 HR Module
- **Dashboard** – Overview of total jobs posted, applications received, and hired candidates
- **Manage Jobs** – Post new jobs and view all existing job listings
- **Applications** – View applications received per job, manage or delete listings
- **Profile** – View and edit HR details (username, email, role, address, mobile number)

### 👤 Candidate Module
- **Dashboard** – Personalized overview of activity
- **Browse Jobs** – View all available job postings and apply directly
- **Applied Jobs** – Track all applied jobs with real-time application status
  - Status flow: `Applied` → `Shortlisted` / `Rejected`
- **Profile** – View and manage personal details

### 🔐 Authentication
- Secure **Login & Signup** for both HR and Candidate roles
- **JWT (JSON Web Token)** based authentication with protected routes

### 🛡️ Admin Panel
- Full platform control and oversight across all HR and Candidate activity

---

## 🛠️ Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Frontend** | React.js, HTML, CSS, JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL |
| **Auth** | JWT (JSON Web Token) |
| **Tools Used** | VS Code, Git, GitHub, Postman |

---

## ✨ Features

- Role-based access control (HR, Candidate, Admin)
- Real-time application status updates
- Centralized job and applicant management
- Clean and responsive UI for all screen sizes
- Secure JWT authentication
- No more manual Excel tracking

---

## 🧰 Installation & Setup

Follow these steps to run this project locally:

1. **Clone the repository**
```bash
git clone https://github.com/vithun-sk/RecruitHub.git
```

2. **Navigate into the project directory**
```bash
cd RecruitHub
```

3. **Install dependencies for backend**
```bash
cd backend
npm install
```

4. **Install dependencies for frontend**
```bash
cd ../frontend
npm install
```

5. **Configure environment variables**

Create a `.env` file inside the `backend` folder and add:
```env
DB_HOST=your_mysql_host
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=recruithub
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

6. **Run the backend**
```bash
cd backend
npm start
```

7. **Run the frontend**
```bash
cd frontend
npm start
```

8. **Open in browser**
```bash
http://localhost:3000
```

---

## 📁 Project Structure

```
RecruitHub/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── db/
│   └── server.js
└── README.md
```

---

## 🙌 Contributions

Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit a pull request.

---

## 🧑‍💻 Developed by

**Vithun S K**
Frontend Web Developer | Full Stack Learner
📧 Email: [vithunkumar07@gmail.com](mailto:vithunkumar07@gmail.com)
🔗 LinkedIn: [https://www.linkedin.com/in/vithun-sk/](https://www.linkedin.com/in/vithun-sk/)
🐙 GitHub: [https://github.com/vithun-sk](https://github.com/vithun-sk)