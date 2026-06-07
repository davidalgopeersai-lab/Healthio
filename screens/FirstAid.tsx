
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Info, Search, HeartPulse, Flame, Zap, Wind } from 'lucide-react';

interface FirstAidProps {
  onBack: () => void;
}

const guides = [
  { id: 1, title: 'Burns & Scalds', icon: <Flame size={20} className="text-orange-400" />, color: 'bg-orange-950/40 border border-orange-900/30' },
  { id: 2, title: 'CPR Steps', icon: <HeartPulse size={20} className="text-red-400" />, color: 'bg-red-950/40 border border-red-900/30' },
  { id: 3, title: 'Choking Protocol', icon: <Wind size={20} className="text-blue-400" />, color: 'bg-blue-950/40 border border-blue-900/30' },
  { id: 4, title: 'Allergic Reaction', icon: <Zap size={20} className="text-purple-400" />, color: 'bg-purple-950/40 border border-purple-900/30' },
];

const guideDetails: Record<number, { title: string, img: string, steps: { title: string, desc: string }[] }> = {
  1: {
    title: 'Burns & Scalds Care',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400',
    steps: [
      { title: 'Remove from Heat', desc: 'Immediately move the person away from the source of the burn. Do not put yourself at risk during this process.' },
      { title: 'Cool the Burn', desc: 'Run cool (not cold) tap water over the burn for 10-20 minutes. Avoid using ice or freezing water directly on the skin.' },
      { title: 'Cover Loosely', desc: 'Once cooled, wrap the burn area loosely with clean plastic wrap or a sterile non-stick bandage to prevent infection.' },
      { title: 'Avoid Home Remedies', desc: 'Do not apply butter, grease, or ointments as these trap heat and worsen the skin damage.' }
    ]
  },
  2: {
    title: 'Cardiopulmonary Resuscitation (CPR)',
    img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400',
    steps: [
      { title: 'Call Emergency Services', desc: 'Confirm person is unresponsive and not breathing. Instruct someone to call emergency dispatch immediately.' },
      { title: '30 Chest Compressions', desc: 'Place hands in center of chest, push deep and fast (100-120bpm, 2 inches deep) for 30 cycles in succession.' },
      { title: '2 Rescue Breaths', desc: 'Tilt head back, lift chin, pinch nose nose, and blow for 1 second twice while checking chest rises.' },
      { title: 'Repeat Cycles', desc: 'Continue 30 compressions and 2 breaths continuously until professional paramedics or an AED arrives.' }
    ]
  },
  3: {
    title: 'Choking Assistance (Heimlich)',
    img: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=400',
    steps: [
      { title: 'Encourage Coughing', desc: 'If the person can speak, breathe, or cough loudly, encourage them to continue coughing strongly to dislodge the object.' },
      { title: '5 Back Blows', desc: 'Lean person forward and deliver 5 upward blows between shoulder blades using the heel of your hand.' },
      { title: '5 Abdominal Thrusts', desc: 'Stand behind, wrap arms around waist, make a fist, and pull sharply inward and upward above navel.' },
      { title: 'Call Emergency Services', desc: 'If the person goes unconscious, gently lower to floor, call dispatch, and immediately initiate emergency CPR.' }
    ]
  },
  4: {
    title: 'Anaphylaxis & Allergic Reaction',
    img: 'https://images.unsplash.com/photo-1542736667-069246bdbc6d?auto=format&fit=crop&q=80&w=400',
    steps: [
      { title: 'Use EpiPen (Epinephrine)', desc: 'If they have an epinephrine auto-injector, help them administer it immediately into outer middle thigh.' },
      { title: 'Call Dispatch Immediately', desc: 'Allergic reactions with breathing difficulty (anaphylaxis) can be fatal within minutes. Call emergency line.' },
      { title: 'Maintain Airway', desc: 'Keep the victim lying flat with legs elevated to sustain blood pressure. Loosen any constrictive clothing.' },
      { title: 'Monitor Condition', desc: 'Be prepared to administer CPR if breathing ceases. Keep them warm and wait for the ambulance.' }
    ]
  }
};

const FirstAid: React.FC<FirstAidProps> = ({ onBack }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedDetails = selectedId ? guideDetails[selectedId] : null;

  return (
    <div className="w-full h-full bg-black flex flex-col relative overflow-hidden text-white font-sans">
      <div className="px-6 pt-12 pb-6 flex items-center justify-between bg-zinc-950 border-b border-zinc-900">
        <button onClick={onBack} className="w-11 h-11 rounded-full bg-zinc-900 flex items-center justify-center shadow-md text-zinc-300 border border-zinc-800 active:scale-95 transition-transform">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-white">First Aid Guide</h2>
        <div className="w-11 h-11 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-850 opacity-0">
          <Search size={20} />
        </div>
      </div>

      <div className="px-6 flex-1 overflow-y-auto pb-10 pt-6">
        <div className="bg-gradient-to-br from-[#2D7A6D] to-[#14473D] p-6 rounded-[28px] text-white flex items-center justify-between mb-8 shadow-lg shadow-emerald-950/20">
          <div className="max-w-[70%]">
            <h3 className="font-bold text-lg leading-tight mb-2">Emergency situation?</h3>
            <p className="text-xs opacity-90 leading-relaxed">Follow quick certified instructions or call medical dispatcher immediately.</p>
          </div>
          <div className="bg-white/10 p-3.5 rounded-2xl backdrop-blur-md border border-white/5">
            <Info size={28} className="text-[#6FDAC3]" />
          </div>
        </div>

        <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4 ml-1">Common Situations</h3>
        
        <div className="space-y-4">
          {guides.map((guide) => (
            <motion.div
              key={guide.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedId(guide.id)}
              className="bg-zinc-900 p-5 rounded-[24px] flex items-center justify-between shadow-md border border-zinc-800 cursor-pointer hover:border-[#2D7A6D] transition-all"
            >
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl ${guide.color} flex items-center justify-center`}>
                  {guide.icon}
                </div>
                <div>
                  <h4 className="font-bold text-zinc-100 text-sm">{guide.title}</h4>
                  <p className="text-[10px] text-zinc-400 font-medium mt-0.5">Step-by-step instructions</p>
                </div>
              </div>
              <ChevronLeft size={18} className="rotate-180 text-zinc-500" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedDetails && (
            <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute inset-0 bg-zinc-950 z-50 p-6 flex flex-col text-white"
            >
                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => setSelectedId(null)} className="w-11 h-11 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                        <ChevronLeft size={22} />
                    </button>
                    <h3 className="font-bold text-white text-base">{selectedDetails.title}</h3>
                    <div className="w-11 h-11" />
                </div>

                <div className="flex-1 overflow-y-auto space-y-8 pr-2 pb-6">
                    <div className="relative h-48 rounded-[24px] overflow-hidden mb-6 border border-zinc-800 shadow-md">
                        <img src={selectedDetails.img} className="w-full h-full object-cover" alt="Instructional Visual" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white text-[10px] font-bold uppercase tracking-wider bg-zinc-950/80 px-2.5 py-1 rounded-md border border-zinc-800">Instructional Graphic Chart</div>
                    </div>

                    {selectedDetails.steps.map((st, i) => (
                      <Step key={i} number={i + 1} title={st.title} desc={st.desc} />
                    ))}
                </div>

                <button 
                    onClick={() => setSelectedId(null)}
                    className="mt-4 w-full bg-[#2D7A6D] hover:bg-[#1a554a] text-white py-4 rounded-[20px] font-bold shadow-lg shadow-emerald-950/15 active:scale-95 transition-all text-xs"
                >
                    Guidelines Acknowledged
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
            <h4 className="font-bold text-zinc-100 text-sm mb-1.5">{title}</h4>
            <p className="text-[13px] text-zinc-400 leading-relaxed font-normal">{desc}</p>
        </div>
    </div>
);

export default FirstAid;
