# Spec: Backend Initialization & Equipment Core

## Overview
This track focuses on setting up the Laravel 10 backend environment, implementing the custom OTP-based authentication system, and establishing the core `Equipment` resource with multi-image support.

## Functional Requirements
- **Authentication:**
    - Custom OTP flow (Email-based).
    - No public registration.
    - Role-Based Access Control (Super Admin, Editor, Lead Manager, Viewer).
- **Equipment Resource:**
    - CRUD operations for medical equipment.
    - Multi-image upload logic (local storage).
    - Comprehensive metadata fields (General, Technical, Compliance, Pricing).
    - Status/Drafting support.

## Technical Requirements
- Laravel 10 Framework.
- MySQL Database.
- Local filesystem storage disk for media.
- API-only responses (JSON).
