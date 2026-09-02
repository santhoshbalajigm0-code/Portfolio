import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NAV_CARDS } from '../data/portfolioData';
import { SuitIcon } from './SuitIcon';
import { cardAudio } from '../utils/audio';
import { Layers, Volume2, VolumeX, Menu, X, Sparkles, ChevronDown } from 'lucide-react';

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
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCardClick = (id: string) => {
    cardAudio.playDeal();
    onSelectSection(id);
    setIsDeckOpen(false);
    setIsMobileMenuOpen(false);
  };

  const currentNav = NAV_CARDS.find((c) => c.id === activeSection) || NAV_CARDS[0];

  return (
    <>
      {/* ========================================================
          TOP LUXURY HEADER BAR (FIXED & HIGH-Z-INDEX)
         ======================================================== */}
      <header className="fixed top-0 inset-x-0 z-50 px-4 md:px-8 py-3 bg-[#050B18]/85 backdrop-blur-md border-b border-[#D4AF37]/25 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Brand Monogram & Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => onSelectSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFF6D6] via-[#D4AF37] to-[#8C6B17] text-[#0A0E1A] font-cinzel font-black text-base flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-[#FFFDD0] group-hover:scale-105 transition-transform">
              SB
            </div>
            <div>
              <div className="font-cinzel text-lg md:text-xl font-serif tracking-[0.2em] uppercase font-bold text-[#D4AF37] leading-tight group-hover:text-amber-200 transition-colors">
                The Deck
              </div>
              <div className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#E4E3E0]/70 font-mono-code">
                Santhosh Balaji • Portfolio
              </div>
            </div>
          </motion.div>

          {/* Center: Desktop Active Section & Fan Deck Trigger */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick section indicators */}
            <div className="flex items-center gap-1 bg-[#081120]/90 border border-[#D4AF37]/30 rounded-full px-3 py-1.5 shadow-inner">
              <span className="text-[11px] font-mono-code text-[#D4AF37] mr-1">HAND:</span>
              {NAV_CARDS.slice(0, 5).map((card) => {
                const isActive = activeSection === card.id;
                return (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`px-2.5 py-1 rounded-full font-cinzel text-xs transition-all flex items-center gap-1 cursor-pointer ${
                      isActive
                        ? 'bg-[#D4AF37] text-black font-black shadow-[0_0_10px_rgba(212,175,55,0.6)]'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                    }`}
                  >
                    <span>{card.rank}</span>
                    <SuitIcon suit={card.suit} size={10} />
                    <span className="hidden lg:inline text-[10px]">{card.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Open Full 3D Fan Deck Button */}
            <button
              onClick={() => {
                cardAudio.playDeal();
                setIsDeckOpen(!isDeckOpen);
              }}
              className={`px-4 py-2 rounded-full font-cinzel text-xs tracking-wider flex items-center gap-2 border transition-all cursor-pointer ${
                isDeckOpen
                  ? 'bg-[#D4AF37] text-black font-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.7)]'
                  : 'bg-[#0a1426] border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]'
              }`}
            >
              <Layers size={14} />
              <span>{isDeckOpen ? 'CLOSE DECK' : 'FAN DECK'}</span>
              <ChevronDown size={13} className={`transition-transform duration-300 ${isDeckOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Right: Audio Control & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleMute}
              aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              data-cursor="CLICK"
              className="p-2.5 rounded-xl bg-[#081120] border border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 transition-all shadow-md cursor-pointer"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open Navigation Menu"
              className="md:hidden p-2.5 rounded-xl bg-[#081120] border border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37] transition-colors shadow-md cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          DESKTOP 3D FAN OVERLAY (WHEN FAN DECK IS CLICKED)
         ======================================================== */}
      <AnimatePresence>
        {isDeckOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#050B18]/95 backdrop-blur-2xl border-b border-[#D4AF37]/40 py-8 px-4 shadow-[0_25px_60px_rgba(0,0,0,0.9)] hidden md:block"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-4 border-b border-[#D4AF37]/30 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#D4AF37]" />
                  <span className="font-cinzel text-xs tracking-widest text-[#D4AF37] font-bold">
                    SELECT A CARD TO DEAL SECTION
                  </span>
                </div>
                <button
                  onClick={() => setIsDeckOpen(false)}
                  className="text-slate-400 hover:text-white text-xs font-mono-code flex items-center gap-1 cursor-pointer"
                >
                  <X size={14} /> ESC
                </button>
              </div>

              {/* 3D Interactive Fanned Cards */}
              <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 pt-2">
                {NAV_CARDS.map((card, idx) => {
                  const isActive = activeSection === card.id;
                  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';

                  return (
                    <motion.div
                      key={card.id}
                      onClick={() => handleCardClick(card.id)}
                      whileHover={{
                        y: -12,
                        scale: 1.08,
                        transition: { duration: 0.2 },
                      }}
                      className={`h-40 rounded-2xl p-2.5 flex flex-col justify-between border-2 transition-all cursor-pointer select-none card-linen-texture ${
                        isActive
                          ? 'border-[#D4AF37] bg-gradient-to-b from-[#FFFDF9] to-[#EAE3CE] shadow-[0_0_25px_rgba(212,175,55,0.7)] scale-105'
                          : 'border-[#D4AF37]/40 bg-gradient-to-b from-[#FDFBF7] to-[#E8E1CD] hover:border-[#D4AF37] hover:shadow-[0_10px_20px_rgba(212,175,55,0.4)]'
                      }`}
                    >
                      {/* Top Corner Index */}
                      <div className="flex items-center justify-between leading-none">
                        <span className={`font-cinzel text-lg font-black ${isRed ? 'text-rose-600' : 'text-slate-900'}`}>
                          {card.rank}
                        </span>
                        <SuitIcon suit={card.suit} size={14} />
                      </div>

                      {/* Center Card Title */}
                      <div className="text-center my-auto">
                        <p className="font-cinzel text-xs font-black tracking-tight text-slate-950 uppercase">
                          {card.label}
                        </p>
                        <p className="font-mono-code text-[9px] text-slate-700 tracking-tighter mt-0.5">
                          {card.sublabel}
                        </p>
                      </div>

                      {/* Bottom Rotated Index */}
                      <div className="flex items-center justify-between leading-none rotate-180">
                        <span className={`font-cinzel text-lg font-black ${isRed ? 'text-rose-600' : 'text-slate-900'}`}>
                          {card.rank}
                        </span>
                        <SuitIcon suit={card.suit} size={14} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          MOBILE FULL-DECK DRAWER
         ======================================================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-16 z-50 md:hidden bg-[#050B18]/95 backdrop-blur-xl border border-[#D4AF37]/40 rounded-2xl p-4 shadow-2xl"
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

            <div className="grid grid-cols-2 gap-2.5 max-h-[65vh] overflow-y-auto pr-1">
              {NAV_CARDS.map((card) => {
                const isActive = activeSection === card.id;
                const isRed = card.suit === 'hearts' || card.suit === 'diamonds';

                return (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all text-left cursor-pointer ${
                      isActive
                        ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-white shadow-md'
                        : 'border-slate-800 bg-[#0c1527] text-slate-300 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <div className="w-9 h-12 rounded-lg border border-[#D4AF37]/40 bg-gradient-to-br from-[#FFFDF9] to-[#EDE7D8] flex flex-col items-center justify-center shrink-0">
                      <span
                        className={`font-cinzel text-xs font-black ${
                          isRed ? 'text-rose-600' : 'text-slate-900'
                        }`}
                      >
                        {card.rank}
                      </span>
                      <SuitIcon suit={card.suit} size={11} />
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
