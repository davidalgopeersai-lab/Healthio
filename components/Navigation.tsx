
import React from 'react';
import { Home, MessageCircle, Lightbulb, User } from 'lucide-react';
import { Screen } from '../types';

interface NavigationProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeScreen, onNavigate }) => {
  const tabs = [
    { id: Screen.DASHBOARD, icon: Home, label: 'Home' },
    { id: Screen.CHAT, icon: MessageCircle, label: 'Chat' },
    { id: Screen.TIPS, icon: Lightbulb, label: 'Tips' },
    { id: Screen.PROFILE, icon: User, label: 'Profile' }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-4 px-2 pb-8">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeScreen === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#2D7A6D]' : 'text-gray-400'}`}
          >
            <Icon size={24} fill={isActive ? '#2D7A6D' : 'none'} fillOpacity={0.1} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;
