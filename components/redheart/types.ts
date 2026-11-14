export enum Language {
  ENGLISH = 'English',
  TAMIL = 'Tamil',
  TANGLISH = 'Tanglish'
}

export enum ToolType {
  HEART_REVEALER = 'Heart Revealer',
  GOLDEN_MOVE = 'Golden Move',
  TRANSLATOR = 'The Translator',
  EXPERT_PANEL = 'Expert Panel',
  SANDBOX = 'Sandbox',
  CHARACTER_REVEALER = 'Character Revealer'
}

export interface AnalysisResult {
  title: string;
  vibe: 'positive' | 'neutral' | 'negative' | 'caution';
  analysis: string;
  recommendation: string;
  scripts?: string[];
  scientificBase: string;
}

export interface ViewProps {
  onBack: () => void;
  language: Language;
}

export interface TrendingVibePattern {
  id: string;
  rank: number;
  name: string;
  badge: string;
  trendMetric: string;
  archetype: string;
  microCue: string;
  subconsciousReality: string;
  historicalContext: string;
  seasonalAdvice: string;
  actionStep: string;
  suggestedScript: string;
  recommendedTool: ToolType;
  starterPrompt: string;
  accentColor: string;
  glowColor: number;
}

export interface AppTranslations {
  headerTitle: string;
  home: string;
  sandbox: string;
  progress: string;
  greeting: string;
  subGreeting: string;
  vibeHackTitle: string;
  vibeHackText: string;
  tools: Record<ToolType, { title: string; desc: string }>;
  voiceIntro: string;
  inputPlaceholder: string;
  inputLabel: string;
  decodeButton: string;
  sandboxTitle: string;
  sandboxDesc: string;
  sandboxPlaceholder: string;
  sandboxButton: string;
  quickStarters: string;
  prompts: Record<ToolType, string[]>;
  sandboxPrompts: string[];
  charRevealer: {
    title: string;
    desc: string;
    button: string;
    categories: {
      style: string;
      energy: string;
      vibe: string;
      demeanor: string;
    };
    options: {
      style: string[];
      energy: string[];
      vibe: string[];
      demeanor: string[];
    };
  };
  // Trending Behavioral Vibe Patterns
  trendingSectionTitle: string;
  trendingSectionSubtitle: string;
  trendingBadge: string;
  view3dRadar: string;
  rotatePrompt3d: string;
  tacticalMoveLabel: string;
  copyScriptLabel: string;
  copiedLabel: string;
  testInToolLabel: string;
  historicalBaseLabel: string;
  subconsciousLabel: string;
  microCueLabel: string;
  seasonalTipLabel: string;
  listenToSiyaLabel: string;
  trendingPatterns: TrendingVibePattern[];
}

export const translations: Record<Language, AppTranslations> = {
  [Language.ENGLISH]: {
    headerTitle: "Red Heart Reader",
    home: "Home",
    sandbox: "Sandbox",
    progress: "Progress",
    greeting: "Ready to read their heart?",
    subGreeting: "The ultimate crush strategist is here.",
    vibeHackTitle: "Siya's Daily Vibe Hack",
    vibeHackText: "Patience is key. Silence gives you room to see the true pattern.",
    voiceIntro: "I am Siya, your expert guide. Tell me what's on your mind.",
    inputPlaceholder: "Paste your chat here or describe what happened...",
    inputLabel: "Analyze with Siya:",
    decodeButton: "DECODE VIBE",
    sandboxTitle: "Siya's Sandbox",
    sandboxDesc: "Vent your feelings. I'll help you find calm.",
    sandboxPlaceholder: "I'm so frustrated! Why are they doing this...",
    sandboxButton: "RECALIBRATE",
    quickStarters: "Quick Starts:",
    prompts: {
      [ToolType.HEART_REVEALER]: ["Left on read for 5 hours", "They just said 'K'", "Sent a heart emoji", "Replied with just a meme"],
      [ToolType.GOLDEN_MOVE]: ["How to start a convo?", "Asking for their number", "Asking to hang out", "Congratulating them"],
      [ToolType.TRANSLATOR]: ["They said 'I'm bored'", "Asked 'What you doing?'", "Shared a song with me", "Complimented my pic"],
      [ToolType.EXPERT_PANEL]: ["I double texted", "I'm always the one texting first", "They leave me on seen", "Convo feels dry"],
      [ToolType.SANDBOX]: ["Anxious energy", "Feeling ignored", "Overthinking everything", "Want to yell!"],
      [ToolType.CHARACTER_REVEALER]: []
    },
    sandboxPrompts: ["Feeling ignored", "Overthinking everything", "Anxious energy", "Want to yell!"],
    charRevealer: {
      title: "Crush Unreveal",
      desc: "Build their profile and I'll reveal who they really are.",
      button: "REVEAL CHARACTER",
      categories: {
        style: "Style (Dressing/Makeup)",
        energy: "Energy Type",
        vibe: "World View",
        demeanor: "Presence"
      },
      options: {
        style: ["Casual/Simple", "Stylish/Trendy", "Minimalist", "Bold/Heavy"],
        energy: ["Deep Introvert", "Loud Extrovert", "Quiet Extrovert", "Private"],
        vibe: ["Modern/Global", "Traditional", "Fusion/Mix", "Edgy/Rebel"],
        demeanor: ["Silent/Observant", "Loud/Funny", "Serious/Calm", "Hyper/Active"]
      }
    },
    tools: {
      [ToolType.HEART_REVEALER]: { title: "Heart Revealer", desc: "Decode their text patterns and micro-vibe." },
      [ToolType.GOLDEN_MOVE]: { title: "Golden Move", desc: "Low-pressure scripts to break the ice." },
      [ToolType.TRANSLATOR]: { title: "The Translator", desc: "Find hidden 'bids' for connection." },
      [ToolType.EXPERT_PANEL]: { title: "Expert Panel", desc: "Get feedback on your strategy." },
      [ToolType.SANDBOX]: { title: "Siya's Sandbox", desc: "Vent and recalibrate your energy." },
      [ToolType.CHARACTER_REVEALER]: { title: "Character Revealer", desc: "Analyze personality from their looks and vibe." }
    },
    trendingSectionTitle: "Today's Trending Behavioral 'Vibe' Patterns",
    trendingSectionSubtitle: "Real-time crush psychology patterns, behavioral data & seasonal advice curated by Siya.",
    trendingBadge: "Siya's 3D Radar • 3 Active Patterns",
    view3dRadar: "Interactive 3D Vibe Core",
    rotatePrompt3d: "Drag to rotate in 3D • Tap vibes to recalibrate resonance",
    tacticalMoveLabel: "Siya's Tactical Move",
    copyScriptLabel: "Copy Icebreaker Script",
    copiedLabel: "Copied to clipboard!",
    testInToolLabel: "Open & Test with Siya",
    historicalBaseLabel: "Historical Data & Science",
    subconsciousLabel: "The Subconscious Reality",
    microCueLabel: "The Micro-Behavioral Cue",
    seasonalTipLabel: "Seasonal Advice from Siya",
    listenToSiyaLabel: "Listen to Siya's Advice",
    trendingPatterns: [
      {
        id: "micro-echo",
        rank: 1,
        name: "The Micro-Echo (Reciprocal Cadence)",
        badge: "🔥 #1 Most Observed Today",
        trendMetric: "+41% surge in young daters",
        archetype: "Curious Warmth (Masked Nonchalance)",
        microCue: "They match your exact message length, punctuation, or reply delay (e.g. if you take 40 mins, they reply in 38 mins), while using casual words.",
        subconsciousReality: "They are hyper-aware of pacing and terrified of looking 'too eager', so they calibrate to your rhythm like an emotional chameleon.",
        historicalContext: "Behavioral social synchrony: In pre-relationship phases, subconscious latency matching occurs in 73% of mutual attractions before any verbal flirtation.",
        seasonalAdvice: "Mid-season dating creates pacing anxiety. Don't play the delay game back. Disrupt the echo loop gently with an authentic binary question or spontaneous voice note.",
        actionStep: "Break the mirror-loop with low-pressure warmth.",
        suggestedScript: "Wait, random question for you—are you strictly a hot chai person in the morning or iced coffee all year round?",
        recommendedTool: ToolType.GOLDEN_MOVE,
        starterPrompt: "They take the exact same time as me to reply and match my text length. How do I break the ice naturally?",
        accentColor: "rose",
        glowColor: 0xf43f5e
      },
      {
        id: "phantom-orbit",
        rank: 2,
        name: "The 36-Hour Phantom Orbit",
        badge: "⚡ High Volatility Pattern",
        trendMetric: "Spikes every weekend & post-deep-chat",
        archetype: "Vulnerability Hesitation (The Orbit)",
        microCue: "After a great, late-night deep conversation, they go completely silent for 24-36 hours—yet they view all your stories within seconds.",
        subconsciousReality: "The 'Vulnerability Hangover'. They felt surprisingly close to you, panicked about showing too much interest, and pulled back to regain internal composure.",
        historicalContext: "Crush psychology studies show 64% of avoidant-leaning crushes retreat momentarily after emotional intimacy to gauge if the connection is safe.",
        seasonalAdvice: "Do NOT double-text asking 'Did I do something wrong?'. Stay anchored in your own high value. When they reappear with a low-stakes meme or like, respond with easy warmth.",
        actionStep: "Provide safe emotional runway with zero passive aggression.",
        suggestedScript: "Haha this meme is painfully accurate 😂 Hope your week has been smooth!",
        recommendedTool: ToolType.HEART_REVEALER,
        starterPrompt: "We had an amazing 2-hour chat, now they've been silent for 36 hours but watch all my stories instantly. What is their vibe?",
        accentColor: "purple",
        glowColor: 0xa855f7
      },
      {
        id: "breadcrumb-beacon",
        rank: 3,
        name: "The Breadcrumb Beacon",
        badge: "✨ Covert Connection Bid",
        trendMetric: "+58% spike on status & stories",
        archetype: "Covert Invitation (Testing the waters)",
        microCue: "They post a story or status with a specific song, niche movie, or food spot you casually recommended 3 days ago—without tagging you.",
        subconsciousReality: "A non-threatening 'Bid for Connection' (Gottman framework). They are lighting a beacon hoping you will notice and reach out first.",
        historicalContext: "Digital signaling analysis indicates 81% of untagged references to specific past chats are intentional probes for emotional validation.",
        seasonalAdvice: "Claim the breadcrumb playfully! Don't let it pass. It is a green light to initiate a low-risk banter interaction.",
        actionStep: "Claim the reference directly with playful charm.",
        suggestedScript: "Excuse me, is that my soundtrack recommendation I spot? What's your official track review?",
        recommendedTool: ToolType.TRANSLATOR,
        starterPrompt: "They posted a song I recommended 3 days ago on their story without tagging me. Is this a hint for me to message?",
        accentColor: "amber",
        glowColor: 0xf59e0b
      }
    ]
  },
  [Language.TAMIL]: {
    headerTitle: "சிவப்பு இதய வாசகர்",
    home: "முகப்பு",
    sandbox: "சாண்ட்பாக்ஸ்",
    progress: "முன்னேற்றம்",
    greeting: "அவர் இதயத்தைப் படிக்கத் தயாரா?",
    subGreeting: "சிறந்த காதல் வியூகவாதி இங்கே இருக்கிறார்.",
    vibeHackTitle: "சியாவின் இன்றைய குறிப்பு",
    vibeHackText: "பொறுமை தான் முக்கியம். அமைதி உண்மையான வழியைக் காட்டும்.",
    voiceIntro: "வணக்கம், நான் சியா. உங்கள் ஆலோசகர். உங்களுக்கு எப்படி உதவட்டும்?",
    inputPlaceholder: "உங்கள் உரையாடலை இங்கே பகிரவும்...",
    inputLabel: "சியாவுடன் பகுப்பாய்வு செய்க:",
    decodeButton: "உணர்வை அறிவோம்",
    sandboxTitle: "சாண்ட்பாக்ஸ்",
    sandboxDesc: "உங்கள் கவலைகளைப் பகிரவும். அமைதி பெற உதவுகிறேன்.",
    sandboxPlaceholder: "நான் மிகுந்த கவலையில் உள்ளேன்...",
    sandboxButton: "சீரமைக்கவும்",
    quickStarters: "உடனடித் தேர்வுகள்:",
    prompts: {
      [ToolType.HEART_REVEALER]: ["5 மணிநேரம் பதில் இல்லை", "வெறும் 'K' என்று சொன்னார்", "இதய எமோஜி அனுப்பினார்", "வெறும் மீம் அனுப்பினார்"],
      [ToolType.GOLDEN_MOVE]: ["பேச்சைத் தொடங்குவது எப்படி?", "அவர் எண் கேட்பது எப்படி?", "வெளியே செல்ல அழைப்பது?", "வாழ்த்து சொல்வது?"],
      [ToolType.TRANSLATOR]: ["'எனக்கு போர் அடிக்குது' என்றார்", "என்ன பண்றீங்கனு கேட்டார்", "பாடல் ஒன்றை பகிர்ந்தார்", "என் படத்தை புகழ்ந்தார்"],
      [ToolType.EXPERT_PANEL]: ["மீண்டும் மெசேஜ் செய்தேன்", "நானே முதலில் மெசேஜ் செய்கிறேன்", "பார்த்தும் பதில் இல்லை", "பேச்சு காய்ந்துவிட்டது"],
      [ToolType.SANDBOX]: ["மிகுந்த கவலை", "புறக்கணிக்கப்பட்ட உணர்வு", "அதிகமாக யோசிக்கிறேன்", "கத்த வேண்டும் போல் உள்ளது!"],
      [ToolType.CHARACTER_REVEALER]: []
    },
    sandboxPrompts: ["மிகுந்த கவலை", "புறக்கணிக்கப்பட்ட உணர்வு", "அதிகமாக யோசிக்கிறேன்", "கத்த வேண்டும் போல் உள்ளது!"],
    charRevealer: {
      title: "சுபாவத்தை அறிவோம்",
      desc: "அவரைப் பற்றிய விவரங்களைக் கொடுங்கள், நான் அவர் சுபாவத்தைச் சொல்கிறேன்.",
      button: "சுபாவத்தை வெளிப்படுத்து",
      categories: {
        style: "ஆடை அலங்காரம்",
        energy: "ஆற்றல் வகை",
        vibe: "உலகப் பார்வை",
        demeanor: "நடத்தை"
      },
      options: {
        style: ["எளிமையானது", "நவீனமானது", "மிகக்குறைந்த", "அடர்த்தியானது"],
        energy: ["அமைதியானவர்", "துறுதுறுப்பானவர்", "தனிமையை விரும்புபவர்", "வெளிப்படையானவர்"],
        vibe: ["நவீன காலம்", "பாரம்பரியம்", "இரண்டும் கலந்தது", "புரட்சிகரமானது"],
        demeanor: ["கவனிப்பவர்", "கிண்டல் செய்பவர்", "அமைதியானவர்", "வேகமானவர்"]
      }
    },
    tools: {
      [ToolType.HEART_REVEALER]: { title: "இதய உணர்வு", desc: "அவர்களின் குறுஞ்செய்திகளைப் புரிந்துகொள்ள." },
      [ToolType.GOLDEN_MOVE]: { title: "சிறந்த நகர்வு", desc: "பேசத் தொடங்குவதற்கான வழிகள்." },
      [ToolType.TRANSLATOR]: { title: "மொழிபெயர்ப்பாளர்", desc: "மறைக்கப்பட்ட அழைப்புகளைக் கண்டறிய." },
      [ToolType.EXPERT_PANEL]: { title: "நிபுணர் குழு", desc: "உங்கள் அணுகுமுறை பற்றிய கருத்துக்கள்." },
      [ToolType.SANDBOX]: { title: "சாண்ட்பாக்ஸ்", desc: "மன அழுத்தத்தை போக்கி அமைதி பெற." },
      [ToolType.CHARACTER_REVEALER]: { title: "குணச்சித்திரம்", desc: "அவர் தோற்றத்தை வைத்து குணத்தை அறிவோம்." }
    },
    trendingSectionTitle: "இன்றைய 3 முக்கிய காதல் உணர்வுப் பாணிகள்",
    trendingSectionSubtitle: "உளவியல் தரவுகள் மற்றும் சியாவின் பருவகால ஆலோசனைகளுடன் கூடிய நேரலை ஆய்வு.",
    trendingBadge: "சியாவின் 3D ரேடார் • 3 நேரலை பாணிகள்",
    view3dRadar: "முப்பரிமாண (3D) இதய ரேடார்",
    rotatePrompt3d: "சுழற்றிப் பார்க்கவும் • புதிய அதிர்வுகளை உணர தொடவும்",
    tacticalMoveLabel: "சியாவின் சாதுரிய நகர்வு",
    copyScriptLabel: "பதில் உரையை நகலெடு",
    copiedLabel: "நகலெடுக்கப்பட்டது!",
    testInToolLabel: "சியாவுடன் சோதிக்கவும்",
    historicalBaseLabel: "உளவியல் வரலாற்றுத் தரவு",
    subconsciousLabel: "அடிமனதின் உண்மை நிலை",
    microCueLabel: "நுண்ணிய நடத்தை அடையாளம்",
    seasonalTipLabel: "சியாவின் இன்றைய பருவகாலக் குறிப்பு",
    listenToSiyaLabel: "சியாவின் குரல் ஆலோசனையைக் கேள்",
    trendingPatterns: [
      {
        id: "micro-echo",
        rank: 1,
        name: "மைக்ரோ-எக்கோ (நேர மற்றும் எழுத்து ஒத்திசைவு)",
        badge: "🔥 இன்று அதிகம் நடப்பது",
        trendMetric: "+41% இளைய தலைமுறை பயன்பாடு",
        archetype: "அக்கறை மறைத்த அமைதி",
        microCue: "நீங்கள் அனுப்பும் செய்தி நீளத்திற்கும், எடுக்கும் நேரத்திற்கும் சமமாகவே அவர்களும் பதில் அனுப்புவார்கள்.",
        subconsciousReality: "அவர்கள் உங்கள் மீது அதீத ஆர்வம் கொண்டுள்ளனர், ஆனால் அதை வெளிப்படையாகக் காட்டிவிடக் கூடாது என்று கவனமாக இருக்கிறார்கள்.",
        historicalContext: "சமூக ஒத்திசைவு விதி: பரஸ்பர ஈர்ப்பு ஏற்படும்போது 73% நபர்கள் பேச்சில் வெளிப்படுத்தும் முன்பே நேரம் மற்றும் பாணியை ஒத்திசைக்கிறார்கள்.",
        seasonalAdvice: "அவர்கள் போலவே நேரத்தை இழுக்காதீர்கள். இனிமையான ஒரு குரல் பதிவு அல்லது ஒரு எளிய தேர்வு கேள்வியால் இந்த வட்டத்தை உடையுங்கள்.",
        actionStep: "இயல்பான ஒரு புதிய கேள்வியால் உரையாடலை முன்னெடுங்கள்.",
        suggestedScript: "ஒரு சின்ன கேள்வி—காலையில ஃபில்டர் காபியா இல்ல டீயா உங்களுக்கு பிடிக்கும்?",
        recommendedTool: ToolType.GOLDEN_MOVE,
        starterPrompt: "நான் மெசேஜ் பண்ண அதே டைம் எடுத்து அதே அளவுக்கு பதில் அனுப்புறாங்க, எப்படி இயல்பா தொடங்குவது?",
        accentColor: "rose",
        glowColor: 0xf43f5e
      },
      {
        id: "phantom-orbit",
        rank: 2,
        name: "36-மணிநேர பாண்டம் ஆர்பிட்",
        badge: "⚡ அதிக ஏற்ற இறக்கம் உள்ள நிலை",
        trendMetric: "வார இறுதி நாட்களில் அதிகரிக்கும்",
        archetype: "தயக்கமும் பின்வாங்கலும்",
        microCue: "நீண்ட நேரம் மனம் திறந்து பேசிய பிறகு, 24 முதல் 36 மணி நேரம் மெசேஜ் இல்லை—ஆனால் உங்கள் ஸ்டோரியை உடனடியாகப் பார்ப்பார்கள்.",
        subconsciousReality: "அதிகமாகப் பேசிவிட்டோமோ என்ற அவநம்பிக்கை மற்றும் தற்காப்பு உணர்வு. உங்கள் எதிர்வினையை ஆராய்கிறார்கள்.",
        historicalContext: "ஆய்வுகளின்படி 64% பேர் ஆழமான உணர்வுகளைப் பகிர்ந்த பின் பயத்தின் காரணமாக சிறிது காலம் பின்தங்குகிறார்கள்.",
        seasonalAdvice: "அவசரப்பட்டு 'ஏன் பேசல?' என்று கோபப்படாதீர்கள். அவர்கள் ஒரு மீம் அல்லது லைக் போடும் போது இயல்பாகப் பேசுங்கள்.",
        actionStep: "பாதுகாப்பான உணர்வைத் தந்து அமைதியாக இருங்கள்.",
        suggestedScript: "ஹா ஹா இந்த மீம் ரொம்ப பொருத்தமா இருக்கு 😂 உங்க இந்த வாரம் நல்லா போய்ட்டு இருக்கா?",
        recommendedTool: ToolType.HEART_REVEALER,
        starterPrompt: "ரெண்டு மணி நேரம் நல்லா பேசுனாங்க, இப்போ 36 மணி நேரமா மெசேஜ் இல்ல ஆனா ஸ்டோரி உடனே பாக்குறாங்க. என்ன நடக்குது?",
        accentColor: "purple",
        glowColor: 0xa855f7
      },
      {
        id: "breadcrumb-beacon",
        rank: 3,
        name: "ரொட்டித் துண்டு சமிக்ஞை (பிரெட்க்ரம்ப் பீக்கன்)",
        badge: "✨ மறைமுகத் தொடர்பு அழைப்பு",
        trendMetric: "+58% ஸ்டோரி பகிர்வுகளில் உயர்வு",
        archetype: "மறைமுக அழைப்பு",
        microCue: "நீங்கள் 3 நாட்களுக்கு முன் குறிப்பிட்ட பாடலையோ அல்லது இடத்தையோ உங்கள் பெயரை டேக் செய்யாமல் ஸ்டேட்டஸில் வைப்பார்கள்.",
        subconsciousReality: "கோட்மேன் உளவியல் தத்துவம்: நீங்கள் இதை கவனித்து முதலில் மெசேஜ் செய்வீர்களா என்று அறியும் ஒரு சிறிய அழைப்பு இது.",
        historicalContext: "டிஜிட்டல் சமிக்ஞை ஆய்வுகளில் 81% டேக் செய்யப்படாத மறைமுகப் பகிர்வுகள் குறிப்பிட்ட ஒருவருக்காகவே வைக்கப்படுகின்றன.",
        seasonalAdvice: "இதை நழுவ விடாதீர்கள்! தைரியமாக ஒரு நகைச்சுவையான பதிலை உடனே அனுப்புங்கள்.",
        actionStep: "அந்தப் பதிவை சுட்டிக்காட்டி இயல்பாக உரையாடலைத் தொடங்குங்கள்.",
        suggestedScript: "ஹே, இது நான் சொன்ன பாட்டு தானே? பாட்டு எப்படி இருக்கு, உங்க ரிவ்யூ என்ன?",
        recommendedTool: ToolType.TRANSLATOR,
        starterPrompt: "நான் சொன்ன பாட்டை டேக் பண்ணாம ஸ்டேட்டஸ் வெச்சிருக்காங்க. நான் பேசலாமா?",
        accentColor: "amber",
        glowColor: 0xf59e0b
      }
    ]
  },
  [Language.TANGLISH]: {
    headerTitle: "Red Heart Reader",
    home: "Home",
    sandbox: "Sandbox",
    progress: "Progress",
    greeting: "Heart-ah read panna ready-ah?",
    subGreeting: "Crush matter-ah analyze panna namma Siya iruka!",
    vibeHackTitle: "Siya's Daily Vibe Hack",
    vibeHackText: "Patience dhaan data. Silence irundha dhaan ellam puriyum.",
    voiceIntro: "Hi! Naan Siya. Enna aachu? Solunga analyze pannalam.",
    inputPlaceholder: "Chat-ah paste pannu, illa enna achunu sollu...",
    inputLabel: "Siya kitta help kelu:",
    decodeButton: "VIBE CHECK",
    sandboxTitle: "Siya's Sandbox",
    sandboxDesc: "Kandapadi vent panni relax aagalam.",
    sandboxPlaceholder: "Enake theriyla... romba kadupa iruku...",
    sandboxButton: "RECALIBRATE",
    quickStarters: "Quick context:",
    prompts: {
      [ToolType.HEART_REVEALER]: ["5 hours read pannala", "Just 'K' nu sollita", "Heart emoji anupuna", "Just meme anupura"],
      [ToolType.GOLDEN_MOVE]: ["Eppadi convo start panna?", "Number eppadi kekalaam?", "Meet panna kekalaam?", "Wish panna tips?"],
      [ToolType.TRANSLATOR]: ["'Bored ah iruku' nu sonnanga", "Enna panra nu ketanga", "Song share pannanga", "Pic-ah compliment pannanga"],
      [ToolType.EXPERT_PANEL]: ["Double text panniten", "Naane dhaan start panren", "Seen panni reply illa", "Convo dry ah iruku"],
      [ToolType.SANDBOX]: ["Overthinking level max", "Ignore panra feel", "Anxious ah iruku", "Kandapadi thitta thonudhu!"],
      [ToolType.CHARACTER_REVEALER]: []
    },
    sandboxPrompts: ["Overthinking level max", "Ignore panra feel", "Anxious ah iruku", "Kandapadi thitta thonudhu!"],
    charRevealer: {
      title: "Crush Unreveal",
      desc: "Avanga looks and energy-ah choose pannu, naan real face-ah solren.",
      button: "REVEAL CHARACTER",
      categories: {
        style: "Dressing/Makeup",
        energy: "Energy",
        vibe: "Vibe",
        demeanor: "Demeanor"
      },
      options: {
        style: ["Simple/Mass", "Trendy/Class", "Minimalist", "Heavy/Bold"],
        energy: ["Silent Introvert", "Loud Extrovert", "Quiet Extrovert", "Reserved"],
        vibe: ["Modern/International", "Pakkka Traditional", "Mix of Both", "Rebel/Free"],
        demeanor: ["Observer/Listener", "Funny/Loud", "Silent/Killer", "Active/Always On"]
      }
    },
    tools: {
      [ToolType.HEART_REVEALER]: { title: "Heart Matter", desc: "Texts and vibes-ah decode pannalam." },
      [ToolType.GOLDEN_MOVE]: { title: "Pro Move", desc: "Ice-break panna nalla messages." },
      [ToolType.TRANSLATOR]: { title: "The Translator", desc: "Bids-ah find panna correct tool." },
      [ToolType.EXPERT_PANEL]: { title: "Expert Panel", desc: "Namma scene eppadi irukunu check pannalam." },
      [ToolType.SANDBOX]: { title: "Siya's Sandbox", desc: "Kandapadi vent panni relax aagalam." },
      [ToolType.CHARACTER_REVEALER]: { title: "Character Unreveal", desc: "Looks-ah veche avanga yaru nu find pannalaam." }
    },
    trendingSectionTitle: "Daily Trending Crush 'Vibe' Patterns",
    trendingSectionSubtitle: "Crush psychology data, behavioral patterns & Siya's seasonal pro-tips.",
    trendingBadge: "Siya's 3D Radar • 3 Trending Vibes",
    view3dRadar: "3D Holographic Heart Core",
    rotatePrompt3d: "Drag panni 3D-la rotate pannu • Vibe tap panni energy check pannu",
    tacticalMoveLabel: "Siya's Pro Move",
    copyScriptLabel: "Copy Message Script",
    copiedLabel: "Copied successfully!",
    testInToolLabel: "Tool-la test pannu",
    historicalBaseLabel: "Behavioral Science & Data",
    subconsciousLabel: "Ulla Oodura Real Mindset",
    microCueLabel: "Micro Signal (Kandu pudicha scene)",
    seasonalTipLabel: "Siya-vin Seasonal Advice",
    listenToSiyaLabel: "Siya Voice Advice Kelu",
    trendingPatterns: [
      {
        id: "micro-echo",
        rank: 1,
        name: "The Micro-Echo (Mirroring Timing)",
        badge: "🔥 #1 Trend Today",
        trendMetric: "+41% increase in crush chats",
        archetype: "Safe-ah play panra curiosity",
        microCue: "Nee 30 mins கழிச்சு text panna avangalum correct-ah 30 mins கழிச்சு அதே length-la casual ah reply pannuvanga.",
        subconsciousReality: "Desperate ah theriya koodadhu-nu un rhythm-ku thagundha maadhiri avangaley tune pannikiraanga.",
        historicalContext: "Social synchrony law: Crush stage-la 73% mutual interest subconscious response time matching-la dhaan reveal aagum.",
        seasonalAdvice: "Neeyum adhe delay game vilayadadha! Oru voice note illa simple binary question pottu loop-ah break pannu.",
        actionStep: "Mirror loop-ah cute-ah break pannu.",
        suggestedScript: "Wait, oru quick question—morning unaku strong filter coffee-ah illa cold coffee-ah?",
        recommendedTool: ToolType.GOLDEN_MOVE,
        starterPrompt: "Naan evlo neram eduthu text panreno avangalum adhe exact delay-la text panranga. How to break this loop?",
        accentColor: "rose",
        glowColor: 0xf43f5e
      },
      {
        id: "phantom-orbit",
        rank: 2,
        name: "The 36-Hour Phantom Orbit",
        badge: "⚡ High Volatility Pattern",
        trendMetric: "Weekend & deep convo appo spike aagum",
        archetype: "Vulnerability Hesitation (Ghost Mode)",
        microCue: "Sema deep late-night chat mudinji 36 hours aachu text illa—aana story potta 10 seconds-la view panniduvanga.",
        subconsciousReality: "Vulnerability hangover! 'Ayyayo romba open-up aagitoma' nu konjam step back panni scene check panranga.",
        historicalContext: "Data shows 64% crush interactions-la deep bonding vandha adutha naal silent aagi safety check pannuvanga.",
        seasonalAdvice: "'En kitta pesa maatiya?' nu kadupaaga koodadhu. Cool-ah iru. Avanga meme podum bodhu jovial-ah reply pannu.",
        actionStep: "Pressure illama cool vibe maintain pannu.",
        suggestedScript: "Haha indha meme sema relatable 😂 Hope un week peaceful-ah pogudhu!",
        recommendedTool: ToolType.HEART_REVEALER,
        starterPrompt: "Super-ah 2 hours pesinom, aana 36 hours reply illa aana Insta story உடனே பாக்குறாங்க. Enna vibe idhu?",
        accentColor: "purple",
        glowColor: 0xa855f7
      },
      {
        id: "breadcrumb-beacon",
        rank: 3,
        name: "The Breadcrumb Beacon",
        badge: "✨ Hidden Hint Signal",
        trendMetric: "+58% spike in WhatsApp/Insta story",
        archetype: "Signal Podum Style",
        microCue: "Nee 3 days munnadi sonna song illa cafe-ah story-la poduvanga, aana unna tag panna maatanga.",
        subconsciousReality: "Gottman's 'Bid for Connection': Direct-ah vara bayam, nee kandu pudichu convo start pannanum nu beacon poduranga.",
        historicalContext: "Digital signaling metrics indicate 81% untagged specific references ungaloda attention-kaga dhaan post pannapadudhu.",
        seasonalAdvice: "Idha miss pannadhey! Green signal idhu. Thairiyama jovial-ah text pottu catch pannu.",
        actionStep: "Fun-ah tease panni ping pannu.",
        suggestedScript: "Excuse me, naan recommend panna paata idhu? Enna unga final review?",
        recommendedTool: ToolType.TRANSLATOR,
        starterPrompt: "Naan recommend panna song-ah story-la tag pannama post pannirkanga. Message pannalama?",
        accentColor: "amber",
        glowColor: 0xf59e0b
      }
    ]
  }
};
