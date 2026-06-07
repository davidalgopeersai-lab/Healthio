
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronLeft, MoreVertical, Loader2, Sparkles, Activity } from 'lucide-react';
import { Screen, Message, DiagnosisData } from '../types';
import { getChatResponse, getStructuredAdvice } from '../services/gemini';

interface ChatScreenProps {
  onNavigate: (screen: Screen) => void;
  onAdviceReady: (data: DiagnosisData) => void;
  prePopulatedSymptom?: string;
  clearPrePopulatedSymptom?: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onNavigate, onAdviceReady, prePopulatedSymptom, clearPrePopulatedSymptom }) => {
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

  // Auto-trigger search query from search bar
  useEffect(() => {
    if (prePopulatedSymptom && prePopulatedSymptom.trim() && !isLoading) {
      const triggerSymptom = async () => {
        const userMsg: Message = {
          id: Date.now().toString(),
          role: 'user',
          text: prePopulatedSymptom,
          timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        if (clearPrePopulatedSymptom) {
          clearPrePopulatedSymptom();
        }

        try {
          const history = [
            {
              role: 'model' as const,
              parts: [{ text: "Hello! I'm Héalthio AI. How are you feeling today? Please describe your symptoms and I'll help you understand them." }]
            }
          ];

          const aiText = await getChatResponse(history, prePopulatedSymptom);
          
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

      triggerSymptom();
    }
  }, [prePopulatedSymptom]);


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
    <div className="w-full h-full bg-black flex flex-col relative text-white">
      {/* Header */}
      <div className="bg-zinc-950 px-6 pt-12 pb-4 flex items-center justify-between border-b border-zinc-900 shadow-md z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate(Screen.DASHBOARD)} className="text-zinc-400 hover:text-white active:scale-90 transition-transform">
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden relative border border-zinc-850">
              <Sparkles size={20} className="text-[#6FDAC3]" />
              {isLoading && <div className="absolute inset-0 bg-emerald-500/20 ai-pulse" />}
            </div>
            <div>
              <h3 className="font-bold text-zinc-100 text-sm">Héalthio AI</h3>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6FDAC3]" />
                <span className="text-[10px] text-zinc-500 font-medium">Always here</span>
              </div>
            </div>
          </div>
        </div>
        <button className="text-zinc-500 hover:text-zinc-300">
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
              <div className={`max-w-[80%] p-4 rounded-[22px] text-[13px] leading-relaxed shadow-md ${
                msg.role === 'user' 
                  ? 'bg-[#2D7A6D] text-white rounded-tr-none shadow-emerald-950/15' 
                  : 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-850 shadow-sm'
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
              <div className="bg-zinc-900 p-4 rounded-[22px] rounded-tl-none border border-zinc-850 shadow-md flex items-center gap-3">
                <Loader2 size={16} className="animate-spin text-[#2D7A6D]" />
                <span className="text-[11px] text-zinc-400 font-medium font-sans">Héalthio is thinking...</span>
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
                className="w-full bg-[#2D7A6D]/10 text-[#6FDAC3] py-3.5 rounded-2xl text-xs font-bold border border-[#2D7A6D]/25 hover:bg-[#2D7A6D]/20 flex items-center justify-center gap-2 active:scale-95 transition-all mb-2 shadow-inner"
            >
                <Activity size={14} />
                Generate Health Advice Summary
            </button>
        </motion.div>
      )}

      {/* Input */}
      <div className="p-4 bg-zinc-950 border-t border-zinc-900 pb-10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your symptoms here..."
            className="w-full bg-zinc-900 text-white placeholder-zinc-500 py-4 pl-6 pr-14 rounded-full text-sm outline-none border border-zinc-800 focus:border-[#2D7A6D] transition-all shadow-inner font-sans font-medium"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`absolute right-1.5 w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md active:scale-90 ${
              input.trim() ? 'bg-[#2D7A6D] text-white hover:bg-[#1f5a4e]' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
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
