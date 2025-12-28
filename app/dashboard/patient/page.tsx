import { getCurrentUser } from '@/actions/auth'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PatientDashboardClient from './PatientDashboardClient'

export default async function PatientDashboard() {
    const user = await getCurrentUser()

    if (!user || user.role !== 'patient') {
        redirect('/login')
    }

    const supabase = await createClient()

    // Get patient record for this user
    const { data: patient } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', user.id)
        .single()

    let exerciseResults: any[] = []
    let currentStreak = 0

    if (patient) {
        // Get sessions with exercise results for this patient
        const { data: sessions } = await supabase
            .from('sessions')
            .select(`
                id,
                start_time,
                end_time,
                completed,
                exercise_results (
                    id,
                    total_reps,
                    correct_reps,
                    errors,
                    accuracy,
                    duration_sec,
                    created_at,
                    exercises (
                        id,
                        name
                    )
                )
            `)
            .eq('patient_id', patient.id)
            .order('start_time', { ascending: false })

        // Flatten the results for display
        if (sessions) {
            exerciseResults = sessions.flatMap(session =>
                (session.exercise_results as any[])?.map(result => ({
                    id: result.id,
                    session_id: session.id,
                    exercise_name: (result.exercises as any)?.name || 'Unknown Exercise',
                    total_reps: result.total_reps,
                    correct_reps: result.correct_reps,
                    errors: result.errors,
                    accuracy: result.accuracy,
                    duration_sec: result.duration_sec,
                    created_at: result.created_at || session.start_time,
                    session_completed: session.completed
                })) || []
            )
        }

        // Get streak info
        const { data: streak } = await supabase
            .from('streaks')
            .select('current_streak')
            .eq('patient_id', patient.id)
            .single()

        currentStreak = streak?.current_streak || 0
    }

    return (
        <PatientDashboardClient
            user={{ first_name: user.first_name }}
            exerciseResults={exerciseResults}
            currentStreak={currentStreak}
        />
    )
}
