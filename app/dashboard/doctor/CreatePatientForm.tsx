'use client'

import { createPatient } from '@/actions/doctor'
import { useState, useEffect } from 'react'
import { UserPlus, X, Mail, Lock, User, RefreshCw } from 'lucide-react'

export default function CreatePatientForm() {
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [tempPassword, setTempPassword] = useState('')

    // Generate a simple temporary password
    const generateTempPassword = () => {
        const adjectives = ['Happy', 'Sunny', 'Bright', 'Swift', 'Lucky', 'Smart', 'Quick', 'Safe']
        const nouns = ['Star', 'Moon', 'Tree', 'Bird', 'Fish', 'Bear', 'Lion', 'Wolf']
        const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)]
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
        const randomNum = Math.floor(Math.random() * 100)
        return `${randomAdj}${randomNoun}${randomNum}`
    }

    // Generate password when modal opens
    useEffect(() => {
        if (isOpen) {
            setTempPassword(generateTempPassword())
        }
    }, [isOpen])

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        setSuccess(false)

        // Add the temporary password to form data
        formData.set('password', tempPassword)

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
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="dark-card max-w-md w-full my-8 max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center mb-6 flex-shrink-0">
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

                        <div className="overflow-y-auto flex-1 pr-2">
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
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="first_name" className="dark-label flex items-center gap-2">
                                            <User className="w-5 h-5 text-primary-400" />
                                            First Name
                                        </label>
                                        <input
                                            id="first_name"
                                            name="first_name"
                                            type="text"
                                            required
                                            className="dark-input"
                                            placeholder="John"
                                            disabled={loading}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="last_name" className="dark-label flex items-center gap-2">
                                            <User className="w-5 h-5 text-primary-400" />
                                            Last Name
                                        </label>
                                        <input
                                            id="last_name"
                                            name="last_name"
                                            type="text"
                                            required
                                            className="dark-input"
                                            placeholder="Doe"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="national_id" className="dark-label">
                                        National ID
                                    </label>
                                    <input
                                        id="national_id"
                                        name="national_id"
                                        type="text"
                                        required
                                        minLength={11}
                                        maxLength={11}
                                        pattern="[0-9]{11}"
                                        className="dark-input"
                                        placeholder="12345678901"
                                        disabled={loading}
                                        onInput={(e) => {
                                            const input = e.currentTarget
                                            input.value = input.value.replace(/[^0-9]/g, '')
                                        }}
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Must be exactly 11 digits</p>
                                </div>

                                <div>
                                    <label htmlFor="pin_code" className="dark-label flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-primary-400" />
                                        PIN Code
                                    </label>
                                    <input
                                        id="pin_code"
                                        name="pin_code"
                                        type="text"
                                        required
                                        minLength={4}
                                        maxLength={4}
                                        pattern="[0-9]{4}"
                                        className="dark-input"
                                        placeholder="1234"
                                        disabled={loading}
                                        onInput={(e) => {
                                            const input = e.currentTarget
                                            input.value = input.value.replace(/[^0-9]/g, '')
                                        }}
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Must be exactly 4 digits</p>
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
                                        Temporary Password
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="text"
                                            value={tempPassword}
                                            onChange={(e) => setTempPassword(e.target.value)}
                                            required
                                            minLength={6}
                                            className="dark-input flex-1 font-mono"
                                            placeholder="Enter or generate password"
                                            disabled={loading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setTempPassword(generateTempPassword())}
                                            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                                            disabled={loading}
                                            title="Generate new password"
                                        >
                                            <RefreshCw className="w-5 h-5 text-gray-300" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-amber-400 mt-1 flex items-start gap-1">
                                        <span>⚠</span>
                                        <span>Patient will change this password on first login</span>
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="birth_date" className="dark-label">
                                            Birth Date
                                        </label>
                                        <input
                                            id="birth_date"
                                            name="birth_date"
                                            type="date"
                                            className="dark-input"
                                            disabled={loading}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="dark-label">
                                            Phone
                                        </label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            className="dark-input"
                                            placeholder="+1234567890"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="device_id" className="dark-label">
                                        Device ID
                                    </label>
                                    <input
                                        id="device_id"
                                        name="device_id"
                                        type="number"
                                        required
                                        className="dark-input"
                                        placeholder="1"
                                        disabled={loading}
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Physical therapy device identifier</p>
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
                </div>
            )}
        </>
    )
}

