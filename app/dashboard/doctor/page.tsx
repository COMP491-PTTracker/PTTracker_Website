import { getCurrentUser } from '@/actions/auth'
import { getAllPatients } from '@/actions/doctor'
import { redirect } from 'next/navigation'
import CreatePatientForm from './CreatePatientForm'
import PatientCard from './PatientCard'
import SettingsDropdown from '@/components/SettingsDropdown'
import { Users, UserPlus } from 'lucide-react'

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
                    <div className="flex items-center gap-4">
                        {/* Doctor Profile Block */}
                        <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg px-4 py-2 border border-gray-700">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500/30 to-secondary-500/30 rounded-lg flex items-center justify-center border border-primary-500/30">
                                <span className="text-lg font-bold text-primary-400">
                                    {user.first_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase() || '?'}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">
                                    {user.first_name && user.last_name
                                        ? `Dr. ${user.first_name} ${user.last_name}`
                                        : 'Doctor'}
                                </p>
                                <p className="text-xs text-gray-400">{user.email}</p>
                            </div>
                        </div>
                        <SettingsDropdown />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Patients Section */}
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
                            <PatientCard key={patient.id} patient={patient} />
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
