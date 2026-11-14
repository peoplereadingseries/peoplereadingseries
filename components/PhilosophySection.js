'use client';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';

export default function PhilosophySection() {
    const { t } = useLanguage();

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black to-slate-900/50" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-8 animate-float" style={{ animationDuration: '8s' }}>
                    <h2 className="text-3xl md:text-5xl font-bold">
                        <span className="text-neon-purple block mb-2">{t('philosophy.title1')}</span>
                        <span className="text-white">{t('philosophy.title2')}</span>
                    </h2>

                    <p className="text-xl text-white/70 leading-relaxed">
                        {t('philosophy.description')}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mt-12 text-left">
                        <div className="glass p-8 rounded-2xl border-none bg-white/5 flex flex-col h-full">
                            <h3 className="text-neon-pink text-xl font-semibold mb-3">{t('philosophy.gravityTitle')}</h3>
                            <p className="text-gray-400 flex-grow">{t('philosophy.gravityDesc')}</p>
                            <Link href="/philosophy/gravity" className="mt-6 text-neon-pink hover:text-white transition-colors self-end">
                                Read More
                            </Link>
                        </div>
                        <div className="glass p-8 rounded-2xl border-none bg-white/5 flex flex-col h-full">
                            <h3 className="text-neon-blue text-xl font-semibold mb-3">{t('philosophy.antiGravityTitle')}</h3>
                            <p className="text-gray-400 flex-grow">{t('philosophy.antiGravityDesc')}</p>
                            <Link href="/philosophy/antigravity" className="mt-6 text-neon-blue hover:text-white transition-colors self-end">
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
