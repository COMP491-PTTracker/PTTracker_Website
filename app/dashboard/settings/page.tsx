import { getCurrentUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Settings } from 'lucide-react'
import ChangePasswordForm from '@/components/ChangePasswordForm'

export default async function SettingsPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    // Determine the back link based on user role
    const dashboardLink = user.role === 'patient' ? '/dashboard/patient' : '/dashboard/doctor'
    const dashboardLabel = user.role === 'patient' ? 'Patient Dashboard' : 'Doctor Dashboard'

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900">
            {/* Header */}
            <header className="bg-gray-900/50 backdrop-blur-sm shadow-xl border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                                <Settings className="w-6 h-6 text-white" />
                            </div>
                            Change Password
                        </h1>
                        <p className="text-gray-400 text-lg mt-1 ml-13">Update your account password</p>
                    </div>
                    <Link
                        href={dashboardLink}
                        className="dark-btn-secondary flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to {dashboardLabel}
                    </Link>
                </div>
            </header>

            {/* Main Content - Centered */}
            <main className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6 py-8">
                <ChangePasswordForm />
            </main>
        </div>
    )
}
