'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ToolType, Language, TrendingVibePattern, translations } from './types';
import {
  Heart,
  Shield,
  Search,
  BarChart2,
  Zap,
  ArrowRight,
  UserCheck,
  Sparkles,
  Compass,
  Copy,
  Check,
  Volume2,
  Flame
} from 'lucide-react';

const VibeSphere3D = dynamic(
  () => import('./VibeSphere3D').then((mod) => mod.VibeSphere3D),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 md:h-80 lg:h-96 rounded-3xl bg-gradient-to-b from-gray-950 via-slate-900 to-pink-950/70 border border-pink-500/20 flex flex-col items-center justify-center text-pink-300 gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-pink-500 border-t-transparent animate-spin" />
        <span className="text-xs font-semibold">Initializing 3D Vibe Core...</span>
      </div>
    )
  }
);

interface DashboardProps {
  onSelectTool: (tool: ToolType, prompt?: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onSpeakText?: (text: string) => void;
  isSpeakingAudio?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({
  onSelectTool,
  language,
  setLanguage,
  onSpeakText,
  isSpeakingAudio = false
}) => {
  const t = translations[language] || translations[Language.ENGLISH];
  const patterns: TrendingVibePattern[] = t.trendingPatterns || [];

  const [activePatternId, setActivePatternId] = useState<string>(patterns[0]?.id || 'micro-echo');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activePattern = patterns.find((p) => p.id === activePatternId) || patterns[0];

  const handleCopyScript = (script: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(script);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleListenAdvice = (pattern: TrendingVibePattern, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSpeakText) {
      const speech = `${pattern.name}. ${pattern.microCue}. Recommended script: ${pattern.suggestedScript}`;
      onSpeakText(speech);
    }
  };

  const getThemeClasses = (color: string) => {
    switch (color) {
      case 'rose':
        return {
          border: 'border-rose-200 hover:border-rose-300',
          badge: 'bg-rose-100 text-rose-700',
          button: 'bg-rose-500 hover:bg-rose-600 text-white',
          glow: 'shadow-rose-100',
          accentText: 'text-rose-600',
          ring: 'ring-rose-500',
          scriptBg: 'bg-rose-50/70 border-rose-100',
          scriptText: 'text-rose-700',
          scriptBtn: 'hover:bg-rose-200/50 text-rose-700',
          volumeIcon: 'text-rose-600'
        };
      case 'purple':
        return {
          border: 'border-purple-200 hover:border-purple-300',
          badge: 'bg-purple-100 text-purple-700',
          button: 'bg-purple-600 hover:bg-purple-700 text-white',
          glow: 'shadow-purple-100',
          accentText: 'text-purple-600',
          ring: 'ring-purple-500',
          scriptBg: 'bg-purple-50/70 border-purple-100',
          scriptText: 'text-purple-700',
          scriptBtn: 'hover:bg-purple-200/50 text-purple-700',
          volumeIcon: 'text-purple-600'
        };
      case 'amber':
      default:
        return {
          border: 'border-amber-200 hover:border-amber-300',
          badge: 'bg-amber-100 text-amber-800',
          button: 'bg-amber-500 hover:bg-amber-600 text-white',
          glow: 'shadow-amber-100',
          accentText: 'text-amber-600',
          ring: 'ring-amber-500',
          scriptBg: 'bg-amber-50/70 border-amber-100',
          scriptText: 'text-amber-700',
          scriptBtn: 'hover:bg-amber-200/50 text-amber-700',
          volumeIcon: 'text-amber-600'
        };
    }
  };

  const tools = [
    { id: ToolType.CHARACTER_REVEALER, color: "bg-indigo-50/80", border: "border-indigo-100", icon: <UserCheck className="text-indigo-600" /> },
    { id: ToolType.HEART_REVEALER, color: "bg-red-50/80", border: "border-red-100", icon: <Heart className="text-red-500" /> },
    { id: ToolType.GOLDEN_MOVE, color: "bg-purple-50/80", border: "border-purple-100", icon: <Shield className="text-purple-600" /> },
    { id: ToolType.TRANSLATOR, color: "bg-blue-50/80", border: "border-blue-100", icon: <Search className="text-blue-600" /> },
    { id: ToolType.EXPERT_PANEL, color: "bg-indigo-50/80", border: "border-indigo-100", icon: <BarChart2 className="text-indigo-600" /> },
    { id: ToolType.SANDBOX, color: "bg-amber-50/80", border: "border-amber-100", icon: <Zap className="text-amber-500" /> }
  ];

  return (
    <div className="w-full animate-in fade-in duration-500 space-y-10">
      
      {/* 1. FIRST: Siya 3D Vibe Core */}
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Compass className="w-5 h-5 text-pink-500" />
              Siya 3D Vibe Core
            </h2>
            <p className="text-xs md:text-sm text-white/60">
              Interactive WebGL emotional resonance visualizer
            </p>
          </div>
        </div>

        {/* 3D Heart Canvas Component - Locked to signature pink color */}
        <VibeSphere3D
          activeVibeColor={0xf43f5e}
          activeVibeId="micro-echo"
        />
      </div>

      {/* 2. NEXT: Strategic Tools (All 6 Options) */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-red-500" />
            Strategic Tools
          </h2>
          <p className="text-xs md:text-sm text-white/60 mt-0.5">
            Direct tactical instruments for every crush scenario
          </p>
        </div>

        {/* Strategic Tools Grid - 3 cols on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className={`${tool.color} ${tool.border} border p-4 rounded-2xl flex items-center justify-between text-left active:scale-[0.98] transition-all hover:shadow-lg bg-white cursor-pointer group hover:border-gray-200`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0 border border-gray-100 group-hover:scale-105 transition-transform">
                  {tool.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm leading-tight">{t.tools[tool.id]?.title}</h3>
                  <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{t.tools[tool.id]?.desc}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-red-500 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* 3. BOTTOM: The 3 Vibe Boxes (Trimmed to Core Content Only) */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-500" />
            Active Behavioral Vibes
          </h2>
          <p className="text-xs md:text-sm text-white/60 mt-0.5">
            Core crush signals decoded with instant reply scripts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {patterns.map((pattern) => {
            const isSelected = activePatternId === pattern.id;
            const theme = getThemeClasses(pattern.accentColor);

            return (
              <div
                key={pattern.id}
                onClick={() => setActivePatternId(pattern.id)}
                className={`rounded-2xl border p-4.5 md:p-5 flex flex-col justify-between transition-all duration-300 bg-white cursor-pointer ${
                  isSelected
                    ? `ring-2 ${theme.ring} shadow-xl ${theme.glow}`
                    : 'hover:shadow-md border-gray-200'
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-gray-900 text-white text-[10px] font-black flex items-center justify-center shadow-sm shrink-0">
                      #{pattern.rank}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.badge}`}>
                      {pattern.badge}
                    </span>
                  </div>

                  {/* Title & Archetype */}
                  <h3 className="font-extrabold text-base text-gray-900 leading-snug">
                    {pattern.name}
                  </h3>
                  <p className={`text-xs font-semibold ${theme.accentText} mt-0.5 mb-3`}>
                    {pattern.archetype}
                  </p>

                  {/* Main Core Content: Signal */}
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 mb-3 text-xs text-gray-700 leading-relaxed">
                    <span className="font-bold text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
                      Signal
                    </span>
                    {pattern.microCue}
                  </div>

                  {/* Main Core Content: Suggested Script */}
                  <div className={`${theme.scriptBg} p-3 rounded-xl border mb-4 text-xs`}>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`font-bold text-[10px] ${theme.scriptText} uppercase tracking-wider`}>
                        Suggested Script
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleCopyScript(pattern.suggestedScript, pattern.id, e)}
                        className={`p-1 rounded ${theme.scriptBtn} transition-colors cursor-pointer`}
                        title="Copy script"
                      >
                        {copiedId === pattern.id ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <p className="font-medium text-gray-800 italic text-[11px] leading-relaxed">
                      "{pattern.suggestedScript}"
                    </p>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  {onSpeakText && (
                    <button
                      type="button"
                      onClick={(e) => handleListenAdvice(pattern, e)}
                      className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all cursor-pointer"
                      title="Listen to advice"
                    >
                      <Volume2 className={`w-4 h-4 ${theme.volumeIcon}`} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTool(pattern.recommendedTool, pattern.starterPrompt);
                    }}
                    className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer ${theme.button}`}
                  >
                    <span>Test in Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Siya's Daily Vibe Hack Footer Card */}
      <div className="p-5 md:p-6 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 rounded-2xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <h4 className="font-black text-[11px] mb-1 uppercase tracking-wider text-rose-100">
          {t.vibeHackTitle}
        </h4>
        <p className="text-xs md:text-sm opacity-95 italic leading-relaxed">
          "{t.vibeHackText}"
        </p>
      </div>

    </div>
  );
};

export default Dashboard;
