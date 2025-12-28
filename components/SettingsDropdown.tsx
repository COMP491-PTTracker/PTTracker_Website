'use client'

import { useState, useRef, useEffect } from 'react'
import { logout } from '@/actions/auth'
import Link from 'next/link'
import { Settings, LogOut, Lock } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function SettingsDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { t } = useLanguage()

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Settings Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 bg-slate-100 dark:bg-gray-800/50 hover:bg-slate-200 dark:hover:bg-gray-700/50 border border-slate-200 dark:border-gray-700 hover:border-primary/30 rounded-xl transition-all duration-200"
                title={t.common.settings}
            >
                <Settings className="w-5 h-5 text-slate-500 dark:text-gray-400 hover:text-primary" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden z-[100]">
                    <Link
                        href="/dashboard/settings"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700/50 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <Lock className="w-4 h-4 text-primary" />
                        {t.settings.changePassword}
                    </Link>
                    <form action={logout}>
                        <button
                            type="submit"
                            className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700/50 hover:text-slate-900 dark:hover:text-white transition-colors border-t border-slate-200 dark:border-gray-700"
                        >
                            <LogOut className="w-4 h-4 text-red-500 dark:text-red-400" />
                            {t.settings.signOut}
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}
