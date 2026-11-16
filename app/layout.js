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
  metadataBase: new URL('https://peoplereadingseries.com'),
  title: "PeopleReading Series™ | Behavioral Psychology, Executive Gravitas & Tactical Communication",
  description: "An authoritative 5-volume publication translating 50+ years of clinical behavioral science, micro-expression forensics, and crisis negotiation into tactical human communication playbooks.",
  manifest: '/manifest.json',
  keywords: [
    "PeopleReading",
    "PeopleReadingSeries",
    "behavioral psychology",
    "tactical empathy",
    "micro-expressions",
    "FACS Ekman",
    "crisis negotiation",
    "executive leadership",
    "Commander's Intent",
    "communication playbooks"
  ],
  authors: [
    { name: "Marcus Sterling, J.D." },
    { name: "Dr. Evelyn Vance, Ph.D." },
    { name: "Arjun Ramanathan, M.Sc." },
    { name: "PeopleReading Research Lab" }
  ],
  creator: "PeopleReading Media & Research Pvt. Ltd.",
  publisher: "PeopleReading Media & Research Pvt. Ltd.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://peoplereadingseries.com',
    siteName: 'PeopleReading Series',
    title: 'PeopleReading Series™ | Understand People. Master Communication.',
    description: '5-Volume behavioral communication system with interactive practice scenarios.',
    images: [
      {
        url: '/images/peoplereadingseries/bundle_hero_3d.png',
        width: 1200,
        height: 630,
        alt: 'PeopleReading Series 5-Volume Master Collection'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PeopleReading Series™',
    description: 'Behavioral Psychology, Executive Gravitas & Tactical Communication Frameworks.',
    creator: '@peoplereading',
    images: ['/images/peoplereadingseries/bundle_hero_3d.png']
  },
  other: {
    copyright: `© ${new Date().getFullYear()} PeopleReading Media & Research Pvt. Ltd. All Rights Reserved. Full Intellectual Property Protection.`,
    rights: "All rights reserved. Unauthorized copying, distribution, or reproduction is strictly prohibited by law."
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://peoplereadingseries.com/#organization",
      "name": "PeopleReading Media & Research Pvt. Ltd.",
      "legalName": "PeopleReading Media & Research Private Limited",
      "url": "https://peoplereadingseries.com",
      "logo": "https://peoplereadingseries.com/images/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Tower B, 8th Floor, DLF Cyber City, Sector 24",
        "addressLocality": "Gurugram",
        "addressRegion": "Haryana",
        "postalCode": "122002",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-98765-43210",
        "contactType": "customer service",
        "email": "peoplereadingseries@gmail.com",
        "availableLanguage": ["English", "Hindi"]
      },
      "sameAs": [
        "https://instagram.com/peoplereadingseries",
        "https://facebook.com/peoplereadingseries",
        "https://linkedin.com/company/peoplereadingseries"
      ]
    },
    {
      "@type": "BookSeries",
      "@id": "https://peoplereadingseries.com/#series",
      "name": "PeopleReading Series",
      "publisher": {
        "@id": "https://peoplereadingseries.com/#organization"
      },
      "author": [
        { "@type": "Person", "name": "Marcus Sterling, J.D." },
        { "@type": "Person", "name": "Dr. Evelyn Vance, Ph.D." },
        { "@type": "Person", "name": "Arjun Ramanathan, M.Sc." }
      ],
      "numberOfPages": 1476,
      "genre": ["Behavioral Psychology", "Communication", "Leadership", "Negotiation"],
      "inLanguage": "en"
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
