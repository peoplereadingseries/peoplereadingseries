'use client';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';
export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/20 rounded-full blur-[100px] animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

            <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-float">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
                    <span className="block text-white mb-2">{t('hero.title1')}</span>
                    <span className="block text-gradient">{t('hero.title2')}</span>
                </h1>

                <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
                    {t('hero.subtitle')}
                </p>

                <div className="pt-8">
                    <Link href="/siya" className="btn-primary px-8 py-4 rounded-full text-lg font-bold tracking-wide uppercase inline-block">
                        {t('hero.cta')}
                    </Link>
                </div>
            </div>

            {/* Floating Elements (Visual Interest) */}
            <div className="absolute top-20 right-10 glass w-24 h-24 rounded-2xl rotate-12 animate-float" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-20 left-10 glass w-16 h-16 rounded-full -rotate-12 animate-float" style={{ animationDuration: '7s', animationDelay: '2s' }} />
        </section>
    );
}
