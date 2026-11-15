'use client';
import React from 'react';
import {
  BrainCircuit,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ScienceFoundation() {
  const foundations = [
    {
      code: 'NEURO-01',
      title: 'Neuro-Linguistic Calibration',
      discipline: 'Autonomic Biology & Linguistics',
      attribution: 'Albert Mehrabian (7-38-55 Model) & Rizzolatti Mirror Neuron Research',
      accentColor: '#F59E0B',
      desc: 'Based on mirror neuron biology and autonomic stress responses. Learn how people unconsciously reveal feelings through vocal cadence, pupil dilation, and micro-delays before conscious thought kicks in.',
      volume: 'The Charmer (Vol. I)'
    },
    {
      code: 'TACTIC-02',
      title: 'Crisis Negotiation Frameworks',
      discipline: 'High-Stakes Crisis Protocol',
      attribution: 'Synthesizing Chris Voss (Never Split the Difference) & Harvard Program on Negotiation',
      accentColor: '#10B981',
      desc: 'Adapts tactical empathy, calibrated "how" questions, and accusation audits from real-world FBI crisis protocols into accessible business frameworks for salary raises, contractor negotiations, and partnership terms.',
      volume: 'The Negotiator (Vol. II)'
    },
    {
      code: 'FACS-03',
      title: 'Behavioral Forensics & Micro-Cues',
      discipline: 'Facial Action Coding System',
      attribution: 'Built upon Dr. Paul Ekman\'s peer-reviewed FACS & Maureen O\'Sullivan deception research',
      accentColor: '#3B82F6',
      desc: 'Grounds deception detection in empirical micro-expression research. Deconstructs baseline deviation, cognitive load hesitation, and 1/25-second facial micro-twitches to distinguish nervous truth from calculated deceit.',
      volume: 'The Detective (Vol. III)'
    },
    {
      code: 'COMMAND-04',
      title: 'Executive Gravity & Radical Candor',
      discipline: 'Organizational Psychology',
      attribution: 'Integrating Kim Scott\'s Radical Candor & Military Commander\'s Intent (Army War College)',
      accentColor: '#A855F7',
      desc: 'Combines direct challenging with deep personal care. Teaches non-reactive poise and commander\'s intent so corporate leaders can cut through bureaucratic indecision and command deep team alignment in crises.',
      volume: 'The Leader (Vol. IV)'
    },
    {
      code: 'POLARITY-05',
      title: 'Interpersonal Physics & Polarity',
      discipline: 'Attachment Theory & Subconscious Signals',
      attribution: 'Synthesizing John Bowlby\'s Attachment Models & Modern Interpersonal Polarity Dynamics',
      accentColor: '#F43F5E',
      desc: 'The psychological law of Anti-Gravity: when you chase, people pull away; when you cultivate self-contained poise, they lean in. Explains the subtle dynamics of romantic texting, mixed signals, and emotional boundaries.',
      volume: 'The Heart Reader (Vol. V)'
    }
  ];

  return (
    <section id="science" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#05070f] text-white border-t border-white/[0.08]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-r from-amber-500/[0.03] via-blue-500/[0.03] to-rose-500/[0.03] rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header - Pro Coder Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-amber-300 text-xs font-mono tracking-wider uppercase">
            <BrainCircuit className="w-3.5 h-3.5 text-amber-400" />
            <span>Empirical Foundations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Synthesizing 50+ Years of Behavioral Science Into 5 Actionable Playbooks
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            We do not pretend to invent human nature from scratch. Instead, our research lab translates peer-reviewed behavioral psychology and high-stakes negotiation science into word-for-word tactical scripts.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2 text-xs font-mono text-zinc-500">
            <span className="text-zinc-300">Peer-Reviewed Syntheses</span>
            <span>•</span>
            <span className="text-zinc-300">Formal Citations</span>
            <span>•</span>
            <span className="text-amber-400 font-semibold">Field-Validated Playbooks</span>
          </div>
        </div>

        {/* 5 Scientific Foundations Grid - Clean Bespoke Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {foundations.map((item, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-2xl bg-[#090d18]/80 border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Subtle top hairline highlight */}
              <div
                className="absolute top-0 inset-x-0 h-px opacity-40 transition-opacity group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent, ${item.accentColor}, transparent)`
                }}
              />

              <div className="space-y-4">
                
                {/* Minimalist Monospace Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: item.accentColor }}
                    />
                    <span className="text-xs font-mono font-bold tracking-wider text-zinc-400">
                      {item.code}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {item.volume}
                  </span>
                </div>

                {/* Title & Discipline */}
                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono text-zinc-500 block mt-0.5">
                    Field: {item.discipline}
                  </span>
                </div>

                {/* Sleek Attribution Callout (No clumsy inner border box) */}
                <div
                  className="pl-3 border-l-2 text-xs space-y-0.5 py-0.5"
                  style={{ borderColor: `${item.accentColor}50` }}
                >
                  <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">
                    Foundational Literature:
                  </span>
                  <p className="text-zinc-200 font-medium leading-relaxed">
                    {item.attribution}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 mt-5 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>Field-tested curriculum</span>
                <span className="text-amber-400 font-semibold">Volume {idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Synthesis Manifesto Callout Box - Bespoke Satin Vault */}
        <div className="mt-14 p-7 sm:p-9 rounded-2xl bg-gradient-to-r from-[#0d1222] via-[#080b14] to-[#05070d] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h4 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Why We Attribute Our Foundational Sources</span>
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              True mastery begins by standing on the shoulders of giants. Rather than rebranding established science as &quot;secret tricks,&quot; PeopleReading transparently credits pioneers like Chris Voss, Dr. Paul Ekman, and Kim Scott while providing the exact scripts, field breakdowns, and interactive scenarios to apply them in real life.
            </p>
          </div>
          <a
            href="#bundle"
            className="px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-black text-xs transition-all active:scale-95 shrink-0 shadow-lg cursor-pointer flex items-center gap-2"
          >
            <span>Explore All 5 Books</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
