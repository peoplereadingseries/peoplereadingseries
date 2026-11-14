'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, BookOpen, Smartphone, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export default function ReaderLoginModal({ isOpen, onClose }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const getDeviceId = () => {
    if (typeof window === 'undefined') return 'dev_unknown';
    let devId = localStorage.getItem('peoplereading_device_id');
    if (!devId) {
      devId = `dev_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('peoplereading_device_id', devId);
    }
    return devId;
  };

  const getDeviceInfo = () => {
    if (typeof window === 'undefined') return 'Web Browser';
    const ua = navigator.userAgent;
    let device = 'Computer Browser';
    if (/iPhone/i.test(ua)) device = 'Apple iPhone';
    else if (/iPad/i.test(ua)) device = 'Apple iPad';
    else if (/Android/i.test(ua)) device = 'Android Phone';
    return `${device} (${navigator.language || 'en'})`;
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || 'Reader',
          deviceId: getDeviceId(),
          deviceInfo: getDeviceInfo(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to log in');
      }

      // Save credentials & session
      localStorage.setItem('peoplereading_user_email', data.user.email);
      localStorage.setItem('peoplereading_session_token', data.sessionToken);
      localStorage.setItem('peoplereading_user_data', JSON.stringify(data.user));

      onClose();
      router.push('/reader');
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('reader@peoplereadingseries.com');
    setName('Demo Reader');
    setTimeout(() => {
      handleLogin({ preventDefault: () => {} });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0F1420] border border-white/20 rounded-3xl p-5 sm:p-8 shadow-2xl text-white max-h-[92dvh] overflow-y-auto animate-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Official Logo */}
        <div className="text-center mb-6">
          <Image
            src="/images/logo.jpg"
            alt="PeopleReading SERIES"
            width={789}
            height={189}
            className="h-10 sm:h-12 w-auto mx-auto object-contain mb-3"
            priority
          />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Reader Login
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
            Access your books directly in your browser. No emails or download attachments needed.
          </p>
        </div>

        {/* WhatsApp-Style Single Device Rule Notice */}
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 mb-5 flex items-start gap-2.5">
          <Smartphone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-200/90 leading-snug">
            <strong className="text-amber-300 font-bold">1 Device at a Time:</strong> Logging in here activates this device and automatically disconnects any previous phone or browser.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-3.5">
          <div>
            <label className="text-xs font-mono font-bold text-zinc-300 block mb-1">
              Registered Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@company.com"
              className="w-full bg-[#182030] border border-white/10 rounded-xl px-4 py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-xs font-mono font-bold text-zinc-300 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aakash Verma"
              className="w-full bg-[#182030] border border-white/10 rounded-xl px-4 py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl font-black text-sm bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <BookOpen className="w-4 h-4 text-black" strokeWidth={2.5} />
              <span>{isLoading ? 'Connecting Device...' : 'Open My Web Reader'}</span>
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-mono font-bold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
              title="Instant test login with pre-seeded demo reader"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant Demo Login (All 5 Books)</span>
            </button>
          </div>
        </form>

        <p className="text-[10px] text-zinc-500 text-center mt-4">
          🔒 Protected digital edition • DRM secured reading view
        </p>

      </div>
    </div>
  );
}
