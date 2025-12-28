'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageToggle() {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div className="inline-flex items-center bg-slate-200/80 dark:bg-gray-800/50 border border-slate-300 dark:border-gray-700 rounded-full p-1 backdrop-blur-sm">
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${language === 'en'
                    ? 'bg-primary text-[#11221f] shadow-lg glow-primary'
                    : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
            >
                {t.language.en}
            </button>
            <button
                onClick={() => setLanguage('tr')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${language === 'tr'
                    ? 'bg-primary text-[#11221f] shadow-lg glow-primary'
                    : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
            >
                {t.language.tr}
            </button>
        </div>
    );
}
