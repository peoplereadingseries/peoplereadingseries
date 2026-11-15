'use client';
import React from 'react';
import {
  Activity,
  ArrowRight,
  Terminal,
  Crosshair,
  Sparkles
} from 'lucide-react';
import AmbientSoundToggle from './AmbientSoundToggle';

/**
 * CharacterLeftHUD
 * Left wing: Identity, Archetype, Lore, Quote, and Skill Tags
 * Refined pro-coder glassmorphism without clunky nested boxes
 */
export function CharacterLeftHUD({ character }) {
  return (
    <div className="hidden lg:flex flex-col justify-center w-[300px] xl:w-[350px] z-20 pointer-events-none">
      <div className="flex flex-col gap-4 pointer-events-auto">
        
        {/* Sleek Archetype Meta */}
        <div className="flex items-center gap-2.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: character.themeColor }}
          />
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-zinc-400">
            {character.code} // {character.archetype}
          </span>
        </div>

        {/* Character Title */}
        <div>
          <h2 className="text-3xl xl:text-4xl font-black text-white leading-none tracking-tight">
            {character.name}
          </h2>
          <p
            className="text-xs xl:text-sm font-semibold tracking-wide mt-1.5 transition-colors duration-500"
            style={{ color: character.themeColor }}
          >
            {character.title}
          </p>
        </div>

        {/* Lore / Hook Glass Card - Minimalist Obsidian Glass */}
        <div className="relative p-5 rounded-2xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 overflow-hidden">
          {/* Subtle Accent Glow */}
          <div
            className="absolute top-0 inset-x-0 h-px transition-colors duration-500 opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent, ${character.themeColor}, transparent)`
            }}
          />

          <p className="text-xs xl:text-sm text-zinc-300 leading-relaxed font-normal">
            {character.lore}
          </p>

          {/* Tactical Quote */}
          <div className="mt-3.5 pt-3 border-t border-white/[0.06]">
            <p className="text-xs italic text-zinc-400 font-sans leading-snug">
              &ldquo;{character.quote}&rdquo;
            </p>
          </div>
        </div>

        {/* Core Skills - Clean Minimalist Tags (No heavy small highlighted boxes) */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-400 font-mono">
          {character.skills.map((skill, idx) => (
            <span
              key={`skill-${character.id}-${idx}`}
              className="px-2.5 py-1 rounded-md bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-zinc-300 text-[11px] font-medium transition-all"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * CharacterRightHUD
 * Right wing: Audio synthesizer, Telemetry, Protocol & CTA
 */
export function CharacterRightHUD({
  character,
  onStartInteraction
}) {
  return (
    <div className="hidden lg:flex flex-col justify-center w-[280px] xl:w-[320px] z-20 pointer-events-none">
      <div className="flex flex-col gap-4 pointer-events-auto">

        {/* Sound & Status Bar */}
        <div className="flex items-center justify-between pb-1">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: character.themeColor }}
            />
            TELEMETRY & PROTOCOL
          </span>
          <AmbientSoundToggle activeCharacter={character} />
        </div>

        {/* Attributes & Stats Glass Card */}
        <div className="p-5 rounded-2xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" strokeWidth={2} style={{ color: character.themeColor }} />
              FIELD READINESS
            </span>
            <span className="font-bold text-white text-[11px]">ACTIVE</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {character.stats.map((stat, i) => (
              <div key={`stat-${character.id}-${i}`} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-300 font-normal">{stat.label}</span>
                  <span className="font-mono font-bold text-white tabular-nums">
                    {stat.value}{stat.suffix}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-1 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: typeof stat.value === 'number' && stat.suffix === '%' ? `${stat.value}%` : '85%',
                      backgroundColor: character.themeColor,
                      boxShadow: `0 0 10px ${character.themeColor}`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Field Protocol */}
        <div className="p-4 rounded-xl bg-zinc-950/50 border border-white/[0.06] backdrop-blur-md">
          <div className="text-[10px] font-mono tracking-wider font-semibold uppercase mb-1 flex items-center gap-1.5" style={{ color: character.themeColor }}>
            <Terminal className="w-3 h-3" strokeWidth={2} />
            PRIMARY PROTOCOL
          </div>
          <div className="text-xs text-zinc-200 font-medium leading-relaxed">
            {character.tacticalDesc}
          </div>
        </div>

        {/* Action CTA Button */}
        <button
          onClick={() => onStartInteraction?.(character)}
          type="button"
          className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-black tracking-wide transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg hover:brightness-110"
          style={{
            background: `linear-gradient(135deg, ${character.themeColor} 0%, ${character.themeColor}EE 100%)`,
            color: '#000000',
            boxShadow: `0 8px 25px ${character.ambientGlow}`
          }}
        >
          <span>Practice With {character.name.split(' ')[1] || character.name}</span>
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

/**
 * CharacterMobileHUD
 * Streamlined mobile drawer overlay for smaller screens
 */
export function CharacterMobileHUD({
  character,
  onStartInteraction
}) {
  return (
    <div className="lg:hidden absolute top-20 left-4 right-4 z-20 pointer-events-auto">
      <div className="p-4 rounded-2xl bg-zinc-950/85 border border-white/[0.1] backdrop-blur-2xl shadow-2xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: character.themeColor }}
            />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300">
              {character.name} // {character.archetype}
            </span>
          </div>
          <AmbientSoundToggle activeCharacter={character} />
        </div>

        <p className="text-xs text-zinc-300 line-clamp-2 mb-3 leading-relaxed">
          {character.lore}
        </p>

        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-white/[0.08]">
          <span className="text-[11px] font-mono text-zinc-400 truncate">
            Move: <strong className="text-white font-sans">{character.tacticalMove}</strong>
          </span>
          <button
            onClick={() => onStartInteraction?.(character)}
            type="button"
            className="px-4 py-1.5 rounded-lg text-xs font-black transition-all flex-shrink-0 cursor-pointer shadow-md"
            style={{
              backgroundColor: character.themeColor,
              color: '#000000'
            }}
          >
            Practice
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CharacterHUD(props) {
  return (
    <>
      <CharacterLeftHUD {...props} />
      <CharacterRightHUD {...props} />
      <CharacterMobileHUD {...props} />
    </>
  );
}
