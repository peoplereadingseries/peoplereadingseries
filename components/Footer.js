'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Radio, ShieldCheck, Lock, Scale, FileText } from 'lucide-react';
import { BOOKS_DATA } from '../lib/booksData';

export default function Footer({ onSelectBook }) {
  return (
    <footer className="py-16 sm:py-20 border-t border-white/10 bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            {/* Official Brand Logo */}
            <Link href="/" className="inline-block group">
              <Image
                src="/images/logo.jpg"
                alt="PeopleReading SERIES"
                width={789}
                height={189}
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            <p className="type-body-sm text-zinc-400 max-w-sm leading-relaxed">
              Understand People. Master Communication. Unlock Your Potential. The next-gen learning platform with 5 unique personas to help you excel in life, leadership, and connection.
            </p>

            <div className="flex items-center gap-2 type-caption font-mono text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" strokeWidth={2} />
              <span>Instant Digital Delivery • Lifetime Access</span>
            </div>
          </div>

          {/* The 5 Books Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="type-eyebrow font-mono text-amber-400">
              The 5 Volumes
            </h4>
            <ul className="space-y-2.5 type-body-sm text-zinc-400">
              {BOOKS_DATA.map((book) => (
                <li key={book.id}>
                  <button
                    onClick={() => onSelectBook && onSelectBook(book)}
                    className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: book.themeColor }} />
                    <span className="font-semibold text-zinc-200">{book.title}:</span>
                    <span className="text-zinc-400 truncate">{book.tagline}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="type-eyebrow font-mono text-white">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 type-body-sm text-zinc-400">
              <li>
                <a href="#bundle" className="hover:text-white transition-colors">
                  Complete 5-Book Master Boxset
                </a>
              </li>
              <li>
                <a href="#quiz" className="hover:text-white transition-colors">
                  Diagnostic Quiz: Persona Fit
                </a>
              </li>
              <li>
                <Link href="/chat" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" strokeWidth={2} />
                  <span>The 5 Companions (Live Experience)</span>
                </Link>
              </li>
              <li>
                <a href="#science" className="hover:text-white transition-colors">
                  Behavioral Psychology Foundation
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Protection & Verification Bar (Clever Icons instead of Emojis) */}
        <div className="py-6 border-b border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 type-caption font-mono text-zinc-400">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={2} />
            <span><strong className="text-zinc-200 font-sans">100% Verified Delivery</strong> • Instant Access</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={2} />
            <span>256-Bit SSL Encrypted Protocol</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-end">
            <Scale className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={2} />
            <span>Registered IP & Trademarked Architecture</span>
          </div>
        </div>

        {/* Legal Disclaimer & Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left type-caption text-zinc-500">
          <p className="max-w-xl flex items-center gap-2 text-zinc-400">
            <FileText className="w-3.5 h-3.5 text-zinc-500 shrink-0" strokeWidth={1.5} />
            <span>Proprietary behavioral communication framework. All intellectual property, character likenesses, text, and artwork are fully protected under international copyright law.</span>
          </p>
          <p className="font-mono text-zinc-400 shrink-0">
            © {new Date().getFullYear()} PeopleReadingSeries™. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
