'use client';

import React, { useState } from 'react';
import { ViewProps, Language, translations, AnalysisResult } from './types';
import { analyzeCharacter } from './geminiService';
import { ChevronLeft, Loader2, Copy, CheckCircle, UserCheck, Shirt, Zap as EnergyIcon, Globe, MessageCircle } from 'lucide-react';

interface CharacterRevealerProps extends ViewProps {
  onNewResult: (text: string) => void;
}

const CharacterRevealer: React.FC<CharacterRevealerProps> = ({ onBack, language, onNewResult }) => {
  const t = translations[language] || translations[Language.ENGLISH];
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [selections, setSelections] = useState({
    style: t.charRevealer?.options?.style?.[0] || 'Casual/Simple',
    energy: t.charRevealer?.options?.energy?.[0] || 'Deep Introvert',
    vibe: t.charRevealer?.options?.vibe?.[0] || 'Modern/Global',
    demeanor: t.charRevealer?.options?.demeanor?.[0] || 'Silent/Observant'
  });

  const handleReveal = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await analyzeCharacter(selections, language);
      setResult(res);
      onNewResult(`${res.analysis}. My strategy for you is: ${res.recommendation}`);
    } catch (err) {
      alert("Reveal failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderCategory = (key: keyof typeof selections, icon: React.ReactNode, label: string, options: string[]) => (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
        {icon} {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setSelections({ ...selections, [key]: option })}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              selections[key] === option 
                ? 'bg-indigo-500 border-indigo-500 text-white shadow-md scale-105' 
                : 'bg-white border-gray-100 text-gray-500 hover:border-indigo-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto w-full py-2 animate-in slide-in-from-right duration-300">
      <button onClick={onBack} className="flex items-center gap-1.5 text-white/70 hover:text-white mb-6 font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit">
        <ChevronLeft className="w-4 h-4" /> {t.home}
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500 rounded-xl text-white shadow-md">
            <UserCheck className="w-6 h-6" />
          </div>
          {t.charRevealer?.title}
        </h2>
        <p className="text-xs text-white/60 mt-1">{t.charRevealer?.desc}</p>
      </div>

      <div className="space-y-8 mb-8">
        {renderCategory('style', <Shirt className="w-3 h-3" />, t.charRevealer?.categories?.style, t.charRevealer?.options?.style || [])}
        {renderCategory('energy', <EnergyIcon className="w-3 h-3" />, t.charRevealer?.categories?.energy, t.charRevealer?.options?.energy || [])}
        {renderCategory('vibe', <Globe className="w-3 h-3" />, t.charRevealer?.categories?.vibe, t.charRevealer?.options?.vibe || [])}
        {renderCategory('demeanor', <MessageCircle className="w-3 h-3" />, t.charRevealer?.categories?.demeanor, t.charRevealer?.options?.demeanor || [])}
      </div>

      <button
        onClick={handleReveal}
        disabled={loading}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 active:scale-95 transition-transform cursor-pointer"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t.charRevealer?.button}
      </button>

      {result && (
        <div className="mt-10 space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
          <div className="p-6 rounded-3xl bg-white shadow-xl border-t-8 border-indigo-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <UserCheck className="w-24 h-24" />
            </div>
            <h3 className="font-black text-2xl text-gray-900 mb-2">{result.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-6 font-medium">
              {result.analysis}
            </p>
            <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
              <h4 className="text-[10px] font-black text-indigo-600 uppercase mb-2 tracking-widest">How to Connect</h4>
              <p className="text-sm text-gray-900 font-bold leading-snug">{result.recommendation}</p>
            </div>
          </div>

          {result.scripts && result.scripts.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-gray-400 uppercase px-1 tracking-widest">Best Openers</h4>
              {result.scripts.map((script, idx) => (
                <div key={idx} className="bg-white border p-4 rounded-xl flex items-center justify-between gap-4 group shadow-sm">
                  <p className="text-sm text-gray-800 font-bold italic">"{script}"</p>
                  <button 
                    onClick={() => copyToClipboard(script, idx)}
                    className="p-2 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer"
                  >
                    {copiedIndex === idx ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterRevealer;
