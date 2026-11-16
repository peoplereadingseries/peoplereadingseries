'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Lock, 
  Scale, 
  FileText, 
  Mail, 
  Phone 
} from 'lucide-react';

// Official Brand Icons for Verified Channels
const InstagramIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const XTwitterIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.62 1.62 0 1 0 1.62 1.62 1.63 1.63 0 0 0-1.62-1.62Z"/>
  </svg>
);

const YouTubeIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const RedditIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .868.196 1.177.49 1.207-.866 2.87-1.433 4.699-1.498l.92-4.311 3.372.714c.05-.24.168-.456.33-.628a1.242 1.242 0 0 1 .73-.269zM8.5 12.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-5.466 4.316a.487.487 0 0 0-.083.693c.495.66 1.282 1.05 2.049 1.05.767 0 1.554-.39 2.049-1.05a.487.487 0 0 0-.083-.693.487.487 0 0 0-.693.083c-.319.426-.838.66-1.273.66-.435 0-.954-.234-1.273-.66a.487.487 0 0 0-.693-.083z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="py-16 sm:py-20 border-t border-white/10 bg-[#06080e] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Clean 2-Column Balanced Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="inline-block group">
              <Image
                src="/images/logo.png"
                alt="PeopleReading SERIES"
                width={789}
                height={189}
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            <p className="type-body-sm text-zinc-400 max-w-md leading-relaxed">
              Understand People. Master Communication. Unlock Your Potential. The definitive 5-volume behavioral psychology &amp; communication system with interactive scenario training engines.
            </p>

            <div className="flex items-center gap-2 type-caption font-mono text-zinc-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" strokeWidth={2} />
              <span>Instant Digital Delivery • Single-Device Protected Reader</span>
            </div>
          </div>

          {/* Direct Contact & Verified Channels */}
          <div className="md:col-span-6 md:flex md:flex-col md:items-end space-y-4">
            <div className="space-y-2.5 text-left md:text-right">
              <span className="type-eyebrow font-mono text-amber-400 block">
                Official Support Desk
              </span>
              
              {/* Single Official Email */}
              <a
                href="mailto:support@peoplereadingseries.com"
                className="inline-flex items-center gap-2 text-zinc-200 hover:text-amber-400 transition-colors group"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-xs font-semibold">support@peoplereadingseries.com</span>
              </a>

              <div className="flex items-center md:justify-end gap-2 text-zinc-400 text-xs font-mono">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-zinc-300 font-semibold">+91 98765 43210</span>
                <span className="text-[11px] text-zinc-500">(Mon–Sat, 10 AM – 7 PM IST)</span>
              </div>
            </div>

            {/* Verified Social Media Channels with Real Brand Icons */}
            <div className="pt-2 text-left md:text-right">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2.5">
                Verified Channels
              </span>
              <div className="flex flex-wrap md:justify-end gap-2 text-xs font-mono">
                <a
                  href="https://instagram.com/peoplereadingseries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-amber-500/20 border border-white/10 hover:border-pink-500/40 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 group"
                  title="Follow on Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://x.com/peoplereading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 group"
                  title="Follow on X (Twitter)"
                >
                  <XTwitterIcon className="w-3.5 h-3.5 text-zinc-200 group-hover:scale-110 transition-transform" />
                  <span>X</span>
                </a>
                <a
                  href="https://linkedin.com/company/peoplereadingseries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-blue-500/15 border border-white/10 hover:border-blue-500/40 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 group"
                  title="Connect on LinkedIn"
                >
                  <LinkedInIcon className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://youtube.com/@peoplereadingseries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-red-500/15 border border-white/10 hover:border-red-500/40 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 group"
                  title="Subscribe on YouTube"
                >
                  <YouTubeIcon className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
                  <span>YouTube</span>
                </a>
                <a
                  href="https://reddit.com/r/PeopleReadingSeries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-orange-500/15 border border-white/10 hover:border-orange-500/40 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 group"
                  title="Join Community on Reddit"
                >
                  <RedditIcon className="w-3.5 h-3.5 text-orange-400 group-hover:scale-110 transition-transform" />
                  <span>Reddit</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Protection & Verification Bar */}
        <div className="py-6 border-b border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 type-caption font-mono text-zinc-400">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={2} />
            <span><strong className="text-zinc-200 font-sans">Razorpay Verified Merchant</strong> • Instant Delivery</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={2} />
            <span>256-Bit SSL Encrypted • PCI-DSS Level 1</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-end">
            <Scale className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={2} />
            <span>Registered IP &amp; Copyright © 2026</span>
          </div>
        </div>

        {/* Legal Disclaimer & Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left type-caption text-zinc-500">
          <p className="max-w-xl flex items-center gap-2 text-zinc-400">
            <FileText className="w-3.5 h-3.5 text-zinc-500 shrink-0" strokeWidth={1.5} />
            <span>PeopleReading Series™. All intellectual property, curriculum architectures, characters, and materials are legally protected.</span>
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-400">
            <Link href="/privacy-policy" className="hover:text-amber-400 transition-colors underline decoration-zinc-700">
              Privacy Policy
            </Link>
            <span className="text-zinc-600">•</span>
            <Link href="/privacy-policy#no-refund" className="text-rose-400 hover:text-rose-300 transition-colors underline decoration-rose-500/40 font-bold">
              Strict No-Refund Terms
            </Link>
            <span className="text-zinc-600">•</span>
            <Link href="/privacy-policy#terms" className="hover:text-amber-400 transition-colors underline decoration-zinc-700">
              Terms of Service
            </Link>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500">
              © {new Date().getFullYear()} PeopleReading Series™
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
