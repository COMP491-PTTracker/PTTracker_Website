# Physical Therapy Tracking Portal - Progress Tracker

## Project Overview
Building a Next.js 14+ frontend for a Physical Therapy tracking system with Supabase backend.

---

## STEP 0: Initialization
- [x] Create PROGRESS.md file
- [ ] Confirm .env variables with user

---

## STEP 1: Configuration
- [ ] Create `.env.local` file with required variables
- [ ] Create `utils/supabase/client.ts` (Browser client)
- [ ] Create `utils/supabase/server.ts` (Server client for Actions/SSR)
- [ ] Create `utils/supabase/admin.ts` (Admin client using service_role key)
- [ ] Create TypeScript types for database schema (`types/database.ts`)

---

## STEP 2: Middleware
- [ ] Implement `middleware.ts` for route protection
- [ ] Ensure role-based redirects work correctly
  - [ ] Admin → `/dashboard/doctor`
  - [ ] Patient → `/dashboard/patient`
- [ ] Prevent patients from accessing `/dashboard/doctor`

---

## STEP 3: Server Actions
- [ ] Create `actions/auth.ts`
  - [ ] Login action with role-based redirect
  - [ ] Logout action
- [ ] Create `actions/doctor.ts`
  - [ ] Create patient action (using service_role key to avoid logout)
  - [ ] Fetch all patients action

---

## STEP 4: UI Implementation

### Landing & Auth Pages
- [ ] Create landing page (`app/page.tsx`)
  - [ ] Hero section with project introduction
  - [ ] "Sign In" button
- [ ] Create login page (`app/login/page.tsx`)
  - [ ] Email/Password form
  - [ ] Form validation
  - [ ] Apply "Friendly Rehab" design system

### Patient Dashboard
- [ ] Create patient dashboard (`app/dashboard/patient/page.tsx`)
  - [ ] Fetch exercise logs for logged-in user
  - [ ] Display logs in a table (Date, Exercise, Score, Duration)
  - [ ] Format dates as DD/MM/YYYY
  - [ ] Sort by date (newest first)
  - [ ] Apply Emerald/Orange theme

### Doctor Dashboard
- [ ] Create doctor dashboard (`app/dashboard/doctor/page.tsx`)
  - [ ] Fetch all patients (role === 'patient')
  - [ ] Display patients in card grid/list
  - [ ] Create Patient form
    - [ ] Email input
    - [ ] Password input
    - [ ] Full Name input
    - [ ] Form validation
  - [ ] Apply theme styling

### Patient Detail View
- [ ] Create patient detail page (`app/dashboard/doctor/patient/[id]/page.tsx`)
  - [ ] Fetch exercise logs for specific patient
  - [ ] Display in table format
  - [ ] Same columns and sorting as patient dashboard

---

## STEP 5: Testing & Refinement
- [ ] Test login flow for both roles
- [ ] Test patient creation (verify doctor stays logged in)
- [ ] Test all table displays
- [ ] Test middleware protection
- [ ] Verify responsive design
- [ ] Test accessibility (fonts, readability)

---

## Notes
- **NO DATABASE MODIFICATIONS**: Backend schema is finalized
- **Styling**: Tailwind CSS only, no custom CSS files
- **Language**: All UI text in English
- **Design System**: Emerald Green + Soft Orange, rounded-xl components, high readability
