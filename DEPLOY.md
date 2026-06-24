# 🚀 Deployment Guide — CodeArena

This guide walks you through deploying CodeArena for free using:
- **MongoDB Atlas** (database — free tier)
- **Railway** (backend — free tier)
- **Vercel** (frontend — free tier)

---

## Step 1 — MongoDB Atlas (Database)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new **Free Tier** cluster (M0)
3. Under **Database Access** → Add a new database user with a username and password
4. Under **Network Access** → Add IP address → click **"Allow Access from Anywhere"** (`0.0.0.0/0`)
5. Click **Connect** → **Drivers** → copy the connection string:
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/codearena?retryWrites=true&w=majority
   ```
6. Replace `USERNAME` and `PASSWORD` with your credentials

---

## Step 2 — Deploy Backend to Railway

1. Push your project to GitHub first (see below)
2. Go to [railway.app](https://railway.app) and sign in with GitHub
3. Click **New Project** → **Deploy from GitHub repo** → select your repo
4. When prompted for the root directory, enter: `backend`
5. Add the following **Environment Variables** in the Railway dashboard:

   | Variable       | Value                                         |
   |---------------|-----------------------------------------------|
   | `PORT`        | `5000`                                        |
   | `MONGODB_URI` | your MongoDB Atlas connection string          |
   | `JWT_SECRET`  | any long random string (32+ chars)            |
   | `JWT_EXPIRE`  | `7d`                                          |
   | `FRONTEND_URL`| `https://your-app.vercel.app` (fill later)    |
   | `NODE_ENV`    | `production`                                  |

6. Railway will auto-deploy. Copy the generated URL (e.g. `https://codearena-api.railway.app`)

### Seed the database (run once)
After Railway deploys, open the Railway shell and run:
```bash
node seed.js
```

Or add a one-time start command `node seed.js && node server.js`, deploy once, then revert.

---

## Step 3 — Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **New Project** → **Import** your GitHub repo
3. Set **Root Directory** to: `frontend`
4. Under **Environment Variables**, add:

   | Variable                  | Value                                          |
   |--------------------------|------------------------------------------------|
   | `REACT_APP_API_URL`      | `https://your-railway-url.railway.app/api`     |
   | `REACT_APP_SOCKET_URL`   | `https://your-railway-url.railway.app`         |

5. Click **Deploy** — Vercel builds and gives you a URL like `https://codearena.vercel.app`

6. Go back to Railway and update `FRONTEND_URL` to your Vercel URL (for CORS)

---

## Step 4 — Push to GitHub

```bash
# In your project root
git init
git add .
git commit -m "Initial commit — CodeArena"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/codearena.git
git push -u origin main
```

---

## Local Development

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/codearena.git
cd codearena

# 2. Set up backend
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run seed      # seed demo data (run once)
npm run dev       # starts on http://localhost:5000

# 3. Set up frontend (new terminal)
cd frontend
cp .env.example .env
# .env already has REACT_APP_API_URL=http://localhost:5000/api
npm install
npm start         # starts on http://localhost:3000
```

---

## Demo Credentials (after seeding)

| Role  | Email                  | Password |
|-------|------------------------|----------|
| Admin | admin@codearena.com    | password |
| User  | alice@example.com      | password |
| User  | bob@example.com        | password |
| User  | charlie@example.com    | password |

---

## Troubleshooting

**CORS errors** — Make sure `FRONTEND_URL` in Railway matches your exact Vercel URL (no trailing slash).

**MongoDB connection fails** — Check that your IP whitelist in Atlas is set to `0.0.0.0/0`.

**Build fails on Vercel** — Make sure Root Directory is set to `frontend`, not the repo root.

**Socket.IO not connecting** — Vercel doesn't support WebSockets for frontend; the socket connects to your Railway backend URL via `REACT_APP_SOCKET_URL`.
