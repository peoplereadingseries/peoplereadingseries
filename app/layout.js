import { Outfit, Caveat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import WhatsAppWidget from '../components/WhatsAppWidget';
import Script from 'next/script';

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: 'swap',
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "PeopleReadingSeries | Understand People. Master Communication. Unlock Your Potential.",
  description: "A next-gen learning platform with 5 unique personas to help you read people, build stronger relationships, make better decisions and grow in every area of life.",
  manifest: '/manifest.json',
  authors: [{ name: "PeopleReadingSeries" }],
  creator: "PeopleReadingSeries",
  publisher: "PeopleReadingSeries Publishing",
  other: {
    copyright: `© ${new Date().getFullYear()} PeopleReadingSeries. All Rights Reserved. Full Intellectual Property Protection.`,
    rights: "All rights reserved. Unauthorized copying, distribution, or reproduction is strictly prohibited by law."
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${caveat.variable} antialiased font-sans`}>
        <LanguageProvider>
          <LanguageSwitcher />
          {children}
          <WhatsAppWidget />
        </LanguageProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
