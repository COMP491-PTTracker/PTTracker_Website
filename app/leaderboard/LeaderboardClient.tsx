'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trophy, ChevronDown, ArrowLeft, Medal } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import ThemeToggle from '@/components/ThemeToggle'

interface LeaderboardEntry {
    result_id: number
    patient_id: number
    patient_name: string
    exercise_name: string
    accuracy: number
    total_reps: number
    date: string
}

interface Exercise {
    id: number
    name: string
}

interface LeaderboardClientProps {
    leaderboardData: LeaderboardEntry[]
    exercises: Exercise[]
}

export default function LeaderboardClient({ leaderboardData, exercises }: LeaderboardClientProps) {
    const { t } = useLanguage()
    const [selectedExercise, setSelectedExercise] = useState<string>('all')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    // Filter data based on selected exercise
    const filteredData = selectedExercise === 'all'
        ? leaderboardData
        : leaderboardData.filter(entry => entry.exercise_name === selectedExercise)

    // Sort by accuracy descending
    const sortedData = [...filteredData].sort((a, b) => b.accuracy - a.accuracy)

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return (
                    <span
                        className="text-base font-black animate-pulse"
                        style={{
                            background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 25%, #ffd700 50%, #ffaa00 75%, #ffd700 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                        }}
                    >
                        1
                    </span>
                )
            case 2:
                return (
                    <span
                        className="text-base font-black"
                        style={{
                            background: 'linear-gradient(135deg, #e8e8e8 0%, #ffffff 25%, #c0c0c0 50%, #a8a8a8 75%, #d0d0d0 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 0 4px rgba(192, 192, 192, 0.6)) drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2))',
                        }}
                    >
                        2
                    </span>
                )
            case 3:
                return (
                    <span
                        className="text-xl font-black"
                        style={{
                            background: 'linear-gradient(135deg, #cd7f32 0%, #f4a460 25%, #cd7f32 50%, #8b4513 75%, #cd7f32 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 0 4px rgba(205, 127, 50, 0.6)) drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2))',
                        }}
                    >
                        3
                    </span>
                )
            default:
                return <span className="flex items-center justify-center text-slate-500 dark:text-gray-400 font-bold">{rank}</span>
        }
    }

    const selectedExerciseName = selectedExercise === 'all'
        ? t.leaderboard.allExercises
        : selectedExercise

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
                                <Trophy className="w-5 h-5 text-primary" />
                                {t.leaderboard.title}
                            </h1>
                            <p className="text-slate-600 dark:text-gray-400 text-sm">{t.leaderboard.subtitle}</p>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">{t.login.backToHome}</span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-8">
                {/* Filter Section */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                        {t.leaderboard.filterByExercise}
                    </label>
                    <div className="relative w-full max-w-xs">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white hover:border-primary/50 transition-colors"
                        >
                            <span>{selectedExerciseName}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
                                <button
                                    onClick={() => {
                                        setSelectedExercise('all')
                                        setIsDropdownOpen(false)
                                    }}
                                    className={`w-full px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors ${selectedExercise === 'all' ? 'bg-primary/10 text-primary' : 'text-slate-900 dark:text-white'
                                        }`}
                                >
                                    {t.leaderboard.allExercises}
                                </button>
                                {exercises.map((exercise) => (
                                    <button
                                        key={exercise.id}
                                        onClick={() => {
                                            setSelectedExercise(exercise.name)
                                            setIsDropdownOpen(false)
                                        }}
                                        className={`w-full px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors ${selectedExercise === exercise.name ? 'bg-primary/10 text-primary' : 'text-slate-900 dark:text-white'
                                            }`}
                                    >
                                        {exercise.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Leaderboard Table */}
                <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-gray-950/80 backdrop-blur-sm border border-slate-200 dark:border-gray-700/50 rounded-2xl shadow-lg overflow-hidden">
                    {sortedData.length > 0 ? (
                        <div>
                            <table className="w-full table-fixed">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-gray-800/50 border-b border-slate-200 dark:border-gray-700">
                                        <th className="w-12 sm:w-16 px-2 sm:px-4 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 dark:text-gray-300">
                                            {t.leaderboard.rank}
                                        </th>
                                        <th className="px-2 sm:px-4 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 dark:text-gray-300">
                                            {t.leaderboard.patient}
                                        </th>
                                        <th className="px-2 sm:px-4 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 dark:text-gray-300">
                                            {t.leaderboard.exercise}
                                        </th>
                                        <th className="px-2 sm:px-4 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 dark:text-gray-300">
                                            {t.leaderboard.accuracy}
                                        </th>
                                        <th className="hidden sm:table-cell px-2 sm:px-4 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 dark:text-gray-300">
                                            {t.leaderboard.totalReps}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedData.map((entry, index) => (
                                        <tr
                                            key={entry.result_id}
                                            className={`border-b border-slate-100 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-800/30 transition-colors ${index < 3 ? 'bg-gradient-to-r from-primary/5 to-transparent' : ''
                                                }`}
                                        >
                                            <td className="px-2 sm:px-4 py-3 sm:py-4">
                                                <div className="flex items-center justify-center sm:justify-start">
                                                    {getRankIcon(index + 1)}
                                                </div>
                                            </td>
                                            <td className="px-2 sm:px-4 py-3 sm:py-4">
                                                <span className="font-medium text-xs sm:text-base text-slate-900 dark:text-white truncate block">
                                                    {entry.patient_name}
                                                </span>
                                            </td>
                                            <td className="px-2 sm:px-4 py-3 sm:py-4">
                                                <span className="text-xs sm:text-base text-slate-600 dark:text-gray-400 truncate block">
                                                    {entry.exercise_name}
                                                </span>
                                            </td>
                                            <td className="px-2 sm:px-4 py-3 sm:py-4">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                                    <div className="w-12 sm:w-20 h-2 bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full"
                                                            style={{ width: `${entry.accuracy}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white">
                                                        {entry.accuracy.toFixed(1)}%
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="hidden sm:table-cell px-2 sm:px-4 py-3 sm:py-4">
                                                <span className="text-slate-600 dark:text-gray-400">
                                                    {entry.total_reps}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Trophy className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                {t.leaderboard.noResults}
                            </h3>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
