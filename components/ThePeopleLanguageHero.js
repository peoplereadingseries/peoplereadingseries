'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Play,
  Crown,
  Handshake,
  Search,
  Users,
  Heart,
  ChevronLeft,
  ChevronRight,
  Send
} from 'lucide-react';
import { BOOKS_DATA } from '../lib/booksData';

export default function ThePeopleLanguageHero({
  onStartJourney,
  onWatchVideo,
  onSelectPersona
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userQuestion, setUserQuestion] = useState('');
  const touchStartX = useRef(null);
  const lastWheelTime = useRef(0);

  // 5 Personas in exact order with transparent background cutouts (cropped to body size)
  const HERO_PERSONAS = [
    {
      id: 'the-charmer',
      title: 'The Charmer',
      subtitle: 'Master Social Situations',
      icon: Crown,
      themeColor: '#F59E0B',
      ambientGlow: 'rgba(245, 158, 11, 0.45)',
      cutout: '/images/peoplereadingseries/cutout_charmer.png',
      oneLineHook: 'The 3-Second Warmth Signal: Make anyone feel instantly drawn to you before you even speak.',
      book: BOOKS_DATA.find((b) => b.id === 'the-charmer')
    },
    {
      id: 'the-negotiator',
      title: 'The Negotiator',
      subtitle: 'Excel in Business & Sales',
      icon: Handshake,
      themeColor: '#3B82F6',
      ambientGlow: 'rgba(59, 130, 246, 0.45)',
      cutout: '/images/peoplereadingseries/cutout_negotiator.png',
      oneLineHook: 'FBI Tactical Empathy: Turn an aggressive "No" into a profitable "Yes" without tension.',
      book: BOOKS_DATA.find((b) => b.id === 'the-negotiator')
    },
    {
      id: 'the-detective',
      title: 'The Detective',
      subtitle: 'Detect Lies & Hidden Motives',
      icon: Search,
      themeColor: '#8B5CF6',
      ambientGlow: 'rgba(139, 92, 246, 0.45)',
      cutout: '/images/peoplereadingseries/cutout_detective.png',
      oneLineHook: 'Behavioral Forensics: Unmask concealed agendas and spot deception in the first 2 minutes.',
      book: BOOKS_DATA.find((b) => b.id === 'the-detective')
    },
    {
      id: 'the-leader',
      title: 'The Leader',
      subtitle: 'Influence & Inspire Teams',
      icon: Users,
      themeColor: '#10B981',
      ambientGlow: 'rgba(16, 185, 129, 0.45)',
      cutout: '/images/peoplereadingseries/cutout_leader.png',
      oneLineHook: 'Command Without Demand: Transmit unshakeable calm authority and inspire radical team loyalty.',
      book: BOOKS_DATA.find((b) => b.id === 'the-leader')
    },
    {
      id: 'the-heart-reader',
      title: 'The Heart Reader',
      subtitle: 'Improve Dating & Relations',
      icon: Heart,
      themeColor: '#F43F5E',
      ambientGlow: 'rgba(244, 63, 94, 0.45)',
      cutout: '/images/peoplereadingseries/cutout_heart_reader.png',
      oneLineHook: 'The Anti-Gravity Pull: Stop over-analyzing mixed signals and ignite magnetic attraction.',
      book: BOOKS_DATA.find((b) => b.id === 'the-heart-reader')
    }
  ];

  const currentPersona = HERO_PERSONAS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_PERSONAS.length) % HERO_PERSONAS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_PERSONAS.length);
  };

  // Scroll / Wheel navigation across personas
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 400) return;
    if (Math.abs(e.deltaY) > 25 || Math.abs(e.deltaX) > 25) {
      if (e.deltaY > 0 || e.deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      lastWheelTime.current = now;
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  // Trigger chat modal
  const handleTriggerChat = (e) => {
    if (e) e.preventDefault();
    if (onSelectPersona) {
      onSelectPersona(currentPersona.book, userQuestion);
      setUserQuestion('');
    }
  };

  return (
    <section
      id="home"
      className="relative pt-24 sm:pt-28 pb-16 sm:pb-24 bg-[#080D1A] overflow-hidden text-white"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 70% 55% at 75% 35%, ${currentPersona.ambientGlow}, transparent 70%),
          radial-gradient(ellipse 55% 55% at 20% 40%, rgba(59, 130, 246, 0.06), transparent 70%)
        `,
        transition: 'background-image 0.6s ease'
      }}
    >
      {/* Background ambient city grid / bokeh texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Left copy, Right only the character (transparent cutout, no box, no top name scrolling) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 lg:pr-4">
            
            {/* Top Eyebrow Tag */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-zinc-400">
                SOCIAL INTELLIGENCE <span className="text-zinc-600">•</span> BETTER COMMUNICATION <span className="text-zinc-600">•</span> REAL LIFE SKILLS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12]">
              <span className="block text-white">PeopleReadingSeries</span>
              <span className="block text-zinc-100">Understand People.</span>
              <span className="block text-zinc-100">Master Communication.</span>
              <span
                className="block drop-shadow-[0_2px_18px_rgba(245,158,11,0.35)] transition-colors duration-500"
                style={{ color: currentPersona.themeColor }}
              >
                Unlock Your Potential.
              </span>
            </h1>

            {/* Sub-paragraph */}
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal max-w-lg">
              Stop guessing what people really think. Master the unspoken laws of human behavior with 5 specialized personas trained on FBI crisis negotiation, micro-expression forensics, executive presence, and relationship psychology.
            </p>

            {/* Dual Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              {/* Explore Personas */}
              <button
                onClick={onStartJourney}
                className="px-6 py-3.5 rounded-full text-black font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-[0_4px_22px_rgba(245,158,11,0.4)] active:scale-95 transition-all cursor-pointer hover:brightness-110"
                style={{ backgroundColor: currentPersona.themeColor }}
              >
                <span>Explore 5 Personas</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              {/* Watch Video (1 min) */}
              <button
                onClick={onWatchVideo}
                className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/15 flex items-center gap-2.5 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-white translate-x-0.5 text-white" />
                </div>
                <span>Watch Video</span>
                <span className="text-zinc-400 text-xs font-normal">(1 min)</span>
              </button>
            </div>

            {/* Conversion trust pill */}
            <div className="pt-2 flex items-center gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>50,000+ Active Learners</span>
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-amber-400 font-bold">★ 4.8/5 Rated</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">Instant Mentors</span>
            </div>

          </div>

          {/* Right Hero Column: ONLY THE CHARACTER WITH BODY SIZE CROP (No Box, No Top Name Scrolling) */}
          <div
            id="personas"
            className="lg:col-span-6 w-full flex flex-col items-center justify-center"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* 1. CHARACTER STANDING CLEAN (Transparent Cutout, No Box, Background Removed) */}
            <div className="relative w-full max-w-sm h-[400px] sm:h-[460px] md:h-[500px] flex items-end justify-center select-none">
              
              {/* Radial atmospheric aura glow behind the character */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-700 blur-3xl opacity-50"
                style={{
                  background: `radial-gradient(circle at 50% 55%, ${currentPersona.themeColor} 0%, transparent 65%)`
                }}
              />

              {/* Prev / Next Minimal Chevron Controls floating on the sides */}
              <button
                onClick={handlePrev}
                className="absolute left-0 sm:-left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md active:scale-90 shadow-lg"
                title="Previous Persona"
                aria-label="Previous Persona"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 sm:-right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md active:scale-90 shadow-lg"
                title="Next Persona"
                aria-label="Next Persona"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* The Transparent Cutout Character Image with Body Size Crop */}
              <div className="relative w-full h-full flex items-end justify-center pointer-events-none">
                <Image
                  key={currentPersona.id}
                  src={currentPersona.cutout}
                  alt={currentPersona.title}
                  fill
                  className="object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] transition-all duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority={true}
                />
              </div>

            </div>

            {/* Subtle Navigation Dots */}
            <div className="flex items-center gap-1.5 mt-2 mb-3">
              {HERO_PERSONAS.map((persona, dotIdx) => (
                <button
                  key={persona.id}
                  onClick={() => setActiveIndex(dotIdx)}
                  className="p-1 cursor-pointer transition-all"
                  title={persona.title}
                  aria-label={persona.title}
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      activeIndex === dotIdx
                        ? 'w-6 h-1.5'
                        : 'w-1.5 h-1.5 bg-zinc-600 hover:bg-zinc-400'
                    }`}
                    style={{
                      backgroundColor: activeIndex === dotIdx ? currentPersona.themeColor : undefined
                    }}
                  />
                </button>
              ))}
            </div>

            {/* 2. JUST A ONE LINE HOOK (Directly below character, above chat with us box) */}
            <div className="w-full max-w-md text-center px-3 mb-3">
              <p className="text-xs sm:text-sm font-semibold text-zinc-100 tracking-normal leading-relaxed drop-shadow">
                &ldquo;<span className="text-white font-bold">{currentPersona.oneLineHook}</span>&rdquo;
              </p>
            </div>

            {/* 3. CHAT WITH US BOX (Directly below the one-line hook) */}
            <div className="w-full max-w-md px-1">
              <form
                onSubmit={handleTriggerChat}
                className="relative flex items-center rounded-2xl bg-[#0F1424]/90 border border-white/20 p-1.5 shadow-2xl backdrop-blur-xl transition-all focus-within:border-amber-400/80"
              >
                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder={`Chat with ${currentPersona.title}...`}
                  className="flex-1 bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-400 focus:outline-none"
                />

                <button
                  type="submit"
                  className="px-4 sm:px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm text-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer shrink-0 hover:brightness-110"
                  style={{ backgroundColor: currentPersona.themeColor }}
                >
                  <span>Chat With Us</span>
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
