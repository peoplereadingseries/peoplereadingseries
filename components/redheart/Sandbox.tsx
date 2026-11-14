'use client';

import React, { useState } from 'react';
import { ViewProps, Language, translations, ToolType } from './types';
import { recalibrateEnergy } from './geminiService';
import { ChevronLeft, Send, Sparkles, Loader2, Quote } from 'lucide-react';

interface SandboxProps extends ViewProps {
  onNewResult: (text: string) => void;
}

const Sandbox: React.FC<SandboxProps> = ({ onBack, language, onNewResult }) => {
  const [vent, setVent] = useState('');
  const [loading, setLoading] = useState(false);
  const [recalibration, setRecalibration] = useState<{ calmText: string; advice: string } | null>(null);
  
  const t = translations[language] || translations[Language.ENGLISH];

  const handleRecalibrate = async () => {
    if (!vent.trim()) return;
    setLoading(true);
    setRecalibration(null);
    try {
      const res = await recalibrateEnergy(vent, language);
      setRecalibration(res);
      onNewResult(`${res.advice}. Try this instead: ${res.calmText}`);
    } catch (err) {
      alert("Error recalibrating.");
    } finally {
      setLoading(false);
    }
  };

  const selectStarter = (starter: string) => {
    setVent(starter);
  };

  return (
    <div className="max-w-4xl mx-auto w-full py-2 animate-in fade-in duration-300">
      <button onClick={onBack} className="flex items-center gap-1.5 text-white/70 hover:text-white mb-6 font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit">
        <ChevronLeft className="w-4 h-4" /> {t.home}
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-black text-white flex items-center gap-2 transition-all">
          <Sparkles className="text-amber-500" /> {t.sandboxTitle}
        </h2>
        <p className="text-xs text-white/60 mt-1">{t.sandboxDesc}</p>
      </div>

      <div className="space-y-4">
        <textarea
          value={vent}
          onChange={(e) => setVent(e.target.value)}
          placeholder={t.sandboxPlaceholder}
          className="w-full h-48 p-6 rounded-3xl border-none bg-white shadow-inner focus:ring-2 focus:ring-amber-400 outline-none transition-all text-sm italic text-gray-900 font-bold"
        />

        {/* Quick Starters for Sandbox */}
        <div className="space-y-2 overflow-hidden">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> {t.quickStarters}
          </p>
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide no-scrollbar -mx-1 px-1">
            {t.prompts[ToolType.SANDBOX]?.map((starter, i) => (
              <button
                key={i}
                onClick={() => selectStarter(starter)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white border border-amber-50 text-[11px] font-bold text-amber-600 shadow-sm active:bg-amber-500 active:text-white transition-all hover:border-amber-200 cursor-pointer"
              >
                {starter}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleRecalibrate}
          disabled={loading || !vent.trim()}
          className="w-full py-4 rounded-2xl bg-amber-500 text-white font-black flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 active:scale-95 transition-transform cursor-pointer"
        >
          {loading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /></>
          ) : (
            <><Send className="w-4 h-4" /> {t.sandboxButton}</>
          )}
        </button>
      </div>

      {recalibration && (
        <div className="mt-8 space-y-4 animate-in slide-in-from-bottom duration-500">
          <div className="bg-white p-6 rounded-3xl shadow-lg relative overflow-hidden border border-amber-100">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Quote className="w-16 h-16" />
            </div>
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Steady Guide</h4>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed mb-6 font-bold italic">
              "{recalibration.advice}"
            </p>
            
            <div className="border-t border-amber-50 pt-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">New Energy Script:</h4>
              <div className="bg-amber-50/50 p-4 rounded-xl text-gray-900 text-sm font-black border border-amber-100">
                "{recalibration.calmText}"
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sandbox;
