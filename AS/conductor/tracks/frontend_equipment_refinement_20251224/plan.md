# Plan: Equipment Listing Refinement

## Phase 1: UX/UI Overhaul (FB/eBay Style)
- [x] Task: Redesign `EquipmentForm` layout.
    -   Split into logical sections (Media First, then Details, then Shipping/Location).
    -   Implement "Card" style container with a cleaner, focused single-column or wide-grid layout.
- [x] Task: Enhance Image Upload.
    -   Make the dropzone prominent (Hero section).
    -   Ensure grid preview allows easy reordering (if supported) or clear deletion.

## Phase 2: Industry Specific Fields
- [x] Task: Update `EquipmentForm` fields for Hearing Aid Industry.
    -   Update "Type" dropdown options (Audiometer, Tympanometer, Sound Booth, Real Ear Measurement, Otoscope, etc.).
    -   Review if custom fields are needed (e.g., "Calibration Certificate" upload vs just date).
- [ ] Task: Verification & Testing.
    -   Manual check of the new flow.
    -   Ensure mobile responsiveness (critical for "marketplace" feel).
