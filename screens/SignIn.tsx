
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Screen, UserProfile } from '../types';

interface SignInProps {
  onNavigate: (screen: Screen) => void;
  onSuccess: (email: string, name: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onNavigate, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);

    // Simulate login
    setTimeout(() => {
      setLoading(false);
      // Extract a default name from the email
      const nameFromEmail = email.split('@')[0];
      const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      onSuccess(email, capitalizedName || 'Kwaku Mensah');
      onNavigate(Screen.DASHBOARD);
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full bg-[#FAFBFC] flex flex-col justify-between p-8 pt-16 font-sans"
    >
      <div className="flex-1 flex flex-col justify-center">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#2D7A6D] rounded-[22px] flex items-center justify-center shadow-lg shadow-emerald-950/20 mb-4 text-white">
            <Activity size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[#1F2933]">Welcome back</h2>
          <p className="text-sm text-[#6B7280] mt-1">Sign in to your health companion</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-[16px] py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#2D7A6D]/40 shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-[16px] py-3.5 pl-12 pr-12 text-sm focus:outline-none focus:border-[#2D7A6D]/40 shadow-sm"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-medium ml-1">{error}</p>
          )}

          {/* Forgot Password */}
          <div className="text-right">
            <button type="button" className="text-xs font-semibold text-[#2D7A6D] hover:underline">
              Forgot Password?
            </button>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#2D7A6D] text-white py-4 rounded-[18px] font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-emerald-950/10 mt-6"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
              </span>
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-[#6B7280]">
            Don't have an account?{' '}
            <button 
              onClick={() => onNavigate(Screen.SIGN_UP)} 
              className="font-bold text-[#2D7A6D] hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>

      <div className="text-center">
        <button 
          onClick={() => onNavigate(Screen.DASHBOARD)} 
          className="text-xs font-bold text-gray-400 hover:text-gray-500 py-2"
        >
          Skip / Continue as Guest
        </button>
      </div>
    </motion.div>
  );
};

export default SignIn;
