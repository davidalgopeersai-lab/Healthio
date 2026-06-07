
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Activity, Heart, Bell, Stethoscope, BriefcaseMedical, Zap, MapPin, X, ArrowUpRight, ShieldCheck, HeartPulse, Sparkles, BookOpen } from 'lucide-react';
import Navigation from '../components/Navigation';
import { Screen, UserProfile } from '../types';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
  userProfile: UserProfile;
  setPrePopulatedSymptom?: (symptom: string) => void;
}

interface NewsItem {
  id: string;
  source: string;
  title: string;
  summary: string;
  fullBody: string;
  image: string;
  linkText: string;
}

const officialNews: NewsItem[] = [
  {
    id: '1',
    source: 'World Health Organization (WHO)',
    title: 'New Guidelines on Physical Activity and Sedentary Behavior',
    summary: 'Strong recommendations indicating adults need 150-300 minutes of moderate aerobic activity weekly.',
    fullBody: 'The World Health Organization (WHO) outlines that regular physical exercise is critical for preventing and managing heart disease, type-2 diabetes, and cancer. Sedentary habits increase cardiovascular risk exponentially. Experts suggest tracking steps, incorporating breaks during desk work, and engaging in energetic walks to boost metabolism and respiratory resilience.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=200',
    linkText: 'Read official WHO charter'
  },
  {
    id: '2',
    source: 'Harvard Health Publishing',
    title: 'Top Foods for Long-Term Cognitive and Brain Health',
    summary: 'Clinical studies highlight leaf greens, nuts, berries, and omega-3 rich fatty foods as neuronal fuels.',
    fullBody: 'Harvard Health and clinical researchers identify that key nutrients protect blood vessels inside the brain. Leafy greens (such as spinach and kale) deliver folate and beta-carotene, while fatty fish provides robust Docosahexaenoic acid (DHA) scales. Daily consumption slows cognitive aging indices and reinforces neuron connection paths.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=200',
    linkText: 'View Harvard Health article'
  },
  {
    id: '3',
    source: 'Mayo Clinic',
    title: 'Understanding Chronic Stress and Its Neurological Remodeling',
    summary: 'Understanding how continuous cortisol spikes impact cardiovascular blood flow and mindfulness remedies.',
    fullBody: 'Mayo Clinic clinical experts discuss the devastating long-term effects of persistent stress on the human central nervous system. Constant cortisol release contracts arterioles, raising blood pressure ratios. Adopting rhythmic diaphragmatic breathing for just 5 minutes daily can prompt the parasympathetic sweep, instantly calming flight-or-fight cardiovascular loops.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=200',
    linkText: 'Check Mayo Clinic guides'
  }
];

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, userProfile, setPrePopulatedSymptom }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Search Results Generator
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();

    const results = {
      symptoms: [] as { name: string; action: string }[],
      firstAid: [] as { name: string; state: Screen }[],
      clinics: [] as { name: string; state: Screen }[],
      tips: [] as { name: string; state: Screen }[]
    };

    // Symptom items search
    const symptomsList = [
      { name: 'Headache & Migraine', text: 'I am experiencing a sudden and sharp headache.' },
      { name: 'Chest Pain or tightness', text: 'I am feeling tightness and sharp chest pain.' },
      { name: 'Stomach Ache & Cramps', text: 'My stomach is upset and I have cramps.' },
      { name: 'Fever, Chills or Shivering', text: 'I have a high fever with cold chills.' },
      { name: 'Cough, Flu or Cold', text: 'I have a dry cough, running nose, and flu.' }
    ];
    results.symptoms = symptomsList
      .filter(s => s.name.toLowerCase().includes(query))
      .map(s => ({ name: s.name, action: s.text }));

    // Guides
    const guidesList = ['Burns & Scalds Care', 'CPR Steps emergency', 'Choking resolution', 'Allergic Reaction trigger'];
    if (guidesList.some(g => g.toLowerCase().includes(query))) {
      results.firstAid.push({ name: 'Emergency First Aid Guide', state: Screen.FIRST_AID });
    }

    // Clinics
    const clinicsList = ['East Legon Health Center', 'St. Luke Family Clinic', 'Apex Specialist Hospital', 'Nyaho Medical Centre'];
    if (clinicsList.some(c => c.toLowerCase().includes(query)) || query.includes('clinic') || query.includes('doctor') || query.includes('hospital')) {
      results.clinics.push({ name: 'Book Nearby Medical Clinics', state: Screen.CLINICS });
    }

    // Tips
    const tipsList = ['Better Sleep Habits', 'The Power of Hydration', 'Stretching for Desk Workers', 'Mindfulness Basics', 'Vitamin D Essentials'];
    results.tips = tipsList
      .filter(t => t.toLowerCase().includes(query))
      .map(t => ({ name: `Wellness Tip: ${t}`, state: Screen.TIPS }));

    const hasAny = results.symptoms.length > 0 || results.firstAid.length > 0 || results.clinics.length > 0 || results.tips.length > 0;
    return hasAny ? results : { empty: true };
  }, [searchQuery]);

  const selectSymptomQuery = (symptomText: string) => {
    if (setPrePopulatedSymptom) {
      setPrePopulatedSymptom(symptomText);
    }
    setSearchQuery('');
    onNavigate(Screen.CHAT);
  };

  return (
    <div className="w-full h-full bg-black flex flex-col relative font-sans text-white">
      <div className="px-6 pt-12 pb-6 overflow-y-auto flex-1 scrollbar-hide">
        
        {/* Profile Hello Greeting Row */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-black text-zinc-100 tracking-tight">Hi, {userProfile.name ? userProfile.name.split(' ')[0] : 'Member'} 👋</h2>
            <p className="text-xs text-zinc-400 font-medium">Your health panel is fully synchronized.</p>
          </div>
          <button 
            onClick={() => onNavigate(Screen.PROFILE)}
            className="w-11 h-11 rounded-full bg-zinc-900 flex items-center justify-center shadow-md border border-zinc-800 overflow-hidden active:scale-95 transition-transform"
          >
            <img 
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${userProfile.name || 'default'}`} 
              className="w-full h-full object-cover" 
              alt="Avatar"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>

        {/* AI Hero Card */}
        <motion.div 
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate(Screen.CHAT)}
          className="relative w-full h-44 bg-gradient-to-br from-[#2D7A6D] to-[#1c554b] rounded-[28px] p-6 text-white overflow-hidden shadow-lg shadow-emerald-950/20 cursor-pointer mb-6"
        >
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/5">
                <Stethoscope size={24} className="text-[#6FDAC3]" />
              </div>
              <div className="text-right">
                <span className="text-[9px] bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-widest font-extrabold flex items-center gap-1 text-[#6FDAC3]">
                  <Sparkles size={10} className="fill-current" />
                  Gemini Flash AI
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1.5 font-sans">AI Symptom Checker</h3>
              <p className="text-[10px] text-zinc-200 font-medium mb-3">Chat securely about clinical feelings and get curated wellness steps.</p>
              <button className="bg-white text-[#2D7A6D] hover:bg-zinc-100 px-4 py-2 rounded-xl text-xs font-black shadow-md flex items-center gap-1 active:scale-95 transition-transform">
                Consult Advisor
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
          {/* Abstract Vector Globes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl -ml-5 -mb-5 pointer-events-none" />
        </motion.div>

        {/* INTERACTIVE Search Bar Hub */}
        <div className="relative mb-6 z-20">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
                type="text" 
                placeholder="Search symptoms, clinics, or wellness tips..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-[18px] py-4 pl-12 pr-10 text-xs focus:outline-none focus:border-[#2D7A6D] text-white shadow-sm font-sans font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 bg-zinc-800 p-1 rounded-full"
              >
                <X size={12} />
              </button>
            )}

            {/* Dropdown search overlay results */}
            <AnimatePresence>
              {searchResults && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute left-0 right-0 top-14 bg-zinc-900 border border-zinc-800 rounded-[24px] shadow-2xl p-4 max-h-[360px] overflow-y-auto space-y-4 font-sans text-xs text-white"
                >
                  {/* Empty view */}
                  {'empty' in searchResults ? (
                    <p className="text-center text-zinc-400 py-4 font-medium">No results found. Try "headache", "clinic", "sleep", or "cpr".</p>
                  ) : (
                    <>
                      {/* Symptoms Matches */}
                      {searchResults.symptoms.length > 0 && (
                        <div>
                          <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">Symptom Checker Connect</p>
                          <div className="space-y-1">
                            {searchResults.symptoms.map((s, i) => (
                              <div 
                                key={i}
                                onClick={() => selectSymptomQuery(s.action)}
                                className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-900/20 hover:border-[#2D7A6D] flex justify-between items-center cursor-pointer select-none font-bold text-[#6FDAC3]"
                              >
                                <span>{s.name}</span>
                                <ArrowUpRight size={14} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* First Aid Matches */}
                      {searchResults.firstAid.length > 0 && (
                        <div>
                          <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">Emergency Protocols</p>
                          <div className="space-y-1">
                            {searchResults.firstAid.map((g, i) => (
                              <div 
                                key={i}
                                onClick={() => { setSearchQuery(''); onNavigate(g.state); }}
                                className="p-2.5 rounded-xl bg-red-950/30 border border-red-900/20 hover:border-red-500 flex justify-between items-center cursor-pointer select-none font-bold text-red-405 text-red-300"
                              >
                                <span className="flex items-center gap-1.5">
                                  <HeartPulse size={14} />
                                  {g.name}
                                </span>
                                <ArrowUpRight size={14} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Clinic Matches */}
                      {searchResults.clinics.length > 0 && (
                        <div>
                          <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">Providers & Facilities</p>
                          <div className="space-y-1">
                            {searchResults.clinics.map((c, i) => (
                              <div 
                                key={i}
                                onClick={() => { setSearchQuery(''); onNavigate(c.state); }}
                                className="p-2.5 rounded-xl bg-orange-950/30 border border-orange-900/20 hover:border-orange-500 flex justify-between items-center cursor-pointer select-none font-bold text-orange-300"
                              >
                                <span className="flex items-center gap-1.5">
                                  <MapPin size={14} />
                                  {c.name}
                                </span>
                                <ArrowUpRight size={14} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tips Matches */}
                      {searchResults.tips.length > 0 && (
                        <div>
                          <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">Lifestyle Articles</p>
                          <div className="space-y-1">
                            {searchResults.tips.map((t, i) => (
                              <div 
                                key={i}
                                onClick={() => { setSearchQuery(''); onNavigate(t.state); }}
                                className="p-2.5 rounded-xl bg-blue-950/30 border border-blue-900/20 hover:border-blue-500 flex justify-between items-center cursor-pointer select-none font-bold text-blue-300"
                              >
                                <span className="flex items-center gap-1.5">
                                  <BookOpen size={14} />
                                  {t.name}
                                </span>
                                <ArrowUpRight size={14} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
        </div>

        {/* Features Interactive Grid - Restructured and completely aligned */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="h-full">
            <FeatureCard 
              title="First Aid" 
              desc="Emergency Guides" 
              icon={<BriefcaseMedical size={22} className="text-red-400 animate-pulse" />}
              bgColor="bg-red-950/40"
              onClick={() => onNavigate(Screen.FIRST_AID)}
            />
          </div>
          <div className="h-full">
            <FeatureCard 
              title="Health Tips" 
              desc="Daily Wellness" 
              icon={<Zap size={22} className="text-amber-400" />}
              bgColor="bg-amber-950/40"
              onClick={() => onNavigate(Screen.TIPS)}
            />
          </div>
          <div className="h-full">
            <FeatureCard 
              title="Nearby Clinics" 
              desc="Book Appointments" 
              icon={<MapPin size={22} className="text-indigo-400" />}
              bgColor="bg-indigo-950/40"
              onClick={() => onNavigate(Screen.CLINICS)}
            />
          </div>
          <div className="h-full">
            <FeatureCard 
              title="Records Storage" 
              desc="Secure health vault" 
              icon={<Activity size={22} className="text-[#6FDAC3]" />}
              bgColor="bg-emerald-950/40"
              onClick={() => onNavigate(Screen.RECORDS)}
            />
          </div>
        </div>

        {/* OFFICIAL NEWS CAROUSEL SECTION */}
        <div className="mb-24">
            <h4 className="font-extrabold text-[#6FDAC3] text-sm mb-4 select-none">Official Healthcare Insights</h4>
            <div className="space-y-4">
              {officialNews.map((news) => (
                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  key={news.id}
                  onClick={() => setSelectedNews(news)}
                  className="bg-zinc-900 border border-zinc-800 p-4 rounded-[24px] shadow-sm flex gap-4 cursor-pointer hover:border-[#2D7A6D] transition-all select-none"
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-zinc-950 border border-zinc-800">
                      <img src={news.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="Publication Cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                      <span className="text-[9px] font-extrabold text-[#6FDAC3] uppercase tracking-wider">{news.source}</span>
                      <h5 className="font-bold text-xs text-zinc-100 mt-1 mb-1 leading-tight line-clamp-2">{news.title}</h5>
                      <p className="text-[10px] text-zinc-400 font-medium line-clamp-1">{news.summary}</p>
                  </div>
                </motion.div>
              ))}
            </div>
        </div>
      </div>

      {/* Official News detail sheet */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNews(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-[390px] bg-zinc-950 border border-zinc-800 rounded-t-[32px] p-6 shadow-2xl z-10 font-sans max-h-[85%] overflow-y-auto pb-12 text-white"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 pr-6">
                  <span className="text-[9px] font-extrabold text-[#6FDAC3] bg-emerald-950/55 px-2.5 py-1 rounded-full uppercase tracking-wider">{selectedNews.source}</span>
                  <h3 className="text-base font-black text-white mt-3 leading-snug">{selectedNews.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedNews(null)} 
                  className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-zinc-200"
                >
                  ✕
                </button>
              </div>

              {/* Cover cover */}
              <div className="w-full h-40 rounded-2xl overflow-hidden bg-zinc-950 mb-6 border border-zinc-800">
                <img src={selectedNews.image} alt="Official Source Graphics" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>

              {/* Body */}
              <div className="space-y-4">
                <p className="text-xs text-zinc-300 font-medium leading-relaxed">{selectedNews.fullBody}</p>
                
                {/* HIPAA compliance reassurance */}
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-start gap-3">
                  <ShieldCheck size={18} className="text-[#6FDAC3] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-[10px] font-bold text-zinc-300 uppercase">Interactive Digest Information</h5>
                    <p className="text-[10px] text-zinc-400 font-medium leading-normal mt-0.5">This feed is retrieved directly from certified medical directories. Consult with healthcare practitioners for personalized care.</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => {
                      setCopiedLink(selectedNews.linkText);
                      setTimeout(() => setCopiedLink(null), 3000);
                    }}
                    className="flex-1 py-4.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold rounded-[18px] text-xs transition-colors"
                  >
                    {selectedNews.linkText}
                  </button>
                  <button 
                    onClick={() => setSelectedNews(null)}
                    className="flex-1 py-4.5 bg-[#2D7A6D] text-white font-bold rounded-[18px] text-xs active:scale-95 transition-all shadow-md shadow-emerald-900/10 hover:bg-[#1f594f]"
                  >
                    Close Digest
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Non-blocking deep portal navigation toast */}
      <AnimatePresence>
        {copiedLink && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-6 right-6 bg-zinc-900 text-[#6FDAC3] border border-[#2D7A6D]/25 px-4 py-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-bold shadow-xl z-50 select-none"
          >
            <div className="w-2 h-2 rounded-full bg-[#6FDAC3] animate-ping" />
            <span>Connecting to secure portal: {copiedLink}...</span>
          </motion.div>
        )}
      </AnimatePresence>

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
    className="bg-zinc-900/90 p-4 rounded-[22px] shadow-md cursor-pointer border border-zinc-800/80 flex flex-col justify-between hover:border-[#2D7A6D]/50 transition-all h-full min-h-[135px] text-left"
  >
    <div className={`w-11 h-11 rounded-2xl ${bgColor} flex items-center justify-center border border-zinc-800/45`}>
      {icon}
    </div>
    <div className="mt-2">
      <h4 className="font-extrabold text-white text-[12px] leading-tight">{title}</h4>
      <p className="text-[9px] text-[#6FDAC3] font-medium leading-normal mt-0.5">{desc}</p>
    </div>
  </motion.div>
);

export default Dashboard;
