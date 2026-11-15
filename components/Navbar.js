'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Sparkles, Menu, X, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ onBuyBundle }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('peoplereading_user_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.email) setCurrentUser(parsed);
      }
    } catch (e) {}
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Official Brand Logo */}
        <Link href="/" className="flex items-center group shrink-0">
          <Image
            src="/images/logo.jpg"
            alt="PeopleReading SERIES"
            width={789}
            height={189}
            className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-bold text-zinc-300">
          <a href="#books" className="hover:text-white transition-colors">
            The 5 Books
          </a>
          <a href="#quiz" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Which Book?</span>
          </a>
          <a href="#bundle" className="hover:text-white transition-colors">
            Complete Boxset
          </a>
          <a href="#science" className="hover:text-white transition-colors">
            Psychology
          </a>
          <Link
            href="/reader"
            className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Web Reader</span>
          </Link>
        </div>

        {/* Right Action: Language Switcher + User Profile / CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* User Reader Badge if registered */}
          {currentUser ? (
            <Link
              href="/reader"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-xs font-bold transition-all"
              title={`Logged in as ${currentUser.name}`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-white">{currentUser.name}</span>
              <span className="text-[10px] font-mono text-amber-300">({currentUser.userId || 'ID'})</span>
            </Link>
          ) : null}

          {/* Compact Language Toggle */}
          <div className="bg-white/5 border border-white/10 rounded-full p-0.5 flex text-[10px] font-semibold text-zinc-400">
            {['English', 'Tamil', 'Tanglish'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  language === lang
                    ? 'bg-white text-black font-bold'
                    : 'hover:text-white'
                }`}
              >
                {lang === 'English' ? 'EN' : lang === 'Tamil' ? 'தமிழ்' : 'Tang'}
              </button>
            ))}
          </div>

          <button
            onClick={onBuyBundle}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black text-xs font-black shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Get All 5 (₹999)</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-4 py-4 space-y-3">
          {currentUser && (
            <div className="p-3 rounded-xl bg-[#141a26] border border-amber-400/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-300 block">{currentUser.userId || 'PR-ACTIVE'}</span>
                <span className="text-sm font-bold text-white">{currentUser.name}</span>
              </div>
              <Link
                href="/reader"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1 rounded-full bg-amber-400 text-black text-xs font-bold"
              >
                Open Reader
              </Link>
            </div>
          )}

          <div className="flex flex-col gap-2.5 text-sm font-semibold text-zinc-300">
            <a href="#books" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
              The 5 Books
            </a>
            <a href="#quiz" onClick={() => setMobileMenuOpen(false)} className="text-amber-400">
              Which Book to Read First?
            </a>
            <a href="#bundle" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
              Complete Boxset (₹999)
            </a>
            <a href="#science" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
              Science & Psychology
            </a>
            <Link href="/reader" onClick={() => setMobileMenuOpen(false)} className="text-amber-400 font-bold">
              Web Reader Portal
            </Link>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="bg-white/5 border border-white/10 rounded-full p-0.5 flex text-xs">
              {['English', 'Tamil', 'Tanglish'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-0.5 rounded-full ${
                    language === lang ? 'bg-white text-black font-bold' : 'text-zinc-400'
                  }`}
                >
                  {lang === 'English' ? 'EN' : lang === 'Tamil' ? 'தமிழ்' : 'Tang'}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBuyBundle();
              }}
              className="px-4 py-1.5 rounded-full bg-amber-400 text-black text-xs font-bold"
            >
              Get All 5 (₹999)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
