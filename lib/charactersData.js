/**
 * 5 Iconic Character Archetypes for the 3D Cinematic Scrolling Showcase
 * Each character includes full typography tokens, visual assets, lore, stat attributes, and audio presets.
 */

export const CHARACTERS_DATA = [
  {
    id: 'the-charmer',
    num: '01',
    code: 'V.01',
    name: 'The Charmer',
    title: 'Master Social Situations',
    archetype: 'The Magnetic Connector',
    tagline: 'Instant Social Magnetism in Any Room',
    topLeftTitle: 'Find your charm?',
    bottomHook: {
      before: 'Hey! Want to know if ',
      highlight: 'she likes you back',
      after: '?'
    },
    simpleHook: 'Hey! Want to know if she likes you back?',
    headline: 'Make anyone feel instantly drawn to you.',
    lore: 'The 3-Second Warmth Signal: Never feel awkward, overlooked, or invisible again. Master conversational velvet pivots that create effortless rapport with strangers and executives alike.',
    quote: '"Warmth unlocks what status cannot command. When people feel safe in your presence, they naturally open every door."',
    tacticalMove: 'The 3-Second Warmth Signal',
    tacticalDesc: 'Micro-eyebrow flash combined with a 0.5s delayed slow smile that triggers primitive safety receptors in the limbic system.',
    stats: [
      { label: 'Social Magnetism', value: 98, suffix: '%' },
      { label: 'Conversational Velvet', value: 94, suffix: '%' },
      { label: 'Warmth Signaling', value: 96, suffix: '%' },
      { label: 'Rapport Speed', value: 0.8, suffix: 's' }
    ],
    skills: ['3-Second Warmth Signal', 'Conversational Velvet Pivot', 'Magnetic Eye-Contact Triad', 'Zero-Friction Banter'],
    themeColor: '#F59E0B', // Amber Gold
    accentGradient: 'from-amber-400 via-yellow-500 to-amber-600',
    ambientGlow: 'rgba(245, 158, 11, 0.45)',
    bgRgba: 'rgba(245, 158, 11, 0.12)',
    badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    btnBg: 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-amber-500/30',
    typography: 'CHARMER',
    subTypography: 'MAGNETISM',
    cutoutUrl: '/images/peoplereadingseries/cutout_charmer.png',
    bgUrl: '/images/peoplereadingseries/hero_charmer.jpg',
    thumbUrl: '/images/peoplereadingseries/avatar_charmer_v3.jpg',
    audioFreq: 528, // Hz
    audioToneName: 'Transformation & Solar Warmth (528 Hz)',
    soundType: 'warm-pad'
  },
  {
    id: 'the-negotiator',
    num: '02',
    code: 'V.02',
    name: 'The Negotiator',
    title: 'Excel in Business & Sales',
    archetype: 'The Strategic Dealmaker',
    tagline: 'Close 25-40% Higher Deals Without Friction',
    topLeftTitle: 'A tough boss?',
    bottomHook: {
      before: 'Need a better deal? ',
      highlight: 'lets negotiate',
      after: '!'
    },
    simpleHook: 'Need a better deal? lets negotiate!',
    headline: 'Turn an aggressive "No" into a profitable "Yes".',
    lore: 'Stop leaving money on the table. Harness FBI-grade calibrated open questions and surgical silence to make tough counterparties willingly advocate for your terms.',
    quote: '"He who speaks first in silence concedes the room. Tactical empathy makes the counterpart feel heard while you steer the outcome."',
    tacticalMove: 'Calibrated Silence Protocol',
    tacticalDesc: '4 seconds of unblinking neutral presence following a tough question, forcing the other party to fill the void with concessions.',
    stats: [
      { label: 'Leverage Calibration', value: 99, suffix: '%' },
      { label: 'Tactical Silence', value: 97, suffix: '%' },
      { label: 'Deal Margin Boost', value: 38, suffix: '%' },
      { label: 'Resistance Dissolve', value: 95, suffix: '%' }
    ],
    skills: ['Calibrated "How" Questions', 'Late-Night DJ Voice', 'Mirroring & Labeling', 'Anchor Decoupling'],
    themeColor: '#3B82F6', // Cobalt Blue
    accentGradient: 'from-blue-400 via-indigo-500 to-blue-600',
    ambientGlow: 'rgba(59, 130, 246, 0.45)',
    bgRgba: 'rgba(59, 130, 246, 0.12)',
    badgeBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    btnBg: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/30',
    typography: 'NEGOTIATOR',
    subTypography: 'TACTICAL',
    cutoutUrl: '/images/peoplereadingseries/cutout_negotiator.png',
    bgUrl: '/images/peoplereadingseries/hero_negotiator.jpg',
    thumbUrl: '/images/peoplereadingseries/avatar_negotiator_v3.jpg',
    audioFreq: 432, // Hz
    audioToneName: 'Clarity & High-Stakes Focus (432 Hz)',
    soundType: 'deep-sub'
  },
  {
    id: 'the-detective',
    num: '03',
    code: 'V.03',
    name: 'The Detective',
    title: 'Detect Lies & Hidden Motives',
    archetype: 'Behavioral Forensics Specialist',
    tagline: 'Spot Deception & Hidden Agendas in 2 Minutes',
    topLeftTitle: 'A liar?',
    bottomHook: {
      before: 'Something feels off? ',
      highlight: 'lets find the truth',
      after: ' .'
    },
    simpleHook: 'Something feels off? lets find the truth .',
    headline: 'See through polished smiles and false promises.',
    lore: 'Spot the 1/25th-second facial micro-twitches, throat swallows, pupil dilations, and pronoun drop-offs that immediately expose deceit and concealed motives.',
    quote: '"Words are crafted by the conscious ego. Micro-expressions and vocal tremors are wired directly to involuntary biology."',
    tacticalMove: 'The 2-Minute Truth Probe',
    tacticalDesc: 'Baseline cognitive load testing by asking chronological reverse-sequence questions to expose manufactured stories.',
    stats: [
      { label: 'Micro-Expression Read', value: 99, suffix: '%' },
      { label: 'Deception Spotting', value: 97, suffix: '%' },
      { label: 'Baseline Calibration', value: 94, suffix: '%' },
      { label: 'Truth Velocity', value: 1.2, suffix: 'min' }
    ],
    skills: ['1/25th Sec Micro-Reads', 'Pronoun Distance Scoring', 'Acoustic Stress Profiling', 'Cognitive Overload Probing'],
    themeColor: '#8B5CF6', // Purple/Violet
    accentGradient: 'from-purple-400 via-fuchsia-500 to-violet-600',
    ambientGlow: 'rgba(139, 92, 246, 0.45)',
    bgRgba: 'rgba(139, 92, 246, 0.12)',
    badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    btnBg: 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white shadow-purple-500/30',
    typography: 'DETECTIVE',
    subTypography: 'FORENSICS',
    cutoutUrl: '/images/peoplereadingseries/cutout_detective.png',
    bgUrl: '/images/peoplereadingseries/hero_detective.jpg',
    thumbUrl: '/images/peoplereadingseries/avatar_detective_v3.jpg',
    audioFreq: 639, // Hz
    audioToneName: 'Psychological Insight Resonance (639 Hz)',
    soundType: 'sine-pulse'
  },
  {
    id: 'the-leader',
    num: '04',
    code: 'V.04',
    name: 'The Leader',
    title: 'Influence & Inspire Teams',
    archetype: 'The Executive Commander',
    tagline: 'Inspire Radical Team Loyalty with Calm Authority',
    topLeftTitle: 'Got a deal?',
    bottomHook: {
      before: 'Ready to lead, ',
      highlight: 'inspire and achieve more',
      after: '?'
    },
    simpleHook: 'Ready to lead, inspire and achieve more?',
    headline: 'Command executive presence without barking orders.',
    lore: 'Eliminate micromanagement friction. Master the Commander\'s Intent framework and grounded non-reactive stillness to align cross-functional teams and command any boardroom.',
    quote: '"Authority that requires constant assertion is already fractured. True leaders project an unshakeable gravitational center."',
    tacticalMove: 'Command Stillness Posture',
    tacticalDesc: 'Controlled diaphragm breathing with zero fidgeting and a 20% slower vocal cadence that instantly quietens chaotic rooms.',
    stats: [
      { label: 'Executive Presence', value: 98, suffix: '%' },
      { label: 'Crisis Decisiveness', value: 96, suffix: '%' },
      { label: 'Team Loyalty Index', value: 95, suffix: '%' },
      { label: 'Vision Transmission', value: 99, suffix: '%' }
    ],
    skills: ['Commander\'s Intent', 'Stillness Under Pressure', 'Vocal Cadence Deceleration', 'Radical Ownership'],
    themeColor: '#10B981', // Emerald / Teal
    accentGradient: 'from-emerald-400 via-teal-500 to-green-600',
    ambientGlow: 'rgba(16, 185, 129, 0.45)',
    bgRgba: 'rgba(16, 185, 129, 0.12)',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    btnBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/30',
    typography: 'LEADER',
    subTypography: 'COMMAND',
    cutoutUrl: '/images/peoplereadingseries/cutout_leader.png',
    bgUrl: '/images/peoplereadingseries/hero_leader.jpg',
    thumbUrl: '/images/peoplereadingseries/avatar_leader_v3.jpg',
    audioFreq: 741, // Hz
    audioToneName: 'Executive Command & Clarity (741 Hz)',
    soundType: 'drone-brass'
  },
  {
    id: 'the-heart-reader',
    num: '05',
    code: 'V.05',
    name: 'The Heart Reader',
    title: 'Improve Dating & Relations',
    archetype: 'The Anti-Gravity Alchemist',
    tagline: 'Decode Mixed Signals & Reignite Attraction',
    topLeftTitle: 'Got a crush?',
    bottomHook: {
      before: 'Confused about ',
      highlight: 'love',
      after: '?'
    },
    simpleHook: 'Confused about love?',
    headline: 'Stop guessing. Understand the emotional subtext.',
    lore: 'Decode late texts, cold silences, and hot-and-cold behavioral games. The Anti-Gravity principle eliminates needy pursuit friction and reignites deep magnetic attraction.',
    quote: '"Desire is an emotional vacuum. When you stop chasing and establish grounded internal polarity, they feel compelled to lean in."',
    tacticalMove: 'Anti-Gravity Polarity Shift',
    tacticalDesc: 'Immediate cessation of over-pursuit coupled with high-value emotional self-containment, reversing the psychological gravity of dating.',
    stats: [
      { label: 'Emotional Polarity', value: 99, suffix: '%' },
      { label: 'Mixed Signal Decoding', value: 97, suffix: '%' },
      { label: 'Anti-Gravity Pull', value: 98, suffix: '%' },
      { label: 'Intimacy Depth', value: 96, suffix: '%' }
    ],
    skills: ['Anti-Gravity Attraction', 'Text Timing Forensics', 'Emotional Boundary Setting', 'Polarity Tension Holding'],
    themeColor: '#F43F5E', // Rose / Crimson
    accentGradient: 'from-rose-400 via-pink-500 to-red-600',
    ambientGlow: 'rgba(244, 63, 94, 0.45)',
    bgRgba: 'rgba(244, 63, 94, 0.12)',
    badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    btnBg: 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-rose-500/30',
    typography: 'HEART',
    subTypography: 'INTUITION',
    cutoutUrl: '/images/peoplereadingseries/cutout_heart_reader.png',
    bgUrl: '/images/peoplereadingseries/hero_heart_reader.jpg',
    thumbUrl: '/images/peoplereadingseries/avatar_heart_reader_v3.jpg',
    audioFreq: 852, // Hz
    audioToneName: 'Anti-Gravity Heart Resonance (852 Hz)',
    soundType: 'ethereal-chords'
  }
];
