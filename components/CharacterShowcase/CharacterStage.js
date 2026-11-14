'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { MessageSquare, ArrowUpRight } from 'lucide-react';

/**
 * CharacterStage
 * Central 3D character display stage featuring:
 * - Top-centered provocative title / question per persona
 * - Multi-layer depth (Cinematic background scene + 3D halo + Transparent cutout)
 * - Interactive 3D mouse parallax tilt
 * - Ground anchor shadows and atmospheric volumetric lighting
 * - Bottom hook with text highlighted in the persona's theme color (no parentheses)
 * - Let's Talk AI Chatbot CTA button
 */
export default function CharacterStage({
  character,
  allCharacters,
  activeIndex,
  scrollProgress,
  onStartInteraction
}) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse tilt effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: y * -12, // subtle degrees tilt
      y: x * 14
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[54vh] sm:h-[62vh] md:h-[72vh] max-h-[750px] flex items-center justify-center pointer-events-auto select-none"
      style={{ perspective: 1200 }}
    >
      {/* 0. Top-Centered Hook Title (e.g. "Find your charm?", "A tough boss?", "Got a deal?") */}
      <div className="absolute top-1 sm:top-2 md:top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none w-full max-w-2xl px-4 h-14 sm:h-16 flex items-center justify-center">
        {allCharacters.map((c, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={`topcenter-${c.id}`}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${
                isActive
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 -translate-y-3 scale-95 pointer-events-none'
              }`}
            >
              <h2 className="type-h2 font-black text-white tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] whitespace-nowrap">
                {c.topLeftTitle}
              </h2>
            </div>
          );
        })}
      </div>

      {/* 1. Deep Layer: Atmospheric Background Scene Vignette */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          className="relative w-[85%] md:w-[65%] h-[90%] md:h-[76%] rounded-3xl overflow-hidden opacity-30 transition-all duration-1000 ease-out md:translate-y-5 lg:translate-y-7"
          style={{
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)'
          }}
        >
          {allCharacters.map((c, i) => (
            <div
              key={`bg-${c.id}`}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                i === activeIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              style={{
                transitionProperty: 'opacity, transform',
                transitionDuration: '800ms'
              }}
            >
              <Image
                src={c.bgUrl}
                alt={c.name}
                fill
                priority={i === 0}
                className="object-cover filter contrast-125 saturate-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Middle Layer: Holographic Geometric Halo Ring */}
      <div
        className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] rounded-full border border-dashed pointer-events-none transition-all duration-1000 z-0 animate-[spin_40s_linear_infinite] md:translate-y-5 lg:translate-y-7"
        style={{
          borderColor: `${character.themeColor}35`,
          boxShadow: `0 0 60px ${character.ambientGlow}, inset 0 0 60px ${character.ambientGlow}20`
        }}
      />
      <div
        className="absolute w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] md:w-[390px] md:h-[390px] rounded-full border pointer-events-none transition-all duration-1000 z-0 md:translate-y-5 lg:translate-y-7"
        style={{
          borderColor: `${character.themeColor}20`
        }}
      />

      {/* 3. Ground Anchor Shadow */}
      <div
        className="absolute bottom-2 md:bottom-4 w-[260px] md:w-[380px] h-[35px] rounded-[100%] pointer-events-none blur-md transition-all duration-700 z-10 md:translate-y-3"
        style={{
          background: `radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, ${character.ambientGlow}40 45%, transparent 70%)`
        }}
      />

      {/* 4. Foreground Hero Layer: 3D Tilting Character Cutouts */}
      <div
        className="relative w-full h-full flex items-end justify-center z-20 transition-transform duration-300 ease-out will-change-transform md:translate-y-5 lg:translate-y-7"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.03 : 1})`,
          transformStyle: 'preserve-3d'
        }}
      >
        {allCharacters.map((c, idx) => {
          const isActive = idx === activeIndex;
          const isPrev = idx < activeIndex;

          return (
            <div
              key={`cutout-${c.id}`}
              className={`absolute inset-0 flex items-end justify-center pointer-events-none transition-all duration-700 ease-out ${
                isActive
                  ? 'opacity-100 translate-y-0 scale-100 filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]'
                  : isPrev
                  ? 'opacity-0 -translate-y-8 scale-95'
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{
                filter: isActive
                  ? `drop-shadow(0 15px 30px rgba(0,0,0,0.85)) drop-shadow(0 0 35px ${c.ambientGlow})`
                  : 'none'
              }}
            >
              <div className="relative w-auto h-[86%] sm:h-[88%] md:h-[75%] lg:h-[74%] max-w-[90vw] aspect-[9/16] flex items-end justify-center">
                <Image
                  src={c.cutoutUrl}
                  alt={c.name}
                  fill
                  priority={idx <= 1}
                  className="object-contain object-bottom pointer-events-auto cursor-pointer"
                  sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Clean Hook & Let's Talk CTA - Elevated & Bright (No Dimming) */}
      <div
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 z-30 pointer-events-auto transition-all duration-500 transform flex flex-col items-center text-center px-4 max-w-xl w-full"
        style={{
          transform: `translateX(${tilt.y * 1.2}px) translateY(${tilt.x * 1.2}px)`
        }}
      >
        {/* Radiant backlight so the Let's Talk box is luminous and never dim */}
        <div
          className="absolute -inset-4 rounded-3xl pointer-events-none blur-2xl opacity-50 transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at center, ${character.ambientGlow} 0%, transparent 70%)`
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-2.5 sm:gap-3 transition-all duration-500">
          {/* Bottom Hook with highlighted text in theme color */}
          {character.bottomHook ? (
            <p className="type-lead text-white font-bold leading-relaxed max-w-md md:max-w-xl text-center drop-shadow-[0_2px_16px_rgba(0,0,0,1)]">
              {character.bottomHook.before}<span
                style={{
                  color: character.themeColor,
                  textShadow: `0 0 20px ${character.ambientGlow}`
                }}
                className="font-extrabold"
              >
                {character.bottomHook.highlight}
              </span>{character.bottomHook.after}
            </p>
          ) : (
            <p className="type-lead text-white font-bold leading-relaxed max-w-md md:max-w-xl text-center drop-shadow-[0_2px_16px_rgba(0,0,0,1)]">
              &ldquo;{character.simpleHook || character.tagline}&rdquo;
            </p>
          )}

          {/* Let's Talk Conversational Trigger - Vivid, high-contrast, bright */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartInteraction?.(character);
            }}
            type="button"
            className="flex items-center justify-center gap-2 px-7 py-3 rounded-full type-body-sm font-extrabold text-black tracking-wide shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer hover:brightness-125"
            style={{
              backgroundColor: character.themeColor,
              boxShadow: `0 0 30px ${character.ambientGlow}, 0 6px 20px rgba(0,0,0,0.7)`
            }}
          >
            <MessageSquare className="w-4 h-4 fill-black stroke-black shrink-0" />
            <span>Let&apos;s Talk</span>
          </button>
        </div>
      </div>
    </div>
  );
}
