
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronLeft, MoreVertical, Loader2, Sparkles, Activity } from 'lucide-react';
import { Screen, Message, DiagnosisData } from '../types';
import { getChatResponse, getStructuredAdvice } from '../services/gemini';

interface ChatScreenProps {
  onNavigate: (screen: Screen) => void;
  onAdviceReady: (data: DiagnosisData) => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onNavigate, onAdviceReady }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      text: "Hello! I'm Héalthio AI. How are you feeling today? Please describe your symptoms and I'll help you understand them.",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'ai' ? 'model' as const : 'user' as const,
        parts: [{ text: m.text }]
      }));

      const aiText = await getChatResponse(history, input);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: aiText || "I'm sorry, I couldn't process that. Could you try again?",
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const finishSession = async () => {
    setIsLoading(true);
    try {
        const symptomsText = messages.filter(m => m.role === 'user').map(m => m.text).join(' ');
        const structured = await getStructuredAdvice(symptomsText);
        onAdviceReady(structured);
    } catch (err) {
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-[#FAFBFC] flex flex-col relative">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 flex items-center justify-between border-b border-gray-100 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate(Screen.DASHBOARD)} className="text-gray-400 active:scale-90 transition-transform">
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center overflow-hidden relative">
              <Sparkles size={20} className="text-[#2D7A6D]" />
              {isLoading && <div className="absolute inset-0 bg-emerald-400/20 ai-pulse" />}
            </div>
            <div>
              <h3 className="font-bold text-[#1F2933] text-sm">Héalthio AI</h3>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6FDAC3]" />
                <span className="text-[10px] text-gray-400 font-medium">Always here</span>
              </div>
            </div>
          </div>
        </div>
        <button className="text-gray-400">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-[22px] text-[13px] leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-[#2D7A6D] text-white rounded-tr-none shadow-emerald-900/10' 
                  : 'bg-white text-[#1F2933] rounded-tl-none border border-gray-50'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white p-4 rounded-[22px] rounded-tl-none border border-gray-50 shadow-sm flex items-center gap-3">
                <Loader2 size={16} className="animate-spin text-[#2D7A6D]" />
                <span className="text-[11px] text-gray-400 font-medium">Héalthio is thinking...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Summary Prompt */}
      {messages.length > 2 && !isLoading && (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 mb-2"
        >
            <button 
                onClick={finishSession}
                className="w-full bg-[#2D7A6D]/5 text-[#2D7A6D] py-3 rounded-2xl text-xs font-bold border border-[#2D7A6D]/10 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
                <Activity size={14} />
                Generate Health Advice Summary
            </button>
        </motion.div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-50 pb-10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your symptoms here..."
            className="w-full bg-[#FAFBFC] py-4 pl-6 pr-14 rounded-full text-sm outline-none border border-transparent focus:border-[#2D7A6D]/20 transition-all shadow-inner"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`absolute right-1.5 w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md active:scale-90 ${
              input.trim() ? 'bg-[#2D7A6D] text-white' : 'bg-gray-100 text-gray-400'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
