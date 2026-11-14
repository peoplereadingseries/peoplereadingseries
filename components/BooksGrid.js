'use client';
import React from 'react';
import { BOOKS_DATA } from '../lib/booksData';
import BookCover3D from './BookCover3D';
import { ArrowRight, ShieldCheck, MessageSquare, BookOpen, AlertCircle } from 'lucide-react';

export default function BooksGrid({ onOpenBookChat, onBuyBook }) {
  const filteredBooks = BOOKS_DATA;

  return (
    <section id="books" className="pt-24 pb-24 px-4 sm:px-6 relative overflow-hidden bg-black text-white">
      {/* 1. Seamless Top Black Blend */}
      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-black via-black/95 to-transparent pointer-events-none z-0" />
      
      {/* 2. Soft Crimson Hazard Glow centered behind WARNING header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[95vw] max-w-5xl h-[420px] bg-gradient-to-b from-red-600/[0.10] via-rose-950/[0.05] to-transparent blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-r from-amber-500/[0.03] via-rose-500/[0.03] to-purple-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with Mathematical Font Ratio */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <h3 className="type-eyebrow font-mono text-red-500 font-black tracking-[0.25em] uppercase mb-3 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            WARNING
          </h3>
          <h2 className="type-h2 text-white max-w-3xl mx-auto text-balance font-extrabold">
            You Are Losing Every Single High-Stakes Room You Walk Into—<span className="text-zinc-300 font-normal">And You Don&apos;t Even Know Why.</span>
          </h2>
        </div>

        {/* 5 Books Showcase - Clean, Frameless (No Card Boxes) */}
        <div className="flex flex-wrap justify-center gap-10 lg:gap-14">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="w-full max-w-[340px] sm:w-[340px] flex flex-col items-center justify-between transition-all duration-300 group hover:-translate-y-2"
            >
              <div className="w-full flex flex-col items-center">
                {/* 3D Book Display - Exact Same Size, No Box Border */}
                <div className="pb-8 pt-2 flex justify-center group-hover:scale-105 transition-transform duration-300">
                  <BookCover3D book={book} size="md" interactive={true} />
                </div>

                {/* Book Details with Strict Font Hierarchy */}
                <div className="space-y-2 mt-2 text-center max-w-[300px]">
                  <h3
                    className="type-h3 font-black tracking-tight transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
                    style={{ color: book.themeColor }}
                  >
                    {book.title}
                  </h3>

                  <p className="type-body-sm text-zinc-400 leading-relaxed font-normal">
                    {book.hook || book.description}
                  </p>
                </div>
              </div>

              {/* Bottom Actions with Proportional Typography */}
              <div className="pt-5 mt-4 w-full max-w-[300px] space-y-3">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-baseline gap-2">
                    <span className="type-h3 font-black text-white tabular-nums">₹{book.price}</span>
                    <span className="type-caption font-mono text-zinc-500 line-through">₹{book.originalPrice}</span>
                  </div>
                  <span className="type-caption font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                    50% OFF
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenBookChat(book)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white type-caption font-bold border border-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:scale-[1.02] text-center"
                    title={book.chatLabel || "Let's Talk"}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                    <span className="truncate">{book.chatLabel || "Let's Talk"}</span>
                  </button>

                  <button
                    onClick={() => onBuyBook(book)}
                    className={`w-full py-2.5 px-3 rounded-xl type-caption font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer ${book.btnClass}`}
                  >
                    <span>Get Book</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Protection & Copyright Assurance Strip */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-4 sm:gap-8 type-caption text-zinc-400 text-center">
          <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Verified Digital Purchase & Lifetime Access</span>
          </span>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <span className="text-zinc-400 font-sans">
            Instant Verified Digital Delivery
          </span>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <span className="text-zinc-500 font-mono">
            © {new Date().getFullYear()} PeopleReadingSeries™. All Rights Reserved. Protected Content.
          </span>
        </div>

      </div>
    </section>
  );
}
