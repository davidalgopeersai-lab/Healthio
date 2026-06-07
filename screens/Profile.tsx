
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Globe, Bell, Shield, LogOut, ChevronRight, Edit3, Award, Star, Mail, Phone, Heart, Check, Trash2, ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import { Screen, UserProfile } from '../types';

interface ProfileProps {
  onNavigate: (screen: Screen) => void;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate, userProfile, setUserProfile, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Profile fields local states with robust state fallback
  const [editName, setEditName] = useState(userProfile.name);
  const [editEmail, setEditEmail] = useState(userProfile.email);
  const [editAge, setEditAge] = useState<number | ''>(userProfile.age || '');
  const [editWeight, setEditWeight] = useState(userProfile.weight);
  const [editBloodType, setEditBloodType] = useState(userProfile.bloodType);
  const [editAllergies, setEditAllergies] = useState(userProfile.allergies);
  const [editPhone, setEditPhone] = useState(userProfile.phone);

  // New stats input form states to give users control to customize these fields
  const [editChecksCount, setEditChecksCount] = useState<number | ''>(userProfile.checksCount || '');
  const [editScore, setEditScore] = useState(userProfile.score);
  const [editBadgesCount, setEditBadgesCount] = useState<number | ''>(userProfile.badgesCount || '');
  const [editIsPremium, setEditIsPremium] = useState(userProfile.isPremium);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;

    setUserProfile(prev => ({
      ...prev,
      name: editName,
      email: editEmail,
      age: editAge === '' ? 0 : Number(editAge),
      weight: editWeight,
      bloodType: editBloodType,
      allergies: editAllergies,
      phone: editPhone,
      isPremium: editIsPremium,
      checksCount: editChecksCount === '' ? 0 : Number(editChecksCount),
      score: editScore || "0%",
      badgesCount: editBadgesCount === '' ? 0 : Number(editBadgesCount)
    }));

    setIsEditing(false);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 2500);
  };

  return (
    <div className="w-full h-full bg-black flex flex-col relative overflow-hidden font-sans text-white">
      <AnimatePresence mode="wait">
        {!isEditing ? (
          <motion.div 
            key="view-profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-y-auto"
          >
            {/* Profile Header */}
            <div className="bg-zinc-950 border-b border-zinc-900 h-64 pt-12 px-6 relative flex flex-col justify-between pb-12">
              <div className="flex justify-between items-center text-white">
                <h2 className="text-lg font-bold">Health Profile</h2>
                <button 
                  onClick={() => {
                    // Populate edit state with current values
                    setEditName(userProfile.name);
                    setEditEmail(userProfile.email);
                    setEditAge(userProfile.age || '');
                    setEditWeight(userProfile.weight);
                    setEditBloodType(userProfile.bloodType);
                    setEditAllergies(userProfile.allergies);
                    setEditPhone(userProfile.phone);
                    setEditChecksCount(userProfile.checksCount || '');
                    setEditScore(userProfile.score);
                    setEditBadgesCount(userProfile.badgesCount || '');
                    setEditIsPremium(userProfile.isPremium);
                    setIsEditing(true);
                  }}
                  className="w-11 h-11 bg-zinc-900 hover:bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-800 active:scale-95 transition-transform"
                >
                  <Edit3 size={18} className="text-[#6FDAC3]" />
                </button>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-zinc-800 overflow-hidden shadow-2xl bg-zinc-900 flex items-center justify-center">
                    <img 
                      src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${userProfile.name || 'default'}`} 
                      className="w-full h-full object-cover" 
                      alt="Profile" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#6FDAC3] rounded-full border border-zinc-950 flex items-center justify-center">
                    <Award size={10} className="text-black" />
                  </div>
                </div>
                <h3 className="text-zinc-100 font-bold text-base mt-2">{userProfile.name || "Default Account"}</h3>
                <p className="text-zinc-400 text-[11px] font-semibold">Age: {userProfile.age || 0} • {userProfile.isPremium ? "Premium Member" : "Standard Account"}</p>
              </div>
              
              {/* Stats Overlay Card */}
              <div className="absolute -bottom-10 left-6 right-6 bg-zinc-900 border border-zinc-800 rounded-[24px] shadow-2xl p-4 flex justify-around z-10 select-none">
                  <StatItem icon={<Star className="text-amber-400" />} val={String(userProfile.checksCount)} label="Checks" />
                  <div className="w-[1px] bg-zinc-800 h-8 self-center" />
                  <StatItem icon={<Shield className="text-[#6FDAC3]" />} val={userProfile.score} label="Score" />
                  <div className="w-[1px] bg-zinc-800 h-8 self-center" />
                  <StatItem icon={<Award className="text-[#6FDAC3]" />} val={String(userProfile.badgesCount)} label="Badges" />
              </div>
            </div>

            {/* Profile Fields List */}
            <div className="mt-14 px-6 flex-1 overflow-y-auto pb-24 space-y-4">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 ml-1">Clinical Identifiers</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <VitalBadge icon={<Heart size={14} className="text-red-400 fill-current" />} label="Blood Group" val={userProfile.bloodType} />
                <VitalBadge icon={<Heart size={14} className="text-emerald-400 fill-current" />} label="Body Weight" val={userProfile.weight} />
              </div>

              {userProfile.allergies && (
                <div className="bg-amber-950/20 border border-amber-900/30 rounded-2xl p-4 flex flex-col justify-center">
                  <span className="text-[9px] font-bold text-amber-400 uppercase leading-none mb-1.5 flex items-center gap-1.5">
                    ⚠️ Allergy Warning List
                  </span>
                  <span className="text-xs font-bold text-amber-200">{userProfile.allergies}</span>
                </div>
              )}

              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] pt-2 mb-4 ml-1">Personal & Contact Bio</h4>
              <div className="space-y-3">
                <div className="bg-zinc-900 p-4 rounded-[22px] border border-zinc-800 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-950 text-[#6FDAC3] flex items-center justify-center border border-zinc-850">
                      <Mail size={16} className="text-[#6FDAC3]" />
                    </div>
                    <div>
                      <h5 className="font-bold text-zinc-500 text-[10px] uppercase leading-none mb-1.5">Email Connection</h5>
                      <p className="text-xs font-semibold text-zinc-200">{userProfile.email || "Not specified"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900 p-4 rounded-[22px] border border-zinc-800 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-950 text-[#6FDAC3] flex items-center justify-center border border-zinc-850">
                      <Phone size={16} className="text-[#6FDAC3]" />
                    </div>
                    <div>
                      <h5 className="font-bold text-zinc-500 text-[10px] uppercase leading-none mb-1.5">Phone Number</h5>
                      <p className="text-xs font-semibold text-zinc-200">{userProfile.phone || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] pt-2 mb-4 ml-1">Account & Settings</h4>
              <div className="space-y-3">
                <SettingItem icon={<Globe size={20} />} label="Language" value="English (US)" />
                <SettingItem icon={<Bell size={20} />} label="Notifications" value="Personalized alerts" />
                <SettingItem icon={<Shield size={20} />} label="Data Compliance" value="HIPAA Standard Encryption" />
                
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-5 p-4 rounded-[24px] text-red-400 hover:bg-rose-950/20 hover:border-red-950/25 transition-all mt-6 active:scale-98 border border-transparent cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-2xl bg-red-950/30 flex items-center justify-center border border-red-900/20">
                    <LogOut size={20} />
                  </div>
                  <span className="font-bold text-sm">Secure Logout</span>
                </button>
              </div>

              <div className="mt-10 mb-8 text-center select-none opacity-40">
                  <p className="text-[10px] text-zinc-550 font-bold">Héalthio App Version 2.5.0 (Build 512)</p>
                  <p className="text-[8px] text-zinc-550 mt-0.5">Device Synchronized via SSL</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="edit-profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-y-auto px-6 pt-12 pb-24"
          >
            {/* Edit Header */}
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={() => setIsEditing(false)}
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white active:scale-95"
              >
                <ArrowLeft size={18} />
              </button>
              <h3 className="font-bold text-white">Edit Bio Card</h3>
              <div className="w-10 h-10" />
            </div>

            {/* Profile Avatar Seed indicator */}
            <div className="flex flex-col items-center mb-6 bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-3xl">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-900 border border-zinc-800 shadow-sm mb-2">
                <img 
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${editName || 'default'}`} 
                  className="w-full h-full object-cover" 
                  alt="Dynamic seed" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[9px] text-[#6FDAC3] font-bold uppercase">Dynamic avatar sync prefix</p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-[14px] p-3 text-xs focus:outline-none focus:border-[#2D7A6D] text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">Email Connection</label>
                <input 
                  type="email" 
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-[14px] p-3 text-xs focus:outline-none focus:border-[#2D7A6D] text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">Age (Years)</label>
                  <input 
                    type="number" 
                    required
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-[14px] p-3 text-xs focus:outline-none focus:border-[#2D7A6D] text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">Body Weight</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 70 kg"
                    value={editWeight}
                    onChange={(e) => setEditWeight(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-[14px] p-3 text-xs focus:outline-none focus:border-[#2D7A6D] text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">Blood Type</label>
                  <select
                    value={editBloodType}
                    onChange={(e) => setEditBloodType(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-[14px] p-3 text-xs focus:outline-none focus:border-[#2D7A6D] text-white"
                  >
                    <option value="">Choose blood type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">Phone Number</label>
                  <input 
                    type="text" 
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-[14px] p-3 text-xs focus:outline-none focus:border-[#2D7A6D] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">Allergies (Peanuts, Pollen, etc)</label>
                <input 
                  type="text" 
                  placeholder="None"
                  value={editAllergies}
                  onChange={(e) => setEditAllergies(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-[14px] p-3 text-xs focus:outline-none focus:border-[#2D7A6D] text-white"
                />
              </div>

              {/* USER ACCESSIBLE DYNAMIC HEALTH CHECKS AND BADGES CONTROLS */}
              <div className="bg-zinc-900/60 p-4 rounded-3xl border border-zinc-850 space-y-4">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block ml-0.5 mb-1 text-emerald-450 text-[#6FDAC3]">Private Vitals & Badges Settings</span>
                
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">Checks Count</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 5"
                      value={editChecksCount}
                      onChange={(e) => setEditChecksCount(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-[10px] p-2 text-xs focus:outline-none focus:border-[#2D7A6D] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">Score %</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 94%"
                      value={editScore}
                      onChange={(e) => setEditScore(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-[10px] p-2 text-xs focus:outline-none focus:border-[#2D7A6D] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">Badges Count</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 3"
                      value={editBadgesCount}
                      onChange={(e) => setEditBadgesCount(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-[10px] p-2 text-xs focus:outline-none focus:border-[#2D7A6D] text-white"
                    />
                  </div>
                </div>
              </div>

              {/* PREMIUM STATUS TOGGLE FOR BETTER SIMULATION */}
              <div className="bg-zinc-900/60 p-4 rounded-3xl border border-zinc-850 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-zinc-200 block">Premium Companion Access</span>
                  <p className="text-[10px] text-zinc-500 font-medium leading-none mt-1">Unlocks extra indicators across workspace</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditIsPremium(!editIsPremium)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none border border-zinc-800 ${
                    editIsPremium ? 'bg-[#2D7A6D]' : 'bg-zinc-950'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      editIsPremium ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-4 bg-zinc-900 border border-zinc-800 rounded-[18px] font-bold text-zinc-400 text-xs active:scale-95 transition-transform"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-[#2D7A6D] hover:bg-[#1f584e] rounded-[18px] font-bold text-white text-xs active:scale-95 transition-transform shadow-lg shadow-emerald-950/15"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Saved Toast alert */}
      <AnimatePresence>
        {showSavedToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-20 left-6 right-6 bg-emerald-600 text-white px-4 py-3 rounded-2xl flex items-center gap-3 text-xs font-bold shadow-lg shadow-emerald-950/20 border border-emerald-500/30 z-50 select-none"
          >
            <Check className="text-white" size={16} />
            <span>Health credentials updated live!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation activeScreen={Screen.PROFILE} onNavigate={onNavigate} />
    </div>
  );
};

const StatItem = ({ icon, val, label }: { icon: React.ReactNode, val: string, label: string }) => (
    <div className="flex flex-col items-center select-none font-sans">
        <div className="mb-1">{icon}</div>
        <span className="text-xs font-black text-zinc-100">{val || "0"}</span>
        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">{label}</span>
    </div>
);

const VitalBadge = ({ icon, label, val }: { icon: React.ReactNode, label: string, val: string }) => (
  <div className="bg-zinc-900 p-3.5 rounded-2xl shadow-md border border-zinc-800 flex items-center gap-3 font-sans w-full">
    <div className="w-8 h-8 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-850">
      {icon}
    </div>
    <div>
      <p className="text-[9px] text-zinc-500 font-bold leading-none mb-1">{label}</p>
      <p className="text-xs font-extrabold text-zinc-200">{val || "Not specified"}</p>
    </div>
  </div>
);

const SettingItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) => (
  <motion.div 
    whileTap={{ scale: 0.98 }}
    className="bg-zinc-900 p-4 rounded-[22px] flex items-center justify-between shadow-md border border-zinc-800 cursor-pointer hover:border-[#2D7A6D]/45 transition-all font-sans"
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-zinc-950 text-[#2D7A6D] flex items-center justify-center border border-zinc-850">
        {icon}
      </div>
      <div>
        <h5 className="font-bold text-zinc-200 text-xs">{label}</h5>
        {value && <p className="text-[10px] text-zinc-500 font-semibold">{value}</p>}
      </div>
    </div>
    <ChevronRight size={16} className="text-zinc-650" />
  </motion.div>
);

export default Profile;
