'use client';
import { useLanguage } from '../context/LanguageContext';
import { usePathname } from 'next/navigation';

export default function WhatsAppWidget() {
  const pathname = usePathname();
  if (pathname?.startsWith('/siya')) return null;

  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-400 text-white p-3.5 rounded-full shadow-lg transition-all hover:scale-105 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16.95 7.05a10 10 0 0 0-14.1 0 10 10 0 0 0 .95 15.1L3 21l3.5-.8a10 10 0 0 0 10.45 2.15" />
      </svg>
      <span className="absolute right-full mr-3 bg-white text-black px-3 py-1 rounded-lg type-caption font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
