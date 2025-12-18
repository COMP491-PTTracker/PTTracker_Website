'use client'

import { changePassword } from '@/actions/auth'
import { useState } from 'react'
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'

export default function ChangePasswordForm() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    // Password values for instant validation
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // Show/hide password toggles
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    // Instant validation checks
    const passwordTooShort = newPassword.length > 0 && newPassword.length < 6
    const passwordsDoNotMatch = confirmPassword.length > 0 && newPassword !== confirmPassword

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        setSuccess(false)

        const result = await changePassword(formData)

        if (result?.error) {
            setError(result.error)
            setLoading(false)
        } else if (result?.success) {
            setSuccess(true)
            setLoading(false)
            // Clear form
            setNewPassword('')
            setConfirmPassword('')
            const form = document.querySelector('form') as HTMLFormElement
            form?.reset()
        }
    }

    return (
        <div className="dark-card w-full max-w-md">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-white">Change Password</h2>
                    <p className="text-gray-400 text-sm">Update your account password</p>
                </div>
            </div>

            {/* Success Message */}
            {success && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>Password changed successfully!</div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>{error}</div>
                </div>
            )}

            <form action={handleSubmit} className="space-y-5">
                {/* Current Password */}
                <div>
                    <label htmlFor="currentPassword" className="dark-label flex items-center gap-2 mb-2">
                        <Lock className="w-4 h-4 text-primary-400" />
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            id="currentPassword"
                            name="currentPassword"
                            type={showCurrent ? 'text' : 'password'}
                            required
                            className="dark-input pr-12"
                            placeholder="Enter current password"
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                            tabIndex={-1}
                        >
                            {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div>
                    <label htmlFor="newPassword" className="dark-label flex items-center gap-2 mb-2">
                        <Lock className="w-4 h-4 text-primary-400" />
                        New Password
                    </label>
                    <div className="relative">
                        <input
                            id="newPassword"
                            name="newPassword"
                            type={showNew ? 'text' : 'password'}
                            required
                            className={`dark-input pr-12 ${passwordTooShort ? 'border-red-500/50 focus:border-red-500' : ''}`}
                            placeholder="Enter new password"
                            disabled={loading}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                            tabIndex={-1}
                        >
                            {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {passwordTooShort && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            Password must be at least 6 characters
                        </p>
                    )}
                </div>

                {/* Confirm New Password */}
                <div>
                    <label htmlFor="confirmPassword" className="dark-label flex items-center gap-2 mb-2">
                        <Lock className="w-4 h-4 text-primary-400" />
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirm ? 'text' : 'password'}
                            required
                            className={`dark-input pr-12 ${passwordsDoNotMatch ? 'border-red-500/50 focus:border-red-500' : ''}`}
                            placeholder="Confirm new password"
                            disabled={loading}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                            tabIndex={-1}
                        >
                            {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {passwordsDoNotMatch && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            Passwords do not match
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || passwordTooShort || passwordsDoNotMatch}
                    className="w-full dark-btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        <>
                            <Lock className="w-5 h-5" />
                            Update Password
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}
