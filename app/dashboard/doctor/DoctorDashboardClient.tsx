'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Users, UserPlus } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import SettingsDropdown from '@/components/SettingsDropdown'
import LanguageToggle from '@/components/LanguageToggle'
import ThemeToggle from '@/components/ThemeToggle'
import CreatePatientForm from './CreatePatientForm'
import PatientCard from './PatientCard'

interface DoctorDashboardClientProps {
    user: {
        first_name: string | null
        last_name: string | null
        email: string | null
    }
    patients: Array<{
        id: string
        first_name: string | null
        last_name: string | null
        email: string | null
    }>
}

export default function DoctorDashboardClient({ user, patients }: DoctorDashboardClientProps) {
    const { t } = useLanguage()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-background-light to-slate-50 dark:from-gray-900 dark:via-gray-950 dark:to-background-dark">
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm shadow-lg dark:shadow-xl border-b border-slate-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Image
                                src="/assets/pttracker3.png"
                                alt="PTTracker"
                                width={160}
                                height={40}
                                className="h-10 w-auto dark:brightness-0 dark:invert hover:opacity-80 transition-opacity"
                            />
                        </Link>
                        <div className="hidden sm:block h-8 w-px bg-slate-300 dark:bg-gray-700"></div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Users className="w-5 h-5 text-primary" />
                                {t.doctor.doctorDashboard}
                            </h1>
                            <p className="text-slate-600 dark:text-gray-400 text-sm">{t.doctor.managePatients}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Doctor Profile Block */}
                        <div className="hidden md:flex items-center gap-3 bg-slate-100 dark:bg-gray-800/50 rounded-lg px-4 py-2 border border-slate-200 dark:border-gray-700">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary/30 to-emerald-500/30 rounded-lg flex items-center justify-center border border-primary/30">
                                <span className="text-lg font-bold text-primary">
                                    {user.first_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase() || '?'}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                    {user.first_name && user.last_name
                                        ? `Dr. ${user.first_name} ${user.last_name}`
                                        : 'Doctor'}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-gray-400">{user.email}</p>
                            </div>
                        </div>
                        <LanguageToggle />
                        <ThemeToggle />
                        <SettingsDropdown />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Patients Section */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                            {t.doctor.yourPatients}
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 mt-1">
                            {patients.length} {patients.length === 1 ? t.doctor.patientInCare : t.doctor.patientsInCare}
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
                    <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-gray-950/80 backdrop-blur-sm border border-slate-200 dark:border-gray-700/50 rounded-2xl p-8 text-center py-16 shadow-lg">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <UserPlus className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">{t.doctor.noPatients}</h3>
                        <p className="text-slate-600 dark:text-gray-400 text-lg mb-6">{t.doctor.createFirstPatient}</p>
                    </div>
                )}
            </main>
        </div>
    )
}
