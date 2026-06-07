
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Plus, Calendar, FileText, User, Heart, Trash2, CheckCircle2, ShieldCheck, Activity, Award } from 'lucide-react';
import Navigation from '../components/Navigation';
import { Screen, MedicalRecord } from '../types';

interface RecordsProps {
  onNavigate: (screen: Screen) => void;
}

const initialRecords: MedicalRecord[] = [
  {
    id: '1',
    title: 'Post-Malaria Prescription',
    category: 'Prescription',
    date: '2026-05-18',
    doctor: 'Dr. Evelyn Mensah',
    notes: 'Take Artemether-Lumefantrine twice daily with meals for 3 days. Complete dosage.'
  },
  {
    id: '2',
    title: 'Routine Blood Pressure Check',
    category: 'Checkup',
    date: '2026-05-24',
    doctor: 'Nurse Eunice Gifty',
    notes: 'Blood pressure within normal limits. Baseline check.',
    paramKey: 'Blood Pressure',
    paramVal: '118/76 mmHg'
  },
  {
    id: '3',
    title: 'Yellow Fever Vaccination Certificate',
    category: 'Vaccination',
    date: '2026-04-12',
    doctor: 'Port Health Clinic',
    notes: 'Lifelong immunity booster. Verified at Airport Residential Port.'
  }
];

const Records: React.FC<RecordsProps> = ({ onNavigate }) => {
  const [records, setRecords] = useState<MedicalRecord[]>(initialRecords);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Prescription' | 'Checkup' | 'Vaccination'>('All');

  // Form States
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<'Prescription' | 'Checkup' | 'Vaccination'>('Prescription');
  const [formDoctor, setFormDoctor] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formParamKey, setFormParamKey] = useState('');
  const [formParamVal, setFormParamVal] = useState('');

  const filteredRecords = useMemo(() => {
    if (activeTab === 'All') return records;
    return records.filter(r => r.category === activeTab);
  }, [records, activeTab]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formDoctor || !formDate || !formNotes) return;

    const newRec: MedicalRecord = {
      id: Date.now().toString(),
      title: formTitle,
      category: formCategory,
      date: formDate,
      doctor: formDoctor,
      notes: formNotes,
      paramKey: formParamKey || undefined,
      paramVal: formParamVal || undefined
    };

    setRecords(prev => [newRec, ...prev]);
    setShowAddModal(false);

    // Reset Form
    setFormTitle('');
    setFormCategory('Prescription');
    setFormDoctor('');
    setFormDate('');
    setFormNotes('');
    setFormParamKey('');
    setFormParamVal('');
  };

  const handleDelete = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="w-full h-full bg-black flex flex-col relative overflow-hidden font-sans text-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between bg-zinc-950 border-b border-zinc-900 z-10 shadow-md">
        <button 
          onClick={() => onNavigate(Screen.DASHBOARD)} 
          className="w-11 h-11 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-md text-zinc-300 active:scale-95 transition-transform"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-white">Medical Vault</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="w-11 h-11 rounded-full bg-[#2D7A6D] hover:bg-[#1f584e] flex items-center justify-center shadow-lg text-white active:scale-95 transition-transform"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24 pt-4">
        {/* Biometrics Summary HUD widget */}
        <div className="bg-gradient-to-br from-[#2D7A6D] to-[#14473D] rounded-[28px] p-5 text-white mb-6 shadow-lg shadow-emerald-950/20 border border-[#2D7A6D]/20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] uppercase font-bold text-white/80 tracking-widest">Digital Health Passport</p>
              <h3 className="text-base font-bold mt-0.5">Vitals Summary</h3>
            </div>
            <Award className="text-white/30" size={32} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <VitalWidget label="SYS/DIA" value="118/76" color="text-[#6FDAC3]" />
            <VitalWidget label="HEART RATE" value="72 bpm" color="text-red-400" />
            <VitalWidget label="SPO2 LVL" value="99%" color="text-blue-400" />
          </div>
        </div>

        {/* Filter Slider tabs */}
        <div className="flex gap-2.5 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          {(['All', 'Prescription', 'Checkup', 'Vaccination'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-[#2D7A6D] text-white shadow-md shadow-emerald-950/15' 
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
              }`}
            >
              {tab === 'All' ? 'View All' : tab}
            </button>
          ))}
        </div>

        {/* Records Listing */}
        <div className="space-y-4">
          <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2">Stored Documents</h3>
          
          <AnimatePresence mode="popLayout">
            {filteredRecords.map((rec) => (
              <motion.div
                layout
                key={rec.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-900 p-5 rounded-[24px] border border-zinc-800 shadow-md flex flex-col gap-3 group relative overflow-hidden"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      rec.category === 'Prescription' ? 'bg-orange-950/45 text-orange-400 border border-orange-900/20' :
                      rec.category === 'Checkup' ? 'bg-emerald-950/45 text-[#6FDAC3] border border-emerald-900/20' :
                      'bg-blue-950/45 text-blue-400 border border-blue-900/20'
                    }`}>
                      <FileText size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-100 text-sm">{rec.title}</h4>
                      <p className="text-[10px] font-bold text-[#6FDAC3] mt-0.5 uppercase tracking-wider">{rec.category}</p>
                    </div>
                  </div>
                  
                  {/* Delete button */}
                  <button 
                    onClick={() => handleDelete(rec.id)}
                    className="p-1 text-zinc-600 hover:text-rose-500 cursor-pointer active:scale-90 transition-transform"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <p className="text-xs text-zinc-400 font-normal leading-relaxed font-sans">{rec.notes}</p>

                {rec.paramKey && rec.paramVal && (
                  <div className="bg-zinc-950 p-2.5 rounded-xl text-xs font-bold text-zinc-300 border border-zinc-850 flex justify-between items-center mt-1">
                    <span className="text-zinc-500 font-semibold">{rec.paramKey}:</span>
                    <span className="text-[#6FDAC3] font-bold">{rec.paramVal}</span>
                  </div>
                )}

                {/* Doc Details Footer */}
                <div className="border-t border-zinc-850 pt-3 flex justify-between text-[10px] font-bold text-zinc-500 mt-1">
                  <span className="flex items-center gap-1">
                    <User size={12} className="text-zinc-600" />
                    {rec.doctor}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-zinc-600" />
                    {rec.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredRecords.length === 0 && (
            <div className="py-16 text-center text-zinc-500 text-xs font-medium">
              No files archived yet in this category.
            </div>
          )}
        </div>
      </div>

      {/* Add Record Modal Popup */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-[390px] bg-zinc-950 border border-zinc-850 rounded-t-[32px] p-6 shadow-2xl z-10 max-h-[90%] overflow-y-auto pb-12 text-white font-sans"
            >
              <div className="flex justify-between items-center mb-6 border-b border-zinc-900 pb-4">
                <h3 className="text-lg font-bold text-white">Archive Medical Record</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-200 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 ml-0.5">Doc Title</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Eye Test Report / Prescription"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-[14px] p-3 text-xs focus:outline-none focus:border-[#2D7A6D] text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 ml-0.5">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-[14px] p-3 text-xs focus:outline-none focus:border-[#2D7A6D] text-white"
                    >
                      <option value="Prescription">Prescription</option>
                      <option value="Checkup">Checkup</option>
                      <option value="Vaccination">Vaccination</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 ml-0.5">Date Provided</label>
                    <input 
                      type="date" 
                      required
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-[14px] p-3 text-xs focus:outline-none focus:border-[#2D7A6D] text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 ml-0.5">Practitioner Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Dr. K. Nimako"
                    value={formDoctor}
                    onChange={(e) => setFormDoctor(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-[14px] p-3 text-xs focus:outline-none focus:border-[#2D7A6D] text-white"
                  />
                </div>

                {/* Optional biometrics tracking */}
                <div className="grid grid-cols-2 gap-3 bg-zinc-900/60 p-3 rounded-2xl border border-zinc-850">
                  <div>
                    <label className="block text-[9px] font-semibold text-zinc-500 uppercase mb-1">Metric Key (Opt)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Blood Glucose"
                      value={formParamKey}
                      onChange={(e) => setFormParamKey(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-[10px] p-2 text-[11px] text-white focus:outline-none focus:border-[#2D7A6D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-semibold text-zinc-500 uppercase mb-1">Metric Value (Opt)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 5.7 mmol/L"
                      value={formParamVal}
                      onChange={(e) => setFormParamVal(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-[10px] p-2 text-[11px] text-white focus:outline-none focus:border-[#2D7A6D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 ml-0.5">Instructions / Notes</label>
                  <textarea 
                    required 
                    rows={3}
                    placeholder="Enter dosage details, recommendations or checkup results..."
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-[14px] p-3 text-xs focus:outline-none focus:border-[#2D7A6D] text-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2D7A6D] hover:bg-[#1f584e] text-white py-4 rounded-[18px] font-bold shadow-lg shadow-emerald-950/15 active:scale-95 transition-transform text-xs"
                >
                  Save to Health Vault
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Navigation activeScreen={Screen.PROFILE} onNavigate={onNavigate} />
    </div>
  );
};

// Subcomponent Vital widget
const VitalWidget = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-2.5 flex flex-col justify-center select-none font-sans">
    <span className="text-[8px] font-bold text-zinc-400 uppercase leading-none">{label}</span>
    <span className="text-xs font-bold text-white mt-1.5 flex items-center gap-1.5">
      <Heart size={11} className={`${color} fill-current`} />
      {value}
    </span>
  </div>
);

export default Records;
