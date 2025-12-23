# Audical - Medical Equipment Management System

A comprehensive full-stack application for managing medical equipment listings, designed for administrative staff and inventory managers. This system allows for the detailed cataloging of medical assets, including technical specifications, compliance data, and image galleries.

## 🚀 Project Status
**Current Version:** 1.0 (MVP)
**Status:** ✅ Core Development Complete

The application currently supports:
- **Authentication:** Secure Email + OTP login system.
- **Role-Based Access Control:** Super Admin and Editor roles.
- **User Management:** Admin dashboard to view registered users.
- **Equipment Management:** Full CRUD (Create, Read, Update, Delete) capabilities for medical equipment.
- **Inventory Tracking:** Search, filtering, and status management (Active, Draft, Sold).
- **Media Management:** Multi-image upload for equipment listings.

---

## 🛠 Tech Stack

### Backend (`/AS/backend`)
- **Framework:** Laravel 10 (PHP)
- **Database:** MySQL / SQLite (default)
- **API:** RESTful API with Sanctum Authentication
- **Storage:** Local disk storage for images

### Frontend (`/AS/frontend`)
- **Framework:** React 18 (Vite)
- **UI Library:** Chakra UI
- **State Management:** React Context API
- **HTTP Client:** Axios

---

## 📦 Installation & Setup

### Prerequisites
- PHP 8.1+
- Composer
- Node.js (v16+) & npm
- MySQL (optional, defaults to SQLite)

### 1. Backend Setup
Navigate to the backend directory:
```bash
cd AS/backend
```

Install PHP dependencies:
```bash
composer install
```

Set up environment variables:
```bash
cp .env.example .env
```
*Note: The default `.env` is configured for SQLite. If using MySQL, update `DB_CONNECTION` details.*

Generate Application Key:
```bash
php artisan key:generate
```

Run Migrations and Seed Database:
```bash
# Creates tables and seeds default admin user
php artisan migrate --seed
```

Start the Development Server:
```bash
php artisan serve
```
The API will be available at `http://localhost:8000`.

### 2. Frontend Setup
Open a **new terminal** and navigate to the frontend directory:
```bash
cd AS/frontend
```

Install Node dependencies:
```bash
npm install
```

Start the Development Server:
```bash
npm run dev
```
The application will launch at `http://localhost:5173`.

---

## 📖 How to Use

### Default Credentials
The seeding process creates a default Super Admin user:
- **Email:** `admin@audical.com`
- **OTP:** Use the code `123456` (Hardcoded for development environment)

### Core Workflows

1.  **Login:**
    - Enter `admin@audical.com`.
    - Enter the OTP `123456`.
2.  **Dashboard:**
    - Upon login, you are directed to the **Equipment Inventory**.
3.  **Manage Equipment:**
    - **List:** View all items with status badges and thumbnails.
    - **Filter:** Use the search bar or status dropdown to find specific assets.
    - **Create:** Click "Add Equipment" to list a new item. You can upload multiple images here.
    - **Edit:** Click the "Edit" button on any row to modify details.
4.  **User Management:**
    - Navigate to "Users" in the sidebar to view system access (Admin only).

---

## 🔮 Roadmap: What is Left to be Done

While the Core Administrative functionalities are complete, the following features are planned for future releases:

### 1. Inquiry & Lead Management
*   **Goal:** Allow public buyers to inquire about specific equipment.
*   **Tasks:**
    *   Create `Inquiry` model and migration.
    *   Build "Inbox" dashboard for admins to view and reply to messages.
    *   Link inquiries to specific Equipment IDs.

### 2. Public Marketplace (Buyer View)
*   **Goal:** A public-facing storefront where non-logged-in users can browse active listings.
*   **Tasks:**
    *   Create public API endpoints (read-only) for `active` equipment.
    *   Build a separate public layout/landing page in React.

### 3. Advanced Asset Management
*   **Goal:** Deeper tracking of asset lifecycle.
*   **Tasks:**
    *   **Service History:** Log maintenance and repair records for equipment.
    *   **Manuals:** Allow PDF uploads for user manuals and technical guides.
    *   **Barcode/QR:** Generate printable labels for physical inventory tracking.

### 4. Deployment & DevOps
*   **Goal:** Production readiness.
*   **Tasks:**
    *   Set up CI/CD pipelines (GitHub Actions).
    *   Configure cloud storage (AWS S3) for images instead of local disk.
    *   Dockerize the application for easier deployment.