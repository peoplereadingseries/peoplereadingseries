'use client';
import React, { useState } from 'react';
import { Search, X, ArrowRight, Radio, Scale, ScanEye, Compass, Activity, MessageSquare } from 'lucide-react';
import { BOOKS_DATA } from '../lib/booksData';

export default function ThePeopleLanguageSearchModal({ isOpen, onClose, onSelectPersona }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const TOPICS = [
    { title: 'The Charmer • Breaking the Ice & Velvet Pivots', bookId: 'the-charmer', icon: Radio, color: '#F59E0B' },
    { title: 'The Negotiator • Countering Lowballs & Tactical Empathy', bookId: 'the-negotiator', icon: Scale, color: '#3B82F6' },
    { title: 'The Detective • Baseline Deviation & Lie Detection', bookId: 'the-detective', icon: ScanEye, color: '#8B5CF6' },
    { title: 'The Leader • Commander\'s Intent & Gravitas', bookId: 'the-leader', icon: Compass, color: '#10B981' },
    { title: 'The Heart Reader • Decoding Unspoken Signals & Texts', bookId: 'the-heart-reader', icon: Activity, color: '#F43F5E' },
  ];

  const filtered = query.trim()
    ? TOPICS.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
    : TOPICS;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0C1220] border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-white">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-zinc-400" strokeWidth={2} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search personas, skills, tactics (e.g., salary, lie detection, ice breaker)..."
            className="w-full bg-transparent type-body-sm text-white placeholder:text-zinc-500 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Quick Results */}
        <div className="p-3 max-h-80 overflow-y-auto space-y-1">
          <div className="px-3 py-1.5 type-eyebrow font-mono text-zinc-500">
            {query.trim() ? 'Matching Topics & Personas' : 'Popular Explorations'}
          </div>

          {filtered.map((topic, i) => {
            const IconComp = topic.icon;
            const book = BOOKS_DATA.find((b) => b.id === topic.bookId);

            return (
              <button
                key={i}
                onClick={() => {
                  onClose();
                  if (onSelectPersona && book) onSelectPersona(book);
                }}
                className="w-full px-3 py-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-white/10"
                    style={{ color: topic.color, backgroundColor: `${topic.color}15` }}
                  >
                    <IconComp className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <span className="type-body-sm font-semibold text-zinc-200 group-hover:text-white">
                    {topic.title}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 type-caption font-mono font-bold text-zinc-400 group-hover:text-amber-400">
                  <MessageSquare className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>Let&apos;s Talk</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer tip */}
        <div className="px-4 py-2.5 bg-[#080D1A] border-t border-white/5 flex items-center justify-between type-caption font-mono text-zinc-500">
          <span>Trained on peer-reviewed behavioral psychology</span>
          <span>ESC to close</span>
        </div>

      </div>
    </div>
  );
}
