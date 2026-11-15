'use client';
import React from 'react';
import Image from 'next/image';
import { Users, ShieldCheck, BookOpen, CheckCircle2 } from 'lucide-react';

const AUTHORS = [
  {
    name: 'Marcus Sterling, J.D.',
    role: 'Lead Author & Crisis Negotiation Counsel',
    focus: 'Author of Vol. II (The Negotiator) & Vol. IV (The Leader)',
    bio: 'Former executive counsel and corporate dispute mediator with 16+ years specializing in deadlock resolution, calibrated questioning, and executive authority.',
    credentials: 'Columbia Law • Advanced PON Bargaining Fellow',
    badge: 'Negotiation & Leadership',
    accentColor: '#10B981',
    image: '/images/thepeoplelanguage/avatar_negotiator.jpg'
  },
  {
    name: 'Dr. Evelyn Vance, Ph.D.',
    role: 'Research Director & Forensic Psychologist',
    focus: 'Lead Author of Vol. III (The Detective)',
    bio: 'Specialist in non-verbal behavioral forensics and baseline deviations. Her research synthesizes Dr. Paul Ekman\'s FACS methodologies into everyday deception detection playbooks.',
    credentials: 'Ph.D. Applied Cognitive Psychology • Forensic Researcher',
    badge: 'Deception Forensics',
    accentColor: '#3B82F6',
    image: '/images/thepeoplelanguage/avatar_detective.jpg'
  },
  {
    name: 'Arjun Ramanathan, M.Sc.',
    role: 'Conversational Sociologist & Behavioral Linguist',
    focus: 'Author of Vol. I (The Charmer)',
    bio: 'Researcher in autonomic rapport, vocal tone calibration, and conversational velvet. Trains professionals and founders to overcome social friction and command effortless warmth.',
    credentials: 'M.Sc. Sociolinguistics • Corporate Dynamics Consultant',
    badge: 'Charisma Dynamics',
    accentColor: '#F59E0B',
    image: '/images/thepeoplelanguage/avatar_charmer.jpg'
  },
  {
    name: 'Attachment Dynamics Lab',
    role: 'Interpersonal Polarity & Relational Psychologists',
    focus: 'Curators of Vol. V (The Heart Reader & Siya Engine)',
    bio: 'A multidisciplinary research collective dedicated to modern dating subtext, emotional gravity, and attachment psychology—curating the tactical scripts for Siya.',
    credentials: 'Attachment Theory & Subconscious Polarity Lab',
    badge: 'Romantic Dynamics',
    accentColor: '#F43F5E',
    image: '/images/thepeoplelanguage/avatar_heart_reader.jpg'
  }
];

export default function AuthorshipSection() {
  return (
    <section id="authors" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#04060c] text-white border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header - Editorial Prestige */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-amber-300 text-xs font-mono tracking-wider uppercase">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Authorship & Editorial Board</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Authored by Practicing Strategists, Not Anonymous Prompts
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Every chapter of the PeopleReading Series is human-researched, human-authored, and stress-tested across live corporate mediations, interviews, and real-world relationship dynamics.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Human-Curated Curriculum</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>40+ Years of Combined Domain Practice</span>
            </span>
          </div>
        </div>

        {/* Authors Grid - Pro Coder Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {AUTHORS.map((author, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-2xl bg-[#090d18]/80 border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              {/* Subtle top hairline */}
              <div
                className="absolute top-0 inset-x-0 h-px opacity-40 transition-opacity group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent, ${author.accentColor}, transparent)`
                }}
              />

              <div className="space-y-4">
                
                {/* Author Card Top */}
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border border-white/15 shrink-0 shadow-lg bg-black">
                    <Image
                      src={author.image}
                      alt={author.name}
                      fill
                      className="object-cover"
                      sizes="72px"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: author.accentColor }}
                      />
                      <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-400">
                        {author.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white">{author.name}</h3>
                    <p className="text-xs text-zinc-400 font-medium">{author.role}</p>
                  </div>
                </div>

                {/* Focus Scope */}
                <div className="text-xs text-amber-300/90 font-mono pl-3 border-l-2 border-amber-400/30">
                  {author.focus}
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {author.bio}
                </p>
              </div>

              {/* Credentials Footer */}
              <div className="pt-4 mt-5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-500">
                <span className="truncate pr-2">{author.credentials}</span>
                <span className="text-emerald-400 font-semibold shrink-0">Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Practice Engine Clarification Banner */}
        <div className="mt-14 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#0d1222] via-[#080b14] to-[#05070d] border border-white/[0.08] text-xs sm:text-sm text-zinc-300 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            <strong className="text-white font-semibold">How the 5 Interactive Companions Work:</strong> The 5 companion personas (The Charmer, Negotiator, Detective, Leader, Siya) are designed as real-time scenario sparring partners. They provide readers with an interactive sandbox to test and internalize the books&apos; frameworks before applying them in real high-stakes environments.
          </p>
        </div>

      </div>
    </section>
  );
}
