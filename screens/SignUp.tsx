
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Screen } from '../types';

interface SignUpProps {
  onNavigate: (screen: Screen) => void;
  onSuccess: (email: string, name: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onNavigate, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    setLoading(true);

    // Simulate signup
    setTimeout(() => {
      setLoading(false);
      onSuccess(email, name);
      onNavigate(Screen.DASHBOARD);
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full bg-[#FAFBFC] flex flex-col justify-between p-8 pt-12 font-sans overflow-y-auto"
    >
      <div className="flex-1 flex flex-col justify-center">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-[#2D7A6D] rounded-[20px] flex items-center justify-center shadow-lg shadow-emerald-950/20 mb-3 text-white">
            <Activity size={28} />
          </div>
          <h2 className="text-xl font-bold text-[#1F2933]">Create Account</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Start your path to better wellness</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text"
                placeholder="Kwaku Mensah"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-[14px] py-3 pl-11 pr-4 text-xs focus:outline-none focus:border-[#2D7A6D]/40 shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-[14px] py-3 pl-11 pr-4 text-xs focus:outline-none focus:border-[#2D7A6D]/40 shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-[14px] py-3 pl-11 pr-11 text-xs focus:outline-none focus:border-[#2D7A6D]/40 shadow-sm"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-[11px] text-red-500 font-medium ml-1">{error}</p>
          )}

          {/* Terms info */}
          <p className="text-[10px] text-gray-400 leading-relaxed px-1">
            By signing up, you agree to Héalthio's <span className="text-[#2D7A6D] font-bold">Terms of Service</span> and <span className="text-[#2D7A6D] font-bold">Privacy Policy</span> incorporating HIPAA standards.
          </p>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#2D7A6D] text-white py-3.5 rounded-[16px] font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-emerald-950/10 mt-4"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
              </span>
            ) : (
              <>
                Create Account
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-[#6B7280]">
            Already have an account?{' '}
            <button 
              onClick={() => onNavigate(Screen.SIGN_IN)} 
              className="font-bold text-[#2D7A6D] hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      <div className="text-center mt-4">
        <button 
          onClick={() => onNavigate(Screen.DASHBOARD)} 
          className="text-xs font-bold text-gray-400 hover:text-gray-500 py-1"
        >
          Skip / Continue as Guest
        </button>
      </div>
    </motion.div>
  );
};

export default SignUp;
