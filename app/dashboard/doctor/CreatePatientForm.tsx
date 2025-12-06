'use client'

import { createPatient } from '@/actions/doctor'
import { useState } from 'react'
import { UserPlus, X, Mail, Lock, User } from 'lucide-react'

export default function CreatePatientForm() {
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        setSuccess(false)

        const result = await createPatient(formData)

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            setSuccess(true)
            setLoading(false)
            // Reset form and close modal after 2 seconds
            setTimeout(() => {
                setIsOpen(false)
                setSuccess(false)
            }, 2000)
        }
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="dark-btn-secondary flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Create New Patient
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="dark-card max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                                    <UserPlus className="w-6 h-6 text-white" />
                                </div>
                                Create New Patient
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800/50 rounded-lg"
                                disabled={loading}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-start gap-3">
                                <div className="text-red-500 mt-0.5">⚠</div>
                                <div>{error}</div>
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 flex items-start gap-3">
                                <div className="text-green-500 mt-0.5">✓</div>
                                <div>Patient created successfully!</div>
                            </div>
                        )}

                        <form action={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="full_name" className="dark-label flex items-center gap-2">
                                    <User className="w-5 h-5 text-primary-400" />
                                    Full Name
                                </label>
                                <input
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    required
                                    className="dark-input"
                                    placeholder="John Doe"
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="dark-label flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-primary-400" />
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="dark-input"
                                    placeholder="patient@example.com"
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="dark-label flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-primary-400" />
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    minLength={6}
                                    className="dark-input"
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                                <p className="text-sm text-gray-500 mt-1">Minimum 6 characters</p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 px-6 py-3 border-2 border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-800/50 transition-all"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 dark-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    {loading ? 'Creating...' : 'Create Patient'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
