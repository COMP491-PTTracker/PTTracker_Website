import { getCurrentUser, logout } from '@/actions/auth'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Activity, LogOut, Calendar, Target, Clock } from 'lucide-react'

export default async function PatientDashboard() {
    const user = await getCurrentUser()

    if (!user || user.role !== 'patient') {
        redirect('/login')
    }

    const supabase = await createClient()

    const { data: logs } = await supabase
        .from('exercise_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900">
            {/* Header */}
            <header className="bg-gray-900/50 backdrop-blur-sm shadow-xl border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            My Exercise Logs
                        </h1>
                        <p className="text-gray-400 text-lg mt-1 ml-13">Welcome back, {user.full_name}!</p>
                    </div>
                    <form action={logout}>
                        <button type="submit" className="dark-btn-secondary flex items-center gap-2">
                            <LogOut className="w-5 h-5" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="dark-card">
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
                                                Score
                                            </div>
                                        </th>
                                        <th>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-primary-400" />
                                                Duration (min)
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
                                                    {log.score}
                                                </span>
                                            </td>
                                            <td className="text-gray-300">{log.duration}</td>
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
                            <h3 className="text-2xl font-semibold text-white mb-2">No Exercise Logs Yet</h3>
                            <p className="text-gray-400 text-lg">Your exercise logs will appear here once you start tracking.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
