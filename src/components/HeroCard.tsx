import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PlayingCard } from './PlayingCard';
import { SuitIcon } from './SuitIcon';
import { ArrowDown, Sparkles, FolderGit2, RefreshCw } from 'lucide-react';

interface HeroCardProps {
  onDrawDeck: () => void;
  onViewProjects: () => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({ onDrawDeck, onViewProjects }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section
      id="hero"
      className="min-h-[90vh] md:min-h-[94vh] flex flex-col items-center justify-center pt-24 pb-14 px-4 relative z-10"
    >
      {/* Immersive UI Background Ghost Cards (Angled Left & Right Behind King Card) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Left Ghost Card */}
        <motion.div
          initial={{ opacity: 0, x: -60, rotate: -16 }}
          animate={{ opacity: 0.12, x: 0, rotate: -12 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="hidden md:flex absolute -translate-x-64 w-[310px] h-[450px] bg-[#FFFDD0] border-[6px] border-white/40 rounded-[24px] shadow-2xl flex-col justify-between p-6 select-none"
        >
          <div className="flex flex-col items-start font-cinzel text-3xl font-black text-[#141414]">
            <span>A</span>
            <span className="text-xl">♠</span>
          </div>
          <div className="flex flex-col items-center opacity-30">
            <span className="font-cinzel text-5xl text-[#141414]">♠</span>
          </div>
          <div className="flex flex-col items-start font-cinzel text-3xl font-black text-[#141414] rotate-180 self-end">
            <span>A</span>
            <span className="text-xl">♠</span>
          </div>
        </motion.div>

        {/* Right Ghost Card */}
        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 16 }}
          animate={{ opacity: 0.12, x: 0, rotate: 12 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="hidden md:flex absolute translate-x-64 w-[310px] h-[450px] bg-[#FFFDD0] border-[6px] border-white/40 rounded-[24px] shadow-2xl flex-col justify-between p-6 select-none"
        >
          <div className="flex flex-col items-start font-cinzel text-3xl font-black text-[#DC2626]">
            <span>Q</span>
            <span className="text-xl">♦</span>
          </div>
          <div className="flex flex-col items-center opacity-30">
            <span className="font-cinzel text-5xl text-[#DC2626]">♦</span>
          </div>
          <div className="flex flex-col items-start font-cinzel text-3xl font-black text-[#DC2626] rotate-180 self-end">
            <span>Q</span>
            <span className="text-xl">♦</span>
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-xl md:max-w-2xl relative z-10">
        {/* OVERSIZED HERO PLAYING CARD (K♠) */}
        <PlayingCard
          id="hero-card"
          rank="K"
          suit="spades"
          themeColor="cream"
          size="custom"
          cursorLabel="FLIP"
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped(!isFlipped)}
          className="w-full"
          backContent={
            <div className="h-full flex flex-col justify-between text-center p-4 md:p-6 text-[#E4E3E0]">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-2">
                <span className="font-cinzel text-xs text-[#D4AF37] font-bold">CARD PROFILE • K♠</span>
                <span className="font-mono-code text-[11px] text-emerald-400">STATUS: AVAILABLE</span>
              </div>

              <div className="my-auto space-y-4 py-2">
                <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37]/70 bg-[#050B18] mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.35)]">
                  <span className="font-cinzel text-2xl font-black text-[#D4AF37]">SB</span>
                </div>

                <h3 className="font-cinzel text-xl md:text-2xl font-bold text-amber-100">
                  DEVELOPER DOSSIER
                </h3>

                <p className="text-xs md:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  MCA Graduate from Bishop Heber College with hands-on full-stack development experience, IoT algorithms, and secure biometric authentication architecture.
                </p>

                <div className="grid grid-cols-2 gap-2.5 max-w-sm mx-auto pt-2">
                  <div className="p-2.5 rounded-xl bg-[#050B18] border border-[#D4AF37]/30 text-left">
                    <span className="text-[10px] text-slate-400 block uppercase font-mono-code">Primary Languages</span>
                    <span className="font-cinzel text-xs text-amber-200 font-bold">Python & Java</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#050B18] border border-[#D4AF37]/30 text-left">
                    <span className="text-[10px] text-slate-400 block uppercase font-mono-code">Databases</span>
                    <span className="font-cinzel text-xs text-amber-200 font-bold">SQL & MySQL</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono-code">Click card to flip back</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-cinzel text-[10px] hover:bg-[#D4AF37]/30 flex items-center gap-1.5 cursor-pointer font-bold tracking-wider"
                >
                  <RefreshCw size={11} /> FLIP FRONT
                </button>
              </div>
            </div>
          }
        >
          {/* FRONT FACE OF HERO CARD */}
          <div className="flex flex-col items-center text-center py-4 md:py-8 px-2 md:px-6">
            {/* Top Suit Crown Badge */}
            <div className="flex items-center gap-2 px-4 py-1 rounded-full border border-[#D4AF37]/60 bg-[#141414] text-[#D4AF37] text-xs font-cinzel tracking-widest uppercase mb-4 shadow-md">
              <Sparkles size={12} className="text-[#D4AF37]" />
              <span>THE ROYAL SUIT • KING OF SPADES</span>
              <Sparkles size={12} className="text-[#D4AF37]" />
            </div>

            {/* King Filigree Centerpiece Graphic */}
            <div className="relative my-2 w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
              {/* Ornate Gold Ring with Spades */}
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/50" />
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-[#141414] shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                <div className="flex flex-col items-center">
                  <SuitIcon suit="spades" size={32} className="text-[#D4AF37] drop-shadow-md" />
                  <span className="font-cinzel text-[10px] font-black text-[#D4AF37] tracking-tighter mt-0.5">
                    K♠
                  </span>
                </div>
              </div>
            </div>

            {/* Candidate Name */}
            <h1 className="font-cinzel text-3xl md:text-5xl font-black tracking-wide text-[#141414] mt-4">
              {PERSONAL_INFO.name}
            </h1>

            {/* Degree & Role */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-md bg-[#141414] text-[#D4AF37] font-cinzel text-xs md:text-sm font-bold tracking-widest border border-[#D4AF37]/40 shadow-sm">
                MCA GRADUATE
              </span>
              <span className="text-[#141414]/50">•</span>
              <span className="px-3 py-1 rounded-md bg-[#141414] text-white font-cinzel text-xs md:text-sm font-bold tracking-widest border border-slate-700 shadow-sm">
                SOFTWARE DEVELOPER
              </span>
            </div>

            {/* Small supporting tech tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {['Python', 'Java', 'SQL', 'Web Technologies'].map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-[#141414] text-[#FAF7F0] text-[10px] uppercase font-mono-code tracking-wider rounded-md border border-slate-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4 w-full max-w-md">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDrawDeck();
                }}
                className="flex-1 min-w-[150px] px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#DFBF55] to-[#B38F24] text-[#141414] font-cinzel font-black text-xs tracking-widest uppercase shadow-[0_10px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_35px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#FFFDD0]/60"
              >
                <span>♠</span>
                <span>DRAW MY DECK</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onViewProjects();
                }}
                className="flex-1 min-w-[150px] px-5 py-3.5 rounded-xl bg-[#141414] border-2 border-[#D4AF37] text-[#D4AF37] font-cinzel font-bold text-xs tracking-widest uppercase hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <FolderGit2 size={15} className="text-[#D4AF37]" />
                <span>VIEW PROJECTS</span>
              </motion.button>
            </div>

            <p className="font-card italic text-[#141414]/70 text-xs mt-4">
              Click anywhere on this card to flip for dossier
            </p>
          </div>
        </PlayingCard>

        {/* Immersive UI Bottom Gold Ribbon */}
        <div className="mt-6 flex justify-center">
          <div className="bg-[#D4AF37] text-[#141414] px-6 py-2 rounded-full font-cinzel font-black text-xs tracking-[0.2em] shadow-[0_10px_25px_rgba(212,175,55,0.35)] uppercase border border-[#FFFDD0]/80">
            EVERY CARD TELLS A STORY
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <motion.button
        onClick={onDrawDeck}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-8 flex flex-col items-center gap-1 text-[#E4E3E0]/60 hover:text-[#D4AF37] transition-colors cursor-pointer group"
      >
        <span className="font-cinzel text-[10px] tracking-widest text-[#E4E3E0]/70 group-hover:text-[#D4AF37]">
          DEAL THE HAND
        </span>
        <ArrowDown size={16} className="text-[#D4AF37]" />
      </motion.button>
    </section>
  );
};

