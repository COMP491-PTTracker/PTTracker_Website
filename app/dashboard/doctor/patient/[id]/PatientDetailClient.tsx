'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Activity, Calendar, Target, Clock, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import ThemeToggle from '@/components/ThemeToggle'

interface ExerciseLog {
    id: string
    exercise_name: string
    total_reps: number
    correct_reps: number
    accuracy: number
    duration_sec: number
    created_at: string
}

interface PatientDetailClientProps {
    patient: {
        first_name: string | null
        last_name: string | null
        email: string | null
    }
    currentStreak: number
    logs: ExerciseLog[]
}

export default function PatientDetailClient({ patient, currentStreak, logs }: PatientDetailClientProps) {
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
            {/* Toggle Controls - Fixed Position */}
            <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
            </div>

            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm shadow-lg dark:shadow-xl border-b border-slate-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/">
                            <Image
                                src="/assets/pttracker3.png"
                                alt="PTTracker"
                                width={160}
                                height={40}
                                className="h-10 w-auto dark:brightness-0 dark:invert hover:opacity-80 transition-opacity"
                            />
                        </Link>
                        <div className="h-8 w-px bg-slate-300 dark:bg-gray-700"></div>
                        <Link
                            href="/dashboard/doctor"
                            className="text-primary hover:brightness-110 font-medium text-lg inline-flex items-center gap-2 transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            {t.patientDetail.backToDashboard}
                        </Link>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-full flex items-center justify-center text-3xl font-bold text-primary border border-primary/20">
                                {patient.first_name?.charAt(0) || '?'}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                                    {patient.first_name && patient.last_name
                                        ? `${patient.first_name} ${patient.last_name}`
                                        : t.doctor.unnamedPatient}
                                </h1>
                                <p className="text-slate-600 dark:text-gray-400 text-lg mt-1">{patient.email}</p>
                            </div>
                        </div>
                        {/* Streak Badge */}
                        <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-500/20 dark:to-red-500/20 border border-orange-300 dark:border-orange-500/30 rounded-xl px-4 py-3 flex items-center gap-3">
                            <img src="/assets/flame.gif" alt="Streak flame" className="w-10 h-10" />
                            <div>
                                <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">{t.patient.currentStreak}</p>
                                <p className="text-slate-900 dark:text-white text-xl font-bold">{currentStreak} {t.common.days}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-gray-950/80 backdrop-blur-sm border border-slate-200 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                        <Activity className="w-7 h-7 text-primary" />
                        {t.patientDetail.exerciseResults}
                    </h2>

                    {logs && logs.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-gray-700/50">
                                        <th className="text-left py-4 px-4 text-slate-700 dark:text-gray-300 font-semibold">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-5 h-5 text-primary" />
                                                {t.patient.date}
                                            </div>
                                        </th>
                                        <th className="text-left py-4 px-4 text-slate-700 dark:text-gray-300 font-semibold">
                                            <div className="flex items-center gap-2">
                                                <Activity className="w-5 h-5 text-primary" />
                                                {t.patient.exercise}
                                            </div>
                                        </th>
                                        <th className="text-left py-4 px-4 text-slate-700 dark:text-gray-300 font-semibold">
                                            <div className="flex items-center gap-2">
                                                <Target className="w-5 h-5 text-primary" />
                                                {t.patient.repsCorrectTotal}
                                            </div>
                                        </th>
                                        <th className="text-left py-4 px-4 text-slate-700 dark:text-gray-300 font-semibold">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5 text-primary" />
                                                {t.patient.accuracy}
                                            </div>
                                        </th>
                                        <th className="text-left py-4 px-4 text-slate-700 dark:text-gray-300 font-semibold">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-primary" />
                                                {t.patient.duration}
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log) => (
                                        <tr key={log.id} className="border-b border-slate-100 dark:border-gray-700/30 hover:bg-slate-50 dark:hover:bg-gray-700/20 transition-colors">
                                            <td className="py-4 px-4 text-slate-600 dark:text-gray-300">
                                                {formatDate(log.created_at)}
                                            </td>
                                            <td className="py-4 px-4 text-slate-900 dark:text-white font-medium">{log.exercise_name}</td>
                                            <td className="py-4 px-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                                                    {log.correct_reps}/{log.total_reps}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full font-semibold ${log.accuracy >= 80
                                                    ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400'
                                                    : log.accuracy >= 50
                                                        ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                                                        : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'
                                                    }`}>
                                                    {log.accuracy.toFixed(1)}%
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-slate-600 dark:text-gray-300">
                                                {Math.floor(log.duration_sec / 60)}:{(log.duration_sec % 60).toString().padStart(2, '0')}
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
                            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">{t.patientDetail.noExerciseResults}</h3>
                            <p className="text-slate-600 dark:text-gray-400 text-lg">{t.patientDetail.noExercisesRecorded}</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
