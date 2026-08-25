import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';

export function FinalScreen({ onReplay }: { onReplay: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-10 flex flex-col items-center justify-center p-8 max-w-2xl w-full mx-auto text-center"
    >
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="text-6xl md:text-8xl lg:text-9xl font-script text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-300 to-rose-400 mb-8 drop-shadow-[0_0_20px_rgba(244,114,182,0.8)] leading-tight py-4"
      >
        Happy Birthday
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-lg md:text-2xl text-white drop-shadow-sm font-sans tracking-wide space-y-4 mb-12"
      >
        <p>Thank you for being part of my life.</p>
        <p>I hope this little gift can make your special day even more beautiful.</p>
        <p className="mt-8 text-3xl font-script text-pink-300 drop-shadow-[0_0_10px_rgba(244,114,182,0.6)]">Forever Yours. ❤️</p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        onClick={onReplay}
        className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white transition-all rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20"
      >
        <RotateCcw className="w-4 h-4" /> REPLAY FROM START
      </motion.button>
    </motion.div>
  );
}
