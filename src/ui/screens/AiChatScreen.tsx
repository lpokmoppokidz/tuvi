import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'motion/react';
import { Message } from '../../domain/model/types';
import { generateGeminiResponse } from '../../data/remote/gemini-api';

export const AiChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Chào bạn! Tôi là AI Tử Vi. Bạn muốn giải mã thiên cơ hay xem vận hạn hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const text = await generateGeminiResponse(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: text || "Xin lỗi, tôi không thể trả lời lúc này." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Có lỗi xảy ra khi kết nối với AI." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] p-6 pb-32 relative z-10">
      {/* Header AI Upgrade */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display text-gradient-gold tracking-widest uppercase">
          Oracle Chat
        </h2>
        <p className="text-[10px] font-display text-white/30 tracking-[0.3em] uppercase mt-1">
          Direct Cosmic Channel
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 mb-8 pr-2 scroll-smooth no-scrollbar">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: msg.role === 'model' ? -20 : 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm leading-relaxed relative overflow-hidden ${
              msg.role === 'user' 
                ? 'bg-celestial-gold/10 text-star-white rounded-tr-none shadow-[0_0_20px_rgba(212,175,55,0.05)]' 
                : 'glass-panel rounded-tl-none text-star-white/90'
            }`}>
              {msg.role === 'model' && (
                <div className="shimmer absolute inset-0 pointer-events-none opacity-10" />
              )}
              <p className="relative z-10">{msg.text}</p>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="glass-panel p-4 rounded-full flex gap-2 items-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 bg-celestial-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                />
              ))}
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Upgrade */}
      <div className="flex gap-3 items-center">
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-celestial-gold/5 blur-xl pointer-events-none opacity-50" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask the stars..."
            className="w-full glass-panel px-8 py-4 rounded-full outline-none transition-all text-sm text-star-white placeholder:text-white/20 relative z-10 shadow-2xl"
          />
        </div>
        <motion.button 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="w-14 h-14 bg-celestial-gold/10 text-celestial-gold rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:bg-celestial-gold/20 transition-all relative z-10 disabled:opacity-30 border-none"
        >
          <Send size={20} strokeWidth={2} />
        </motion.button>
      </div>
    </div>
  );
};
