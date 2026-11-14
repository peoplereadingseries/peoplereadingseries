'use client';
import React from 'react';

// Crisp black outline styles for direct-response cover typography
const outlineLg = {
  WebkitTextStroke: '1.2px #000000',
  paintOrder: 'stroke fill',
  textShadow: '-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 0 3px 6px rgba(0,0,0,0.95)'
};

const outlineMd = {
  WebkitTextStroke: '0.9px #000000',
  paintOrder: 'stroke fill',
  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 2px 4px rgba(0,0,0,0.95)'
};

const outlineSm = {
  WebkitTextStroke: '0.6px #000000',
  paintOrder: 'stroke fill',
  textShadow: '-0.75px -0.75px 0 #000, 0.75px -0.75px 0 #000, -0.75px 0.75px 0 #000, 0.75px 0.75px 0 #000, 0 1px 3px rgba(0,0,0,0.95)'
};

const outlineYellow = {
  WebkitTextStroke: '0.8px #000000',
  paintOrder: 'stroke fill',
  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 1px 4px rgba(0,0,0,0.95)'
};

export default function BookCover3D({ book, size = 'md', interactive = true, className = '' }) {
  if (!book) return null;

  const hasImage = Boolean(book.coverImage);

  // Size variations - scaled up and perfectly proportioned for square/hardcover artwork
  const sizeClasses = hasImage
    ? {
        sm: 'w-48 h-48 sm:w-56 sm:h-56 text-xs',
        md: 'w-64 h-64 sm:w-72 sm:h-72 lg:w-[290px] lg:h-[290px] xl:w-[310px] xl:h-[310px] text-sm',
        lg: 'w-72 h-72 sm:w-88 sm:h-88 md:w-[380px] md:h-[380px] text-base'
      }[size] || 'w-64 h-64 sm:w-72 sm:h-72 lg:w-[290px] lg:h-[290px] xl:w-[310px] xl:h-[310px] text-sm'
    : {
        sm: 'w-44 h-64 text-xs',
        md: 'w-56 h-80 sm:w-64 sm:h-96 text-sm',
        lg: 'w-64 h-96 sm:w-72 sm:h-[430px] text-base'
      }[size] || 'w-56 h-80 sm:w-64 sm:h-96 text-sm';

  // Direct-response copy fallback
  const dr = book.directResponse || {
    seriesFoil: '★ BESTSELLER ★',
    authorityHeader: 'HYPNOTIC PRESENCE',
    headlinePrefix: 'HOW TO',
    headlineAction: book.title.toUpperCase(),
    headlinePower: 'IN ANY ROOM...',
    subhead: book.subtitle,
    author: book.personaName ? book.personaName.toUpperCase() : book.title.toUpperCase(),
    kickerPre: 'The First and ',
    kickerUnderline1: 'Only',
    kickerMid: ' Book That Tells You ',
    kickerUnderline2: 'Exactly',
    kickerPost: ' How'
  };

  return (
    <div
      className={`relative group perspective-1000 select-none ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* 3D Rotating Book Wrapper */}
      <div
        className={`relative ${sizeClasses} rounded-2xl transition-all duration-500 transform-style-preserve-3d shadow-2xl ${
          interactive
            ? 'group-hover:[transform:rotateY(-14deg)_rotateX(4deg)_scale(1.04)]'
            : '[transform:rotateY(-10deg)]'
        }`}
        style={{
          boxShadow: `0 25px 50px -12px ${book.themeColor}50, 0 12px 30px -6px rgba(0, 0, 0, 0.9)`
        }}
      >
        {/* Book Left Spine (Only for CSS direct-response cover, hidden when coverImage is provided) */}
        {!hasImage && (
          <div
            className={`absolute left-0 top-0 bottom-0 w-5 sm:w-5.5 rounded-l-md ${book.spineColor} border-r border-white/20 flex flex-col justify-between items-center py-4 z-20 shadow-inner`}
          >
            <span
              className="text-[7px] sm:text-[8px] font-black tracking-widest text-white -rotate-90 uppercase whitespace-nowrap"
              style={outlineSm}
            >
              SERIES
            </span>
            <div className="w-1.5 h-1.5 rounded-full shadow-sm" style={{ backgroundColor: book.themeColor }} />
            <span
              className="text-[7px] sm:text-[8px] font-bold tracking-widest text-white/90 -rotate-90 uppercase whitespace-nowrap"
              style={outlineSm}
            >
              DECODER
            </span>
          </div>
        )}

        {/* Book Front Face */}
        <div
          className={`absolute inset-0 rounded-2xl overflow-hidden z-10 shadow-2xl flex flex-col justify-between ${
            !hasImage ? 'pl-5 sm:pl-5.5' : ''
          }`}
          style={{
            backgroundColor: book.coverBgColor || '#C41E24',
            backgroundImage: !hasImage ? (book.coverGradient || `radial-gradient(circle at 50% 18%, #e0242b 0%, #BA171E 55%, #8A0E14 100%)`) : undefined
          }}
        >
          {/* Realistic Book Spine Hinge Crease Shadow (Only for CSS covers) */}
          {!hasImage && (
            <div className="absolute left-5 sm:left-5.5 top-0 bottom-0 w-3.5 bg-gradient-to-r from-black/70 via-black/25 to-transparent pointer-events-none z-30" />
          )}

          {hasImage ? (
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white rounded-2xl">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover object-center select-none pointer-events-none rounded-2xl"
                loading="eager"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-between text-center w-full h-full py-2.5 sm:py-3.5 px-2 sm:px-3">
              {/* Dimmed Background Overlay to maximize text contrast & brightness */}
              <div className="absolute inset-0 bg-black/55 pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none z-10" />
              <div className="absolute inset-0 shadow-[inset_0_0_35px_rgba(0,0,0,0.85)] pointer-events-none z-10" />

              {/* 1. Top Section: Persona Title (No Box, 3D Showcase Font Style) */}
              <div className="relative z-20 shrink-0 pt-1.5 px-1 flex flex-col items-center text-center select-none w-full">
                <div className="w-full flex items-center justify-center px-0.5">
                  <span
                    className="font-black text-[10.5px] sm:text-[12.5px] md:text-[14px] leading-none tracking-tighter uppercase whitespace-nowrap text-yellow-400"
                    style={{
                      fontFamily: 'var(--font-sans), Outfit, sans-serif',
                      color: '#FACC15',
                      WebkitTextStroke: '1px #000000',
                      paintOrder: 'stroke fill',
                      textShadow: '-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 0 3px 6px rgba(0,0,0,0.95)'
                    }}
                  >
                    {dr.authorityHeader || 'HYPNOTIC PRESENCE'}
                  </span>
                </div>
              </div>

              {/* 2. Main Direct-Response Headline */}
              <div className="relative z-20 flex flex-col items-center justify-center text-center my-auto px-1 select-none w-full">
                <span
                  className="text-[12px] sm:text-[14px] md:text-[16px] font-black tracking-widest text-white uppercase leading-none"
                  style={outlineMd}
                >
                  {dr.headlinePrefix || 'HOW TO'}
                </span>

                <span
                  className="text-[16px] sm:text-[20px] md:text-[23px] font-black tracking-tight text-white uppercase leading-tight mt-1.5 max-w-[98%]"
                  style={outlineLg}
                >
                  {dr.headlineAction}
                </span>

                <span
                  className="text-[15px] sm:text-[18px] md:text-[21px] font-black tracking-tight text-red-500 uppercase leading-none mt-1.5"
                  style={outlineLg}
                >
                  {dr.headlinePower}
                </span>

                <p
                  className="text-[8.5px] sm:text-[10px] md:text-[11px] font-bold text-white leading-tight tracking-tight mt-2.5 px-0.5 max-w-[92%] italic"
                  style={outlineSm}
                >
                  {dr.subhead}
                </p>
              </div>

              {/* 3. Lower Section: Author Byline & Differentiator Kicker */}
              <div className="relative z-20 flex flex-col items-center justify-center text-center shrink-0 space-y-1.5 pb-2 sm:pb-3 select-none w-full">
                <span
                  className="text-[9.5px] sm:text-[11.5px] md:text-[12.5px] font-black tracking-wider uppercase leading-none"
                  style={outlineMd}
                >
                  <span className="text-white">by </span>
                  <span
                    style={{
                      color: book.themeColor || '#FBBF24',
                      textShadow: '-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000'
                    }}
                  >
                    {dr.author}
                  </span>
                </span>

                <p
                  className="text-[7.5px] sm:text-[9px] md:text-[10px] font-black text-white leading-tight tracking-tight px-1 max-w-[95%]"
                  style={outlineSm}
                >
                  {dr.kickerPre}
                  {dr.kickerUnderline1 && <span>{dr.kickerUnderline1}</span>}
                  {dr.kickerMid}
                  {dr.kickerUnderline2 && <span>{dr.kickerUnderline2}</span>}
                  {dr.kickerPost}
                </p>
              </div>
            </div>
          )}

          {/* Luxury Metallic Light Sweep Across Cover (only for CSS covers, clean for artwork covers) */}
          {!hasImage && (
            <div className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-r from-transparent via-white/15 to-transparent rotate-45 pointer-events-none transition-transform duration-1000 group-hover:translate-x-full z-30" />
          )}
        </div>

        {/* Soft Ambient Reflection Below Book */}
        <div
          className="absolute -bottom-8 left-4 right-4 h-6 rounded-full blur-xl pointer-events-none opacity-60 transition-opacity group-hover:opacity-100"
          style={{ backgroundColor: book.themeColor }}
        />
      </div>
    </div>
  );
}

