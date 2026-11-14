'use client';
import React from 'react';
import { Star, ShieldCheck, Quote, MessageSquareQuote } from 'lucide-react';

const TESTIMONIALS = [
  {
    book: 'The Charmer',
    themeColor: '#f59e0b',
    quote: 'I used to freeze up at cocktail parties and networking dinners. After practicing Chapter 2 on the Velvet Pivot, I walked into an industry dinner and walked out with two new business partners. The confidence shift is permanent.',
    author: 'Aakash Verma',
    role: 'Founder, NextScale',
    location: 'Bengaluru'
  },
  {
    book: 'The Negotiator',
    themeColor: '#10b981',
    quote: 'The Calibrated Question Matrix alone paid for this entire collection hundreds of times over. Used it against a vendor attempting a 30% rate hike—not only did they back down, they extended our contract with added perks.',
    author: 'Sneha Chawla',
    role: 'VP Procurement & Supply',
    location: 'Mumbai'
  },
  {
    book: 'The Detective',
    themeColor: '#3b82f6',
    quote: 'As an angel investor, checking founder integrity is everything. The chapters on linguistic deception markers and baseline deviation exposed a fraudulent projection in a pitch meeting within 15 minutes. Invaluable.',
    author: 'Karan Mehra',
    role: 'Early-Stage VC',
    location: 'Delhi'
  },
  {
    book: 'The Leader',
    themeColor: '#a855f7',
    quote: 'My startup grew from 8 to 45 engineers and communication was breaking down. Applying the Commander\'s Intent and Radical Candor frameworks removed operational gridlock and rebuilt trust across the team.',
    author: 'Divya Nambiar',
    role: 'Engineering Director',
    location: 'Hyderabad'
  },
  {
    book: 'The Heart Reader',
    themeColor: '#f43f5e',
    quote: 'I used to sabotage every talking stage by overanalyzing texts and creating anxious gravity. This book healed my dating mindset completely. Plus, having Siya to bounce confusing signals off of is like magic.',
    author: 'Rohan Deshmukh',
    role: 'Product Designer',
    location: 'Pune'
  }
];

export default function Testimonials5Books() {
  return (
    <section id="reviews" className="py-24 sm:py-28 px-4 sm:px-6 relative overflow-hidden bg-black text-white">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header with Mathematical Typographic Ratio */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4 backdrop-blur-md">
            <MessageSquareQuote className="w-3.5 h-3.5 text-amber-400" strokeWidth={2} />
            <span className="type-eyebrow font-mono text-zinc-300">Empirical Reader Feedback</span>
          </div>

          <h2 className="type-h2 font-black text-white tracking-tight text-balance">
            Over 54,000 Lives Transformed Across 5 Domains
          </h2>

          <p className="type-body text-zinc-400 mt-3 leading-relaxed">
            Read how readers use the 5 volumes to win high-stakes deals, command respect, and build deep connections.
          </p>
        </div>

        {/* 5 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-7 rounded-2xl bg-[#0c0c11] border border-white/10 hover:border-white/20 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="type-caption font-mono font-bold px-3 py-1 rounded-full border uppercase"
                    style={{
                      color: item.themeColor,
                      borderColor: `${item.themeColor}40`,
                      backgroundColor: `${item.themeColor}12`
                    }}
                  >
                    {item.book}
                  </span>
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <Quote className="w-5 h-5 text-zinc-600 mb-2.5" />
                <p className="type-body-sm text-zinc-300 leading-relaxed font-normal">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="type-body-sm font-bold text-white">{item.author}</h4>
                  <p className="type-caption font-mono text-zinc-400">{item.role} • {item.location}</p>
                </div>
                <div className="flex items-center gap-1.5 type-caption font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" strokeWidth={2} />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
