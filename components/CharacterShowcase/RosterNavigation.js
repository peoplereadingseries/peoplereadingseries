'use client';
import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

/**
 * RosterNavigation
 * Bottom interactive thumbnail roster bar for the 5 characters:
 * - Highlights active character with custom glowing aura
 * - Shows sub-milestone scroll progress per character
 * - Provides smooth click-to-scroll milestone jumps
 */
export default function RosterNavigation({
  characters,
  activeIndex,
  scrollProgress,
  onSelectCharacter
}) {
  return (
    <div className="w-full z-30 pointer-events-auto flex flex-col items-center select-none pb-4 sm:pb-6 px-4">
      {/* Container Card with subtle glass effect */}
      <div className="w-full max-w-5xl bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 sm:p-3 shadow-2xl">
        
        {/* Horizontal Grid of 5 Character Cards */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 md:gap-3.5">
          {characters.map((char, index) => {
            const isActive = index === activeIndex;

            // Calculate progress within this specific character's 20% scroll slice (0.0 to 1.0)
            const sliceStart = index / characters.length;
            const sliceEnd = (index + 1) / characters.length;
            const intraProgress = Math.max(
              0,
              Math.min(1, (scrollProgress - sliceStart) / (sliceEnd - sliceStart))
            );

            return (
              <button
                key={`roster-${char.id}`}
                onClick={() => onSelectCharacter(index)}
                type="button"
                className={`group relative flex flex-col items-center sm:items-start p-1.5 sm:p-2 md:p-2.5 rounded-xl transition-all duration-300 text-left cursor-pointer overflow-hidden ${
                  isActive
                    ? 'bg-white/10 scale-[1.02] border'
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }`}
                style={{
                  borderColor: isActive ? char.themeColor : 'transparent',
                  boxShadow: isActive ? `0 0 25px ${char.ambientGlow}` : 'none'
                }}
              >
                {/* Active Glow Accent Bar at top */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? char.themeColor : 'transparent'
                  }}
                />

                {/* Card Header: Avatar & Number */}
                <div className="flex items-center gap-1.5 sm:gap-2.5 w-full">
                  {/* Thumbnail Avatar */}
                  <div
                    className={`relative w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg overflow-hidden flex-shrink-0 transition-transform duration-300 border ${
                      isActive ? 'scale-105' : 'group-hover:scale-105 opacity-70'
                    }`}
                    style={{
                      borderColor: isActive ? char.themeColor : 'rgba(255,255,255,0.1)'
                    }}
                  >
                    <Image
                      src={char.thumbUrl}
                      alt={char.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>

                  {/* Character Meta on Desktop / Tablet */}
                  <div className="hidden sm:flex flex-col min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-white/50">
                        {char.num}
                      </span>
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-ping"
                          style={{ backgroundColor: char.themeColor }}
                        />
                      )}
                    </div>
                    <span
                      className={`text-xs md:text-sm font-bold truncate leading-tight transition-colors ${
                        isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                      }`}
                    >
                      {char.name}
                    </span>
                    <span className="text-[10px] text-white/40 truncate hidden md:block">
                      {char.title}
                    </span>
                  </div>
                </div>

                {/* Mini Intra-Character Milestone Progress Line */}
                <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 sm:mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-150"
                    style={{
                      width: isActive
                        ? `${Math.round(intraProgress * 100)}%`
                        : index < activeIndex
                        ? '100%'
                        : '0%',
                      backgroundColor: char.themeColor,
                      boxShadow: isActive ? `0 0 8px ${char.themeColor}` : 'none'
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Helper Hint & Navigation Stepper */}
        <div className="hidden sm:flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[11px] font-mono text-white/40 px-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SCROLL OR CLICK TO EXPLORE</span>
          </div>

          <div className="flex items-center gap-3">
            <span>
              MILESTONE {activeIndex + 1} OF {characters.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onSelectCharacter(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Previous Character"
              >
                ◀ PREV
              </button>
              <button
                onClick={() => onSelectCharacter(Math.min(characters.length - 1, activeIndex + 1))}
                disabled={activeIndex === characters.length - 1}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Next Character"
              >
                NEXT ▶
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
