
import React, { useState, useEffect } from 'react';
import { Screen, Message, DiagnosisData, UserProfile } from './types';
import SplashScreen from './screens/SplashScreen';
import Onboarding from './screens/Onboarding';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Dashboard from './screens/Dashboard';
import ChatScreen from './screens/ChatScreen';
import AdviceScreen from './screens/AdviceScreen';
import FirstAid from './screens/FirstAid';
import Tips from './screens/Tips';
import Profile from './screens/Profile';
import Clinics from './screens/Clinics';
import Records from './screens/Records';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import { Activity } from 'lucide-react';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SPLASH);
  const [diagnosis, setDiagnosis] = useState<DiagnosisData | null>(null);
  const [searchSymptom, setSearchSymptom] = useState<string>('');

  // Elevated User Profile credentials with localStorage persistence for a seamless experience
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const savedProfile = localStorage.getItem('healthio_user_profile');
      if (savedProfile) {
        return JSON.parse(savedProfile);
      }
    } catch (err) {
      console.warn("Storage read failure", err);
    }
    return {
      name: '',
      email: '',
      age: 0,
      isPremium: false,
      checksCount: 0,
      score: '0%',
      badgesCount: 0,
      weight: '',
      bloodType: '',
      allergies: '',
      phone: ''
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('healthio_user_profile', JSON.stringify(userProfile));
    } catch (err) {
      console.warn("Storage write failure", err);
    }
  }, [userProfile]);

  useEffect(() => {
    if (currentScreen === Screen.SPLASH) {
      const timer = setTimeout(() => setCurrentScreen(Screen.ONBOARDING), 2200);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const navigate = (screen: Screen) => setCurrentScreen(screen);

  const handleLoginSuccess = (email: string, name: string) => {
    setUserProfile(prev => ({
      ...prev,
      email,
      name: name || prev.name
    }));
  };

  const handleLogout = () => {
    // Reset login credentials and route back to Sign In screen
    setUserProfile({
      name: '',
      email: '',
      age: 0,
      isPremium: false,
      checksCount: 0,
      score: '0%',
      badgesCount: 0,
      weight: '',
      bloodType: '',
      allergies: '',
      phone: ''
    });
    navigate(Screen.SIGN_IN);
  };

  const isPreAuth = currentScreen === Screen.SPLASH || 
                    currentScreen === Screen.ONBOARDING || 
                    currentScreen === Screen.SIGN_IN || 
                    currentScreen === Screen.SIGN_UP;

  if (isPreAuth) {
    return (
      <div className="relative flex justify-center items-center min-h-screen h-screen w-full bg-black overflow-hidden font-sans text-white">
        {/* Modern Medical Abstract Graphic Art Behind Pre-Auth Card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 via-black to-teal-950/20 -z-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2D7A6D]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6FDAC3]/10 rounded-full blur-3xl pointer-events-none animate-pulse [animation-duration:6s]" />

        {/* Floating Desktop Dashboard Preview Card on Left (for large screen premium feel) */}
        <div className="hidden lg:flex flex-col max-w-sm mr-16 select-none">
          <div className="flex items-center gap-3 mb-6">
            <span className="p-2.5 bg-[#2D7A6D] text-white rounded-xl shadow-md">
              <Activity size={24} />
            </span>
            <span className="font-extrabold text-white text-xl">Héalthio AI</span>
          </div>
          <h1 className="text-3xl font-black text-white leading-tight">Your intelligent medical companion.</h1>
          <p className="text-sm text-zinc-400 leading-relaxed mt-4">
            An elegant virtual clinic workspace powered by advanced medical synthesis models, providing you with dynamic symptom analyzing, step-by-step first aid assistance, and clinic booking inside a HIPAA secured digital medical vault.
          </p>
          <div className="mt-8 flex items-center gap-4 text-xs font-bold text-zinc-500">
            <span className="flex items-center gap-1.5 bg-emerald-950/50 text-[#6FDAC3] px-3 py-1.5 rounded-full">
              • ISO 27001 Secure
            </span>
            <span>• HIPAA Compliant</span>
          </div>
        </div>

        {/* Focused Authentication Card Wrapper */}
        <div className="relative w-full max-w-[430px] h-full sm:h-[844px] sm:max-h-[90%] md:h-[780px] bg-zinc-950 sm:rounded-[36px] sm:shadow-[0_0_50px_rgba(0,0,0,0.8)] sm:border sm:border-zinc-900 overflow-hidden">
          <AnimatePresence mode="wait">
            {currentScreen === Screen.SPLASH && (
              <SplashScreen key="splash" />
            )}
            {currentScreen === Screen.ONBOARDING && (
              <Onboarding 
                key="onboarding" 
                onComplete={() => navigate(Screen.SIGN_IN)} 
              />
            )}
            {currentScreen === Screen.SIGN_IN && (
              <SignIn 
                key="signin" 
                onNavigate={navigate} 
                onSuccess={handleLoginSuccess}
              />
            )}
            {currentScreen === Screen.SIGN_UP && (
              <SignUp 
                key="signup" 
                onNavigate={navigate} 
                onSuccess={handleLoginSuccess}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Live Portal Layout with Persistent Widescreen Left Sidebar & Liquid Main Content Areas
  return (
    <div className="flex w-full h-screen overflow-hidden bg-black font-sans text-white">
      {/* PERSISTENT SIDEBAR - visible on md screens & up */}
      <Sidebar 
        activeScreen={currentScreen} 
        onNavigate={navigate} 
        userProfile={userProfile} 
        onLogout={handleLogout} 
      />

      {/* LIQUID CONTENT WORKSPACE */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-black">
        <AnimatePresence mode="wait">
          {currentScreen === Screen.DASHBOARD && (
            <Dashboard 
              key="dashboard" 
              onNavigate={navigate} 
              userProfile={userProfile}
              setPrePopulatedSymptom={setSearchSymptom}
            />
          )}
          {currentScreen === Screen.CHAT && (
            <ChatScreen 
              key="chat" 
              onNavigate={navigate} 
              prePopulatedSymptom={searchSymptom}
              clearPrePopulatedSymptom={() => setSearchSymptom('')}
              onAdviceReady={(data) => {
                setDiagnosis(data);
                navigate(Screen.ADVICE);
              }}
            />
          )}
          {currentScreen === Screen.ADVICE && (
            <AdviceScreen 
              key="advice" 
              data={diagnosis} 
              onNavigate={navigate} 
            />
          )}
          {currentScreen === Screen.FIRST_AID && (
            <FirstAid 
              key="firstaid" 
              onBack={() => navigate(Screen.DASHBOARD)} 
            />
          )}
          {currentScreen === Screen.TIPS && (
            <Tips 
              key="tips" 
              onNavigate={navigate} 
            />
          )}
          {currentScreen === Screen.PROFILE && (
            <Profile 
              key="profile" 
              onNavigate={navigate} 
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              onLogout={handleLogout}
            />
          )}
          {currentScreen === Screen.CLINICS && (
            <Clinics 
              key="clinics" 
              onNavigate={navigate} 
            />
          )}
          {currentScreen === Screen.RECORDS && (
            <Records 
              key="records" 
              onNavigate={navigate} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
