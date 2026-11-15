'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X, ArrowRight, User, BookOpen, Sparkles } from 'lucide-react';

export default function ThePeopleLanguageNav({ onGetStarted, onOpenSearch, onLogin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check persistent login / Reader ID on this device
  useEffect(() => {
    const checkUser = () => {
      try {
        const stored = localStorage.getItem('peoplereading_user_data');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.email) {
            setCurrentUser(parsed);
          }
        } else {
          setCurrentUser(null);
        }
      } catch (e) {
        // Silently handle parse errors
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080D1A]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-[#080D1A]/80 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Official Brand Logo */}
        <Link href="/" className="flex items-center group cursor-pointer shrink-0">
          <Image
            src="/images/logo.png"
            alt="PeopleReading SERIES — READ • UNDERSTAND • CONNECT"
            width={789}
            height={189}
            className="h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* Center Nav Links with Math Typographic Scale */}
        <nav className="hidden md:flex items-center gap-8 type-body-sm font-semibold">
          <Link
            href="#home"
            className="text-[#F59E0B] font-bold relative py-1 transition-colors flex flex-col items-center"
          >
            <span>Home</span>
            <span className="w-4 h-0.5 bg-[#F59E0B] rounded-full mt-0.5"></span>
          </Link>
          <a
            href="#cinematic-showcase"
            className="text-zinc-300 hover:text-white transition-colors"
          >
            Personas
          </a>
          <a
            href="#features"
            className="text-zinc-300 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-zinc-300 hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#about"
            className="text-zinc-300 hover:text-white transition-colors"
          >
            About
          </a>
          <Link
            href="/reader"
            className="text-amber-400 hover:text-amber-300 font-bold transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>My Books</span>
          </Link>
        </nav>

        {/* Right CTA Area */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-full transition-all cursor-pointer type-caption"
            title="Search personas and tactics"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" strokeWidth={2} />
            <span className="text-[11px] font-mono text-zinc-500">Search</span>
          </button>

          {/* Auto-Recognized Reader Profile or Login */}
          {currentUser ? (
            <Link
              href="/reader"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-white type-caption font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] group"
              title={`Reader ID: ${currentUser.userId || 'PR-ACTIVE'} • Click to open your library`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-amber-300 text-[11px] font-bold">{currentUser.userId || 'READER'}</span>
              <span className="text-white font-black">{currentUser.name}</span>
              <BookOpen className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            </Link>
          ) : (
            <button
              onClick={onLogin}
              className="px-4 py-2 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-bold text-zinc-200 hover:text-white transition-all cursor-pointer"
            >
              Log In
            </button>
          )}

          {/* Get Started (pro-coder satin pill) */}
          <button
            onClick={onGetStarted}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:brightness-110 text-black text-xs font-black shadow-[0_2px_16px_rgba(245,158,11,0.35),inset_0_1px_0_rgba(255,255,255,0.4)] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Get Started</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          {currentUser && (
            <Link
              href="/reader"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs text-white font-bold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="max-w-[70px] truncate">{currentUser.name}</span>
            </Link>
          )}
          <button
            onClick={onOpenSearch}
            className="p-2 text-zinc-300 hover:text-white"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#080D1A] border-b border-white/10 px-4 py-5 space-y-4 animate-in slide-in-from-top duration-200">
          
          {currentUser && (
            <div className="p-3.5 rounded-2xl bg-[#141a26] border border-amber-400/30 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[11px] font-mono text-amber-300 font-bold">
                    {currentUser.userId || 'PR-ACTIVE'}
                  </span>
                </div>
                <span className="text-sm font-black text-white block mt-0.5">{currentUser.name}</span>
              </div>
              <Link
                href="/reader"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-black shadow-md"
              >
                Open Reader
              </Link>
            </div>
          )}

          <div className="flex flex-col gap-3 font-semibold text-sm">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#F59E0B] font-bold"
            >
              Home
            </a>
            <a
              href="#cinematic-showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white"
            >
              Personas
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white"
            >
              How It Works
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white"
            >
              About
            </a>
            <Link
              href="/reader"
              onClick={() => setMobileMenuOpen(false)}
              className="text-amber-400 font-bold flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>My Books (Web Reader)</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center gap-2">
            {!currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onLogin) onLogin();
                }}
                className="flex-1 py-2.5 rounded-full border border-white/20 text-xs font-bold text-white text-center"
              >
                Log In
              </button>
            ) : (
              <Link
                href="/reader"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-bold text-emerald-300 text-center"
              >
                Continue Reading
              </Link>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onGetStarted) onGetStarted();
              }}
              className="flex-1 py-2.5 rounded-full bg-[#F59E0B] text-black text-xs font-black text-center"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
