
import React, { useState, useEffect } from 'react';
import { Screen, Message, DiagnosisData } from './types';
import SplashScreen from './screens/SplashScreen';
import Onboarding from './screens/Onboarding';
import Dashboard from './screens/Dashboard';
import ChatScreen from './screens/ChatScreen';
import AdviceScreen from './screens/AdviceScreen';
import FirstAid from './screens/FirstAid';
import Tips from './screens/Tips';
import Profile from './screens/Profile';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SPLASH);
  const [diagnosis, setDiagnosis] = useState<DiagnosisData | null>(null);

  useEffect(() => {
    if (currentScreen === Screen.SPLASH) {
      const timer = setTimeout(() => setCurrentScreen(Screen.ONBOARDING), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const navigate = (screen: Screen) => setCurrentScreen(screen);

  return (
    <div className="relative flex justify-center items-center h-screen w-full bg-slate-200">
      {/* Mobile Frame Container */}
      <div className="relative w-[390px] h-[844px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-[8px] border-slate-900">
        <AnimatePresence mode="wait">
          {currentScreen === Screen.SPLASH && (
            <SplashScreen key="splash" />
          )}
          {currentScreen === Screen.ONBOARDING && (
            <Onboarding key="onboarding" onComplete={() => navigate(Screen.DASHBOARD)} />
          )}
          {currentScreen === Screen.DASHBOARD && (
            <Dashboard 
                key="dashboard" 
                onNavigate={navigate} 
            />
          )}
          {currentScreen === Screen.CHAT && (
            <ChatScreen 
                key="chat" 
                onNavigate={navigate} 
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
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
