'use client';
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'What formats will I receive upon purchase?',
    a: 'You receive instant digital access to all 3 standard formats: EPUB (for Apple Books, Kobo, and mobile readers), MOBI/AZW3 (for Amazon Kindle devices and Kindle apps), and high-resolution formatted PDF (for iPads, tablets, and laptops). Every purchase also includes executive MP3 audio summaries.'
  },
  {
    q: 'Can I purchase an individual book instead of the full bundle?',
    a: 'Yes! You can purchase any individual book (e.g. The Charmer, The Negotiator, etc.) for ₹399 to ₹499 directly from the book grid above. However, the Complete 5-Book Master Boxset includes all 5 books plus audio summaries and VIP companion access for just ₹999 (saving over 55%).'
  },
  {
    q: 'How does the Siya Heart Reader companion work?',
    a: 'Siya is our real-time interactive relationship companion. When you purchase Book V: The Heart Reader or the Complete 5-Book Boxset, you unlock unlimited access to Siya at /siya. You can feed real-world text messages or behavioral observations to Siya to decode emotional signals and get instant tactical guidance.'
  },
  {
    q: 'Are the tactics ethical or manipulative?',
    a: 'Every framework is grounded in mutual value creation, emotional perception, and clear boundaries. Charm without deception, negotiation with empathy, and leadership with dignity are the foundation of this entire collection.'
  },
  {
    q: 'How do I access the books and future updates after purchase?',
    a: 'Immediately upon completing checkout, you receive instant download links to EPUB, PDF, and Kindle formats via email and on-screen. You also receive lifetime access to all future book editions, bonus tactical field guides, and updates at no extra charge.'
  }
];

export default function FAQ5Books() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 sm:py-28 px-4 sm:px-6 relative overflow-hidden bg-[#08080b] text-white border-t border-white/10">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header with Mathematical Typography */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4 backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" strokeWidth={2} />
            <span className="type-eyebrow font-mono text-zinc-300">CLARITY & PROTOCOLS</span>
          </div>

          <h2 className="type-h2 font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0f0f15] border border-white/10 overflow-hidden transition-colors hover:border-white/20"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 type-body font-bold text-zinc-100 hover:text-white cursor-pointer"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                    strokeWidth={2}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 type-body-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
