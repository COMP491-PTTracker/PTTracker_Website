'use client'

import { login } from '@/actions/auth'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Mail, Lock, LogIn } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import ThemeToggle from '@/components/ThemeToggle'

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const { t } = useLanguage()

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)

        const result = await login(formData)

        if (result?.error) {
            setError(result.error)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-background-light to-slate-50 dark:from-gray-900 dark:via-gray-950 dark:to-background-dark relative overflow-hidden">
            {/* Toggle Controls - Fixed Position */}
            <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Grid Overlay */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            <div className="max-w-md w-full mx-6 relative z-10">
                <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-slate-200 dark:border-gray-700/50 rounded-2xl p-8 shadow-xl">
                    <div className="text-center mb-8">
                        <Link href="/" className="mb-4 block">
                            <Image
                                src="/assets/pttracker3.png"
                                alt="PTTracker"
                                width={200}
                                height={50}
                                className="h-12 w-auto mx-auto dark:brightness-0 dark:invert hover:opacity-80 transition-opacity"
                            />
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t.login.welcomeBack}</h1>
                        <p className="text-slate-600 dark:text-gray-400 text-lg">{t.login.signInToPortal}</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400 flex items-start gap-3">
                            <div className="text-red-500 mt-0.5">⚠</div>
                            <div>{error}</div>
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-slate-700 dark:text-gray-300 font-semibold mb-2 text-lg flex items-center gap-2">
                                <Mail className="w-5 h-5 text-primary" />
                                {t.login.emailAddress}
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800/50 border border-slate-300 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 text-lg transition-all"
                                placeholder={t.login.emailPlaceholder}
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-slate-700 dark:text-gray-300 font-semibold mb-2 text-lg flex items-center gap-2">
                                <Lock className="w-5 h-5 text-primary" />
                                {t.login.password}
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800/50 border border-slate-300 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 text-lg transition-all"
                                placeholder={t.login.passwordPlaceholder}
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-primary hover:brightness-110 text-[#11221f] font-semibold rounded-xl transition-all duration-200 shadow-lg glow-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-[#11221f]/30 border-t-[#11221f] rounded-full animate-spin" />
                                    {t.login.signingIn}
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    {t.login.signIn}
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-gray-700/50">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 text-primary hover:brightness-110 font-medium transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            {t.login.backToHome}
                        </Link>
                    </div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-transparent to-emerald-500/10 rounded-3xl blur-2xl -z-10" />
            </div>
        </div>
    )
}
