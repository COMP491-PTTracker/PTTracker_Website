import { getCurrentUser } from '@/actions/auth'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import SettingsDropdown from '@/components/SettingsDropdown'
import { Activity, Calendar, Target, Clock, CheckCircle, XCircle } from 'lucide-react'

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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900">
            {/* Header */}
            <header className="bg-gray-900/50 backdrop-blur-sm shadow-xl border-b border-gray-800 relative z-50">
                <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            My Exercise Results
                        </h1>
                        <p className="text-gray-400 text-lg mt-1 ml-13">Welcome back, {user.first_name || 'Patient'}!</p>
                    </div>

                    {/* Exercise Streak Card */}
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl px-4 py-3 flex items-center gap-3">
                            <img src="/assets/flame.gif" alt="Streak flame" className="w-10 h-10" />
                            <div>
                                <p className="text-orange-400 text-sm font-medium">Current Streak</p>
                                <p className="text-white text-xl font-bold">{currentStreak} Days</p>
                            </div>
                        </div>

                        <SettingsDropdown />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="dark-card">
                    {exerciseResults && exerciseResults.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="dark-table">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-5 h-5 text-primary-400" />
                                                Date
                                            </div>
                                        </th>
                                        <th>
                                            <div className="flex items-center gap-2">
                                                <Activity className="w-5 h-5 text-primary-400" />
                                                Exercise
                                            </div>
                                        </th>
                                        <th>
                                            <div className="flex items-center gap-2">
                                                <Target className="w-5 h-5 text-primary-400" />
                                                Reps (Correct/Total)
                                            </div>
                                        </th>
                                        <th>
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5 text-primary-400" />
                                                Accuracy
                                            </div>
                                        </th>
                                        <th>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-primary-400" />
                                                Duration
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exerciseResults.map((result) => (
                                        <tr key={result.id}>
                                            <td className="text-gray-300">
                                                {new Date(result.created_at).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="text-white font-medium">{result.exercise_name}</td>
                                            <td>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 font-semibold">
                                                    {result.correct_reps}/{result.total_reps}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full font-semibold ${result.accuracy >= 80
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : result.accuracy >= 50
                                                        ? 'bg-yellow-500/20 text-yellow-400'
                                                        : 'bg-red-500/20 text-red-400'
                                                    }`}>
                                                    {result.accuracy.toFixed(1)}%
                                                </span>
                                            </td>
                                            <td className="text-gray-300">
                                                {Math.floor(result.duration_sec / 60)}:{(result.duration_sec % 60).toString().padStart(2, '0')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Activity className="w-10 h-10 text-primary-400" />
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-2">No Exercise Results Yet</h3>
                            <p className="text-gray-400 text-lg">Your exercise results will appear here once you start training.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
