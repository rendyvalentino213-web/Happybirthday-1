import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function TypingMessageScreen({ title, message, onNext }: { title: string, message: string, onNext: () => void }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
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
    }, 40); // Fast typing
    return () => clearInterval(timer);
  }, [message]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative z-10 flex flex-col items-center justify-center p-8 max-w-2xl w-full mx-auto bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200/20 text-center min-h-[50vh]"
    >
      <h2 className="text-4xl md:text-5xl font-script text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-pink-200 to-rose-400 mb-8 drop-shadow-[0_0_15px_rgba(244,114,182,0.6)] py-2">
        {title}
      </h2>
      
      <div className="relative w-full min-h-[150px] flex items-center justify-center mb-10 text-left md:text-center">
        <p className="text-lg md:text-2xl text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] leading-relaxed font-serif px-2 md:px-6 whitespace-pre-wrap">
          {displayedText}
          {!isTypingDone && <span className="animate-pulse border-r-2 border-rose-300 ml-1"></span>}
        </p>
      </div>
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isTypingDone ? 1 : 0 }}
        disabled={!isTypingDone}
        onClick={onNext}
        className="px-10 py-4 font-bold text-rose-900 transition-all rounded-full bg-gradient-to-r from-rose-100 to-pink-100 hover:from-white hover:to-white active:scale-95 shadow-[0_0_20px_rgba(255,228,230,0.4)] disabled:opacity-0"
      >
        ONE MORE THING ✨
      </motion.button>
    </motion.div>
  );
}
