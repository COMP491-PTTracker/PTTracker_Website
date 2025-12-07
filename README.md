# 🏥 Physical Therapy Tracking Portal

A modern web application for physical therapy progress tracking, enabling doctors to manage patients and patients to view their exercise logs.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-06B6D4?style=flat-square&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=flat-square&logo=supabase)

## ✨ Features

- **Role-Based Access Control** - Separate dashboards for doctors and patients
- **Patient Management** - Doctors can create and manage patient accounts
- **Exercise Log Tracking** - View detailed exercise history with scores and durations
- **Secure Authentication** - Powered by Supabase Auth with middleware protection
- **Responsive Design** - Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase project with the required database schema

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/pttWebsite.git
   cd pttWebsite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

   > ⚠️ **Never commit your `.env.local` file!** It contains sensitive credentials.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure

```
pttWebsite/
├── actions/                    # Server actions
│   ├── auth.ts                 # Login/logout actions
│   └── doctor.ts               # Patient management actions
├── app/                        # Next.js App Router
│   ├── dashboard/
│   │   ├── doctor/             # Doctor dashboard
│   │   │   ├── page.tsx        # Patient list view
│   │   │   ├── CreatePatientForm.tsx
│   │   │   └── patient/[id]/   # Patient detail view
│   │   └── patient/            # Patient dashboard
│   │       └── page.tsx        # Exercise log view
│   ├── login/                  # Authentication page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── types/
│   └── database.ts             # TypeScript types for DB schema
├── utils/
│   └── supabase/
│       ├── admin.ts            # Admin client (service_role)
│       ├── client.ts           # Browser client
│       └── server.ts           # Server client
├── middleware.ts               # Route protection & auth
├── tailwind.config.ts          # Tailwind configuration
└── package.json
```

## 🗄️ Database Schema

The application uses the following Supabase tables:

### `users` Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key (links to auth.users) |
| `email` | text | User email address |
| `role` | text | User role: `admin` or `patient` |
| `full_name` | text | Display name |

### `patients` Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | Foreign key to users.id |
| `doctor_id` | uuid | Assigned doctor |
| `hospital_id` | uuid | Hospital reference |
| `national_id` | text | National identification |
| `pin_code` | text | PIN for authentication |

### `exercise_logs` Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | bigint | Primary key |
| `user_id` | uuid | Foreign key to users.id |
| `exercise_name` | text | Name of the exercise |
| `score` | int | Exercise score |
| `duration` | int | Duration in seconds |
| `created_at` | timestamptz | Log timestamp |

## 👥 User Roles

| Role | Access | Capabilities |
|------|--------|--------------|
| **Doctor** | `/dashboard/doctor` | View all patients, create new patients, view patient exercise logs |
| **Patient** | `/dashboard/patient` | View own exercise logs |

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14+](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS |
| [Supabase](https://supabase.com/) | Backend as a Service (Auth + PostgreSQL) |
| [Lucide React](https://lucide.dev/) | Icon library |

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```
