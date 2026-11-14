import fs from "fs";
import path from "path";

// Simple env parser
const envPath = path.resolve(process.cwd(), ".env.local");
let apiKey = "";
try {
    const envContent = fs.readFileSync(envPath, "utf8");
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (match) apiKey = match[1].trim();
} catch (e) {
    console.error("Could not read .env.local");
}

if (!apiKey) {
    console.error("No API KEY found in .env.local");
    process.exit(1);
}

async function listModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", JSON.stringify(data.error, null, 2));
            return;
        }

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name}`);
                }
            });
        } else {
            console.log("No models found or unexpected format:", data);
        }

    } catch (error) {
        console.error("Network Error:", error.message);
    }
}

listModels();
