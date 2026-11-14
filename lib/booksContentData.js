/**
 * booksContentData.js
 * Complete, in-depth reading curriculum for all 5 books in the PeopleReadingSeries.
 * Formatted for distraction-free digital reading with key principles, real-world case studies,
 * and tactical execution scripts.
 */

export const BOOKS_FULL_CONTENT = {
  'the-charmer': {
    id: 'the-charmer',
    title: 'THE CHARMER',
    tagline: 'Social Dynamics & Hypnotic Presence',
    author: 'PeopleReadingSeries Master Faculty',
    themeColor: '#F59E0B',
    accentGradient: 'from-amber-400 via-yellow-500 to-amber-700',
    coverImage: '/images/peoplereadingseries/cover_charmer_v2.jpg',
    totalPages: 264,
    totalChapters: 5,
    chapters: [
      {
        id: 'c1',
        number: '01',
        title: 'The Anatomy of Likability',
        subtitle: 'Why Raw Intelligence Fails Without Subconscious Trust',
        readTime: '18 min read',
        sections: [
          {
            heading: '1. The Mirror Neuron Trap',
            paragraphs: [
              'Most people believe charm is a genetic lottery—something you either have at birth or spend a lifetime envying in others. Cognitive neuroscience proves the opposite: charm is not charisma in motion; it is comfort in transmission.',
              'When you walk into a room, before you speak a single syllable, the human amygdala runs a survival calculation in less than 200 milliseconds: "Is this person a threat, an equal, or an asset?"',
              'If you enter with tense shoulders, hurried eyes, or an eager-to-please smile, their mirror neurons instantly register anxiety. You become an emotional liability. But when your posture communicates stillness and your eyes linger with unhurried warmth, their nervous system relaxes in your presence.'
            ]
          },
          {
            heading: '2. The Likability Equation',
            paragraphs: [
              'Likability = Proximity + Frequency + Duration + Intensity. However, in modern social landscapes, intensity without calibration creates friction. True charm operates like gravity: subtle, constant, and unforced.',
              'The single greatest mistake high-achievers make is attempting to be "impressive". When you focus on being impressive, the spotlight is on you. When you focus on making the other person feel fascinating, the spotlight illuminates them—and they will attribute that glow to your company.'
            ],
            keyTakeaway: 'Never try to be the most interesting person in the room; strive to be the most interested observer in the room.'
          },
          {
            heading: '3. Field Protocol: The 3-Second Warmth Signal',
            paragraphs: [
              'Before you speak to a stranger, apply this 3-step sequence:',
              'Step 1: Pause outside the threshold. Take a full breath down to your diaphragm to lower vocal pitch.',
              'Step 2: Catch their eye, hold for 1 full beat, and let a genuine smile emerge slowly—never flash a fast, synthetic grin.',
              'Step 3: Keep your palms visible and slightly open. The brain interprets hidden hands as a threat vector.'
            ],
            script: {
              context: 'Entering a crowded networking mixer or high-stakes gathering',
              say: '"I was observing the energy in here and knew I wanted to say hello before the room gets too noisy. What brought you across town tonight?"',
              whyItWorks: 'It establishes high status through observation rather than desperation, while framing the interaction as intentional.'
            }
          }
        ]
      },
      {
        id: 'c2',
        number: '02',
        title: 'The First 90 Seconds',
        subtitle: 'Disarming Stranger Defenses & Establishing Velvet Rapport',
        readTime: '22 min read',
        sections: [
          {
            heading: '1. The Stranger Defense Barrier',
            paragraphs: [
              'Every human being walks around inside an invisible fortress of social skepticism. We are bombarded with marketing, requests, and unsolicited energy all day.',
              'To bypass this wall, do not push against the gate. Velvet rapport is the art of matching their breathing, vocal tempo, and vocabulary density until their subconscious decides: "This person is from my tribe."'
            ]
          },
          {
            heading: '2. The 3-Question Conversational Funnel',
            paragraphs: [
              'Level 1: The Fact Question ("What do you do?") - Boring, sterile, forgettable.',
              'Level 2: The Process Question ("How did you get into that field?") - Better, activates memory.',
              'Level 3: The Motivation Question ("What made you choose that path over something safer?") - Hypnotic. This touches identity and values.'
            ]
          }
        ]
      },
      {
        id: 'c3',
        number: '03',
        title: 'Hypnotic Conversation Loops',
        subtitle: 'Bypassing Small Talk into Emotional Gravity',
        readTime: '20 min read',
        sections: [
          {
            heading: '1. Open Loops & Curious Tension',
            paragraphs: [
              'Hollywood scriptwriters use open loops to keep viewers hooked across commercial breaks. In conversation, an open loop creates cognitive tension that demands resolution.',
              'When you drop a breadcrumb about an unusual adventure or contrarian belief and casually redirect to them, their brain will fight to keep talking to you.'
            ]
          }
        ]
      },
      {
        id: 'c4',
        number: '04',
        title: 'Banter, Calibration & Play',
        subtitle: 'High Respect with Razor Wit',
        readTime: '24 min read',
        sections: [
          {
            heading: '1. The Tension Line',
            paragraphs: [
              'Too much agreement breeds boredom. Too much disagreement breeds animosity. Banter is the playful dance along the knife-edge between the two.',
              'Learn to calibrate: playful misinterpretation, gentle callbacks, and unbothered comfort under light scrutiny.'
            ]
          }
        ]
      },
      {
        id: 'c5',
        number: '05',
        title: 'The Peak-End Imprint',
        subtitle: 'How to Leave Memories That Linger for Weeks',
        readTime: '16 min read',
        sections: [
          {
            heading: '1. Daniel Kahneman\'s Peak-End Rule in Social Memory',
            paragraphs: [
              'Nobel laureate Daniel Kahneman proved that humans judge an experience almost entirely by how it felt at its peak and at its end. Duration is neglected.',
              'Never wait until a conversation dies down to make an exit. Exit at the peak of laughter or insight, leaving them wanting more of your presence.'
            ]
          }
        ]
      }
    ]
  },

  'the-negotiator': {
    id: 'the-negotiator',
    title: 'THE NEGOTIATOR',
    tagline: 'High-Stakes Deals & Leverage',
    author: 'PeopleReadingSeries Master Faculty',
    themeColor: '#3B82F6',
    accentGradient: 'from-blue-400 via-blue-600 to-indigo-800',
    coverImage: '/images/peoplereadingseries/cover_negotiator_v2.jpg',
    totalPages: 312,
    totalChapters: 5,
    chapters: [
      {
        id: 'c1',
        number: '01',
        title: 'The Leverage Illusion',
        subtitle: 'He Who Cares Less Controls the Room',
        readTime: '20 min read',
        sections: [
          {
            heading: '1. Psychological Leverage vs Tactical Leverage',
            paragraphs: [
              'In any negotiation—whether a seven-figure commercial acquisition or a salary hike—the party with the strongest alternative (BATNA) commands the mathematics. But the party with superior emotional detachment commands the psychology.',
              'If the counterpart senses you need the deal, your price collapses. The moment you show readiness to walk away with polite detachment, their internal loss aversion is triggered.'
            ]
          },
          {
            heading: '2. Calibrated Questions & Tactical Empathy',
            paragraphs: [
              'Never tell someone they are wrong; ask a calibrated "How" or "What" question that forces them to solve your dilemma.',
              'When confronted with an aggressive demand, do not counter with anger. Use the universal pivot: "How am I supposed to make that workable on our end?"'
            ]
          }
        ]
      },
      {
        id: 'c2',
        number: '02',
        title: 'The FBI Labeling Technique',
        subtitle: 'Extracting Fear Before It Solidifies into Resistance',
        readTime: '22 min read',
        sections: [
          {
            heading: '1. Neutralizing Negative Emotion',
            paragraphs: [
              'Labeling is the verbal identification of the counterpart\'s unspoken feelings. "It seems like you feel we are asking for terms that risk your internal credibility."',
              'Neurological imaging shows that putting language to a negative emotion immediately deactivates the amygdala.'
            ]
          }
        ]
      },
      {
        id: 'c3',
        number: '03',
        title: 'Anchoring & Defending Your Number',
        subtitle: 'Extreme Anchors & Range Framing',
        readTime: '25 min read',
        sections: [
          {
            heading: '1. The Range Anchor Trap',
            paragraphs: [
              'When quoting fees or salary, never offer a single round figure. Use precise, non-round numbers (e.g., ₹48,50,000 instead of ₹50,00,000). Precise numbers convey rigorous calculation rather than guesswork.'
            ]
          }
        ]
      },
      {
        id: 'c4',
        number: '04',
        title: 'Dealing with Bullies & Ultimatums',
        subtitle: 'Diffusing "Take It or Leave It"',
        readTime: '19 min read',
        sections: [
          {
            heading: '1. Defusing Finality',
            paragraphs: [
              'When a counterpart says "This is our final offer," they are testing your boundary strength. The rookie panics or concedes. The master smiles, pauses for 4 seconds, and re-anchors to shared objectives.'
            ]
          }
        ]
      },
      {
        id: 'c5',
        number: '05',
        title: 'Closing with Ironclad Commitment',
        subtitle: 'Securing the "How" Behind the "Yes"',
        readTime: '17 min read',
        sections: [
          {
            heading: '1. The 3-Times Rule',
            paragraphs: [
              'A "yes" is meaningless without implementation. Discover the 3-Times Rule to confirm that the person who signed also has the political backing and operational timeline to deliver.'
            ]
          }
        ]
      }
    ]
  },

  'the-detective': {
    id: 'the-detective',
    title: 'THE DETECTIVE',
    tagline: 'Behavioral Forensics & Deception Detection',
    author: 'PeopleReadingSeries Master Faculty',
    themeColor: '#8B5CF6',
    accentGradient: 'from-purple-400 via-fuchsia-500 to-violet-700',
    coverImage: '/images/peoplereadingseries/cover_detective_v2.jpg',
    totalPages: 288,
    totalChapters: 5,
    chapters: [
      {
        id: 'c1',
        number: '01',
        title: 'The Biology of Concealment',
        subtitle: 'How the Autonomic Nervous System Betrays Every Lie',
        readTime: '21 min read',
        sections: [
          {
            heading: '1. The Cognitive Load of Dishonesty',
            paragraphs: [
              'Telling the truth is effortless: memory retrieval is linear and low-energy. Fabricating a lie requires constructing a fictitious storyline, calculating plausibility, suppressing micro-emotions, and monitoring the listener\'s skepticism simultaneously.',
              'This massive cognitive overload forces the brain to leak autonomic stress signals: swallowing, pupillary dilation, vocal pitch changes, and timing discrepancies.'
            ]
          }
        ]
      },
      {
        id: 'c2',
        number: '02',
        title: 'The Baseline Protocol',
        subtitle: '5 Calibration Questions to Map Normal Behavior',
        readTime: '23 min read',
        sections: [
          {
            heading: '1. Never Accuse Without a Baseline',
            paragraphs: [
              'A person who rubs their neck might just have a stiff neck. You cannot detect deception without establishing their baseline behavior when there is zero pressure.',
              'Learn the 5 casual calibration questions that map their blink rate, speech tempo, and gestural symmetry before the crucial topic is ever broached.'
            ]
          }
        ]
      },
      {
        id: 'c3',
        number: '03',
        title: 'The 7 Universal Micro-Expressions',
        subtitle: '1/25th-Second Flashes of Truth',
        readTime: '26 min read',
        sections: [
          {
            heading: '1. The Asymmetric Lip Pull (Contempt)',
            paragraphs: [
              'Contempt is the only unilateral micro-expression in the human repertoire: one corner of the lip pulls subtly upward. In marital forensics, Dr. John Gottman found this single expression predicts divorce with 93% accuracy. In business, it signals an unstated feeling of superiority or sabotage.'
            ]
          }
        ]
      },
      {
        id: 'c4',
        number: '04',
        title: 'Linguistic Deception Cues',
        subtitle: 'Pronoun Slippage & Over-Elaboration',
        readTime: '19 min read',
        sections: [
          {
            heading: '1. Distance and Grammar',
            paragraphs: [
              'When people lie, they psychologically distance themselves from the event. They drop first-person pronouns ("I", "me", "my") in favor of passive voice ("Mistakes were made", "The file was misplaced").'
            ]
          }
        ]
      },
      {
        id: 'c5',
        number: '05',
        title: 'Subconscious Elicitation',
        subtitle: 'Getting the Truth Without an Interrogation Lamp',
        readTime: '18 min read',
        sections: [
          {
            heading: '1. The False Presupposition Maneuver',
            paragraphs: [
              'Instead of asking "Did you take that meeting?", embed the assumption casually into a broader inquiry: "When you had that coffee session on Tuesday, did they confirm the Q3 budget?" Watch their reaction to the embedded fact.'
            ]
          }
        ]
      }
    ]
  },

  'the-leader': {
    id: 'the-leader',
    title: 'THE LEADER',
    tagline: 'Executive Command & Gravitas',
    author: 'PeopleReadingSeries Master Faculty',
    themeColor: '#10B981',
    accentGradient: 'from-emerald-400 via-teal-500 to-green-700',
    coverImage: '/images/peoplereadingseries/cover_leader_v2.jpg',
    totalPages: 340,
    totalChapters: 5,
    chapters: [
      {
        id: 'c1',
        number: '01',
        title: 'The Doctrine of Stillness',
        subtitle: 'Why Shouting Lowers Status While Silence Commands Rooms',
        readTime: '22 min read',
        sections: [
          {
            heading: '1. Volume is Insecurity. Cadence is Power.',
            paragraphs: [
              'Weak executives speak rapidly to avoid being interrupted. True commanders speak at an unhurried cadence and embrace deliberate pauses. When you are comfortable with dead silence, everyone else leans in.'
            ]
          }
        ]
      },
      {
        id: 'c2',
        number: '02',
        title: 'Bending Room Gravity',
        subtitle: 'Physical Anchor Points & Commanding Stature',
        readTime: '24 min read',
        sections: [
          {
            heading: '1. The Center of Mass Rule',
            paragraphs: [
              'Watch high-status leaders enter an auditorium or board room: their head remains stable, their footsteps are grounded, and they do not scan for approval. Their presence anchors the room.'
            ]
          }
        ]
      },
      {
        id: 'c3',
        number: '03',
        title: 'Radical Candor Without Alienation',
        subtitle: 'Delivering Brutal Truths While Elevating Loyalty',
        readTime: '21 min read',
        sections: [
          {
            heading: '1. Separating Identity from Performance',
            paragraphs: [
              'Dignity must remain inviolable. Frame feedback around the mission rather than personal worth. "You are an exceptional builder; this particular deliverable does not match your benchmark."'
            ]
          }
        ]
      },
      {
        id: 'c4',
        number: '04',
        title: 'The Crisis Protocol',
        subtitle: 'Holding Composure When Everything Collapses',
        readTime: '20 min read',
        sections: [
          {
            heading: '1. The Emotional Thermostat',
            paragraphs: [
              'In chaos, teams do not look at spreadsheets; they stare at the leader\'s face. If your jaw is slack and your eyes are panicked, the organization freezes. Learn the physiological sigh to regulate cortisol in real time.'
            ]
          }
        ]
      },
      {
        id: 'c5',
        number: '05',
        title: 'Cultivating Fierce Devotion',
        subtitle: 'The Psychological Architecture of High-Output Tribes',
        readTime: '19 min read',
        sections: [
          {
            heading: '1. The Shared Mission Matrix',
            paragraphs: [
              'People will not bleed for a paycheck; they sacrifice for meaning, dignity, and high brotherhood. Learn how to craft a compelling vision that turns employees into disciples.'
            ]
          }
        ]
      }
    ]
  },

  'the-heart-reader': {
    id: 'the-heart-reader',
    title: 'THE HEART READER',
    tagline: 'Emotional Subtext & The Anti-Gravity Rule',
    author: 'Siya & PeopleReadingSeries Master Faculty',
    themeColor: '#F43F5E',
    accentGradient: 'from-rose-500 via-pink-600 to-rose-700',
    coverImage: '/images/peoplereadingseries/cover_heart_reader_v2.jpg',
    totalPages: 296,
    totalChapters: 5,
    chapters: [
      {
        id: 'c1',
        number: '01',
        title: 'The Anti-Gravity Rule',
        subtitle: 'Why Chasing Kills Attraction and Space Creates Magnetism',
        readTime: '20 min read',
        sections: [
          {
            heading: '1. The Emotional Seesaw',
            paragraphs: [
              'In modern romance and deep relationships, emotional gravity functions inversely to physical gravity: the harder you lean toward someone who is retreating, the further away they are repelled.',
              'Attraction cannot survive the absence of tension. When you suffocate the space with anxiety, over-texting, and premature reassurance, you eliminate curiosity. Anti-Gravity is the discipline of anchoring your emotional self-worth so deeply within yourself that distance does not trigger desperation.'
            ]
          },
          {
            heading: '2. The 3 Signals of Secret Infatuation',
            paragraphs: [
              'Signal A: Proxemic Drift - They find subconscious excuses to be within your 3-foot personal radius.',
              'Signal B: The Double-Glance - Catching their eyes darting toward you when someone else in the group tells a funny story (we look first at the person whose approval we crave).',
              'Signal C: Asymmetric Tone - Their vocal pitch softens and becomes lower or warmer exclusively when addressing you.'
            ],
            keyTakeaway: 'You cannot force someone to realize what you offer by shouting louder; step back into your sovereignty and let the silence do the work.'
          }
        ]
      },
      {
        id: 'c2',
        number: '02',
        title: 'Decoding Modern Text Subtext',
        subtitle: 'Response Latency, Punctuation & The Velvet Pivot',
        readTime: '22 min read',
        sections: [
          {
            heading: '1. The Illusion of Response Speed',
            paragraphs: [
              'A fast reply does not always mean love, and a slow reply does not always mean rejection. Learn how to decode the emotional calorie count: are they investing conversational energy or dropping dry monosyllables?'
            ]
          }
        ]
      },
      {
        id: 'c3',
        number: '03',
        title: 'The Friction Point Matrix',
        subtitle: 'Resolving Arguments Without Damaging Intimacy',
        readTime: '23 min read',
        sections: [
          {
            heading: '1. The Vulnerability Mirror',
            paragraphs: [
              'When couples fight, they rarely argue about the dishes; they argue about significance. "Do you see me? Am I safe with you?" Learn how to address the emotional subtext beneath the tactical dispute.'
            ]
          }
        ]
      },
      {
        id: 'c4',
        number: '04',
        title: 'Detachment as Magnetic Power',
        subtitle: 'Reclaiming Your Emotional Center in Dating',
        readTime: '25 min read',
        sections: [
          {
            heading: '1. The Abundance Reality',
            paragraphs: [
              'Scarcity mindset is the ultimate passion killer. When you recognize that you are the prize and romance is an enhancement rather than a lifeline, your natural charisma surges.'
            ]
          }
        ]
      },
      {
        id: 'c5',
        number: '05',
        title: 'The Forever Imprint',
        subtitle: 'Building Unshakeable, Lifetime Loyalty & Soul Bond',
        readTime: '18 min read',
        sections: [
          {
            heading: '1. The Sanctuary Effect',
            paragraphs: [
              'The person someone never leaves is not the most physically attractive or wealthiest partner; it is the one person in whose presence they feel completely safe to take off their armor. Become that sanctuary.'
            ]
          }
        ]
      }
    ]
  }
};

export function getBookFullContent(bookId) {
  if (!bookId) return null;
  const key = String(bookId).toLowerCase().trim();
  return BOOKS_FULL_CONTENT[key] || null;
}
