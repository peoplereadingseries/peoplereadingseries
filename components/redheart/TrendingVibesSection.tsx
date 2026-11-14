'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Language, ToolType, TrendingVibePattern, translations } from './types';
import {
  TrendingUp,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ArrowRight,
  Volume2,
  Flame,
  Calendar,
  Compass,
  Zap,
  Info
} from 'lucide-react';

const VibeSphere3D = dynamic(
  () => import('./VibeSphere3D').then((mod) => mod.VibeSphere3D),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 rounded-3xl bg-gradient-to-b from-gray-950 via-slate-900 to-pink-950/70 border border-pink-500/20 flex flex-col items-center justify-center text-pink-300 gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-pink-500 border-t-transparent animate-spin" />
        <span className="text-xs font-semibold">Initializing 3D Vibe Core...</span>
      </div>
    )
  }
);

interface TrendingVibesSectionProps {
  language: Language;
  onSelectToolWithPrompt: (tool: ToolType, prompt: string) => void;
  onSpeakText?: (text: string) => void;
  isSpeakingAudio?: boolean;
}

export const TrendingVibesSection: React.FC<TrendingVibesSectionProps> = ({
  language,
  onSelectToolWithPrompt,
  onSpeakText,
  isSpeakingAudio = false
}) => {
  const t = translations[language] || translations[Language.ENGLISH];
  const patterns = t.trendingPatterns || [];

  const [activePatternId, setActivePatternId] = useState<string>(patterns[0]?.id || 'micro-echo');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(patterns[0]?.id || 'micro-echo');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [show3dVisualizer, setShow3dVisualizer] = useState<boolean>(true);

  const activePattern = patterns.find((p) => p.id === activePatternId) || patterns[0];

  const handleCopyScript = (script: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(script);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleListenAdvice = (pattern: TrendingVibePattern, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSpeakText) {
      const speech = `${pattern.name}. ${pattern.microCue}. Siya's seasonal advice: ${pattern.seasonalAdvice}. Pro script: ${pattern.suggestedScript}`;
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
          bgLight: 'bg-rose-50/60',
          glow: 'shadow-rose-100',
          accentText: 'text-rose-600',
          cardGradient: 'from-rose-50/90 via-white to-pink-50/50'
        };
      case 'purple':
        return {
          border: 'border-purple-200 hover:border-purple-300',
          badge: 'bg-purple-100 text-purple-700',
          button: 'bg-purple-600 hover:bg-purple-700 text-white',
          bgLight: 'bg-purple-50/60',
          glow: 'shadow-purple-100',
          accentText: 'text-purple-600',
          cardGradient: 'from-purple-50/90 via-white to-indigo-50/50'
        };
      case 'amber':
      default:
        return {
          border: 'border-amber-200 hover:border-amber-300',
          badge: 'bg-amber-100 text-amber-800',
          button: 'bg-amber-500 hover:bg-amber-600 text-white',
          bgLight: 'bg-amber-50/60',
          glow: 'shadow-amber-100',
          accentText: 'text-amber-600',
          cardGradient: 'from-amber-50/90 via-white to-orange-50/50'
        };
    }
  };

  return (
    <div className="mt-8 mb-4">
      {/* Section Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-500/10 via-pink-500/10 to-purple-500/10 border border-pink-200 text-pink-700 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            {t.trendingBadge}
          </div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight">
            {t.trendingSectionTitle}
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            {t.trendingSectionSubtitle}
          </p>
        </div>
      </div>

      {/* 3D Interactive Vibe Radar Canvas */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-pink-600" />
            {t.view3dRadar}
          </span>
          <button
            type="button"
            onClick={() => setShow3dVisualizer(!show3dVisualizer)}
            className="text-[11px] font-semibold text-pink-600 hover:text-pink-700 underline cursor-pointer"
          >
            {show3dVisualizer ? 'Collapse 3D' : 'Show 3D Core'}
          </button>
        </div>

        {show3dVisualizer && (
          <div className="relative">
            <VibeSphere3D
              activeVibeColor={0xf43f5e}
              activeVibeId="micro-echo"
            />
          </div>
        )}
      </div>

      {/* Trending Vibe Cards Grid with 3D Depth */}
      <div className="space-y-4">
        {patterns.map((pattern) => {
          const isExpanded = expandedCardId === pattern.id;
          const isSelected = activePatternId === pattern.id;
          const theme = getThemeClasses(pattern.accentColor);

          return (
            <div
              key={pattern.id}
              onClick={() => {
                setActivePatternId(pattern.id);
                setExpandedCardId(isExpanded ? null : pattern.id);
              }}
              style={{
                perspective: '1000px'
              }}
              className={`rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                isSelected
                  ? `ring-2 ring-pink-500/60 shadow-lg ${theme.glow}`
                  : 'hover:shadow-md border-gray-200 bg-white'
              } ${isExpanded ? `bg-gradient-to-br ${theme.cardGradient}` : 'bg-white'}`}
            >
              {/* Card Summary Header */}
              <div className="p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-black flex items-center justify-center shadow-sm">
                      #{pattern.rank}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.badge}`}>
                      {pattern.badge}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-red-500" />
                    {pattern.trendMetric}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-base text-gray-900 leading-snug">
                      {pattern.name}
                    </h4>
                    <p className={`text-xs font-semibold ${theme.accentText} mt-0.5`}>
                      {pattern.archetype}
                    </p>
                  </div>
                  <div className="text-gray-400 p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Quick teaser quote */}
                {!isExpanded && (
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2 italic bg-white/70 p-2 rounded-xl border border-gray-100">
                    "{pattern.microCue}"
                  </p>
                )}
              </div>

              {/* Expanded Behavioral Intelligence Deep Dive */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-3.5 border-t border-gray-100/80 animate-in fade-in duration-200 text-xs text-gray-700">
                  {/* Micro-Cue */}
                  <div className="bg-white/90 p-3 rounded-xl border border-gray-100 shadow-sm">
                    <span className="font-bold text-[11px] text-gray-800 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      {t.microCueLabel}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{pattern.microCue}</p>
                  </div>

                  {/* Subconscious Reality */}
                  <div className="bg-white/90 p-3 rounded-xl border border-gray-100 shadow-sm">
                    <span className="font-bold text-[11px] text-gray-800 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                      {t.subconsciousLabel}
                    </span>
                    <p className="text-gray-700 leading-relaxed italic">{pattern.subconsciousReality}</p>
                  </div>

                  {/* Historical Science & Seasonal Advice */}
                  <div className="grid grid-cols-1 gap-2.5">
                    <div className="bg-white/80 p-3 rounded-xl border border-gray-100 shadow-sm">
                      <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                        <Info className="w-3 h-3 text-blue-500" />
                        {t.historicalBaseLabel}
                      </span>
                      <p className="text-gray-600 text-[11px] leading-relaxed">
                        {pattern.historicalContext}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 p-3 rounded-xl border border-pink-200/60">
                      <span className="font-bold text-[10px] text-pink-800 uppercase tracking-wider block mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-pink-600" />
                        {t.seasonalTipLabel}
                      </span>
                      <p className="text-pink-900 font-medium text-[11px] leading-relaxed">
                        {pattern.seasonalAdvice}
                      </p>
                    </div>
                  </div>

                  {/* Action Step & Copyable Script */}
                  <div className="bg-white p-3.5 rounded-xl border border-pink-200 shadow-sm">
                    <span className="font-bold text-[11px] text-gray-900 block mb-1">
                      {t.tacticalMoveLabel}: <span className="font-normal text-gray-600">{pattern.actionStep}</span>
                    </span>

                    <div className="mt-2 relative p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 font-mono text-[11px] flex items-center justify-between gap-2">
                      <span className="select-all break-words">{pattern.suggestedScript}</span>
                      <button
                        type="button"
                        onClick={(e) => handleCopyScript(pattern.suggestedScript, pattern.id, e)}
                        className="shrink-0 p-1.5 rounded-md hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
                        title={t.copyScriptLabel}
                      >
                        {copiedId === pattern.id ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {copiedId === pattern.id && (
                      <p className="text-[10px] text-green-600 font-bold mt-1 text-right">
                        {t.copiedLabel}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons: Listen to Siya & Test in Tool */}
                  <div className="flex items-center gap-2 pt-1">
                    {onSpeakText && (
                      <button
                        type="button"
                        onClick={(e) => handleListenAdvice(pattern, e)}
                        className="flex-1 py-2 px-3 rounded-xl bg-white border border-gray-200 hover:border-pink-300 text-gray-700 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-pink-600" />
                        <span>{t.listenToSiyaLabel}</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectToolWithPrompt(pattern.recommendedTool, pattern.starterPrompt);
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer ${theme.button}`}
                    >
                      <span>{t.testInToolLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
