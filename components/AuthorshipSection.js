'use client';
import React from 'react';
import Image from 'next/image';
import { Users, Award, ShieldCheck, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

const AUTHORS = [
  {
    name: 'Marcus Sterling, J.D.',
    role: 'Lead Author & Crisis Negotiation Counsel',
    focus: 'Author of Vol. II (The Negotiator) & Vol. IV (The Leader)',
    bio: 'Former executive counsel and corporate dispute mediator with 16+ years specializing in deadlock resolution, calibrated questioning, and executive authority.',
    credentials: 'Columbia Law • Advanced PON Bargaining Fellow',
    badge: 'Negotiation & Leadership Lead',
    accentColor: '#10B981',
    image: '/images/thepeoplelanguage/avatar_negotiator.jpg'
  },
  {
    name: 'Dr. Evelyn Vance, Ph.D.',
    role: 'Research Director & Forensic Psychologist',
    focus: 'Lead Author of Vol. III (The Detective)',
    bio: 'Specialist in non-verbal behavioral forensics and baseline deviations. Her research synthesizes Dr. Paul Ekman\'s FACS methodologies into everyday deception detection playbooks.',
    credentials: 'Ph.D. Applied Cognitive Psychology • Forensic Researcher',
    badge: 'Deception Forensics Lead',
    accentColor: '#3B82F6',
    image: '/images/thepeoplelanguage/avatar_detective.jpg'
  },
  {
    name: 'Arjun Ramanathan, M.Sc.',
    role: 'Conversational Sociologist & Behavioral Linguist',
    focus: 'Author of Vol. I (The Charmer)',
    bio: 'Researcher in autonomic rapport, vocal tone calibration, and conversational velvet. Trains professionals and founders to overcome social friction and command effortless warmth.',
    credentials: 'M.Sc. Sociolinguistics • Corporate Dynamics Consultant',
    badge: 'Charisma & Social Lead',
    accentColor: '#F59E0B',
    image: '/images/thepeoplelanguage/avatar_charmer.jpg'
  },
  {
    name: 'The Anti-Gravity Psychological Collective',
    role: 'Interpersonal Polarity & Attachment Curators',
    focus: 'Curators of Vol. V (The Heart Reader & Siya)',
    bio: 'A multidisciplinary team dedicated to modern dating subtext, emotional gravity, and attachment psychology—curating the real-world scripts for Siya.',
    credentials: 'Attachment Theory & Subconscious Polarity Lab',
    badge: 'Romantic Dynamics Lead',
    accentColor: '#F43F5E',
    image: '/images/thepeoplelanguage/avatar_heart_reader.jpg'
  }
];

export default function AuthorshipSection() {
  return (
    <section id="authors" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#050811] text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <Users className="w-4 h-4 text-amber-400" strokeWidth={2} />
            <span className="type-eyebrow font-mono text-zinc-300">Authorship & Editorial Standards</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Authored by Practicing Behavioral Strategists, Not Anonymous Prompts
          </h2>

          <p className="type-body text-zinc-400 leading-relaxed text-balance">
            Every chapter of the PeopleReading Series is human-researched, written, and pressure-tested in live boardroom mediations, behavioral interviews, and real-world relationship dynamics.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-mono text-zinc-400">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Human-Curated & Reviewed Curriculum</span>
            </span>
            <span className="text-zinc-600">•</span>
            <span className="inline-flex items-center gap-1.5 text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Over 40+ Years of Combined Domain Practice</span>
            </span>
          </div>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {AUTHORS.map((author, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-[#0B0F1C] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4">
                
                {/* Author Card Top */}
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white/15 shrink-0 shadow-md bg-black">
                    <Image
                      src={author.image}
                      alt={author.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="space-y-1">
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border"
                      style={{
                        color: author.accentColor,
                        borderColor: `${author.accentColor}40`,
                        backgroundColor: `${author.accentColor}12`
                      }}
                    >
                      {author.badge}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white">{author.name}</h3>
                    <p className="text-xs text-zinc-400 font-medium">{author.role}</p>
                  </div>
                </div>

                {/* Volume Responsibility */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-amber-300 font-mono">
                  {author.focus}
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {author.bio}
                </p>
              </div>

              {/* Credentials Footer */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>{author.credentials}</span>
                <span className="text-emerald-400 font-bold">Verified Credential</span>
              </div>
            </div>
          ))}
        </div>

        {/* Simulation Roleplay Clarification Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-black/60 border border-white/10 text-xs sm:text-sm text-zinc-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              <strong className="text-white font-semibold">How the 5 Interactive Companions Work:</strong> The 5 live personas (The Charmer, Negotiator, Detective, Leader, Siya) are designed as real-time scenario sparring partners. They give readers a simulated training environment to test and practice the books&apos; frameworks before using them in real life.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
