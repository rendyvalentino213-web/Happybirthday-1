import { motion } from 'motion/react';
import { useEffect, useState, memo } from 'react';

export function GalaxyBackground({ theme = 'rose' }: { theme?: 'rose' | 'blue' | 'purple' }) {
  const [stars, setStars] = useState<{ id: number; left: number; top: number; size: number; delay: number; duration: number; type: 'dot' | 'heart'; opacity: number; drift: number; rot: number }[]>([]);

  const themeColors = {
    rose: {
      bg: "from-[#4a3230] via-[#2a1d1c] to-[#140c0c]",
      orb1: "bg-rose-400/10",
      orb2: "bg-orange-300/10",
      orb3: "bg-pink-900/30",
      star: "text-rose-300/80",
      dot: "bg-rose-100 shadow-[0_0_8px_rgba(255,228,230,0.8)]",
      heartShadow: "drop-shadow-[0_0_10px_rgba(251,113,133,0.6)]",
    },
    blue: {
      bg: "from-[#1e3a5f] via-[#0f172a] to-[#020617]",
      orb1: "bg-cyan-400/10",
      orb2: "bg-blue-400/10",
      orb3: "bg-indigo-900/30",
      star: "text-cyan-300/80",
      dot: "bg-cyan-100 shadow-[0_0_8px_rgba(207,250,254,0.8)]",
      heartShadow: "drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]",
    },
    purple: {
      bg: "from-[#3b1e5f] via-[#1e0f2a] to-[#0b0217]",
      orb1: "bg-fuchsia-400/10",
      orb2: "bg-purple-400/10",
      orb3: "bg-purple-900/30",
      star: "text-fuchsia-300/80",
      dot: "bg-fuchsia-100 shadow-[0_0_8px_rgba(250,232,255,0.8)]",
      heartShadow: "drop-shadow-[0_0_10px_rgba(232,121,249,0.6)]",
    }
  };

  const current = themeColors[theme];

  useEffect(() => {
    // Reduce particle count slightly for better performance on lower-end devices
    const newElements = Array.from({ length: 45 }).map((_, i) => {
      const isHeart = Math.random() > 0.7;
      return {
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: isHeart ? Math.random() * 10 + 6 : Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 20 + 15,
        type: isHeart ? 'heart' : 'dot',
        opacity: isHeart ? Math.random() * 0.4 + 0.3 : Math.random() * 0.5 + 0.2,
        drift: (Math.random() * 10 - 5), // vw drift
        rot: isHeart ? (Math.random() * 60 - 30) : 0,
      };
    });
    setStars(newElements as any);
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#251b1b] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${current.bg}`}>
      
      {/* High-performance CSS Animations */}
      <style>
        {`
          @keyframes floatParticle {
            0% { transform: translate3d(0, 0, 0) scale(0.5) rotate(0deg); opacity: 0; }
            20% { opacity: var(--tw-star-opacity); transform: translate3d(calc(var(--tw-star-drift) * 0.2vw), -3vh, 0) scale(1) rotate(calc(var(--tw-star-rot) * 0.2deg)); }
            80% { opacity: var(--tw-star-opacity); transform: translate3d(calc(var(--tw-star-drift) * 0.8vw), -12vh, 0) scale(1) rotate(calc(var(--tw-star-rot) * 0.8deg)); }
            100% { transform: translate3d(calc(var(--tw-star-drift) * 1vw), -15vh, 0) scale(0.5) rotate(calc(var(--tw-star-rot) * 1deg)); opacity: 0; }
          }
          @keyframes floatHeart {
            0% { transform: translate3d(0, 0, 0) scale(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.6; transform: translate3d(calc(var(--tw-heart-drift) * 0.1vw), -12vh, 0) scale(1) rotate(calc(var(--tw-heart-rot) * 0.1deg)); }
            90% { opacity: 0.6; transform: translate3d(calc(var(--tw-heart-drift) * 0.9vw), -108vh, 0) scale(1) rotate(calc(var(--tw-heart-rot) * 0.9deg)); }
            100% { transform: translate3d(calc(var(--tw-heart-drift) * 1vw), -120vh, 0) scale(0) rotate(calc(var(--tw-heart-rot) * 1deg)); opacity: 0; }
          }
        `}
      </style>

      {/* Animated Galaxy Dust (Nebula-like Orbs) */}
      <motion.div 
        animate={{ 
          x: ['-5%', '5%', '-5%'],
          y: ['-5%', '5%', '-5%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={`absolute top-0 left-1/4 w-[40vw] h-[40vw] rounded-full blur-[120px] mix-blend-screen ${current.orb1}`}
        style={{ willChange: 'transform' }}
      />
      <motion.div 
        animate={{ 
          x: ['5%', '-5%', '5%'],
          y: ['5%', '-5%', '5%'],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className={`absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full blur-[150px] mix-blend-screen ${current.orb2}`}
        style={{ willChange: 'transform' }}
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[150px] mix-blend-overlay ${current.orb3}`}
        style={{ willChange: 'transform, opacity' }}
      />

      {/* Floating Galaxy Elements (Stars and Hearts) using CSS for 60fps performance */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute will-change-transform"
          style={{ 
            top: `${star.top}vh`,
            left: `${star.left}vw`,
            width: star.size, 
            height: star.size,
            animation: `floatParticle ${star.duration}s linear ${star.delay}s infinite`,
            opacity: 0,
            ['--tw-star-opacity' as any]: star.opacity,
            ['--tw-star-drift' as any]: star.drift,
            ['--tw-star-rot' as any]: star.rot,
          }}
        >
          {star.type === 'dot' ? (
            <div className={`w-full h-full rounded-full ${current.dot}`} />
          ) : (
            <svg viewBox="0 0 24 24" className={`w-full h-full fill-current ${current.star} ${current.heartShadow}`} strokeWidth="0">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          )}
        </div>
      ))}
      
      {/* Eye Catching Romantic Foreground Hearts */}
      <FloatingForegroundHearts theme={theme} />
    </div>
  );
}

// Memoized to prevent unnecessary re-renders
const FloatingForegroundHearts = memo(({ theme }: { theme: 'rose' | 'blue' | 'purple' }) => {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; size: number; duration: number; drift: number; rot: number }[]>([]);

  const fgColors = {
    rose: { class: "text-pink-400/40 drop-shadow-[0_0_15px_rgba(244,114,182,0.4)]", emoji: "❤️" },
    blue: { class: "text-cyan-400/40 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]", emoji: "💙" },
    purple: { class: "text-fuchsia-400/40 drop-shadow-[0_0_15px_rgba(232,121,249,0.4)]", emoji: "💜" }
  };

  const currentFg = fgColors[theme];

  useEffect(() => {
    // Reduced to 8 for better performance while maintaining visual impact
    const newHearts = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      size: Math.random() * 20 + 15,
      duration: Math.random() * 15 + 15,
      drift: (Math.random() * 16 - 8), // horizontal drift
      rot: (Math.random() * 180 - 90), // rotation
    }));
    setHearts(newHearts);
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute will-change-transform ${currentFg.class}`}
          style={{ 
            top: '110vh',
            left: `${heart.left}vw`,
            fontSize: heart.size, 
            animation: `floatHeart ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
            opacity: 0,
            ['--tw-heart-drift' as any]: heart.drift,
            ['--tw-heart-rot' as any]: heart.rot,
          }}
        >
          {currentFg.emoji}
        </div>
      ))}
    </>
  );
});

