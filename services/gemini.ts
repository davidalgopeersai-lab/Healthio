
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Gemini API client using the environment variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are Héalthio AI, a friendly, modern, and professional health assistant. 
Your goal is to help users understand their symptoms and provide general health advice. 
IMPORTANT: Always include a medical disclaimer that you are an AI and not a substitute for professional medical advice. 
Keep your tone calm, empathetic, and clear.
When a user describes symptoms, ask clarifying questions (one at a time) or provide potential causes if clear enough.
At the end of a session, if requested, you can provide a structured diagnosis summary.
`;

export async function getChatResponse(history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) {
  // Use gemini-3-pro-preview for complex reasoning tasks such as symptom checking.
  const model = 'gemini-3-pro-preview';
  const chat = ai.chats.create({
    model,
    history: history, // Provide the conversation history to maintain context.
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    }
  });

  const response = await chat.sendMessage({ message });
  // Access the text property directly from the response object.
  return response.text;
}

export async function getStructuredAdvice(symptoms: string) {
  // Use gemini-3-pro-preview for sophisticated summarization and JSON structuring.
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Based on these symptoms: "${symptoms}", generate a JSON summary for a patient. 
    Do not diagnose definitively, but list possibilities and clear advice.`,
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

  // Extract the text content from the response object property.
  return JSON.parse(response.text || '{}');
}
