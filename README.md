# CodeArena 🏆

A full-stack competitive coding platform like LeetCode — built with React, Node.js, Express, MongoDB, and Socket.IO.

## Features
- 🔐 JWT Authentication (register / login)
- 💻 Code editor with JavaScript, Python, Java support
- ⚡ Real-time submission judging via Socket.IO
- 🏆 Live leaderboard
- 📋 Problems with filtering, search, pagination
- 🎯 Contests with countdown timers
- 👤 User profiles with stats
- 🛡️ Admin panel (manage problems, users, view submissions)
- 📱 Fully responsive

## Tech Stack

**Frontend:** React 18, React Router v6  
**Backend:** Node.js, Express, Socket.IO  
**Database:** MongoDB + Mongoose  
**Auth:** JWT + bcryptjs  
**Deploy:** Vercel (frontend) + Railway / Render (backend)

---

## Local Development

### 1. Clone
```bash
git clone https://github.com/YOUR_USERNAME/codearena.git
cd codearena
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env
# Fill in your MongoDB URI and JWT secret in .env
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
# Create frontend/.env
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
npm start
```

---

## Deploy to Vercel + Railway

### Backend → Railway (or Render)
1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select the `backend` folder as root
4. Add environment variables from `.env.example`
5. Railway gives you a URL like `https://codearena-api.railway.app`

### Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
2. Set **Root Directory** to `frontend`
3. Add environment variable:
   - `REACT_APP_API_URL` = `https://your-railway-backend-url.railway.app/api`
4. Deploy!

---

## Demo Credentials
| Role  | Email                  | Password |
|-------|------------------------|----------|
| Admin | admin@codearena.com    | password |
| User  | alice@example.com      | password |
| User  | bob@example.com        | password |
