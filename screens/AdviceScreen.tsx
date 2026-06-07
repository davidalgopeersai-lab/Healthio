
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle2, ChevronLeft, Share2, Plus, ArrowRight } from 'lucide-react';
import { Screen, DiagnosisData } from '../types';

interface AdviceScreenProps {
  data: DiagnosisData | null;
  onNavigate: (screen: Screen) => void;
}

const AdviceScreen: React.FC<AdviceScreenProps> = ({ data, onNavigate }) => {
  if (!data) return null;

  return (
    <div className="w-full h-full bg-[#FAFBFC] flex flex-col overflow-y-auto">
      <div className="px-6 pt-12 pb-6 flex items-center justify-between bg-white border-b border-gray-50">
        <button onClick={() => onNavigate(Screen.CHAT)} className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-500 border border-gray-100">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-[#1F2933]">Health Summary</h2>
        <button className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-500 border border-gray-100">
          <Share2 size={20} />
        </button>
      </div>

      <div className="px-6 space-y-6 pb-12 pt-6">
        {/* Main Result Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-50"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center">
              <ShieldAlert className="text-[#2D7A6D]" size={22} />
            </div>
            <h3 className="font-bold text-[#1F2933]">What this could be</h3>
          </div>
          <p className="text-sm text-[#2D7A6D] font-bold mb-4 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">{data.title}</p>
          <ul className="space-y-3">
            {data.possibilities.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-[13px] text-[#6B7280] leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6FDAC3] mt-2 flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Advice Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-50"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-11 h-11 bg-mint-50 rounded-2xl flex items-center justify-center">
              <CheckCircle2 className="text-[#6FDAC3]" size={22} />
            </div>
            <h3 className="font-bold text-[#1F2933]">Advice & Steps</h3>
          </div>
          <div className="space-y-4">
            {data.advice.map((a, i) => (
              <div key={i} className="flex gap-4 p-3 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white flex items-center justify-center text-[11px] font-bold text-[#2D7A6D] border border-gray-100 shadow-sm">
                  {i + 1}
                </div>
                <p className="text-[13px] text-[#6B7280] leading-relaxed pt-1">{a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Warning Box */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-amber-50 border border-amber-100/50 p-5 rounded-[24px]"
        >
          <div className="flex gap-4">
            <ShieldAlert className="text-amber-500 flex-shrink-0" size={24} />
            <div>
              <p className="text-xs font-bold text-amber-800 mb-1.5 uppercase tracking-wider">Medical Disclaimer</p>
              <p className="text-[11px] text-amber-700/80 leading-relaxed font-medium">
                {data.warning || "If symptoms worsen or you experience severe pain, please consult a medical professional immediately."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 pt-4">
          <button className="w-full bg-[#2D7A6D] text-white py-4.5 rounded-[18px] font-bold shadow-lg shadow-emerald-900/10 active:scale-95 transition-all flex items-center justify-center gap-3">
            Save to Health Records
            <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => onNavigate(Screen.CHAT)}
            className="w-full bg-white text-[#2D7A6D] py-4.5 rounded-[18px] font-bold border border-[#2D7A6D]/20 active:scale-95 transition-all"
          >
            Ask Another Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdviceScreen;
