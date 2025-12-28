'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Settings } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import ChangePasswordForm from '@/components/ChangePasswordForm'
import LanguageToggle from '@/components/LanguageToggle'
import ThemeToggle from '@/components/ThemeToggle'

interface SettingsPageClientProps {
    userRole: string
}

export default function SettingsPageClient({ userRole }: SettingsPageClientProps) {
    const { t } = useLanguage()

    const dashboardLink = userRole === 'patient' ? '/dashboard/patient' : '/dashboard/doctor'
    const dashboardLabel = userRole === 'patient' ? t.settings.backToPatientDashboard : t.settings.backToDoctorDashboard

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-background-light to-slate-50 dark:from-gray-900 dark:via-gray-950 dark:to-background-dark">
            {/* Toggle Controls - Fixed Position */}
            <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
            </div>

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
                                <Settings className="w-5 h-5 text-primary" />
                                {t.settings.changePassword}
                            </h1>
                            <p className="text-slate-600 dark:text-gray-400 text-sm">{t.settings.updateAccountPassword}</p>
                        </div>
                    </div>
                    <Link
                        href={dashboardLink}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-900 dark:text-white font-medium rounded-xl transition-colors border border-slate-200 dark:border-gray-700"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        {dashboardLabel}
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
