import { motion, useInView } from 'motion/react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowDown } from 'lucide-react';

export function TypingMessageScreen({ title, message, partyName, theme = 'rose', onNext }: { title: string, message: string, partyName: string, theme?: 'rose' | 'blue' | 'purple', onNext: () => void }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(messageRef, { once: true, amount: 0.3 });

  const themeStyles = {
    rose: {
      title: "from-yellow-100 via-pink-200 to-rose-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.6)]",
      border: "border-rose-200/20",
      cursor: "border-rose-300",
      button: "text-rose-900 bg-gradient-to-r from-rose-100 to-pink-100 shadow-[0_0_20px_rgba(255,228,230,0.4)]"
    },
    blue: {
      title: "from-cyan-100 via-blue-200 to-indigo-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.6)]",
      border: "border-cyan-200/20",
      cursor: "border-cyan-300",
      button: "text-indigo-900 bg-gradient-to-r from-cyan-100 to-blue-100 shadow-[0_0_20px_rgba(207,250,254,0.4)]"
    },
    purple: {
      title: "from-fuchsia-100 via-purple-200 to-pink-400 drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]",
      border: "border-purple-200/20",
      cursor: "border-purple-300",
      button: "text-purple-900 bg-gradient-to-r from-fuchsia-100 to-purple-100 shadow-[0_0_20px_rgba(250,232,255,0.4)]"
    }
  };

  const current = themeStyles[theme];

  // Start typing when scrolled into view
  useEffect(() => {
    if (isInView) {
      setStartTyping(true);
    }
  }, [isInView]);

  // Faster typing effect
  useEffect(() => {
    if (!startTyping) return;
    let i = 0;
    setDisplayedText('');
    setIsTypingDone(false);
    const timer = setInterval(() => {
      if (i < message.length) {
        setDisplayedText(prev => prev + message.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        setIsTypingDone(true);
      }
    }, 15);
    return () => clearInterval(timer);
  }, [message, startTyping]);

  const handleScrollDown = () => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Generate random confetti pieces
  const confetti = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 90 + 5}%`,
    top: `${Math.random() * 90 + 5}%`,
    rotate: `${Math.random() * 360}deg`,
    color: Math.random() > 0.5 ? 'bg-yellow-600' : 'bg-rose-200',
    width: Math.random() > 0.5 ? 'w-2 h-3' : 'w-3 h-2',
    delay: Math.random() * 2
  })), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-40 overflow-y-auto overflow-x-hidden scroll-smooth"
    >
      {/* Container to handle the overall background matching since it covers everything */}
      <div className="min-h-[200vh] w-full flex flex-col relative pointer-events-auto">
        
        {/* Confetti Background Layer for Hero */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-50 z-0">
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: [0.5, 1, 0.5], y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: c.delay }}
              className={`absolute ${c.color} ${c.width} rounded-sm`}
              style={{ left: c.left, top: c.top, transform: `rotate(${c.rotate})` }}
            />
          ))}
        </div>

        {/* --- PART 1: Happy Birthday Hero --- */}
        <div className="w-full h-screen flex flex-col items-center justify-center p-4 text-center relative z-10">
          
          <motion.p 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xs md:text-sm tracking-[0.4em] text-yellow-500 uppercase font-sans mb-6 font-bold flex items-center justify-center gap-3"
          >
            <span className="text-yellow-400">✦</span> MY LOVE <span className="text-yellow-400">✦</span>
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-sans font-black text-white uppercase leading-[0.85] tracking-widest drop-shadow-2xl"
          >
            Happy<br />Birthday
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} 
            className="flex flex-col items-center mt-16 mb-10"
          >
            {/* Candle Flame */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} 
              transition={{ repeat: Infinity, duration: 1 }} 
              className="w-3 h-5 bg-yellow-400 rounded-[50%] shadow-[0_0_15px_#facc15] mb-1" 
            />
            {/* Candle Body */}
            <div className="w-3 h-10 bg-white/90 rounded-sm mb-1" />
            {/* Cake Tiers */}
            <div className="w-28 h-7 bg-[#f8f9fa] rounded-full border-b-[6px] border-[#dee2e6] z-30" />
            <div className="w-36 h-8 bg-[#f59e0b] rounded-full -mt-3 border-b-[6px] border-[#d97706] z-20" />
            <div className="w-44 h-9 bg-[#92400e] rounded-full -mt-3 border-b-[6px] border-[#78350f] z-10 shadow-2xl" />
          </motion.div>

          <motion.h3 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-4xl md:text-5xl font-script text-white mb-16 drop-shadow-lg"
          >
            {partyName}
          </motion.h3>

          <motion.button 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            onClick={handleScrollDown}
            className="p-4 transition-all rounded-full bg-white/10 hover:bg-white/20 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center animate-bounce border border-white/20 text-white"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.button>
        </div>

        {/* --- PART 2: Typing Message Section --- */}
        <div ref={messageRef} className="w-full min-h-screen flex flex-col items-center justify-center p-4 relative z-10 py-20 bg-black/20 backdrop-blur-sm">
          <div className={`max-w-3xl w-full mx-auto bg-white/10 backdrop-blur-xl rounded-[40px] shadow-2xl border ${current.border} text-center p-8 md:p-14`}>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r ${current.title} mb-10 py-2 font-semibold italic`}>
              {title}
            </h2>
            
            <div className="relative w-full min-h-[200px] flex items-center justify-center mb-12 text-left md:text-center">
              <p className="text-lg md:text-xl lg:text-2xl text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] leading-relaxed font-sans px-2 md:px-6 whitespace-pre-wrap">
                {displayedText}
                {!isTypingDone && startTyping && <span className={`animate-pulse border-r-2 ${current.cursor} ml-1`}></span>}
              </p>
            </div>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: isTypingDone ? 1 : 0 }}
              disabled={!isTypingDone}
              onClick={onNext}
              className={`px-10 py-4 font-bold transition-all rounded-full hover:from-white hover:to-white active:scale-95 disabled:opacity-0 tracking-widest ${current.button}`}
            >
              ONE MORE THING ✨
            </motion.button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
