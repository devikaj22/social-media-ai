# AI Social Media Content Calendar Generator

![Project Banner Placeholder](https://placehold.co/1200x400/4f46e5/ffffff?text=AI+Social+Media+Content+Calendar+Generator)

A production-ready full-stack web application that empowers businesses, marketers, startups, and content creators to generate strategic, AI-powered social media calendars using **Google Gemini 2.5 Flash** and persist them directly into **Supabase PostgreSQL**.

---

## 🚀 Features

- 🤖 **AI Strategy Engine**: Dynamic multi-day social media strategy powered by `@google/genai` (`gemini-2.5-flash`).
- 🗄️ **Supabase PostgreSQL Integration**: Save, fetch, search, filter, and delete historical calendars with full JSONB payload support.
- 🎯 **Targeted Platform Customization**: Dedicated prompts for **Instagram**, **LinkedIn**, **Facebook**, **X (Twitter)**, and **YouTube**.
- 🎭 **Custom Tone & Goals**: Options for Professional, Friendly, Funny, Educational, or Promotional tones tailored to your exact campaign goals.
- 📊 **Rich Daily Breakdown**: Every generated day includes:
  - Post Idea / Concept
  - Engaging Caption
  - 5 High-Intent Relevant Hashtags
  - Best Posting Time
  - Call To Action (CTA)
  - Engagement Forecast Badge (Low, Medium, High)
- 📋 **One-Click Actions**: Instant copy to clipboard for captions and hashtags, celebratory confetti feedback.
- 📄 **Exports**: Export full strategy to JSON or print-friendly PDF formatted view.
- 🔍 **History Vault**: Search saved calendars by business name and filter by social platform.
- 🌓 **Sleek UI/UX**: Dark mode toggle, glassmorphism card design, responsive layout with Tailwind CSS.
- ⚙️ **Startup Environment Validation**: Friendly console notifications if `GEMINI_API_KEY`, `SUPABASE_URL`, or `SUPABASE_ANON_KEY` are missing.

---

## 📁 Folder Structure

```text
social-media-ai/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CalendarCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Toast.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── Generate.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Results.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/
│   ├── config/
│   │   ├── gemini.js
│   │   └── supabase.js
│   ├── controllers/
│   │   └── calendarController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── routes/
│   │   └── calendarRoutes.js
│   ├── services/
│   │   ├── calendarService.js
│   │   └── geminiService.js
│   ├── utils/
│   │   └── startupValidation.js
│   ├── package.json
│   └── server.js
├── .env.example
├── .env
└── README.md
```

---

## 🔑 Environment Variables Setup

Create a `.env` file in the root directory or inside `server/.env`:

```env
PORT=5000

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Credentials
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

---

## 🛢️ Supabase SQL Setup

Run the following SQL snippet inside your **Supabase SQL Editor**:

```sql
create extension if not exists "pgcrypto";

create table calendars (
    id uuid primary key default gen_random_uuid(),
    business_name text not null,
    business_type text,
    product text,
    audience text,
    platform text,
    goal text,
    tone text,
    days integer,
    calendar jsonb,
    created_at timestamp default now()
);
```

---

## 🛠️ Local Installation & Running Guide

### 1. Install Backend Dependencies & Start Server
```bash
cd server
npm install
npm run dev
```
*Backend runs at: `http://localhost:5000`*

### 2. Install Frontend Dependencies & Start Client
```bash
cd ../client
npm install
npm run dev
```
*Frontend runs at: `http://localhost:3000`*

---

## 🌐 Deployment Instructions

### Deploying Frontend to Vercel
1. Push project repository to GitHub.
2. In Vercel, import the `client` directory.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Add environment variable if proxying to production API server:
   - `VITE_API_BASE_URL=https://your-express-app.onrender.com`

### Deploying Backend to Render
1. Create a **New Web Service** on Render pointing to your GitHub repo.
2. Root Directory: `server`
3. Environment: `Node`
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add Environment Variables under **Environment**:
   - `PORT=5000`
   - `GEMINI_API_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
