# Technology Stack - Medical Equipment Marketplace

## Backend
- **Language:** PHP 8.1+
- **Framework:** Laravel 10
- **API Architecture:** RESTful API
- **Authentication:** Custom OTP (One-Time Password) system.
  - No public registration.
  - Administrator-controlled user creation and role assignment.
  - Login via OTP sent to email/SMS.
- **Database:** MySQL 8.0+
- **File Storage:** Local Filesystem (Hostinger)
  - Dedicated storage disk for equipment images.
  - Multi-image handling logic.

## Frontend (Planned for Future Phase)
- **Framework:** React (via Vite)
- **UI Library:** Chakra UI
  - Utilization of Chakra UI components for administrative interfaces (e.g., product posting, duration settings).
- **HTTP Client:** Axios

## DevOps & Environment
- **Web Server:** Nginx / Apache (Hostinger compatible)
- **Environment Management:** `.env` configuration
- **Dependency Management:** Composer (PHP), NPM/Yarn (JS)
