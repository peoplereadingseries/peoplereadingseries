'use client';
import React from 'react';
import { X, Play, CheckCircle2, Film } from 'lucide-react';

export default function ThePeopleLanguageVideoModal({ isOpen, onClose, onStartJourney }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0C1220] border border-white/20 rounded-3xl overflow-hidden shadow-2xl text-white">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-[#F59E0B] flex items-center justify-center">
              <Play className="w-4 h-4 fill-[#F59E0B]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">PeopleReadingSeries • 1-Min Overview</h3>
              <p className="text-[11px] text-zinc-400">How 5 Personas Transform Your Daily Human Dynamics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Simulation / Player Container */}
        <div className="relative aspect-video bg-black flex flex-col items-center justify-center p-6 text-center overflow-hidden">
          {/* Subtle grid and ambient backlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-blue-500/10 to-purple-500/20" />

          <div className="relative z-10 space-y-4 max-w-md">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 type-eyebrow font-mono">
              <Film className="w-3.5 h-3.5" strokeWidth={2} />
              <span>Platform Tour (60 seconds)</span>
            </div>

            <h4 className="type-h3 font-extrabold text-white">
              5 Personas. 1 Lifelong Superpower.
            </h4>

            <p className="type-body-sm text-zinc-300 leading-relaxed">
              From breaking the ice at parties to closing high-stakes boardroom deals, spotting hidden motives, leading teams, and decoding romantic signals.
            </p>

            <div className="flex justify-center pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (onStartJourney) onStartJourney();
                }}
                className="px-6 py-2.5 rounded-full bg-[#F59E0B] hover:bg-amber-400 text-black type-body-sm font-bold shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                Start Exploring Now
              </button>
            </div>
          </div>
        </div>

        {/* Footer highlights */}
        <div className="px-5 py-3.5 bg-[#080D1A] border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[11px] text-zinc-400">
          <span className="flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Zero Theoretical Fluff
          </span>
          <span className="flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Built with 5 Mentors
          </span>
          <span className="flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            100% Practical Mastery
          </span>
        </div>

      </div>
    </div>
  );
}
