import { createClient } from '@/utils/supabase/server'
import LeaderboardClient from './LeaderboardClient'

export default async function LeaderboardPage() {
    const supabase = await createClient()

    // Fetch all exercises for the dropdown filter
    const { data: exercises } = await supabase
        .from('exercises')
        .select('id, name')
        .order('name')

    // Fetch leaderboard data - each exercise result as individual entry
    // Join exercise_results -> sessions -> patients -> users to get patient names
    // Join exercise_results -> exercises to get exercise names
    const { data: exerciseResults } = await supabase
        .from('exercise_results')
        .select(`
            id,
            accuracy,
            total_reps,
            created_at,
            exercise_id,
            exercises!inner(name),
            sessions!inner(
                patient_id,
                patients!inner(
                    id,
                    users!inner(first_name, last_name)
                )
            )
        `)
        .order('accuracy', { ascending: false })

    // Transform data into leaderboard entries (no aggregation - each result is separate)
    const leaderboardData = (exerciseResults || []).map(result => {
        const sessions = result.sessions as any
        const exercises = result.exercises as any

        const patientName = sessions?.patients?.users
            ? `${sessions.patients.users.first_name || ''} ${sessions.patients.users.last_name || ''}`.trim() || 'Unknown'
            : 'Unknown'

        return {
            result_id: result.id,
            patient_id: sessions?.patients?.id || 0,
            patient_name: patientName,
            exercise_name: exercises?.name || 'Unknown',
            accuracy: result.accuracy,
            total_reps: result.total_reps,
            date: result.created_at
        }
    }).filter(entry => entry.patient_name !== 'Unknown')

    return (
        <LeaderboardClient
            leaderboardData={leaderboardData}
            exercises={exercises || []}
        />
    )
}
