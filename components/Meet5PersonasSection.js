'use client';
import React from 'react';
import Image from 'next/image';
import {
  Crown,
  Handshake,
  Search,
  Users,
  Heart,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { BOOKS_DATA } from '../lib/booksData';

export default function Meet5PersonasSection({ onSelectPersona }) {
  const PERSONA_CARDS = [
    {
      id: 'the-charmer',
      title: 'The Charmer',
      subtitle: 'Master Social Situations',
      hookTag: '⚡ Instant Social Magnetism',
      desc: 'Never feel awkward or invisible again. The 3-Second Warmth Signal and conversational velvet pivot make anyone feel instantly drawn to you in any room.',
      price: '₹399',
      originalPrice: '₹799',
      avatar: '/images/peoplereadingseries/avatar_charmer_v3.jpg',
      icon: Crown,
      iconColor: '#F59E0B',
      cardBg: 'bg-gradient-to-br from-[#271909] via-[#1D1205] to-[#100A03]',
      borderColor: 'border-amber-500/35 hover:border-amber-400',
      btnClass: 'bg-[#F59E0B] hover:bg-amber-400 text-black',
      book: BOOKS_DATA.find((b) => b.id === 'the-charmer')
    },
    {
      id: 'the-negotiator',
      title: 'The Negotiator',
      subtitle: 'Excel in Business & Sales',
      hookTag: '💼 Close 25-40% Higher Deals',
      desc: 'Stop leaving money on the table. Use FBI-grade calibrated questions and tactical silence to make tough counterparties gladly accept your terms.',
      price: '₹449',
      originalPrice: '₹899',
      avatar: '/images/peoplereadingseries/avatar_negotiator_v3.jpg',
      icon: Handshake,
      iconColor: '#3B82F6',
      cardBg: 'bg-gradient-to-br from-[#0B1E38] via-[#071527] to-[#040A14]',
      borderColor: 'border-blue-500/35 hover:border-blue-400',
      btnClass: 'bg-[#2563EB] hover:bg-blue-600 text-white',
      book: BOOKS_DATA.find((b) => b.id === 'the-negotiator')
    },
    {
      id: 'the-detective',
      title: 'The Detective',
      subtitle: 'Detect Lies & Hidden Motives',
      hookTag: '🔍 Spot Lies in 2 Minutes',
      desc: 'See through false promises. Spot the 1/25th-second facial micro-twitches, throat swallows, and pronoun evasions that expose hidden agendas.',
      price: '₹449',
      originalPrice: '₹899',
      avatar: '/images/peoplereadingseries/avatar_detective_v3.jpg',
      icon: Search,
      iconColor: '#8B5CF6',
      cardBg: 'bg-gradient-to-br from-[#24133A] via-[#190D2A] to-[#0D0616]',
      borderColor: 'border-purple-500/35 hover:border-purple-400',
      btnClass: 'bg-[#7C3AED] hover:bg-purple-600 text-white',
      book: BOOKS_DATA.find((b) => b.id === 'the-detective')
    },
    {
      id: 'the-leader',
      title: 'The Leader',
      subtitle: 'Influence & Inspire Teams',
      hookTag: '👑 Inspire Radical Loyalty',
      desc: 'Command executive presence without barking orders. Master the Commander\'s Intent framework to eliminate micromanagement and command rooms with calm authority.',
      price: '₹499',
      originalPrice: '₹999',
      avatar: '/images/peoplereadingseries/avatar_leader_v3.jpg',
      icon: Users,
      iconColor: '#10B981',
      cardBg: 'bg-gradient-to-br from-[#082924] via-[#051C18] to-[#020E0C]',
      borderColor: 'border-teal-500/35 hover:border-teal-400',
      btnClass: 'bg-[#0D9488] hover:bg-teal-600 text-white',
      book: BOOKS_DATA.find((b) => b.id === 'the-leader')
    },
    {
      id: 'the-heart-reader',
      title: 'The Heart Reader',
      subtitle: 'Improve Dating & Relations',
      hookTag: '🤍 Decode Mixed Signals',
      desc: 'Decode late texts, cold silences, and hot-and-cold games. The Anti-Gravity principle eliminates needy friction and reignites deep magnetic attraction.',
      price: '₹399',
      originalPrice: '₹799',
      avatar: '/images/peoplereadingseries/avatar_heart_reader_v3.jpg',
      icon: Heart,
      iconColor: '#F43F5E',
      cardBg: 'bg-gradient-to-br from-[#330D1B] via-[#230813] to-[#120309]',
      borderColor: 'border-rose-500/35 hover:border-rose-400',
      btnClass: 'bg-[#E11D48] hover:bg-rose-600 text-white',
      book: BOOKS_DATA.find((b) => b.id === 'the-heart-reader')
    }
  ];

  return (
    <section id="personas" className="pt-14 sm:pt-20 pb-16 sm:pb-24 bg-[#F8F9FA] text-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-black uppercase tracking-[0.22em] text-[#C27803] block">
              MEET THE 5 PERSONAS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              Choose Your Path. Build Your Skills.
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              Each persona is an interactive psychological mentor and field guide designed to give you unfair advantages in conversations, negotiations, and relationships.
            </p>
          </div>

          {/* Authentic Handwritten Badge */}
          <div className="shrink-0 md:self-center">
            <span
              className="inline-block font-handwriting text-2xl sm:text-3xl text-zinc-700 font-bold -rotate-6 select-none"
              style={{ fontFamily: 'var(--font-handwriting), Caveat, cursive' }}
            >
              Same You. Smarter Skills.
            </span>
          </div>
        </div>

        {/* 5 Persona Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {PERSONA_CARDS.map((persona) => {
            const IconComponent = persona.icon;

            return (
              <div
                key={persona.id}
                onClick={() => onSelectPersona && onSelectPersona(persona.book)}
                className={`group rounded-2xl sm:rounded-3xl border ${persona.borderColor} ${persona.cardBg} p-3.5 sm:p-4 text-white flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer relative overflow-hidden`}
              >
                <div>
                  {/* Top: Avatar + Title & Icon */}
                  <div className="flex items-start gap-3 mb-2.5">
                    {/* Character Avatar */}
                    <div className="relative w-14 h-16 sm:w-16 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-white/20 shadow-md">
                      <Image
                        src={persona.avatar}
                        alt={persona.title}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="70px"
                      />
                    </div>

                    {/* Title + Tagline */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <IconComponent
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: persona.iconColor }}
                        />
                        <h3 className="font-extrabold text-xs sm:text-sm text-white truncate">
                          {persona.title}
                        </h3>
                      </div>
                      <span
                        className="text-[10px] sm:text-[11px] font-semibold leading-tight line-clamp-1"
                        style={{ color: persona.iconColor }}
                      >
                        {persona.subtitle}
                      </span>
                      {persona.book?.authorName && (
                        <span className="text-[9.5px] font-mono text-zinc-400 block truncate mt-0.5">
                          By {persona.book.authorName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Value Hook Tag */}
                  <div className="mb-2">
                    <span
                      className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${persona.iconColor}20`,
                        color: persona.iconColor,
                        border: `1px solid ${persona.iconColor}40`
                      }}
                    >
                      {persona.hookTag}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed font-normal mb-3">
                    {persona.desc}
                  </p>
                </div>

                {/* Bottom CTA Button & Price */}
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">Playbook + Companion:</span>
                    <span className="font-extrabold text-white">
                      {persona.price} <span className="text-zinc-500 line-through text-[10px]">{persona.originalPrice}</span>
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectPersona) onSelectPersona(persona.book);
                    }}
                    className={`w-full py-1.5 sm:py-2 px-3 rounded-full text-xs font-black flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer ${persona.btnClass}`}
                  >
                    <span>Explore & Let&apos;s Talk</span>
                    <ArrowRight className="w-3 h-3 stroke-[3]" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
