'use client';
import React from 'react';
import { BUNDLE_DATA, BOOKS_DATA } from '../lib/booksData';
import BookCover3D from './BookCover3D';
import { ShieldCheck, Check, ArrowRight, Sparkles, KeyRound } from 'lucide-react';

export default function BundleShowcase({ onBuyBundle }) {
  return (
    <section id="bundle" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#04060a] text-white">
      {/* Golden subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-amber-500/[0.04] rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Main Vault Card - Bespoke Pro Coder Glass */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0b0f19] via-[#070a12] to-[#04060a] border border-amber-400/25 p-8 sm:p-12 lg:p-14 shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden">
          
          {/* Top Hairline Light Reflection */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
          
          {/* Top Badge */}
          <div className="flex justify-center mb-8">
            <span className="text-xs font-mono tracking-widest uppercase px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-400/30 flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{BUNDLE_DATA.badge}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
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

              {/* Integrated Executive Specs Bar (No Clunky Disjointed Pills) */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-zinc-400 border-t border-white/[0.08] pt-4 w-full max-w-sm">
                <span className="text-zinc-200 font-semibold">5 Volumes</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-200 font-semibold">1,476 Pages</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-200 font-semibold">4.5h Audio</span>
                <span className="text-zinc-600">•</span>
                <span className="text-amber-400 font-semibold">+ 5 Practice Engines</span>
              </div>

            </div>

            {/* Right Column: Offer Breakdown & Value Stack */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  {BUNDLE_DATA.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 mt-3 leading-relaxed">
                  {BUNDLE_DATA.subtitle}
                </p>
              </div>

              {/* Curriculum Deliverables - Clean Typography Without Nested Clunky Box */}
              <div className="space-y-3 py-2">
                <div className="text-xs font-mono text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Instant Boxset Inclusions</span>
                </div>
                <div className="space-y-2.5">
                  {BUNDLE_DATA.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Stack & Purchase CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 border-t border-white/[0.08]">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-white tracking-tight tabular-nums">
                      ₹{BUNDLE_DATA.bundlePrice}
                    </span>
                    <span className="text-lg text-zinc-500 line-through tabular-nums font-mono">
                      ₹{BUNDLE_DATA.originalPrice}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold block mt-1">
                    Save ₹{BUNDLE_DATA.savingsAmount} (55% Master Boxset Discount)
                  </span>
                </div>

                <button
                  onClick={() => onBuyBundle(BUNDLE_DATA)}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-black font-black text-sm tracking-wide shadow-[0_10px_35px_rgba(245,158,11,0.35),inset_0_1px_0_rgba(255,255,255,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4 text-black" strokeWidth={2.5} />
                  <span>Unlock Complete Boxset (₹999)</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>

              {/* Trust Guarantees */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 pt-1">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Instant Delivery to Web Reader</span>
                </span>
                <span>•</span>
                <span>Offline EPUB + Kindle Included</span>
                <span>•</span>
                <span>Direct Razorpay Gateway</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
