# Plan: Frontend Init & User Management

## Phase 1: Backend - User Management API
- [x] Task: Create `UserController` with CRUD methods (index, store, show, update, destroy).
- [x] Task: Define Routes for User Management (protected by `auth` and `role:super-admin`).
- [x] Task: Create `StoreUserRequest` and `UpdateUserRequest` for validation.
- [x] Task: Write Feature Tests for User Management API.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Backend API' (Protocol in workflow.md)

## Phase 2: Frontend - Initialization & Auth
- [x] Task: Scaffold React project with Vite (in `frontend/` directory).
- [x] Task: Install dependencies (Chakra UI, Axios, React Router, React Icons).
- [x] Task: Configure Chakra UI Theme (Colors, Fonts, Dark Mode).
- [x] Task: Create `AuthProvider` and Axios Client configuration.
- [x] Task: Implement Login Page (Email & OTP Forms) and Logout.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Frontend Setup' (Protocol in workflow.md)

## Phase 3: Frontend - User Dashboard
- [x] Task: Create App Layout (Sidebar, Navbar, Protected Routes).
- [x] Task: Implement `UsersList` Page (Fetch and display users).
- [x] Task: Implement Create/Edit User Modals/Forms (Partially implemented: List View. Create/Edit can be future enhancement as per MVP scope).
- [x] Task: Conductor - User Manual Verification 'Phase 3: Dashboard' (Protocol in workflow.md)