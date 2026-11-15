'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BookOpen, 
  Radio, 
  ShieldCheck, 
  Lock, 
  Scale, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { BOOKS_DATA } from '../lib/booksData';

export default function Footer({ onSelectBook }) {
  return (
    <footer className="py-16 sm:py-20 border-t border-white/10 bg-[#06080e] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info & Corporate Identity */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-block group">
              <Image
                src="/images/logo.png"
                alt="PeopleReading SERIES"
                width={789}
                height={189}
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            <p className="type-body-sm text-zinc-400 max-w-sm leading-relaxed">
              Published by <strong className="text-zinc-200">PeopleReading Media & Research Pvt. Ltd.</strong> An interdisciplinary publishing lab translating clinical behavioral science into tactical communication playbooks.
            </p>

            {/* Corporate Registration Details */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-zinc-400 space-y-1.5 font-mono">
              <div className="flex items-center gap-2 text-zinc-300">
                <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>CIN: U22110HR2024PTC109842</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>GSTIN: 06AABCP9842Q1Z8</span>
              </div>
              <div className="flex items-start gap-2 pt-1 text-[11px] leading-relaxed text-zinc-500">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <span>Tower B, 8th Floor, DLF Cyber City, Sector 24, Gurugram, Haryana 122002, India</span>
              </div>
            </div>
          </div>

          {/* The 5 Books Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="type-eyebrow font-mono text-amber-400">
              The 5 Volumes
            </h4>
            <ul className="space-y-2.5 type-body-sm text-zinc-400">
              {BOOKS_DATA.map((book) => (
                <li key={book.id}>
                  <button
                    onClick={() => onSelectBook && onSelectBook(book)}
                    className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: book.themeColor }} />
                    <span className="font-semibold text-zinc-200">{book.title}:</span>
                    <span className="text-zinc-400 truncate">{book.tagline}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic & Editorial Ecosystem */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="type-eyebrow font-mono text-white">
              Research & Platform
            </h4>
            <ul className="space-y-2.5 type-body-sm text-zinc-400">
              <li>
                <a href="#science" className="hover:text-amber-400 transition-colors">
                  Scientific Foundations
                </a>
              </li>
              <li>
                <a href="#authors" className="hover:text-amber-400 transition-colors">
                  Authors & Editorial Board
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  Verified Reader Ledger
                </a>
              </li>
              <li>
                <a href="#bundle" className="hover:text-white transition-colors">
                  Complete 5-Book Boxset
                </a>
              </li>
              <li>
                <Link href="/reader" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Interactive Reader</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support, Helpline & Official Social Profiles */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="type-eyebrow font-mono text-amber-400">
              Direct Contact & Social
            </h4>
            <div className="space-y-2.5 type-body-sm text-zinc-400">
              <a
                href="mailto:support@peoplereadingseries.com"
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">support@peoplereadingseries.com</span>
              </a>
              <a
                href="mailto:editorial@peoplereadingseries.com"
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">editorial@peoplereadingseries.com</span>
              </a>
              <div className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono text-xs">+91 98765 43210</span>
                <span className="text-[10px] text-zinc-500 font-mono">(10 AM - 7 PM IST)</span>
              </div>
            </div>

            {/* Verified Social Media Channels */}
            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">Verified Channels</span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <a
                  href="https://instagram.com/peoplereadingseries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
                <a
                  href="https://linkedin.com/company/peoplereadingseries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
                <a
                  href="https://x.com/peoplereading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>X (Twitter)</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
                <a
                  href="https://reddit.com/r/PeopleReadingSeries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>Reddit</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Prominent Digital Goods & No-Refund Notice Callout */}
        <div className="my-8 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-zinc-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
            <span className="leading-relaxed">
              <strong className="text-zinc-200">Digital Product Disclosure:</strong> All 5 volumes, audio summaries, and companion modules are delivered electronically immediately upon payment. Under international consumer laws for digital downloads, all sales are strictly final and non-refundable once unlocked.
            </span>
          </div>
          <Link
            href="/privacy-policy#no-refund"
            className="shrink-0 text-amber-400 hover:text-amber-300 font-bold underline underline-offset-2 flex items-center gap-1"
          >
            <span>Review Full No-Refund Policy</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
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
            <span>Registered IP & Copyright © 2026</span>
          </div>
        </div>

        {/* Legal Disclaimer & Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left type-caption text-zinc-500">
          <p className="max-w-xl flex items-center gap-2 text-zinc-400">
            <FileText className="w-3.5 h-3.5 text-zinc-500 shrink-0" strokeWidth={1.5} />
            <span>PeopleReading Series™ is a registered publication of PeopleReading Media & Research Pvt. Ltd. All intellectual property, curriculum architectures, characters, and materials are legally protected.</span>
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
              © {new Date().getFullYear()} PeopleReading Media & Research Pvt. Ltd.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
