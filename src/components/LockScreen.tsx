import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowRight } from 'lucide-react';

export function LockScreen({ passcode, onUnlock }: { passcode: string, onUnlock: () => void }) {
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers or empty
    if (!/^[0-9]*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = code.join('');
    // Handle cases where the passcode is shorter than 4 by matching up to length if needed,
    // but the prompt said "bisa diatur sebanyak 4 digit", so we'll expect 4 digits.
    if (enteredCode === passcode || (enteredCode.length > 0 && passcode.startsWith(enteredCode) && enteredCode.length === passcode.length)) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
      setCode(['', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  // Focus first input on mount
  useEffect(() => {
    // Small timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.5 }}
      className="relative z-10 flex flex-col items-center justify-center p-10 max-w-sm w-full mx-auto bg-black/40 backdrop-blur-2xl rounded-[40px] shadow-2xl border border-white/5 text-center"
    >
      <div className="w-12 h-12 rounded-full border border-rose-500/20 flex items-center justify-center mb-6 bg-rose-500/10">
        <Lock className="w-4 h-4 text-rose-300" />
      </div>

      <p className="text-[10px] tracking-[0.3em] text-rose-200/50 uppercase font-sans mb-3 font-bold flex items-center justify-center gap-3">
        <span className="w-3 h-[1px] bg-rose-200/50"></span>
        FOR YOUR EYES ONLY
      </p>

      <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 drop-shadow-sm leading-tight font-medium">
        Enter Your Secret<br/>Code
      </h2>

      <p className="text-rose-100/60 mb-10 text-xs md:text-sm font-sans tracking-wide px-2 leading-relaxed">
        Something has been waiting just past the surface, only for you.
      </p>
      
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <motion.div 
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}} 
          transition={{ duration: 0.4 }}
          className="flex gap-4 mb-10 justify-center"
        >
          {code.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-14 h-16 text-center text-2xl text-white font-bold bg-transparent rounded-2xl border-2 border-rose-500/30 focus:outline-none focus:border-rose-400 focus:bg-rose-500/10 transition-all shadow-inner"
            />
          ))}
        </motion.div>
        
        <button
          type="submit"
          className="w-full py-4 font-bold text-sm text-white font-sans transition-all rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 active:scale-95 shadow-[0_0_20px_rgba(244,63,94,0.3)] flex items-center justify-center gap-2"
        >
          Unlock it <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
}
