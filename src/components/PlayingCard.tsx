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
  themeColor?: 'cream' | 'ivory' | 'ruby' | 'royal' | 'emerald' | 'violet' | 'gold' | 'dark' | 'midnight';
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
  cursorLabel = 'FLIP',
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt mechanics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 220, mass: 0.4 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['10%', '90%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['10%', '90%']);

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

  const handleClick = () => {
    if (onFlip) {
      cardAudio.playFlip();
      onFlip();
    } else if (onClick) {
      cardAudio.playDeal();
      onClick();
    }
  };

  const isRed = suit === 'hearts' || suit === 'diamonds';

  // Card themes with authentic paper and luxury dark variants
  const getCardFaceStyles = () => {
    switch (themeColor) {
      case 'cream':
        return 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F2EDE0] text-[#141414] border-[#D4AF37]/60 card-linen-texture';
      case 'ivory':
        return 'bg-gradient-to-b from-[#FFFFFC] via-[#F8F4EB] to-[#EDE7D8] text-[#141414] border-[#D4AF37]/70 card-linen-texture';
      case 'ruby':
        return 'bg-gradient-to-b from-[#220810] via-[#150308] to-[#0A0104] text-rose-50 border-[#D4AF37]/50 card-linen-dark';
      case 'royal':
        return 'bg-gradient-to-b from-[#0B1736] via-[#060D20] to-[#030610] text-blue-50 border-[#D4AF37]/50 card-linen-dark';
      case 'emerald':
        return 'bg-gradient-to-b from-[#08241C] via-[#04140F] to-[#020A07] text-emerald-50 border-[#D4AF37]/50 card-linen-dark';
      case 'violet':
        return 'bg-gradient-to-b from-[#1E0F38] via-[#0E061D] to-[#06020D] text-purple-50 border-[#D4AF37]/50 card-linen-dark';
      case 'gold':
        return 'bg-gradient-to-b from-[#2E2208] via-[#181102] to-[#0A0701] text-amber-50 border-[#D4AF37]/70 card-linen-dark';
      case 'midnight':
      case 'dark':
      default:
        return 'bg-gradient-to-b from-[#0F1B33] via-[#080E1C] to-[#040810] text-[#E4E3E0] border-[#D4AF37]/45 card-linen-dark';
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
        return 'w-full max-w-md min-h-[480px] p-6 rounded-[24px]';
      case 'xl':
        return 'w-full max-w-2xl min-h-[560px] p-8 rounded-[24px]';
      case 'custom':
      default:
        return 'p-6 md:p-8 rounded-[24px]';
    }
  };

  const isLightFace = themeColor === 'cream' || themeColor === 'ivory';
  const effectivePipColor = isRed ? 'text-[#DC2626]' : (isLightFace ? 'text-[#18181B]' : 'text-[#F4EFE6]');

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
          y: isHovered && interactive ? -8 : 0,
          scale: isHovered && interactive ? 1.02 : 1,
        }}
        transition={{
          rotateY: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
          y: { duration: 0.25 },
          scale: { duration: 0.25 },
        }}
        className={`relative w-full h-full preserve-3d transition-all duration-300 ${
          isHovered
            ? 'card-physical-depth-hover shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]'
            : 'card-physical-depth'
        }`}
      >
        {/* ========================================================
            CARD FRONT (AUTHENTIC LUXURY CASINO FINISH)
           ======================================================== */}
        <div
          className={`relative w-full h-full backface-hidden border-[1.5px] overflow-hidden flex flex-col justify-between ${getCardFaceStyles()} ${getSizeStyles()}`}
          style={{
            boxShadow: glowColor ? `0 0 35px ${glowColor}` : undefined,
          }}
        >
          {/* Ornate Gold Foil Outer Frame */}
          <div className="absolute inset-2 md:inset-3 pointer-events-none border border-[#D4AF37]/50 rounded-[18px] shadow-[0_0_1px_#D4AF37]" />
          <div className="absolute inset-[10px] md:inset-[14px] pointer-events-none border border-[#D4AF37]/25 rounded-[14px]" />

          {/* Corner Filigree Ornaments */}
          <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/80 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/80 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/80 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/80 rounded-br-sm pointer-events-none" />

          {/* Dynamic Specular Holographic Glare Layer */}
          {enableTilt && (
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-300 holographic-glare"
              style={{
                background: `radial-gradient(circle 350px at ${glareX} ${glareY}, rgba(255, 235, 170, 0.28) 0%, rgba(255,255,255,0.08) 40%, transparent 80%)`,
                opacity: isHovered ? 1 : 0,
              }}
            />
          )}

          {/* TOP LEFT CORNER INDEX (RANK & SUIT) */}
          <div className="relative z-10 flex flex-col items-center w-fit leading-none select-none pl-0.5 pt-0.5">
            <span className={`font-cinzel text-2xl md:text-3xl font-black drop-shadow-sm ${effectivePipColor}`}>
              {rank}
            </span>
            <SuitIcon suit={suit} size={18} className="mt-1 drop-shadow-sm" />
          </div>

          {/* CENTER CONTENT */}
          <div className="relative z-10 my-auto w-full px-2 py-3">
            {children}
          </div>

          {/* BOTTOM RIGHT CORNER INDEX (ROTATED 180 DEG) */}
          <div className="relative z-10 flex flex-col items-center w-fit leading-none select-none self-end rotate-180 pr-0.5 pb-0.5">
            <span className={`font-cinzel text-2xl md:text-3xl font-black drop-shadow-sm ${effectivePipColor}`}>
              {rank}
            </span>
            <SuitIcon suit={suit} size={18} className="mt-1 drop-shadow-sm" />
          </div>

          {/* Flip Hint Indicator */}
          {onFlip && (
            <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none opacity-70 hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#D4AF37] bg-[#050B18]/80 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30 shadow-md">
                ↻ CLICK TO FLIP
              </span>
            </div>
          )}
        </div>

        {/* ========================================================
            CARD BACK (ORANATE BICYCLE / ROYAL GUILLOCHÉ BACK)
           ======================================================== */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 border-[1.5px] border-[#D4AF37]/70 rounded-[24px] overflow-hidden bg-gradient-to-br from-[#0F1B33] via-[#091020] to-[#160B1C] p-6 flex flex-col items-center justify-between text-[#E4E3E0] card-physical-depth`}
        >
          {/* Ornate Guilloché Card Back Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `
                radial-gradient(circle at center, #D4AF37 1.5px, transparent 1.5px),
                repeating-linear-gradient(45deg, rgba(212,175,55,0.12) 0px, rgba(212,175,55,0.12) 2px, transparent 2px, transparent 12px),
                repeating-linear-gradient(-45deg, rgba(212,175,55,0.12) 0px, rgba(212,175,55,0.12) 2px, transparent 2px, transparent 12px)
              `,
              backgroundSize: '24px 24px, 24px 24px, 24px 24px',
            }}
          />

          <div className="absolute inset-2 border-2 border-[#D4AF37]/50 rounded-[18px] pointer-events-none" />
          <div className="absolute inset-3.5 border border-[#D4AF37]/25 rounded-[14px] pointer-events-none" />

          {backContent ? (
            <div className="relative z-10 w-full h-full p-2 flex flex-col justify-between overflow-y-auto">
              {backContent}
            </div>
          ) : (
            <>
              {/* Top back index */}
              <div className="relative z-10 flex items-center justify-between w-full text-[#D4AF37] font-cinzel text-xs px-2 tracking-widest">
                <span>♠ THE DECK</span>
                <span>♥ ♦ ♣</span>
              </div>

              {/* Center Monogram Royal Seal */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-[#050B18]/95 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <div className="w-18 h-18 rounded-full border border-[#D4AF37]/60 flex items-center justify-center">
                    <span className="font-cinzel text-3xl font-black text-[#D4AF37] tracking-tighter">
                      SB
                    </span>
                  </div>
                </div>
                <p className="mt-3.5 font-cinzel text-sm tracking-[0.25em] text-[#FFF6D6] uppercase font-bold">
                  Santhosh Balaji
                </p>
                <p className="font-mono-code text-[10px] text-amber-300/80 tracking-widest mt-1 uppercase">
                  ARCHITECT OF CODE • 2026
                </p>
              </div>

              {/* Bottom back index */}
              <div className="relative z-10 flex items-center justify-between w-full text-[#D4AF37] font-cinzel text-xs px-2 rotate-180 tracking-widest">
                <span>♠ THE DECK</span>
                <span>♥ ♦ ♣</span>
              </div>
            </>
          )}

          {/* Flip back indicator */}
          <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none opacity-70">
            <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#D4AF37] bg-[#050B18]/80 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30 shadow-md">
              ↻ CLICK TO RETURN
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
