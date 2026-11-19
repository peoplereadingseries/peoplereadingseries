'use client';

import React, { useEffect } from 'react';
import PersonaChatExperience from './redheart/PersonaChatExperience';

export default function BookChatBotModal({
  book,
  initialMessage = '',
  isOpen,
  onClose,
  onBuyBook
}) {
  // Lock body scroll and set chat class while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('chat-modal-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('chat-modal-open');
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('chat-modal-open');
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-chatbot-modal="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-0 sm:p-3 md:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div className="w-full h-full sm:max-w-2xl sm:h-[92vh] max-h-[900px] flex flex-col relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
        <PersonaChatExperience
          personaId={book.id}
          initialMessage={initialMessage}
          onClose={onClose}
          isModal={true}
          onBuyBook={onBuyBook}
        />
      </div>
    </div>
  );
}
