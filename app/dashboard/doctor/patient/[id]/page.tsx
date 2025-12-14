import { getCurrentUser } from '@/actions/auth'
import { getPatientExerciseLogs } from '@/actions/doctor'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Activity, Calendar, Target, Clock, CheckCircle } from 'lucide-react'

export default async function PatientDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const user = await getCurrentUser()

    if (!user || (user.role !== 'admin' && user.role !== 'doctor')) {
        redirect('/login')
    }

    const supabase = await createClient()

    // Get patient info from users table
    const { data: patient } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

    if (!patient) {
        redirect('/dashboard/doctor')
    }

    // Get patient record to find patient_id for streak lookup
    const { data: patientRecord } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', id)
        .single()

    // Get patient's current streak
    let currentStreak = 0
    if (patientRecord) {
        const { data: streakData } = await supabase
            .from('streaks')
            .select('current_streak')
            .eq('patient_id', patientRecord.id)
            .single()

        currentStreak = streakData?.current_streak || 0
    }

    // Get patient's exercise results
    const logs = await getPatientExerciseLogs(id)

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900">
            {/* Header */}
            <header className="bg-gray-900/50 backdrop-blur-sm shadow-xl border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <Link
                        href="/dashboard/doctor"
                        className="text-primary-400 hover:text-primary-300 font-medium text-lg inline-flex items-center gap-2 mb-4 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </Link>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center text-3xl font-bold text-primary-400 border border-primary-500/20">
                                {patient.first_name?.charAt(0) || '?'}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    {patient.first_name && patient.last_name
                                        ? `${patient.first_name} ${patient.last_name}`
                                        : 'Unnamed Patient'}
                                </h1>
                                <p className="text-gray-400 text-lg mt-1">{patient.email}</p>
                            </div>
                        </div>
                        {/* Streak Badge */}
                        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl px-4 py-3 flex items-center gap-3">
                            <img src="/assets/flame.gif" alt="Streak flame" className="w-10 h-10" />
                            <div>
                                <p className="text-orange-400 text-sm font-medium">Current Streak</p>
                                <p className="text-white text-xl font-bold">{currentStreak} Days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="dark-card">
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                        <Activity className="w-7 h-7 text-primary-400" />
                        Exercise Results
                    </h2>

                    {logs && logs.length > 0 ? (
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
                                    {logs.map((log) => (
                                        <tr key={log.id}>
                                            <td className="text-gray-300">
                                                {new Date(log.created_at).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="text-white font-medium">{log.exercise_name}</td>
                                            <td>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 font-semibold">
                                                    {log.correct_reps}/{log.total_reps}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full font-semibold ${log.accuracy >= 80
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : log.accuracy >= 50
                                                        ? 'bg-yellow-500/20 text-yellow-400'
                                                        : 'bg-red-500/20 text-red-400'
                                                    }`}>
                                                    {log.accuracy.toFixed(1)}%
                                                </span>
                                            </td>
                                            <td className="text-gray-300">
                                                {Math.floor(log.duration_sec / 60)}:{(log.duration_sec % 60).toString().padStart(2, '0')}
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
                            <h3 className="text-2xl font-semibold text-white mb-2">No Exercise Results</h3>
                            <p className="text-gray-400 text-lg">This patient hasn&apos;t recorded any exercises yet.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
