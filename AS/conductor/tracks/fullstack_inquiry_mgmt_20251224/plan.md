# Plan: Inquiry & Lead Management

## Phase 1: Backend - Inquiries Resource
- [x] Task: Create `inquiries` table migration (fields: equipment_id, name, email, phone, message, status).
- [x] Task: Create `Inquiry` Model with relationships (Equipment).
- [x] Task: Implement `InquiryController` (public store, admin index/show/update).
- [x] Task: Define API Routes (Public POST, Admin GET/PATCH).
- [x] Task: Conductor - User Manual Verification 'Phase 1: Backend Resource' (Protocol in workflow.md)

## Phase 2: Frontend - Inquiry Submission
- [ ] Task: Update `EquipmentList` modal to include an "Inquire" button.
- [ ] Task: Create `InquiryModal` form component.
- [ ] Task: Integrate API to submit inquiries for specific equipment.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Submission' (Protocol in workflow.md)

## Phase 3: Frontend - Admin Inbox
- [ ] Task: Create `InquiryList` page for admins.
- [ ] Task: Implement status management (New, Read, Responded).
- [ ] Task: Add "Inquiries" link to Sidebar.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Admin Inbox' (Protocol in workflow.md)
