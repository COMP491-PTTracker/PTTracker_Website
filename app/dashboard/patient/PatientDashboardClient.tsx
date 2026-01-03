'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Activity, Calendar, Target, Clock, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import SettingsDropdown from '@/components/SettingsDropdown'
import LanguageToggle from '@/components/LanguageToggle'
import ThemeToggle from '@/components/ThemeToggle'

interface ExerciseResult {
    id: string
    exercise_name: string
    total_reps: number
    correct_reps: number
    accuracy: number
    duration_sec: number
    created_at: string
}

interface PatientDashboardClientProps {
    user: {
        first_name: string | null
    }
    exerciseResults: ExerciseResult[]
    currentStreak: number
}

export default function PatientDashboardClient({ user, exerciseResults, currentStreak }: PatientDashboardClientProps) {
    const { t, language } = useLanguage()

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-background-light to-slate-50 dark:from-gray-900 dark:via-gray-950 dark:to-background-dark">
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm shadow-lg dark:shadow-xl border-b border-slate-200 dark:border-gray-800 relative z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                    {/* Top row with logo, title, streak, and controls */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <Link href="/">
                                <Image
                                    src="/assets/pttracker3.png"
                                    alt="PTTracker"
                                    width={160}
                                    height={40}
                                    className="h-8 sm:h-10 w-auto dark:brightness-0 dark:invert hover:opacity-80 transition-opacity"
                                />
                            </Link>
                            <div className="hidden sm:block h-8 w-px bg-slate-300 dark:bg-gray-700"></div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-primary" />
                                    {t.patient.myExerciseResults}
                                </h1>
                                <p className="text-slate-600 dark:text-gray-400 text-sm">{t.patient.welcomeBack}, {user.first_name || 'Patient'}!</p>
                            </div>
                        </div>

                        {/* Right side: Streak + controls */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Exercise Streak Card */}
                            <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-500/20 dark:to-red-500/20 border border-orange-300 dark:border-orange-500/30 rounded-xl px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3">
                                <img src="/assets/flame.gif" alt="Streak flame" className="w-6 h-6 sm:w-10 sm:h-10" />
                                <div>
                                    <p className="text-orange-600 dark:text-orange-400 text-xs sm:text-sm font-medium">{t.patient.currentStreak}</p>
                                    <p className="text-slate-900 dark:text-white text-sm sm:text-xl font-bold">{currentStreak} {t.common.days}</p>
                                </div>
                            </div>

                            <div className="hidden sm:flex items-center gap-2">
                                <LanguageToggle />
                                <ThemeToggle />
                            </div>
                            <SettingsDropdown />
                        </div>
                    </div>

                    {/* Mobile: Welcome message below header */}
                    <div className="sm:hidden mt-3 flex items-center justify-between">
                        <div>
                            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Activity className="w-4 h-4 text-primary" />
                                {t.patient.myExerciseResults}
                            </h1>
                            <p className="text-slate-600 dark:text-gray-400 text-xs">{t.patient.welcomeBack}, {user.first_name || 'Patient'}!</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <LanguageToggle />
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-gray-950/80 backdrop-blur-sm border border-slate-200 dark:border-gray-700/50 rounded-2xl p-4 sm:p-6 shadow-lg">
                    {exerciseResults && exerciseResults.length > 0 ? (
                        <div>
                            <table className="w-full table-fixed">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-gray-700/50">
                                        <th className="w-20 sm:w-auto text-left py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-slate-700 dark:text-gray-300 font-semibold">
                                            <div className="flex items-center gap-1 sm:gap-2">
                                                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary hidden sm:block" />
                                                <span>{t.patient.date}</span>
                                            </div>
                                        </th>
                                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-slate-700 dark:text-gray-300 font-semibold">
                                            <div className="flex items-center gap-1 sm:gap-2">
                                                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-primary hidden sm:block" />
                                                <span className="truncate">{t.patient.exercise}</span>
                                            </div>
                                        </th>
                                        <th className="w-16 sm:w-auto text-left py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-slate-700 dark:text-gray-300 font-semibold">
                                            <div className="flex items-center gap-1 sm:gap-2">
                                                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary hidden sm:block" />
                                                <span className="hidden sm:inline">{t.patient.repsCorrectTotal}</span>
                                                <span className="sm:hidden">Reps</span>
                                            </div>
                                        </th>
                                        <th className="w-16 sm:w-auto text-left py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-slate-700 dark:text-gray-300 font-semibold">
                                            <div className="flex items-center gap-1 sm:gap-2">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary hidden sm:block" />
                                                <span className="hidden sm:inline">{t.patient.accuracy}</span>
                                                <span className="sm:hidden">Acc</span>
                                            </div>
                                        </th>
                                        <th className="hidden sm:table-cell w-24 text-left py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-slate-700 dark:text-gray-300 font-semibold">
                                            <div className="flex items-center gap-1 sm:gap-2">
                                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                                <span>{t.patient.duration}</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exerciseResults.map((result) => (
                                        <tr key={result.id} className="border-b border-slate-100 dark:border-gray-700/30 hover:bg-slate-50 dark:hover:bg-gray-700/20 transition-colors">
                                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-base text-slate-600 dark:text-gray-300">
                                                {formatDate(result.created_at)}
                                            </td>
                                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-base text-slate-900 dark:text-white font-medium truncate">
                                                {result.exercise_name}
                                            </td>
                                            <td className="py-3 sm:py-4 px-2 sm:px-4">
                                                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold">
                                                    {result.correct_reps}/{result.total_reps}
                                                </span>
                                            </td>
                                            <td className="py-3 sm:py-4 px-2 sm:px-4">
                                                <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${result.accuracy >= 80
                                                    ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400'
                                                    : result.accuracy >= 50
                                                        ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                                                        : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'
                                                    }`}>
                                                    {result.accuracy.toFixed(1)}%
                                                </span>
                                            </td>
                                            <td className="hidden sm:table-cell py-3 sm:py-4 px-2 sm:px-4 text-slate-600 dark:text-gray-300">
                                                {Math.floor(result.duration_sec / 60)}:{(result.duration_sec % 60).toString().padStart(2, '0')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Activity className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">{t.patient.noExerciseResults}</h3>
                            <p className="text-slate-600 dark:text-gray-400 text-lg">{t.patient.exerciseResultsAppear}</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
