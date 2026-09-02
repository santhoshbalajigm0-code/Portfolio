import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Suit } from '../types';
import { SuitIcon } from './SuitIcon';
import { cardAudio } from '../utils/audio';

export interface PlayingCardProps {
  rank: string;
  suit: Suit;
  children?: React.ReactNode;
  backContent?: React.ReactNode;
  isFlipped?: boolean;
  onFlip?: () => void;
  className?: string;
  enableTilt?: boolean;
  themeColor?: 'cream' | 'ivory' | 'ruby' | 'royal' | 'emerald' | 'violet' | 'gold' | 'dark';
  glowColor?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  interactive?: boolean;
  cursorLabel?: string;
  onClick?: () => void;
  id?: string;
}

export const PlayingCard: React.FC<PlayingCardProps> = ({
  rank,
  suit,
  children,
  backContent,
  isFlipped = false,
  onFlip,
  className = '',
  enableTilt = true,
  themeColor = 'ivory',
  glowColor,
  size = 'md',
  interactive = true,
  cursorLabel = 'DRAW',
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt mechanics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    cardAudio.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onFlip) {
      cardAudio.playFlip();
      onFlip();
    } else if (onClick) {
      cardAudio.playDeal();
      onClick();
    }
  };

  const isRed = suit === 'hearts' || suit === 'diamonds';
  const pipColor = isRed ? 'text-rose-500' : 'text-slate-900 dark:text-slate-100';

  // Card themes
  const getCardFaceStyles = () => {
    switch (themeColor) {
      case 'cream':
        return 'bg-gradient-to-br from-[#FFFDD0] via-[#F8F5F0] to-[#EFEBD9] text-[#141414] border-[#D4AF37]/40';
      case 'ivory':
        return 'bg-gradient-to-br from-[#FFFDD0] via-[#FAF7F0] to-[#F0ECE0] text-[#141414] border-[#D4AF37]/50';
      case 'ruby':
        return 'bg-gradient-to-b from-[#240B12] to-[#120408] text-rose-50 border-[#D4AF37]/40';
      case 'royal':
        return 'bg-gradient-to-b from-[#0B152B] to-[#050B18] text-blue-50 border-[#D4AF37]/40';
      case 'emerald':
        return 'bg-gradient-to-b from-[#0A201A] to-[#040F0C] text-emerald-50 border-[#D4AF37]/40';
      case 'violet':
        return 'bg-gradient-to-b from-[#180D2C] to-[#0B0516] text-purple-50 border-[#D4AF37]/40';
      case 'gold':
        return 'bg-gradient-to-b from-[#281F08] to-[#120D02] text-amber-50 border-[#D4AF37]/60';
      case 'dark':
      default:
        return 'bg-gradient-to-b from-[#0D182E] to-[#050B18] text-[#E4E3E0] border-[#D4AF37]/35';
    }
  };

  // Size styling presets
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'w-28 h-40 p-2.5 rounded-xl';
      case 'md':
        return 'w-64 h-92 p-4 rounded-2xl';
      case 'lg':
        return 'w-full max-w-md min-h-[460px] p-6 rounded-[24px]';
      case 'xl':
        return 'w-full max-w-2xl min-h-[540px] p-8 rounded-[24px]';
      case 'custom':
      default:
        return 'p-6 md:p-8 rounded-[24px]';
    }
  };

  const isLightFace = themeColor === 'cream' || themeColor === 'ivory';
  const effectivePipColor = isRed ? 'text-[#DC2626]' : (isLightFace ? 'text-[#141414]' : 'text-[#E4E3E0]');

  return (
    <div
      ref={cardRef}
      id={id}
      data-cursor={cursorLabel}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`perspective-1500 select-none ${interactive ? 'cursor-pointer' : ''} ${className}`}
    >
      <motion.div
        style={{
          rotateX: enableTilt ? rotateX : 0,
          rotateY: enableTilt ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          y: isHovered && interactive ? -6 : 0,
          scale: isHovered && interactive ? 1.015 : 1,
        }}
        transition={{
          rotateY: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
          y: { duration: 0.25 },
          scale: { duration: 0.25 },
        }}
        className={`relative w-full h-full transition-shadow duration-300 preserve-3d ${
          isHovered
            ? 'shadow-[0_35px_80px_-15px_rgba(0,0,0,0.8)]'
            : 'shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]'
        }`}
      >
        {/* CARD FRONT */}
        <div
          className={`relative w-full h-full backface-hidden border-[1px] overflow-hidden flex flex-col justify-between ${getCardFaceStyles()} ${getSizeStyles()}`}
          style={{
            boxShadow: glowColor ? `0 0 30px ${glowColor}` : 'none',
          }}
        >
          {/* Subtle Paper Grain & Luxury Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-25 card-pattern-overlay" />

          {/* Luxury Inner Double Gold Border */}
          <div className="absolute inset-2 md:inset-3 pointer-events-none border border-[#D4AF37]/30 rounded-[18px]" />
          <div className="absolute inset-[10px] md:inset-[14px] pointer-events-none border border-[#D4AF37]/15 rounded-[14px]" />

          {/* Corner Ornamental Flourishes */}
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#D4AF37]/60 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#D4AF37]/60 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#D4AF37]/60 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#D4AF37]/60 pointer-events-none" />

          {/* Dynamic Light Sheen on Hover */}
          {enableTilt && (
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 230, 150, 0.16) 0%, transparent 60%)`,
              }}
            />
          )}

          {/* TOP LEFT CORNER INDEX */}
          <div className="relative z-10 flex flex-col items-center w-fit leading-none select-none">
            <span className={`font-cinzel text-xl md:text-3xl font-black ${effectivePipColor}`}>
              {rank}
            </span>
            <SuitIcon suit={suit} size={15} className="mt-0.5" />
          </div>

          {/* CENTER CONTENT */}
          <div className="relative z-10 my-auto w-full px-1 py-2">
            {children}
          </div>

          {/* BOTTOM RIGHT CORNER INDEX (ROTATED 180 DEG) */}
          <div className="relative z-10 flex flex-col items-center w-fit leading-none select-none self-end rotate-180">
            <span className={`font-cinzel text-xl md:text-3xl font-black ${effectivePipColor}`}>
              {rank}
            </span>
            <SuitIcon suit={suit} size={15} className="mt-0.5" />
          </div>
        </div>

        {/* CARD BACK */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 border-[1.5px] border-[#D4AF37]/60 rounded-[24px] overflow-hidden bg-gradient-to-br from-[#0F1B33] via-[#080E1C] to-[#140C1A] p-5 flex flex-col items-center justify-between text-[#E4E3E0] shadow-2xl`}
        >
          {/* Ornate Guilloché Card Back Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: `
                radial-gradient(circle at center, #D4AF37 1px, transparent 1px),
                repeating-linear-gradient(45deg, rgba(212,175,55,0.08) 0px, rgba(212,175,55,0.08) 2px, transparent 2px, transparent 10px),
                repeating-linear-gradient(-45deg, rgba(212,175,55,0.08) 0px, rgba(212,175,55,0.08) 2px, transparent 2px, transparent 10px)
              `,
              backgroundSize: '20px 20px, 20px 20px, 20px 20px',
            }}
          />

          <div className="absolute inset-2 border-2 border-[#D4AF37]/35 rounded-[18px] pointer-events-none" />
          <div className="absolute inset-3.5 border border-[#D4AF37]/20 rounded-[14px] pointer-events-none" />

          {backContent ? (
            <div className="relative z-10 w-full h-full p-2 flex flex-col justify-between overflow-y-auto">
              {backContent}
            </div>
          ) : (
            <>
              {/* Top back index */}
              <div className="relative z-10 flex items-center justify-between w-full text-[#D4AF37]/80 font-cinzel text-xs px-2">
                <span>THE DECK</span>
                <span>♠ ♥ ♦ ♣</span>
              </div>

              {/* Center Monogram Emblem */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37]/60 flex items-center justify-center bg-[#050B18]/90 shadow-[0_0_25px_rgba(212,175,55,0.25)]">
                  <div className="w-16 h-16 rounded-full border border-[#D4AF37]/40 flex items-center justify-center">
                    <span className="font-cinzel text-2xl font-extrabold text-[#D4AF37] tracking-tighter">
                      SB
                    </span>
                  </div>
                </div>
                <p className="mt-3 font-cinzel text-xs tracking-widest text-amber-200/90 uppercase font-bold">
                  Santhosh Balaji
                </p>
                <p className="font-mono-code text-[10px] text-slate-400 tracking-widest mt-0.5 uppercase">
                  THE DEVELOPER'S DECK
                </p>
              </div>

              {/* Bottom back index */}
              <div className="relative z-10 flex items-center justify-between w-full text-[#D4AF37]/80 font-cinzel text-xs px-2 rotate-180">
                <span>THE DECK</span>
                <span>♠ ♥ ♦ ♣</span>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
