
export enum Screen {
  SPLASH = 'splash',
  ONBOARDING = 'onboarding',
  DASHBOARD = 'dashboard',
  CHAT = 'chat',
  ADVICE = 'advice',
  FIRST_AID = 'first_aid',
  TIPS = 'tips',
  PROFILE = 'profile'
}

export interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export interface DiagnosisData {
  title: string;
  possibilities: string[];
  advice: string[];
  warning: string;
}

export interface HealthTip {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}
