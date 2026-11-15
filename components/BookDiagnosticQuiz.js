'use client';
import React, { useState } from 'react';
import { BOOKS_DATA } from '../lib/booksData';
import BookCover3D from './BookCover3D';
import { ScanSearch, ArrowRight, RotateCcw, CheckCircle2, Target } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    title: 'High-Stakes Situation',
    question: 'Where is your biggest pressure point in life right now?',
    options: [
      { text: 'Social events, parties, or networking where I want to be magnetic and well-liked', bookId: 'the-charmer' },
      { text: 'Boardrooms, salary talks, client deals, or business negotiations', bookId: 'the-negotiator' },
      { text: 'Spotting deception, finding out if someone is hiding the truth from me', bookId: 'the-detective' },
      { text: 'Managing a team, commanding respect, and driving people toward a vision', bookId: 'the-leader' },
      { text: 'Dating, decoding mixed signals from a crush, or improving my romantic relationship', bookId: 'the-heart-reader' }
    ]
  },
  {
    title: 'Interaction Friction',
    question: 'When communication falls apart, what is typically the frustrating root cause?',
    options: [
      { text: 'Small talk feels awkward, I run dry of words, or I feel easily overlooked', bookId: 'the-charmer' },
      { text: 'I cave on price or terms too early just to avoid tense awkwardness', bookId: 'the-negotiator' },
      { text: 'I discover too late that a partner or colleague lied to my face', bookId: 'the-detective' },
      { text: 'My team lacks initiative, ignores directives, or burns out quickly', bookId: 'the-leader' },
      { text: 'I over-analyze texts, feel anxious, and accidentally push people away', bookId: 'the-heart-reader' }
    ]
  },
  {
    title: 'Desired Superpower',
    question: 'If you could download one psychological mastery right now, which would it be?',
    options: [
      { text: 'Unshakable social charisma and the ability to connect with anyone instantly', bookId: 'the-charmer' },
      { text: 'FBI-grade leverage to consistently close deals on my exact terms', bookId: 'the-negotiator' },
      { text: 'Forensic lie detection to spot micro-expressions and hidden agendas', bookId: 'the-detective' },
      { text: 'Executive presence and gravitas to lead high-performing teams through crisis', bookId: 'the-leader' },
      { text: 'Intuitive heart reading to know exactly what a partner feels without asking', bookId: 'the-heart-reader' }
    ]
  }
];

export default function BookDiagnosticQuiz({ onSelectBook }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({
    'the-charmer': 0,
    'the-negotiator': 0,
    'the-detective': 0,
    'the-leader': 0,
    'the-heart-reader': 0
  });
  const [resultBookId, setResultBookId] = useState(null);

  const handleSelectOption = (bookId) => {
    const updatedScores = {
      ...scores,
      [bookId]: (scores[bookId] || 0) + 1
    };
    setScores(updatedScores);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      let bestBook = 'the-charmer';
      let maxScore = -1;
      Object.entries(updatedScores).forEach(([id, score]) => {
        if (score > maxScore) {
          maxScore = score;
          bestBook = id;
        }
      });
      setResultBookId(bestBook);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setScores({
      'the-charmer': 0,
      'the-negotiator': 0,
      'the-detective': 0,
      'the-leader': 0,
      'the-heart-reader': 0
    });
    setResultBookId(null);
  };

  const matchedBook = BOOKS_DATA.find((b) => b.id === resultBookId);
  const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E'];

  return (
    <section id="quiz" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#05070d] border-t border-white/[0.08]">
      {/* Background subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-amber-300 text-xs font-mono tracking-wider uppercase">
            <ScanSearch className="w-3.5 h-3.5 text-amber-400" />
            <span>Persona Assessment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight max-w-xl mx-auto">
            Which of the 5 Volumes Do You Need Most?
          </h2>

          <p className="text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Diagnose your immediate communication friction in 3 quick questions to discover your target curriculum.
          </p>
        </div>

        {/* Quiz Body */}
        {!resultBookId ? (
          <div className="bg-[#090d18]/90 border border-white/[0.08] rounded-2xl p-7 sm:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.7)] relative overflow-hidden">
            
            {/* Top Hairline */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

            {/* Step Counter */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-6 pb-4 border-b border-white/[0.06]">
              <span className="font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                {QUIZ_QUESTIONS[currentStep].title}
              </span>
              <span className="text-zinc-500">STAGE {currentStep + 1} OF {QUIZ_QUESTIONS.length}</span>
            </div>

            {/* Question Title */}
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug">
              {QUIZ_QUESTIONS[currentStep].question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.bookId)}
                  className="w-full text-left p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-amber-400/30 text-zinc-200 hover:text-white transition-all text-xs sm:text-sm font-medium flex items-center justify-between gap-3 group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono font-bold text-zinc-400 group-hover:text-amber-400 group-hover:border-amber-400/30 flex items-center justify-center shrink-0 transition-colors">
                      {OPTION_LABELS[idx]}
                    </span>
                    <span className="leading-relaxed">{option.text}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 transition-transform group-hover:translate-x-1 shrink-0" />
                </button>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/[0.06] h-1 rounded-full mt-7 overflow-hidden">
              <div
                className="bg-amber-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

          </div>
        ) : (
          /* Quiz Result Presentation */
          <div className="bg-[#090d18]/90 border border-white/[0.1] rounded-2xl p-7 sm:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.7)] text-center animate-in zoom-in-95 duration-300 relative overflow-hidden">
            
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono mb-4">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Diagnostic Recommendation Ready</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              Your Prescribed Volume:
            </h3>

            {/* Matched Book Showcase */}
            {matchedBook && (
              <div className="my-6 flex flex-col md:flex-row items-center justify-center gap-6 p-6 rounded-xl bg-black/50 border border-white/[0.08] text-left">
                <div className="shrink-0 flex justify-center">
                  <BookCover3D book={matchedBook} size="sm" interactive={false} />
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono tracking-wider uppercase text-amber-400 font-semibold">
                    {matchedBook.tagline}
                  </span>
                  <h4 className="text-2xl font-black text-white">
                    {matchedBook.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {matchedBook.description}
                  </p>
                  <div className="text-xs font-mono text-amber-400 font-semibold">
                    Primary Protocol: {matchedBook.keyMasteries[0]}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onSelectBook(matchedBook)}
                      className={`px-6 py-3 rounded-xl font-bold text-xs shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer ${matchedBook.btnClass}`}
                    >
                      <span>Get {matchedBook.title} (₹{matchedBook.price})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleReset}
                      className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer border border-white/10"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Assessment</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
