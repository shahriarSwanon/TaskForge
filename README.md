# 🚀 TaskForge

TaskForge is a productivity-focused full-stack web application that enables users to manage tasks, track progress, organize deadlines, analyze productivity, and stay focused using an integrated Pomodoro timer. The application includes secure JWT authentication, calendar integration, profile management, dark mode, and a responsive user interface.

---

## 📌 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

# 📸 Screenshots

## Dashboard

![](screenshots/dashboard.png)

---

## Task List

![](screenshots/tasks.png)

---

## Calendar

![](screenshots/calendar.png)

---

## Analytics

![](screenshots/analytics.png)

---

## Pomodoro Timer

![](screenshots/pomodoro.png)

### 👤 User Profile
- Edit Profile
- Upload Profile Picture
- Change Password

### ✅ Task Management
- Create Tasks
- Edit Tasks
- Delete Tasks
- Mark Tasks Complete
- Task Categories
- Priority Levels
- Due Dates
- Overdue Detection

### 🔍 Productivity Tools
- Search Tasks
- Sort Tasks
- Filter Tasks
- Calendar View
- Weekly Productivity Analytics
- Pomodoro Timer
- Task Deadline Notifications

### 🎨 UI
- Dark / Light Mode
- Responsive Design
- Toast Notifications

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios
- React Calendar
- Recharts
- React Hot Toast

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

### Database
- MySQL

---

## 📂 Project Structure

```
TaskForge
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── routes
│   ├── controllers
│   ├── middleware
│   ├── config
│   └── server.js
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/shahriarSwanon/TaskForge.git
```

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
npm install
npm start
```

---

## 🔑 Environment Variables

Create a `.env` file inside `/server`

```
PORT=
JWT_SECRET=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

---

## 👨‍💻 Author

**Shahriar Swanon**

GitHub:
https://github.com/shahriarSwanon
