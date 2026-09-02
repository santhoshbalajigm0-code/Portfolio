import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NAV_CARDS } from '../data/portfolioData';
import { SuitIcon } from './SuitIcon';
import { cardAudio } from '../utils/audio';
import { Layers, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';

interface CardFanNavProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const CardFanNav: React.FC<CardFanNavProps> = ({
  activeSection,
  onSelectSection,
  isMuted,
  onToggleMute,
}) => {
  const [isFanned, setIsFanned] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCardClick = (id: string) => {
    cardAudio.playDeal();
    onSelectSection(id);
    setIsMobileMenuOpen(false);
  };

  const handleFanToggle = () => {
    cardAudio.playDeal();
    setIsFanned((prev) => !prev);
  };

  return (
    <>
      {/* TOP DESKTOP INTERACTIVE FAN DECK & IMMERSIVE HEADER */}
      <header className="fixed top-3 inset-x-0 z-40 px-4 md:px-8 pointer-events-none flex justify-between items-start max-w-7xl mx-auto">
        {/* Left Brand Emblem & Title from Immersive UI */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto flex items-center gap-3 bg-[#050B18]/90 backdrop-blur-md border border-[#D4AF37]/35 px-4 py-2 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
        >
          <div className="w-9 h-9 rounded-xl bg-[#D4AF37] text-[#141414] font-cinzel font-black text-sm flex items-center justify-center shadow-md border border-[#FFFDD0]/60">
            SB
          </div>
          <div>
            <div className="font-cinzel text-lg md:text-xl font-serif tracking-[0.2em] uppercase italic text-[#D4AF37] leading-tight">
              The Deck
            </div>
            <div className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#E4E3E0]/70 font-mono-code">
              Santhosh Balaji — Developer Portfolio
            </div>
          </div>
        </motion.div>

        {/* CENTER DESKTOP CARD FAN */}
        <div
          className="hidden md:flex flex-col items-center pointer-events-auto"
          onMouseEnter={() => {
            if (!isFanned) {
              cardAudio.playHover();
              setIsFanned(true);
            }
          }}
          onMouseLeave={() => setIsFanned(false)}
        >
          {/* Deck Handle / Fan Toggle */}
          <button
            onClick={handleFanToggle}
            data-cursor="DEAL"
            className="mb-2 px-4 py-1.5 rounded-full bg-[#050B18]/90 border border-[#D4AF37]/40 text-[#D4AF37] font-cinzel text-xs tracking-widest flex items-center gap-2 shadow-lg hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all cursor-pointer"
          >
            <Layers size={13} className="text-[#D4AF37]" />
            <span>{isFanned ? 'CLOSE DECK' : 'FAN NAVIGATION DECK'}</span>
          </button>

          {/* Fanning Cards Container */}
          <div className="relative h-28 w-96 flex justify-center items-center perspective-1000">
            {NAV_CARDS.map((card, idx) => {
              const total = NAV_CARDS.length;
              const mid = (total - 1) / 2;
              const offsetFromMid = idx - mid;

              // Compute fan angles & spreads
              const angle = isFanned ? offsetFromMid * 10 : offsetFromMid * 1.5;
              const xOffset = isFanned ? offsetFromMid * 44 : offsetFromMid * 6;
              const yOffset = isFanned ? Math.abs(offsetFromMid) * 4 : 0;
              const isActive = activeSection === card.id;

              const isRed = card.suit === 'hearts' || card.suit === 'diamonds';

              return (
                <motion.div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  data-cursor="DEAL"
                  animate={{
                    x: xOffset,
                    y: isActive ? -14 : yOffset,
                    rotateZ: angle,
                    scale: isActive ? 1.15 : isFanned ? 1.05 : 1,
                    zIndex: isActive ? 30 : isFanned ? 20 - Math.abs(offsetFromMid) : idx,
                  }}
                  whileHover={{
                    y: -20,
                    scale: 1.2,
                    zIndex: 40,
                    transition: { duration: 0.2 },
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 22,
                  }}
                  className={`absolute top-0 w-16 h-24 rounded-xl p-1.5 border-[1.2px] flex flex-col justify-between shadow-md cursor-pointer select-none bg-gradient-to-br from-[#FFFDD0] via-[#FAF7F0] to-[#EFEBD9] ${
                    isActive
                      ? 'border-[#D4AF37] ring-4 ring-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.6)]'
                      : 'border-[#D4AF37]/40 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  }`}
                >
                  {/* Subtle inner card border */}
                  <div className="absolute inset-1 border border-[#D4AF37]/30 rounded-lg pointer-events-none" />

                  {/* Top Corner Pip */}
                  <div className="relative z-10 flex items-center justify-between leading-none">
                    <span
                      className={`font-cinzel text-xs font-black ${
                        isRed ? 'text-[#DC2626]' : 'text-[#141414]'
                      }`}
                    >
                      {card.rank}
                    </span>
                    <SuitIcon suit={card.suit} size={10} />
                  </div>

                  {/* Center Label */}
                  <div className="relative z-10 text-center">
                    <p className="font-cinzel text-[8px] font-black tracking-tight text-[#141414] line-clamp-1">
                      {card.label}
                    </p>
                  </div>

                  {/* Bottom Pip (Rotated) */}
                  <div className="relative z-10 flex items-center justify-between leading-none rotate-180">
                    <span
                      className={`font-cinzel text-xs font-black ${
                        isRed ? 'text-[#DC2626]' : 'text-[#141414]'
                      }`}
                    >
                      {card.rank}
                    </span>
                    <SuitIcon suit={card.suit} size={10} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Action Controls: Audio & Mobile Menu */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Audio toggle button */}
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            data-cursor="OPEN"
            className="p-2.5 rounded-xl bg-[#050B18]/90 border border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors shadow-lg cursor-pointer"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open Navigation Menu"
            className="md:hidden p-2.5 rounded-xl bg-[#050B18]/90 border border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37] transition-colors shadow-lg cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* MOBILE FULL-DECK DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-50 md:hidden bg-[#050B18]/95 backdrop-blur-xl border border-[#D4AF37]/40 rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/25 mb-3">
              <span className="font-cinzel text-xs tracking-widest text-[#D4AF37] font-bold">
                SELECT A CARD FROM THE DECK
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {NAV_CARDS.map((card) => {
                const isActive = activeSection === card.id;
                const isRed = card.suit === 'hearts' || card.suit === 'diamonds';

                return (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all text-left ${
                      isActive
                        ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-white shadow-md'
                        : 'border-slate-800 bg-[#0c1527] text-slate-300 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <div className="w-9 h-11 rounded-lg border border-[#D4AF37]/40 bg-gradient-to-br from-[#FFFDD0] to-[#FAF7F0] flex flex-col items-center justify-center shrink-0">
                      <span
                        className={`font-cinzel text-xs font-black ${
                          isRed ? 'text-[#DC2626]' : 'text-[#141414]'
                        }`}
                      >
                        {card.rank}
                      </span>
                      <SuitIcon suit={card.suit} size={10} />
                    </div>
                    <div>
                      <div className="font-cinzel text-xs font-bold text-amber-200">
                        {card.label}
                      </div>
                      <div className="text-[10px] text-slate-400">{card.sublabel}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

