
import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const SplashScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full bg-gradient-to-br from-[#2D7A6D] to-[#6FDAC3] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        className="bg-white p-6 rounded-[24px] shadow-lg mb-4"
      >
        <Activity size={64} className="text-[#2D7A6D]" />
      </motion.div>
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-white text-3xl font-bold tracking-tight"
      >
        Héalthio
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.2 }}
        className="text-white mt-2 font-medium"
      >
        Your AI Health Companion
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;
