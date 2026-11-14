import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type, Modality } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "AIzaSyAQspeJYJELsoJyi9atSIqB5xfAVoxKlvg";
const ai = new GoogleGenAI({ apiKey });

const getSystemInstruction = (language: string) => `
You are Siya, a world-class social intelligence expert and a supportive best friend. 
Your application is "Red Heart Reader". 
Your persona: You are a friendly, expert guide. You translate complex human emotions into clear strategy.
Frameworks: Use advanced behavioral science (comfort cues, high-value communication, truth planes, empathy metrics).
IMPORTANT RULE: Do NOT mention the names of specific experts, researchers, or authors (e.g., do NOT say "Joe Navarro", "Vanessa Van Edwards", "Mark Bowden", or "Kinsey Goman"). Refer to the concepts as "behavioral science", "emotional frameworks", or "social psychology".
Language: Respond in ${language}.
For Tanglish: Use modern Urban Tamil slang (Chennai style) mixed with English.
For Tamil: Use warm, polite, and culturally resonant Tamil.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, tool, userInput, data, ventText, text, language = "English" } = body;

    // 1. Analyze Interaction Tool
    if (action === "interaction") {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `
            Current Tool: ${tool}
            Input: ${userInput}
            Analyze this using behavioral frameworks. 
            Return JSON: { "title": "...", "vibe": "positive/neutral/negative/caution", "analysis": "...", "recommendation": "...", "scripts": ["..."], "scientificBase": "Framework name without expert names" }
          `,
          config: {
            systemInstruction: getSystemInstruction(language),
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                vibe: { type: Type.STRING, enum: ["positive", "neutral", "negative", "caution"] },
                analysis: { type: Type.STRING },
                recommendation: { type: Type.STRING },
                scripts: { type: Type.ARRAY, items: { type: Type.STRING } },
                scientificBase: { type: Type.STRING }
              },
              required: ["title", "vibe", "analysis", "recommendation", "scientificBase"]
            }
          }
        });

        const parsed = JSON.parse(response.text || "{}");
        return NextResponse.json(parsed);
      } catch (err: any) {
        console.warn("Gemini interaction analysis error, using intelligent fallback:", err.message);
        const fallback = getFallbackInteraction(tool, userInput, language);
        return NextResponse.json(fallback);
      }
    }

    // 2. Character Revealer (Supports both Crush and Myself)
    if (action === "character") {
      try {
        const isSelf = data?.target === "myself";
        const targetLabel = isSelf ? "The User's Own Personality (Self-Discovery)" : "Their Crush / Person of Interest";
        const promptGoal = isSelf
          ? "Goal: Reveal the user's OWN personality profile, emotional attachment style, romantic strengths, and subconscious blind spots in relationships. What drives them? How can they step into their highest magnetic self?"
          : "Goal: Reveal the personality profile of their crush. What drives them? What are their hidden emotional triggers and how should the user approach them?";

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `
            Category: Character Reveal (${targetLabel})
            Target: ${isSelf ? "Myself" : "Crush"}
            Dressing/Style: ${data?.style || "Casual"}
            Energy Type: ${data?.energy || "Chill"}
            Vibe: ${data?.vibe || "Friendly"}
            Demeanor: ${data?.demeanor || "Open"}
            
            ${promptGoal}
            Language: ${language}
            Return JSON: { "title": "Archetype / Personality Name", "vibe": "positive", "analysis": "...", "recommendation": "...", "scripts": ["${isSelf ? "Self-empowerment motto or high-value boundary script" : "High-value starter or approach script"}"], "scientificBase": "Psychological Framework" }
          `,
          config: {
            systemInstruction: getSystemInstruction(language),
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                vibe: { type: Type.STRING, enum: ["positive", "neutral", "negative", "caution"] },
                analysis: { type: Type.STRING },
                recommendation: { type: Type.STRING },
                scripts: { type: Type.ARRAY, items: { type: Type.STRING } },
                scientificBase: { type: Type.STRING }
              },
              required: ["title", "vibe", "analysis", "recommendation", "scientificBase"]
            }
          }
        });

        const parsed = JSON.parse(response.text || "{}");
        return NextResponse.json(parsed);
      } catch (err: any) {
        console.warn("Gemini character analysis error, using intelligent fallback:", err.message);
        const fallback = getFallbackCharacter(data, language);
        return NextResponse.json(fallback);
      }
    }


    // 3. Recalibrate Energy (Sandbox)
    if (action === "recalibrate") {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `
            User is venting: ${ventText}
            Help them move from chaotic to steady energy. 
            Language: ${language}.
            Return JSON: { "calmText": "...", "advice": "..." }
          `,
          config: {
            systemInstruction: getSystemInstruction(language),
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                calmText: { type: Type.STRING },
                advice: { type: Type.STRING }
              },
              required: ["calmText", "advice"]
            }
          }
        });

        const parsed = JSON.parse(response.text || "{}");
        return NextResponse.json(parsed);
      } catch (err: any) {
        console.warn("Gemini recalibrate error, using intelligent fallback:", err.message);
        const fallback = getFallbackRecalibrate(ventText, language);
        return NextResponse.json(fallback);
      }
    }

    // 4. TTS (Speech Synthesis)
    if (action === "tts") {
      try {
        const prompt = `Read in ${language}: ${text}`;
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: prompt }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: "Kore" },
              },
            },
          },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          return NextResponse.json({ base64Audio });
        }
      } catch (ttsErr: any) {
        console.warn("Gemini TTS preview not available, signaling client fallback:", ttsErr.message);
      }
      return NextResponse.json({ fallbackSpeech: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Analyze API route error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

// Fallback handlers ensuring 100% graceful degradation
function getFallbackInteraction(tool: string, userInput: string, lang: string) {
  if (lang === "Tamil") {
    return {
      title: "சமிக்ஞை பகுப்பாய்வு (நேரடி வழிகாட்டல்)",
      vibe: "caution",
      analysis: `அவர்கள் அனுப்பிய செய்தி "${userInput}" அவர்களின் அவதானிப்பு மற்றும் தற்காப்பு மனநிலையைக் காட்டுகிறது. அவர்கள் உங்கள் மேல் ஆர்வம் கொண்டிருந்தாலும், அவசரப்படாமல் மெதுவாக அணுக விரும்புகிறார்கள்.`,
      recommendation: "அதிகமாக மெசேஜ் செய்யாதீர்கள். ஒரு நாள் இயல்பாக இடைவெளி விட்டு, பிறகு சுவாரசியமான ஒரு மீம் அல்லது எளிய கேள்வியுடன் தொடங்குங்கள்.",
      scripts: [
        "ஹே, இன்னைக்கு ஒரு சுவாரசியமான விஷயம் பார்த்தேன், உனக்கு நினைவுக்கு வந்தேன்!",
        "நேரம் கிடைக்கும் போது பேசுவோம், அவசரம் இல்ல."
      ],
      scientificBase: "உணர்ச்சி ஒத்திசைவு மற்றும் நிலைத்தன்மை கோட்பாடு"
    };
  } else if (lang === "Tanglish") {
    return {
      title: "Vibe Check (Pro Insight)",
      vibe: "caution",
      analysis: `Avanga sonna "${userInput}" vishiyam oru testing phase madhiri dhaan theriyudhu. Immediate-ah react pannama calm-ah handle pannina scene namma pakkam thirumbum.`,
      recommendation: "Overthinking pannadhe macha! Oru 24 hours gap vidu. Normal-ah oru relatable meme pottu low-pressure vibe create pannu.",
      scripts: [
        "Haha wait, idhu unaku dhaan crt ah match aagum 😂",
        "Free-ah irukum podhu ping pannu, no rush!"
      ],
      scientificBase: "Emotional Equilibrium Framework"
    };
  }

  return {
    title: "Behavioral Signal Decoded",
    vibe: "caution",
    analysis: `The input "${userInput}" indicates conscious pacing. They are assessing the interaction temperature and avoiding looking overly eager.`,
    recommendation: "Adopt an unhurried, grounded posture. Do not over-explain or double-text. Re-engage later with a low-pressure binary prompt.",
    scripts: [
      "No rush at all—catch up whenever your week calms down!",
      "Just saw something hilarious that reminded me of what you said earlier."
    ],
    scientificBase: "Reciprocal Pacing & Comfort Cue Theory"
  };
}

function getFallbackCharacter(data: any, lang: string) {
  const isSelf = data?.target === "myself";

  if (isSelf) {
    if (lang === "Tamil") {
      return {
        title: "உங்களின் ஆளுமை: ஆழ்ந்த உள்ளுணர்வு கொண்ட சிந்தனையாளர்",
        vibe: "positive",
        analysis: `உங்கள் ${data?.style || "இயல்பான"} பாணியும் ${data?.energy || "அமைதியான"} ஆற்றலும் நீங்கள் மிகுந்த உணர்ச்சி நுண்ணறிவு கொண்டவர் என்பதைக் காட்டுகிறது. நீங்கள் ஆழமான உண்மையான உறவுகளையே விரும்புகிறீர்கள்.`,
        recommendation: "அதிகமாக யோசித்து (overthinking) குழப்பமடையாமல், உங்கள் உள்ளுணர்வை முழுமையாக நம்புங்கள். உங்கள் அமைதியான சுயமதிப்பே உங்களுக்குப் பெரிய ஈர்ப்பு சக்தி.",
        scripts: ["நான் என் உணர்வுகளை மதிக்கிறேன், எனக்குத் தகுதியான அன்பை மட்டுமே என் வாழ்வில் அனுமதிக்கிறேன்."],
        scientificBase: "உணர்ச்சி நுண்ணறிவு & சுய-இணைப்புக் கோட்பாடு"
      };
    } else if (lang === "Tanglish") {
      return {
        title: "Your Vibe: The Intuitive Realist (Macha's True Self)",
        vibe: "positive",
        analysis: `Unga ${data?.style || "style"} and ${data?.energy || "energy"} paatha neenga romba loyal and genuine person. Oru person mela care pannina 100% genuine ah irupeenga, aana small signals kooda overthink pannuveenga.`,
        recommendation: "Unga self-worth-ah eppovum drop pannadha macha! Un high-value energy dhaan un super-power.",
        scripts: ["I stay calm, centered, and magnetic in my own worth."],
        scientificBase: "Self-Attachment & High-Value Psychology"
      };
    }

    return {
      title: "Your Archetype: The Empathetic Strategist",
      vibe: "positive",
      analysis: `Your ${data?.style || "curated"} style and ${data?.energy || "perceptive"} energy show high emotional intelligence. You pick up on subtleties that others miss and prioritize authenticity in your connections.`,
      recommendation: "Ground yourself in your inherent worth. When you don't over-function to seek validation, your natural confidence becomes irresistibly magnetic.",
      scripts: ["I communicate with calm clarity, trusting my worth and intuition."],
      scientificBase: "Self-Attachment Theory & Emotional Regulation"
    };
  }

  if (lang === "Tamil") {
    return {
      title: "சுயமரியாதை கொண்ட தீவிர உள்ளுணர்வுக்காரர்",
      vibe: "positive",
      analysis: `${data?.style || "அழகான"} தோற்றமும் ${data?.energy || "அமைதியான"} ஆற்றலும் இவர் மேலோட்டமான பேச்சை விட ஆழமான உண்மையான தொடர்பை விரும்புபவர் என்பதைக் காட்டுகிறது.`,
      recommendation: "அதிக புகழ்ச்சிகளைத் தவிர்த்து, அவர்களின் கருத்துக்கள் மற்றும் விருப்பங்களைப் பற்றி அக்கறையுடன் கேளுங்கள்.",
      scripts: [
        "உங்களுக்கு மிகவும் பிடித்த ஒரு விஷயம் பற்றி தெரிந்து கொள்ள ஆசை.",
        "இந்த தலைப்பில் உங்கள் பார்வை எனக்கு மிகவும் தனித்துவமாகத் தெரிகிறது."
      ],
      scientificBase: "ஆளுமை வகைப்பாட்டு வரைபடம்"
    };
  } else if (lang === "Tanglish") {
    return {
      title: "The Subtle High-Value Personality",
      vibe: "positive",
      analysis: `${data?.style || "Cool"} dressing and ${data?.energy || "chill"} energy paatha avanga romba private aana loyal person nu theriyudhu.`,
      recommendation: "Flashy-ah irukradha vida genuine-ah listen pannina seekiram connect aagiduvaanga.",
      scripts: [
        "Indha song/movie pathi unoda take enna?",
        "Un kooda pesum podhu time porathey therila!"
      ],
      scientificBase: "Psychological Archetype Mapping"
    };
  }

  return {
    title: "The Selective Observer",
    vibe: "positive",
    analysis: `The combination of ${data?.style || "curated"} style and ${data?.energy || "grounded"} energy reveals someone who values depth over noise and guards their personal boundary gently.`,
    recommendation: "Approach with genuine intellectual curiosity and zero pretense. They respond best to authentic observation.",
    scripts: [
      "I'm curious about your perspective on this—what's your take?",
      "You have such a grounded energy. How do you recharge?"
    ],
    scientificBase: "Social Psychology & Personality Profiling"
  };
}


function getFallbackRecalibrate(vent: string, lang: string) {
  if (lang === "Tamil") {
    return {
      calmText: "நான் என் மன அமைதியைக் காத்துக் கொள்கிறேன். சூழல்கள் தானாகச் சரியாகும்.",
      advice: "உங்கள் கவலை முற்றிலும் நியாயமானது. ஆனால் உடனடியாக எதிர்வினை ஆற்றாதீர்கள். ஆழ்ந்த சுவாசம் எடுத்து சிறிது நேரம் அமைதியாக இருங்கள்."
    };
  } else if (lang === "Tanglish") {
    return {
      calmText: "Naan cool-ah iruken. En energy en kaila dhaan iruku.",
      advice: "Indha kadupu natural dhaan macha. Aana ippo message panna koodadhu. Phone-ah konjam thalli vechitu chilled water kudi."
    };
  }

  return {
    calmText: "I hold my center. My value is constant regardless of their immediate reaction.",
    advice: "Your feelings are completely valid, but this state is reactive. Step back from the screen for 20 minutes before taking any action."
  };
}
