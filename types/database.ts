export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    hospital_id: number | null
                    first_name: string | null
                    last_name: string | null
                    email: string | null
                    role: 'admin' | 'patient' | 'user'
                    created_at: string | null
                    last_login: string | null
                }
                Insert: {
                    id: string
                    hospital_id?: number | null
                    first_name?: string | null
                    last_name?: string | null
                    email?: string | null
                    role?: 'admin' | 'patient' | 'user'
                    created_at?: string | null
                    last_login?: string | null
                }
                Update: {
                    id?: string
                    hospital_id?: number | null
                    first_name?: string | null
                    last_name?: string | null
                    email?: string | null
                    role?: 'admin' | 'patient' | 'user'
                    created_at?: string | null
                    last_login?: string | null
                }
            }
            patients: {
                Row: {
                    id: number
                    user_id: string
                    hospital_id: number | null
                    national_id: string
                    birth_date: string | null
                    phone: string | null
                    device_id: number
                    pin_code: string
                    created_by: number | null
                    created_at: string | null
                }
                Insert: {
                    id?: number
                    user_id: string
                    hospital_id?: number | null
                    national_id: string
                    birth_date?: string | null
                    phone?: string | null
                    device_id: number
                    pin_code: string
                    created_by?: number | null
                    created_at?: string | null
                }
                Update: {
                    id?: number
                    user_id?: string
                    hospital_id?: number | null
                    national_id?: string
                    birth_date?: string | null
                    phone?: string | null
                    device_id?: number
                    pin_code?: string
                    created_by?: number | null
                    created_at?: string | null
                }
            }
            doctors: {
                Row: {
                    id: number
                    user_id: string
                    hospital_id: number | null
                    specialization: string | null
                    created_at: string | null
                }
                Insert: {
                    id?: number
                    user_id: string
                    hospital_id?: number | null
                    specialization?: string | null
                    created_at?: string | null
                }
                Update: {
                    id?: number
                    user_id?: string
                    hospital_id?: number | null
                    specialization?: string | null
                    created_at?: string | null
                }
            }
            sessions: {
                Row: {
                    id: number
                    patient_id: number | null
                    device_id: number | null
                    start_time: string
                    end_time: string | null
                    completed: boolean | null
                    streak_updated: boolean | null
                }
                Insert: {
                    id?: number
                    patient_id?: number | null
                    device_id?: number | null
                    start_time: string
                    end_time?: string | null
                    completed?: boolean | null
                    streak_updated?: boolean | null
                }
                Update: {
                    id?: number
                    patient_id?: number | null
                    device_id?: number | null
                    start_time?: string
                    end_time?: string | null
                    completed?: boolean | null
                    streak_updated?: boolean | null
                }
            }
            exercise_results: {
                Row: {
                    id: number
                    session_id: number | null
                    exercise_id: number | null
                    total_reps: number
                    correct_reps: number
                    errors: number
                    accuracy: number
                    duration_sec: number
                    created_at: string | null
                }
                Insert: {
                    id?: number
                    session_id?: number | null
                    exercise_id?: number | null
                    total_reps: number
                    correct_reps: number
                    errors: number
                    accuracy: number
                    duration_sec: number
                    created_at?: string | null
                }
                Update: {
                    id?: number
                    session_id?: number | null
                    exercise_id?: number | null
                    total_reps?: number
                    correct_reps?: number
                    errors?: number
                    accuracy?: number
                    duration_sec?: number
                    created_at?: string | null
                }
            }
            exercises: {
                Row: {
                    id: number
                    name: string
                    description: string | null
                    created_at: string | null
                }
                Insert: {
                    id?: number
                    name: string
                    description?: string | null
                    created_at?: string | null
                }
                Update: {
                    id?: number
                    name?: string
                    description?: string | null
                    created_at?: string | null
                }
            }
            streaks: {
                Row: {
                    id: number
                    patient_id: number | null
                    current_streak: number | null
                    longest_streak: number | null
                    last_completed_date: string | null
                }
                Insert: {
                    id?: number
                    patient_id?: number | null
                    current_streak?: number | null
                    longest_streak?: number | null
                    last_completed_date?: string | null
                }
                Update: {
                    id?: number
                    patient_id?: number | null
                    current_streak?: number | null
                    longest_streak?: number | null
                    last_completed_date?: string | null
                }
            }
            programs: {
                Row: {
                    id: number
                    patient_id: number | null
                    doctor_id: number | null
                    exercise_id: number | null
                    weekly_target: number
                    created_at: string | null
                }
                Insert: {
                    id?: number
                    patient_id?: number | null
                    doctor_id?: number | null
                    exercise_id?: number | null
                    weekly_target: number
                    created_at?: string | null
                }
                Update: {
                    id?: number
                    patient_id?: number | null
                    doctor_id?: number | null
                    exercise_id?: number | null
                    weekly_target?: number
                    created_at?: string | null
                }
            }
        }
    }
}
