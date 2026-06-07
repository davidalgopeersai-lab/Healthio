
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Activity, Heart, Navigation as NavIcon, Bell, Stethoscope, BriefcaseMedical, Zap, MapPin } from 'lucide-react';
import Navigation from '../components/Navigation';
import { Screen } from '../types';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="w-full h-full bg-[#FAFBFC] flex flex-col relative">
      <div className="px-6 pt-12 pb-6 overflow-y-auto flex-1 scrollbar-hide">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1F2933]">Hi, Kwaku 👋</h2>
            <p className="text-sm text-[#6B7280]">How are you feeling today?</p>
          </div>
          <button className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-50">
            <Bell size={20} className="text-gray-600" />
          </button>
        </div>

        {/* AI Hero Card */}
        <motion.div 
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate(Screen.CHAT)}
          className="relative w-full h-44 bg-gradient-to-br from-[#2D7A6D] to-[#6FDAC3] rounded-[24px] p-6 text-white overflow-hidden shadow-lg shadow-emerald-900/10 cursor-pointer mb-8"
        >
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <Stethoscope size={24} />
              </div>
              <div className="text-right">
                <p className="text-[10px] opacity-90 uppercase tracking-[0.1em] font-bold">Smart Scan</p>
                <p className="text-[10px] opacity-70">Powered by Gemini AI</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">AI Symptom Checker</h3>
              <button className="bg-white text-[#2D7A6D] px-5 py-2 rounded-[12px] text-xs font-bold shadow-sm active:scale-95 transition-all">
                Start Consultation
              </button>
            </div>
          </div>
          {/* Abstract Decorations */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl -ml-5 -mb-5" />
        </motion.div>

        {/* Search Bar Visual */}
        <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="text" 
                placeholder="Search symptoms, clinics, or tips..." 
                className="w-full bg-white border border-gray-100 rounded-[16px] py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#2D7A6D]/30 shadow-sm"
                readOnly
            />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <FeatureCard 
            title="First Aid" 
            desc="Emergency Guides" 
            icon={<BriefcaseMedical size={24} className="text-emerald-600" />}
            bgColor="bg-emerald-50"
            onClick={() => onNavigate(Screen.FIRST_AID)}
          />
          <FeatureCard 
            title="Health Tips" 
            desc="Daily Wellness" 
            icon={<Zap size={24} className="text-[#2D7A6D]" />}
            bgColor="bg-mint-50/50"
            onClick={() => onNavigate(Screen.TIPS)}
          />
          <FeatureCard 
            title="Nearby Clinics" 
            desc="Find assistance" 
            icon={<MapPin size={24} className="text-emerald-500" />}
            bgColor="bg-green-50"
            onClick={() => {}}
          />
          <FeatureCard 
            title="Records" 
            desc="Med history" 
            icon={<Activity size={24} className="text-[#2D7A6D]" />}
            bgColor="bg-emerald-50"
            onClick={() => {}}
          />
        </div>

        <div className="mb-24">
            <h4 className="font-bold text-[#1F2933] text-sm mb-4">Latest Health News</h4>
            <div className="bg-white p-4 rounded-[20px] shadow-sm border border-gray-50 flex gap-4">
                <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                    <img src="https://picsum.photos/100/100?medical" className="w-full h-full object-cover" />
                </div>
                <div>
                    <span className="text-[10px] font-bold text-[#2D7A6D] uppercase">Wellness</span>
                    <h5 className="font-bold text-xs text-[#1F2933] mt-1 mb-1">5 Simple habits for a better heart health</h5>
                    <p className="text-[10px] text-gray-400">Small changes can lead to big results over time...</p>
                </div>
            </div>
        </div>
      </div>

      <Navigation activeScreen={Screen.DASHBOARD} onNavigate={onNavigate} />
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  bgColor: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, desc, icon, bgColor, onClick }) => (
  <motion.div 
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="bg-white p-5 rounded-[24px] shadow-sm cursor-pointer border border-gray-50 flex flex-col gap-4"
  >
    <div className={`w-11 h-11 rounded-xl ${bgColor} flex items-center justify-center`}>
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-[#1F2933] text-[13px]">{title}</h4>
      <p className="text-[10px] text-[#6B7280]">{desc}</p>
    </div>
  </motion.div>
);

export default Dashboard;
