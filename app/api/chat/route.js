import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { BOT_PROMPTS } from "../../../lib/botPrompts";

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAQspeJYJELsoJyi9atSIqB5xfAVoxKlvg";
const genAI = new GoogleGenerativeAI(API_KEY);


const SIYA_CORE_PROMPT = `
You are Siya.
Languages:
- You must reply in the language the user is speaking (English, Tamil, or Tanglish).

**Specific Language Instructions:**
1. **Tamil**:
   - Use **"Pechu Vazhakku" (Spoken Tamil)**. Do NOT use formal/textbook Tamil (Senthamil).
   - Write as if you are speaking to a friend in Chennai or Tamil Nadu.
   - Use casual endings like "...la?", "...thaane?", "machan".
   - Example: instead of "Nanban", use "Dostu" or "Natpu". Instead of "Ungal", use "Un".

2. **Tanglish (Tamil + English Mix)**:
   - Use natural **Chennaite/Gen-Z slang**.
   - Mix English and Tamil words fluidly (Code-switching).
   - Keywords: "Macha", "Nanba", "Scene", "Gethu", "Kadupu", "Love matter", "Vibe", "Feelings", "Signal".
   - Example: "Dai macha, avalukku un mela interest irkura mari thaan theriyuthu directly ah kelu!"
`;

const PROMPTS = {
    expert: `
${SIYA_CORE_PROMPT}

**Role: The Expert Panel (Action-Oriented Strategist)**
- **Context**: The user has done something (messaged, spoke, or interacted) and asks "What do I do next?".
- **Your Goal**: Observe the situation and give specific **STEPS** for the immediate future.
- **Tone**: Professional, strategic, direct, but encouraging. "Here is your game plan."
- **Output Structure**:
  1. **Observation**: "I see you [action]..." (1 sentence).
  2. **The Strategy**: "Here is exactly what you do next:"
  3. **Step-by-Step**: 
     - Step 1: [Action]
     - Step 2: [Action]
`,
    lust: `
${SIYA_CORE_PROMPT}

**Role: The Best Friend (Close Friend / Venting & Motivation)**
- **Context**: The user is stressed, heartbroken, or has a relationship problem. They are venting to you.
- **Your Goal**: Be their closest friend. Handle them with care but give motivation.
- **Tone**: Warm, slang-heavy (if Tanglish/Tamil use "Macha/Di/Bro/Sister"), extremely supportive.
- **Philosophy**: "Anti-Gravity" - Help them feel lighter.
- **Key Responses**: 
  - Validating: "I know it hurts, bro/sister."
  - Motivating: "Don't worry, just leave and move on. You deserve better."
  - "Try in a good way."
  - Always end with a fist-bump or hug vibe.
`,
    crush: `
${SIYA_CORE_PROMPT}

**Role: Heart Reader (Crush Unreveal)**
- You are Siya, the "Heart Reader".
- Your Goal: Decode signals based on specific data: Dressing, Energy, Vibe, Demeanor.
- Analyze the input provided by the user.
- Tone: Insightful, observant, slightly mystical but grounded in psychology.
- Decode ambiguity and offer a specific "read" on the situation.
`,
    astrology_heart: `
${SIYA_CORE_PROMPT}

**Role: Siya - The Heart Reader**
- You are Siya, the intuitive Heart Reader from The People Reading Series. You decode unspoken emotions, crush signals, and romantic tension. You are NOT an AI.
- Format: Keep entire reply under 60-80 words. Punchy, witty, attractive words with clever hooks.
- Structure:
  🎯 **The Hook**: 1 clever line decoding what their words/silence actually mean.
  💡 **The Move**: 1-2 short bullet points on Anti-Gravity / emotional polarity.
  💬 **Send This**: 1 irresistible text message in quotes.
`

};

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            message,
            language = "English",
            history,
            mode = "astrology_heart",
            botId,
            customSystemPrompt,
            botName = "Mentor"
        } = body;

        if (!API_KEY) {
            console.error("API Key is missing in server environment!");
            return NextResponse.json(
                { error: "Gemini API key not configured" },
                { status: 500 }
            );
        }

        // Verified active models on Google Gemini API
        const CANDIDATE_MODELS = [
            "gemini-2.5-flash",
            "gemini-flash-lite-latest",
            "gemini-3-flash-preview"
        ];

        // Select prompt: Priority 1: customSystemPrompt, Priority 2: botId, Priority 3: mode, Fallback: heart-reader
        let systemPrompt = customSystemPrompt;
        if (!systemPrompt && botId) {
            systemPrompt = BOT_PROMPTS[botId];
        }
        if (!systemPrompt) {
            systemPrompt = PROMPTS[mode] || BOT_PROMPTS['the-heart-reader'];
        }

        let chatContext = "";
        if (history && history.length > 0) {
            const recent = history.slice(-6);
            chatContext = "\n\nPrevious Conversation:\n" + recent.map(m => {
                const roleName = (m.role === 'assistant' || m.sender === 'bot' || m.sender === 'siya' || m.sender === 'ai') ? (botName || 'Mentor') : 'User';
                return `${roleName}: ${m.text || m.content || ''}`;
            }).join("\n");
        }

        const brevityInstruction = "\n\nCRITICAL RULE: Keep your entire reply strictly under 60-80 words. NO long passages, NO essays. Use clever hooks, simple attractive words, and 1 exact quote to say.";
        let prompt = `${systemPrompt}${brevityInstruction}\n\nCurrent Language Setting: ${language}${chatContext}\n\nUser: ${message}\n\n${botName}:`;

        let text = null;

        for (const modelName of CANDIDATE_MODELS) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                
                // 9-second timeout per model candidate
                const generatePromise = model.generateContent(prompt);
                const timeoutPromise = new Promise((_, reject) => 
                    setTimeout(() => reject(new Error(`Timeout for ${modelName}`)), 9000)
                );

                const result = await Promise.race([generatePromise, timeoutPromise]);
                const response = await result.response;
                text = response.text();
                if (text && text.trim().length > 0) break;
            } catch (err) {
                console.warn(`Model candidate ${modelName} unavailable:`, err.message || err);
            }
        }

        if (!text || text.trim().length === 0) {
            // Contextual fallback based on book archetype if all models are rate-limited or busy
            text = getIntelligentFallback(botId || mode, message, language);
        }

        return NextResponse.json({ response: text }, { status: 200 });

    } catch (error) {
        console.warn("Recovered from chat route exception:", error.message || error);
        const fallback = getIntelligentFallback('the-charmer', 'help', 'English');
        return NextResponse.json({ response: fallback }, { status: 200 });
    }
}

function getIntelligentFallback(botId, userMsg, lang) {
    if (botId?.includes('charmer')) {
        return "**1. Tactical Diagnosis:** You are likely over-investing in the interaction tempo or seeking conversational validation prematurely.\n\n**2. The Strategic Play:**\n- Execute the **3-Second Warmth Signal**: Drop shoulder tension, hold a soft 70% eye contact ratio, and deliver a relaxed micro-smile before speaking.\n- Slow your vocal pacing down by 15% to immediately establish social gravity.\n\n**3. Exact Script:**\n> \"I was actually just observing that earlier... tell me, what's the real story behind this?\"\n\n**4. Behavioral Cue:** Keep your chin level, pause 1.5 seconds before replying, and drop your vocal pitch at the end of the sentence.";
    }
    if (botId?.includes('negotiator')) {
        return "**1. Leverage Audit:** The counterparty is testing your emotional threshold. When they throw friction or an aggressive anchor, your instinct to justify weakens your position.\n\n**2. The Tactical Play:**\n- Do not defend your position or offer concessions.\n- Deploy an Accusation Audit followed by a Calibrated Question to push problem-solving back onto their plate.\n\n**3. Exact Script:**\n> \"It seems like this proposal feels completely unworkable from where you're sitting. What about this structure puts you in an impossible position?\"\n\n**4. Negotiation Nuance:** Once delivered, go completely silent. Maintain calm eye contact. The first person to break the silence gives up leverage.";
    }
    if (botId?.includes('detective')) {
        return "**1. Forensic Assessment:** Look for baseline deviations rather than single isolated gestures. Note any lag between question and answer, pronoun evasion, or sudden throat-clearing.\n\n**2. The Strategic Play:**\n- Shift from direct cross-examination to the **Double-Bind Inquiry**—an innocent elicitation question that a truthful person answers simply.\n\n**3. Exact Script:**\n> \"Just to help me align the timeline clearly, walk me through what happened right before that occurred.\"\n\n**4. Micro-Cues to Watch:** Monitor bilateral eye blink frequency, hand-to-face pacifying touch (neck or collar touch), and tense slippage from past to present tense.";
    }
    if (botId?.includes('leader')) {
        return "**1. Executive Diagnosis:** Authority is leaking through emotional reactivity or ambiguity in execution boundaries. Leaders regulate the collective nervous system of the room.\n\n**2. The Command Strategy:**\n- Anchor your emotional poise: slow down your breathing and lower vocal register.\n- Issue the **Commander's Intent**: clarify the non-negotiable end-state and grant tactical autonomy on execution.\n\n**3. Exact Leadership Script:**\n> \"Here is the objective we must hit by Friday, and here are the boundary conditions. I trust you to determine the operational path to get us there. What support do you need from me?\"\n\n**4. Gravitas Calibration:** Deliver without rushing. Make still, unblinking eye contact with key stakeholders around the table.";
    }
    return "**1. Subtext & Emotional Read:** Romantic ambiguity or sudden text delays indicate power redistribution or avoidant pullback. Chasing or double-texting now creates repulsive emotional friction.\n\n**2. High-Value Psychological Move:**\n- Apply **Anti-Gravity Seduction**: withdraw emotional investment to restore tension and curiosity.\n- Match and slightly exceed their latency interval without displaying passive-aggressive resentment.\n\n**3. Exact Script to Send:**\n> \"Sounds like quite a day on your end. Catch you later!\"\n\n**4. Timing Directive:** Wait at least 3-4 hours before dispatching. Keep your tone completely light, unbothered, and magnetic.";
}
