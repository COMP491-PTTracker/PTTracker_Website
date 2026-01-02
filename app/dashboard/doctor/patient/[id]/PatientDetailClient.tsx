'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Activity, Calendar, Target, Clock, CheckCircle, Plus, Pencil, ClipboardList } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import ThemeToggle from '@/components/ThemeToggle'
import { assignExerciseToPatient, updatePatientProgram } from '@/actions/doctor'

interface ExerciseLog {
    id: string
    exercise_name: string
    total_reps: number
    correct_reps: number
    accuracy: number
    duration_sec: number
    created_at: string
}

interface AssignedExercise {
    id: number
    exercise_id: number | null
    exercise_name: string
    repetitions: number
    created_at: string | null
}

interface Exercise {
    id: number
    name: string
}

interface PatientDetailClientProps {
    patient: {
        first_name: string | null
        last_name: string | null
        email: string | null
    }
    patientUserId: string
    currentStreak: number
    logs: ExerciseLog[]
    assignedExercises: AssignedExercise[]
    allExercises: Exercise[]
}

export default function PatientDetailClient({
    patient,
    patientUserId,
    currentStreak,
    logs,
    assignedExercises,
    allExercises
}: PatientDetailClientProps) {
    const { t, language } = useLanguage()

    // Modal states
    const [showAssignModal, setShowAssignModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null)
    const [repetitions, setRepetitions] = useState('')
    const [editingProgram, setEditingProgram] = useState<AssignedExercise | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    // State for edit modal exercise selection
    const [editExerciseId, setEditExerciseId] = useState<number | null>(null)

    const handleAssignExercise = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedExerciseId || !repetitions) return

        setIsSubmitting(true)
        setMessage(null)

        const result = await assignExerciseToPatient(patientUserId, selectedExerciseId, parseInt(repetitions))

        if (result.error) {
            setMessage({ type: 'error', text: result.error })
        } else {
            setMessage({ type: 'success', text: t.patientDetail.assignSuccess })
            setShowAssignModal(false)
            setSelectedExerciseId(null)
            setRepetitions('')
        }

        setIsSubmitting(false)
    }

    const handleUpdateProgram = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editingProgram || !editExerciseId || !repetitions) return

        setIsSubmitting(true)
        setMessage(null)

        const result = await updatePatientProgram(editingProgram.id, editExerciseId, parseInt(repetitions))

        if (result.error) {
            setMessage({ type: 'error', text: result.error })
        } else {
            setMessage({ type: 'success', text: t.patientDetail.updateSuccess })
            setShowEditModal(false)
            setEditingProgram(null)
            setEditExerciseId(null)
            setRepetitions('')
        }

        setIsSubmitting(false)
    }

    const openEditModal = (program: AssignedExercise) => {
        setEditingProgram(program)
        setEditExerciseId(program.exercise_id)
        setRepetitions(program.repetitions.toString())
        setShowEditModal(true)
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
            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                {/* Success/Error Message */}
                {message && (
                    <div className={`p-4 rounded-xl border ${message.type === 'success'
                        ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400'
                        : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400'
                        }`}>
                        {message.text}
                    </div>
                )}

                {/* Assigned Exercises Section */}
                <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-gray-950/80 backdrop-blur-sm border border-slate-200 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                            <ClipboardList className="w-7 h-7 text-primary" />
                            {t.patientDetail.assignedExercises}
                        </h2>
                        <button
                            onClick={() => setShowAssignModal(true)}
                            disabled={allExercises.length === 0}
                            className="dark-btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Plus className="w-5 h-5" />
                            {t.patientDetail.assignExercise}
                        </button>
                    </div>

                    {assignedExercises && assignedExercises.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-gray-700/50">
                                        <th className="text-left py-4 px-4 text-slate-700 dark:text-gray-300 font-semibold">
                                            <div className="flex items-center gap-2">
                                                <Activity className="w-5 h-5 text-primary" />
                                                {t.patient.exercise}
                                            </div>
                                        </th>
                                        <th className="text-left py-4 px-4 text-slate-700 dark:text-gray-300 font-semibold">
                                            <div className="flex items-center gap-2">
                                                <Target className="w-5 h-5 text-primary" />
                                                {t.patientDetail.repetitions}
                                            </div>
                                        </th>
                                        <th className="text-left py-4 px-4 text-slate-700 dark:text-gray-300 font-semibold">
                                            {t.patientDetail.actions}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignedExercises.map((exercise) => (
                                        <tr key={exercise.id} className="border-b border-slate-100 dark:border-gray-700/30 hover:bg-slate-50 dark:hover:bg-gray-700/20 transition-colors">
                                            <td className="py-4 px-4 text-slate-900 dark:text-white font-medium">
                                                {exercise.exercise_name}
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                                                    {exercise.repetitions}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <button
                                                    onClick={() => openEditModal(exercise)}
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-700 dark:text-gray-300 rounded-lg transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                    {t.patientDetail.edit}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ClipboardList className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{t.patientDetail.noAssignedExercises}</h3>
                            <p className="text-slate-600 dark:text-gray-400">{t.patientDetail.noAssignedExercisesDesc}</p>
                        </div>
                    )}
                </div>

                {/* Exercise Results Section */}
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

            {/* Assign Exercise Modal */}
            {showAssignModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-200 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                            {t.patientDetail.assignExercise}
                        </h3>
                        <form onSubmit={handleAssignExercise} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                    {t.patient.exercise}
                                </label>
                                <select
                                    value={selectedExerciseId || ''}
                                    onChange={(e) => setSelectedExerciseId(parseInt(e.target.value))}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    required
                                >
                                    <option value="">{t.patientDetail.selectExercise}</option>
                                    {allExercises.map((ex) => (
                                        <option key={ex.id} value={ex.id}>{ex.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                    {t.patientDetail.repetitions}
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="99"
                                    value={repetitions}
                                    onChange={(e) => setRepetitions(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAssignModal(false)
                                        setSelectedExerciseId(null)
                                        setRepetitions('')
                                    }}
                                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 font-medium hover:bg-slate-50 dark:hover:bg-gray-800 transition-all"
                                >
                                    {t.common.cancel}
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-medium hover:brightness-110 disabled:opacity-50 transition-all"
                                >
                                    {isSubmitting ? t.common.loading : t.common.save}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Program Modal */}
            {showEditModal && editingProgram && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-200 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                            {t.patientDetail.edit}
                        </h3>
                        <form onSubmit={handleUpdateProgram} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                    {t.patient.exercise}
                                </label>
                                <select
                                    value={editExerciseId || ''}
                                    onChange={(e) => setEditExerciseId(parseInt(e.target.value))}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    required
                                >
                                    <option value="">{t.patientDetail.selectExercise}</option>
                                    {allExercises.map((ex) => (
                                        <option key={ex.id} value={ex.id}>{ex.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                    {t.patientDetail.repetitions}
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="99"
                                    value={repetitions}
                                    onChange={(e) => setRepetitions(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditModal(false)
                                        setEditingProgram(null)
                                        setEditExerciseId(null)
                                        setRepetitions('')
                                    }}
                                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 font-medium hover:bg-slate-50 dark:hover:bg-gray-800 transition-all"
                                >
                                    {t.common.cancel}
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-medium hover:brightness-110 disabled:opacity-50 transition-all"
                                >
                                    {isSubmitting ? t.common.loading : t.common.save}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
