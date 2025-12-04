import { getCurrentUser, logout } from '@/actions/auth'
import { getAllPatients } from '@/actions/doctor'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import CreatePatientForm from './CreatePatientForm'

export default async function DoctorDashboard() {
    const user = await getCurrentUser()

    if (!user || user.role !== 'admin') {
        redirect('/login')
    }

    const patients = await getAllPatients()

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
                        <p className="text-gray-600 text-lg mt-1">Manage your patients</p>
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
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900">Patient List</h2>
                    <CreatePatientForm />
                </div>

                {patients.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {patients.map((patient) => (
                            <Link
                                key={patient.id}
                                href={`/dashboard/doctor/patient/${patient.id}`}
                                className="card hover:shadow-xl transition-all duration-200 hover:scale-105"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                                                👤
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900">{patient.full_name}</h3>
                                                <p className="text-gray-600">{patient.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-primary-500 text-xl">→</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="card text-center py-12">
                        <div className="text-6xl mb-4">👥</div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Patients Yet</h3>
                        <p className="text-gray-600 text-lg mb-6">Create your first patient to get started</p>
                        <CreatePatientForm />
                    </div>
                )}
            </main>
        </div>
    )
}
