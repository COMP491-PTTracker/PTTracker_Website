import { getCurrentUser, logout } from '@/actions/auth'
import { getAllPatients } from '@/actions/doctor'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import CreatePatientForm from './CreatePatientForm'
import { Users, LogOut, ArrowRight, UserPlus } from 'lucide-react'

export default async function DoctorDashboard() {
    const user = await getCurrentUser()

    if (!user || (user.role !== 'admin' && user.role !== 'doctor')) {
        redirect('/login')
    }

    const patients = await getAllPatients()

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900">
            {/* Header */}
            <header className="bg-gray-900/50 backdrop-blur-sm shadow-xl border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            Doctor Dashboard
                        </h1>
                        <p className="text-gray-400 text-lg mt-1 ml-13">Manage your patients and monitor progress</p>
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
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                            Your Patients
                        </h2>
                        <p className="text-gray-400 mt-1">
                            {patients.length} {patients.length === 1 ? 'patient' : 'patients'} in your care
                        </p>
                    </div>
                    <CreatePatientForm />
                </div>

                {patients.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {patients.map((patient) => (
                            <Link
                                key={patient.id}
                                href={`/dashboard/doctor/patient/${patient.id}`}
                                className="group dark-card hover:shadow-2xl hover:shadow-primary-500/10"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center text-2xl font-bold text-primary-400 border border-primary-500/20">
                                                {patient.first_name?.charAt(0) || '?'}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                                                    {patient.first_name && patient.last_name
                                                        ? `${patient.first_name} ${patient.last_name}`
                                                        : 'Unnamed Patient'}
                                                </h3>
                                                <p className="text-gray-500 text-sm truncate">{patient.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-primary-400 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                                        <ArrowRight className="w-6 h-6" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="dark-card text-center py-16">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <UserPlus className="w-10 h-10 text-primary-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-2">No Patients Yet</h3>
                        <p className="text-gray-400 text-lg mb-6">Create your first patient using the button above</p>
                    </div>
                )}
            </main>
        </div>
    )
}
