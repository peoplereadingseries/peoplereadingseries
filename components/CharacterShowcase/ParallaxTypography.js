'use client';
import React from 'react';

/**
 * ParallaxTypography
 * Renders large cinematic typography behind the character stage with dynamic parallax
 * shifting, letter-spacing morphs, and glowing stroke aesthetics.
 */
export default function ParallaxTypography({
  character,
  scrollProgress,
  activeIndex
}) {
  // Parallax horizontal drift relative to scroll
  // The text smoothly tracks across the horizontal axis as the user scrolls through the 500vh container
  const parallaxX = (scrollProgress - (activeIndex / 4)) * -140;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none flex flex-col justify-center items-center z-0">
      
      {/* Huge Background Roman/Numerical Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[28vw] md:text-[24vw] leading-none tracking-tighter transition-all duration-700 ease-out"
        style={{
          color: 'transparent',
          WebkitTextStroke: `2px ${character.themeColor}15`,
          opacity: 0.8,
          transform: `translate(-50%, -50%) scale(${1 + (scrollProgress % 0.2) * 0.4})`
        }}
      >
        {character.num}
      </div>

      {/* Main Massive Dynamic Archetype Typography */}
      <div
        className="relative w-full flex flex-col items-center justify-center transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translateX(${parallaxX}px)`
        }}
      >

        {/* Primary Massive Outlined / Filled Title */}
        <h1
          key={`typography-${character.id}`}
          className="font-black text-[13vw] sm:text-[14vw] md:text-[13vw] leading-none tracking-tighter uppercase whitespace-nowrap transition-all duration-700 ease-out"
          style={{
            background: `linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.03) 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: `1.5px rgba(255, 255, 255, 0.12)`,
            textShadow: `0 0 80px ${character.ambientGlow}`
          }}
        >
          {character.typography}
        </h1>
      </div>

      {/* Ambient Radial Spotlight synced with character's theme */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, ${character.ambientGlow} 0%, rgba(0,0,0,0) 70%)`,
          opacity: 0.55
        }}
      />
    </div>
  );
}
