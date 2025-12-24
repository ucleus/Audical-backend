# Plan: Inquiry & Lead Management

## Phase 1: Backend - Inquiries Resource
- [x] Task: Create `inquiries` table migration (fields: equipment_id, name, email, phone, message, status).
- [x] Task: Create `Inquiry` Model with relationships (Equipment).
- [x] Task: Implement `InquiryController` (public store, admin index/show/update).
- [x] Task: Define API Routes (Public POST, Admin GET/PATCH).
- [x] Task: Conductor - User Manual Verification 'Phase 1: Backend Resource' (Protocol in workflow.md)

## Phase 2: Frontend - Inquiry Submission
- [x] Task: Update `EquipmentList` modal to include an "Inquire" button.
- [x] Task: Create `InquiryModal` form component.
- [x] Task: Integrate API to submit inquiries for specific equipment.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Submission' (Protocol in workflow.md)

## Phase 3: Frontend - Admin Inbox
- [x] Task: Create `InquiryList` page for admins.
- [x] Task: Implement status management (New, Read, Responded).
- [x] Task: Add "Inquiries" link to Sidebar.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Admin Inbox' (Protocol in workflow.md)
