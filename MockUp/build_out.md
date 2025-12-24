# Audical Services - Redesigned Layout

This project has been separated into two distinct applications:

## 1. Frontend Catalog (`catalog.html`)
- **Purpose**: Public-facing product catalog for customers
- **Features**:
  - Clean, responsive product display
  - Product filtering and search
  - Contact information
  - YouTube tutorials integration
  - Theme toggle (light/dark mode)
- **Backend Features Removed**: All admin functionality, product management, order processing

## 2. Admin Dashboard (`dashboard.html`)
- **Purpose**: Internal management system for staff
- **Features**:
  - Product management (add, edit, delete)
  - Order management and tracking
  - Customer management
  - Inventory tracking
  - Analytics dashboard
  - Settings configuration

## Key Changes Made

### Frontend Catalog:
- Removed all admin-only functionality
- Kept the exact same visual design and layout
- Simplified to pure product showcase
- Maintained all UI interactions (filters, search, modals)
- Preserved theme system and responsive design

### Admin Dashboard:
- New interface built with the same design language
- Comprehensive backend management features
- Local storage for data persistence
- Full CRUD operations for products, orders, customers
- Responsive sidebar navigation

## How to Use

1. **For Customers**: Open `catalog.html` in a web browser
2. **For Admins**: Open `dashboard.html` in a web browser

## Data Storage

Both applications use browser localStorage for data persistence:
- Products: `audical_products`
- Orders: `audical_orders` 
- Customers: `audical_customers`

## Browser Compatibility

Works in all modern browsers that support:
- CSS Grid and Flexbox
- ES6 JavaScript
- localStorage API

## Customization

The color scheme and styling can be modified by updating the CSS custom properties in the `:root` selector of each file.