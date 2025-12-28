'use client'

import { changePassword } from '@/actions/auth'
import { useState } from 'react'
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function ChangePasswordForm() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const { t } = useLanguage()

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
        <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-slate-200 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg w-full max-w-md">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-[#11221f]" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t.settings.changePassword}</h2>
                    <p className="text-slate-500 dark:text-gray-400 text-sm">{t.settings.updateAccountPassword}</p>
                </div>
            </div>

            {/* Success Message */}
            {success && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl text-green-600 dark:text-green-400 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>{t.settings.passwordChanged}</div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>{error}</div>
                </div>
            )}

            <form action={handleSubmit} className="space-y-5">
                {/* Current Password */}
                <div>
                    <label htmlFor="currentPassword" className="block text-slate-700 dark:text-gray-300 font-semibold mb-2 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-primary" />
                        {t.settings.currentPassword}
                    </label>
                    <div className="relative">
                        <input
                            id="currentPassword"
                            name="currentPassword"
                            type={showCurrent ? 'text' : 'password'}
                            required
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800/50 border border-slate-300 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 transition-all pr-12"
                            placeholder={t.settings.enterCurrentPassword}
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400 hover:text-slate-600 dark:hover:text-gray-300 transition-colors"
                            tabIndex={-1}
                        >
                            {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div>
                    <label htmlFor="newPassword" className="block text-slate-700 dark:text-gray-300 font-semibold mb-2 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-primary" />
                        {t.settings.newPassword}
                    </label>
                    <div className="relative">
                        <input
                            id="newPassword"
                            name="newPassword"
                            type={showNew ? 'text' : 'password'}
                            required
                            className={`w-full px-4 py-3 bg-slate-50 dark:bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 transition-all pr-12 ${passwordTooShort ? 'border-red-400 dark:border-red-500/50' : 'border-slate-300 dark:border-gray-700/50'}`}
                            placeholder={t.settings.enterNewPassword}
                            disabled={loading}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400 hover:text-slate-600 dark:hover:text-gray-300 transition-colors"
                            tabIndex={-1}
                        >
                            {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {passwordTooShort && (
                        <p className="text-red-500 dark:text-red-400 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {t.settings.passwordMinLength}
                        </p>
                    )}
                </div>

                {/* Confirm New Password */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-slate-700 dark:text-gray-300 font-semibold mb-2 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-primary" />
                        {t.settings.confirmNewPassword}
                    </label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirm ? 'text' : 'password'}
                            required
                            className={`w-full px-4 py-3 bg-slate-50 dark:bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 transition-all pr-12 ${passwordsDoNotMatch ? 'border-red-400 dark:border-red-500/50' : 'border-slate-300 dark:border-gray-700/50'}`}
                            placeholder={t.settings.confirmNewPasswordPlaceholder}
                            disabled={loading}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400 hover:text-slate-600 dark:hover:text-gray-300 transition-colors"
                            tabIndex={-1}
                        >
                            {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {passwordsDoNotMatch && (
                        <p className="text-red-500 dark:text-red-400 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {t.settings.passwordsDoNotMatch}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || passwordTooShort || passwordsDoNotMatch}
                    className="w-full px-6 py-3 bg-primary hover:brightness-110 text-[#11221f] font-semibold rounded-xl transition-all glow-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            {t.settings.updating}
                        </>
                    ) : (
                        <>
                            <Lock className="w-5 h-5" />
                            {t.settings.updatePassword}
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}
