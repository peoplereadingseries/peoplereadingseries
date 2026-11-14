'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, AudioLines } from 'lucide-react';

/**
 * AmbientSoundToggle
 * Zero-dependency procedural Web Audio API harmonic soundscape engine.
 * Generates smooth, soothing cinematic frequencies corresponding to each character's resonant tone.
 */
export default function AmbientSoundToggle({ activeCharacter }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const osc1Ref = useRef(null);
  const osc2Ref = useRef(null);
  const gainNodeRef = useRef(null);
  const filterNodeRef = useRef(null);

  // Initialize or update frequency when character changes
  useEffect(() => {
    if (!isPlaying || !audioCtxRef.current) return;

    try {
      const targetFreq = activeCharacter.audioFreq || 432;
      const now = audioCtxRef.current.currentTime;

      if (osc1Ref.current) {
        osc1Ref.current.frequency.cancelScheduledValues(now);
        osc1Ref.current.frequency.exponentialRampToValueAtTime(targetFreq, now + 0.8);
      }
      if (osc2Ref.current) {
        // Sub-harmonic fifth / octave
        osc2Ref.current.frequency.cancelScheduledValues(now);
        osc2Ref.current.frequency.exponentialRampToValueAtTime(targetFreq * 1.5, now + 0.8);
      }
    } catch {
      // Audio context might be suspended by browser policies
    }
  }, [activeCharacter, isPlaying]);

  const toggleSound = async () => {
    if (isPlaying) {
      // Smooth fade out
      if (gainNodeRef.current && audioCtxRef.current) {
        const now = audioCtxRef.current.currentTime;
        gainNodeRef.current.gain.cancelScheduledValues(now);
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, now + 0.4);
        setTimeout(() => {
          stopAudio();
          setIsPlaying(false);
        }, 400);
      } else {
        stopAudio();
        setIsPlaying(false);
      }
    } else {
      startAudio();
      setIsPlaying(true);
    }
  };

  const startAudio = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const now = ctx.currentTime;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.08, now + 1.2); // Soft volume

      // Lowpass filter for dreamy cinematic warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, now);
      filter.Q.setValueAtTime(2, now);

      const rootFreq = activeCharacter.audioFreq || 432;

      // Primary oscillator (Sine)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(rootFreq, now);

      // Secondary oscillator (Triangle for rich harmonics)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(rootFreq * 1.5, now);

      // Subtle LFO for gentle breathing movement
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.2, now); // Slow 0.2Hz cycle
      lfoGain.gain.setValueAtTime(15, now);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // Connect nodes
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      lfo.start(now);

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
      filterNodeRef.current = filter;
      gainNodeRef.current = masterGain;
    } catch (e) {
      console.warn('Web Audio playback error:', e);
    }
  };

  const stopAudio = () => {
    try {
      if (osc1Ref.current) osc1Ref.current.stop();
      if (osc2Ref.current) osc2Ref.current.stop();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    } catch {
      // Ignored
    }
    audioCtxRef.current = null;
    osc1Ref.current = null;
    osc2Ref.current = null;
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleSound}
        type="button"
        title={isPlaying ? "Mute Ambient Soundtrack" : `Play ${activeCharacter.name} Resonant Frequency (${activeCharacter.audioFreq}Hz)`}
        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full type-caption font-mono transition-all duration-300 border backdrop-blur-md cursor-pointer select-none ${
          isPlaying
            ? 'bg-white/10 text-white shadow-lg'
            : 'bg-black/40 text-white/70 hover:text-white hover:bg-white/10'
        }`}
        style={{
          borderColor: isPlaying ? activeCharacter.themeColor : 'rgba(255,255,255,0.14)',
          boxShadow: isPlaying ? `0 0 16px ${activeCharacter.ambientGlow}` : 'none'
        }}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-full rounded-full animate-bounce" style={{ backgroundColor: activeCharacter.themeColor, animationDelay: '0ms' }} />
              <span className="w-0.5 h-2 rounded-full animate-bounce" style={{ backgroundColor: activeCharacter.themeColor, animationDelay: '150ms' }} />
              <span className="w-0.5 h-3 rounded-full animate-bounce" style={{ backgroundColor: activeCharacter.themeColor, animationDelay: '300ms' }} />
            </div>
            <span className="text-[11px] font-mono tracking-wider text-white">
              {activeCharacter.audioFreq}Hz
            </span>
            <Volume2 className="w-3.5 h-3.5" style={{ color: activeCharacter.themeColor }} />
          </>
        ) : (
          <>
            <AudioLines className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
            <span className="text-[11px] tracking-wide text-zinc-400 group-hover:text-white font-sans">
              Harmonic Audio
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-amber-400 transition-colors" />
          </>
        )}
      </button>
    </div>
  );
}
