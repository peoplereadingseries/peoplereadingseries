'use client';
import React, { useState } from 'react';
import { X, Check, BookOpen, Headphones, ShieldCheck, Clock, ArrowRight, Star, Radio } from 'lucide-react';
import BookCover3D from './BookCover3D';
import Link from 'next/link';

export default function BookDetailModal({ book, isOpen, onClose, onBuyBook }) {
  const [activeTab, setActiveTab] = useState('chapters'); // 'chapters' | 'masteries' | 'reviews'

  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d0d11] border border-white/15 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-white animate-in zoom-in-95 duration-200">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all cursor-pointer"
          title="Close Modal"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Modal Header Bar with Accent Glow */}
        <div
          className="h-1.5 w-full bg-gradient-to-r"
          style={{ backgroundImage: `linear-gradient(to right, ${book.themeColor}, transparent)` }}
        />

        {/* Modal Content Scroll Area */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Top Section: 3D Book Preview + Purchase Summary */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Book 3D Mockup Container */}
            <div className="shrink-0 flex justify-center py-2">
              <BookCover3D book={book} size="md" interactive={true} />
            </div>

            {/* Book Main Information */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className={`type-caption font-mono font-bold px-3 py-1 rounded-full border ${book.badgeClass}`}>
                  {book.archetype}
                </span>
                <span className="type-caption font-mono text-white/70 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  {book.pages} Pages
                </span>
                <span className="type-caption font-mono text-white/70 bg-white/5 px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                  <Headphones className="w-3 h-3" strokeWidth={2} />
                  {book.audioDuration}
                </span>
              </div>

              <h2
                className={`type-h2 font-black tracking-tight ${book.accentText || 'text-white'}`}
                style={{ color: book.themeColor }}
              >
                {book.title}
              </h2>

              {book.subtitle && (
                <p className="type-lead font-semibold" style={{ color: book.themeColor }}>
                  {book.subtitle}
                </p>
              )}

              {/* Authorship & Empirical Framework Attribution */}
              {book.authorName && (
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                    <span className="text-zinc-500">Curated By:</span>
                    <strong className="text-white font-sans">{book.authorName}</strong>
                    <span className="text-zinc-600">•</span>
                    <span className="text-amber-400/90 text-[11px]">{book.authorCredential}</span>
                  </div>
                  {book.attributionFramework && (
                    <p className="text-[11px] text-zinc-400 font-mono">
                      <span className="text-zinc-500">Framework: </span>{book.attributionFramework}
                    </p>
                  )}
                </div>
              )}

              <p className="type-body-sm text-zinc-300 leading-relaxed font-normal">
                {book.description}
              </p>

              {/* Special Siya AI bonus if Heart Reader */}
              {book.hasAiCompanion && (
                <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 flex items-center justify-between gap-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                      <Radio className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="type-body-sm font-bold text-rose-300">Companion Included</div>
                      <div className="type-caption text-zinc-400">Get unlimited access to Siya Heart Reader</div>
                    </div>
                  </div>
                  <Link
                    href="/siya"
                    target="_blank"
                    className="type-caption font-bold px-3 py-1.5 rounded-xl bg-white text-black hover:bg-zinc-200 transition-all shrink-0"
                  >
                    Try Siya →
                  </Link>
                </div>
              )}

              {/* Pricing & Purchase CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="type-h3 font-black text-white tabular-nums">₹{book.price}</span>
                  <span className="type-caption font-mono text-zinc-500 line-through tabular-nums">₹{book.originalPrice}</span>
                  <span className="type-caption font-mono font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    50% OFF
                  </span>
                </div>

                <button
                  onClick={() => onBuyBook(book)}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 type-body-sm font-bold cursor-pointer ${book.btnClass}`}
                >
                  <BookOpen className="w-4 h-4" strokeWidth={2} />
                  <span>Get {book.title} Now</span>
                </button>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 type-caption font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2} />
                  Instant EPUB & PDF Download
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" strokeWidth={2} />
                  Lifetime Updates Included
                </span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex gap-2 border-b border-white/10 pb-3">
              <button
                onClick={() => setActiveTab('chapters')}
                className={`px-4 py-2 rounded-xl type-caption font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'chapters'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Table of Contents (5 Chapters)
              </button>
              <button
                onClick={() => setActiveTab('masteries')}
                className={`px-4 py-2 rounded-xl type-caption font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'masteries'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Core Superpowers
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 rounded-xl type-caption font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Reader Praise
              </button>
            </div>

            {/* Tab 1: Chapters */}
            {activeTab === 'chapters' && (
              <div className="mt-4 space-y-3">
                {book.chapters.map((ch) => (
                  <div
                    key={ch.number}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex items-start gap-4"
                  >
                    <span
                      className="type-body-sm font-black font-mono shrink-0 px-2.5 py-1 rounded-lg border"
                      style={{
                        color: book.themeColor,
                        borderColor: `${book.themeColor}40`,
                        backgroundColor: `${book.themeColor}10`,
                      }}
                    >
                      CH {ch.number}
                    </span>
                    <div>
                      <h4 className="type-body font-bold text-white">{ch.title}</h4>
                      <p className="type-body-sm text-zinc-400 mt-0.5 leading-relaxed">{ch.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Masteries */}
            {activeTab === 'masteries' && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {book.keyMasteries.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3"
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${book.themeColor}20`, color: book.themeColor }}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="type-body-sm text-zinc-200 leading-relaxed">{m}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div className="mt-4 space-y-4">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                    <span className="type-caption font-mono font-bold text-white ml-2">5.0 Verified Purchase</span>
                  </div>
                  <p className="type-body-sm text-zinc-200 italic leading-relaxed">
                    &ldquo;{book.readerReview.quote}&rdquo;
                  </p>
                  <div className="mt-3 flex items-center justify-between type-caption border-t border-white/10 pt-2">
                    <span className="font-bold text-white">{book.readerReview.author}</span>
                    <span className="text-zinc-400">{book.readerReview.role}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-center">
                  <p className="type-caption text-zinc-400 italic">
                    {book.sampleQuote}
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
