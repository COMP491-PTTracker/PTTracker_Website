import { getCurrentUser, logout } from '@/actions/auth'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

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
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Exercise Logs</h1>
                        <p className="text-gray-600 text-lg mt-1">Welcome back, {user.full_name}!</p>
                    </div>
                    <form action={logout}>
                        <button type="submit" className="btn-secondary">
                            Sign Out
                        </button>
                    </form>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="card">
                    {logs && logs.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="text-left py-4 px-4 text-lg font-semibold text-gray-700">Date</th>
                                        <th className="text-left py-4 px-4 text-lg font-semibold text-gray-700">Exercise</th>
                                        <th className="text-left py-4 px-4 text-lg font-semibold text-gray-700">Score</th>
                                        <th className="text-left py-4 px-4 text-lg font-semibold text-gray-700">Duration (min)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log) => (
                                        <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-4 text-lg text-gray-900">
                                                {new Date(log.created_at).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="py-4 px-4 text-lg text-gray-900">{log.exercise_name}</td>
                                            <td className="py-4 px-4 text-lg font-semibold text-primary-600">{log.score}</td>
                                            <td className="py-4 px-4 text-lg text-gray-900">{log.duration}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Exercise Logs Yet</h3>
                            <p className="text-gray-600 text-lg">Your exercise logs will appear here once you start tracking.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
