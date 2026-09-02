import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Inspect target element for cursor hints
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cardEl = target.closest('[data-cursor]');
      if (cardEl) {
        const text = cardEl.getAttribute('data-cursor') || 'DRAW';
        setCursorText(text);
        setIsHovered(true);
      } else if (target.closest('button') || target.closest('a')) {
        setCursorText('OPEN');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Main Cursor follower */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 ${
          isHovered
            ? 'w-14 h-14 bg-amber-400/90 text-slate-950 font-bold text-[10px] tracking-wider font-cinzel shadow-[0_0_20px_rgba(251,191,36,0.6)] backdrop-blur-xs'
            : 'w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.8)]'
        }`}
        animate={{
          x: pos.x,
          y: pos.y,
          scale: isHovered ? 1 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 400,
          mass: 0.2,
        }}
      >
        {isHovered && cursorText && (
          <span className="select-none font-bold uppercase">{cursorText}</span>
        )}
      </motion.div>
    </div>
  );
};
