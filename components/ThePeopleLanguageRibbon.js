'use client';
import React from 'react';
import {
  BookOpen,
  PlayCircle,
  ClipboardCheck,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export default function ThePeopleLanguageRibbon() {
  const RIBBON_ITEMS = [
    {
      icon: BookOpen,
      iconColor: '#38BDF8',
      iconBg: 'bg-sky-500/15 border-sky-500/30 text-sky-400',
      title: 'Interactive Lessons',
      subtitle: 'Learn core concepts'
    },
    {
      icon: PlayCircle,
      iconColor: '#3B82F6',
      iconBg: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
      title: 'Real-Life Scenarios',
      subtitle: 'Practice with challenges'
    },
    {
      icon: ClipboardCheck,
      iconColor: '#818CF8',
      iconBg: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400',
      title: 'Quizzes & Feedback',
      subtitle: 'Test your understanding'
    },
    {
      icon: TrendingUp,
      iconColor: '#34D399',
      iconBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
      title: 'Track Your Progress',
      subtitle: 'Earn XP & unlock levels'
    },
    {
      icon: UserCheck,
      iconColor: '#C084FC',
      iconBg: 'bg-purple-500/15 border-purple-500/30 text-purple-400',
      title: 'Personalized Journey',
      subtitle: 'Grow at your own pace'
    }
  ];

  return (
    <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10">
      <div className="bg-[#0C1322]/95 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-[0_18px_50px_rgba(0,0,0,0.7)] text-white">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
          {RIBBON_ITEMS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 pt-2.5 sm:pt-0 sm:px-3 first:pt-0 first:pl-0 last:pr-0"
              >
                {/* Icon square */}
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${item.iconBg}`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Text */}
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-xs sm:text-sm text-white truncate">
                    {item.title}
                  </span>
                  <span className="text-[11px] sm:text-xs text-zinc-400 truncate">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
