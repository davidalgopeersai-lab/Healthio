import React from 'react';
import { Home, MessageCircle, BriefcaseMedical, Lightbulb, MapPin, Activity, User, LogOut, Heart, Shield, Award, Sparkles } from 'lucide-react';
import { Screen, UserProfile } from '../types';

interface SidebarProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
  userProfile: UserProfile;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeScreen, onNavigate, userProfile, onLogout }) => {
  const menuItems = [
    { id: Screen.DASHBOARD, icon: Home, label: 'Dashboard', desc: 'Overview & Insights' },
    { id: Screen.CHAT, icon: MessageCircle, label: 'AI Chat Advisor', desc: 'Symptom Consultation' },
    { id: Screen.FIRST_AID, icon: BriefcaseMedical, label: 'Emergency Guides', desc: 'First Aid Manuals' },
    { id: Screen.TIPS, icon: Lightbulb, label: 'Wellness Guides', desc: 'Daily Health Tips' },
    { id: Screen.CLINICS, icon: MapPin, label: 'Medical Clinics', desc: 'Book Appointments' },
    { id: Screen.RECORDS, icon: Activity, label: 'Medical Vault', desc: 'Your Digital Records' },
    { id: Screen.PROFILE, icon: User, label: 'Account Profile', desc: 'Manage Health Bio' }
  ];

  return (
    <div className="hidden md:flex flex-col w-80 bg-black border-r border-zinc-900 h-full flex-shrink-0 relative select-none font-sans text-white">
      {/* Brand Header */}
      <div className="p-6 border-b border-zinc-900 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#2D7A6D] rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-950/20">
          <Activity size={22} />
        </div>
        <div>
          <h1 className="font-bold text-white text-base leading-none">Héalthio AI</h1>
          <span className="text-[9px] text-[#6FDAC3] uppercase tracking-wider font-extrabold mt-1 flex items-center gap-1">
            <Sparkles size={9} className="fill-current" /> Workspace Portal
          </span>
        </div>
      </div>

      {/* User Quick Profile Summary */}
      <div className="p-6 border-b border-zinc-900">
        <div className="flex items-center gap-4.5 mb-5 select-none">
          <div className="relative w-12 h-12 rounded-full border-2 border-zinc-800 bg-zinc-900 overflow-hidden shadow-sm">
            <img 
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${userProfile.name || 'default'}`} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
              alt="Avatar" 
            />
          </div>
          <div>
            <h3 className="font-black text-zinc-100 text-sm leading-tight line-clamp-1">{userProfile.name || 'Clinical Member'}</h3>
            <p className="text-[10px] text-zinc-400 font-bold mt-0.5 uppercase tracking-wide">
              {userProfile.isPremium ? 'Premium Core Member' : 'Standard Account'}
            </p>
          </div>
        </div>

        {/* Mini stats dashboard within sidebar */}
        <div className="grid grid-cols-3 gap-2 bg-gradient-to-br from-[#2D7A6D] to-[#15463E] p-3 rounded-2xl text-white shadow-sm">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[8px] font-bold text-white/70 uppercase">Checks</span>
            <span className="text-xs font-black mt-0.5">{userProfile.checksCount}</span>
          </div>
          <div className="w-[1px] bg-white/10 h-6 h-full self-center" />
          <div className="flex flex-col items-center justify-center">
            <span className="text-[8px] font-bold text-white/70 uppercase">Score</span>
            <span className="text-xs font-black mt-0.5">{userProfile.score}</span>
          </div>
          <div className="w-[1px] bg-white/10 h-6 h-full self-center" />
          <div className="flex flex-col items-center justify-center">
            <span className="text-[8px] font-bold text-white/70 uppercase">Awards</span>
            <span className="text-xs font-black mt-0.5">{userProfile.badgesCount}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto p-4 py-6 space-y-1.5 scrollbar-hide">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                isActive 
                  ? 'bg-zinc-900 border-l-4 border-[#2D7A6D] text-[#6FDAC3]' 
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon size={18} className={isActive ? 'text-[#6FDAC3]' : 'text-zinc-500'} />
                <div className="text-left">
                  <p className="text-xs font-bold leading-none">{item.label}</p>
                  <p className="text-[9px] text-zinc-500 font-medium mt-1">{item.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer HIPAA Compliance & Logout */}
      <div className="p-4 border-t border-zinc-900 flex flex-col gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-emerald-950/30 rounded-xl border border-emerald-900/20 text-[#6FDAC3] text-[10px] font-bold select-none">
          <Shield size={14} className="flex-shrink-0" id="hipaa-iso-shield" />
          <span>SSL Encryption (HIPAA ISO-27001)</span>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-950/20 rounded-xl transition-all hover:border-red-900/25 text-xs font-bold"
        >
          <LogOut size={16} />
          <span>Secure Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
