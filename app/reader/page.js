'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Smartphone,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  LogOut,
  Moon,
  Sun,
  Coffee,
  Type,
  Lock,
  Layers3,
  Sparkles,
  Wifi,
  WifiOff
} from 'lucide-react';
import { BOOKS_DATA } from '../../lib/booksData';
import { db } from '../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function ReaderPage() {
  // Auth & Session State
  const [user, setUser] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Login Form State (when not authenticated)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  // Single Device Concurrency State (WhatsApp style)
  const [isTakenOverByOtherDevice, setIsTakenOverByOtherDevice] = useState(false);
  const [otherDeviceInfo, setOtherDeviceInfo] = useState('');
  const [isReclaiming, setIsReclaiming] = useState(false);

  // Reading State
  const [activeBookId, setActiveBookId] = useState('the-charmer');
  const [bookContent, setBookContent] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [contentError, setContentError] = useState('');

  // Reader Preferences
  const [fontSize, setFontSize] = useState('medium'); // small, medium, large, xl
  const [readerTheme, setReaderTheme] = useState('dark'); // dark, sepia, cream
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [pwaPrompt, setPwaPrompt] = useState(null);
  const [showPwaGuide, setShowPwaGuide] = useState(false);
  const [pwaInstalled, setPwaInstalled] = useState(false);

  const readingContainerRef = useRef(null);

  // Generate or retrieve persistent local deviceId
  const getDeviceId = () => {
    if (typeof window === 'undefined') return 'unknown_dev';
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
    else if (/Mac/i.test(ua)) device = 'MacBook';
    else if (/Windows/i.test(ua)) device = 'Windows PC';
    return `${device} (${navigator.language || 'en'})`;
  };

  // PWA Install prompt listener
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setPwaPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', () => setPwaInstalled(true));

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  // Online / Offline status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initial Auth Check from Local Storage
  useEffect(() => {
    try {
      const storedEmail = localStorage.getItem('peoplereading_user_email');
      const storedToken = localStorage.getItem('peoplereading_session_token');
      const storedUser = localStorage.getItem('peoplereading_user_data');

      if (storedEmail && storedToken) {
        setSessionToken(storedToken);
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          // Auto select first purchased book
          if (parsed.purchasedBooks && parsed.purchasedBooks.length > 0) {
            setActiveBookId(parsed.purchasedBooks[0]);
          }
        }
      }
    } catch (e) {
      console.warn('Error reading stored session:', e);
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  // Load Book Content (with Offline Cache Fallback)
  const loadBookContent = useCallback(async (bookIdToLoad, userEmail, token) => {
    if (!bookIdToLoad || !userEmail || !token) return;

    setIsLoadingContent(true);
    setContentError('');

    const cacheKey = `peoplereading_offline_book_${bookIdToLoad}`;

    // If offline, attempt loading from local storage cache
    if (!navigator.onLine) {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setBookContent(parsed);
          setIsLoadingContent(false);
          return;
        } catch (e) {
          console.warn('Offline cache parse failed');
        }
      }
    }

    try {
      const res = await fetch('/api/books/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          sessionToken: token,
          bookId: bookIdToLoad,
        }),
      });

      const data = await res.json();

      if (res.status === 401 && data.reason === 'CONCURRENT_DEVICE_TAKEOVER') {
        setIsTakenOverByOtherDevice(true);
        setOtherDeviceInfo(data.currentActiveDevice || 'Another Phone / Device');
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to load book content');
      }

      setBookContent(data.book);
      // Cache for offline reading view
      try {
        localStorage.setItem(cacheKey, JSON.stringify(data.book));
      } catch (cacheErr) {
        console.warn('Failed to cache book offline:', cacheErr);
      }
    } catch (err) {
      console.warn('Content fetch fallback:', err.message);
      // Check if we have offline cache
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          setBookContent(JSON.parse(cached));
          return;
        } catch (e) {}
      }
      setContentError(err.message || 'Unable to load book. Please check your credentials.');
    } finally {
      setIsLoadingContent(false);
    }
  }, []);

  // Fetch content whenever active book or auth changes
  useEffect(() => {
    if (user && sessionToken && activeBookId) {
      loadBookContent(activeBookId, user.email, sessionToken);
      setCurrentChapterIndex(0);
      if (readingContainerRef.current) {
        readingContainerRef.current.scrollTop = 0;
      }
    }
  }, [user, sessionToken, activeBookId, loadBookContent]);

  // =========================================================================
  // REAL-TIME FIRESTORE LISTENER (Instant WhatsApp-Style Single Device Kickout)
  // When another device logs in, Firestore pushes changes in milliseconds
  // =========================================================================
  useEffect(() => {
    if (!user?.email || !sessionToken || isTakenOverByOtherDevice) return;

    let unsubscribe = null;
    try {
      const normEmail = user.email.toLowerCase().trim();
      const userDocRef = doc(db, 'users', normEmail);
      unsubscribe = onSnapshot(
        userDocRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (data.activeSessionToken && data.activeSessionToken !== sessionToken) {
              // Immediate real-time disconnect!
              setIsTakenOverByOtherDevice(true);
              setOtherDeviceInfo(data.activeDeviceInfo || 'Another Phone / Device');
            }
          }
        },
        (err) => {
          console.warn('Realtime listener fallback notice:', err.message);
        }
      );
    } catch (e) {
      console.warn('Could not attach Firestore listener:', e.message);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.email, sessionToken, isTakenOverByOtherDevice]);

  // =========================================================================
  // WHATSAPP-STYLE SINGLE DEVICE HEARTBEAT MONITOR
  // Polls every 8 seconds to confirm this device is still the active session
  // =========================================================================
  useEffect(() => {
    if (!user?.email || !sessionToken || isTakenOverByOtherDevice) return;

    const interval = setInterval(async () => {
      // Skip heartbeat if offline
      if (!navigator.onLine) return;

      try {
        const res = await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            sessionToken: sessionToken,
          }),
        });

        const data = await res.json();

        if (res.status === 401 && data.reason === 'CONCURRENT_DEVICE_TAKEOVER') {
          // Another device has logged in with this account!
          setIsTakenOverByOtherDevice(true);
          setOtherDeviceInfo(data.currentActiveDevice || 'Another Phone / Device');
        }
      } catch (e) {
        // Network glitches should not log out
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [user?.email, sessionToken, isTakenOverByOtherDevice]);

  // Handle Login Submission
  const handleLoginSubmit = async (e) => {
    e?.preventDefault();
    if (!loginEmail || !loginEmail.includes('@')) {
      setLoginError('Please enter a valid email address');
      return;
    }

    setIsSubmittingLogin(true);
    setLoginError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          name: loginName || 'Reader',
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

      setUser(data.user);
      setSessionToken(data.sessionToken);
      setIsTakenOverByOtherDevice(false);

      if (data.user.purchasedBooks && data.user.purchasedBooks.length > 0) {
        setActiveBookId(data.user.purchasedBooks[0]);
      }
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please verify your details.');
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  // Quick Demo Login for instant review
  const handleDemoLogin = async () => {
    setLoginEmail('reader@peoplereadingseries.com');
    setLoginName('Demo Reader');
    setTimeout(() => {
      handleLoginSubmit({ preventDefault: () => {} });
    }, 100);
  };

  // Handle WhatsApp-Style "Use On This Device Instead" Takeover
  const handleTakeoverSession = async () => {
    if (!user?.email) return;

    setIsReclaiming(true);
    try {
      const res = await fetch('/api/auth/takeover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          deviceId: getDeviceId(),
          deviceInfo: getDeviceInfo(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Takeover failed');

      localStorage.setItem('peoplereading_session_token', data.sessionToken);
      setSessionToken(data.sessionToken);
      setIsTakenOverByOtherDevice(false);

      // Reload content for this device
      loadBookContent(activeBookId, user.email, data.sessionToken);
    } catch (err) {
      alert('Could not reclaim session. Please try logging in again.');
    } finally {
      setIsReclaiming(false);
    }
  };

  // Log Out
  const handleLogout = () => {
    localStorage.removeItem('peoplereading_user_email');
    localStorage.removeItem('peoplereading_session_token');
    localStorage.removeItem('peoplereading_user_data');
    setUser(null);
    setSessionToken(null);
    setBookContent(null);
    setIsTakenOverByOtherDevice(false);
  };

  // Handle Phone Widget PWA installation
  const handleInstallPhoneWidget = async () => {
    if (pwaPrompt) {
      pwaPrompt.prompt();
      const choice = await pwaPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setPwaInstalled(true);
      }
      setPwaPrompt(null);
    } else {
      setShowPwaGuide(true);
    }
  };

  // =========================================================================
  // DRM & ANTI-SHARING GUARDS (NO COPY, NO PRINT, NO CONTEXT MENU)
  // =========================================================================
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Block Ctrl+C (Copy), Ctrl+U (Source), Ctrl+S (Save), Ctrl+P (Print)
      if ((e.ctrlKey || e.metaKey) && ['c', 'u', 's', 'p', 'a'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentChapter = bookContent?.chapters?.[currentChapterIndex];
  const totalChapters = bookContent?.chapters?.length || 1;

  // Reader Color Themes
  const themeStyles = {
    dark: 'bg-[#0A0D16] text-zinc-200 border-white/10',
    sepia: 'bg-[#FBF0D9] text-[#2C2416] border-[#D8C7A3]',
    cream: 'bg-[#F7F4EA] text-[#1E1E1E] border-[#E2DDCB]',
  };

  const fontSizes = {
    small: 'text-sm sm:text-base leading-relaxed',
    medium: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    xl: 'text-xl sm:text-2xl leading-loose',
  };

  // -------------------------------------------------------------
  // VIEW A: NOT LOGGED IN (CREDENTIAL LOGIN VIEW)
  // -------------------------------------------------------------
  if (!user || !sessionToken) {
    return (
      <div className="min-h-screen bg-[#070B14] text-white flex flex-col justify-center items-center p-4 selection:bg-amber-400 selection:text-black">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative w-full max-w-md bg-[#0F1420] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Brand header */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-block mb-3 group">
              <Image
                src="/images/logo.jpg"
                alt="PeopleReading SERIES"
                width={789}
                height={189}
                className="h-10 sm:h-12 w-auto mx-auto object-contain transition-transform group-hover:scale-105"
                priority
              />
            </Link>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">Reader Portal</h1>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
              Read your purchased books directly in your browser. No emails or download files required.
            </p>
          </div>

          {/* Single-Device Rule Notice */}
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 mb-5 flex items-start gap-2.5">
            <Smartphone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-200/90 leading-snug">
              <strong className="text-amber-300 font-bold">Single-Device Access:</strong> Just like WhatsApp, logging in here connects this device and disconnects any other active phone or tablet automatically.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs mb-4">
              {loginError}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono font-bold text-zinc-300 block mb-1">
                Your Registered Email *
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
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
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                placeholder="e.g. Aakash Verma"
                className="w-full bg-[#182030] border border-white/10 rounded-xl px-4 py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={isSubmittingLogin}
                className="w-full py-3.5 px-4 rounded-xl font-black text-sm bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
              >
                <BookOpen className="w-4 h-4 text-black" strokeWidth={2.5} />
                <span>{isSubmittingLogin ? 'Connecting Device...' : 'Log In & Open My Books'}</span>
              </button>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-mono font-bold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
                title="Log in with pre-seeded demo reader account (all 5 books unlocked)"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Test Demo Login (5 Books Unlocked)</span>
              </button>
            </div>
          </form>

          <div className="text-center pt-4 border-t border-white/10 mt-6">
            <Link href="/" className="text-xs text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to PeopleReading Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW B: ACTIVE ON ANOTHER DEVICE (WHATSAPP-STYLE TAKEOVER DIALOG)
  // -------------------------------------------------------------
  if (isTakenOverByOtherDevice) {
    return (
      <div className="min-h-screen bg-black/95 text-white flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full bg-[#13131A] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_80px_rgba(245,158,11,0.25)] animate-in zoom-in-95 duration-200">
          
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <ShieldAlert className="w-8 h-8" strokeWidth={2} />
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 inline-block mb-2">
            Single-Device License Protection
          </span>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            Active on Another Device
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
            Your PeopleReading account (<strong className="text-zinc-200">{user.email}</strong>) was opened on:
          </p>

          <div className="my-3 py-2 px-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-amber-300">
            📱 {otherDeviceInfo || 'Another Phone / Computer'}
          </div>

          <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
            To prevent unauthorized sharing and protect digital editions, only one device can read at a time.
          </p>

          <div className="space-y-2.5">
            <button
              onClick={handleTakeoverSession}
              disabled={isReclaiming}
              className="w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isReclaiming ? 'animate-spin' : ''}`} />
              <span>{isReclaiming ? 'Transferring...' : 'Use on This Device Instead'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-all cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW C: THE PROTECTED DIGITAL READER EXPERIENCE
  // -------------------------------------------------------------
  const userPurchases = user?.purchasedBooks || [];
  const isBundleOwner = userPurchases.includes('bundle') || userPurchases.length >= 5;

  return (
    <div
      className={`min-h-screen flex flex-col select-none transition-colors duration-200 font-sans ${themeStyles[readerTheme]}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Dynamic faint DRM background watermark */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.035] flex items-center justify-center select-none rotate-[-25deg]">
        <div className="text-center font-mono font-black text-2xl sm:text-4xl leading-loose">
          LICENSED TO: {user.name?.toUpperCase()} • {user.email?.toUpperCase()}
          <br />
          PROPRIETARY DIGITAL EDITION • UNAUTHORIZED SHARING PROHIBITED
        </div>
      </div>

      {/* ================= TOP READER NAVIGATION BAR ================= */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-black/75 border-b border-white/10 px-2.5 sm:px-6 py-2 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Left Side: Library Drawer Toggle & Active Book Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer shrink-0"
            title="Table of Contents & Library"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Book Title & Chapter Badge */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-xs sm:text-sm font-black text-white truncate max-w-[100px] xs:max-w-[150px] sm:max-w-[220px]">
              {bookContent?.title || 'PeopleReading'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-amber-300 border border-white/15 shrink-0">
              Ch. {currentChapter?.number || '01'}
            </span>
          </div>
        </div>

        {/* Right Controls: Widget, Theme, Font, Logout */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          
          {/* Offline / Online Badge */}
          {isOffline ? (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold">
              <WifiOff className="w-3 h-3" />
              <span className="hidden md:inline">Offline</span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
              <Wifi className="w-2.5 h-2.5" />
              <span className="hidden md:inline">Connected</span>
            </div>
          )}

          {/* Install Phone Widget Button */}
          <button
            onClick={handleInstallPhoneWidget}
            className="flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold transition-all cursor-pointer"
            title="Add Phone Reading Widget / Read Offline"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Phone Widget</span>
          </button>

          {/* Font Size Adjuster */}
          <button
            onClick={() => {
              const sizes = ['small', 'medium', 'large', 'xl'];
              const next = sizes[(sizes.indexOf(fontSize) + 1) % sizes.length];
              setFontSize(next);
            }}
            className="p-1.5 sm:px-2 sm:py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all text-xs font-mono font-bold flex items-center gap-0.5 cursor-pointer"
            title="Cycle Font Size"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase hidden sm:inline">{fontSize}</span>
          </button>

          {/* Reader Color Theme Selector */}
          <button
            onClick={() => {
              const themes = ['dark', 'sepia', 'cream'];
              const next = themes[(themes.indexOf(readerTheme) + 1) % themes.length];
              setReaderTheme(next);
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
            title="Toggle Reader Mode (Dark / Sepia / Cream)"
          >
            {readerTheme === 'dark' && <Moon className="w-4 h-4 text-amber-300" />}
            {readerTheme === 'sepia' && <Coffee className="w-4 h-4 text-amber-700" />}
            {readerTheme === 'cream' && <Sun className="w-4 h-4 text-yellow-600" />}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-300 transition-all cursor-pointer"
            title={`Logged in as ${user.email}. Click to Logout.`}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Reading Progress Indicator */}
      <div className="w-full h-1 bg-white/5 relative z-30">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300"
          style={{ width: `${((currentChapterIndex + 1) / totalChapters) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex relative overflow-hidden">
        
        {/* Backdrop overlay for mobile drawer */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs z-40 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ================= TABLE OF CONTENTS & BOOK SWITCHER SIDEBAR ================= */}
        {sidebarOpen && (
          <aside className="fixed inset-y-0 left-0 w-[85vw] max-w-xs sm:w-80 bg-[#0B0F19] text-white z-50 border-r border-white/15 p-4 sm:p-5 flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-black text-white">Your Library</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Book Selector List */}
            <div className="py-3">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                Purchased Books
              </span>
              <div className="space-y-1.5">
                {BOOKS_DATA.map((b) => {
                  const isPurchased =
                    isBundleOwner ||
                    userPurchases.includes(b.id) ||
                    userPurchases.includes('bundle');
                  const isCurrent = activeBookId === b.id;

                  return (
                    <button
                      key={b.id}
                      onClick={() => {
                        if (isPurchased) {
                          setActiveBookId(b.id);
                          setSidebarOpen(false);
                        } else {
                          alert(`This book is locked. Visit the store to unlock "${b.title}".`);
                        }
                      }}
                      className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-500 text-black font-bold shadow-md'
                          : isPurchased
                          ? 'bg-white/5 hover:bg-white/10 text-zinc-200'
                          : 'opacity-40 bg-black/40 text-zinc-500 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: b.themeColor }}
                        />
                        <span className="text-xs truncate">{b.title}</span>
                      </div>
                      {!isPurchased && <Lock className="w-3 h-3 text-zinc-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Book Chapters List */}
            <div className="flex-1 overflow-y-auto pt-3 border-t border-white/10">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                Chapters
              </span>
              <div className="space-y-1">
                {bookContent?.chapters?.map((ch, idx) => (
                  <button
                    key={ch.id || idx}
                    onClick={() => {
                      setCurrentChapterIndex(idx);
                      setSidebarOpen(false);
                      if (readingContainerRef.current) {
                        readingContainerRef.current.scrollTop = 0;
                      }
                    }}
                    className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                      currentChapterIndex === idx
                        ? 'bg-white/10 text-amber-300 font-bold border border-amber-500/30'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="font-mono text-zinc-500 shrink-0">
                      {ch.number}
                    </span>
                    <span className="leading-snug">{ch.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Authenticated user footer with exit link */}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-500 font-mono">READER ID:</span>
                <span className="text-amber-300 font-mono font-bold">{user.userId || 'PR-ACTIVE'}</span>
              </div>
              <div className="text-xs text-white font-bold truncate">
                {user.name}
              </div>
              <div className="text-[11px] text-zinc-400 font-mono truncate">
                {user.email}
              </div>
              {user.phone && (
                <div className="text-[11px] text-zinc-500 font-mono">
                  {user.phone}
                </div>
              )}
              <Link
                href="/"
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 pt-1.5 transition-colors font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Homepage</span>
              </Link>
            </div>
          </aside>
        )}

        {/* ================= MAIN READING VIEW ================= */}
        <main
          ref={readingContainerRef}
          className="flex-1 overflow-y-auto px-3.5 sm:px-8 py-5 sm:py-12 flex justify-center relative scroll-smooth"
        >
          {isLoadingContent ? (
            <div className="flex flex-col items-center justify-center my-auto space-y-4 py-24">
              <div className="w-12 h-12 rounded-full border-3 border-amber-500/20 border-t-amber-400 animate-spin" />
              <p className="text-xs font-mono text-zinc-400">Loading protected chapter...</p>
            </div>
          ) : contentError ? (
            <div className="max-w-md my-auto text-center p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30">
              <h3 className="text-base font-bold text-rose-300">Could Not Open Book</h3>
              <p className="text-xs text-zinc-400 mt-2">{contentError}</p>
              <button
                onClick={() => loadBookContent(activeBookId, user.email, sessionToken)}
                className="mt-4 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : currentChapter ? (
            <article className="w-full max-w-2xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
              
              {/* Chapter Header */}
              <header className="border-b pb-4 sm:pb-6 border-current/15">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase opacity-70 mb-1.5">
                  <span>Chapter {currentChapter.number}</span>
                  <span>•</span>
                  <span>{currentChapter.readTime || '20 min'}</span>
                </div>
                <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight leading-snug">
                  {currentChapter.title}
                </h1>
                {currentChapter.subtitle && (
                  <p className="text-xs sm:text-base opacity-75 mt-1.5 font-medium leading-relaxed">
                    {currentChapter.subtitle}
                  </p>
                )}
              </header>

              {/* Chapter Sections */}
              <div className={`space-y-5 sm:space-y-6 ${fontSizes[fontSize]}`}>
                {currentChapter.sections?.map((sec, sIdx) => (
                  <section key={sIdx} className="space-y-3">
                    {sec.heading && (
                      <h2 className="text-base sm:text-xl font-bold tracking-tight pt-2 sm:pt-3 text-amber-400">
                        {sec.heading}
                      </h2>
                    )}

                    {sec.paragraphs?.map((p, pIdx) => (
                      <p key={pIdx} className="text-left leading-relaxed">
                        {p}
                      </p>
                    ))}

                    {/* Key Takeaway Highlight Card */}
                    {sec.keyTakeaway && (
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 my-3.5 text-xs sm:text-sm font-medium text-amber-200">
                        <strong className="block text-[11px] font-mono uppercase tracking-wider text-amber-300 mb-1">
                          💡 Core Principle:
                        </strong>
                        {sec.keyTakeaway}
                      </div>
                    )}

                    {/* Word-for-word Script Card */}
                    {sec.script && (
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/15 my-3.5 space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                          💬 Field Script ({sec.script.context})
                        </span>
                        <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-xs sm:text-sm text-amber-300 break-words">
                          {sec.script.say}
                        </div>
                        <p className="text-[11px] sm:text-xs text-zinc-400 italic">
                          Why it works: {sec.script.whyItWorks}
                        </p>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Bottom Chapter Pagination Controls */}
              <div className="pt-6 sm:pt-8 border-t border-current/15 flex items-center justify-between gap-2">
                <button
                  disabled={currentChapterIndex === 0}
                  onClick={() => {
                    setCurrentChapterIndex((prev) => Math.max(0, prev - 1));
                    if (readingContainerRef.current) {
                      readingContainerRef.current.scrollTop = 0;
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
                    currentChapterIndex === 0
                      ? 'opacity-30 cursor-not-allowed'
                      : 'bg-white/10 hover:bg-white/20 active:scale-95'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 shrink-0" />
                  <span className="hidden xs:inline">Previous Chapter</span>
                  <span className="xs:hidden">Prev</span>
                </button>

                <span className="text-[11px] sm:text-xs font-mono opacity-60 shrink-0">
                  {currentChapterIndex + 1} / {totalChapters}
                </span>

                <button
                  disabled={currentChapterIndex >= totalChapters - 1}
                  onClick={() => {
                    setCurrentChapterIndex((prev) => Math.min(totalChapters - 1, prev + 1));
                    if (readingContainerRef.current) {
                      readingContainerRef.current.scrollTop = 0;
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
                    currentChapterIndex >= totalChapters - 1
                      ? 'opacity-30 cursor-not-allowed'
                      : 'bg-white/10 hover:bg-white/20 active:scale-95'
                  }`}
                >
                  <span className="hidden xs:inline">Next Chapter</span>
                  <span className="xs:hidden">Next</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              </div>

            </article>
          ) : null}
        </main>
      </div>

      {/* ================= PHONE WIDGET INSTALL GUIDE MODAL ================= */}
      {showPwaGuide && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-[#111420] border border-white/20 rounded-3xl p-5 sm:p-6 text-white text-center space-y-4 shadow-2xl max-h-[92dvh] overflow-y-auto">
            <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
              <Smartphone className="w-7 h-7" strokeWidth={2} />
            </div>

            <h3 className="text-xl font-black text-white">
              Add Phone Reading Widget
            </h3>

            <p className="text-xs text-zinc-300 leading-relaxed text-left">
              To place a 1-click reading widget on your phone home screen for offline reading:
            </p>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-left space-y-3 text-xs">
              <div>
                <strong className="text-amber-400 block mb-0.5">🍎 On iPhone (Safari):</strong>
                Tap the <strong>Share button</strong> (square with arrow pointing up) at the bottom, then scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong>.
              </div>
              <div className="pt-2 border-t border-white/10">
                <strong className="text-amber-400 block mb-0.5">🤖 On Android (Chrome):</strong>
                Tap the <strong>3 vertical dots</strong> in the top right corner, then tap <strong>&quot;Install App&quot;</strong> or <strong>&quot;Add to Home Screen&quot;</strong>.
              </div>
            </div>

            <p className="text-[11px] text-zinc-400">
              Once added, you can tap the widget anytime on your phone to read your books even without an internet connection!
            </p>

            <button
              onClick={() => setShowPwaGuide(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs cursor-pointer"
            >
              Got it, Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
