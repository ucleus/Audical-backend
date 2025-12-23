---

# 🔥 FULL BUILD PROMPT (COPY / PASTE)

**Role:**
You are a **Senior Full-Stack Engineer (Laravel + React)** building a **production-ready admin web application**.

---

## 🎯 Objective

Build a **full-stack web application** with:

* **Backend:** Laravel 10 (REST API)
* **Database:** MySQL
* **Authentication:** Laravel Sanctum (token-based)
* **Frontend:** React (Vite)
* **UI Framework:** Chakra UI
* **Theme:** **Dark mode by default** with a **medical / healthcare color palette**

The app must be **clean, modular, secure, and scalable**.

---

## 🎨 UI / THEME REQUIREMENTS (IMPORTANT)

* Default to **dark mode**
* Medical color palette:

  * Primary: `#0EA5A4` (teal)
  * Accent: `#22C55E` (medical green)
  * Background: `#0F172A` (deep slate)
  * Surface: `#020617`
  * Text: `#E5E7EB`
* Chakra UI custom theme using `extendTheme`
* Clean hospital-grade UI:

  * Rounded corners
  * Subtle borders
  * No flashy gradients
  * Accessibility-friendly contrast
* Layout:

  * Sidebar navigation
  * Top navbar with user menu
  * Responsive admin layout

---

## 🧠 CORE FUNCTIONALITY

### Authentication

* Email + password login
* Token-based auth via Laravel Sanctum
* Protected API routes
* Frontend route protection
* Logout support

---

## 📦 DATA MODEL (EXAMPLE RESOURCE)

Create a **CRUD resource called `Patients`** (this is just an example but must be fully implemented).

### Patient Fields:

* id
* first_name
* last_name
* email
* phone
* date_of_birth
* notes
* timestamps

Each patient record must belong to the authenticated user.

---

## 🛠 BACKEND REQUIREMENTS (Laravel 10)

* RESTful API only (no Blade)
* API Controllers under `App\Http\Controllers\Api`
* Migrations, models, controllers, validation
* Pagination
* Proper HTTP status codes
* Sanctum token generation
* CORS configured for React frontend
* Directory structure:

```
backend/
  app/
    Http/Controllers/Api/
    Models/
  routes/api.php
```

---

## 🖥 FRONTEND REQUIREMENTS (React + Chakra UI)

* Vite-based React app
* Chakra UI Provider with custom dark medical theme
* Pages:

  * Login
  * Dashboard
  * Patients List
  * Create Patient
  * Edit Patient
* Components:

  * Sidebar
  * Navbar
  * ProtectedRoute
* API communication via Axios
* Token stored securely (localStorage is acceptable for MVP)
* Clean folder structure:

```
frontend/
  src/
    components/
    pages/
    context/
    lib/api.js
```

---

## 🔐 SECURITY & BEST PRACTICES

* Input validation on backend
* Authorization checks per resource
* Do NOT expose secrets in frontend
* Clean code formatting
* Meaningful variable and file names

---

## 📄 OUTPUT FORMAT

* Provide:

  * Directory tree
  * Key Laravel files (routes, controllers, models)
  * Key React files (theme, layout, pages)
* Code must be **copy-paste ready**
* Avoid placeholder comments like “implement later”
* Assume production mindset

---

## 🚫 DO NOT

* Do NOT use Blade
* Do NOT use Redux
* Do NOT over-engineer
* Do NOT leave TODOs

---

## ✅ SUCCESS CRITERIA

At the end:

* App runs locally
* User can log in
* User can create, view, update, delete Patients
* UI is dark, calm, medical-grade
* Codebase is structured and scalable

---

If you want, next I can:

* Rewrite this prompt **specifically tuned** for **Codex vs Claude vs Gemini**
* Generate the **Chakra medical theme file**
* Convert this into a reusable **Context Engineering template**
* Add HIPAA-aware notes (audit logs, access trails)

Just say the word.
