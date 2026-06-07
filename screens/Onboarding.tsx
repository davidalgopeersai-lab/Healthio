
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
    icon: <Brain size={80} className="text-[#2D7A6D]" />,
    color: "bg-emerald-50"
  },
  {
    title: "First Aid Anywhere",
    desc: "Get immediate step-by-step guides for emergencies and everyday health situations.",
    icon: <Clock size={80} className="text-[#6FDAC3]" />,
    color: "bg-mint-50"
  },
  {
    title: "Personalized Tips",
    desc: "Daily health insights tailored specifically to your lifestyle and wellness goals.",
    icon: <Heart size={80} className="text-[#2D7A6D]" />,
    color: "bg-green-50"
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
    <div className="w-full h-full bg-[#FAFBFC] flex flex-col px-8 py-12">
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="flex flex-col items-center text-center"
          >
            <div className={`w-48 h-48 rounded-full flex items-center justify-center mb-10 ${steps[step].color}`}>
              {steps[step].icon}
            </div>
            <h2 className="text-2xl font-bold text-[#1F2933] mb-4">{steps[step].title}</h2>
            <p className="text-[#6B7280] leading-relaxed px-4 text-sm">
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
              className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-[#2D7A6D]' : 'w-2 bg-gray-200'}`}
            />
          ))}
        </div>
        
        <button 
          onClick={next}
          className="w-full bg-[#2D7A6D] text-white py-4 rounded-[16px] font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-emerald-900/10"
        >
          {step === steps.length - 1 ? "Get Started" : "Next"}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
