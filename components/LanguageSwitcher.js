'use client';
import { useLanguage } from '../context/LanguageContext';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const pathname = usePathname();

    if (pathname === '/' || pathname?.startsWith('/siya')) return null;

    const languages = ['English', 'Tamil', 'Tanglish', 'Hindi'];

    return (
        <div className="fixed top-4 right-4 z-50">
            <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-1 flex gap-1 shadow-2xl">
                {languages.map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${language === lang
                            ? 'bg-neon-pink text-white shadow-[0_0_15px_rgba(255,0,128,0.5)]'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {lang}
                    </button>
                ))}
            </div>
        </div>
    );
}
