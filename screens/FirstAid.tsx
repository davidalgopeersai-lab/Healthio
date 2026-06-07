
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Info, Search, HeartPulse, Flame, Zap, Wind } from 'lucide-react';

interface FirstAidProps {
  onBack: () => void;
}

const guides = [
  { id: 1, title: 'Burns & Scalds', icon: <Flame size={20} className="text-orange-500" />, color: 'bg-orange-50' },
  { id: 2, title: 'CPR Steps', icon: <HeartPulse size={20} className="text-red-500" />, color: 'bg-red-50' },
  { id: 3, title: 'Choking', icon: <Wind size={20} className="text-blue-500" />, color: 'bg-blue-50' },
  { id: 4, title: 'Allergic Reaction', icon: <Zap size={20} className="text-purple-500" />, color: 'bg-purple-50' },
];

const FirstAid: React.FC<FirstAidProps> = ({ onBack }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="w-full h-full bg-[#FAFBFC] flex flex-col relative overflow-hidden">
      <div className="px-6 pt-12 pb-6 flex items-center justify-between bg-white border-b border-gray-50">
        <button onClick={onBack} className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-500 border border-gray-100">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-[#1F2933]">First Aid Guide</h2>
        <button className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-500 border border-gray-100">
          <Search size={20} />
        </button>
      </div>

      <div className="px-6 flex-1 overflow-y-auto pb-10 pt-6">
        <div className="bg-gradient-to-br from-[#2D7A6D] to-[#6FDAC3] p-6 rounded-[28px] text-white flex items-center justify-between mb-8 shadow-lg shadow-emerald-900/10">
          <div className="max-w-[70%]">
            <h3 className="font-bold text-lg leading-tight mb-2">Emergency?</h3>
            <p className="text-xs opacity-90 leading-relaxed">Follow quick instructions or call emergency services immediately.</p>
          </div>
          <div className="bg-white/20 p-3.5 rounded-2xl backdrop-blur-md border border-white/20">
            <Info size={28} />
          </div>
        </div>

        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Common Situations</h3>
        
        <div className="space-y-4">
          {guides.map((guide) => (
            <motion.div
              key={guide.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedId(guide.id)}
              className="bg-white p-5 rounded-[24px] flex items-center justify-between shadow-sm border border-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl ${guide.color} flex items-center justify-center`}>
                  {guide.icon}
                </div>
                <div>
                  <h4 className="font-bold text-[#1F2933] text-sm">{guide.title}</h4>
                  <p className="text-[10px] text-gray-400 font-medium">Step-by-step instructions</p>
                </div>
              </div>
              <ChevronLeft size={18} className="rotate-180 text-gray-300" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
            <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute inset-0 bg-white z-50 p-6 flex flex-col"
            >
                <div className="flex items-center justify-between mb-8">
                    <button onClick={() => setSelectedId(null)} className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                        <ChevronLeft size={22} />
                    </button>
                    <h3 className="font-bold text-[#1F2933]">Burn Care Guide</h3>
                    <div className="w-11 h-11" />
                </div>

                <div className="flex-1 overflow-y-auto space-y-8 pr-2">
                    <div className="relative h-56 rounded-[32px] overflow-hidden mb-8 shadow-md">
                        <img src="https://picsum.photos/600/400?burn" className="w-full h-full object-cover" alt="Instruction" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white text-[10px] font-bold uppercase tracking-wider">Instructional Visual</div>
                    </div>

                    <Step number={1} title="Remove from Heat" desc="Immediately move the person away from the source of the burn. Do not put yourself at risk during this process." />
                    <Step number={2} title="Cool the Burn" desc="Run cool (not cold) tap water over the burn for 10-20 minutes. Avoid using ice or freezing water directly on the skin." />
                    <Step number={3} title="Cover Loosely" desc="Once cooled, wrap the burn area loosely with clean plastic wrap or a sterile non-stick bandage to prevent infection." />
                    <Step number={4} title="Avoid Home Remedies" desc="Do not apply butter, grease, or ointments to the burn as these can trap heat and worsen the skin damage." />
                </div>

                <button 
                    onClick={() => setSelectedId(null)}
                    className="mt-6 w-full bg-[#2D7A6D] text-white py-4.5 rounded-[20px] font-bold shadow-lg shadow-emerald-900/10 active:scale-95 transition-all"
                >
                    I Understand
                </button>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Step = ({ number, title, desc }: { number: number, title: string, desc: string }) => (
    <div className="flex gap-5">
        <div className="flex-shrink-0 w-9 h-9 rounded-2xl bg-[#2D7A6D] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-900/20">
            {number}
        </div>
        <div className="flex-1">
            <h4 className="font-bold text-[#1F2933] text-sm mb-1.5">{title}</h4>
            <p className="text-[13px] text-[#6B7280] leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default FirstAid;
