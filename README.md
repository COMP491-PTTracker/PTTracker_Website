# Physical Therapy Tracking Portal

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Supabase.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account with database already configured

### Environment Setup

1. **Copy the environment file:**
   ```bash
   cp .env.local.example .env.local
   ```

   The `.env.local` file should already have the correct values, but verify:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Database Schema

The Supabase database has the following structure (already deployed):

### `profiles` table
- `id` (uuid, PK) - Links to auth.users
- `email` (text)
- `role` (text) - Values: 'admin' (Doctor) or 'patient' (Patient)
- `full_name` (text)

### `exercise_logs` table
- `id` (bigint, PK)
- `user_id` (uuid, FK) - Links to profiles.id
- `exercise_name` (text)
- `score` (int)
- `duration` (int)
- `created_at` (timestamptz)

## 👥 User Roles

### Patient
- View their own exercise logs
- Access: `/dashboard/patient`

### Doctor (Admin)
- View all patients
- Create new patients
- View individual patient exercise logs
- Access: `/dashboard/doctor`

## 🎨 Design System

**Theme:** "Friendly Rehab"

- **Primary Color:** Emerald Green (Growth/Healing)
- **Secondary Color:** Soft Orange (Energy)
- **Backgrounds:** White / Soft Grays
- **Typography:** Inter font, large sizes for accessibility
- **Components:** Rounded corners (rounded-xl), pill-shaped buttons

## 🔐 Authentication Flow

1. New users are automatically assigned `role = 'patient'` via DB trigger
2. Admin users are manually set in the database
3. Login redirects based on role:
   - Admin → `/dashboard/doctor`
   - Patient → `/dashboard/patient`

## 📝 Features

### Landing Page (`/`)
- Hero section with project introduction
- "Sign In" button

### Login (`/login`)
- Email/password authentication
- Role-based redirect after login

### Patient Dashboard (`/dashboard/patient`)
- Table of user's exercise logs
- Columns: Date (DD/MM/YYYY), Exercise, Score, Duration
- Sorted by date (newest first)

### Doctor Dashboard (`/dashboard/doctor`)
- Grid of patient cards
- Create new patient button (uses admin client)
- Click patient to view their details

### Patient Detail View (`/dashboard/doctor/patient/[id]`)
- Same table view as patient dashboard
- Shows specific patient's exercise logs

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth

## 📦 Project Structure

```
pttWebsite/
├── actions/
│   ├── auth.ts          # Login/logout actions
│   └── doctor.ts        # Patient management actions
├── app/
│   ├── dashboard/
│   │   ├── doctor/      # Doctor dashboard & patient detail
│   │   └── patient/     # Patient dashboard
│   ├── login/           # Login page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Landing page
├── types/
│   └── database.ts      # TypeScript types for DB schema
├── utils/
│   └── supabase/
│       ├── admin.ts     # Admin client (service_role)
│       ├── client.ts    # Browser client
│       └── server.ts    # Server client
├── middleware.ts        # Route protection
└── PROGRESS.md         # Development progress tracker
```

## 🔒 Security Notes

- The service role key is used ONLY for creating new patients (server-side)
- Middleware enforces role-based access control
- Patients cannot access doctor routes

## 📄 License

Private project for physical therapy tracking.
