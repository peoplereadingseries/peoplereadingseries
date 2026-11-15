'use client';
import React from 'react';
import {
  BrainCircuit,
  Scale,
  ScanEye,
  Compass,
  Activity,
  Layers3,
  BookOpen,
  Award,
  Sparkles
} from 'lucide-react';

export default function ScienceFoundation() {
  const foundations = [
    {
      code: 'NEURO-01',
      title: 'Neuro-Linguistic Calibration',
      discipline: 'Autonomic Biology & Linguistics',
      attribution: 'Albert Mehrabian (7-38-55 Model) & Rizzolatti Mirror Neuron Research',
      accentColor: '#F59E0B',
      accentBg: 'rgba(245, 158, 11, 0.1)',
      accentBorder: 'rgba(245, 158, 11, 0.25)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.5 11l7-3.5" />
          <path d="M8.5 13l7 3.5" />
          <path d="M12 9v6" strokeDasharray="1.5 1.5" />
        </svg>
      ),
      desc: 'Based on mirror neuron biology and autonomic stress responses. Learn how people unconsciously reveal feelings through vocal cadence, pupil dilation, and micro-delays before conscious thought kicks in.',
      volume: 'The Charmer (Vol. I)'
    },
    {
      code: 'TACTIC-02',
      title: 'Crisis Negotiation Frameworks',
      discipline: 'High-Stakes Crisis Protocol',
      attribution: 'Synthesizing Chris Voss (Never Split the Difference) & Harvard Program on Negotiation',
      accentColor: '#10B981',
      accentBg: 'rgba(16, 185, 129, 0.1)',
      accentBorder: 'rgba(16, 185, 129, 0.25)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v14" />
          <path d="M5 9l7-3 7 3" />
          <path d="M5 9v4c0 1.5 2 2.5 3.5 2.5s3.5-1 3.5-2.5V9" />
          <path d="M12 9v4c0 1.5 2 2.5 3.5 2.5s3.5-1 3.5-2.5V9" />
          <path d="M8 21h8" />
        </svg>
      ),
      desc: 'Adapts tactical empathy, calibrated "how" questions, and accusation audits from real-world FBI crisis protocols into accessible business frameworks for salary raises, contractor negotiations, and partnership terms.',
      volume: 'The Negotiator (Vol. II)'
    },
    {
      code: 'FACS-03',
      title: 'Behavioral Forensics & Micro-Cues',
      discipline: 'Facial Action Coding System',
      attribution: 'Built upon Dr. Paul Ekman\'s peer-reviewed FACS & Maureen O\'Sullivan deception research',
      accentColor: '#3B82F6',
      accentBg: 'rgba(59, 130, 246, 0.1)',
      accentBorder: 'rgba(59, 130, 246, 0.25)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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
      desc: 'Grounds deception detection in empirical micro-expression research. Deconstructs baseline deviation, cognitive load hesitation, and 1/25-second facial micro-twitches to distinguish nervous truth from calculated deceit.',
      volume: 'The Detective (Vol. III)'
    },
    {
      code: 'COMMAND-04',
      title: 'Executive Gravity & Radical Candor',
      discipline: 'Organizational Psychology',
      attribution: 'Integrating Kim Scott\'s Radical Candor & Military Commander\'s Intent (Army War College)',
      accentColor: '#A855F7',
      accentBg: 'rgba(168, 85, 247, 0.1)',
      accentBorder: 'rgba(168, 85, 247, 0.25)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <polygon points="12 4 14.5 10 20 12 14.5 14 12 20 9.5 14 4 12 9.5 10" fill="currentColor" fillOpacity="0.15" />
          <circle cx="12" cy="1.5" r="1.5" fill="currentColor" />
        </svg>
      ),
      desc: 'Combines direct challenging with deep personal care. Teaches non-reactive poise and commander\'s intent so corporate leaders can cut through bureaucratic indecision and command deep team alignment in crises.',
      volume: 'The Leader (Vol. IV)'
    },
    {
      code: 'POLARITY-05',
      title: 'Interpersonal Physics & Polarity',
      discipline: 'Attachment Theory & Subconscious Signals',
      attribution: 'Synthesizing John Bowlby\'s Attachment Models & Modern Interpersonal Polarity Dynamics',
      accentColor: '#F43F5E',
      accentBg: 'rgba(244, 63, 94, 0.1)',
      accentBorder: 'rgba(244, 63, 94, 0.25)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          <path d="M12 5v6" strokeDasharray="1.5 1.5" />
          <circle cx="12" cy="15" r="1" fill="currentColor" />
        </svg>
      ),
      desc: 'The psychological law of Anti-Gravity: when you chase, people pull away; when you cultivate self-contained poise, they lean in. Explains the subtle dynamics of romantic texting, mixed signals, and emotional boundaries.',
      volume: 'The Heart Reader (Vol. V)'
    }
  ];

  return (
    <section id="science" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#070A12] text-white border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-amber-500/5 via-blue-500/5 to-rose-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <BrainCircuit className="w-4 h-4 text-amber-400" strokeWidth={2} />
            <span className="type-eyebrow font-mono text-zinc-300">Empirical Behavioral Foundations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Synthesizing 50+ Years of Behavioral Science Into 5 Actionable Playbooks
          </h2>

          <p className="type-body text-zinc-400 leading-relaxed text-balance">
            PeopleReading does not pretend to invent behavioral human nature from scratch. Instead, our research collective synthesizes foundational, peer-reviewed psychology and high-stakes crisis protocols into word-for-word tactical scripts.
          </p>

          {/* Academic Integrity Badge */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Academic Attribution & Transparent Foundational Citations</span>
            </span>
          </div>
        </div>

        {/* 5 Scientific Foundations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {foundations.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-7 rounded-3xl bg-[#0C101C]/90 border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="space-y-4">
                
                {/* Card Top: Code & Volume */}
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-xs font-black tracking-wider px-2.5 py-1 rounded-lg border"
                    style={{
                      color: item.accentColor,
                      borderColor: item.accentBorder,
                      backgroundColor: item.accentBg
                    }}
                  >
                    {item.code}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {item.volume}
                  </span>
                </div>

                {/* Title & Discipline */}
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 block mt-0.5">
                    Field: {item.discipline}
                  </span>
                </div>

                {/* Formal Attribution Callout */}
                <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs space-y-1">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                    Foundational Attribution:
                  </span>
                  <p className="text-zinc-300 font-medium leading-snug">
                    {item.attribution}
                  </p>
                </div>

                {/* Description */}
                <p className="type-body-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>Field-tested curriculum</span>
                <span className="text-amber-400 font-bold">Volume {idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Synthesis Manifesto Callout Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/20 via-black to-zinc-950 border border-white/15 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h4 className="text-lg sm:text-xl font-black text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Why We Credit Our Foundational Sources</span>
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              True mastery starts with standing on the shoulders of giants. Rather than re-labeling known behavioral concepts as &quot;mysterious secrets,&quot; PeopleReading provides credit to pioneers like Chris Voss, Dr. Paul Ekman, and Kim Scott while delivering the exact contextual scripts, scenarios, and live interactive simulations required to apply them in your life today.
            </p>
          </div>
          <a
            href="#bundle"
            className="px-6 py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-black text-xs transition-all active:scale-95 shrink-0 shadow-lg cursor-pointer"
          >
            Explore The 5 Books
          </a>
        </div>

      </div>
    </section>
  );
}
