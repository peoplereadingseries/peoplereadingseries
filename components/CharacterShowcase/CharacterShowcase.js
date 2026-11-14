'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CHARACTERS_DATA } from '../../lib/charactersData';
import ParallaxTypography from './ParallaxTypography';
import CharacterStage from './CharacterStage';
import { ChevronLeft, ChevronRight, X, Check } from 'lucide-react';

/**
 * CharacterShowcase
 * Interactive 5-character showcase with:
 * - Automatic smooth timed carousel scrolling
 * - Manual scrolling & navigation (prev/next arrows, swipe, keyboard, indicators)
 * - Removed 500vh long scroll lock & removed the 5 bottom short boxes
 * - Clean hook display and "Let's Talk" AI chatbot trigger
 */
export default function CharacterShowcase({
  characters = CHARACTERS_DATA,
  onSelectCharacterAction
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedModalCharacter, setSelectedModalCharacter] = useState(null);

  // Swipe support state
  const touchStartX = useRef(null);
  const lastWheelTime = useRef(0);

  const activeCharacter = characters[activeIndex] || characters[0];
  const DURATION_MS = 4000; // 4 seconds per character slide
  const TICK_MS = 50;

  // Manual navigation handlers
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % characters.length);
    setSlideProgress(0);
  }, [characters.length]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + characters.length) % characters.length);
    setSlideProgress(0);
  }, [characters.length]);

  const goToIndex = useCallback((index) => {
    setActiveIndex(index);
    setSlideProgress(0);
  }, []);

  // ================= AUTOMATIC SCROLLING ENGINE =================
  useEffect(() => {
    if (isHovered) return; // Pause on hover

    const interval = setInterval(() => {
      setSlideProgress((prev) => {
        const nextVal = prev + (TICK_MS / DURATION_MS) * 100;
        if (nextVal >= 100) {
          goToNext();
          return 0;
        }
        return nextVal;
      });
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [isHovered, goToNext]);

  // ================= KEYBOARD ARROW CONTROLS =================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // ================= TOUCH SWIPE SUPPORT =================
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      goToNext();
    } else if (diff < -45) {
      goToPrev();
    }
    touchStartX.current = null;
  };

  // ================= TRACKPAD / WHEEL GESTURE =================
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 600) return;

    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 25) {
      lastWheelTime.current = now;
      if (e.deltaX > 0) goToNext();
      else goToPrev();
    }
  };

  const handleStartInteraction = (character) => {
    if (onSelectCharacterAction) {
      onSelectCharacterAction(character);
    } else {
      setSelectedModalCharacter(character);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      className="relative w-full h-[88vh] sm:h-screen min-h-[640px] max-h-[860px] bg-[#070B14] text-white selection:bg-amber-400 selection:text-black font-sans overflow-hidden flex flex-col justify-between select-none pt-14 sm:pt-16"
    >
      {/* ================= 1. DYNAMIC AMBIENT BACKGROUND GRADIENT ================= */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out z-0"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${activeCharacter.bgRgba} 0%, rgba(7, 11, 20, 0.95) 60%, #070B14 100%)`
        }}
      />

      {/* Subtle grid mesh overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15 z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />


      {/* ================= 3. MASSIVE BACKGROUND TYPOGRAPHY ================= */}
      <ParallaxTypography
        character={activeCharacter}
        activeIndex={activeIndex}
      />

      {/* ================= 4. MANUAL PREV / NEXT NAVIGATION ARROWS ================= */}
      <button
        onClick={goToPrev}
        type="button"
        aria-label="Previous Persona"
        className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3.5 rounded-full bg-black/40 hover:bg-black/80 border border-white/10 hover:border-white/30 backdrop-blur-xl text-white/70 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xl group"
        style={{
          boxShadow: `0 0 25px ${activeCharacter.ambientGlow}25`
        }}
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>

      <button
        onClick={goToNext}
        type="button"
        aria-label="Next Persona"
        className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3.5 rounded-full bg-black/40 hover:bg-black/80 border border-white/10 hover:border-white/30 backdrop-blur-xl text-white/70 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xl group"
        style={{
          boxShadow: `0 0 25px ${activeCharacter.ambientGlow}25`
        }}
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* ================= 5. MAIN CENTRAL STAGE ================= */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 z-10 overflow-visible">
        <div className="w-full flex-1 flex items-center justify-center relative min-w-0">
          <CharacterStage
            character={activeCharacter}
            allCharacters={characters}
            activeIndex={activeIndex}
            scrollProgress={slideProgress / 100}
            onStartInteraction={handleStartInteraction}
          />
        </div>
      </div>

      {/* ================= 5.5 BOTTOM SEAMLESS BLEND TO BLACK GRADIENT ================= */}
      {/* Kept thin and at z-10 so it never overlaps or dims the Let's Talk button & stage */}
      <div
        className="absolute bottom-0 inset-x-0 h-16 sm:h-20 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.95) 100%)'
        }}
      />
      {/* Dynamic ambient glow reflection */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 max-w-4xl h-20 pointer-events-none z-10 blur-2xl transition-all duration-1000 opacity-40"
        style={{
          background: `radial-gradient(ellipse at bottom, ${activeCharacter.ambientGlow} 0%, transparent 70%)`
        }}
      />

      {/* ================= 6. MINIMALIST SLIDE INDICATORS (REPLACES 5 SHORT BOXES) ================= */}
      <div className="w-full z-30 pointer-events-auto flex items-center justify-center gap-2 pb-5 sm:pb-7 select-none relative">
        {characters.map((char, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={`dot-${char.id}`}
              onClick={() => goToIndex(idx)}
              type="button"
              aria-label={`Switch to ${char.name}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                isActive
                  ? 'w-8 h-2'
                  : 'w-2 h-2 bg-white/25 hover:bg-white/50'
              }`}
              style={{
                backgroundColor: isActive ? char.themeColor : undefined,
                boxShadow: isActive ? `0 0 12px ${char.themeColor}` : undefined
              }}
            />
          );
        })}
      </div>

      {/* ================= 7. IN-DEPTH CHARACTER DOSSIER MODAL (FALLBACK) ================= */}
      {selectedModalCharacter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-2xl bg-[#0C1222] border rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            style={{
              borderColor: `${selectedModalCharacter.themeColor}60`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 40px ${selectedModalCharacter.ambientGlow}`
            }}
          >
            {/* Modal Ambient Glow */}
            <div
              className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-[90px] pointer-events-none"
              style={{ backgroundColor: selectedModalCharacter.ambientGlow }}
            />

            {/* Close Button */}
            <button
              onClick={() => setSelectedModalCharacter(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="px-2.5 py-1 rounded type-caption font-mono font-bold"
                style={{
                  backgroundColor: `${selectedModalCharacter.themeColor}20`,
                  color: selectedModalCharacter.themeColor
                }}
              >
                {selectedModalCharacter.code}
              </span>
              <span className="type-caption font-mono text-zinc-400 uppercase">
                {selectedModalCharacter.archetype}
              </span>
            </div>

            <h3 className="type-h2 font-black text-white mb-1">
              {selectedModalCharacter.name}
            </h3>
            <p className="type-body font-semibold mb-4" style={{ color: selectedModalCharacter.themeColor }}>
              {selectedModalCharacter.title}
            </p>

            <div className="space-y-4 type-body-sm text-zinc-300 leading-relaxed mb-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="type-eyebrow font-mono text-zinc-400 uppercase mb-1">
                  Tactical Protocol
                </div>
                <div className="type-body font-bold text-white mb-1">
                  {selectedModalCharacter.tacticalMove}
                </div>
                <p className="type-body-sm text-zinc-300">
                  {selectedModalCharacter.tacticalDesc}
                </p>
              </div>

              <p className="leading-relaxed">{selectedModalCharacter.lore}</p>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <div className="type-eyebrow font-mono text-zinc-400 uppercase mb-2.5">
                  Key Behavioral Techniques
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedModalCharacter.skills.map((skill, idx) => (
                    <div key={`modal-skill-${idx}`} className="flex items-center gap-2 type-caption text-zinc-200">
                      <Check className="w-3.5 h-3.5" strokeWidth={2.5} style={{ color: selectedModalCharacter.themeColor }} />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal CTA */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedModalCharacter(null)}
                className="px-5 py-2.5 rounded-xl type-caption font-mono font-medium bg-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  setSelectedModalCharacter(null);
                  onSelectCharacterAction?.(selectedModalCharacter);
                }}
                className="px-6 py-2.5 rounded-xl type-body-sm font-bold text-black transition-all hover:scale-105 cursor-pointer"
                style={{
                  backgroundColor: selectedModalCharacter.themeColor
                }}
              >
                Start Training Module
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
