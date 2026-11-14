'use client';
import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  MessageSquare,
  MessageSquareCode,
  Fingerprint,
  AudioLines,
  KeyRound,
  Radio
} from 'lucide-react';

export default function SiyaCompanionBanner() {
  const capabilities = [
    {
      icon: MessageSquareCode,
      text: 'Real-time Subconscious Text Decoding'
    },
    {
      icon: Fingerprint,
      text: 'Self-Character Archetype Calibration'
    },
    {
      icon: AudioLines,
      text: 'Voice Synthesis in 3 Languages'
    },
    {
      icon: KeyRound,
      text: 'Included Free with The Heart Reader'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#13050a] via-[#090204] to-black text-white border-t border-rose-500/20">
      {/* Rose Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-rose-600/[0.08] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 rounded-3xl bg-[#14060b] border border-rose-500/30 p-8 sm:p-12 shadow-[0_0_60px_rgba(244,63,94,0.15)] flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Side: Avatar & Description */}
        <div className="flex-1 space-y-5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 type-eyebrow font-mono">
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" strokeWidth={2} />
            <span>Companion AI for Book V: The Heart Reader</span>
          </div>

          <h3 className="type-h2 font-black text-white tracking-tight">
            Meet Siya: Your Real-Time Heart Reader AI
          </h3>

          <p className="type-body text-zinc-300 leading-relaxed">
            The concepts in <span className="text-rose-400 font-semibold">The Heart Reader</span> come alive with Siya. Whether you want to decode confusing texts from a crush, reveal your own romantic archetype, or know what to text next without sounding needy—Siya provides real-time guidance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div key={i} className="flex items-center gap-2.5 type-body-sm text-zinc-200">
                  <div className="w-5 h-5 rounded-md bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0 text-rose-400">
                    <Icon className="w-3 h-3" strokeWidth={2} />
                  </div>
                  <span className="leading-snug">{cap.text}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-3">
            <Link
              href="/siya"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white type-body-sm font-bold shadow-[0_0_25px_rgba(244,63,94,0.4)] transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" strokeWidth={2} />
              <span>Launch Siya AI Experience</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* Right Side: Interactive Card Preview of Siya Chat */}
        <div className="w-full md:w-80 shrink-0 bg-[#0a0a0c] border border-white/15 rounded-2xl p-4 shadow-2xl relative select-none">
          {/* Mock Header */}
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
            <div className="w-8 h-8 rounded-full bg-rose-950/80 border border-rose-500/40 flex items-center justify-center text-rose-300">
              <Radio className="w-4 h-4" strokeWidth={2} />
            </div>
            <div>
              <div className="type-body-sm font-bold text-white flex items-center gap-1.5">
                <span>Siya</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="type-caption font-mono text-zinc-400">Emotional Intelligence Engine</div>
            </div>
          </div>

          {/* Mock Messages with Calibrated Font Scale */}
          <div className="py-3 space-y-2.5 type-caption">
            <div className="bg-[#18181f] text-zinc-200 p-2.5 rounded-xl rounded-tl-xs border border-white/10 leading-relaxed font-normal">
              &ldquo;I am Siya, your Heart Reader. I decode unspoken emotions and subtle signals.&rdquo;
            </div>
            <div className="bg-white text-black font-medium p-2.5 rounded-xl rounded-tr-xs ml-auto max-w-[85%] leading-relaxed">
              &ldquo;Why did they reply with just an emoji after 5 hours?&rdquo;
            </div>
            <div className="bg-[#18181f] text-rose-200 p-2.5 rounded-xl rounded-tl-xs border border-rose-500/25 leading-relaxed font-normal">
              &ldquo;That is a low-investment bid testing your reaction. Stay light. Do not double-text.&rdquo;
            </div>
          </div>

          <div className="text-center pt-2 border-t border-white/5">
            <span className="type-caption font-mono text-zinc-500">
              Live Voice & Chat Engine Active
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
