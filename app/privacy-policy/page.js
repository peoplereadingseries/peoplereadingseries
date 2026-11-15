'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShieldAlert, ShieldCheck, Lock, FileText, Ban, CheckCircle2, Smartphone, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#070B14] text-white selection:bg-amber-400 selection:text-black">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#0B0F19]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/logo.png"
              alt="PeopleReading SERIES"
              width={789}
              height={189}
              className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Store</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
        
        {/* Title & Introduction */}
        <div className="space-y-3 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Legal Framework & User Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Privacy Policy & Strict No-Refund Terms
          </h1>
          <p className="text-sm text-zinc-400 font-mono">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} • PeopleReadingSeries Publishing
          </p>
        </div>

        {/* 1. STRICT NO-REFUND POLICY (HIGHLIGHTED BANNER) */}
        <section id="no-refund" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-rose-950/40 to-black border-2 border-rose-500/40 shadow-[0_0_50px_rgba(244,63,94,0.15)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400 shrink-0">
              <Ban className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-rose-400 block">
                Strict Digital Goods Policy
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                All Sales Are Final & Non-Refundable
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
            Due to the immediate digital delivery, proprietary intellectual property, and instant access to our books, interactive chapters, and companion reading tools, <strong className="text-white underline decoration-rose-400">we enforce a strict No-Refund Policy on all purchases</strong>.
          </p>

          <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-zinc-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>
                <strong>Instant Consumption:</strong> Digital content is unlocked and consumable immediately upon successful payment verification. Because digital assets cannot be &quot;returned&quot; once accessed, no refunds, reversals, or cancellations will be honored.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>
                <strong>Single-Device Protection:</strong> Your account is bound to your device for reading. Misunderstanding the single-device security rule or attempting to share licenses across multiple concurrent devices does not constitute grounds for a refund.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>
                <strong>Payment Authorization:</strong> By clicking &quot;Pay&quot; or completing checkout through Razorpay / UPI, you expressly agree to waive any right to chargebacks or refund requests.
              </span>
            </div>
          </div>
        </section>

        {/* 2. PRIVACY & DATA COLLECTION */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#0F1420] border border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Lock className="w-5 h-5" strokeWidth={2} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Information We Collect & How We Protect It
            </h2>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">
            We value your privacy and only collect the minimal information necessary to deliver and protect your reading experience:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 block">Full Name</span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Used strictly to personalize your member portal and generate your licensed DRM watermark.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 block">Email Address</span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Serves as your unique Reader credential and used for Razorpay transaction confirmation receipts.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 block">Phone Number</span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Utilized for one-device account verification, WhatsApp support, and emergency account recovery.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200 space-y-1">
            <strong>Zero Data Selling:</strong> We never sell, rent, monetize, or disclose your personal contact information to third-party advertisers, data brokers, or marketing networks.
          </div>
        </section>

        {/* 3. SINGLE-DEVICE SECURITY ARCHITECTURE */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#0F1420] border border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
              <Smartphone className="w-5 h-5" strokeWidth={2} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              WhatsApp-Style Single Device Policy
            </h2>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">
            To prevent digital piracy, book scraping, and account redistribution, our platform operates on an exclusive <strong>Single-Device Concurrency Lock</strong>:
          </p>

          <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 list-disc list-inside leading-relaxed">
            <li>Each account can only have <strong>one active reading session</strong> at any given second.</li>
            <li>If you log into your account on a secondary device (e.g. another phone or tablet), the primary device is <strong>instantly and automatically disconnected</strong> in real-time.</li>
            <li>Cached offline chapters are encrypted and tied strictly to your registered hardware browser profile.</li>
          </ul>
        </section>

        {/* 4. INTELLECTUAL PROPERTY & COPYRIGHT */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#0F1420] border border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <FileText className="w-5 h-5" strokeWidth={2} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Proprietary Intellectual Property
            </h2>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">
            All 5 volumes (*The Charmer*, *The Negotiator*, *The Detective*, *The Leader*, *The Heart Reader*), character identities, artwork, psychological tactics, audio assets, and software code are the exclusive intellectual property of <strong>PeopleReadingSeries Publishing</strong>.
          </p>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Copying, reproducing, distributing, re-uploading, extracting, or creating derivative works without express prior written consent is strictly prohibited and subject to full civil and criminal prosecution under Indian and international copyright treaties.
          </p>
        </section>

        {/* 5. CONTACT & SUPPORT */}
        <section className="p-6 rounded-3xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Need Help or Account Assistance?</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              If you experience issues accessing your books on your authorized device, our team is ready to assist.
            </p>
          </div>
          <a
            href="mailto:support@peoplereadingseries.com"
            className="px-5 py-2.5 rounded-full bg-white text-black font-black text-xs hover:bg-zinc-200 transition-all flex items-center gap-1.5 shrink-0"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Support</span>
          </a>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs font-mono text-zinc-500">
        <p>© {new Date().getFullYear()} PeopleReadingSeries™. All Rights Reserved. Full Intellectual Property Protection.</p>
      </footer>
    </div>
  );
}
