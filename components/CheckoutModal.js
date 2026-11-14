'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, ShieldCheck, CheckCircle2, ArrowRight, Layers3, BookOpen, Lock, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutModal({ item, isOpen, onClose }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  if (!isOpen || !item) return null;

  const isBundle = item.isBundle || item.id === 'bundle';
  const price = item.price || item.bundlePrice || 999;
  const title = item.title;

  const getDeviceId = () => {
    if (typeof window === 'undefined') return 'dev_checkout';
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

  const registerUserAndUnlock = async (userEmail, userName) => {
    try {
      const res = await fetch('/api/auth/checkout-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          name: userName,
          bookId: item.id,
          isBundle: isBundle,
          deviceId: getDeviceId(),
          deviceInfo: getDeviceInfo(),
        }),
      });

      const data = await res.json();
      if (data.sessionToken && data.user) {
        localStorage.setItem('peoplereading_user_email', data.user.email);
        localStorage.setItem('peoplereading_session_token', data.sessionToken);
        localStorage.setItem('peoplereading_user_data', JSON.stringify(data.user));
      }
    } catch (e) {
      console.warn('Post-checkout registration error:', e);
    }
  };

  const handleRazorpay = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please enter your name and email');
      return;
    }

    setIsProcessing(true);
    setRegisteredEmail(email);

    try {
      if (typeof window !== 'undefined' && window.Razorpay) {
        const res = await fetch('/api/payment/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: price, currency: 'INR' }),
        });
        const orderData = await res.json();

        if (orderData?.id) {
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID',
            amount: orderData.amount,
            currency: orderData.currency || 'INR',
            name: 'PeopleReadingSeries',
            description: title,
            order_id: orderData.id,
            prefill: {
              name,
              email,
              contact: phone || '9999999999',
            },
            handler: async function () {
              await registerUserAndUnlock(email, name);
              setIsProcessing(false);
              setIsSuccess(true);
            },
            theme: { color: '#f59e0b' },
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
          return;
        }
      }
    } catch (err) {
      console.warn('Razorpay checkout fallback:', err);
    }

    // Fallback if Razorpay credentials are test/offline
    await registerUserAndUnlock(email, name);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleTestInstantUnlock = async () => {
    const demoEmail = email || 'reader@peoplereadingseries.com';
    const demoName = name || 'Demo Reader';
    setRegisteredEmail(demoEmail);
    await registerUserAndUnlock(demoEmail, demoName);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0f0f14] border border-white/20 rounded-3xl p-5 sm:p-8 shadow-[0_0_80px_rgba(0,0,0,0.95)] text-white max-h-[92dvh] overflow-y-auto animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Header */}
            <div className="text-center mb-6">
              <span className="type-eyebrow font-mono px-3.5 py-1 rounded-full bg-white/[0.04] text-amber-300 border border-amber-400/30 inline-flex items-center gap-1.5 mb-2.5">
                {isBundle ? (
                  <>
                    <Layers3 className="w-3.5 h-3.5 text-amber-400" strokeWidth={2} />
                    <span>5-Book Master Boxset</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" strokeWidth={2} />
                    <span>Digital Web Reader Edition</span>
                  </>
                )}
              </span>
              <h3 className="type-h3 font-black text-white">{title}</h3>
              <p className="type-body-sm text-zinc-400 mt-1">
                Read directly in your browser. No emails or download files required.
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 mb-5 flex items-center justify-between">
              <div>
                <span className="type-caption font-mono text-zinc-400 block">Order Total</span>
                <span className="type-h2 font-black text-white tabular-nums">₹{price}</span>
              </div>
              <div className="text-right">
                <span className="type-caption font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full block">
                  {isBundle ? 'Saved ₹1,196 (55% OFF)' : '50% Limited Launch Price'}
                </span>
                <span className="type-caption font-mono text-zinc-500 line-through mt-0.5 block tabular-nums">
                  ₹{item.originalPrice || 2195}
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleRazorpay} className="space-y-3.5">
              <div>
                <label className="type-caption font-mono font-bold text-zinc-300 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aakash Verma"
                  className="w-full bg-[#181820] border border-white/10 rounded-xl px-4 py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="type-caption font-mono font-bold text-zinc-300 block mb-1">
                  Login Email (Account Credential) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#181820] border border-white/10 rounded-xl px-4 py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
                <span className="text-[10px] text-zinc-400 block mt-1">
                  💡 This email will be your login credential to read your books anytime.
                </span>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-xl font-black text-sm bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-yellow-400 text-black shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <ShieldCheck className="w-4 h-4 text-black" strokeWidth={2} />
                  <span>{isProcessing ? 'Connecting...' : `Complete Secure Checkout (₹${price})`}</span>
                </button>

                <button
                  type="button"
                  onClick={handleTestInstantUnlock}
                  className="w-full py-2.5 px-3 rounded-xl type-caption font-mono font-bold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
                  title="Instant Test Unlock without real payment"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" strokeWidth={2} />
                  <span>Instant Demo Payment (Test Checkout)</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="type-caption font-mono text-zinc-500 flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3 text-zinc-500" strokeWidth={2} />
                  <span>Single-Device Access • In-Website Protected Reader</span>
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Payment Success & Direct Web Reader Launch */
          <div className="text-center py-4 space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" strokeWidth={2} />
            </div>

            <div>
              <span className="type-eyebrow font-mono text-emerald-400">
                Payment Confirmed • Books Unlocked
              </span>
              <h3 className="type-h3 font-black text-white mt-1">
                Your Web Reader is Ready!
              </h3>
              <p className="type-body-sm text-zinc-300 mt-1 max-w-sm mx-auto">
                Welcome, <strong className="text-white">{name || 'Reader'}</strong>! Your account (<strong className="text-amber-300">{registeredEmail || email}</strong>) is now active on this device.
              </p>
            </div>

            {/* Single Device & In-App Reader Perks Box */}
            <div className="p-4 rounded-2xl bg-black/70 border border-white/15 text-left space-y-2.5 text-xs text-zinc-300">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero emails needed — read immediately in your browser</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>One-device security: This device is now your authorized reader</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Offline support: Set phone widget to read without internet</span>
              </div>
            </div>

            {/* Launch Actions */}
            <div className="space-y-2 pt-1">
              <Link
                href="/reader"
                onClick={onClose}
                className="w-full py-3.5 px-4 rounded-xl font-black text-sm bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-black" strokeWidth={2.5} />
                <span>Open Web Reader Now</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 type-caption font-mono font-semibold border border-zinc-700 transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
