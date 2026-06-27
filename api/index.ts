import express from "express";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables from .env if present
dotenv.config();

const app = express();
app.use(express.json());

const MODEL_NAME = 'gemini-3.5-flash';

// Initialize GoogleGenAI securely on the server side
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

// Log API key presence for troubleshooting (without revealing the key itself)
console.log("[Healthio Server] Initializing Gemini API client. Key present:", !!apiKey);

const ai = apiKey && apiKey !== 'undefined' ? new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
}) : null;

const SYSTEM_INSTRUCTION = `
You are Héalthio AI, a friendly, modern, and professional health assistant. 
Your goal is to help users understand their symptoms and provide general health advice. 
IMPORTANT: Always include a medical disclaimer that you are an AI and not a substitute for professional medical advice. 
Keep your tone calm, empathetic, and clear.
When a user describes symptoms, ask clarifying questions (one at a time) or provide potential causes if clear enough.
At the end of a session, if requested, you can provide a structured diagnosis summary.
`;

// Helper for local chat fallback when API key is missing or offline
function handleLocalChatSimulation(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes('chest pain') || msg.includes('heart pain') || msg.includes('breathing difficulty') || msg.includes('heart attack')) {
    return "🚨 WARNING: Chest pressure, radiating arm pain, or severe difficulty breathing can be symptoms of a medical emergency, such as a coronary event. Please call emergency dispatch (such as 112 or 911) immediately. While waiting, rest comfortably, avoid physical exertion, and let someone nearby know. (DISCLAIMER: I am a wellness AI assistant, not a doctor.)";
  }

  if (msg.includes('headache') || msg.includes('head pain') || msg.includes('migraine')) {
    return "I understand you're experiencing a headache. Common potential causes range from muscle tension and dehydration to stress, eye strain, or sleep deprivation. \n\nHow sudden and severe is this head pain (on a scale of 1-10)? Also, does it feel localized around your temples or forehead, or are you having any sensitivity to light or nausea?";
  }

  if (msg.includes('stomach') || msg.includes('abdominal') || msg.includes('belly') || msg.includes('nausea') || msg.includes('vomit')) {
    return "Stomach aches or abdominal discomfort are frequently caused by indigestion, minor gastritis, food intolerances, gas, or mild food poisoning. \n\nTo help narrow this down, can you describe where the pain is located (e.g., upper abdominal, lower-right) and if you have had any recent meals that might have disagreed with you?";
  }

  if (msg.includes('fever') || msg.includes('temperature') || msg.includes('chills') || msg.includes('hot')) {
    return "A fever is a natural immune response indicating your body is actively fighting off an infection (commonly viral or bacterial). \n\nDo you know what your temperature is right now? Also, are you experiencing any cough, sore throat, or muscle aches?";
  }

  if (msg.includes('cough') || msg.includes('cold') || msg.includes('flu') || msg.includes('sneeze') || msg.includes('shivering')) {
    return "Coughing and cold symptoms are typically viral upper respiratory infections (like the standard cold or seasonal flu). \n\nIs your cough dry, or does it produce mucus? Also, have you noticed if you are running a fever, or feeling unusually fatigued?";
  }

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('startup') || msg.includes('first')) {
    return "Hi there! I am Héalthio AI. Tell me what symptoms or health questions you have on your mind today, and let's assess them carefully. (Remember as always: I am an AI health companion, so I provide supportive info rather than binding clinical diagnoses!)";
  }

  return "That is helpful context. Generally, symptoms like this represent a localized inflammatory or adaptive response. To understand further, has this been going on for more than 48 hours, and have you noticed any aggravating factors? \n\nYou can click the 'Generate Health Advice Summary' button directly above the chat whenever you're ready to see a complete structured summary of this consultation!";
}

// Helper for local advice fallback when API key is missing or offline
function generateLocalStructuredAdvice(symptoms: string) {
  const s = symptoms.toLowerCase();
  
  if (s.includes('chest') || s.includes('breathing')) {
    return {
      title: "Potential Cardiorespiratory Stress Indicator",
      possibilities: [
        "Acute strain or muscular-skeletal tension",
        "Acid reflux (GERD) simulating chest tightness",
        "Angina or secondary cardiac assessment query"
      ],
      advice: [
        "Immediately seek urgent medical attention / Call emergency services (112 / 911)",
        "Rest in an upright, semi-seated comfortable position",
        "Avoid any further physical exertion or food consumption"
      ],
      warning: "Emergency Disclaimer: Severe chest pain, pressure, or oxygen shortage require instant clinical investigation. Do not delay emergency intervention."
    };
  }

  if (s.includes('headache') || s.includes('head')) {
    return {
      title: "Tension Headache or Dehydration Reaction",
      possibilities: [
        "Tension-type localized headache caused by stress",
        "Moderate systemic dehydration",
        "Visual fatigue / Eye strain from screen exposure"
      ],
      advice: [
        "Drink 500ml of pure room-temperature water immediately",
        "Rest in a darkened, temperature-controlled quiet room",
        "Apply a cold compress to the forehead or temples for 15 minutes"
      ],
      warning: "Disclaimer: If your headache is sudden, extremely intense (the 'thunderclap' sensation), or accompanied by neck stiffness, slurred speech or confusion, seek immediate ER clinical checkup."
    };
  }

  if (s.includes('stomach') || s.includes('belly') || s.includes('nausea') || s.includes('vomit')) {
    return {
      title: "Moderate Gastrointestinal Dysfunction",
      possibilities: [
        "Functional dyspepsia or acute indigestion",
        "Mild gastroenteritis ('stomach flu')",
        "Fructose or lactose diet intolerance"
      ],
      advice: [
        "Consume clear liquids only (peppermint or ginger tea are highly effective)",
        "Follow the BRAT diet (Bananas, Rice, Applesauce, Toast) once vomiting subsides",
        "Avoid heavy fats, refined sugars, dairy, or spicy spices for 48 hours"
      ],
      warning: "Disclaimer: Severe right-lower quadrant pain, blood in stools, or continuous vomiting for more than 24 hours require emergency clinical assessment."
    };
  }

  return {
    title: "Mild Systemic Fatigue or Inflammatory Response",
    possibilities: [
      "Seasonal allergy trigger or early rhinovirus virus load",
      "Stress-induced neurovascular fatigue",
      "Minor metabolic depletion / Lack of quality sleep"
    ],
    advice: [
      "Prioritize obtaining 8 full hours of restful sleep tonight",
      "Eat light, nutrient-dense meals with plenty of fresh greens",
      "Monitor your oral temperature morning and evening"
    ],
    warning: "Disclaimer: Health summary guidelines are strictly informational. Always seek direct medical consultation from certified physicians."
  };
}

// API Routes
app.post("/api/chat", async (req, res) => {
  const { history, message } = req.body;

  if (ai) {
    try {
      console.log("[Healthio Server] Sending message to Gemini API:", message);
      const chat = ai.chats.create({
        model: MODEL_NAME,
        history: history || [],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });
      const response = await chat.sendMessage({ message });
      if (response && response.text) {
        return res.json({ text: response.text });
      }
    } catch (apiError) {
      console.warn("[Healthio Server] Gemini Chat API call failed, falling back to clinical backup rule-engine.", apiError);
    }
  } else {
    console.log("[Healthio Server] Gemini client not initialized. Using fallback rules.");
  }

  const text = handleLocalChatSimulation(message);
  return res.json({ text });
});

app.post("/api/advice", async (req, res) => {
  const { symptoms } = req.body;

  if (ai) {
    try {
      console.log("[Healthio Server] Requesting structured advice from Gemini API for symptoms:", symptoms);
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `Based on these symptoms: "${symptoms}", generate a JSON summary for a patient. 
        Do not diagnose definitively, but list possibilities and clear advice. Ensure to strictly provide a medical warning as well.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "A summary title of the situation" },
              possibilities: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Bullet points of what this could be (max 3)"
              },
              advice: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Specific next steps for the user"
              },
              warning: { type: Type.STRING, description: "A medical warning disclaimer" }
            },
            required: ["title", "possibilities", "advice", "warning"]
          }
        }
      });

      if (response && response.text) {
        const data = JSON.parse(response.text.trim());
        return res.json({ advice: data });
      }
    } catch (apiError) {
      console.warn("[Healthio Server] Structured advice generation failed, fallback to rules pattern matching.", apiError);
    }
  } else {
    console.log("[Healthio Server] Gemini client not initialized. Using fallback advice rules.");
  }

  const advice = generateLocalStructuredAdvice(symptoms || "");
  return res.json({ advice });
});

export default app;
