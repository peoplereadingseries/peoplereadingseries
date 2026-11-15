'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Layers3,
  BookOpen,
  Lock,
  Smartphone,
  User,
  Mail,
  Phone,
  Sparkles,
  KeyRound,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutModal({ item, isOpen, onClose }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  const [validationError, setValidationError] = useState('');

  if (!isOpen || !item) return null;

  const isBundle = item.isBundle || item.id === 'bundle';
  const price = item.price ? Number(String(item.price).replace(/[^0-9]/g, '')) || 999 : 999;
  const originalPrice = item.originalPrice ? Number(String(item.originalPrice).replace(/[^0-9]/g, '')) || (isBundle ? 2195 : 899) : (isBundle ? 2195 : 899);
  const title = item.title;
  const coverImage = item.coverImage || item.thumbUrl || item.avatarImage || '/images/thepeoplelanguage/cover_charmer_v2.jpg';

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
    else if (/Android/i.test(ua)) device = 'Android Mobile';
    return `${device} (${navigator.language || 'en'})`;
  };

  const registerUserAndUnlock = async (userEmail, userName, userPhone) => {
    try {
      const res = await fetch('/api/auth/checkout-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          name: userName,
          phone: userPhone,
          bookId: item.id,
          isBundle: isBundle,
          deviceId: getDeviceId(),
          deviceInfo: getDeviceInfo(),
        }),
      });

      const data = await res.json();
      if (data.sessionToken && data.user) {
        // Save persistent auto-login identity on this device
        localStorage.setItem('peoplereading_user_email', data.user.email);
        localStorage.setItem('peoplereading_session_token', data.sessionToken);
        localStorage.setItem('peoplereading_user_data', JSON.stringify(data.user));
        setCreatedUser(data.user);
        return data.user;
      }
    } catch (e) {
      console.warn('Post-checkout registration error:', e);
    }
    return null;
  };

  const handleRazorpay = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!name.trim()) {
      setValidationError('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setValidationError('Please enter a valid email address');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      setValidationError('Please enter a valid phone number');
      return;
    }

    setIsProcessing(true);

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
              name: name.trim(),
              email: email.trim(),
              contact: phone.trim(),
            },
            handler: async function () {
              await registerUserAndUnlock(email.trim(), name.trim(), phone.trim());
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
      console.warn('Razorpay checkout notice, falling back:', err);
    }

    // Direct registration fallback (demo/sandbox)
    await registerUserAndUnlock(email.trim(), name.trim(), phone.trim());
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleTestInstantUnlock = async () => {
    const demoEmail = email.trim() || 'reader@peoplereadingseries.com';
    const demoName = name.trim() || 'Demo Reader';
    const demoPhone = phone.trim() || '+91 9876543210';
    setIsProcessing(true);
    await registerUserAndUnlock(demoEmail, demoName, demoPhone);
    setIsProcessing(false);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0d111a] border border-white/15 rounded-3xl p-5 sm:p-8 shadow-[0_0_90px_rgba(0,0,0,0.95)] text-white max-h-[94dvh] overflow-y-auto animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer z-10"
          aria-label="Close Checkout"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header Badge */}
            <div className="text-center mb-5">
              <span className="type-eyebrow font-mono px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 inline-flex items-center gap-1.5 mb-2.5">
                {isBundle ? (
                  <>
                    <Layers3 className="w-3.5 h-3.5 text-amber-400" strokeWidth={2} />
                    <span>5-Book Complete Master Boxset</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" strokeWidth={2} />
                    <span>Single-Device Web Reader Edition</span>
                  </>
                )}
              </span>
              <h3 className="type-h3 font-black text-white">{title}</h3>
              <p className="type-body-sm text-zinc-400 mt-1">
                Enter your details once. Your Reader ID is created automatically and remembered on this device.
              </p>
            </div>

            {/* Price & Summary Box */}
            <div className="p-4 rounded-2xl bg-[#141a26] border border-white/10 mb-5 flex items-center justify-between">
              <div>
                <span className="type-caption font-mono text-zinc-400 block">Total Investment</span>
                <span className="type-h2 font-black text-amber-400 tabular-nums">₹{price}</span>
              </div>
              <div className="text-right">
                <span className="type-caption font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-full block">
                  {isBundle ? `SAVE ₹${originalPrice - price} (55% OFF)` : `50% Launch Special`}
                </span>
                <span className="type-caption font-mono text-zinc-500 line-through mt-0.5 block tabular-nums">
                  ₹{originalPrice}
                </span>
              </div>
            </div>

            {/* Validation Error Banner */}
            {validationError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0"></span>
                <span>{validationError}</span>
              </div>
            )}

            {/* Checkout Form */}
            <form onSubmit={handleRazorpay} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="type-caption font-mono font-bold text-zinc-300 flex items-center gap-1.5 mb-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aakash Verma"
                  className="w-full bg-[#171f30] border border-white/15 rounded-xl px-4 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
                <span className="text-[11px] text-zinc-400 block mt-1">
                  💡 This name will appear on your personalized Reader license.
                </span>
              </div>

              {/* Email ID */}
              <div>
                <label className="type-caption font-mono font-bold text-zinc-300 flex items-center gap-1.5 mb-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email Address (Login Credential) *</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#171f30] border border-white/15 rounded-xl px-4 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
                <span className="text-[11px] text-zinc-400 block mt-1">
                  💡 Your permanent login ID. When you return on this device, you won&apos;t need to log in again.
                </span>
              </div>

              {/* Phone Number */}
              <div>
                <label className="type-caption font-mono font-bold text-zinc-300 flex items-center gap-1.5 mb-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Phone Number *</span>
                </label>
                <div className="flex gap-2">
                  <span className="px-3 py-2.5 bg-[#171f30] border border-white/15 rounded-xl text-zinc-400 text-xs font-mono font-bold flex items-center">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="flex-1 bg-[#171f30] border border-white/15 rounded-xl px-4 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                </div>
                <span className="text-[11px] text-zinc-400 block mt-1">
                  💡 Used for single-device verification and WhatsApp-style session management.
                </span>
              </div>

              {/* Security & Device Notice Callout */}
              <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-2 text-xs text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <Smartphone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Auto-Remembered on this device</span>
                    <span className="text-[11px] text-zinc-400 leading-relaxed block">
                      Next time you visit, your Reader ID will display your name automatically. No repeated logins required.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 pt-1 border-t border-white/5">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300 block">WhatsApp-Style Single Device Policy</span>
                    <span className="text-[11px] text-zinc-400 leading-relaxed block">
                      If you log in using this email on another phone or browser, this device will automatically disconnect with no access.
                    </span>
                  </div>
                </div>
              </div>

              {/* Privacy Policy & No-Refund Terms Agreement */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-zinc-400 text-center leading-relaxed">
                By clicking pay, you agree to our{' '}
                <Link href="/privacy-policy" target="_blank" className="text-zinc-300 underline hover:text-white">
                  Privacy Policy
                </Link>{' '}
                and accept our{' '}
                <Link href="/privacy-policy#no-refund" target="_blank" className="text-rose-400 font-bold underline hover:text-rose-300">
                  Strict No-Refund Policy
                </Link>{' '}
                for instant digital goods.
              </div>

              {/* Action Buttons */}
              <div className="pt-1 space-y-2.5">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-xl font-black text-sm bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-yellow-400 text-black shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
                >
                  <ShieldCheck className="w-4 h-4 text-black" strokeWidth={2.5} />
                  <span>{isProcessing ? 'Creating Account & Securing...' : `Pay ₹${price} & Unlock Web Reader`}</span>
                </button>

                <button
                  type="button"
                  onClick={handleTestInstantUnlock}
                  disabled={isProcessing}
                  className="w-full py-2.5 px-3 rounded-xl type-caption font-mono font-bold bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/80 transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
                  title="Instant Test Unlock without real payment"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" strokeWidth={2} />
                  <span>Instant Test Unlock (Test Checkout)</span>
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* ========================================================
             PERFECT POST-PURCHASE READING LAUNCHER UI
             ======================================================== */
          <div className="py-2 space-y-5 animate-in fade-in duration-300">
            
            {/* Top Celebration Header */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.35)]">
                <CheckCircle2 className="w-9 h-9" strokeWidth={2.5} />
              </div>
              <span className="type-eyebrow font-mono text-emerald-400 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 inline-block">
                Purchase Confirmed • Full Reading Access Unlocked
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                You&apos;re All Set, {createdUser?.name || name || 'Reader'}!
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Your permanent Reader license has been created and bound to this device. You can start reading immediately below.
              </p>
            </div>

            {/* Unlocked Book Hero Showcase Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#172033] to-[#0d121c] border border-amber-400/40 shadow-xl flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-20 h-28 sm:w-24 sm:h-32 rounded-xl overflow-hidden border border-white/20 shrink-0 shadow-2xl bg-black">
                <Image
                  src={coverImage}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </div>
              <div className="flex-1 text-center sm:text-left space-y-1.5">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {isBundle ? 'ALL 5 VOLUMES UNLOCKED' : 'READY TO READ'}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Single-Device Active</span>
                  </span>
                </div>
                <h4 className="text-lg font-black text-white leading-snug">{title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Full unabridged text with psychological tactics, behavioral frameworks, and offline phone widget support.
                </p>
              </div>
            </div>

            {/* Reader Identity & Device Credentials Box */}
            <div className="p-4 rounded-2xl bg-[#121724] border border-white/10 text-left space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-[11px] font-mono text-zinc-400">YOUR PERMANENT READER ID</span>
                <span className="text-sm font-mono font-black text-amber-300 tracking-wider bg-amber-950/40 border border-amber-500/30 px-2.5 py-0.5 rounded-md">
                  {createdUser?.userId || 'PR-ACTIVE'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-zinc-500 text-[11px] block">Reader Name:</span>
                  <span className="text-white font-bold">{createdUser?.name || name}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[11px] block">Login Email:</span>
                  <span className="text-white font-mono truncate block">{createdUser?.email || email}</span>
                </div>
                {createdUser?.phone && (
                  <div>
                    <span className="text-zinc-500 text-[11px] block">Registered Phone:</span>
                    <span className="text-white font-mono">{createdUser.phone}</span>
                  </div>
                )}
                <div>
                  <span className="text-zinc-500 text-[11px] block">Authorized Device:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{createdUser?.activeDeviceInfo || 'This Device'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Auto-Recognition Guarantee */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs text-zinc-300 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong className="text-white block font-semibold">Zero login required on this device</strong>
                <span className="text-[11px] text-zinc-400">
                  Next time you visit PeopleReading, your name and Reader ID are recognized automatically.
                </span>
              </div>
            </div>

            {/* Primary Action Button: Direct to Reader */}
            <div className="space-y-2.5 pt-1">
              <Link
                href={`/reader?book=${item.id || 'the-charmer'}`}
                onClick={onClose}
                className="w-full py-4 px-6 rounded-2xl font-black text-base bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-black shadow-[0_4px_25px_rgba(245,158,11,0.4)] transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-black" strokeWidth={2.5} />
                <span>Start Reading Now (Chapter 1)</span>
                <ArrowRight className="w-5 h-5 text-black" />
              </Link>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white type-caption font-mono font-semibold border border-zinc-700/80 transition-all cursor-pointer"
              >
                Close & Return to Store
              </button>
            </div>

            {/* Strict Digital Goods No-Refund Reminder */}
            <p className="text-[10px] text-zinc-500 text-center">
              Licensed Digital Edition • Protected by Proprietary DRM • Non-Refundable
            </p>

          </div>
        )}

      </div>
    </div>
  );
}
