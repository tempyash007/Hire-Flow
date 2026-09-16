# 🚀 HireFlow — Full-Stack Job Portal & Applicant Tracking System

**HireFlow** is a modern, high-performance, full-stack Job Portal and Applicant Tracking System (ATS) built with the MERN stack. It features automated resume keyword matching, real-time email notifications, Redis caching, role-based access control, and intuitive recruiter analytics dashboards.

---

## 🌟 Key Features

### 👨‍💻 For Job Seekers
- 🔍 **Smart Job Search & Filtering**: Fast full-text search across job titles, descriptions, and required skills.
- 📄 **Seamless Applications**: Upload resumes (PDF/Doc) directly via Cloudinary integration with optional cover letters.
- 🎯 **Automated Resume Match Score**: Keyword overlap algorithm calculates match scores against job descriptions instantly.
- 📊 **Applicant Dashboard**: Real-time tracking of application statuses (Pending, Shortlisted, Interview Scheduled, Rejected, Accepted).
- 📧 **Instant Email Alerts**: Receive automated updates via Resend API when application status changes or interviews are scheduled.
- 🔐 **Secure Auth & Password Reset**: JWT authentication with refresh token rotation and OTP-based password reset via email.

### 🏢 For Recruiters
- ✍️ **Job Management**: Create, update, publish, close, and auto-delete job postings after expiration.
- 📊 **Analytics Dashboard**: Visual charts powered by Recharts showing total applications, candidate pipelines, and hiring metrics.
- 🥇 **Ranked Candidate Screening**: Applicants are automatically ranked by their resume keyword match score to save time.
- 📅 **Interview Scheduling**: Integrated calendar picker to schedule candidate interviews with automatic email notifications.
- ⏱️ **Job Auto-Cleanup**: Automated daily cron jobs (Node-cron) that auto-delete closed/expired jobs.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TailwindCSS, Recharts, Lucide Icons, Axios, React Router v6
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB Atlas
- **Caching & Queue**: Redis (Upstash) / Bull Queue
- **Email Service**: Resend API / Nodemailer
- **Cloud Storage**: Cloudinary CDN + Multer
- **Authentication**: JWT with Refresh Token Rotation

---

## 💻 Local Setup Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection URI

---

### 1. Clone Repository
```bash
git clone https://github.com/tempyash007/Hire-Flow.git
cd Hire-Flow
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
CLIENT_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
RESEND_API_KEY=your_resend_api_key

ENABLE_REDIS=false
REDIS_URL=your_redis_url
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
npm start
```

The application will be running at `http://localhost:3000`.

---

## 🚦 API Endpoints Overview

### 🔑 Authentication (`/api/auth`)
- `POST /api/auth/register` — Register new candidate or recruiter account
- `POST /api/auth/login` — Authenticate and receive tokens
- `POST /api/auth/logout` — Revoke refresh token and clear cookie
- `POST /api/auth/refresh` — Issue new access token using valid refresh token
- `POST /api/auth/send-otp` — Request OTP for password reset
- `POST /api/auth/reset-password` — Verify OTP and set new password

### 💼 Jobs (`/api/jobs`)
- `GET /api/jobs` — Fetch public job listings (cached)
- `GET /api/jobs/:id` — Get single job details
- `POST /api/jobs` — Create new job listing *(Recruiter only)*
- `PATCH /api/jobs/:id` — Update job listing *(Owner only)*
- `DELETE /api/jobs/:id` — Delete job listing *(Owner only)*
- `PATCH /api/jobs/:id/close` — Mark job as closed *(Owner only)*

### 📝 Applications (`/api/applications`)
- `POST /api/applications/:jobId` — Submit application with resume *(Seeker only)*
- `GET /api/applications/mine` — Get user's application history *(Seeker only)*
- `GET /api/applications/job/:jobId` — Get all applicants for a job *(Recruiter only)*
- `PATCH /api/applications/:id/status` — Update application status & schedule interview *(Recruiter only)*

### 📊 Dashboard (`/api/dashboard`)
- `GET /api/dashboard/seeker` — Candidate stats & recent activity
- `GET /api/dashboard/recruiter` — Recruiter metrics, candidate funnel, and job analytics

---

## 📄 License

This project is licensed under the MIT License.