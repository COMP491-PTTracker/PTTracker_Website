'use client'

import { createPatient } from '@/actions/doctor'
import { useState } from 'react'

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
            <button onClick={() => setIsOpen(true)} className="btn-secondary">
                + Create New Patient
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Create New Patient</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                                disabled={loading}
                            >
                                ×
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
                                Patient created successfully!
                            </div>
                        )}

                        <form action={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="full_name" className="label">
                                    Full Name
                                </label>
                                <input
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    required
                                    className="input-field"
                                    placeholder="John Doe"
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="label">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="input-field"
                                    placeholder="patient@example.com"
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="label">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    minLength={6}
                                    className="input-field"
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                                <p className="text-sm text-gray-500 mt-1">Minimum 6 characters</p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
