/**
 * chatEngine.js
 * Rich situational behavioral engine for PeopleReadingSeries.
 * Guarantees zero repeated replies, contextual intent detection,
 * and authentic English / Tanglish tone.
 */

const SCENARIOS = {
  'the-charmer': {
    name: 'The Charmer',
    topics: [
      {
        triggers: ['hi', 'hello', 'hey', 'start', 'introduce', 'who are you', 'vanakkam', 'macha'],
        responses: {
          English: [
            {
              hook: "Presence isn't about being the loudest person in the room—it's about making others feel magnetic around you.",
              move: "Drop your shoulder tension, breathe slow, and give a relaxed 70% eye-contact ratio before speaking.",
              say: "I was actually just observing that earlier... tell me, what's the real story behind this?"
            },
            {
              hook: "Most people enter rooms seeking validation; the charmer enters granting permission to relax.",
              move: "Use the 3-Second Warmth Signal: hold a soft micro-smile for two beats before greeting them.",
              say: "You look like someone who definitely has an interesting perspective on today."
            },
            {
              hook: "First impressions are decided within 90 seconds by autonomic mirror neurons, not your resume.",
              move: "Match their conversational tempo for 20 seconds, then slow yours down by 15% to pull them into your gravity.",
              say: "Glad we ran into each other. What's been the highlight of your week so far?"
            }
          ],
          Tanglish: [
            {
              hook: "Room-la enter aana odane loudest-ah irukkanum nu avasiyam illa macha—calm charm dhaan periya mass.",
              move: "Shoulder tension drop pannu, chill-ah oru micro-smile thaa, eye contact steady-ah vechukko.",
              say: "\"Hey, un vibe paathalae theriyudhe edho interesting story irukku nu. Enna matter?\""
            },
            {
              hook: "Awkwardness feel aana, adha rush panni fill panna paakkadha macha.",
              move: "2-second pause edu, relaxed posture maintain pannu, and then casual velvet pivot podu.",
              say: "\"Wait, nee indha topic pathi romba different-ah yosikira mari irukku, sollu kepom!\""
            },
            {
              hook: "Confidence-na over-talking illa nanba; effortless warmth dhaan real magnet.",
              move: "Avanga speed-ah match panni, konjam slow-ah un pacing-ah control pannu.",
              say: "\"Awesome meeting you bro! Indha week-oda un biggest highlight enna?\""
            }
          ]
        }
      },
      {
        triggers: ['awkward', 'silence', 'boring', 'small talk', 'introvert', 'shy', 'hesitate', 'ice'],
        responses: {
          English: [
            {
              hook: "An awkward silence is only awkward if your body language apologizes for it.",
              move: "Treat the silence as a comfortable pause. Take a slow breath, hold eye contact, and let them break it.",
              say: "That's an interesting beat. What made you first get into that field?"
            },
            {
              hook: "Surface weather chat kills chemistry. Great conversationalists jump straight to feelings and motives.",
              move: "Deploy the 'Why' bridge: shift from 'what do you do?' to 'what drove you to choose that?'",
              say: "Most people do that for stability, but I get the feeling you had a very personal reason."
            },
            {
              hook: "You don't need a witty line; you just need curiosity that cuts through their social guard.",
              move: "Use the Velvet Pivot to gracefully steer away from dead-end topics without any friction.",
              say: "Before we get stuck on work talk, what's something outside of work you're genuinely obsessed with right now?"
            }
          ],
          Tanglish: [
            {
              hook: "Awkward silence vandha panic aagadha macha, adhu dhaan un real social test.",
              move: "Silence-ah normalise pannu, slow-ah breath edu, direct-ah avanga curiosity trigger pannu.",
              say: "\"Adha vidu, indha work matter ellam pakkam vechutu, unakku real-ah pidicha passion enna nu sollu!\""
            },
            {
              hook: "Boring weather and routine topics pesina chemistry zero aagidum nanba.",
              move: "Casual-ah avanga motivation pathi oru deep question throw pannu.",
              say: "\"Nariya peru idhai safe choice-ah pannuvanga, aana un kitta edho vera ambition theriyudhu. Am I right?\""
            }
          ]
        }
      },
      {
        triggers: ['party', 'event', 'crowd', 'network', 'stranger', 'approach', 'group'],
        responses: {
          English: [
            {
              hook: "Walking into a crowded room is intimidating only if you scan for acceptance rather than giving it.",
              move: "Anchor at the high-traffic perimeter first; make one positive connection before moving into the center.",
              say: "Excuse me, I promised myself I'd meet three interesting people tonight—you're number one."
            },
            {
              hook: "Triangular body positioning disarms groups 10x faster than squaring up directly.",
              move: "Stand at a 45-degree angle to open the circle rather than facing them head-on.",
              say: "I couldn't help overhearing the debate over here—mind if I get the quick context?"
            }
          ],
          Tanglish: [
            {
              hook: "Crowded party-la oru corner-la ninnu overthink pannadha macha.",
              move: "45-degree angle-la approach pannu, direct confronting stance vendaam.",
              say: "\"Hey guys, neenga pesura topic ketu thaan inga vanthen—quick context enna nu sollungalen!\""
            }
          ]
        }
      }
    ]
  },

  'the-negotiator': {
    name: 'The Negotiator',
    topics: [
      {
        triggers: ['hi', 'hello', 'hey', 'start', 'introduce', 'who are you', 'deal', 'leverage', 'macha'],
        responses: {
          English: [
            {
              hook: "Negotiation begins the second the other person says 'No'—everything before that is just small talk.",
              move: "Never counter an aggressive anchor directly. Use tactical silence for 4 seconds to force them to bid against themselves.",
              say: "It seems like there are some rigid constraints on your side. What's driving that boundary?"
            },
            {
              hook: "The party with the most emotional detachment holds 80% of the room's leverage.",
              move: "Deploy an Accusation Audit early to disarm their defensive guard before talking numbers.",
              say: "You're probably going to think this request is unreasonable, but let's look at the actual output deliverable."
            },
            {
              hook: "Giving immediate concessions creates suspicion; calculated resistance builds value.",
              move: "Always trade concessions instead of giving them away: if they ask for price cuts, ask for scope cuts.",
              say: "We can certainly adjust that number, provided we remove Section B and extend the delivery runway."
            }
          ],
          Tanglish: [
            {
              hook: "Counterparty 'No' sonna dhaan real negotiation start aagudhu macha, don't back down.",
              move: "Fast-ah justify pannadha. 4 seconds complete silence maintain pannu, avangale concede pannuvanga.",
              say: "\"Idhu ungalukku difficult-ah theriyudhu nu puriyudhu. Idhula unga biggest blocker enna?\""
            },
            {
              hook: "Leverage eppodhum calm-ah irukura person kitta dhaan irukkum nanba.",
              move: "Direct discount tharadheenga—price koranja scope-um kandippa korayum nu clear-ah sollu.",
              say: "\"Indha price point adjust pannalam, but timeline and deliverables-la certain terms alter pannanum.\""
            }
          ]
        }
      },
      {
        triggers: ['salary', 'hike', 'raise', 'boss', 'appraisal', 'promotion', 'pay', 'ctc'],
        responses: {
          English: [
            {
              hook: "Asking for a raise based on personal living costs fails; anchoring to business impact wins.",
              move: "Present a 3-bullet dossier of revenue saved or delivered, then frame the hike as talent retention parity.",
              say: "Based on the team hitting 140% of target under my lead, what would it take to align my compensation to market tier?"
            },
            {
              hook: "If you accept the first offer, they instantly wonder if they overpaid.",
              move: "Pause 3 seconds, tilt head slightly, and use a calibrated 'How' question.",
              say: "I'm genuinely excited about this mission. How am I supposed to accept that figure when market benchmarks for this impact are 30% higher?"
            }
          ],
          Tanglish: [
            {
              hook: "Personal expenses solli hike kekkadha macha—company-ku generate panna revenue proof kaattu.",
              move: "Past 6 months measurable metrics present pannitu, market parity calibrated question podu.",
              say: "\"Team results and revenue impact clear-ah irukku. Indha performance-ku market standard compensation align panna enna steps edukalam?\""
            }
          ]
        }
      },
      {
        triggers: ['lowball', 'cheap', 'discount', 'final price', 'expensive', 'budget', 'afford'],
        responses: {
          English: [
            {
              hook: "'That's our final price' is rarely a final price—it is an emotional posture to test your resolve.",
              move: "Label their constraint calmly without flinching or getting defensive.",
              say: "It sounds like budget parameters are extremely tight right now. How would you like us to proceed on the deliverables?"
            },
            {
              hook: "Discounting without taking something off the table destroys your perceived brand authority.",
              move: "Keep the rate firm and introduce non-monetary value add-ons that cost you nothing.",
              say: "Our fee reflects guaranteed execution. If the budget is locked, which specific module should we deprioritize?"
            }
          ],
          Tanglish: [
            {
              hook: "'Idhu dhaan final budget' nu sonna adhu oru emotional anchor dhaan macha, panic aagadha.",
              move: "Direct-ah discount tharamal, 'How' question use panni avangalaye solution yosikka vai.",
              say: "\"Budget tight-ah irukku nu puriyudhu sir. But quality drop aagama indha outcome epdi achieve panna mudiyum nu neengale sollunga?\""
            }
          ]
        }
      }
    ]
  },

  'the-detective': {
    name: 'The Detective',
    topics: [
      {
        triggers: ['hi', 'hello', 'hey', 'start', 'introduce', 'who are you', 'lie', 'deception', 'macha'],
        responses: {
          English: [
            {
              hook: "People don't give away lies with grand dramatic gestures; they leak truth in 1/25th-second micro-tells.",
              move: "Establish their normal baseline under zero pressure first—blink rate, speech rhythm, hand stillness.",
              say: "Walk me through what happened right before that meeting started—just from the beginning."
            },
            {
              hook: "Liars use pronoun evasion: they drop 'I' and 'me' to subconsciously distance themselves from the act.",
              move: "Watch for sudden throat swallows or collar adjustments right when high-stakes topics surface.",
              say: "That makes sense on the surface. But why did you decide to take that exact route?"
            },
            {
              hook: "Truthful people recall events emotionally with chronological jumps; deceivers rehearse in a rigid timeline.",
              move: "Ask them to tell the sequence backwards—deceivers crash under cognitive load.",
              say: "Interesting. Before that happened, what were you doing 20 minutes earlier?"
            }
          ],
          Tanglish: [
            {
              hook: "Poi solravanga grand gestures panna maataanga macha, 1/25th second micro-expressions-la dhaan matuvanga.",
              move: "First avanga normal behavior baseline notice pannu: eye blink rate, voice pitch, hand movements.",
              say: "\"Just timeline clear-ah purinjukka kekuren—indha incident nadakkuradhukku munnadi enna aachu nu sollu?\""
            },
            {
              hook: "Deceivers eppodhum cognitive load thanga mudiyama timeline confuse aavanga nanba.",
              move: "Story-ah reverse order-la explain panna sollu, truthful person easy-ah pannuvanga, liar stutters.",
              say: "\"Adhukku munnadi oru 15 minutes munbu nee enga irundha nu konjam reverse-la sollu?\""
            }
          ]
        }
      },
      {
        triggers: ['cheat', 'fake', 'hiding', 'secret', 'suspect', 'trust', 'doubt', 'friend'],
        responses: {
          English: [
            {
              hook: "When someone is innocent, an accusation creates genuine anger; when guilty, it creates performative offense.",
              move: "Notice if they attack your right to ask rather than simply clarifying the facts.",
              say: "I noticed a discrepancy between what you told me Tuesday and what happened today. Help me understand."
            },
            {
              hook: "Pay attention to linguistic qualifiers: 'to be honest', 'frankly', 'swear on my mother'—these are deception amplifiers.",
              move: "Stay silent after they answer. Truthful people relax; deceivers over-explain to fill the void.",
              say: "I see. And what else?"
            }
          ],
          Tanglish: [
            {
              hook: "Guilty people eppodhum 'En mela unakku nambikkai illaya?' nu victim card play pannuvanga macha.",
              move: "Facts-la focus pannu, emotional drama-la divert aagadha.",
              say: "\"Tuesday sonnadhum innaiku nadandhadhum match aagala. Enakku idhoda full picture theva, sollunga.\""
            }
          ]
        }
      }
    ]
  },

  'the-leader': {
    name: 'The Leader',
    topics: [
      {
        triggers: ['hi', 'hello', 'hey', 'start', 'introduce', 'who are you', 'lead', 'boss', 'team', 'macha'],
        responses: {
          English: [
            {
              hook: "Authority is never taken by demanding it; it is granted when you regulate the nervous system of the room.",
              move: "Slow down your cadence, eliminate filler words, and keep your gaze steady while speaking.",
              say: "Here is the non-negotiable objective for Friday. I trust you to decide the execution path. What do you need from me?"
            },
            {
              hook: "Micromanagement is an anxiety disorder masquerading as quality control.",
              move: "Use Commander's Intent: define the clear end-state, then step back and hold extreme operational standards.",
              say: "We are clear on what winning looks like. I'm stepping out of the micro-steps—deliver by 4 PM."
            },
            {
              hook: "Radical Candor is challenging directly while caring personally. Sugarcoating breeds mediocrity.",
              move: "Correct in private within 2 hours of the incident; praise publicly with specific data.",
              say: "Your strategy was solid, but your delivery in that client pitch leaked indecision. Here's how we fix that next time."
            }
          ],
          Tanglish: [
            {
              hook: "Leader-na shout panni command panradhu illa macha—room-oda total anxiety-ah calm panradhu dhaan real leadership.",
              move: "Vocal pitch lower pannu, fillers cut pannu, steady eye contact maintain pannu.",
              say: "\"Indha project-oda end goal clear. Execution unga freedom, output Friday kulla ready aaganum. Enna support venum?\""
            },
            {
              hook: "Micromanagement panna team unna respect panna maataanga nanba.",
              move: "Commander's Intent rule: Clear goal sollu, autonomous execution kuduthu, accountability check pannu.",
              say: "\"Goal enna nu theriyum la? Execution-la full trust irukku, make it happen!\""
            }
          ]
        }
      },
      {
        triggers: ['conflict', 'argue', 'employee', 'fired', 'difficult', 'respect', 'toxic'],
        responses: {
          English: [
            {
              hook: "A high-performer with a toxic attitude destroys team velocity faster than three underperformers.",
              move: "Separate behavioral conduct from technical output; address the culture breach immediately.",
              say: "Your technical numbers are high, but how you spoke to the design team creates unacceptable friction. That stops today."
            },
            {
              hook: "When someone challenges your authority publicly, never raise your voice—stillness is maximum power.",
              move: "Drop vocal tempo by 30%, let their outburst sit in silence for 2 seconds, then address the substance.",
              say: "I hear your frustration. Let's step into my office and evaluate the data."
            }
          ],
          Tanglish: [
            {
              hook: "Public-la yaravathu challenge panna, shout panni react aagadha macha—extreme stillness dhaan royal power.",
              move: "2 seconds calm pause edu, lower tone-la direct boundary set pannu.",
              say: "\"Unga frustration puriyudhu. Cabin-la vaanga, numbers analyze panni decide pannuvom.\""
            }
          ]
        }
      }
    ]
  },

  'the-heart-reader': {
    name: 'Siya',
    topics: [
      {
        triggers: ['hi', 'hello', 'hey', 'start', 'introduce', 'who are you', 'crush', 'date', 'macha', 'siya'],
        responses: {
          English: [
            {
              hook: "The psychological law of Anti-Gravity: when you chase, they pull back; when you find your poise, they lean in.",
              move: "Stop over-analyzing their delayed texts. Match their latency and live your life out loud.",
              say: "\"Looks like you had quite the wild Tuesday! Catch you later.\""
            },
            {
              hook: "Mixed signals are never mixed—indecision is an active decision. Don't build a house on a question mark.",
              move: "Pull back 40% of your initiative; let them step into the empty space if they truly value you.",
              say: "\"Haha fair enough. Let me know when your schedule frees up!\""
            },
            {
              hook: "Desperation repels attraction faster than any physical flaw.",
              move: "Cultivate self-contained emotional gravity: reply when you are genuinely relaxed, not instantly.",
              say: "\"I was just thinking about that cafe we spoke about. Hope your day is going great!\""
            }
          ],
          Tanglish: [
            {
              hook: "Anti-Gravity law macha: nee pinnala oodina avanga thalli povanga, nee calm-ah un life paatha avangale thedi varuvanga.",
              move: "Immediate reply panni needy vibes kaatadha. Un pacing match pannu, tension create aagum.",
              say: "\"Sounds like a super busy day! Catch you later macha!\""
            },
            {
              hook: "Mixed signals-na avanga confuse aagala nanba—un mela priority fix aagala nu artham.",
              move: "Initiative konjam stop pannu, avanga reach out panratha observe pannu.",
              say: "\"Haha cool, un schedule free aagum bodhu sollu pesalam!\""
            },
            {
              hook: "Overthinking kills the romance macha. Stay light, playful, and high value.",
              move: "Chill attitude maintain pannu, emotional pressure podadha.",
              say: "\"Un smile paatha oru lively vibe theriyudhu. What's the secret?\""
            }
          ]
        }
      },
      {
        triggers: ['text', 'ghost', 'late', 'reply', 'delay', 'seen', 'whatsapp', 'instagram', 'story'],
        responses: {
          English: [
            {
              hook: "Leaving you on 'Seen' isn't a rejection of your worth; it's a test of your emotional self-control.",
              move: "Never double-text or send an angry question mark. Absolute silence is your highest leverage move.",
              say: "\"No reply needed—just let 48 hours pass. If they text, reply with light warmth, not eager relief.\""
            },
            {
              hook: "Dry one-word texts are an invitation for you to stop carrying the entire conversational weight.",
              move: "Match their exact energy: end the thread gracefully on a high note instead of digging for topics.",
              say: "\"Haha got it! Catch you around.\""
            }
          ],
          Tanglish: [
            {
              hook: "Seen-la pottutaanga nu double-text panni self-respect vidaadha macha.",
              move: "Complete radio silence maintain pannu. Urgency kaatadha.",
              say: "\"No double text! 2 days chill-ah un work-la focus pannu, gravity reverse aagum.\""
            },
            {
              hook: "Dry 'k', 'hmm' texts vandha conversation-ah force panna koodadhu nanba.",
              move: "Same energy match pannu, conversation-ah gracefully close pannu.",
              say: "\"Haha perfect, catch you later!\""
            }
          ]
        }
      }
    ]
  }
};

/**
 * Generate a dynamic, non-repeating response tailored to the persona, user message, language, and history.
 */
export function generateSituationalResponse({ botId, message = '', language = 'English', history = [] }) {
  const normalizedBotId = String(botId || 'the-heart-reader').toLowerCase();
  let key = 'the-heart-reader';
  if (normalizedBotId.includes('charmer')) key = 'the-charmer';
  else if (normalizedBotId.includes('negotiator')) key = 'the-negotiator';
  else if (normalizedBotId.includes('detective')) key = 'the-detective';
  else if (normalizedBotId.includes('leader')) key = 'the-leader';
  else if (normalizedBotId.includes('heart') || normalizedBotId.includes('siya')) key = 'the-heart-reader';

  const personaConfig = SCENARIOS[key] || SCENARIOS['the-heart-reader'];
  const userTextLower = String(message).toLowerCase().trim();
  const langKey = language?.toLowerCase().includes('tanglish') ? 'Tanglish' : 'English';

  // 1. Detect best matching scenario topic by keywords
  let matchedTopic = null;
  for (const topic of personaConfig.topics) {
    if (topic.triggers.some((trigger) => userTextLower.includes(trigger))) {
      matchedTopic = topic;
      break;
    }
  }

  // Fallback to the first topic or second topic if no keyword matched
  if (!matchedTopic) {
    matchedTopic = personaConfig.topics[personaConfig.topics.length - 1] || personaConfig.topics[0];
  }

  const pool = matchedTopic.responses[langKey] || matchedTopic.responses.English || [];
  if (pool.length === 0) {
    return `🎯 **The Hook**: Clear observation leads to clear strategy.\n💡 **The Move**: Keep your composure and observe the next move.\n💬 **Say This**: "Let's look at the facts and decide together."`;
  }

  // 2. Prevent repetition by checking previous bot replies in history
  const previousBotTexts = history
    .filter((m) => m.role === 'assistant' || m.sender === 'bot' || m.sender === 'siya')
    .map((m) => String(m.text || m.content || ''));

  // Find an item from pool that wasn't used in recent history
  let selected = pool.find((item) => !previousBotTexts.some((prev) => prev.includes(item.hook.slice(0, 25))));

  // If all were used, cycle based on history length offset
  if (!selected) {
    const idx = history.length % pool.length;
    selected = pool[idx];
  }

  const sayLabel = key === 'the-detective' ? 'Ask This' : key === 'the-heart-reader' ? 'Send This' : 'Say This';

  return `🎯 **The Hook**: ${selected.hook}\n\n💡 **The Move**: ${selected.move}\n\n💬 **${sayLabel}**: ${selected.say}`;
}
