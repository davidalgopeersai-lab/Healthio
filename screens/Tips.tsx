
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Filter, Bookmark, Clock, X, Check, Lightbulb, Share2, BookOpen } from 'lucide-react';
import Navigation from '../components/Navigation';
import { Screen, HealthTip } from '../types';

interface TipsProps {
  onNavigate: (screen: Screen) => void;
}

const mockTips: HealthTip[] = [
  { 
    id: '1', 
    title: 'Better Sleep Habits', 
    description: 'Discover 5 easy ways to improve your sleep cycle starting tonight.', 
    category: 'Sleep', 
    image: 'https://picsum.photos/400/200?random=1',
    readTime: '5 min read',
    fullContent: [
      "Getting high-quality sleep is one of the most effective habits you can build for long-term health. Chronic sleep deficiency is linked to elevated stress, poor mental concentration, and weaker immune responses.",
      "To build a robust sleep cycle, establish a regular 'wind-down' routine. This means cutting off stimulating blue-light screens (mobiles, laptops) at least 60 minutes before bedtime.",
      "Keep your bedroom cool, dark, and quiet. The ideal temperature range for deep sleep is around 60°F to 67°F (15°C to 19°C). Limiting afternoon caffeine after 2:00 PM is also clinically shown to raise sleep depth indices."
    ],
    keyTakeaways: [
      "Strict screen curfew 1 hour before sleep",
      "Cool and pitch-dark bedroom environment",
      "Zero caffeine consumption past 2 PM"
    ]
  },
  { 
    id: '2', 
    title: 'The Power of Hydration', 
    description: 'Why drinking water is the most important part of your daily routine.', 
    category: 'Nutrition', 
    image: 'https://picsum.photos/400/200?random=2',
    readTime: '4 min read',
    fullContent: [
      "Water represents approximately 60% of human body weight and plays a massive role in temperature regulation, joint lubrication, waste excretion, and cognitive focus.",
      "Often, mild dehydration masquerades as head discomfort, general fatigue, or snack cravings. Simply drinking 8 to 10 cups of water daily can boost skin elasticity, digestion, and metabolic rates.",
      "Start your morning with a large glass of pure water. Carry a reusable bottle throughout the day as a reminder, and hydrate well before and during any physical training session."
    ],
    keyTakeaways: [
      "Drink warm water on an empty stomach every morning",
      "Never substitute plain water with soda or sugary drinks",
      "Target a baseline intake of 2.5 Liters every single day"
    ]
  },
  { 
    id: '3', 
    title: 'Stretching for Desk Workers', 
    description: 'Relieve back and neck tension with these 3-minute stretches.', 
    category: 'Exercise', 
    image: 'https://picsum.photos/400/200?random=3',
    readTime: '3 min read',
    fullContent: [
      "Sitting for prolonged periods places static loads on your back, hip flexors, and neck muscles, which reduces local blood circulation and leads to postural aches.",
      "To combat this sit-heavy fatigue, deploy the 50-10 rule: for every 50 minutes of keyboard desk work, stand up and perform light stretches for 3 to 10 minutes.",
      "Key stretches include neck side-bends, shoulder rolls, hamstring stretches, and standing chest-openers. This actively relaxes tense muscles and boosts neural alertness."
    ],
    keyTakeaways: [
      "Perform a light neck rotation stretch every 1 hour",
      "Open the chest by locking fingers behind your back",
      "Stand and walk during phone consultations"
    ]
  },
  { 
    id: '4', 
    title: 'Mindfulness Basics', 
    description: 'A beginners guide to meditation and mental clarity in 10 minutes.', 
    category: 'Mental Health', 
    image: 'https://picsum.photos/400/200?random=4',
    readTime: '6 min read',
    fullContent: [
      "Continuous cortisol elevation caused by chronic mental pressure has a direct impact on cardiovascular load and triggers metabolic imbalances.",
      "Mindfulness meditation is the practice of gently anchoring your attention to the present moment, typically through breathing cycles. Guided breathing lowers heart rate indices and calms stress loops.",
      "Our clinical tip is the 4-7-8 Breathing Method: Inhale through the nose for 4 seconds, hold the breath for 7 seconds, and exhale completely out of the mouth for 8 seconds. Repeat 4 times."
    ],
    keyTakeaways: [
      "Practice breath grounding for 5 minutes per day",
      "Adopt the 4-7-8 respiratory technique",
      "Focus entirely on bodily sensations to quiet mental noise"
    ]
  },
  { 
    id: '5', 
    title: 'Vitamin D Essentials', 
    description: 'How to safely get enough sunlight during winter months.', 
    category: 'Nutrition', 
    image: 'https://picsum.photos/400/200?random=5',
    readTime: '4 min read',
    fullContent: [
      "Vitamin D acts more like a hormone than a vitamin, directly reinforcing bone density, cellular defense, and hormone synthesis in humans.",
      "The most organic way to obtain Vitamin D is through safe sunlight exposure. Sunlight triggers the synthesis of active Vitamin D inside the skin layers.",
      "Aim for 10 to 15 minutes of direct sunlight daily on arms and face without sunblock during mid-day. Ensure dietary intake of oily fish, fortified milks, or doctor-approved supplements."
    ],
    keyTakeaways: [
      "Get 15 minutes of safe sunlight exposure daily",
      "Supplement with Vitamin D3 drops if living in winter climates",
      "Incorporate eggs, liver, and salmon into your diet"
    ]
  },
];

const categories = ['All', 'Sleep', 'Nutrition', 'Exercise', 'Mental Health'];

const Tips: React.FC<TipsProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedTip, setSelectedTip] = useState<HealthTip | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [completedHabits, setCompletedHabits] = useState<Record<string, boolean>>({});

  const filteredTips = useMemo(() => {
    if (activeCategory === 'All') return mockTips;
    return mockTips.filter(tip => tip.category === activeCategory);
  }, [activeCategory]);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleHabit = (id: string) => {
    setCompletedHabits(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="w-full h-full bg-black flex flex-col relative font-sans text-white">
      <div className="px-6 pt-12 pb-6 flex items-center justify-between bg-zinc-950 border-b border-zinc-900 z-10 shadow-md">
        <h2 className="text-2xl font-bold text-white">Daily Wellness</h2>
        <div className="flex gap-2">
            <button 
              onClick={() => {
                // Instantly filter to only bookmarked tips! Extremely interactive!
                setActiveCategory(activeCategory === 'Bookmarked' ? 'All' : 'Bookmarked');
              }}
              className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md border transition-all ${
                activeCategory === 'Bookmarked' ? 'bg-amber-500 text-white border-transparent' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
              }`}
            >
                <Bookmark id="bkmrk-icon" size={20} fill={activeCategory === 'Bookmarked' ? 'currentColor' : 'none'} />
            </button>
            <button 
                onClick={() => setShowFilter(true)}
                className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md border transition-all ${
                    showFilter ? 'bg-[#2D7A6D] text-white border-transparent' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
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
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tip Cards Grid */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {(activeCategory === 'Bookmarked' ? mockTips.filter(t => bookmarkedIds.includes(t.id)) : filteredTips).map((tip) => (
                <motion.div
                    layout
                    key={tip.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTip(tip)}
                    className="bg-zinc-900 rounded-[24px] overflow-hidden shadow-md border border-zinc-800 cursor-pointer hover:border-[#2D7A6D]/50 transition-all"
                >
                    <div className="relative h-44">
                        <img src={tip.image} className="w-full h-full object-cover" alt={tip.title} referrerPolicy="no-referrer" />
                        
                        <div className="absolute top-4 left-4 bg-[#2D7A6D] px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-sm border border-emerald-900/20">
                            {tip.category}
                        </div>

                        <div className="absolute top-4 right-4 bg-zinc-950/80 backdrop-blur-md p-2 rounded-full text-white border border-zinc-850"
                          onClick={(e) => toggleBookmark(tip.id, e)}
                        >
                            <Bookmark size={16} fill={bookmarkedIds.includes(tip.id) ? '#F59E0B' : 'none'} className={bookmarkedIds.includes(tip.id) ? 'text-amber-500' : 'text-zinc-400'} />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        
                        {/* Replaced stagnant play circle video icon with a clean read icon */}
                        <div className="absolute bottom-4 right-4 bg-zinc-950/90 backdrop-blur-md p-2.5 rounded-full text-[#6FDAC3] shadow-md border border-zinc-800">
                            <BookOpen size={18} />
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-medium mb-2">
                            <Clock size={12} className="text-zinc-500" />
                            <span>{tip.readTime}</span>
                        </div>
                        <h3 className="font-bold text-zinc-100 text-sm mb-1.5 leading-snug">{tip.title}</h3>
                        <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
                            {tip.description}
                        </p>
                    </div>
                </motion.div>
            ))}
          </AnimatePresence>

          {(activeCategory === 'Bookmarked' ? mockTips.filter(t => bookmarkedIds.includes(t.id)) : filteredTips).length === 0 && (
              <div className="py-20 text-center flex flex-col items-center opacity-70">
                  <Lightbulb size={48} className="text-zinc-700 mb-4 animate-bounce" />
                  <p className="text-sm font-bold text-zinc-300">No guides matching this filter.</p>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed px-12">Try clearing your filters or bookmarking guides to see them here.</p>
              </div>
          )}
        </div>
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilter && (
            <div className="fixed inset-0 z-50 flex items-end justify-center">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowFilter(false)}
                    className="absolute inset-0 bg-black/75 backdrop-blur-sm" 
                />
                <motion.div 
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="relative w-[390px] bg-zinc-950 border border-zinc-850 rounded-t-[32px] p-8 pb-12 shadow-2xl z-10 text-white font-sans"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Filter Topics</h3>
                        <button 
                            onClick={() => setShowFilter(false)}
                            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-200"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`flex items-center justify-between px-4 py-4 rounded-[18px] text-xs font-bold border transition-all ${
                                    activeCategory === cat 
                                        ? 'bg-zinc-900 border-[#2D7A6D] text-[#6FDAC3]' 
                                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                                }`}
                            >
                                {cat}
                                {activeCategory === cat && <Check size={16} />}
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={() => setShowFilter(false)}
                        className="w-full bg-[#2D7A6D] hover:bg-[#1f594e] text-white py-4 rounded-[16px] font-bold shadow-lg shadow-emerald-950/15 active:scale-95 transition-all text-xs"
                    >
                        Apply Filters
                    </button>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* Tips Details Full Screen Modal */}
      <AnimatePresence>
        {selectedTip && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed inset-0 z-50 bg-[#070908] flex flex-col font-sans text-white border-l border-zinc-900"
          >
            {/* Header */}
            <div className="bg-zinc-950 px-6 pt-12 pb-4 flex items-center justify-between border-b border-zinc-900 shadow-md">
              <button 
                onClick={() => setSelectedTip(null)} 
                className="w-11 h-11 rounded-full bg-zinc-900 hover:bg-zinc-850 flex items-center justify-center shadow-md text-zinc-300 border border-zinc-800"
              >
                <ChevronLeft size={20} />
              </button>
              <h3 className="font-bold text-sm text-zinc-100">Wellness Article</h3>
              <button 
                onClick={() => toggleBookmark(selectedTip.id)}
                className="w-11 h-11 rounded-full bg-zinc-900 hover:bg-zinc-850 flex items-center justify-center shadow-md text-zinc-300 border border-zinc-800"
              >
                <Bookmark size={20} fill={bookmarkedIds.includes(selectedTip.id) ? '#F59E0B' : 'none'} className={bookmarkedIds.includes(selectedTip.id) ? "text-amber-500" : "text-zinc-500"} />
              </button>
            </div>

            {/* Contents */}
            <div className="flex-1 overflow-y-auto pb-10 bg-black">
              <div className="relative h-56 w-full border-b border-zinc-900">
                <img src={selectedTip.image} alt="Cover" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-6 bg-[#2D7A6D] text-white p-2 rounded-xl text-[10px] font-bold uppercase tracking-widest">{selectedTip.category}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />
                <h2 className="absolute bottom-6 left-6 right-6 text-white text-xl font-bold leading-tight drop-shadow-md">{selectedTip.title}</h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Meta block Approved */}
                <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400 bg-zinc-900 p-3.5 rounded-2xl border border-zinc-800 select-none">
                  <div className="flex items-center gap-1.5 text-[#6FDAC3]">
                    <Clock size={16} />
                    <span>{selectedTip.readTime}</span>
                  </div>
                  <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                  <span>Clinical Advisor Approved</span>
                </div>

                {/* Body Content */}
                <div className="space-y-4 text-zinc-300 text-xs leading-relaxed font-normal">
                  {selectedTip.fullContent.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* Takeaways Card */}
                <div className="bg-emerald-950/20 border border-emerald-900/30 p-5 rounded-[24px]">
                  <h4 className="text-xs font-bold text-[#6FDAC3] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Check size={18} className="text-[#6FDAC3]" />
                    Key Takeaways
                  </h4>
                  <ul className="space-y-3">
                    {selectedTip.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs font-medium text-zinc-300">
                        <div className="w-5 h-5 rounded-full bg-[#2D7A6D] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5 shadow-sm">
                          {i + 1}
                        </div>
                        <p className="flex-1 leading-normal">{takeaway}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interactive Action: Habit Check-off Challenge */}
                <div className="bg-zinc-900 p-5 rounded-[24px] border border-zinc-800 shadow-md flex flex-col gap-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">Interactive Action Challenge</h4>
                    <h3 className="font-bold text-zinc-100 text-sm">Commit to this habit today</h3>
                  </div>

                  <div 
                    onClick={() => toggleHabit(selectedTip.id)}
                    className="flex justify-between items-center p-3 rounded-2xl border border-zinc-850 bg-zinc-950 cursor-pointer select-none active:scale-98 transition-transform"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                        completedHabits[selectedTip.id] ? 'bg-[#2D7A6D] border-transparent text-white' : 'border-zinc-700 bg-zinc-900 text-transparent'
                      }`}>
                        <Check size={16} />
                      </div>
                      <span className="text-xs font-bold text-zinc-300">"I will execute these habits today"</span>
                    </div>
                    {completedHabits[selectedTip.id] && (
                      <span className="text-[10px] font-bold text-[#6FDAC3] bg-emerald-950/45 px-2.5 py-1 rounded-full border border-emerald-900/10 animate-pulse">Committed!</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => alert('Article Shared successfully!')}
                    className="flex-1 py-4 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded-[18px] font-bold text-zinc-300 text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <Share2 size={16} />
                    Share Report
                  </button>
                  <button 
                    onClick={() => setSelectedTip(null)}
                    className="flex-1 py-4 bg-[#2D7A6D] hover:bg-[#1a554a] rounded-[18px] font-bold text-white text-xs flex items-center justify-center active:scale-95 transition-all shadow-md shadow-emerald-900/10"
                  >
                    Got It, Finish Reading
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation activeScreen={Screen.TIPS} onNavigate={onNavigate} />
    </div>
  );
};

export default Tips;
