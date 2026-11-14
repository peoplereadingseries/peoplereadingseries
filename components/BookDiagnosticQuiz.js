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
      // Calculate top book
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
    <section id="quiz" className="py-24 px-4 relative overflow-hidden bg-[#09090c] border-y border-white/10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Section Header with Exact Font Scale */}
        <div className="text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4 backdrop-blur-md">
            <ScanSearch className="w-3.5 h-3.5 text-amber-400" strokeWidth={2} />
            <span className="type-eyebrow font-mono text-amber-300">Targeted Diagnostic Assessment</span>
          </div>

          <h2 className="type-h2 text-white max-w-xl mx-auto text-balance">
            Which of the 5 Books Do You Need Most?
          </h2>

          <p className="type-body text-zinc-400 mt-3 max-w-lg mx-auto">
            Answer 3 quick questions to diagnose your immediate psychological bottleneck and reveal your prescription.
          </p>
        </div>

        {/* Quiz Body */}
        {!resultBookId ? (
          <div className="bg-[#101016] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            
            {/* Step Counter */}
            <div className="flex items-center justify-between type-eyebrow font-mono text-zinc-400 mb-6 pb-4 border-b border-white/10">
              <span className="font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" strokeWidth={2} />
                {QUIZ_QUESTIONS[currentStep].title}
              </span>
              <span>STAGE {currentStep + 1} OF {QUIZ_QUESTIONS.length}</span>
            </div>

            {/* Question Title */}
            <h3 className="type-h4 font-bold text-white mb-6">
              {QUIZ_QUESTIONS[currentStep].question}
            </h3>

            {/* Options List with Optical Indicators */}
            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.bookId)}
                  className="w-full text-left p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 text-zinc-200 hover:text-white transition-all type-body-sm font-medium flex items-center justify-between gap-3 group active:scale-[0.99] cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 type-caption font-mono font-bold text-zinc-400 group-hover:text-amber-400 group-hover:border-amber-400/30 flex items-center justify-center shrink-0 transition-colors">
                      {OPTION_LABELS[idx]}
                    </span>
                    <span className="leading-snug">{option.text}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-1 shrink-0" strokeWidth={2} />
                </button>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-7 overflow-hidden">
              <div
                className="bg-amber-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

          </div>
        ) : (
          /* Quiz Result Presentation */
          <div className="bg-[#101016] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.15)] text-center animate-in zoom-in-95 duration-300">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 type-eyebrow font-mono mb-4">
              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
              <span>98% Diagnostic Match Identified</span>
            </div>

            <h3 className="type-h3 font-black text-white">
              Your Prescribed Guide is:
            </h3>

            {/* Matched Book Showcase */}
            {matchedBook && (
              <div className="my-6 flex flex-col md:flex-row items-center justify-center gap-6 p-6 rounded-2xl bg-black/60 border border-white/10 text-left">
                <div className="shrink-0 flex justify-center">
                  <BookCover3D book={matchedBook} size="sm" interactive={false} />
                </div>

                <div className="space-y-3">
                  <span className={`type-caption font-mono font-bold px-2.5 py-0.5 rounded-full border inline-block ${matchedBook.badgeClass}`}>
                    {matchedBook.tagline}
                  </span>
                  <h4 className="type-h3 font-black text-white">
                    {matchedBook.title}
                  </h4>
                  <p className="type-body-sm text-zinc-300 leading-relaxed">
                    {matchedBook.description}
                  </p>
                  <div className="type-caption font-mono text-amber-400 font-bold">
                    Primary Protocol: {matchedBook.keyMasteries[0]}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onSelectBook(matchedBook)}
                      className={`px-6 py-2.5 rounded-xl font-bold type-body-sm shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer ${matchedBook.btnClass}`}
                    >
                      <span>Get {matchedBook.title} (₹{matchedBook.price})</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>

                    <button
                      onClick={handleReset}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white type-caption font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer border border-white/10"
                    >
                      <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} />
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
