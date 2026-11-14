'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Sparkles, Menu, X, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ onBuyBundle }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
            href="/siya"
            className="text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
          >
            <span>Siya</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Live
            </span>
          </Link>
        </div>

        {/* Right Action: Language Switcher + CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
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
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0d12] border-b border-white/10 px-6 py-5 space-y-4 text-sm font-semibold animate-in slide-in-from-top-2 duration-200">
          <a
            href="#books"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-300 hover:text-white"
          >
            The 5 Books
          </a>
          <a
            href="#quiz"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-amber-400"
          >
            Diagnostic Quiz (Which Book?)
          </a>
          <a
            href="#bundle"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-300 hover:text-white"
          >
            Complete 5-Book Boxset (₹999)
          </a>
          <Link
            href="/siya"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-rose-400"
          >
            Siya Heart Reader Companion
          </Link>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBuyBundle();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black text-xs flex items-center justify-center gap-2"
            >
              <span>Get All 5 Books (₹999)</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
