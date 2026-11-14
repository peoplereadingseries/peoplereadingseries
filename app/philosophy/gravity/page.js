'use client';
import { useLanguage } from '../../../context/LanguageContext';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GravityPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-black text-white selection:bg-neon-pink selection:text-white pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link href="/" className="inline-flex items-center text-white hover:text-neon-pink transition-colors mb-8 group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <article className="space-y-12">
                    <header className="text-center space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold text-neon-pink">
                            {t('philosophy.gravityPage.title')}
                        </h1>
                    </header>

                    {/* Image Placeholder - Since generation failed, using a thematic gradient block */}
                    <div className="w-full aspect-video rounded-3xl overflow-hidden relative shadow-[0_0_50px_rgba(255,42,109,0.2)] bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-white/10 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[url('/gravity-detail.webp')] bg-cover bg-center opacity-80" />
                        <div className="relative z-10 text-center p-8">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-b from-neon-pink/20 to-transparent flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-neon-pink shadow-[0_0_30px_#ff2a6d]" />
                            </div>
                            <p className="text-gray-400 italic">{t('philosophy.gravityPage.imageAlt')}</p>
                        </div>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="glass p-8 md:p-12 rounded-3xl space-y-6 text-gray-300 leading-relaxed">
                            {Array.isArray(t('philosophy.gravityPage.content')) &&
                                t('philosophy.gravityPage.content').map((paragraph, index) => (
                                    <p key={index} className="text-lg md:text-xl">
                                        {paragraph}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
