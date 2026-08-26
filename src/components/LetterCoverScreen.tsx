import { motion } from 'motion/react';
import { Disc } from 'lucide-react';

export function LetterCoverScreen({ theme = 'rose', onNext, isPlaying, onToggleAudio }: { theme?: 'rose' | 'blue' | 'purple', onNext: () => void, isPlaying?: boolean, onToggleAudio?: () => void }) {
  const themeStyles = {
    rose: {
      border: "border-rose-200/20",
      subtitle: "text-pink-300 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]",
      title: "from-yellow-100 via-pink-200 to-rose-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.6)]",
      text: "text-rose-50",
      button: "text-rose-900 bg-gradient-to-r from-rose-100 to-pink-100 shadow-[0_0_20px_rgba(255,228,230,0.4)]"
    },
    blue: {
      border: "border-cyan-200/20",
      subtitle: "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]",
      title: "from-cyan-100 via-blue-200 to-indigo-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.6)]",
      text: "text-cyan-50",
      button: "text-indigo-900 bg-gradient-to-r from-cyan-100 to-blue-100 shadow-[0_0_20px_rgba(207,250,254,0.4)]"
    },
    purple: {
      border: "border-purple-200/20",
      subtitle: "text-fuchsia-300 drop-shadow-[0_0_8px_rgba(232,121,249,0.8)]",
      title: "from-fuchsia-100 via-purple-200 to-pink-400 drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]",
      text: "text-fuchsia-50",
      button: "text-purple-900 bg-gradient-to-r from-fuchsia-100 to-purple-100 shadow-[0_0_20px_rgba(250,232,255,0.4)]"
    }
  };

  const current = themeStyles[theme];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
      className={`relative z-10 flex flex-col items-center justify-center p-8 max-w-md w-full mx-auto bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border ${current.border} text-center min-h-[50vh]`}
    >
      <motion.p className={`text-sm md:text-base tracking-[0.3em] ${current.subtitle} uppercase font-sans mb-8 font-bold`}>
        A Love Letter For You
      </motion.p>
      
      <motion.h2 className={`text-5xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r ${current.title} mb-8 py-2 leading-tight font-semibold italic`}>
        Your Special Day
      </motion.h2>
      
      <motion.p className={`${current.text} font-sans italic mb-8 text-lg drop-shadow-sm tracking-wide`}>
        Created with love, just for you
      </motion.p>

      {/* Spotify-style Music Player Widget */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-10 cursor-pointer group"
        onClick={onToggleAudio}
      >
        <div className="flex items-center gap-4 bg-black/20 backdrop-blur-md px-5 py-3 rounded-full border border-white/10 shadow-lg hover:bg-black/30 transition-colors">
          <div className="relative flex items-center justify-center w-12 h-12">
            {/* Spinning Record */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-0 bg-slate-900 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.2)] overflow-hidden"
            >
              {/* Grooves */}
              <div className="absolute inset-[2px] border border-slate-700/50 rounded-full"></div>
              <div className="absolute inset-[6px] border border-slate-700/50 rounded-full"></div>
              <div className="absolute inset-[10px] border border-slate-700/50 rounded-full"></div>
              {/* Inner Label */}
              <div className={`w-5 h-5 rounded-full bg-gradient-to-tr ${current.title} flex items-center justify-center z-10`}>
                <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
              </div>
            </motion.div>
          </div>
          
          <div className="flex flex-col text-left justify-center pr-2">
            <p className="text-xs text-white/80 font-bold mb-1 tracking-wider uppercase">
              {isPlaying ? 'Now Playing' : 'Paused'}
            </p>
            <div className="flex items-end gap-[3px] h-3">
              {[1, 2, 3, 4, 5].map((bar) => (
                <motion.div 
                  key={bar}
                  animate={{ 
                    height: isPlaying ? ["20%", "100%", "30%", "90%", "20%"] : "20%" 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 0.8 + bar * 0.15, 
                    ease: "easeInOut" 
                  }}
                  className={`w-1 bg-white/90 rounded-t-sm`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.button 
        onClick={onNext} 
        className={`px-10 py-4 font-bold transition-all rounded-full hover:from-white hover:to-white active:scale-95 ${current.button}`}
      >
        READ MY LETTER
      </motion.button>
    </motion.div>
  );
}
