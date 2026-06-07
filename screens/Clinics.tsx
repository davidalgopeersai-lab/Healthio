
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Search, MapPin, Phone, Clock, Star, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import Navigation from '../components/Navigation';
import { Screen } from '../types';

interface ClinicsProps {
  onNavigate: (screen: Screen) => void;
}

interface Clinic {
  id: string;
  name: string;
  distance: string;
  address: string;
  rating: number;
  reviews: number;
  phone: string;
  hours: string;
  isOpen: boolean;
  specialties: string[];
}

const mockClinics: Clinic[] = [
  {
    id: '1',
    name: 'East Legon Health Center',
    distance: '0.8 km',
    address: '14 Anumsa Street, East Legon, Accra',
    rating: 4.8,
    reviews: 124,
    phone: '+233 30 212 3456',
    hours: 'Open 24/7',
    isOpen: true,
    specialties: ['General Medicine', 'Pediatrics', 'Emergency Care']
  },
  {
    id: '2',
    name: 'St. Luke Family Clinic',
    distance: '1.5 km',
    address: 'Ring Road Central, Kanda, Accra',
    rating: 4.6,
    reviews: 89,
    phone: '+233 30 298 7654',
    hours: '8:00 AM - 9:00 PM',
    isOpen: true,
    specialties: ['Dentistry', 'Family Practice', 'Cardiology']
  },
  {
    id: '3',
    name: 'Apex Specialist Hospital',
    distance: '2.1 km',
    address: 'Spintex Road, Batsonaa, Accra',
    rating: 4.9,
    reviews: 210,
    phone: '+233 30 245 6123',
    hours: 'Open 24/7',
    isOpen: true,
    specialties: ['Cardiology', 'Obstetrics', 'Gynacology', 'Surgery']
  },
  {
    id: '4',
    name: 'Nyaho Medical Centre',
    distance: '3.4 km',
    address: '35 Kofi Annan Ave, Airport Residential Area',
    rating: 4.7,
    reviews: 315,
    phone: '+233 30 273 7300',
    hours: 'Open 24/7',
    isOpen: true,
    specialties: ['General Medicine', 'Diagnostics', 'Pharmacy']
  },
  {
    id: '5',
    name: 'Airport Women & Children Clinic',
    distance: '4.0 km',
    address: 'Liberation Road, Airport, Accra',
    rating: 4.5,
    reviews: 74,
    phone: '+233 30 272 1999',
    hours: '9:00 AM - 6:00 PM',
    isOpen: false,
    specialties: ['Pediatrics', 'Obstetrics', 'Vaccinations']
  }
];

const Clinics: React.FC<ClinicsProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  const filteredClinics = useMemo(() => {
    if (!searchQuery) return mockClinics;
    return mockClinics.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) return;
    
    setShowBookingSuccess(true);
    setTimeout(() => {
      setShowBookingSuccess(false);
      setSelectedClinic(null);
      setBookingDate('');
      setBookingTime('');
    }, 2800);
  };

  return (
    <div className="w-full h-full bg-black flex flex-col relative overflow-hidden font-sans text-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between bg-zinc-950 border-b border-zinc-900 z-10 shadow-md">
        <button 
          onClick={() => onNavigate(Screen.DASHBOARD)} 
          className="w-11 h-11 rounded-full bg-zinc-900 flex items-center justify-center shadow-md text-zinc-300 border border-zinc-800 active:scale-95 transition-transform"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-white">Nearby Clinics</h2>
        <div className="w-11 h-11" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 pt-4">
        {/* Visual Map Simulator */}
        <div className="relative w-full h-44 rounded-[28px] overflow-hidden bg-zinc-900/40 border border-zinc-850 shadow-inner mb-6 flex flex-col justify-end p-4">
          {/* Abstract Vector Grid Drawing as Maps Representation */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#6FDAC3" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Roads mock line */}
              <path d="M -10 50 Q 150 120 390 40" fill="none" stroke="#2D7A6D" strokeWidth="4" />
              <path d="M 120 -10 Q 80 100 220 200" fill="none" stroke="#2D7A6D" strokeWidth="3" />
            </svg>
          </div>

          {/* Markers */}
          <div className="absolute top-1/3 left-1/4 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#2D7A6D] text-white flex items-center justify-center shadow-lg animate-pulse">
              <MapPin size={16} />
            </div>
            <span className="bg-zinc-950 text-[9px] font-bold text-zinc-100 px-1.5 py-0.5 rounded-full mt-1 shadow-md border border-zinc-800">You</span>
          </div>

          <div className="absolute top-1/4 right-[25%] flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
              <MapPin size={12} />
            </div>
            <span className="bg-zinc-900 text-[8px] font-bold text-zinc-300 px-1.5 py-0.5 rounded-full mt-1 shadow-md border border-zinc-800">East Legon Clin</span>
          </div>

          <div className="absolute bottom-1/4 left-1/2 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
              <MapPin size={12} />
            </div>
            <span className="bg-zinc-900 text-[8px] font-bold text-zinc-300 px-1.5 py-0.5 rounded-full mt-1 shadow-md border border-zinc-800 font-sans">St. Luke Clinic</span>
          </div>

          {/* Map Compass HUD */}
          <div className="relative z-10 bg-zinc-950/90 backdrop-blur-md px-4 py-3 rounded-full border border-zinc-800 shadow-md flex items-center justify-between text-xs font-semibold text-[#6FDAC3]">
            <span className="flex items-center gap-2 text-zinc-200">
              <Compass size={16} className="animate-spin text-[#6FDAC3] [animation-duration:15s]" />
              Showing 5 wellness clinics within 5km
            </span>
            <span className="text-[10px] bg-emerald-950/60 border border-emerald-900/30 text-[#6FDAC3] px-2.5 py-0.5 rounded-full font-bold">GPS Live</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, specialty, or address..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-[16px] py-3.5 pl-12 pr-4 text-xs focus:outline-none focus:border-[#2D7A6D] text-white placeholder-zinc-500 shadow-inner"
          />
        </div>

        {/* Clinic List */}
        <div className="space-y-4">
          <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2">Available clinics</h3>
          {filteredClinics.map((clinic) => (
            <motion.div
              layout
              key={clinic.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedClinic(clinic)}
              className="bg-zinc-900 p-5 rounded-[24px] border border-zinc-800 shadow-md flex flex-col gap-3 cursor-pointer hover:border-[#2D7A6D]/60 transition-all text-white"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-bold text-zinc-100 text-sm">{clinic.name}</h4>
                  <p className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5 font-medium">
                    <MapPin size={12} className="text-zinc-500" />
                    {clinic.distance} • {clinic.address}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold">{clinic.rating}</span>
                  </div>
                  <span className="text-[9px] text-zinc-500 font-bold uppercase">{clinic.reviews} reviews</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1.5">
                {clinic.specialties.map((spec, i) => (
                  <span key={i} className="text-[9px] font-bold text-[#6FDAC3] bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-900/30">
                    {spec}
                  </span>
                ))}
              </div>

              {/* Footer row */}
              <div className="flex justify-between items-center border-t border-zinc-850 pt-3 mt-1 text-[11px] font-bold text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} className="text-zinc-500" />
                  {clinic.hours}
                </span>
                <span className={clinic.isOpen ? "text-[#6FDAC3]" : "text-amber-500"}>
                  • {clinic.isOpen ? "Open Now" : "Closed"}
                </span>
              </div>
            </motion.div>
          ))}

          {filteredClinics.length === 0 && (
            <div className="py-12 text-center text-zinc-500 text-xs font-medium">
              No medical clinics match your search query.
            </div>
          )}
        </div>
      </div>

      {/* Clinic Details / Booking Modal */}
      <AnimatePresence>
        {selectedClinic && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!showBookingSuccess) setSelectedClinic(null); }}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-[390px] bg-zinc-950 border border-zinc-850 rounded-t-[32px] p-6 shadow-2xl z-10 max-h-[90%] overflow-y-auto pb-12 text-white font-sans"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2.5 py-1 rounded-full uppercase tracking-wider">{selectedClinic.distance} Away</span>
                  <h3 className="text-lg font-bold text-white mt-3 leading-snug">{selectedClinic.name}</h3>
                  <p className="text-xs text-zinc-400 font-medium leading-relaxed mt-1 flex items-start gap-1">
                    <MapPin size={14} className="mt-0.5 text-zinc-500 flex-shrink-0" />
                    {selectedClinic.address}
                  </p>
                </div>
                <button 
                  disabled={showBookingSuccess}
                  onClick={() => setSelectedClinic(null)} 
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-200 disabled:opacity-50"
                >
                  <ChevronLeft className="rotate-270" size={18} />
                </button>
              </div>

              {!showBookingSuccess ? (
                <>
                  {/* Rating, Reviews and Phone */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-zinc-900/80 p-3 rounded-2xl border border-zinc-800 flex flex-col justify-center">
                      <span className="text-[9px] font-bold text-zinc-550 uppercase">Provider Star Rating</span>
                      <div className="flex items-center gap-1.5 mt-1 font-bold text-xs text-zinc-200">
                        <Star size={16} fill="#F59E0B" className="text-amber-500" />
                        {selectedClinic.rating} <span className="text-[10px] text-zinc-500 font-medium">({selectedClinic.reviews} ratings)</span>
                      </div>
                    </div>
                    <div className="bg-zinc-900/80 p-3 rounded-2xl border border-zinc-800 flex flex-col justify-center">
                      <span className="text-[9px] font-bold text-zinc-550 uppercase">Operating Hours</span>
                      <div className="flex items-center gap-1.5 mt-1 font-bold text-xs text-zinc-200">
                        <Clock size={16} className="text-[#6FDAC3]" />
                        {selectedClinic.hours}
                      </div>
                    </div>
                  </div>

                  {/* Contact Row */}
                  <div className="flex items-center justify-between p-4 bg-emerald-950/20 border border-emerald-900/35 rounded-2xl mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#2D7A6D] text-white rounded-xl flex items-center justify-center">
                        <Phone size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase">Immediate Contact</p>
                        <p className="text-xs font-bold text-zinc-200">{selectedClinic.phone}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert(`Dialing ${selectedClinic.phone}...`)}
                      className="bg-[#2D7A6D] hover:bg-[#1a554a] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-transform shadow-md"
                    >
                      Call Now
                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                  {/* Booking Fields */}
                  <form onSubmit={handleBooking} className="space-y-4">
                    <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2">Book consultation session</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">Preferred Date</label>
                        <input 
                          type="date" 
                          required
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-[14px] p-3 text-xs focus:outline-none focus:border-[#2D7A6D] text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">Preferred Time</label>
                        <input 
                          type="time" 
                          required
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-[14px] p-3 text-xs focus:outline-none focus:border-[#2D7A6D] text-white"
                        />
                      </div>
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full bg-[#2D7A6D] hover:bg-[#1f584e] text-white py-4 rounded-[18px] font-bold shadow-lg shadow-emerald-950/15 active:scale-95 transition-transform text-xs"
                    >
                      Schedule Appointment
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-800 rounded-full flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                    <ShieldCheck size={40} />
                  </div>
                  <h4 className="text-lg font-bold text-white">Appointment Confirmed!</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed px-6 mt-2">
                    Your appointment at <span className="font-bold text-emerald-400">{selectedClinic.name}</span> has been booked for <span className="font-bold text-zinc-200">{bookingDate}</span> at <span className="font-bold text-zinc-200">{bookingTime}</span>.
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-6 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full font-semibold">
                    A verification SMS and calendar invite has been sent.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Navigation activeScreen={Screen.DASHBOARD} onNavigate={onNavigate} />
    </div>
  );
};

export default Clinics;
