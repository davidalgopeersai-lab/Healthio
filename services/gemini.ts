import { DiagnosisData } from '../types';

/**
 * Calls the backend proxy for conversational responses.
 */
export async function getChatResponse(
  history: { role: 'user' | 'model'; parts: { text: string }[] }[], 
  message: string
): Promise<string> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ history, message })
    });
    
    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }
    
    const data = await res.json();
    return data.text;
  } catch (err) {
    console.error("Error calling server chat API, falling back to basic offline assistant description.", err);
    return "I am currently having trouble connecting to the Healthio AI servers. Please ensure you are connected to the internet and try again. If the issue persists, contact support.";
  }
}

/**
 * Calls the backend proxy for structured diagnostic advice.
 */
export async function getStructuredAdvice(symptoms: string): Promise<DiagnosisData> {
  try {
    const res = await fetch("/api/advice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ symptoms })
    });
    
    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }
    
    const data = await res.json();
    return data.advice;
  } catch (err) {
    console.error("Error calling server advice API, using local safe medical advice block.", err);
    return {
      title: "Connection Interrupted",
      possibilities: [
        "Network latency or unstable internet connection",
        "AI server maintenance / momentary overload"
      ],
      advice: [
        "Check your network settings and refresh the screen",
        "Wait 30 seconds and click 'Generate Health Advice Summary' again",
        "Keep track of physical indicators like body temperature"
      ],
      warning: "Medical Disclaimer: AI advice is purely educational and supportive. In case of serious symptoms or persistent distress, please visit your local clinic or hospital immediately."
    };
  }
}
