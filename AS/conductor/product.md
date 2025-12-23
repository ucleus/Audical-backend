# Initial Concept

look over the build.md file and let's discuss what we need to do

# Product Guide - Medical Equipment Marketplace Backend

## 🎯 Objective
Build a comprehensive full-stack management backend for medical staff to list, manage, and sell new and used medical equipment. This application serves as the administrative core for a medical equipment marketplace.

## 👥 Target Users
- **Medical Administrative Staff:** Responsible for listing equipment, uploading images, and managing listing details.
- **Inventory Managers:** Overseeing the condition, pricing, and availability of medical assets.
- **Sales/Lead Coordinators:** Managing inquiries from potential buyers and tracking sales leads.

## ✨ Core Features
- **Equipment Listing Management:** Full CRUD operations for medical equipment listings.
- **Multi-Image Upload & Management:** Support for multiple high-resolution images per listing with preview and reordering capabilities.
- **Equipment Categorization & Condition Tracking:** Classification by type (Diagnostic, Surgical, etc.) and detailed condition reporting.
- **Inquiry/Lead Management:** Centralized dashboard to view and respond to buyer inquiries.
- **Search & Advanced Filtering:** Robust search functionality by price, category, condition, and location.

## 📋 Data Model (Equipment)
The primary resource is `Equipment`, which includes:
- **General Info:** Title, manufacturer, model number, year of manufacture.
- **Categorization:** Equipment type, condition (New, Used - Like New, etc.).
- **Media:** Multiple image associations.
- **Pricing & Logistics:** List price, negotiable status, current stock, item location.
- **Compliance:** FDA approval status, CE marking, last calibration date.
- **Support:** Warranty details, service history, included manuals.

## 🎨 User Experience & Design
- **Theme:** Clean, high-contrast light theme optimized for data entry and image review.
- **UI Framework:** Chakra UI for a modern, responsive, and accessible interface.
- **Layout:** Sidebar-driven navigation with a focused administrative dashboard.
