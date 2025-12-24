# Plan: Backend Enhancements (Dashboard, Orders, Shipping, Stripe)

## Phase 1: Dashboard & Analytics
- [x] Task: Create `DashboardStatsController` in Backend (API to fetch counts/sums).
- [x] Task: Create `Dashboard` Frontend Page with Cards:
    -   **Inventory:** Active listings, Total Value.
    -   **Inquiries:** New/Unread leads.
    -   **Orders:** Recent sales, Pending Shipments.
    -   **Quick Actions:** Add Item, Create Order.

## Phase 2: Orders & Sold Items System
- [x] Task: Create `orders` table migration (fields: user_id, equipment_id, customer_name/email, amount, status, payment_status, shipping_status).
- [x] Task: Create `Order` Model & Controller.
- [ ] Task: Frontend `OrdersList` Page (The "Sold Items" view).
- [ ] Task: Implement "Convert to Order" flow:
    -   From `Inquiry`: "Create Order" button.
    -   From `Equipment`: "Mark as Sold" -> Opens Order Form.

## Phase 3: Shipping Management
- [ ] Task: Add Shipping fields to `orders` (carrier, tracking_number, shipped_at, estimated_delivery).
- [ ] Task: Frontend "Ship Order" Modal (Enter tracking info).
- [ ] Task: Display Tracking Link in Order Details.

## Phase 4: Stripe Payment Integration
- [ ] Task: Install `stripe/stripe-php`.
- [ ] Task: Create `PaymentController` (Generate Payment Link).
- [ ] Task: Frontend "Send Invoice" button on Order.
- [ ] Task: Webhook handler to auto-update Order to `paid`.
