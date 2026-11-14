'use client';
import React, { useState } from 'react';
import { BOOKS_DATA, BUNDLE_DATA } from '../lib/booksData';
import BookCover3D from './BookCover3D';
import { Sparkles, ArrowRight, ShieldCheck, Star, Zap, BookOpen } from 'lucide-react';

export default function Hero5Books({ onBuyBundle, onSelectBook }) {
  const [activeBookIndex, setActiveBookIndex] = useState(0);
  const activeBook = BOOKS_DATA[activeBookIndex];

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden bg-black text-white">
      {/* Cinematic Ambient Background Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-amber-600/[0.08] via-purple-600/[0.08] to-rose-600/[0.08] rounded-full blur-[160px] pointer-events-none -z-10" />
      
      {/* Subtle Grid Lines Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-14">
        
        {/* Left Column: Hero Text & Value Proposition */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          
          {/* Release Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-semibold text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-white font-bold">The Complete People Decoder Series</span>
            <span className="text-zinc-500">•</span>
            <span className="text-amber-400 font-bold">5 Master Volumes</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08]">
            <span className="block text-white">Master the 5 Laws</span>
            <span className="block bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
              of Human Nature.
            </span>
          </h1>

          {/* Subtitle with the 5 Book Domains */}
          <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            The definitive psychological field guide series:
            <span className="text-amber-300 font-semibold"> Master Social Situations</span>,
            <span className="text-emerald-400 font-semibold"> Excel in Deals</span>,
            <span className="text-blue-400 font-semibold"> Detect Hidden Lies</span>,
            <span className="text-purple-400 font-semibold"> Inspire Teams</span>, and
            <span className="text-rose-400 font-semibold"> Decode Hearts</span>.
          </p>

          {/* Dual CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
            <button
              onClick={() => onBuyBundle(BUNDLE_DATA)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-sm shadow-[0_0_30px_rgba(245,158,11,0.35)] transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Get All 5 Books (₹999)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#books"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-white/15 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-zinc-400" />
              <span>Explore The 5 Books</span>
            </a>
          </div>

          {/* Trust Metrics Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-zinc-400 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-white font-bold">4.9/5</span>
              <span>(2,400+ Reviews)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>54,000+ Readers Globally</span>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive 3D Book Showcase */}
        <div className="flex-1 flex flex-col items-center">
          
          {/* Active 3D Book Hero Showcase */}
          <div
            onClick={() => onSelectBook(activeBook)}
            className="cursor-pointer transition-transform duration-500 hover:scale-105"
            title="Click to view details"
          >
            <BookCover3D book={activeBook} size="lg" interactive={true} />
          </div>

          {/* 5-Book Selector Dots / Thumbnails */}
          <div className="mt-8 flex items-center gap-2 p-1.5 rounded-full bg-[#141419] border border-white/10">
            {BOOKS_DATA.map((book, idx) => (
              <button
                key={book.id}
                onClick={() => setActiveBookIndex(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeBookIndex === idx
                    ? 'bg-white text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: book.themeColor }} />
                <span className="hidden sm:inline">{(book.personaName || book.title).replace('The ', '')}</span>
                <span className="sm:hidden">{idx + 1}</span>
              </button>
            ))}
          </div>

          <p className="text-[11px] text-zinc-500 mt-2">
            Click on any book above or select from the navigation
          </p>

        </div>

      </div>
    </section>
  );
}
