import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cardAudio } from '../utils/audio';

interface OpeningDeckModalProps {
  onComplete: () => void;
}

export const OpeningDeckModal: React.FC<OpeningDeckModalProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'idle' | 'lifting' | 'shuffling' | 'fanning' | 'revealing' | 'done'>('idle');

  const handleDraw = () => {
    if (stage !== 'idle') return;
    setStage('lifting');
    cardAudio.playDeal();

    setTimeout(() => {
      setStage('shuffling');
      cardAudio.playShuffle();
    }, 400);

    setTimeout(() => {
      setStage('fanning');
      cardAudio.playDeal();
    }, 1100);

    setTimeout(() => {
      setStage('revealing');
      cardAudio.playFlip();
    }, 1700);

    setTimeout(() => {
      setStage('done');
      onComplete();
    }, 2400);
  };

  const handleSkip = () => {
    cardAudio.playFlip();
    setStage('done');
    onComplete();
  };

  if (stage === 'done') return null;

  // Deck stack array for realistic shuffling/fanning cards
  const deckCards = [
    { rank: 'K', suit: '♠', angle: -12, color: 'text-slate-100', offset: -16 },
    { rank: 'Q', suit: '♦', angle: -6, color: 'text-rose-500', offset: -8 },
    { rank: 'J', suit: '♥', angle: 0, color: 'text-rose-500', offset: 0 },
    { rank: '10', suit: '♠', angle: 6, color: 'text-slate-100', offset: 8 },
    { rank: 'A', suit: '♠', angle: 12, color: 'text-amber-400', offset: 16 },
  ];

  return (
    <AnimatePresence>
      <motion.div
        key="opening-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070b14]/95 backdrop-blur-md px-4 overflow-hidden"
      >
        {/* Ambient table glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-rose-500/10 blur-[100px] pointer-events-none" />

        {/* Skip button top right */}
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={handleSkip}
            className="px-4 py-1.5 rounded-full border border-amber-500/30 text-amber-300 text-xs font-cinzel hover:bg-amber-500/10 transition-colors tracking-wider flex items-center gap-1.5 cursor-pointer"
          >
            SKIP INTRO <span className="text-[10px]">▶</span>
          </button>
        </div>

        {/* Header Title Information */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-300 font-cinzel text-[11px] tracking-widest uppercase mb-3">
            <span>♠</span> LUXURY DEVELOPER'S DECK <span>♠</span>
          </div>
          <h1 className="font-cinzel text-4xl md:text-6xl font-extrabold tracking-wider bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent drop-shadow-sm">
            THE DECK
          </h1>
          <p className="font-cinzel text-lg md:text-xl text-slate-200 tracking-widest mt-1">
            SANTHOSH BALAJI G
          </p>
          <p className="font-mono-code text-xs text-amber-400/80 tracking-widest uppercase mt-1">
            MCA GRADUATE • SOFTWARE DEVELOPER
          </p>
        </motion.div>

        {/* CENTRAL INTERACTIVE CARD DECK STACK */}
        <div className="relative w-64 h-92 md:w-72 md:h-[420px] flex items-center justify-center my-4 perspective-1500">
          {deckCards.map((card, index) => {
            let animateProps: any = {
              x: (index - 2) * 4,
              y: (index - 2) * -3,
              rotateZ: (index - 2) * 2,
              scale: 1,
            };

            if (stage === 'lifting') {
              animateProps = {
                x: 0,
                y: -40,
                rotateZ: 0,
                scale: 1.05,
              };
            } else if (stage === 'shuffling') {
              const shuffleOffsets = [-70, 70, -40, 40, 0];
              animateProps = {
                x: shuffleOffsets[index],
                y: -20 + (index % 2) * 20,
                rotateZ: (index - 2) * 8,
                scale: 1.02,
              };
            } else if (stage === 'fanning') {
              animateProps = {
                x: (index - 2) * 65,
                y: Math.abs(index - 2) * 15 - 20,
                rotateZ: (index - 2) * 14,
                scale: 1,
              };
            } else if (stage === 'revealing') {
              if (index === 4) {
                // Top Ace Card deals toward user
                animateProps = {
                  x: 0,
                  y: -30,
                  rotateZ: 0,
                  scale: 1.25,
                  rotateY: 180,
                };
              } else {
                animateProps = {
                  x: (index - 2) * 120,
                  y: 100,
                  rotateZ: (index - 2) * 25,
                  opacity: 0,
                  scale: 0.8,
                };
              }
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{
                  opacity: 1,
                  ...animateProps,
                }}
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 rounded-2xl border-2 border-[#d4af37]/60 shadow-[0_15px_35px_rgba(0,0,0,0.7)] overflow-hidden preserve-3d"
                style={{
                  zIndex: index,
                  backgroundColor: '#0c1322',
                }}
              >
                {/* Guilloché back pattern */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at center, #d4af37 1px, transparent 1px),
                      repeating-linear-gradient(45deg, rgba(212,175,55,0.1) 0px, rgba(212,175,55,0.1) 2px, transparent 2px, transparent 8px)
                    `,
                    backgroundSize: '16px 16px',
                  }}
                />

                {/* Inner gold foil border */}
                <div className="absolute inset-2 border border-amber-400/40 rounded-xl" />
                <div className="absolute inset-3 border border-amber-400/20 rounded-lg" />

                {/* Corner pips */}
                <div className="absolute top-3 left-3 flex flex-col items-center">
                  <span className={`font-cinzel text-lg font-bold ${card.color}`}>{card.rank}</span>
                  <span className={`text-xs ${card.color}`}>{card.suit}</span>
                </div>

                {/* Center Monogram */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-amber-400/50 flex items-center justify-center bg-[#070b14]/70 shadow-inner">
                    <span className="font-cinzel text-xl font-black text-amber-300">SB</span>
                  </div>
                  <span className="font-cinzel text-[10px] tracking-widest text-amber-200/70 mt-2">
                    SANTHOSH BALAJI
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 flex flex-col items-center rotate-180">
                  <span className={`font-cinzel text-lg font-bold ${card.color}`}>{card.rank}</span>
                  <span className={`text-xs ${card.color}`}>{card.suit}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Button & Supporting Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mt-6 relative z-10 flex flex-col items-center"
        >
          <motion.button
            onClick={handleDraw}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={stage !== 'idle'}
            className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-cinzel font-bold text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.7)] transition-all flex items-center gap-3 cursor-pointer"
          >
            <span>♠</span>
            <span>{stage === 'idle' ? 'DRAW MY CARD' : 'SHUFFLING THE DECK...'}</span>
            <span>♠</span>
          </motion.button>

          <p className="font-garamond italic text-slate-300 text-sm md:text-base mt-4 tracking-wide">
            “Every card tells a part of my story.”
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
