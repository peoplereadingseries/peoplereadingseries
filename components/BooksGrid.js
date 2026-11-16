'use client';
import React from 'react';
import { BOOKS_DATA } from '../lib/booksData';
import BookCover3D from './BookCover3D';
import { ArrowRight, ShieldCheck, MessageSquare, BookOpen, Sparkles } from 'lucide-react';

export default function BooksGrid({ onOpenBookChat, onBuyBook }) {
  const filteredBooks = BOOKS_DATA;

  return (
    <section id="books" className="pt-24 pb-28 px-4 sm:px-6 relative overflow-hidden bg-[#05070d] text-white">
      {/* 1. Subtle Radial Ambient Lighting */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-black/90 to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-amber-500/[0.04] via-blue-500/[0.02] to-transparent rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header: Premium Editorial Command */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-amber-300 text-xs font-mono tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>The 5 Definitive Volumes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight text-balance">
            Master the Hidden Architecture of Human Behavior
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed max-w-2xl mx-auto">
            Five standalone volumes translating 50+ years of high-stakes crisis negotiation, micro-expression forensics, and executive presence into battle-tested communication playbooks.
          </p>
        </div>

        {/* 5 Books Showcase - Sleek Frameless Display */}
        <div className="flex flex-wrap justify-center gap-10 lg:gap-14">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="w-full max-w-[340px] sm:w-[340px] flex flex-col items-center justify-between transition-all duration-300 group hover:-translate-y-2"
            >
              <div className="w-full flex flex-col items-center">
                {/* 3D Book Display */}
                <div className="pb-8 pt-2 flex justify-center group-hover:scale-105 transition-transform duration-300">
                  <BookCover3D book={book} size="md" interactive={true} />
                </div>

                {/* Book Details */}
                <div className="space-y-2 mt-2 text-center max-w-[300px]">
                  <h3
                    className="text-xl sm:text-2xl font-black tracking-tight transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
                    style={{ color: book.themeColor }}
                  >
                    {book.title}
                  </h3>

                  {book.authorName && (
                    <div className="text-[11px] font-mono text-zinc-400">
                      <span>By <strong className="text-zinc-200 font-sans">{book.authorName}</strong></span>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    {book.hook || book.description}
                  </p>
                </div>
              </div>

              {/* Bottom Actions with Sleek Pro-Coder Controls */}
              <div className="pt-6 mt-4 w-full max-w-[300px] space-y-3">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white tabular-nums">₹{book.price}</span>
                    <span className="text-xs font-mono text-zinc-500 line-through">₹{book.originalPrice}</span>
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                    SAVE 50%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => onOpenBookChat(book)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-zinc-300 hover:text-white text-xs font-bold border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:scale-[1.02] text-center"
                    title={book.chatLabel || "Let's Talk"}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span className="truncate">{book.chatLabel || "Practice"}</span>
                  </button>

                  <button
                    onClick={() => onBuyBook(book)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-black shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer hover:brightness-110 ${book.btnClass}`}
                  >
                    <span>Get Volume</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Protection & Assurance Strip */}
        <div className="mt-20 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-zinc-500 text-center">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Authenticated Single-Device Reader ID</span>
          </span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span className="text-zinc-400">
            EPUB • PDF • MOBI + MP3 Audio
          </span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span className="text-zinc-500">
            Published by PeopleReading Media & Research Pvt. Ltd.
          </span>
        </div>

      </div>
    </section>
  );
}
