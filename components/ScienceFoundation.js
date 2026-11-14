'use client';
import React from 'react';
import {
  BrainCircuit,
  Scale,
  ScanEye,
  Compass,
  Activity,
  Layers3
} from 'lucide-react';

export default function ScienceFoundation() {
  const foundations = [
    {
      code: 'NEURO-01',
      title: 'Neuro-Linguistic Calibration',
      discipline: 'Autonomic Biology',
      accentColor: '#F59E0B',
      accentBg: 'rgba(245, 158, 11, 0.1)',
      accentBorder: 'rgba(245, 158, 11, 0.25)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          {/* Synaptic nodes & impulse wave */}
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.5 11l7-3.5" />
          <path d="M8.5 13l7 3.5" />
          <path d="M12 9v6" strokeDasharray="1.5 1.5" />
        </svg>
      ),
      desc: 'Based on mirror neuron biology and autonomic stress responses. Learn how people unconsciously reveal feelings through vocal cadence, pupil dilation, and micro-delays before conscious thought kicks in.'
    },
    {
      code: 'TACTIC-02',
      title: 'Hostage Crisis Negotiation Tactics',
      discipline: 'Crisis Protocol',
      accentColor: '#10B981',
      accentBg: 'rgba(16, 185, 129, 0.1)',
      accentBorder: 'rgba(16, 185, 129, 0.25)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          {/* Calibrated leverage fulcrum */}
          <path d="M12 3v14" />
          <path d="M5 9l7-3 7 3" />
          <path d="M5 9v4c0 1.5 2 2.5 3.5 2.5s3.5-1 3.5-2.5V9" />
          <path d="M12 9v4c0 1.5 2 2.5 3.5 2.5s3.5-1 3.5-2.5V9" />
          <path d="M8 21h8" />
        </svg>
      ),
      desc: 'Tactical empathy, calibrated questions, and accusation audits adapted from FBI crisis protocols to turn impossible deadlocks into collaborative wins in business, salary, and contracts.'
    },
    {
      code: 'FACS-03',
      title: 'Behavioral Forensics & FACS',
      discipline: 'Micro-Expressions',
      accentColor: '#3B82F6',
      accentBg: 'rgba(59, 130, 246, 0.1)',
      accentBorder: 'rgba(59, 130, 246, 0.25)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          {/* Forensic reticle aperture */}
          <path d="M3 7V5a2 2 0 0 1 2-2h2" />
          <path d="M17 3h2a2 2 0 0 1 2 2v2" />
          <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
          <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
          <circle cx="12" cy="12" r="3.5" />
          <line x1="12" y1="5" x2="12" y2="7" />
          <line x1="12" y1="17" x2="12" y2="19" />
          <line x1="5" y1="12" x2="7" y2="12" />
          <line x1="17" y1="12" x2="19" y2="12" />
        </svg>
      ),
      desc: 'The Facial Action Coding System: breaking down facial micro-twitches and linguistic evasion markers to distinguish genuine alignment from calculated deception.'
    },
    {
      code: 'COMMAND-04',
      title: 'Executive Gravity & Command',
      discipline: 'Command Poise',
      accentColor: '#A855F7',
      accentBg: 'rgba(168, 85, 247, 0.1)',
      accentBorder: 'rgba(168, 85, 247, 0.25)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          {/* Cardinal Poise & Gravitational Horizon */}
          <circle cx="12" cy="12" r="9" />
          <polygon points="12 4 14.5 10 20 12 14.5 14 12 20 9.5 14 4 12 9.5 10" fill="currentColor" fillOpacity="0.15" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
      desc: 'The science of non-reactive poise and commander\'s intent. How elite military and corporate commanders project calm in crisis and inspire total loyalty.'
    },
    {
      code: 'POLARITY-05',
      title: 'The Anti-Gravity of Romantic Polarity',
      discipline: 'Interpersonal Physics',
      accentColor: '#F43F5E',
      accentBg: 'rgba(244, 63, 94, 0.1)',
      accentBorder: 'rgba(244, 63, 94, 0.25)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          {/* Dual Resonance Pulse & Magnetic Equilibrium */}
          <path d="M2 12c1.5-3 3-4.5 5-4.5s3.5 2 5 4.5c1.5 2.5 3 4.5 5 4.5s3.5-1.5 5-4.5" />
          <path d="M2 12c1.5 3 3 4.5 5 4.5s3.5-2 5-4.5c1.5-2.5 3-4.5 5-4.5s3.5 1.5 5 4.5" strokeOpacity="0.4" strokeDasharray="1 2" />
          <circle cx="7" cy="12" r="2" fill="currentColor" fillOpacity="0.2" />
          <circle cx="17" cy="12" r="2" fill="currentColor" fillOpacity="0.2" />
        </svg>
      ),
      desc: 'The physics of human attraction: why desperation creates friction, emotional lightness naturally pulls, and decoding unspoken emotional bids sparks deep intimacy.'
    }
  ];

  return (
    <section id="science" className="py-24 sm:py-28 px-4 sm:px-6 relative overflow-hidden bg-[#070B14] text-white border-t border-white/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-amber-500/[0.04] via-blue-500/[0.04] to-rose-500/[0.04] rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header with Exact Typographic Scale */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4 backdrop-blur-md">
            <Layers3 className="w-3.5 h-3.5 text-amber-400" />
            <span className="type-eyebrow text-zinc-300">Field-Tested Behavioral Science</span>
          </div>

          <h2 className="type-h2 text-white max-w-2xl mx-auto text-balance">
            Why Human Decoding Is The Ultimate 21st-Century Superpower
          </h2>

          <p className="type-body text-zinc-400 mt-4 leading-relaxed max-w-2xl mx-auto">
            In an automated world of AI and algorithms, the highest returns in wealth, influence, and love belong to those who can accurately read and calibrate other human beings.
          </p>
        </div>

        {/* 5 Scientific Pillars - Clever Vector Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {foundations.map((item, idx) => (
            <div
              key={item.code}
              className={`p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Clever Icon + Monospace Discipline Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: item.accentBg,
                      color: item.accentColor,
                      border: `1px solid ${item.accentBorder}`
                    }}
                  >
                    {item.icon}
                  </div>

                  <span className="type-caption font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    {item.code}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="type-caption font-mono uppercase tracking-wider text-zinc-400 font-semibold" style={{ color: item.accentColor }}>
                    {item.discipline}
                  </div>
                  
                  <h3 className="type-h4 text-white font-bold leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="type-body-sm text-zinc-400 leading-relaxed mt-3">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Subtle Baseline Indicator */}
              <div className="pt-5 mt-5 border-t border-white/5 flex items-center justify-between text-zinc-500">
                <span className="type-caption font-mono">Calibrated Methodology</span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: item.accentColor }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
