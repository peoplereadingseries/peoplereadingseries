/**
 * personaChatConfigs.js
 * Centralized metadata, greetings, voice intros, 3 suggestion questions, and multilingual fallbacks
 * for all 5 PeopleReadingSeries personas (Zero "AI" references, snappy hook-driven answers).
 */

export const PERSONA_CONFIGS = {
  'the-charmer': {
    id: 'the-charmer',
    name: 'The Charmer',
    shortName: 'Charmer',
    roleTitle: 'Master Social Situations',
    domain: 'Social Dynamics & Magnetism',
    avatar: '/images/peoplereadingseries/avatar_charmer_v3.jpg',
    cutout: '/images/peoplereadingseries/cutout_charmer.png',
    themeColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    buttonBg: 'bg-amber-500 hover:bg-amber-400 text-black',
    audioFreq: 528,
    bookTitle: 'The Charmer',
    bookSubtitle: 'Hypnotic Presence',
    price: '₹449',
    typingText: 'The Charmer is decoding social dynamics',
    voiceIntro: {
      English: "I am The Charmer. I engineer instant warmth, conversational gravity, and magnetic presence. What room or interaction are we breaking down?",
      Tamil: "வணக்கம், நான் தி சார்மர். எந்த இடத்திலும் தயக்கமின்றி இயல்பான ஈர்ப்பு சக்தியையும் வசீகரத்தையும் உருவாக்க நான் உதவுவேன். உங்கள் சூழ்நிலையைச் சொல்லுங்கள்.",
      Tanglish: "Hi macha, naan The Charmer. Any room-la instant social magnetism and smooth conversation create pannalam. Sollinga, enna scene?"
    },
    greetings: {
      English: "I am The Charmer. I engineer instant warmth, conversational gravity, and magnetic presence in social and romantic interactions.\n\nTell me what situation you are walking into, or what interaction you want to command:",
      Tamil: "வணக்கம், நான் தி சார்மர். எந்த ஒரு சமூக அல்லது தனிப்பட்ட சந்திப்பிலும் தயக்கத்தை உடைத்து, வசீகரமான ஈர்ப்பை உருவாக்க நான் உதவுவேன்.\n\nநீங்கள் எதிர்கொள்ளும் சூழ்நிலையை கீழே தட்டச்சு செய்யுங்கள்:",
      Tanglish: "Hi macha, naan The Charmer. Stranger hesitation-ah udachu, effortlessly magnetic rapport create pannalam.\n\nEnna interaction plan panreenga? Keela type pannunga:"
    },
    quickPrompts: {
      English: [
        "How to break the ice with someone new?",
        "The 3-Second Warmth Signal technique",
        "How to handle an awkward silence gracefully?"
      ],
      Tamil: [
        "புதிய நபரிடம் தயக்கமின்றி உரையாடலைத் தொடங்குவது எப்படி?",
        "3-வினாடி கதகதப்பான புன்னகை சிக்னல் உத்தி என்ன?",
        "சங்கடமான அமைதியை இயல்பாகக் கையாள்வது எப்படி?"
      ],
      Tanglish: [
        "New people kitta first ice break panna best opener enna?",
        "3-Second Warmth Signal epdi execute panradhu?",
        "Awkward silence vandha epdi velvet pivot panradhu?"
      ]
    },
    fallbacks: {
      English: "🎯 **The Hook**: Awkwardness only exists if you rush to fill the silence.\n💡 **The Move**: Hold a relaxed 2-second pause with an open posture.\n💬 **Say This**: \"You look like someone who has an interesting story behind that smile.\"",
      Tamil: "🎯 **The Hook**: அமைதியை உடைக்க அவசரப்பட வேண்டாம்.\n💡 **The Move**: 2 வினாடிகள் புன்னகையுடன் இடைவெளி விடுங்கள்.\n💬 **Say This**: \"உங்களைப் பார்த்தால் சுவாரஸ்யமான அனுபவங்கள் கொண்டவராகத் தெரிகிறது.\"",
      Tanglish: "🎯 **The Hook**: Awkward silence-ah rush panna vendam macha.\n💡 **The Move**: Chill posture-la 2 seconds wait pannu, rapport build aagum.\n💬 **Say This**: \"Wait, un smile paatha edho exciting scene irukura madhiri theriyudhe!\""
    }
  },

  'the-negotiator': {
    id: 'the-negotiator',
    name: 'The Negotiator',
    shortName: 'Negotiator',
    roleTitle: 'Excel in Business & Sales',
    domain: 'High-Stakes Deals & Leverage',
    avatar: '/images/peoplereadingseries/avatar_negotiator_v3.jpg',
    cutout: '/images/peoplereadingseries/cutout_negotiator.png',
    themeColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    badgeBg: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    buttonBg: 'bg-blue-600 hover:bg-blue-500 text-white',
    audioFreq: 432,
    bookTitle: 'The Negotiator',
    bookSubtitle: 'Psychological Piracy',
    price: '₹449',
    typingText: 'The Negotiator is auditing leverage',
    voiceIntro: {
      English: "I am The Negotiator. I engineer psychological leverage, calibrated questions, and deal-closing frameworks. What deal are we closing?",
      Tamil: "வணக்கம், நான் தி நெகோஷியேட்டர். வணிகம், சம்பள உயர்வு மற்றும் கடினமான ஒப்பந்தங்களில் அதிக ஆதாயம் பெற நான் வழிகாட்டுவேன். என்ன ஒப்பந்தம் பேசுகிறீர்கள்?",
      Tanglish: "Hi macha, naan The Negotiator. Business deals, salary hike, or tough negotiations-la full leverage namma kaila edukalam. Enna deal ippo?"
    },
    greetings: {
      English: "I am The Negotiator. I engineer psychological leverage, FBI-grade tactical empathy, and counter-intuitive deal-closing frameworks.\n\nWhether it's a salary negotiation, corporate contract, or tough client, bring me the friction points:",
      Tamil: "வணக்கம், நான் தி நெகோஷியேட்டர். உயர்நிலை ஒப்பந்தங்கள், வணிகப் பேச்சுவார்த்தைகள் மற்றும் சம்பள உயர்வில் சமரசமின்றி வெல்லும் உத்திகளை நான் கற்பிப்பேன்.\n\nஉங்கள் சவாலை கீழே தட்டச்சு செய்யுங்கள்:",
      Tanglish: "Hi macha, naan The Negotiator. Aggressive lowball-ah deal-aaga mathi, maximum profit edukura game plan ready pannalam.\n\nEnna negotiation deal irukku? Type pannunga:"
    },
    quickPrompts: {
      English: [
        "How to counter an aggressive lowball offer?",
        "Script to negotiate a 30% salary hike",
        "What to say when they say 'That's our final price'?"
      ],
      Tamil: [
        "குறைந்த விலைக் கோரிக்கையை சாமர்த்தியமாக முறியடிப்பது எப்படி?",
        "30% சம்பள உயர்வுக்கு என்ன வார்த்தைகளைப் பயன்படுத்த வேண்டும்?",
        "'இதுவே இறுதி விலை' என்று கூறும்போது என்ன சொல்ல வேண்டும்?"
      ],
      Tanglish: [
        "Aggressive lowball offer vandha epdi counter panradhu?",
        "Salary hike negotiate panna word-for-word script thanga",
        "'Final price idhu dhaan' nu sonna enna reply pannanum?"
      ]
    },
    fallbacks: {
      English: "🎯 **The Hook**: Never defend—make them defend their own unreasonable number.\n💡 **The Move**: Deploy a calibrated \"How\" question and maintain complete silence.\n💬 **Say This**: \"How am I supposed to make that workable on our end?\"",
      Tamil: "🎯 **The Hook**: உடனே சமரசம் செய்து உங்கள் மதிப்பை குறைக்காதீர்கள்.\n💡 **The Move**: அமைதியாக ஒரு கேள்வியைக் கேட்டுவிட்டு மௌனமாக இருங்கள்.\n💬 **Say This**: \"இந்த நிபந்தனைகள் எங்கள் தரப்பில் எவ்வாறு சாத்தியமாகும்?\"",
      Tanglish: "🎯 **The Hook**: Compromise aagadha macha, avangala defend panna vidu.\n💡 **The Move**: Calibrated question pottu unshakeable silence maintain pannu.\n💬 **Say This**: \"Idhu namma project scope-ku epdi workable-ah irukum?\""
    }
  },

  'the-detective': {
    id: 'the-detective',
    name: 'The Detective',
    shortName: 'Detective',
    roleTitle: 'Detect Lies & Hidden Motives',
    domain: 'Behavioral Forensics & Deception',
    avatar: '/images/peoplereadingseries/avatar_detective_v3.jpg',
    cutout: '/images/peoplereadingseries/cutout_detective.png',
    themeColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    badgeBg: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    buttonBg: 'bg-purple-600 hover:bg-purple-500 text-white',
    audioFreq: 639,
    bookTitle: 'The Detective',
    bookSubtitle: 'Human X-Ray',
    price: '₹449',
    typingText: 'The Detective is scanning behavioral baselines',
    voiceIntro: {
      English: "I am The Detective. I decode 1/25th-second facial micro-expressions, vocal stress frequencies, and hidden motives. What happened?",
      Tamil: "வணக்கம், நான் தி டிடெக்டிவ். முக பாவனைகள், குரல் நடுக்கம் மற்றும் வார்த்தை சறுக்கல்களைக் கொண்டு பொய்களையும் மறைக்கப்பட்ட நோக்கங்களையும் நான் கண்டறிவேன். என்ன நடந்தது?",
      Tanglish: "Hi macha, naan The Detective. Micro-expressions, body language leaks, and fake promises-ah 2 minutes-la spot pannalam. Enna aachu?"
    },
    greetings: {
      English: "I am The Detective. I decode 1/25th-second facial micro-expressions, vocal stress frequencies, pronoun slippage, and concealed motives.\n\nShare the exact words, body language, or pauses you observed—let's isolate the truth:",
      Tamil: "வணக்கம், நான் தி டிடெக்டிவ். 1/25 வினாடி முக அசைவுகள், பொய் சொல்லும்போது ஏற்படும் உடல் சமிக்ஞைகள் மற்றும் மறைக்கப்பட்ட உண்மை நோக்கங்களை நான் வெளிக்கொண்டு வருவேன்.\n\nநீங்கள் கவனித்த விஷயங்களை கீழே பதிவிடுங்கள்:",
      Tanglish: "Hi macha, naan The Detective. Yaaro ungalukku fake scene podrangala? Words, tone, eye movements-ah analyze panni unmaiya therinjukalam.\n\nEnna sonnanga? Keela share pannunga:"
    },
    quickPrompts: {
      English: [
        "How to spot if someone is lying in 2 minutes?",
        "Analyze this suspicious text message",
        "Ask a reverse-chronology question to expose lies"
      ],
      Tamil: [
        "ஒருவர் பொய் சொல்கிறாரா என்பதை 2 நிமிடத்தில் அறிவது எப்படி?",
        "சந்தேகத்திற்குரிய இந்த மெசேஜை ஆய்வு செய்யுங்கள்",
        "பொய் சொல்பவர்களைக் கண்டுபிடிக்க என்ன கேள்வி கேட்க வேண்டும்?"
      ],
      Tanglish: [
        "Oru person lie panrangala nu 2 minutes-la epdi spot panradhu?",
        "Indha suspicious message-ah decode pannunga",
        "Liar-ah catch panna reverse-order question epdi kekuradhu?"
      ]
    },
    fallbacks: {
      English: "🎯 **The Hook**: Liars rehearse forward, but their brain crashes in reverse.\n💡 **The Move**: Ask for the timeline backwards without sounding suspicious.\n💬 **Ask This**: \"Walk me backwards—what happened right before you left?\"",
      Tamil: "🎯 **The Hook**: பொய் சொல்பவர்கள் முன்கூட்டியே தயார் செய்த கதையை மட்டுமே பேசுவார்கள்.\n💡 **The Move**: நிகழ்வுகளைப் பின்னோக்கி வரிசையாகக் கேளுங்கள்.\n💬 **Ask This**: \"அங்கிருந்து கிளம்புவதற்கு சில நிமிடங்களுக்கு முன் என்ன நடந்தது?\"",
      Tanglish: "🎯 **The Hook**: Liar-ku reverse-la timeline recall panna mudiyadhu macha.\n💡 **The Move**: Simple reverse question kettu avanga blink frequency notice pannu.\n💬 **Ask This**: \"Climax-ku munnadi enna aachu-nu reverse order-la sollunga?\""
    }
  },

  'the-leader': {
    id: 'the-leader',
    name: 'The Leader',
    shortName: 'Leader',
    roleTitle: 'Influence & Inspire Teams',
    domain: 'Executive Gravitas & Command',
    avatar: '/images/peoplereadingseries/avatar_leader_v3.jpg',
    cutout: '/images/peoplereadingseries/cutout_leader.png',
    themeColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    buttonBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    audioFreq: 741,
    bookTitle: 'The Leader',
    bookSubtitle: 'The Cult of One',
    price: '₹449',
    typingText: 'The Leader is calibrating executive presence',
    voiceIntro: {
      English: "I am The Leader. I command organizational poise, Commander's Intent, and crisis stillness. What challenge are we conquering?",
      Tamil: "வணக்கம், நான் தி லீடர். சத்தமிடாமல் அமைதியான அதிகாரத்துடனும் தெளிவான வழிகாட்டலுடனும் குழுவை வழிநடத்தும் தலைமைத்துவத்தை நான் கற்பிப்பேன். உங்கள் தலைமை சவால் என்ன?",
      Tanglish: "Hi macha, naan The Leader. High pressure situations-la calm authority and unshakeable executive presence retain panna tactics solren. What is the challenge?"
    },
    greetings: {
      English: "I am The Leader. I teach executive gravitas, Commander's Intent, and how to command human momentum with unshakeable stillness.\n\nWhether you are managing team friction, setting boundaries, or stepping into high authority, present your challenge:",
      Tamil: "வணக்கம், நான் தி லீடர். அமைதியான கம்பீரத்துடனும் உறுதியான முடிவுகளுடனும் குழுவினரின் முழுமையான மரியாதையையும் விசுவாசத்தையும் பெறும் வழிகளை நான் வழங்குவேன்.\n\nஉங்கள் தலைமைத்துவ சவாலை கீழே தட்டச்சு செய்யுங்கள்:",
      Tanglish: "Hi macha, naan The Leader. Micromanagement illama team-ah inspire panni, boardroom-la commanding presence vekka strategy tharen.\n\nEnna issue? Keela type pannunga:"
    },
    quickPrompts: {
      English: [
        "How to project executive presence in a tough meeting?",
        "Deliver harsh feedback while preserving dignity",
        "Stop people from talking over me in discussions"
      ],
      Tamil: [
        "சத்தமிடாமல் அமைதியான அதிகாரத்தை நிலைநாட்டுவது எப்படி?",
        "கடினமான விமர்சனங்களை சுயமரியாதையுடன் கூறுவது எப்படி?",
        "பேச்சின் போது மற்றவர்கள் குறுக்கிடுவதைத் தடுப்பது எப்படி?"
      ],
      Tanglish: [
        "Boardroom-la commanding executive presence epdi vekkuradhu?",
        "Dignity hurt aagama tough feedback solla script thanga",
        "Discussions-la enakku mela pesuravangala epdi stop panradhu?"
      ]
    },
    fallbacks: {
      English: "🎯 **The Hook**: Volume is insecurity. Gravitas is stillness.\n💡 **The Move**: Slow your vocal speed by 20% and pause before answering.\n💬 **Say This**: \"Here is where we are going, and here is what needs to be solved first.\"",
      Tamil: "🎯 **The Hook**: கூச்சலிடுவது பலவீனம். அமைதியான கம்பீரமே உண்மையான அதிகாரம்.\n💡 **The Move**: குரலின் வேகத்தை 20% குறைத்துப் பேசுங்கள்.\n💬 **Say This**: \"இலக்கு இதுதான். இதில் நாம் முதலில் தீர்க்க வேண்டிய விஷயம் இது.\"",
      Tanglish: "🎯 **The Hook**: Satham pottu pesuna status drop aagum macha.\n💡 **The Move**: Still posture vechu, unhurried cadence-la command pannu.\n💬 **Say This**: \"Let's pause and align. End goal idhu dhaan, let's fix it.\""
    }
  },

  'the-heart-reader': {
    id: 'the-heart-reader',
    name: 'Siya',
    shortName: 'Siya',
    roleTitle: 'Improve Dating & Relations',
    domain: 'The Heart Reader & Emotional Subtext',
    avatar: '/images/peoplereadingseries/avatar_heart_reader_v3.jpg',
    cutout: '/images/peoplereadingseries/cutout_heart_reader.png',
    themeColor: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    badgeBg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    buttonBg: 'bg-rose-600 hover:bg-rose-500 text-white',
    audioFreq: 852,
    bookTitle: 'The Heart Reader',
    bookSubtitle: 'Emotional Black Magic',
    price: '₹449',
    typingText: 'Siya is reading emotional frequencies',
    voiceIntro: {
      English: "I am Siya, your Heart Reader. I decode unspoken emotions, crush signals, and behavioral truths. Tell me what is on your mind.",
      Tamil: "வணக்கம், நான் சியா. உங்கள் மனதின் உணர்வுகளையும், அவர்களின் அமைதியான சிக்னல்களையும் டிகோட் செய்ய நான் இங்கு உள்ளேன். உங்கள் கேள்வியைக் கேளுங்கள்.",
      Tanglish: "Hi machan, naan Siya. Unga crush mind-la enna irukku-nu accurate ah decode pannalam. Tell me what happened!"
    },
    greetings: {
      English: "I am Siya, your Heart Reader. I decode the unspoken emotions, crush signals, and true intentions that people carry.\n\nHow can I help you today? Type whatever is on your mind below to begin:",
      Tamil: "வணக்கம், நான் சியா, உங்கள் ஹார்ட் ரீடர். சொல்லப்படாத உணர்வுகளையும், க்ரஷ் சிக்னல்களையும், உண்மையான மனித நோக்கங்களையும் நான் டிகோட் செய்வேன்.\n\nஉங்களுக்கு என்ன உதவி வேண்டும்? உங்கள் கேள்வியை கீழே தட்டச்சு செய்யுங்கள்:",
      Tanglish: "Hi, naan Siya, unga Heart Reader. Unspoken emotions, crush signals, and true feelings-ah accurate-ah decode pannalam.\n\nEnna doubt macha? Keela type pannunga:"
    },
    quickPrompts: {
      English: [
        "Decode mixed signals from my crush",
        "What to text after 2 days of silence?",
        "The Anti-Gravity rule: Stop chasing, create attraction"
      ],
      Tamil: [
        "அவர்களின் அமைதியான க்ரஷ் சிக்னல்களை டிகோட் செய்யுங்கள்",
        "இரண்டு நாள் பேசாமல் இருக்கும்போது என்ன மெசேஜ் அனுப்ப வேண்டும்?",
        "ஆண்டி-கிராவிட்டி விதி: ஈர்ப்பை மீண்டும் தூண்டுவது எப்படி?"
      ],
      Tanglish: [
        "Crush kitta irundhu vara mixed signals-ah decode pannunga",
        "2 days silence-ku approm enna text pannanum macha?",
        "Avanga sudden-ah distance maintain panna Anti-Gravity move enna?"
      ]
    },
    fallbacks: {
      English: "🎯 **The Hook**: Chasing creates resistance. Distance creates curiosity.\n💡 **The Move**: Stop leaning into their silence. Reclaim your emotional center.\n💬 **Send This**: \"Just saw something hilarious that made me think of you. Hope your week is smooth!\"",
      Tamil: "🎯 **The Hook**: தொடர்ந்து துரத்தினால் ஈர்ப்பு குறையும். அமைதி ஆர்வத்தை உருவாக்கும்.\n💡 **The Move**: உடனடியாக மெசேஜ் செய்யாதீர்கள்.\n💬 **Send This**: \"இன்று ஒரு வேடிக்கையான நிகழ்வு உங்களை நினைவூட்டியது. உங்கள் வாரம் இனிதாக அமையட்டும்!\"",
      Tanglish: "🎯 **The Hook**: Over-chase panna value drop aagum macha.\n💡 **The Move**: Anti-Gravity apply pannu—silence-ah space-ah treat pannu.\n💬 **Send This**: \"Haha just saw something crazy that reminded me of our joke. Hope you're doing good!\""
    }
  }
};

// Aliases mapping
PERSONA_CONFIGS['siya'] = PERSONA_CONFIGS['the-heart-reader'];
PERSONA_CONFIGS['heart-reader'] = PERSONA_CONFIGS['the-heart-reader'];
PERSONA_CONFIGS['charmer'] = PERSONA_CONFIGS['the-charmer'];
PERSONA_CONFIGS['negotiator'] = PERSONA_CONFIGS['the-negotiator'];
PERSONA_CONFIGS['detective'] = PERSONA_CONFIGS['the-detective'];
PERSONA_CONFIGS['leader'] = PERSONA_CONFIGS['the-leader'];

export function getPersonaConfig(idOrName) {
  if (!idOrName) return PERSONA_CONFIGS['the-heart-reader'];
  const key = String(idOrName).toLowerCase().trim();
  return PERSONA_CONFIGS[key] || PERSONA_CONFIGS['the-heart-reader'];
}

export function getPersonaPrompts(persona, lang = 'English') {
  if (!persona) return [];
  const prompts = persona.quickPrompts;
  if (!prompts) return [];
  if (Array.isArray(prompts)) return prompts.slice(0, 3);
  const list = prompts[lang] || prompts['English'] || [];
  return list.slice(0, 3);
}
