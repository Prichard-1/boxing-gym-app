# 🥊 Boxing Gym App

A responsive web app for a boxing gym where users can:
- Register & log in securely (Auth0)
- Book training sessions
- View personalized dashboards
- Access workout plans
- Subscribe to membership plans (Stripe)

---

## 🚀 Tech Stack
- **Frontend:** React (Vite), Tailwind CSS  
- **Backend:** Node.js + Express, PostgreSQL  
- **Auth:** Auth0  
- **Payments:** Stripe  
- **Integrations:** Google Calendar API  

---
**WHERE APP WAS DEPLOYED**
Backend:https://dashboard.render.com/web/srv-d2rj9ah5pdvs73dk79t0/deploys/dep-d2tj1e3e5dus73dt7qm0?r=2025-09-05%4018%3A48%3A30%7E2025-09-05%4018%3A51%3A36
Live on:https://boxing-gym-backend.onrender.com
Frontend deployed at :https://app.netlify.com/projects/majestic-sprite-8d5f3b/deploys/68bb3421d948d50615ba22a3
live site:https://majestic-sprite-8d5f3b.netlify.app/

## ⚙️ Setup

### 1. Clone & install
```bash
git clone https://github.com/yourusername/boxing-gym-app.git
cd boxing-gym-app
cd boxing-gym-app

Frontend → Netlify ( https://majestic-sprite-8d5f3b.netlify.app/)

Backend → Render / Railway-style Node.js service (https://boxing-gym-backend.onrender.com).



# 🚀 Deployment Guide

## Frontend (Netlify)

1. **Push to GitHub**
   - Make sure your `frontend/` folder is committed.

2. **Connect to Netlify**
   - Log in to [Netlify](https://app.netlify.com/).
   - Create a new site → Connect GitHub repo.
   - Set **Base Directory** = `frontend`.
   - Netlify will auto-detect Vite and use:
     ```
     Build command: npm run build
     Publish directory: dist
     ```

3. **Environment variables**
   - Go to Netlify → Site Settings → Environment Variables.
   - Add:
     ```
     VITE_API_URL=https://boxing-gym-backend.onrender.com
     VITE_AUTH0_DOMAIN=xxx.auth0.com
     VITE_AUTH0_CLIENT_ID=your_client_id
     
     ```

4. **Deploy**
   - Netlify builds & deploys automatically on pushes to `main`.

---

## Backend (Render )

1. **Create service**
   - Log in to [Render](https://render.com/) (or Railway/Heroku).
   - Create a new **Web Service** from your repo.
   - Set **Root directory** = `backend`.

2. **Environment variables**
   - Add all keys from `.env.example`:
     ```
     PORT=10000
     DATABASE_URL=postgres://user:pass@host:5432/dbname
     AUTH0_DOMAIN=xxx.auth0.com
     AUTH0_CLIENT_ID=your_client_id
     AUTH0_CLIENT_SECRET=your_client_secret
     STRIPE_SECRET_KEY=sk_test_xxx
     GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
     GOOGLE_CLIENT_SECRET=yyy
     ```

3. **Start command**


npm run start


4. **CORS setup**
- Ensure `server.js` allows:
  ```js
  const allowedOrigins = [
    "http://localhost:5173",
    "https://majestic-sprite-8d5f3b.netlify.app"
  ];
  ```

---





