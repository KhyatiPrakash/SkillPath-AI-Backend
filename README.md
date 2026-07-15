# SkillPath AI - Backend

## 📌 Overview

SkillPath AI is a MERN stack career guidance platform that helps users explore career paths, save careers, and manage career information. This repository contains the backend API built with Node.js, Express, MongoDB, and JWT Authentication.

---

## 🚀 Features

- User Registration & Login
- JWT Authentication using HTTP-only Cookies
- User Profile API
- Save Careers
- View Saved Careers
- Career CRUD Operations
- Search Careers
- Filter Careers
- Role-based Authentication (Student/Admin)
- MongoDB Database Integration

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Cookie Parser
- Express Async Handler

---

## 📁 Project Structure

```
Backend/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── config/
├── utils/
├── server.js
└── package.json
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone <backend-repository-url>
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

Run the server

```bash
npm run dev
```

---

## 📌 API Endpoints

### Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET `/api/auth/profile`

### Careers

- GET `/api/careers`
- GET `/api/careers/:id`
- POST `/api/careers`
- PUT `/api/careers/:id`
- DELETE `/api/careers/:id`
- GET `/api/careers/search`
- GET `/api/careers/filter`

---

## 👨‍💻 Author

**Khyati Prakash**
