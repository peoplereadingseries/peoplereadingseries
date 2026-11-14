'use client';
import React, { useState } from 'react';
import ThePeopleLanguageNav from '../components/ThePeopleLanguageNav';
import CharacterShowcase from '../components/CharacterShowcase';
import BooksGrid from '../components/BooksGrid';
import BookDiagnosticQuiz from '../components/BookDiagnosticQuiz';
import BundleShowcase from '../components/BundleShowcase';
import ScienceFoundation from '../components/ScienceFoundation';
import Testimonials5Books from '../components/Testimonials5Books';
import FAQ5Books from '../components/FAQ5Books';
import Footer from '../components/Footer';
import BookChatBotModal from '../components/BookChatBotModal';
import CheckoutModal from '../components/CheckoutModal';
import ReaderLoginModal from '../components/ReaderLoginModal';
import ThePeopleLanguageVideoModal from '../components/ThePeopleLanguageVideoModal';
import ThePeopleLanguageSearchModal from '../components/ThePeopleLanguageSearchModal';
import { BOOKS_DATA, BUNDLE_DATA } from '../lib/booksData';
import { CHARACTERS_DATA } from '../lib/charactersData';

export default function Home() {
  const [chatBotBook, setChatBotBook] = useState(null);
  const [chatBotInitialMessage, setChatBotInitialMessage] = useState('');
  const [checkoutItem, setCheckoutItem] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenBookChat = (bookOrCharacter, initialMessage = '') => {
    // If passed a character from the 3D showcase
    if (bookOrCharacter && !bookOrCharacter.price) {
      const matched = BOOKS_DATA.find((b) => b.id === bookOrCharacter.id) || {
        id: bookOrCharacter.id,
        title: bookOrCharacter.name,
        subtitle: bookOrCharacter.title,
        coverImage: bookOrCharacter.thumbUrl,
        accentColor: bookOrCharacter.themeColor,
        price: '₹449',
        originalPrice: '₹899'
      };
      setChatBotBook(matched);
      setChatBotInitialMessage(
        initialMessage ||
        `Hi! Let's talk about ${bookOrCharacter.name} and how I can ${bookOrCharacter.simpleHook ? bookOrCharacter.simpleHook.toLowerCase().replace(/\.$/, '') : 'master these communication techniques'}.`
      );
      return;
    }

    setChatBotBook(bookOrCharacter);
    setChatBotInitialMessage(initialMessage || '');
  };

  const handleCloseBookChat = () => {
    setChatBotBook(null);
    setChatBotInitialMessage('');
  };

  const handleBuyBook = (book) => {
    setChatBotBook(null);
    setCheckoutItem(book);
  };

  const handleBuyBundle = () => {
    setChatBotBook(null);
    setCheckoutItem({
      ...BUNDLE_DATA,
      isBundle: true,
      price: BUNDLE_DATA.bundlePrice,
      originalPrice: BUNDLE_DATA.originalPrice,
    });
  };

  const handleCloseCheckout = () => {
    setCheckoutItem(null);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main id="home" className="min-h-screen bg-[#070B14] text-white selection:bg-amber-400 selection:text-black font-sans relative">
      
      {/* 1. Header Navigation Bar */}
      <ThePeopleLanguageNav
        onGetStarted={handleBuyBundle}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onLogin={() => setIsLoginModalOpen(true)}
      />

      {/* 2. Flagship Character Showcase with Auto & Manual Scrolling */}
      <section id="cinematic-showcase" className="relative w-full">
        <CharacterShowcase
          characters={CHARACTERS_DATA}
          onSelectCharacterAction={handleOpenBookChat}
        />
      </section>

      {/* 3. Deep-Dive Persona Curriculum & 3D Book Experience */}
      <div id="features">
        <BooksGrid
          onOpenBookChat={handleOpenBookChat}
          onBuyBook={handleBuyBook}
        />
      </div>

      {/* 4. Complete Master Collection Boxset (Special Deal) */}
      <BundleShowcase
        onBuyBundle={handleBuyBundle}
      />

      {/* 6. Interactive 30-Second Diagnostic Quiz: "Which Persona Do You Need Most?" */}
      <div id="how-it-works">
        <BookDiagnosticQuiz
          onSelectBook={handleOpenBookChat}
        />
      </div>

      {/* 7. Behavioral Science & Neurobiology Foundations */}
      <div id="about">
        <ScienceFoundation />
      </div>

      {/* 9. Verified Reader Reviews & Testimonials */}
      <Testimonials5Books />

      {/* 10. Frequently Asked Questions */}
      <FAQ5Books />

      {/* 11. Comprehensive PeopleReadingSeries Footer */}
      <Footer onSelectBook={handleOpenBookChat} />

      {/* ================= MODALS ================= */}

      {/* Modal: Interactive Mentor Coach for Each Persona */}
      <BookChatBotModal
        book={chatBotBook}
        initialMessage={chatBotInitialMessage}
        isOpen={Boolean(chatBotBook)}
        onClose={handleCloseBookChat}
        onBuyBook={handleBuyBook}
      />

      {/* Modal: Universal Razorpay Secure Checkout */}
      <CheckoutModal
        item={checkoutItem}
        isOpen={Boolean(checkoutItem)}
        onClose={handleCloseCheckout}
      />

      {/* Modal: 1-Minute Platform Tour Video */}
      <ThePeopleLanguageVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onStartJourney={() => scrollToSection('cinematic-showcase')}
      />

      {/* Modal: Instant Persona & Tactics Search Palette */}
      <ThePeopleLanguageSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectPersona={handleOpenBookChat}
      />

      {/* Modal: Single-Device Web Reader Login */}
      <ReaderLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

    </main>
  );
}
