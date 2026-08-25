import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function GiftScreen({ onNext }: { onNext: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      onNext();
    }, 1500); // Wait for the lid animation before moving to the next screen
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center p-4 min-h-[70vh] max-w-2xl w-full mx-auto gap-16">
      
      {/* Title that doesn't overlap */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="font-sans font-bold tracking-widest text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-pink-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.6)]">
          ADA SESUATU UNTUKMU ❤️
        </h2>
      </motion.div>

      {/* The 3D Gift Box */}
      <motion.div 
        className="relative w-48 h-48 cursor-pointer group"
        onClick={handleOpen}
        whileHover={!isOpen ? { scale: 1.05 } : {}}
        animate={!isOpen ? { rotate: [0, -2, 2, -2, 2, 0] } : {}}
        transition={{ repeat: !isOpen ? Infinity : 0, repeatDelay: 2, duration: 0.5 }}
      >
        {/* Sparkles */}
        {!isOpen && (
          <>
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -top-8 -right-8 z-40">
              <Sparkles className="w-10 h-10 text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.8)]" />
            </motion.div>
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} className="absolute -bottom-4 -left-8 z-40">
              <Sparkles className="w-8 h-8 text-pink-300 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]" />
            </motion.div>
          </>
        )}

        {/* Lid */}
        <motion.div
          animate={isOpen ? { y: -200, opacity: 0, rotate: 25, scale: 1.1 } : { y: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-4 -left-2 w-52 h-14 bg-gradient-to-b from-rose-400 to-rose-600 rounded-md z-20 shadow-[0_15px_25px_rgba(0,0,0,0.4)] border-t border-rose-300"
        >
          {/* Ribbon Top/Bow */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex z-10 drop-shadow-xl">
            <div className="w-14 h-14 bg-transparent border-[10px] border-yellow-400 -mr-3" style={{ borderRadius: '50% 50% 0 50%', transform: 'rotate(45deg)' }} />
            <div className="w-14 h-14 bg-transparent border-[10px] border-yellow-400 -ml-3" style={{ borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)' }} />
          </div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-400 rounded-full z-20 shadow-md" />
          
          {/* Ribbon Band */}
          <div className="absolute left-1/2 -translate-x-1/2 w-10 h-full bg-gradient-to-b from-yellow-300 to-yellow-500 shadow-sm" />
        </motion.div>
        
        {/* Box Base */}
        <motion.div
          animate={isOpen ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-0 left-0 w-48 h-32 bg-gradient-to-br from-rose-600 to-rose-800 rounded-b-lg shadow-2xl overflow-hidden border-t border-rose-700"
        >
          {/* Ribbon Band */}
          <div className="absolute left-1/2 -translate-x-1/2 w-10 h-full bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-inner" />
          
          {/* Dark inner shadow at top to look 3D */}
          <div className="absolute top-0 left-0 w-full h-4 bg-black/30 blur-[2px]" />
        </motion.div>

        {/* Click prompt */}
        {!isOpen && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-16 w-full text-center text-white/70 font-medium tracking-wide animate-pulse font-sans"
          >
            Ketuk kadonya ya...
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
