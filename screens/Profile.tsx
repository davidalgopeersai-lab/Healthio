
import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Globe, Bell, Shield, LogOut, ChevronRight, Edit3, Award, Star } from 'lucide-react';
import Navigation from '../components/Navigation';
import { Screen } from '../types';

interface ProfileProps {
  onNavigate: (screen: Screen) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  return (
    <div className="w-full h-full bg-[#FAFBFC] flex flex-col relative overflow-hidden">
      {/* Profile Header */}
      <div className="bg-[#2D7A6D] h-64 pt-12 px-6 relative">
        <div className="flex justify-between items-center text-white mb-6">
          <h2 className="text-lg font-bold">Health Profile</h2>
          <button className="w-11 h-11 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10">
            <Edit3 size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-2xl bg-gray-100">
                <img src="https://picsum.photos/200/200?random=10" className="w-full h-full object-cover" alt="Profile" />
            </div>
            <div className="absolute bottom-0 right-0 w-9 h-9 bg-[#6FDAC3] rounded-full border-4 border-[#2D7A6D] flex items-center justify-center">
                <Award size={16} className="text-white" />
            </div>
          </div>
          <h3 className="text-white font-bold text-xl mt-4">Kwaku Mensah</h3>
          <p className="text-white/80 text-[13px] font-medium">Age: 24 • Premium Member</p>
        </div>
        
        {/* Stats Overlay Card */}
        <div className="absolute -bottom-10 left-6 right-6 bg-white rounded-[28px] shadow-xl p-5 flex justify-around border border-gray-50">
            <StatItem icon={<Star className="text-amber-400" />} val="12" label="Checks" />
            <div className="w-[1px] bg-gray-100 h-8 self-center" />
            <StatItem icon={<Shield className="text-[#2D7A6D]" />} val="98%" label="Score" />
            <div className="w-[1px] bg-gray-100 h-8 self-center" />
            <StatItem icon={<Award className="text-[#6FDAC3]" />} val="5" label="Badges" />
        </div>
      </div>

      {/* Settings List */}
      <div className="mt-16 px-6 flex-1 overflow-y-auto pb-24">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">Account & Privacy</h4>
        <div className="space-y-3">
          <SettingItem icon={<Globe size={20} />} label="Language" value="English (US)" />
          <SettingItem icon={<Bell size={20} />} label="Notifications" value="Personalized alerts" />
          <SettingItem icon={<Shield size={20} />} label="Data Privacy" value="HIPAA Compliant" />
          <SettingItem icon={<Settings size={20} />} label="Accessibility" value="Large fonts enabled" />
          
          <button className="w-full flex items-center gap-5 p-4 rounded-[24px] text-red-500 hover:bg-red-50 transition-all mt-6 active:scale-98">
            <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center border border-red-100/50">
              <LogOut size={20} />
            </div>
            <span className="font-bold text-sm">Secure Logout</span>
          </button>
        </div>
        <div className="mt-10 mb-8 text-center">
            <p className="text-[10px] text-gray-300 font-medium">Héalthio App Version 2.4.0 (Build 503)</p>
        </div>
      </div>

      <Navigation activeScreen={Screen.PROFILE} onNavigate={onNavigate} />
    </div>
  );
};

const StatItem = ({ icon, val, label }: { icon: React.ReactNode, val: string, label: string }) => (
    <div className="flex flex-col items-center">
        <div className="mb-1.5">{icon}</div>
        <span className="text-sm font-bold text-[#1F2933]">{val}</span>
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{label}</span>
    </div>
);

const SettingItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) => (
  <motion.div 
    whileTap={{ scale: 0.98 }}
    className="bg-white p-4.5 rounded-[24px] flex items-center justify-between shadow-sm border border-gray-100 cursor-pointer hover:border-[#2D7A6D]/10 transition-colors"
  >
    <div className="flex items-center gap-5">
      <div className="w-11 h-11 rounded-2xl bg-gray-50 text-[#2D7A6D] flex items-center justify-center border border-gray-100">
        {icon}
      </div>
      <div>
        <h5 className="font-bold text-[#1F2933] text-[13px]">{label}</h5>
        {value && <p className="text-[11px] text-gray-400 font-medium">{value}</p>}
      </div>
    </div>
    <ChevronRight size={18} className="text-gray-300" />
  </motion.div>
);

export default Profile;
