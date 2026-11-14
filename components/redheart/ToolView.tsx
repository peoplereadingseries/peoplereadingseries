'use client';

import React, { useState } from 'react';
import { ToolType, Language, AnalysisResult, translations } from './types';
import { analyzeInteraction } from './geminiService';
import { ChevronLeft, Loader2, Copy, CheckCircle, Zap, Sparkles } from 'lucide-react';

interface ToolViewProps {
  tool: ToolType;
  onBack: () => void;
  language: Language;
  icon: React.ReactNode;
  onNewResult: (text: string) => void;
  initialInput?: string;
}

const ToolView: React.FC<ToolViewProps> = ({ tool, onBack, language, icon, onNewResult, initialInput = '' }) => {
  const [input, setInput] = useState(initialInput);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const t = translations[language] || translations[Language.ENGLISH];

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await analyzeInteraction(tool, input, language);
      setResult(res);
      onNewResult(`${res.analysis}. My advice is: ${res.recommendation}`);
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const selectStarter = (starter: string) => {
    setInput(starter);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getVibeColor = (vibe: AnalysisResult['vibe']) => {
    switch (vibe) {
      case 'positive': return 'text-green-500 bg-green-50';
      case 'caution': return 'text-amber-500 bg-amber-50';
      case 'negative': return 'text-red-500 bg-red-50';
      default: return 'text-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full py-2 animate-in slide-in-from-right duration-300">
      <button onClick={onBack} className="flex items-center gap-1.5 text-white/70 hover:text-white mb-6 font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit">
        <ChevronLeft className="w-4 h-4" /> {t.home}
      </button>

      <div className="flex items-center gap-3.5 mb-6">
        <div className="w-12 h-12 bg-white shadow-md rounded-2xl flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-black text-white">{t.tools[tool]?.title}</h2>
          <p className="text-xs text-white/60">{t.tools[tool]?.desc}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-white/80">{t.inputLabel}</label>
          </div>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.inputPlaceholder}
            className="w-full h-32 p-4 rounded-2xl border border-gray-100 bg-white shadow-inner focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none text-sm text-gray-900 font-bold"
          />
        </div>

        {/* Quick Start Chips */}
        <div className="space-y-2 overflow-hidden">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-red-400" /> {t.quickStarters}
          </p>
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide no-scrollbar -mx-1 px-1">
            {t.prompts[tool]?.map((starter, i) => (
              <button
                key={i}
                onClick={() => selectStarter(starter)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white border border-red-50 text-[11px] font-bold text-red-500 shadow-sm active:bg-red-500 active:text-white transition-all hover:border-red-200 cursor-pointer"
              >
                {starter}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading || !input.trim()}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-black flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 active:scale-95 transition-transform cursor-pointer"
        >
          {loading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /></>
          ) : (
            t.decodeButton
          )}
        </button>
      </div>

      {result && (
        <div className="mt-10 space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
          <div className="p-5 rounded-2xl bg-white border-l-4 border-red-500 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-gray-900">{result.title}</h3>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${getVibeColor(result.vibe)}`}>
                {result.vibe}
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-4 font-medium">
              {result.analysis}
            </p>
            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
              <h4 className="text-[10px] font-black text-red-600 uppercase mb-1 tracking-widest">Siya's Word</h4>
              <p className="text-sm text-gray-900 font-bold">{result.recommendation}</p>
            </div>
          </div>

          {result.scripts && result.scripts.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-gray-400 uppercase px-1 tracking-widest">Magic Buttons</h4>
              {result.scripts.map((script, idx) => (
                <div key={idx} className="bg-white border p-4 rounded-xl flex items-center justify-between gap-4 group hover:border-red-200 transition-colors shadow-sm">
                  <p className="text-sm text-gray-800 font-bold italic">"{script}"</p>
                  <button 
                    onClick={() => copyToClipboard(script, idx)}
                    className="p-2 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    {copiedIndex === idx ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="text-[10px] text-gray-400 font-bold italic px-1 flex items-center gap-2">
            <Zap className="w-3 h-3" />
            Social Dynamics: {result.scientificBase}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolView;
