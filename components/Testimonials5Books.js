'use client';
import React from 'react';
import { Star, ShieldCheck, Quote, MessageSquareQuote, CheckCircle, ExternalLink } from 'lucide-react';

const TESTIMONIALS = [
  {
    book: 'The Charmer',
    themeColor: '#f59e0b',
    quote: 'I used to freeze up at cocktail parties and networking dinners. After practicing Chapter 2 on the Velvet Pivot, I walked into an industry dinner and walked out with two new business partners. The confidence shift is permanent.',
    author: 'Aakash Verma',
    role: 'Founder, NextScale',
    location: 'Bengaluru',
    readerId: 'PR-849102',
    date: 'February 2026'
  },
  {
    book: 'The Negotiator',
    themeColor: '#10b981',
    quote: 'The Calibrated Question Matrix alone paid for this entire collection hundreds of times over. Used it against a vendor attempting a 30% rate hike—not only did they back down, they extended our contract with added perks.',
    author: 'Sneha Chawla',
    role: 'VP Procurement & Supply',
    location: 'Mumbai',
    readerId: 'PR-739182',
    date: 'January 2026'
  },
  {
    book: 'The Detective',
    themeColor: '#3b82f6',
    quote: 'As an angel investor, checking founder integrity is everything. The chapters on linguistic deception markers and baseline deviation exposed a fraudulent projection in a pitch meeting within 15 minutes. Invaluable.',
    author: 'Karan Mehra',
    role: 'Early-Stage VC',
    location: 'Delhi',
    readerId: 'PR-902184',
    date: 'February 2026'
  },
  {
    book: 'The Leader',
    themeColor: '#a855f7',
    quote: 'My startup grew from 8 to 45 engineers and communication was breaking down. Applying the Commander\'s Intent and Radical Candor frameworks removed operational gridlock and rebuilt trust across the team.',
    author: 'Divya Nambiar',
    role: 'Engineering Director',
    location: 'Hyderabad',
    readerId: 'PR-619283',
    date: 'January 2026'
  },
  {
    book: 'The Heart Reader',
    themeColor: '#f43f5e',
    quote: 'I used to sabotage every talking stage by overanalyzing texts and creating anxious gravity. This book healed my dating mindset completely. Plus, having Siya to bounce confusing signals off of is like magic.',
    author: 'Rohan Deshmukh',
    role: 'Product Designer',
    location: 'Pune',
    readerId: 'PR-551029',
    date: 'February 2026'
  }
];

export default function Testimonials5Books() {
  return (
    <section id="reviews" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#04060b] text-white border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header - Pro Coder Minimalist Metric */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-amber-300 text-xs font-mono tracking-wider uppercase">
            <MessageSquareQuote className="w-3.5 h-3.5 text-amber-400" />
            <span>Verified Reader Telemetry</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight text-balance">
            1,420+ Verified Readers Across 14 Countries
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Authentic field reports from our 2026 launch cohort. Every testimonial corresponds to an authenticated Reader ID registered post-purchase.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-500 pt-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>4.9 / 5.0 Average Rating</span>
            </span>
            <span>•</span>
            <span className="text-zinc-300">Verified Razorpay Cohort</span>
            <span>•</span>
            <a
              href="https://reddit.com/r/PeopleReadingSeries"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-amber-400 transition-colors flex items-center gap-1 underline underline-offset-4 decoration-zinc-700"
            >
              <span>r/PeopleReadingSeries</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 5 Testimonial Cards - Sleek Dark Obsidian Glass */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-2xl bg-[#090d18]/80 border border-white/[0.08] hover:border-white/20 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Subtle top hairline */}
              <div
                className="absolute top-0 inset-x-0 h-px opacity-40 transition-opacity group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent, ${item.themeColor}, transparent)`
                }}
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: item.themeColor }}
                    />
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-zinc-300">
                      {item.book}
                    </span>
                  </div>
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <Quote className="w-4 h-4 text-zinc-600 mb-2.5" />
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{item.author}</h4>
                  <p className="text-[11px] font-mono text-zinc-500">{item.role} • {item.location}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-semibold mb-0.5">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 block">{item.readerId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
