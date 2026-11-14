import { Language, ToolType, AnalysisResult } from "./types";

export const analyzeInteraction = async (
  tool: ToolType,
  userInput: string,
  language: Language
): Promise<AnalysisResult> => {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "interaction", tool, userInput, language }),
  });
  if (!res.ok) throw new Error("Interaction analysis failed");
  return res.json();
};

export const analyzeCharacter = async (
  data: { style: string; energy: string; vibe: string; demeanor: string; target?: 'crush' | 'myself' },
  language: Language
): Promise<AnalysisResult> => {

  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "character", data, language }),
  });
  if (!res.ok) throw new Error("Character analysis failed");
  return res.json();
};

export const recalibrateEnergy = async (
  ventText: string,
  language: Language
): Promise<{ calmText: string; advice: string }> => {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "recalibrate", ventText, language }),
  });
  if (!res.ok) throw new Error("Recalibration failed");
  return res.json();
};

export const generateSpeech = async (
  text: string,
  language: Language
): Promise<string> => {
  try {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "tts", text, language }),
    });
    const data = await res.json();
    if (data.base64Audio) {
      return data.base64Audio;
    }
  } catch (e) {
    console.warn("Server TTS not available:", e);
  }
  throw new Error("Fallback to browser speech");
};
