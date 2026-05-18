<div align="center">

<img src="./src/assets/logo.png" alt="DocAppoint Logo" width="80" />

# DocAppoint

### 🏥 Your Health, Our Priority

**A modern full-stack Doctor Appointment Booking System built with Next.js 15, Better Auth, and MongoDB.**  
Browse verified doctors, book appointments instantly, manage your bookings, and leave reviews — all in one place.

<br />

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=flat-square&logo=daisyui&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-JWT-orange?style=flat-square)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Live Links](#-live-links)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Pages & Routes](#-pages--routes)
- [Authentication](#-authentication)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)

---

## 🔍 Overview

**DocAppoint** is a full-stack healthcare appointment platform where patients can discover top-rated doctors across all specialties, book appointments in seconds, manage their schedule from a personal dashboard, and leave verified reviews. The platform is built with a focus on security, performance, and a clean user experience.

---

## 🔗 Live Links

| Resource | URL |
|---|---|
| 🌐 **Client Live** | [https://docappoint.vercel.app](https://docappoint.vercel.app) |
| 💻 **Client Repository** | [https://github.com/IM-Tamim/doctor-appointment-client](https://github.com/IM-Tamim/doctor-appointment-client) |
| 🖥️ **Server Live** | [https://docappoint-server.onrender.com](https://docappoint-server.onrender.com) |
| 📁 **Server Repository** | [https://github.com/IM-Tamim/doctor-appointment-server](https://github.com/IM-Tamim/doctor-appointment-server) |

---

## ✨ Features

### 🔐 Authentication & Security
- Email/password registration with live password validation (uppercase, lowercase, min 6 characters)
- Google OAuth one-click login and registration
- JWT-based API protection using JWKS verification on the backend
- Session-aware route protection — both server-side (middleware) and client-side (SessionGuard)
- Logged-in users are never redirected away from private routes on page reload

### 🩺 Doctor Discovery
- Browse all available doctors in a responsive card grid
- Real-time search by doctor name on the All Appointments page
- Top 3 highest-rated doctors dynamically displayed on the home page
- Each doctor card shows specialty, hospital, location, availability slots, rating, and fee

### 📅 Appointment Booking
- View complete doctor details — description, experience, hospital, time slots, and fee
- Book an appointment via a clean modal — patient name, gender, phone, date, time, and optional reason
- All bookings saved to MongoDB instantly with a success toast

### 📊 Personal Dashboard
- View all your appointments in one place — only your own bookings, filtered by email
- **Update** any booking — pre-filled form with all existing details; doctor name and email are read-only
- **Delete** any booking — double-confirmation modal to prevent accidental deletion
- Instant UI updates after every action — no page reload required

### 👤 Profile Management
- View your name, email, and profile photo on the My Profile tab
- Update your display name and photo URL via a clean modal
- Profile photo updates reflect instantly in the navbar

### ⭐ Doctor Reviews
- Leave a star rating (1–5) and a written review for any doctor
- Doctor's overall rating and total review count update live after submission — same formula as the backend
- Home page testimonials section displays real 5-star reviews from patients using a Swiper.js autoplay slider

### 🎨 UI & Experience
- Light/Dark theme toggle — preference persisted to localStorage across sessions
- Swiper.js slider for patient testimonials on the home page
- Loading spinners while data is being fetched
- Toast notifications for all success and error states — no default browser alerts
- Fully responsive design across all screen sizes
- Custom 404 page for invalid routes

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS + DaisyUI |
| **Authentication** | Better Auth + JWT plugin |
| **Icons** | React Icons |
| **Slider** | Swiper.js |
| **Notifications** | React Hot Toast |
| **HTTP Client** | Native Fetch API |
| **Deployment** | Vercel |

---

## 📄 Pages & Routes

| Route | Access | Description |
|---|---|---|
| `/home` | Public | Hero banner, top doctors, why choose us, testimonials |
| `/all-appointments` | Public | All doctors with search |
| `/doctors/[id]` | 🔒 Private | Doctor details, booking modal, reviews |
| `/dashboard` | 🔒 Private | My bookings + my profile |
| `/signin` | Guest only | Login with email or Google |
| `/signup` | Guest only | Register with email or Google |
| `/forgot-password` | Guest only | Password reset info page |

---

## 🔑 Authentication

DocAppoint uses **Better Auth** with the **JWT plugin** for authentication.

- On login, Better Auth issues a signed JWT accessible via `authClient.token()`
- The JWT is sent as a `Bearer` token in the `Authorization` header for all protected API calls
- The backend verifies the token using JWKS (`/api/auth/jwks`) via `jose-cjs` — no shared secret needed
- Google OAuth is supported for both login and registration

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google OAuth credentials (for social login)

### Installation

```bash
# Clone the repository
git clone https://github.com/username/docappoint-client.git
cd docappoint-client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Better Auth
BETTER_AUTH_SECRET=your_better_auth_secret
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# MongoDB
MONGO_URI=your_mongodb_connection_string

# Backend API
NEXT_PUBLIC_SERVER_URL=http://localhost:8000
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/               # Login, Register, Forgot Password
│   ├── (main)/               # Home, All Appointments, Doctors, Dashboard
│   ├── api/auth/             # Better Auth API handler
│   ├── layout.js             # Root layout with SessionGuard
│   └── not-found.jsx         # Custom 404 page
├── components/
│   ├── pages/
│   │   ├── all-appointments/ # DoctorsSearch, BookingModal, ReviewSection
│   │   ├── dashboard/        # MyBookings, MyProfile, UpdateModal, DeleteModal
│   │   └── homepage/         # HeroBanner, TopRatedDoctors, WhyChooseUs, PatientTestimonials
│   ├── shared/               # Navbar, Footer, SessionGuard, ThemeController, NavLink
│   └── ui/                   # DoctorCard
├── lib/
│   ├── auth.js               # Better Auth server config
│   ├── auth-client.js        # Better Auth client config
│   └── doctors.js            # All API fetch functions
├── assets/                   # Logo and static assets
└── proxy.js                  # Next.js middleware for route protection
```

---

<div align="center">

Made by **IMT**

</div>