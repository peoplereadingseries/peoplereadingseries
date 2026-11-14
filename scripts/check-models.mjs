import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env.local manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env.local');

let apiKey = process.env.GEMINI_API_KEY;

if (!apiKey && fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value && key.trim() === 'GEMINI_API_KEY') {
            apiKey = value.trim();
        }
    });
}

async function listModels() {
    try {
        if (!apiKey) {
            console.error("Error: GEMINI_API_KEY not found in .env.local or environment");
            process.exit(1);
        }

        console.log("Using API Key length:", apiKey.length);

        // There isn't a direct "listModels" on the client instance in some versions, 
        // but we can try to get a model and assume the error might list them, 
        // OR use the ModelService if exposed.
        // Actually, v0.24.1 *should* allow standard generation.
        // Let's try to query the generic 'models' endpoint via a fetch if the library helper is missing,
        // or just try a simple generation with a very standard model to verify connectivity first.

        // Attempting to list models via API URL directly is a solid fallback if SDK doesn't expose it easily in node.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => console.log(`- ${m.name} (${m.displayName})`));
        } else {
            console.log("Could not list models. Response:", JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error("Error listed models:", error);
    }
}

listModels();
