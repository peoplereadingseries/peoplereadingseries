'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Mail, 
  Phone 
} from 'lucide-react';

// Official Brand Icons for Verified Channels (Icons Only)
const InstagramIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedInIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.62 1.62 0 1 0 1.62 1.62 1.63 1.63 0 0 0-1.62-1.62Z"/>
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

          {/* Direct Email & Verified Channels (Icons Only) */}
          <div className="md:col-span-6 md:flex md:flex-col md:items-end space-y-4">
            <div className="space-y-2 text-left md:text-right">
              {/* Direct Gmail Address */}
              <div>
                <a
                  href="mailto:peoplereadingseries@gmail.com"
                  className="inline-flex items-center gap-2 text-zinc-200 hover:text-amber-400 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-xs font-semibold">peoplereadingseries@gmail.com</span>
                </a>
              </div>

              <div className="flex items-center md:justify-end gap-2 text-zinc-400 text-xs font-mono">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-zinc-300 font-semibold">+91 98765 43210</span>
                <span className="text-[11px] text-zinc-500">(Mon–Sat, 10 AM – 7 PM IST)</span>
              </div>
            </div>

            {/* Verified Channels (Icons Only) */}
            <div className="pt-2 text-left md:text-right">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2.5">
                Verified Channels
              </span>
              <div className="flex items-center md:justify-end gap-3">
                <a
                  href="https://instagram.com/peoplereadingseries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-gradient-to-tr hover:from-amber-500/20 hover:to-pink-500/30 border border-white/10 hover:border-pink-500/40 text-zinc-300 hover:text-white transition-all flex items-center justify-center group"
                  title="Follow on Instagram"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://facebook.com/peoplereadingseries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/40 text-zinc-300 hover:text-white transition-all flex items-center justify-center group"
                  title="Follow on Facebook"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://linkedin.com/company/peoplereadingseries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-blue-500/20 border border-white/10 hover:border-blue-400/40 text-zinc-300 hover:text-white transition-all flex items-center justify-center group"
                  title="Connect on LinkedIn"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Protection & Verification Bar */}
        <div className="py-6 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 type-caption font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={2} />
            <span><strong className="text-zinc-200 font-sans">Razorpay Verified Merchant</strong> • Instant Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={2} />
            <span>256-Bit SSL Encrypted • PCI-DSS Level 1</span>
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
