'use client';
import React from 'react';
import { BUNDLE_DATA, BOOKS_DATA } from '../lib/booksData';
import BookCover3D from './BookCover3D';
import { ShieldCheck, Check, ArrowRight, Layers3, ListChecks, FileArchive, KeyRound } from 'lucide-react';

export default function BundleShowcase({ onBuyBundle }) {
  return (
    <section id="bundle" className="py-24 sm:py-28 px-4 sm:px-6 relative overflow-hidden bg-[#07070a] text-white">
      {/* Golden glow ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/[0.06] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Main Boxset Card */}
        <div className="rounded-3xl bg-gradient-to-b from-[#15141c] via-[#0d0d12] to-black border-2 border-amber-500/40 p-8 sm:p-12 shadow-[0_0_80px_rgba(245,158,11,0.15)] relative overflow-hidden">
          
          {/* Top Banner Tag: Clever Layers Icon instead of Zap */}
          <div className="flex justify-center mb-6">
            <span className="type-eyebrow font-mono px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/15 to-amber-500/15 text-amber-300 border border-amber-400/40 shadow-sm flex items-center gap-2">
              <Layers3 className="w-3.5 h-3.5 text-amber-400" strokeWidth={2} />
              <span>{BUNDLE_DATA.badge}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: 5-Book Fan Visual Display */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* Overlapping 3D Book Showcase */}
              <div className="relative w-full max-w-sm h-80 flex items-center justify-center">
                {BOOKS_DATA.map((book, i) => {
                  const offsets = [
                    '-translate-x-24 -rotate-12 scale-90 z-10',
                    '-translate-x-12 -rotate-6 scale-95 z-20',
                    'translate-x-0 rotate-0 scale-100 z-30',
                    'translate-x-12 rotate-6 scale-95 z-20',
                    'translate-x-24 rotate-12 scale-90 z-10'
                  ];
                  return (
                    <div
                      key={book.id}
                      className={`absolute transition-transform duration-500 hover:scale-110 hover:z-40 ${offsets[i]}`}
                    >
                      <BookCover3D book={book} size="sm" interactive={false} />
                    </div>
                  );
                })}
              </div>

              {/* Boxset Summary Pills with Mathematical Font Scale */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                <span className="type-caption font-mono font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                  5 Volumes
                </span>
                <span className="type-caption font-mono font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                  1,476 Pages
                </span>
                <span className="type-caption font-mono font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                  4.5h Audio
                </span>
                <span className="type-caption font-mono font-semibold px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300">
                  + Siya Companion
                </span>
              </div>

            </div>

            {/* Right Column: Offer Breakdown & Value Stack */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="type-h2 font-black text-white tracking-tight">
                  {BUNDLE_DATA.title}
                </h3>
                <p className="type-lead text-zinc-300 mt-2 leading-relaxed font-normal">
                  {BUNDLE_DATA.subtitle}
                </p>
              </div>

              {/* What You Receive Checklist with Clever Manifest Icon */}
              <div className="space-y-3 bg-black/60 p-5 sm:p-6 rounded-2xl border border-white/10">
                <div className="type-eyebrow font-mono text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-amber-400" strokeWidth={2} />
                  <span>Curriculum & Deliverables Manifest:</span>
                </div>
                {BUNDLE_DATA.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 type-body-sm text-zinc-200">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    </div>
                    <span className="leading-snug">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price Stack & Purchase CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="type-h1 font-black text-white tracking-tight tabular-nums">
                      ₹{BUNDLE_DATA.bundlePrice}
                    </span>
                    <span className="type-h4 text-zinc-500 line-through tabular-nums font-mono">
                      ₹{BUNDLE_DATA.originalPrice}
                    </span>
                  </div>
                  <span className="type-caption font-mono font-bold text-emerald-400 block mt-1">
                    You Save ₹{BUNDLE_DATA.savingsAmount} (55% Bundle Discount)
                  </span>
                </div>

                <button
                  onClick={() => onBuyBundle(BUNDLE_DATA)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-yellow-400 text-black type-body font-black shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4 text-black" strokeWidth={2.5} />
                  <span>Unlock Complete Boxset (₹999)</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>

              {/* Reassurance Footer */}
              <div className="flex flex-wrap items-center gap-5 type-caption font-mono text-zinc-400 border-t border-white/10 pt-4">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <FileArchive className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.75} />
                  Instant Formats (EPUB, PDF, Kindle)
                </span>
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} />
                  Verified Digital Delivery & Lifetime Access
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
