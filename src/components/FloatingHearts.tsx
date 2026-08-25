import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 15 + 10,
      duration: Math.random() * 10 + 15,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400/30"
          initial={{ y: '110vh', x: `${heart.left}vw`, scale: 0, opacity: 0 }}
          animate={{
            y: '-10vh',
            x: [`${heart.left}vw`, `${heart.left + 5}vw`, `${heart.left - 5}vw`, `${heart.left}vw`],
            scale: 1,
            rotate: 360,
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
          style={{ fontSize: heart.size }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
