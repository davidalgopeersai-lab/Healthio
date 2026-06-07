
export enum Screen {
  SPLASH = 'splash',
  ONBOARDING = 'onboarding',
  SIGN_IN = 'sign_in',
  SIGN_UP = 'sign_up',
  DASHBOARD = 'dashboard',
  CHAT = 'chat',
  ADVICE = 'advice',
  FIRST_AID = 'first_aid',
  TIPS = 'tips',
  PROFILE = 'profile',
  CLINICS = 'clinics',
  RECORDS = 'records'
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
  readTime: string;
  fullContent: string[];
  keyTakeaways: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  age: number;
  isPremium: boolean;
  checksCount: number;
  score: string;
  badgesCount: number;
  weight: string;
  bloodType: string;
  allergies: string;
  phone: string;
}

export interface MedicalRecord {
  id: string;
  title: string;
  category: string; // "Prescription", "Lab Result", "Vaccination", "Checkup"
  date: string;
  doctor: string;
  notes: string;
  paramKey?: string; // e.g. "Blood Pressure", "Glucose"
  paramVal?: string; // e.g. "120/80 mmHg", "5.6 mmol/L"
}
