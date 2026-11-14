'use client';
import React from 'react';
import {
  Target,
  Activity,
  ArrowRight,
  Terminal,
  Crosshair
} from 'lucide-react';
import AmbientSoundToggle from './AmbientSoundToggle';

/**
 * CharacterLeftHUD
 * Left wing: Identity, Archetype, Lore, Quote, and Skill badges
 */
export function CharacterLeftHUD({ character }) {
  return (
    <div className="hidden lg:flex flex-col justify-center w-[300px] xl:w-[350px] z-20 pointer-events-none">
      <div className="flex flex-col gap-3.5 pointer-events-auto">
        
        {/* Badge: Index & Archetype */}
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full type-eyebrow font-mono border backdrop-blur-md transition-all duration-500"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: `${character.themeColor}50`,
              color: character.themeColor
            }}
          >
            <Crosshair className="w-3 h-3" strokeWidth={2} />
            {character.code} // {character.num}
          </span>

          <span className="type-caption font-mono text-zinc-400 uppercase truncate">
            {character.archetype}
          </span>
        </div>

        {/* Character Title */}
        <div>
          <h2 className="type-h1 font-black text-white leading-tight">
            {character.name}
          </h2>
          <p
            className="type-body font-semibold tracking-wide transition-colors duration-500 mt-1"
            style={{ color: character.themeColor }}
          >
            {character.title}
          </p>
        </div>

        {/* Lore / Hook Glass Card */}
        <div
          className="p-4 xl:p-5 rounded-2xl border backdrop-blur-xl transition-all duration-500 relative overflow-hidden"
          style={{
            backgroundColor: 'rgba(7, 11, 20, 0.75)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            boxShadow: `0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`
          }}
        >
          {/* Ambient accent stripe */}
          <div
            className="absolute top-0 left-0 bottom-0 w-1 transition-colors duration-500"
            style={{ backgroundColor: character.themeColor }}
          />

          <p className="type-body-sm text-zinc-300 leading-relaxed pl-2 font-normal">
            {character.lore}
          </p>

          {/* Tactical Quote */}
          <div className="mt-3 pt-3 border-t border-white/10 pl-2">
            <p className="type-caption italic text-zinc-400 font-sans leading-snug">
              {character.quote}
            </p>
          </div>
        </div>

        {/* Core Skills Pill List */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {character.skills.map((skill, idx) => (
            <span
              key={`skill-${character.id}-${idx}`}
              className="type-caption font-medium px-2.5 py-1 rounded-lg border backdrop-blur-md transition-all duration-300"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                color: 'rgba(240, 230, 252, 0.85)'
              }}
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
 * Right wing: Audio synthesizer, Readiness Stats, Protocol & CTA
 */
export function CharacterRightHUD({
  character,
  onStartInteraction
}) {
  return (
    <div className="hidden lg:flex flex-col justify-center w-[280px] xl:w-[320px] z-20 pointer-events-none">
      <div className="flex flex-col gap-3.5 pointer-events-auto">

        {/* Sound & Status Bar */}
        <div className="flex items-center justify-between pb-1">
          <span className="type-eyebrow font-mono text-zinc-400 uppercase flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: character.themeColor }}
            />
            BIOMETRIC PROFILE
          </span>
          <AmbientSoundToggle activeCharacter={character} />
        </div>

        {/* Attributes & Stats Glass Card */}
        <div
          className="p-4 xl:p-5 rounded-2xl border backdrop-blur-xl transition-all duration-500"
          style={{
            backgroundColor: 'rgba(7, 11, 20, 0.75)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            boxShadow: `0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`
          }}
        >
          <div className="flex items-center justify-between mb-3 type-eyebrow font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" strokeWidth={2} style={{ color: character.themeColor }} />
              READINESS TELEMETRY
            </span>
            <span className="font-bold text-white">LIVE</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {character.stats.map((stat, i) => (
              <div key={`stat-${character.id}-${i}`} className="space-y-1">
                <div className="flex justify-between type-body-sm">
                  <span className="text-zinc-300 font-normal">{stat.label}</span>
                  <span className="font-mono font-bold text-white tabular-nums">
                    {stat.value}{stat.suffix}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
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

        {/* Tactical Field Technique Snippet */}
        <div
          className="p-3.5 rounded-xl border backdrop-blur-md transition-all duration-500"
          style={{
            backgroundColor: 'rgba(12, 18, 34, 0.6)',
            borderColor: `${character.themeColor}30`
          }}
        >
          <div className="type-eyebrow font-mono font-semibold uppercase mb-1 flex items-center gap-1.5" style={{ color: character.themeColor }}>
            <Terminal className="w-3 h-3" strokeWidth={2} />
            PRIMARY PROTOCOL
          </div>
          <div className="type-body-sm text-zinc-200 font-medium leading-snug">
            {character.tacticalDesc}
          </div>
        </div>

        {/* Action CTA Button */}
        <button
          onClick={() => onStartInteraction?.(character)}
          type="button"
          className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl type-body-sm font-bold tracking-wide transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${character.themeColor} 0%, ${character.themeColor}EE 100%)`,
            color: '#000000',
            boxShadow: `0 8px 25px ${character.ambientGlow}`
          }}
        >
          <span>Master This Archetype</span>
          <ArrowRight className="w-4 h-4" strokeWidth={2} />
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
    <div className="lg:hidden absolute top-20 left-3 right-3 z-20 pointer-events-auto">
      <div
        className="p-3.5 sm:p-4 rounded-2xl border backdrop-blur-2xl transition-all duration-500"
        style={{
          backgroundColor: 'rgba(7, 11, 20, 0.85)',
          borderColor: `${character.themeColor}40`,
          boxShadow: `0 10px 30px rgba(0,0,0,0.7), 0 0 20px ${character.ambientGlow}30`
        }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 rounded type-caption font-mono font-bold"
              style={{ backgroundColor: `${character.themeColor}20`, color: character.themeColor }}
            >
              {character.code}
            </span>
            <span className="type-caption font-mono text-zinc-400 uppercase">
              {character.archetype}
            </span>
          </div>
          <AmbientSoundToggle activeCharacter={character} />
        </div>

        <div className="mb-1.5">
          <h2 className="type-h3 font-black text-white leading-tight">
            {character.name}
          </h2>
          <p className="type-body-sm font-semibold" style={{ color: character.themeColor }}>
            {character.title}
          </p>
        </div>

        <p className="type-body-sm text-zinc-300 line-clamp-2 mb-2.5">
          {character.lore}
        </p>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
          <span className="type-caption font-mono text-zinc-400 truncate">
            Tactic: <strong className="text-white font-sans">{character.tacticalMove}</strong>
          </span>
          <button
            onClick={() => onStartInteraction?.(character)}
            type="button"
            className="px-3.5 py-1.5 rounded-lg type-caption font-bold transition-all flex-shrink-0 cursor-pointer"
            style={{
              backgroundColor: character.themeColor,
              color: '#000000'
            }}
          >
            Explore
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
