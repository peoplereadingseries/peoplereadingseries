'use client';
import React from 'react';
import Image from 'next/image';
import { Users, Star, Target, BarChart2, Infinity as InfinityIcon } from 'lucide-react';

export default function ThePeopleLanguageStats() {
  const STATS = [
    {
      icon: Users,
      value: '50K+',
      label: 'Happy Learners',
      color: 'text-amber-400'
    },
    {
      icon: Star,
      value: '4.8/5',
      label: 'Average Rating',
      color: 'text-yellow-400'
    },
    {
      icon: Target,
      value: '5',
      label: 'Unique Personas',
      color: 'text-sky-400'
    },
    {
      icon: BarChart2,
      value: '20+',
      label: 'Interactive Modules',
      color: 'text-emerald-400'
    },
    {
      icon: InfinityIcon,
      value: 'A Lifetime',
      label: 'of Better Conversations',
      color: 'text-purple-400'
    }
  ];

  return (
    <section className="relative bg-[#070B14] border-y border-white/10 text-white overflow-hidden py-6 sm:py-7">
      
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-blue-500/5 to-purple-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Stats Items */}
          <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 flex-1">
            {STATS.map((stat, i) => {
              const IconComp = stat.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-white/5 border border-white/10 shrink-0 ${stat.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-black text-lg sm:text-xl text-white tracking-tight leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-xs text-zinc-400 font-medium mt-0.5 whitespace-nowrap">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Silhouette Mountain Peak Graphic */}
          <div className="hidden lg:flex items-center shrink-0 opacity-80 hover:opacity-100 transition-opacity">
            <div className="relative w-28 h-10 overflow-hidden">
              <Image
                src="/images/peoplereadingseries/mountain_stats_bg.jpg"
                alt="Summit achievement"
                fill
                className="object-contain object-right"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
