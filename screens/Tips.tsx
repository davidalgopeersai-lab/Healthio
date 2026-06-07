
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Filter, Bookmark, PlayCircle, Clock, X, Check, Lightbulb } from 'lucide-react';
import Navigation from '../components/Navigation';
import { Screen, HealthTip } from '../types';

interface TipsProps {
  onNavigate: (screen: Screen) => void;
}

const mockTips: HealthTip[] = [
  { id: '1', title: 'Better Sleep Habits', description: 'Discover 5 easy ways to improve your sleep cycle starting tonight.', category: 'Sleep', image: 'https://picsum.photos/400/200?random=1' },
  { id: '2', title: 'The Power of Hydration', description: 'Why drinking water is the most important part of your daily routine.', category: 'Nutrition', image: 'https://picsum.photos/400/200?random=2' },
  { id: '3', title: 'Stretching for Desk Workers', description: 'Relieve back and neck tension with these 3-minute stretches.', category: 'Exercise', image: 'https://picsum.photos/400/200?random=3' },
  { id: '4', title: 'Mindfulness Basics', description: 'A beginners guide to meditation and mental clarity in 10 minutes.', category: 'Mental Health', image: 'https://picsum.photos/400/200?random=4' },
  { id: '5', title: 'Vitamin D Essentials', description: 'How to safely get enough sunlight during winter months.', category: 'Nutrition', image: 'https://picsum.photos/400/200?random=5' },
];

const categories = ['All', 'Sleep', 'Nutrition', 'Exercise', 'Mental Health'];

const Tips: React.FC<TipsProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFilter, setShowFilter] = useState(false);

  const filteredTips = useMemo(() => {
    if (activeCategory === 'All') return mockTips;
    return mockTips.filter(tip => tip.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="w-full h-full bg-[#FAFBFC] flex flex-col relative">
      <div className="px-6 pt-12 pb-6 flex items-center justify-between bg-white border-b border-gray-50">
        <h2 className="text-2xl font-bold text-[#1F2933]">Daily Wellness</h2>
        <div className="flex gap-2">
            <button className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-500 border border-gray-50">
                <Bookmark size={20} />
            </button>
            <button 
                onClick={() => setShowFilter(true)}
                className={`w-11 h-11 rounded-full flex items-center justify-center shadow-sm border transition-all ${
                    showFilter ? 'bg-[#2D7A6D] text-white border-transparent' : 'bg-white text-gray-500 border-gray-50'
                }`}
            >
                <Filter size={20} />
            </button>
        </div>
      </div>

      <div className="px-6 flex-1 overflow-y-auto pb-24 pt-4">
        {/* Horizontal Category Scroll */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                activeCategory === cat 
                    ? 'bg-[#2D7A6D] text-white shadow-md shadow-emerald-900/10' 
                    : 'bg-white text-gray-500 border border-gray-100 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredTips.map((tip) => (
                <motion.div
                    layout
                    key={tip.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
                >
                    <div className="relative h-44">
                        <img src={tip.image} className="w-full h-full object-cover" alt={tip.title} referrerPolicy="no-referrer" />
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-[#2D7A6D] uppercase tracking-wider shadow-sm">
                            {tip.category}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white border border-white/20">
                            <PlayCircle size={22} fill="currentColor" fillOpacity={0.2} />
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium mb-2">
                            <Clock size={12} />
                            <span>5 min read</span>
                        </div>
                        <h3 className="font-bold text-[#1F2933] mb-1.5">{tip.title}</h3>
                        <p className="text-[11px] text-[#6B7280] leading-relaxed line-clamp-2">
                        {tip.description}
                        </p>
                    </div>
                </motion.div>
            ))}
          </AnimatePresence>
          {filteredTips.length === 0 && (
              <div className="py-20 text-center flex flex-col items-center opacity-50">
                  <Lightbulb size={48} className="text-gray-300 mb-4" />
                  <p className="text-sm font-medium text-gray-400">No tips found in this category.</p>
              </div>
          )}
        </div>
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilter && (
            <div className="absolute inset-0 z-50 flex items-end">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowFilter(false)}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
                />
                <motion.div 
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="relative w-full bg-white rounded-t-[32px] p-8 pb-12 shadow-2xl"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-[#1F2933]">Filter Topics</h3>
                        <button 
                            onClick={() => setShowFilter(false)}
                            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`flex items-center justify-between px-4 py-4 rounded-[18px] text-sm font-bold border transition-all ${
                                    activeCategory === cat 
                                        ? 'bg-[#2D7A6D]/5 border-[#2D7A6D] text-[#2D7A6D]' 
                                        : 'bg-white border-gray-100 text-gray-500'
                                }`}
                            >
                                {cat}
                                {activeCategory === cat && <Check size={16} />}
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={() => setShowFilter(false)}
                        className="w-full bg-[#2D7A6D] text-white py-4 rounded-[16px] font-bold shadow-lg shadow-emerald-900/10 active:scale-95 transition-all"
                    >
                        Apply Filters
                    </button>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      <Navigation activeScreen={Screen.TIPS} onNavigate={onNavigate} />
    </div>
  );
};

export default Tips;
