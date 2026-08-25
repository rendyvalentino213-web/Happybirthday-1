import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowRight } from 'lucide-react';

export function LockScreen({ passcode, theme = 'rose', onUnlock }: { passcode: string, theme?: 'rose' | 'blue' | 'purple', onUnlock: () => void }) {
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const themeStyles = {
    rose: {
      iconBg: "border-rose-500/20 bg-rose-500/10",
      icon: "text-rose-300",
      textSubtitle: "text-rose-200/50",
      line: "bg-rose-200/50",
      textMuted: "text-rose-100/60",
      focusBorder: "focus:border-rose-400",
      buttonBg: "from-rose-600/80 to-pink-600/80 hover:from-rose-500 hover:to-pink-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]",
    },
    blue: {
      iconBg: "border-cyan-500/20 bg-cyan-500/10",
      icon: "text-cyan-300",
      textSubtitle: "text-cyan-200/50",
      line: "bg-cyan-200/50",
      textMuted: "text-cyan-100/60",
      focusBorder: "focus:border-cyan-400",
      buttonBg: "from-blue-600/80 to-cyan-600/80 hover:from-blue-500 hover:to-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]",
    },
    purple: {
      iconBg: "border-fuchsia-500/20 bg-fuchsia-500/10",
      icon: "text-fuchsia-300",
      textSubtitle: "text-fuchsia-200/50",
      line: "bg-fuchsia-200/50",
      textMuted: "text-fuchsia-100/60",
      focusBorder: "focus:border-fuchsia-400",
      buttonBg: "from-purple-600/80 to-fuchsia-600/80 hover:from-purple-500 hover:to-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.3)]",
    }
  };

  const current = themeStyles[theme];

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
      className="relative z-10 flex flex-col items-center justify-center p-8 md:p-12 max-w-lg w-full mx-auto text-center"
    >
      <div className={`w-12 h-12 rounded-full border flex items-center justify-center mb-6 ${current.iconBg}`}>
        <Lock className={`w-4 h-4 ${current.icon}`} />
      </div>

      <p className={`text-[10px] tracking-[0.3em] ${current.textSubtitle} uppercase font-sans mb-3 font-bold flex items-center justify-center gap-3`}>
        <span className={`w-3 h-[1px] ${current.line}`}></span>
        FOR YOUR EYES ONLY
        <span className={`w-3 h-[1px] ${current.line}`}></span>
      </p>

      <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 drop-shadow-sm leading-tight font-medium">
        Enter Your Secret<br/>Code
      </h2>

      <p className={`${current.textMuted} mb-10 text-xs md:text-sm font-sans tracking-wide px-2 leading-relaxed`}>
        Something has been waiting just past the surface, only for you.
      </p>
      
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <motion.div 
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}} 
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 mb-12 justify-center"
        >
          {code.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className={`w-16 h-20 md:w-20 md:h-24 text-center text-4xl text-[#fff0e6] font-serif bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 focus:outline-none ${current.focusBorder} focus:bg-white/10 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.1)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]`}
            />
          ))}
        </motion.div>
        
        <button
          type="submit"
          className={`w-full max-w-[280px] py-4 font-bold text-sm tracking-wide text-white font-sans transition-all rounded-full bg-gradient-to-r ${current.buttonBg} active:scale-95 flex items-center justify-center gap-2 backdrop-blur-sm`}
        >
          Unlock it <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
}
