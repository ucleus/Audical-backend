# Spec: Frontend Init & User Management

## Overview
This track establishes the frontend application using React and Vite, implementing the visual interface for the Authentication system (OTP) and creating a User Management Dashboard. It also includes the necessary backend extensions to support user management (CRUD for users).

## Functional Requirements
- **Authentication (Frontend):**
    - Login Screen: Email input -> Request OTP.
    - OTP Screen: Input 6-digit code -> Verify -> Redirect to Dashboard.
    - Logout functionality.
- **User Management (Backend):**
    - API endpoints to List, Create, Update, and Delete users.
    - Restricted to 'Super Admin' role.
- **User Management (Frontend):**
    - Dashboard view showing list of users.
    - Ability to add new users (assigning Roles).
    - Ability to edit user details.

## Technical Requirements
- **Frontend:**
    - React (Vite).
    - Chakra UI (Dark Mode, Medical Theme).
    - Axios for API communication.
    - React Router for navigation.
- **Backend:**
    - `UserController` with standard CRUD.
    - Policy/Middleware to ensure only Super Admins can manage users.
