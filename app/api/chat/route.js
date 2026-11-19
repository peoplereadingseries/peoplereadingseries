import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { BOT_PROMPTS } from "../../../lib/botPrompts";
import { generateSituationalResponse } from "../../../lib/chatEngine";

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const SIYA_CORE_PROMPT = `
You are Siya from The People Reading Series.
Languages:
- You must reply strictly in the user's selected language: English or Tanglish (Latin alphabet).

**Specific Language Instructions:**
Tanglish (Tamil + English Mix):
- Use natural Chennaite / Gen-Z conversational flow.
- Mix English and Tamil words fluidly (Code-switching).
- Keywords: "Macha", "Nanba", "Scene", "Gethu", "Kadupu", "Love matter", "Vibe", "Feelings", "Signal".
- Example: "Dai macha, avalukku un mela interest irkura mari thaan theriyuthu directly ah kelu!"
`;

const PROMPTS = {
  expert: `
${SIYA_CORE_PROMPT}

**Role: The Expert Panel (Action-Oriented Strategist)**
- Format in 3 parts:
  🎯 **The Hook**: 1 clever line.
  💡 **The Move**: 1-2 bullet points.
  💬 **Say This**: 1 exact quote.
`,
  lust: `
${SIYA_CORE_PROMPT}

**Role: The Best Friend (Close Friend / Venting & Motivation)**
- Anti-Gravity philosophy: Help them feel lighter and high value.
- Format in 3 parts:
  🎯 **The Hook**: 1 clever line.
  💡 **The Move**: 1-2 bullet points.
  💬 **Say This**: 1 exact quote.
`,
  crush: `
${SIYA_CORE_PROMPT}

**Role: Heart Reader (Crush Unreveal)**
- You are Siya, the "Heart Reader".
- Decode ambiguity and offer a specific "read" on the situation.
- Format in 3 parts:
  🎯 **The Hook**: 1 clever line.
  💡 **The Move**: 1-2 bullet points.
  💬 **Send This**: 1 exact text quote.
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
      message = "",
      language = "English",
      history = [],
      mode = "astrology_heart",
      botId = "the-heart-reader",
      customSystemPrompt,
      botName = "Mentor"
    } = body;

    // Verified active models on Google Gemini API
    const CANDIDATE_MODELS = [
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-1.5-pro"
    ];

    // Select system prompt
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
    const prompt = `${systemPrompt}${brevityInstruction}\n\nCurrent Language Setting: ${language}${chatContext}\n\nUser: ${message}\n\n${botName}:`;

    let text = null;

    if (genAI && API_KEY) {
      for (const modelName of CANDIDATE_MODELS) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const generatePromise = model.generateContent(prompt);
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout for ${modelName}`)), 7000)
          );

          const result = await Promise.race([generatePromise, timeoutPromise]);
          const response = await result.response;
          text = response.text();
          if (text && text.trim().length > 0) break;
        } catch (err) {
          console.warn(`Model candidate ${modelName} notice:`, err.message || err);
        }
      }
    }

    // Dynamic, non-repeating situational response engine
    if (!text || text.trim().length === 0) {
      text = generateSituationalResponse({
        botId: botId || mode,
        message,
        language,
        history
      });
    }

    return NextResponse.json({ response: text }, { status: 200 });

  } catch (error) {
    console.warn("Recovered from chat route exception:", error.message || error);
    const fallback = generateSituationalResponse({
      botId: 'the-charmer',
      message: 'help',
      language: 'English',
      history: []
    });
    return NextResponse.json({ response: fallback }, { status: 200 });
  }
}
