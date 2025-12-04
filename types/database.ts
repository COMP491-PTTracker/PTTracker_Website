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
            profiles: {
                Row: {
                    id: string
                    email: string
                    role: 'admin' | 'patient'
                    full_name: string
                }
                Insert: {
                    id: string
                    email: string
                    role?: 'admin' | 'patient'
                    full_name: string
                }
                Update: {
                    id?: string
                    email?: string
                    role?: 'admin' | 'patient'
                    full_name?: string
                }
            }
            exercise_logs: {
                Row: {
                    id: number
                    user_id: string
                    exercise_name: string
                    score: number
                    duration: number
                    created_at: string
                }
                Insert: {
                    id?: number
                    user_id: string
                    exercise_name: string
                    score: number
                    duration: number
                    created_at?: string
                }
                Update: {
                    id?: number
                    user_id?: string
                    exercise_name?: string
                    score?: number
                    duration?: number
                    created_at?: string
                }
            }
        }
    }
}
