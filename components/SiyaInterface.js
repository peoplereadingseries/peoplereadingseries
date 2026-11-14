'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

export default function SiyaInterface() {
    const { language, t } = useLanguage(); // Global language state

    // Chat & History State
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [currentSessionId, setCurrentSessionId] = useState(null);
    const messagesEndRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // New State for Modes and View
    // chatMode: null (home), 'crush', 'expert', 'lust'
    const [chatMode, setChatMode] = useState(null);
    // view: 'home', 'chat', 'form'
    const [view, setView] = useState('home');

    // Sidebar State - Gemini Style
    // Defaults to true on large screens, false on mobile
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Form Data
    const [formData, setFormData] = useState({
        dressing: '',
        energy: '',
        vibe: '',
        demeanor: ''
    });

    const formOptions = {
        dressing: ['Casual', 'Chic', 'Formal', 'Party', 'Traditional', 'Minimal', 'Glam', 'Edgy', 'Comfy'],
        energy: ['Chill', 'High', 'Nervous', 'Confident', 'Low Key', 'Excited', 'Tired', 'Focused'],
        vibe: ['Flirty', 'Friendly', 'Professional', 'Distant', 'Warm', 'Mysterious', 'Playful', 'Intense'],
        demeanor: ['Open', 'Closed Off', 'Smiling', 'Serious', 'Eye Contact', 'Fidgety', 'Relaxed', 'Shy']
    };

    // --- Effects ---

    // Load history from localStorage on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem('siya_chat_history');
        if (savedHistory) {
            try {
                setChatHistory(JSON.parse(savedHistory));
            } catch (e) {
                console.error("Failed to parse chat history", e);
            }
        }

        // Responsive sidebar initial state
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        // Set initial state
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Save history to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('siya_chat_history', JSON.stringify(chatHistory));
    }, [chatHistory]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // --- Speech Logic ---

    // Speech to Text (Microphone)
    const toggleListening = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert("Your browser doesn't support speech recognition. Try Chrome.");
            return;
        }

        if (isListening) {
            setIsListening(false);
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        if (language === 'Tamil') recognition.lang = 'ta-IN';
        else if (language === 'Tanglish') recognition.lang = 'ta-IN';
        else if (language === 'Hindi') recognition.lang = 'hi-IN';
        else recognition.lang = 'en-US';

        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setIsListening(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput((prev) => prev ? prev + " " + transcript : transcript);
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Speech error:", event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    // Text to Speech (Speaker)
    // Load voices on mount
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        const updateVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            console.log("Available voices:", availableVoices.map(v => `${v.name} (${v.lang})`)); // Debugging
            setVoices(availableVoices);
        };

        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            updateVoices();
            window.speechSynthesis.onvoiceschanged = updateVoices;
        }

        return () => {
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.onvoiceschanged = null;
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const getBestVoice = (lang) => {
        const available = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
        if (available.length === 0) return null;

        let selected = null;

        const findVoice = (scenarios) => {
            for (const scenario of scenarios) {
                // scenario is an array of checks: [langCheck, nameCheck]
                // or just a custom finder function
                const found = available.find(v => {
                    if (typeof scenario === 'function') return scenario(v);
                    const [langPattern, namePattern] = scenario;
                    return v.lang.includes(langPattern) && (namePattern ? v.name.includes(namePattern) : true);
                });
                if (found) return found;
            }
            return null;
        };

        if (lang === 'Hindi') {
            // Priority: Microsoft Swara (Natural), Google Hindi, any Hindi
            selected = findVoice([
                v => v.name.includes('Swara') && v.name.includes('Natural'), // Microsoft Natural
                ['hi', 'Google'],
                ['hi', 'Microsoft'],
                ['hi', null]
            ]);
        } else if (lang === 'Tamil') {
            // Priority: Microsoft Pallavi (Natural), Google Tamil, any Tamil
            selected = findVoice([
                v => v.name.includes('Pallavi') && v.name.includes('Natural'),
                ['ta', 'Google'],
                ['ta', 'Microsoft'],
                ['ta', null]
            ]);
        } else if (lang === 'Tanglish') {
            // Indian English - Priority: Microsoft Neerja/Prabhat (Natural), Google India, any Indian English
            selected = findVoice([
                v => (v.name.includes('Neerja') || v.name.includes('Prabhat')) && v.name.includes('Natural'),
                ['en-IN', 'Google'],
                ['en-IN', 'Microsoft'],
                ['en-IN', null]
            ]);
        } else {
            // English - Priority: Microsoft Aria/Guy (Natural), Google US, any English
            selected = findVoice([
                v => (v.name.includes('Aria') || v.name.includes('Guy')) && v.name.includes('Natural'),
                ['en-US', 'Google'],
                ['en-US', 'Microsoft'],
                ['en', 'Google'],
                ['en', null]
            ]);
        }

        return selected;
    };

    const cleanTextForSpeech = (rawText) => {
        if (!rawText) return '';
        return rawText
            .replace(/```[\s\S]*?```/g, '') // remove code blocks
            .replace(/`([^`]+)`/g, '$1') // inline code
            .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
            .replace(/\*([^*]+)\*/g, '$1') // italic
            .replace(/#+\s+/g, '') // headers
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // link text
            .replace(/[-*•]\s+/g, '') // bullet points
            .replace(/\s+/g, ' ') // collapse whitespace
            .trim();
    };

    const speakText = (text) => {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
            alert("Text-to-speech not supported in this browser.");
            return;
        }

        // Cancel any active speech
        window.speechSynthesis.cancel();

        // If currently speaking, clicking acts as a toggle to stop
        if (isSpeaking) {
            setIsSpeaking(false);
            return;
        }

        const cleanedText = cleanTextForSpeech(text);
        if (!cleanedText) return;

        // Brief delay allows the browser's audio pipeline to flush the cancel command
        setTimeout(() => {
            try {
                window.speechSynthesis.resume(); // Workaround for Chromium engine stall
                const utterance = new SpeechSynthesisUtterance(cleanedText);

                // Ensure proper language tag is set
                if (language === 'Tamil') utterance.lang = 'ta-IN';
                else if (language === 'Hindi') utterance.lang = 'hi-IN';
                else if (language === 'Tanglish') utterance.lang = 'en-IN';
                else utterance.lang = 'en-US';

                const selectedVoice = getBestVoice(language);
                if (selectedVoice) {
                    utterance.voice = selectedVoice;
                }

                const isNatural = selectedVoice?.name?.includes('Natural');
                utterance.rate = isNatural ? 1.0 : 0.95;
                utterance.pitch = 1.0;

                utterance.onstart = () => setIsSpeaking(true);
                utterance.onend = () => setIsSpeaking(false);
                utterance.onerror = (e) => {
                    // 'canceled' and 'interrupted' are expected when user cancels, stops, or switches speech
                    if (e.error === 'canceled' || e.error === 'interrupted') {
                        setIsSpeaking(false);
                        return;
                    }
                    console.warn("Speech synthesis notice:", e.error || e);
                    setIsSpeaking(false);
                };

                setIsSpeaking(true);
                window.speechSynthesis.speak(utterance);
            } catch (err) {
                console.warn("Speech synthesis invocation failed:", err);
                setIsSpeaking(false);
            }
        }, 50);
    };

    // --- Chat Logic ---

    const createNewSession = (initialMessage, mode = 'chat') => {
        const newId = Date.now().toString();
        const newSession = {
            id: newId,
            title: initialMessage.length > 30 ? initialMessage.substring(0, 30) + '...' : initialMessage,
            messages: [],
            timestamp: Date.now(),
            mode: mode
        };
        return newSession;
    };

    const handleSend = async (manualInput = null, modeOverride = null) => {
        const textToSend = manualInput || input;
        const currentMode = modeOverride || chatMode || 'default';

        if (!textToSend.trim() || isLoading) return;

        // User message
        const userMessage = { role: 'user', content: textToSend };

        // Optimistic update for UI
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        // Session Management
        let sessionId = currentSessionId;
        let sessionToUpdate;

        if (!sessionId) {
            // Create new session if none exists
            sessionToUpdate = createNewSession(textToSend, currentMode);
            sessionId = sessionToUpdate.id;
            setCurrentSessionId(sessionId);
            // Add initial user message to session
            sessionToUpdate.messages = [userMessage];

            setChatHistory(prev => [sessionToUpdate, ...prev]);
            setView('chat'); // Ensure we are in chat view
        } else {
            // Update existing session
            setChatHistory(prev => prev.map(session => {
                if (session.id === sessionId) {
                    return { ...session, messages: [...session.messages, userMessage] };
                }
                return session;
            }));
        }

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage.content,
                    language: language,
                    history: messages, // Send current context
                    // Include any specific session info if needed by API
                    mode: currentMode
                }),
            });

            let botReply = '';
            if (response.ok) {
                const data = await response.json().catch(() => ({}));
                botReply = data.response;
            }
            if (!botReply) {
                botReply = "I can sense what you are feeling. Share a little more about what happened, and let's decode their heart together.";
            }

            const aiMessage = { role: 'ai', content: botReply };
            const finalMessages = [...updatedMessages, aiMessage];

            setMessages(finalMessages);

            // Update session with AI response
            setChatHistory(prev => prev.map(session => {
                if (session.id === sessionId) {
                    return { ...session, messages: finalMessages };
                }
                return session;
            }));

        } catch (error) {
            console.warn("Handled response fetch issue:", error?.message || error);
            const errorMessage = { role: 'ai', content: t('siya.connectionError') };
            setMessages(prev => [...prev, errorMessage]);

            // Update session with Error
            setChatHistory(prev => prev.map(session => {
                if (session.id === sessionId) {
                    return { ...session, messages: [...session.messages, errorMessage] };
                }
                return session;
            }));

        } finally {
            setIsLoading(false);
        }
    };

    const loadSession = (session) => {
        setCurrentSessionId(session.id);
        setMessages(session.messages);
        setChatMode(session.mode);
        setView('chat');
        if (window.innerWidth < 1024) {
            setSidebarOpen(false); // Close sidebar on mobile on selection
        }
    };

    const startNewChat = () => {
        setCurrentSessionId(null);
        setMessages([]);
        setChatMode(null);
        setView('home');
        setInput('');
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    const handleModeSelect = (modeKey) => {
        if (modeKey === 'crush') {
            setChatMode('crush');
            setView('form');
        } else {
            // Start a new chat immediately with this mode
            startNewChat();
            setChatMode(modeKey);
            setView('chat');
        }
    };

    const handleHomeClick = () => {
        startNewChat();
    };

    const handleFormSubmit = () => {
        const { dressing, energy, vibe, demeanor } = formData;
        const structuredMessage = `
Context Analysis:
Dressing/Makeup: ${dressing}
Energy Level: ${energy}
Vibe: ${vibe}
Demeanor: ${demeanor}
User Input/Observation: "${input}"
        `.trim();
        handleSend(structuredMessage, 'crush');
        // Switch to chat view to see response
        setView('chat');
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const suggestions = [
        { id: 'crush', title: t('siya.options.crush') || 'Crush Unreveal', icon: '✨' },
        { id: 'expert', title: 'Expert Panel', icon: '🧠' },
        { id: 'lust', title: 'Lust', icon: '🔥' }
    ];

    return (
        <div className="flex h-screen bg-[#131314] text-white overflow-hidden font-sans selection:bg-neon-pink selection:text-white relative">

            {/* Mobile Overlay/Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden user-select-none"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Gemini Exact Style */}
            <div className={`
                fixed lg:translate-x-0 top-0 left-0 bottom-0 z-30
                w-[240px] bg-[#1e1f20] transition-transform duration-300 transform
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                flex flex-col border-r border-white/5
            `}>
                <div className="p-4 pt-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-2 pl-2">
                        {/* Menu Icon inside Sidebar (also toggles) */}
                        <button onClick={toggleSidebar} className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                    </div>

                    {/* New Chat Button - Exact Gemini Style (Pill with +) */}
                    <button
                        onClick={startNewChat}
                        className="bg-[#282a2c] hover:bg-[#37393b] text-white/90 py-3 px-4 rounded-full flex items-center gap-3 transition-all w-fit pr-6"
                    >
                        <span className="text-2xl font-light text-white/80">+</span>
                        <span className="font-medium text-sm text-white/90">New Chat</span>
                    </button>
                </div>

                {/* History List - Scrollable */}
                <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                    <div className="px-4 py-3 text-xs font-semibold text-white/70 uppercase tracking-wider">Recent</div>

                    {chatHistory.length === 0 ? (
                        <div className="text-white/30 text-sm px-4 py-2 italic">No recent chats</div>
                    ) : (
                        chatHistory.map((session) => (
                            <button
                                key={session.id}
                                onClick={() => loadSession(session)}
                                className={`w-full text-left px-4 py-2.5 rounded-full flex items-center gap-3 transition-colors group relative overflow-hidden ${currentSessionId === session.id
                                    ? 'bg-[#004a77] text-white' // Gemini active blue-ish
                                    : 'text-white/80 hover:bg-[#282a2c] hover:text-white'}`}
                            >
                                <span className="text-lg opacity-70">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                </span>
                                <span className="font-normal text-sm truncate block flex-1">{session.title}</span>

                                {/* Hover options could go here (delete, rename) */}
                            </button>
                        ))
                    )}
                </div>

                {/* Bottom Section - Settings/Location etc */}
                <div className="mt-auto p-2 border-t border-white/5">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-[#282a2c] transition-colors text-white/80 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                        <span className="text-sm font-medium">Home</span>
                    </Link>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-[#282a2c] transition-colors cursor-pointer text-white/80 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Settings</span>
                        </div>
                    </div>
                    <div className="px-4 py-2 text-[10px] text-white/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Chennai, India
                    </div>
                </div>
            </div>


            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col relative h-full transition-all duration-300 ${sidebarOpen ? 'lg:pl-[240px]' : ''}`}>

                {/* Top Bar (Mobile / Menu Toggle when Sidebar Closed) */}
                <div className="absolute top-4 left-4 z-40 flex items-center gap-3">
                    {!sidebarOpen && (
                        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-[#282a2c] text-white/70 hover:text-white transition-colors lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                    )}
                    <span className="font-semibold text-lg bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent select-none lg:hidden">Siya AI</span>
                </div>

                {/* Content - Chat or Form */}
                <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto p-4 md:p-8 pb-32 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 lg:[&::-webkit-scrollbar]:hidden lg:[scrollbar-width:none] pt-16">

                    {/* Welcome Screen */}
                    {view === 'home' && (
                        <div className="h-full flex flex-col justify-center items-start lg:items-center mt-[-5vh]">
                            <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-[#ff2a6d] lg:text-center mb-2">
                                Hi, I am Siya
                            </h1>
                            <h2 className="text-4xl md:text-5xl font-medium text-white mb-12 lg:text-center">
                                Where should we start?
                            </h2>

                            {/* Suggestions Grid - Gemini Mobile Style (Narrow Vertical List, Left Aligned, Rounded Border) */}
                            <div className="grid grid-cols-1 gap-2 w-full max-w-[280px] ml-0 lg:grid-cols-3 lg:max-w-xl lg:mx-auto lg:gap-3">
                                {suggestions.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleModeSelect(item.id)}
                                        className="bg-[#1e1f20] hover:bg-[#282a2c] p-3 rounded-2xl border border-white/10 text-left transition-colors group relative overflow-hidden flex flex-row items-center gap-4 h-auto lg:flex-col lg:justify-between lg:items-center lg:text-center lg:gap-2"
                                    >
                                        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity lg:hidden">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bg-black/40 rounded-full p-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                        </div>
                                        <span className="text-2xl lg:text-2xl shrink-0">{item.icon}</span>
                                        <div className="font-medium text-white/90 text-sm leading-tight lg:text-sm">{item.title}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Chat View */}
                    {view === 'chat' && (
                        <div className="space-y-6 pt-4">
                            {messages.length === 0 && (
                                <div className="text-center text-white/30 py-10">
                                    <div className="text-4xl mb-2">{chatMode === 'expert' ? '🧠' : chatMode === 'lust' ? '🔥' : chatMode === 'crush' ? '✨' : '💬'}</div>
                                    <p className="text-sm uppercase tracking-widest">{chatMode || 'General'} Mode Active</p>
                                </div>
                            )}

                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user'
                                        ? 'bg-[#282a2c] text-white rounded-tr-sm'
                                        : 'text-white/90 leading-relaxed'}`}>

                                        {msg.role === 'ai' && (
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple flex items-center justify-center text-[10px] font-bold">SA</div>
                                                <span className="text-xs font-medium text-white/60">Siya</span>
                                            </div>
                                        )}

                                        <div className="whitespace-pre-wrap">{msg.content}</div>

                                        {msg.role === 'ai' && (
                                            <div className="mt-2 flex gap-2">
                                                <button
                                                    onClick={() => speakText(msg.content)}
                                                    className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${isSpeaking ? 'text-neon-pink' : 'text-white/40'}`}
                                                    title="Read aloud"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple flex items-center justify-center text-[10px] font-bold animate-pulse">SA</div>
                                    <div className="text-white/50 text-sm">Thinking...</div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}

                    {/* Form View (same as before but styled darker) */}
                    {view === 'form' && (
                        <div className="max-w-2xl mx-auto space-y-8 pt-4">
                            <h3 className="text-2xl font-medium text-white">Share some details first</h3>

                            {Object.entries(formOptions).map(([category, options]) => (
                                <div key={category} className="space-y-3">
                                    <label className="text-xs text-white/50 uppercase tracking-widest font-semibold">{t(`siya.form.${category}`) || category}</label>
                                    <div className="flex flex-wrap gap-2">
                                        {options.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setFormData(prev => ({ ...prev, [category]: option }))}
                                                className={`px-4 py-2 rounded-full text-sm transition-all border ${formData[category] === option
                                                    ? 'bg-[#3c4043] text-white border-transparent'
                                                    : 'bg-[#1e1f20] text-white/70 border-white/5 hover:border-white/20'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="pt-4">
                                <label className="text-xs text-white/50 uppercase tracking-widest font-semibold mb-3 block">Anything specific?</label>
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="w-full h-32 bg-[#1e1f20] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/30 resize-none transition-all placeholder:text-white/20"
                                    placeholder={t('siya.inputPlaceholder')}
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={handleHomeClick}
                                    className="px-6 py-3 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleFormSubmit}
                                    className="px-8 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-all text-sm font-bold"
                                >
                                    Start Analysis
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Input Area - Fixed */}
                {view !== 'form' && (
                    <div className={`absolute bottom-0 right-0 p-4 md:p-6 bg-[#131314] transition-all duration-300 ${sidebarOpen ? 'lg:left-[240px]' : 'left-0'}`}>
                        <div className="max-w-3xl mx-auto bg-[#1e1f20] rounded-full flex items-center p-2 pl-6 gap-2 border border-transparent focus-within:border-white/20 focus-within:bg-[#282a2c] transition-all">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={t('siya.inputPlaceholder')}
                                className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-white/30"
                            />

                            <button
                                onClick={toggleListening}
                                className={`p-2 rounded-full hover:bg-white/10 transition-all ${isListening ? 'text-red-400 animate-pulse' : 'text-white/50'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                            </button>

                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim()}
                                className="p-2.5 rounded-full bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <p className="text-[10px] text-white/30">Siya may display inaccurate info, including about people, so double-check its responses.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
