'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Check,
  CheckCheck,
  Sparkles,
  ShieldCheck,
  Lock,
  CreditCard,
  X,
  Copy,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from './types';
import { generateSpeech } from './geminiService';
import { decodeBase64, decodeAudioData } from './audioUtils';
import { getPersonaConfig, getPersonaPrompts } from '../../lib/personaChatConfigs';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  script?: string;
}

export interface PersonaChatExperienceProps {
  personaId?: string;
  initialMessage?: string;
  onClose?: () => void;
  isModal?: boolean;
  onBuyBook?: (book: any) => void;
}

export default function PersonaChatExperience({
  personaId = 'the-heart-reader',
  initialMessage = '',
  onClose,
  isModal = false,
  onBuyBook,
}: PersonaChatExperienceProps) {
  // Resolve Persona Configuration
  const persona = useMemo(() => getPersonaConfig(personaId), [personaId]);

  // Dynamic Book & Price Metadata (for popup and payment)
  const bookPriceNumeric = useMemo(() => {
    return parseInt(String(persona.price || '449').replace(/[^\d]/g, ''), 10) || 449;
  }, [persona.price]);
  const bookPriceDisplay = persona.price || `₹${bookPriceNumeric}`;
  const bookTitleText = persona.bookTitle || persona.name;

  const { language: contextLang, setLanguage: setContextLang } = useLanguage();
  const [activeLang, setActiveLang] = useState<Language>(() => {
    if (contextLang === 'Tamil') return Language.TAMIL;
    if (contextLang === 'Tanglish') return Language.TANGLISH;
    return Language.ENGLISH;
  });

  // Current suggestions for this persona and language
  const suggestions = useMemo(() => {
    return getPersonaPrompts(persona, activeLang);
  }, [persona, activeLang]);

  // Time formatter (e.g. "10:45 am")
  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  // Chat message stream (starts empty so only suggestion questions show in hero)
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  // Voice Engine State
  const [voiceAutoPlay, setVoiceAutoPlay] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // 5-minute Free Consultation Timer State (300 seconds)
  const TOTAL_FREE_SECONDS = 300;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(TOTAL_FREE_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [showPayModal, setShowPayModal] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Pre-fill input if initialMessage was passed
  useEffect(() => {
    if (initialMessage) {
      setInput(initialMessage);
    }
  }, [initialMessage]);

  // Sync language with global context
  useEffect(() => {
    if (contextLang) {
      if (contextLang === 'Tamil') setActiveLang(Language.TAMIL);
      else if (contextLang === 'Tanglish') setActiveLang(Language.TANGLISH);
      else setActiveLang(Language.ENGLISH);
    }
  }, [contextLang]);

  const handleLangChange = (lang: Language) => {
    setActiveLang(lang);
    if (setContextLang) setContextLang(lang);
  };

  // Scroll to bottom smoothly
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isLocked]);

  // Audio Context Pre-warm on user interaction
  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx({ sampleRate: 24000 });
        }
      }
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    };
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('touchstart', initAudio, { once: true });
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };
  }, []);

  // 5-minute Timer Effect (Interval decrements counter cleanly)
  useEffect(() => {
    if (!isTimerRunning || isPaid || isLocked) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, isPaid, isLocked]);

  // Handle Session Expiration cleanly when timer reaches 0
  useEffect(() => {
    if (secondsRemaining <= 0 && isTimerRunning && !isPaid && !isLocked) {
      setIsLocked(true);
      setIsTimerRunning(false);
      setShowPayModal(true);

      setMessages((prevMsgs) => {
        // Prevent duplicate expiry messages from ever being appended
        if (prevMsgs.some((m) => m.id.startsWith('expiry-'))) {
          return prevMsgs;
        }

        const expiryMsg: Message = {
          id: `expiry-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          sender: 'bot',
          text: `⏳ **Your 5-minute free consultation with ${persona.name} has concluded!**\n\nTo continue your strategy session and unlock unlimited consultation and voice guidance, please unlock the full access pass below.`,
          time: getCurrentTime(),
        };
        return [...prevMsgs, expiryMsg];
      });
    }
  }, [secondsRemaining, isTimerRunning, isPaid, isLocked, persona.name]);

  const triggerSessionStart = () => {
    if (!isTimerRunning && !isPaid && secondsRemaining > 0) {
      setIsTimerRunning(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // -------------------------------------------------------------
  // CLEAN VOICE SYSTEM: STRIP MARKDOWN & PREVENT SPEECH MIXING
  // -------------------------------------------------------------
  const cleanTextForVoice = (rawText: string) => {
    if (!rawText) return '';
    return rawText
      .replace(/```[\s\S]*?```/g, '')
      .replace(/[#*_~`]/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/\[.*?\]/g, '')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{2388}-\u{2BEB}]/gu, '')
      .replace(/Strategic Recommendation:/gi, 'My recommendation is:')
      .replace(/Winning Strategy:/gi, 'Here is the strategy:')
      .replace(/Suggested Script to Send:/gi, 'Here is what you can say:')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const hasTamilScript = (text: string) => /[\u0B80-\u0BFF]/.test(text);

  const stopVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (currentSourceRef.current) {
      try {
        currentSourceRef.current.stop();
      } catch (e) {}
      currentSourceRef.current = null;
    }
    setIsSpeaking(false);
    setSpeakingMessageId(null);
  };

  const playVoice = async (textToSpeak: string, msgId?: string) => {
    if (isSpeaking && speakingMessageId === msgId) {
      stopVoice();
      return;
    }

    stopVoice();

    const cleaned = cleanTextForVoice(textToSpeak);
    if (!cleaned) return;

    setIsSpeaking(true);
    if (msgId) setSpeakingMessageId(msgId);

    // 1. Try Gemini Audio TTS
    try {
      const base64Audio = await generateSpeech(cleaned, activeLang);
      let ctx = audioContextRef.current;
      if (!ctx && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        ctx = new AudioCtx({ sampleRate: 24000 });
        audioContextRef.current = ctx;
      }
      if (!ctx) throw new Error('AudioContext unavailable');

      const audioBytes = decodeBase64(base64Audio);
      const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => {
        setIsSpeaking(false);
        setSpeakingMessageId(null);
        currentSourceRef.current = null;
      };

      currentSourceRef.current = source;
      source.start();
      return;
    } catch (ttsErr) {
      // Fall through to browser native speech synthesis
    }

    // 2. Seamless Browser Native SpeechSynthesis Fallback
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeaking(false);
      setSpeakingMessageId(null);
      return;
    }

    try {
      window.speechSynthesis.resume();
      const utterance = new SpeechSynthesisUtterance(cleaned);

      if (hasTamilScript(cleaned)) {
        utterance.lang = 'ta-IN';
      } else {
        utterance.lang = 'en-IN'; // Indian English handles Tanglish and English naturally
      }

      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        if (hasTamilScript(cleaned)) {
          const taVoice = voices.find((v) => v.lang.includes('ta'));
          if (taVoice) utterance.voice = taVoice;
        } else {
          const inVoice =
            voices.find((v) => v.lang === 'en-IN') ||
            voices.find((v) => v.lang.startsWith('en'));
          if (inVoice) utterance.voice = inVoice;
        }
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        if (msgId) setSpeakingMessageId(msgId);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakingMessageId(null);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setSpeakingMessageId(null);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Native speech error:', e);
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    }
  };

  const handleVoiceIntro = () => {
    const greetingText =
      activeLang === Language.TAMIL
        ? persona.voiceIntro.Tamil
        : activeLang === Language.TANGLISH
        ? persona.voiceIntro.Tanglish
        : persona.voiceIntro.English;
    playVoice(greetingText, 'intro');
  };

  // Speech Recognition (Microphone)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang =
          activeLang === Language.TAMIL || activeLang === Language.TANGLISH ? 'ta-IN' : 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognitionRef.current = recognition;
      }
    }
  }, [activeLang]);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Chrome.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // -------------------------------------------------------------
  // CHAT HANDLER
  // -------------------------------------------------------------
  const handleSendMessage = async (textToSend?: string) => {
    const userText = (textToSend || input).trim();
    if (!userText || isLoading) return;

    if (isLocked && !isPaid) {
      setShowPayModal(true);
      return;
    }

    triggerSessionStart();

    const newMsgId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const userMessage: Message = {
      id: newMsgId,
      sender: 'user',
      text: userText,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          language: activeLang,
          history: messages.slice(-6),
          botId: persona.id,
          botName: persona.name,
          mode: persona.id === 'the-heart-reader' ? 'astrology_heart' : 'expert',
        }),
      });

      let botResponse = '';
      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        botResponse = data.response;
      }

      if (!botResponse) {
        botResponse =
          activeLang === Language.TAMIL
            ? persona.fallbacks.Tamil
            : activeLang === Language.TANGLISH
            ? persona.fallbacks.Tanglish
            : persona.fallbacks.English;
      }

      const botMessageId = `bot-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const botMessage: Message = {
        id: botMessageId,
        sender: 'bot',
        text: botResponse,
        time: getCurrentTime(),
      };

      setMessages((prev) => [...prev, botMessage]);

      if (voiceAutoPlay) {
        playVoice(botResponse, botMessageId);
      }
    } catch (err: any) {
      console.warn('Chat error handled gracefully:', err?.message || err);
      const fallbackText =
        activeLang === Language.TAMIL
          ? persona.fallbacks.Tamil
          : activeLang === Language.TANGLISH
          ? persona.fallbacks.Tanglish
          : persona.fallbacks.English;

      const fallbackMsg: Message = {
        id: `bot-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        sender: 'bot',
        text: fallbackText,
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      if (voiceAutoPlay) playVoice(fallbackText, fallbackMsg.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyScript = (script: string) => {
    navigator.clipboard.writeText(script);
    setCopiedScript(script);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  // Payment Handler: Continue Chat & Get Book
  const handlePayment = async () => {
    try {
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const res = await fetch('/api/payment/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: bookPriceNumeric }),
        });
        const orderData = await res.json();
        if (orderData?.id) {
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID',
            amount: orderData.amount,
            currency: orderData.currency || 'INR',
            name: `${persona.name} — ${bookTitleText}`,
            description: `Continue Chat & Get ${bookTitleText} Book Edition`,
            order_id: orderData.id,
            handler: function () {
              handlePaymentSuccess();
            },
            theme: { color: persona.themeColor },
          };
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
          return;
        }
      }
    } catch (e) {
      console.warn('Razorpay order fallback:', e);
    }
    handlePaymentSuccess();
  };

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setIsLocked(false);
    setShowPayModal(false);

    const unlockMsg: Message = {
      id: `unlock-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      sender: 'bot',
      text: `🎉 **Session Pass & Book Access Activated!**\n\nThank you! You now have unrestricted access to continue chatting with ${persona.name} with voice guidance, plus access to the complete digital book edition of **"${bookTitleText}"**. Continue asking your questions below!`,
      time: getCurrentTime(),
    };
    setMessages((prev) => [...prev, unlockMsg]);
  };

  // Restart chat from beginning (returns cleanly to suggestion questions)
  const restartFromBeginning = () => {
    stopVoice();
    setInput('');
    setIsLoading(false);
    setIsLocked(false);

    if (!isPaid) {
      setSecondsRemaining(TOTAL_FREE_SECONDS);
      setIsTimerRunning(false);
    }
    setShowPayModal(false);
    setMessages([]);
  };

  return (
    <div className={`w-full ${isModal ? 'h-full' : 'min-h-[100dvh]'} bg-black text-white flex justify-center items-center selection:bg-white selection:text-black sm:py-3 relative overflow-hidden font-sans`}>
      
      {/* Dynamic Ambient Genre Glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full blur-[150px] pointer-events-none -z-10 transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${persona.glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Main Container - Luxury Mobile / Desktop App View */}
      <div className={`w-full ${isModal ? 'h-full rounded-2xl' : 'sm:max-w-md md:max-w-2xl h-[100dvh] sm:h-[95vh] sm:rounded-3xl'} bg-[#0a0a0d] flex flex-col relative shadow-[0_0_60px_rgba(0,0,0,0.85)] overflow-hidden border-0 sm:border sm:border-white/10`}>
        
        {/* ================= HEADER (Simple, Focused, No 5-Icon Clutter) ================= */}
        <header className="w-full bg-black/90 backdrop-blur-md border-b border-white/10 px-3.5 py-2.5 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Back / Close Button */}
            {onClose ? (
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/10 active:scale-95 transition-all text-zinc-400 hover:text-white cursor-pointer shrink-0"
                title="Close Chat"
              >
                <X className="w-5 h-5 stroke-[2.2]" />
              </button>
            ) : (
              <Link
                href="/"
                className="p-1 rounded-full hover:bg-white/10 active:scale-95 transition-all text-zinc-400 hover:text-white shrink-0"
                title="Back to Home"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </Link>
            )}

            {/* Avatar DP - Top Scrolling Showcase Picture */}
            <div
              onClick={handleVoiceIntro}
              className="relative w-10 h-10 rounded-full overflow-hidden border-2 flex items-center justify-center shrink-0 select-none cursor-pointer group transition-all"
              style={{
                borderColor: persona.themeColor,
                boxShadow: `0 0 16px ${persona.glowColor}`,
              }}
              title={`Click to hear ${persona.name}'s voice intro`}
            >
              <Image
                src={persona.avatar}
                alt={persona.name}
                width={40}
                height={40}
                className={`w-full h-full object-cover ${isSpeaking ? 'scale-110' : 'group-hover:scale-105'} transition-transform`}
              />
              {isSpeaking && (
                <span
                  className="absolute inset-0 rounded-full border-2 animate-ping"
                  style={{ borderColor: persona.themeColor }}
                />
              )}
            </div>

            {/* Persona Name + Verified Badge + Role Subtitle */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[15px] sm:text-[16px] text-white tracking-tight leading-none truncate">
                  {persona.name}
                </span>
                <div
                  className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center text-black shrink-0"
                  title="Verified Persona"
                >
                  <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5 truncate">
                <span
                  className="text-[11px] font-semibold leading-tight truncate"
                  style={{ color: persona.themeColor }}
                >
                  {persona.roleTitle}
                </span>
                <span className="text-[9px] text-zinc-600">•</span>
                <span className="flex items-center gap-1 text-[11px] text-zinc-300 font-medium leading-tight shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  online
                </span>
              </div>
            </div>
          </div>

          {/* Right Header: Voice Toggle, Timer, Language, Restart */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Voice Mode Toggle (Auto-speak) */}
            <button
              onClick={() => {
                const nextVal = !voiceAutoPlay;
                setVoiceAutoPlay(nextVal);
                if (!nextVal) stopVoice();
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all border cursor-pointer ${
                voiceAutoPlay
                  ? 'bg-white text-black border-white shadow-xs'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-700/80 hover:text-white'
              }`}
              title={voiceAutoPlay ? 'Voice Auto-read: ON (click to mute)' : 'Voice Auto-read: OFF (click to enable)'}
            >
              {voiceAutoPlay ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Voice ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mute</span>
                </>
              )}
            </button>

            {/* 5-minute Free Consultation Countdown Timer */}
            {isPaid ? (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900 text-white text-[11px] font-semibold border border-white/30">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="hidden sm:inline">Unlimited</span>
              </div>
            ) : (
              <button
                onClick={() => isLocked && setShowPayModal(true)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border cursor-pointer ${
                  isLocked
                    ? 'bg-white text-black border-white animate-pulse'
                    : secondsRemaining <= 60
                    ? 'bg-zinc-800 text-white border-white/60 animate-pulse'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-700'
                }`}
                title={isLocked ? 'Session ended. Click to unlock.' : 'Free 5-minute consultation timer'}
              >
                {isLocked ? (
                  <>
                    <Lock className="w-3 h-3 text-black" />
                    <span>Pay</span>
                  </>
                ) : (
                  <>
                    <span className="text-[10px]">⏱️</span>
                    <span>{formatTime(secondsRemaining)}</span>
                  </>
                )}
              </button>
            )}

            {/* Language Switcher */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-full px-1 py-0.5 flex text-[10px] font-semibold text-zinc-400">
              {([Language.ENGLISH, Language.TAMIL, Language.TANGLISH] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLangChange(lang)}
                  className={`px-1.5 py-0.5 rounded-full transition-all cursor-pointer ${
                    activeLang === lang
                      ? 'bg-white text-black font-bold shadow-xs'
                      : 'hover:text-white'
                  }`}
                >
                  {lang === Language.ENGLISH ? 'EN' : lang === Language.TAMIL ? 'தமிழ்' : 'Tang'}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* ================= CHAT CONTAINER ================= */}
        <div
          className="flex-1 overflow-y-auto px-3.5 py-4 relative flex flex-col space-y-3.5 scroll-smooth"
          style={{
            backgroundColor: '#0a0a0d',
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px), radial-gradient(rgba(255, 255, 255, 0.03) 1px, #0a0a0d 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        >
          {/* ================= EMPTY STATE: SHORT SUGGESTION BOXES ON LEFT SIDE ONLY (NO TITLE, NO SUBTITLE, NO SERIAL, NO ARROW) ================= */}
          {messages.length === 0 && (
            <div className="flex-1 flex flex-col justify-end sm:justify-center items-start px-1 sm:px-2 py-4 my-auto z-10 text-left animate-in fade-in duration-300">
              <div className="w-full max-w-sm space-y-2 text-left">
                {suggestions.slice(0, 3).map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="group block w-fit max-w-[92%] px-3.5 py-2.5 rounded-xl bg-[#131318] hover:bg-[#1a1a22] border border-white/10 hover:border-white/30 transition-all duration-150 cursor-pointer text-left shadow-xs hover:shadow active:scale-98"
                  >
                    <span className="text-xs sm:text-[13px] text-zinc-300 group-hover:text-white font-medium leading-relaxed block">
                      {q}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================= ACTIVE MESSAGE STREAM ================= */}
          {messages.length > 0 && (
            <>
              {/* "Today" Capsule Badge */}
              <div className="self-center z-10 my-1">
                <span className="bg-zinc-900/90 text-zinc-300 text-[11px] font-medium px-3.5 py-1 rounded-full shadow-sm border border-zinc-800">
                  Today
                </span>
              </div>

              {messages.map((msg, idx) => {
                const isBot = msg.sender === 'bot';

                return (
                  <div
                    key={`${msg.id || 'msg'}-${idx}`}
                    className={`flex flex-col z-10 animate-in fade-in duration-200 ${
                      isBot ? 'items-start' : 'items-end'
                    }`}
                  >
                    {/* Chat Bubble */}
                    <div
                      className={`relative max-w-[90%] sm:max-w-[82%] px-3.5 py-2.5 rounded-2xl shadow-md text-sm leading-relaxed ${
                        isBot
                          ? 'bg-[#141418] text-zinc-100 rounded-tl-xs border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.6)]'
                          : 'bg-white text-black font-medium rounded-tr-xs shadow-[0_2px_14px_rgba(255,255,255,0.12)]'
                      }`}
                      style={
                        isBot
                          ? {
                              borderLeftWidth: '3px',
                              borderLeftColor: persona.themeColor,
                            }
                          : {}
                      }
                    >
                      {/* Persona Identifier Label inside Bot Bubble */}
                      {isBot && (
                        <div className="flex items-center gap-1.5 pb-1 mb-1 border-b border-white/10 text-[11px] font-bold">
                          <span style={{ color: persona.themeColor }}>{persona.name}</span>
                          <span className="text-[10px] text-zinc-500 font-normal">Strategist</span>
                        </div>
                      )}

                      {/* Message Content */}
                      <div className="whitespace-pre-wrap break-words text-[13.5px] leading-relaxed">
                        {msg.text}
                      </div>

                      {/* Copyable script if present */}
                      {msg.script && (
                        <div className="mt-3 p-3 rounded-xl bg-black border border-white/20 flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-[11px] font-bold text-zinc-300">
                            <span>Tactical Script:</span>
                            <button
                              onClick={() => handleCopyScript(msg.script!)}
                              className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-white text-black font-bold hover:bg-zinc-200 transition-all cursor-pointer"
                            >
                              {copiedScript === msg.script ? (
                                <>
                                  <Check className="w-3 h-3 text-black stroke-[3]" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Script</span>
                                </>
                              )}
                            </button>
                          </div>
                          <p className="text-xs text-white font-medium italic select-all">
                            "{msg.script}"
                          </p>
                        </div>
                      )}

                      {/* Bubble Footer: Timestamp & Audio Speak & Read Receipts */}
                      <div className="flex items-center justify-end gap-1.5 mt-2 select-none">
                        {/* Speaker audio button for Bot replies */}
                        {isBot && (
                          <button
                            onClick={() => playVoice(msg.text, msg.id)}
                            className={`p-1 rounded-full transition-colors cursor-pointer flex items-center gap-1 text-[11px] ${
                              speakingMessageId === msg.id
                                ? 'text-black bg-white font-bold'
                                : 'text-zinc-400 hover:text-white'
                            }`}
                            title={speakingMessageId === msg.id ? 'Stop Voice' : `Listen to ${persona.name}`}
                          >
                            {speakingMessageId === msg.id ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                                <span className="text-[10px]">Playing</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5" />
                                <span className="text-[10px]">Listen</span>
                              </>
                            )}
                          </button>
                        )}

                        {/* Time */}
                        <span
                          className={`text-[10px] font-normal ${
                            isBot ? 'text-zinc-500' : 'text-zinc-600'
                          }`}
                        >
                          {msg.time}
                        </span>

                        {/* Read Receipts for User messages */}
                        {!isBot && (
                          <CheckCheck className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* ================= GEMINI-STYLE LOADING ANIMATION (DIFFERENT GENRE WAVE) ================= */}
          {isLoading && (
            <div className="flex flex-col items-start z-10 w-full max-w-[88%] sm:max-w-[78%] animate-in fade-in duration-300">
              <div className="flex items-center gap-2 mb-2 px-1">
                <span
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ backgroundColor: persona.themeColor }}
                />
                <span
                  className="text-xs font-semibold tracking-wide flex items-center gap-1.5"
                  style={{ color: persona.themeColor }}
                >
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>{persona.typingText}</span>
                </span>
              </div>

              {/* Gemini Fluid Wave Shimmer Box */}
              <div
                className="w-full bg-[#121217] border border-white/10 rounded-2xl rounded-tl-xs p-4 shadow-xl space-y-2.5 relative overflow-hidden"
                style={{
                  borderLeftWidth: '3px',
                  borderLeftColor: persona.themeColor,
                  boxShadow: `0 8px 30px rgba(0,0,0,0.6), 0 0 20px ${persona.glowColor}`,
                }}
              >
                {/* Shimmer Bar 1 */}
                <div
                  className="h-3 rounded-full overflow-hidden"
                  style={{
                    width: '92%',
                    background: `linear-gradient(90deg, rgba(255,255,255,0.05) 0%, ${persona.glowColor} 50%, rgba(255,255,255,0.05) 100%)`,
                    backgroundSize: '200% 100%',
                    animation: 'geminiWave 1.6s infinite ease-in-out',
                  }}
                />
                {/* Shimmer Bar 2 */}
                <div
                  className="h-3 rounded-full overflow-hidden"
                  style={{
                    width: '78%',
                    background: `linear-gradient(90deg, rgba(255,255,255,0.05) 0%, ${persona.glowColor} 50%, rgba(255,255,255,0.05) 100%)`,
                    backgroundSize: '200% 100%',
                    animation: 'geminiWave 1.6s infinite ease-in-out 0.2s',
                  }}
                />
                {/* Shimmer Bar 3 */}
                <div
                  className="h-3 rounded-full overflow-hidden"
                  style={{
                    width: '58%',
                    background: `linear-gradient(90deg, rgba(255,255,255,0.05) 0%, ${persona.glowColor} 50%, rgba(255,255,255,0.05) 100%)`,
                    backgroundSize: '200% 100%',
                    animation: 'geminiWave 1.6s infinite ease-in-out 0.4s',
                  }}
                />
              </div>
            </div>
          )}

          {/* 5-minute Free Limit Reached Card in Chat */}
          {isLocked && !isPaid && (
            <div className="z-10 bg-[#141417] rounded-2xl p-4 shadow-[0_0_30px_rgba(255,255,255,0.08)] border-2 border-white/40 text-center my-2 animate-in slide-in-from-bottom duration-300">
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mx-auto mb-2">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                Continue Chat & Get {bookTitleText}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Your 5-minute free session has concluded. Continue chatting with {persona.name} and get the complete digital book edition of &quot;{bookTitleText}&quot;.
              </p>
              <div className="mt-3.5">
                <button
                  onClick={() => setShowPayModal(true)}
                  className="w-full bg-white hover:bg-zinc-200 text-black font-extrabold py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-black" />
                  <span>Continue Chat & Get Book ({bookPriceDisplay})</span>
                </button>
              </div>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* ================= FOLLOW-UP SUGGESTIONS ROW (When Messages Exist) ================= */}
        {messages.length > 0 && !isLoading && !isLocked && (
          <div className="bg-[#0a0a0d] border-t border-white/5 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 z-10">
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-zinc-400" />
              <span>Ask:</span>
            </span>
            {suggestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 hover:border-white/30 transition-all cursor-pointer active:scale-95 shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* ================= BOTTOM MESSAGE INPUT BAR ================= */}
        <div className="bg-black border-t border-white/10 px-3 py-2.5 shrink-0 z-20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Input Field */}
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLocked && !isPaid}
                placeholder={
                  isLocked && !isPaid
                    ? 'Free 5-min session ended. Unlock to chat...'
                    : activeLang === Language.TAMIL
                    ? `${persona.name}-யிடம் உங்கள் கேள்வியைத் தட்டச்சு செய்க...`
                    : activeLang === Language.TANGLISH
                    ? `Ask ${persona.name} what to do macha...`
                    : `Ask ${persona.name} for actionable advice or tactics...`
                }
                className="w-full bg-[#111113] text-white placeholder:text-zinc-500 text-base sm:text-sm py-2.5 pl-4 pr-10 rounded-full border border-zinc-800 focus:outline-none focus:border-white focus:ring-1 focus:ring-white shadow-inner disabled:bg-zinc-900 disabled:text-zinc-600"
              />

              {/* Microphone Speech Button */}
              <button
                type="button"
                onClick={toggleMic}
                disabled={isLocked && !isPaid}
                className={`absolute right-2 p-1.5 rounded-full transition-all cursor-pointer ${
                  isListening
                    ? 'bg-white text-black animate-pulse'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title={isListening ? 'Stop listening' : 'Speak via microphone'}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={(!input.trim() && !isLocked) || isLoading}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-black shrink-0 shadow-md transition-all active:scale-95 cursor-pointer ${
                isLocked && !isPaid
                  ? 'bg-zinc-700 text-white'
                  : input.trim()
                  ? 'bg-white hover:bg-zinc-200 font-bold'
                  : 'bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed'
              }`}
              title={isLocked && !isPaid ? 'Unlock Session' : 'Send message'}
            >
              {isLocked && !isPaid ? (
                <Lock className="w-4 h-4 text-white" />
              ) : (
                <Send className="w-4 h-4 translate-x-0.5 text-black" />
              )}
            </button>
          </form>
        </div>

        {/* ================= BOTTOM DISCLAIMER ================= */}
        <footer className="w-full bg-[#08080a] border-t border-white/10 py-1.5 px-3 text-center shrink-0 z-20">
          <p className="text-[11px] text-zinc-400 font-medium tracking-tight">
            ℹ️ <span className="font-semibold text-white">Note:</span> This is only for understanding purpose.
          </p>
        </footer>

        {/* ================= PAYMENT MODAL ================= */}
        {showPayModal && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-[#111113] rounded-3xl p-6 shadow-[0_0_60px_rgba(255,255,255,0.12)] border border-white/20 flex flex-col items-center text-center relative animate-in slide-in-from-bottom duration-300">
              
              {/* Close button */}
              <button
                onClick={() => setShowPayModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Persona Avatar in Modal */}
              <div
                className="w-16 h-16 rounded-full overflow-hidden border-2 mb-3 shadow-lg"
                style={{
                  borderColor: persona.themeColor,
                  boxShadow: `0 0 25px ${persona.glowColor}`,
                }}
              >
                <Image
                  src={persona.avatar}
                  alt={persona.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-xl font-black text-white">
                Continue Chat & Get {bookTitleText}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Unlock unlimited consultation with {persona.name} and get the complete digital book edition.
              </p>

              {/* Price Tag */}
              <div className="my-4 py-2.5 px-6 bg-black rounded-2xl border border-white/20 shadow-inner">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Combo Access Pass</span>
                <span className="text-3xl font-black text-white tracking-tight">{bookPriceDisplay}</span>
                <span className="text-xs text-zinc-400 block mt-0.5">Continue Chat + Full Book Edition</span>
              </div>

              {/* Perks */}
              <div className="w-full text-left space-y-2 text-xs text-zinc-300 mb-5 bg-black/60 p-3.5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Continue unlimited chat with {persona.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Get complete digital edition of &quot;{bookTitleText}&quot; book</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Master-level psychological diagnostics & word-for-word scripts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Real-time Voice Synthesis in English, Tamil & Tanglish</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-2">
                <button
                  onClick={handlePayment}
                  className="w-full bg-white hover:bg-zinc-200 text-black font-extrabold py-3 px-4 rounded-2xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>Pay {bookPriceDisplay} & Continue Chat + Get Book</span>
                </button>

                {/* Instant Demo Pay for quick verification */}
                <button
                  onClick={handlePaymentSuccess}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-2 px-4 rounded-2xl border border-zinc-700 transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Test instant payment without card/UPI"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Instant Demo Payment (Test)</span>
                </button>
              </div>

              <p className="text-[10px] text-zinc-500 mt-3">
                🔒 256-bit Secure Checkout • For understanding purpose only
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
