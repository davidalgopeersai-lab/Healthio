
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Heart, Brain, Clock } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    title: "AI Symptom Checker",
    desc: "Describe how you feel and let our advanced AI help you understand potential causes.",
    icon: <Brain size={80} className="text-[#6FDAC3] animate-pulse" />,
    color: "bg-zinc-900 border border-zinc-800"
  },
  {
    title: "First Aid Anywhere",
    desc: "Get immediate step-by-step guides for emergencies and everyday health situations.",
    icon: <Clock size={80} className="text-teal-400" />,
    color: "bg-zinc-900 border border-zinc-800"
  },
  {
    title: "Personalized Tips",
    desc: "Daily health insights tailored specifically to your lifestyle and wellness goals.",
    icon: <Heart size={80} className="text-emerald-400" />,
    color: "bg-zinc-900 border border-zinc-800"
  }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="w-full h-full bg-black flex flex-col px-8 py-12 text-white">
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="flex flex-col items-center text-center"
          >
            <div className={`w-48 h-48 rounded-full flex items-center justify-center mb-10 shadow-lg ${steps[step].color}`}>
              {steps[step].icon}
            </div>
            <h2 className="text-2xl font-black text-zinc-100 mb-4 font-sans">{steps[step].title}</h2>
            <p className="text-zinc-400 leading-relaxed px-4 text-sm font-sans">
              {steps[step].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-auto flex flex-col items-center">
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-[#2D7A6D]' : 'w-2 bg-zinc-800'}`}
            />
          ))}
        </div>
        
        <button 
          onClick={next}
          className="w-full bg-[#2D7A6D] hover:bg-[#1f584e] text-white py-4 rounded-[16px] font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-emerald-950/15"
        >
          {step === steps.length - 1 ? "Get Started" : "Next"}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
