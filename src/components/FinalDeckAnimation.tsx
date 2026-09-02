import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cardAudio } from '../utils/audio';
import { SuitIcon } from './SuitIcon';
import { Sparkles, RefreshCw, ArrowUp } from 'lucide-react';

interface FinalDeckAnimationProps {
  onReshuffle: () => void;
}

export const FinalDeckAnimation: React.FC<FinalDeckAnimationProps> = ({ onReshuffle }) => {
  const [isGathered, setIsGathered] = useState(false);

  const handleGather = () => {
    cardAudio.playStack();
    setIsGathered(true);
  };

  const handleReshuffleClick = () => {
    cardAudio.playShuffle();
    setIsGathered(false);
    onReshuffle();
  };

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto text-center relative z-10 border-t border-amber-500/20">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-300 font-cinzel text-xs tracking-widest uppercase mb-2">
          <span>♠</span> THE SPECIAL COLLECTOR CARD <span>♠</span>
        </div>
        <h2 className="font-cinzel text-3xl md:text-4xl font-extrabold text-slate-100 tracking-wider">
          COLLECT & RESHUFFLE
        </h2>
        <p className="font-card italic text-slate-400 text-xs md:text-sm mt-1">
          Gather the dealt hand back into a pristine deck box.
        </p>
      </div>

      {/* GATHERED DECK BOX DISPLAY */}
      <div className="relative w-64 h-88 md:w-72 md:h-96 mx-auto flex items-center justify-center my-6 perspective-1500">
        {/* Flying cards coming into center */}
        {[-15, -8, 0, 8, 15].map((angle, idx) => (
          <motion.div
            key={idx}
            animate={{
              rotateZ: isGathered ? 0 : angle,
              x: isGathered ? 0 : angle * 3,
              y: isGathered ? (idx - 2) * -3 : Math.abs(angle) * 1.5,
              scale: isGathered ? 1 : 0.96,
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="absolute inset-0 rounded-2xl border border-amber-500/30 bg-[#0a101d] shadow-xl overflow-hidden pointer-events-none"
            style={{ zIndex: idx }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, rgba(212,175,55,0.1) 0px, rgba(212,175,55,0.1) 2px, transparent 2px, transparent 8px)`,
              }}
            />
          </motion.div>
        ))}

        {/* TOP COLLECTOR CARD: S♠ */}
        <motion.div
          animate={{
            y: isGathered ? -10 : 0,
            scale: isGathered ? 1.05 : 1,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative z-20 w-full h-full rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-[#18233c] via-[#0d1527] to-[#080d18] p-5 flex flex-col justify-between shadow-[0_0_40px_rgba(212,175,55,0.35)] select-none"
        >
          {/* Inner border */}
          <div className="absolute inset-2 border border-amber-400/40 rounded-xl pointer-events-none" />
          <div className="absolute inset-3 border border-amber-400/20 rounded-lg pointer-events-none" />

          {/* Top Index */}
          <div className="relative z-10 flex items-center justify-between leading-none">
            <span className="font-cinzel text-xl font-black text-amber-300">S</span>
            <SuitIcon suit="spades" size={18} />
          </div>

          {/* Center Card Content */}
          <div className="relative z-10 my-auto text-center px-2">
            <div className="w-16 h-16 rounded-full border-2 border-amber-400/60 bg-[#060a14] mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] mb-3">
              <span className="font-cinzel text-2xl font-black text-amber-300">SB</span>
            </div>

            <span className="font-mono-code text-[10px] text-amber-400 uppercase tracking-widest block font-bold">
              THE DEVELOPER'S DECK
            </span>

            <h3 className="font-cinzel text-xl md:text-2xl font-black text-slate-100 mt-1">
              THANK YOU FOR VISITING
            </h3>

            <p className="font-cinzel text-sm text-amber-200 mt-1">
              SANTHOSH BALAJI G
            </p>

            <p className="font-card italic text-xs text-slate-300 mt-2">
              “Every card tells a part of my story.”
            </p>
          </div>

          {/* Bottom Index */}
          <div className="relative z-10 flex items-center justify-between leading-none rotate-180">
            <span className="font-cinzel text-xl font-black text-amber-300">S</span>
            <SuitIcon suit="spades" size={18} />
          </div>
        </motion.div>
      </div>

      {/* ACTION CONTROLS */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {!isGathered ? (
          <button
            onClick={handleGather}
            className="px-6 py-3 rounded-xl border border-amber-400/50 bg-[#0a101d] text-amber-200 font-cinzel font-bold text-xs tracking-widest uppercase hover:bg-amber-500/10 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>♠</span>
            <span>GATHER DECK</span>
            <span>♠</span>
          </button>
        ) : null}

        <button
          onClick={handleReshuffleClick}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-cinzel font-bold text-xs tracking-widest uppercase shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.7)] transition-all flex items-center gap-2.5 cursor-pointer"
        >
          <RefreshCw size={14} className="animate-spin-slow" />
          <span>RESHUFFLE THE DECK</span>
        </button>

        <button
          onClick={() => {
            cardAudio.playDeal();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-5 py-3 rounded-xl border border-slate-700 bg-[#080d18] text-slate-300 font-cinzel text-xs hover:text-amber-300 hover:border-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowUp size={14} />
          <span>BACK TO TOP</span>
        </button>
      </div>

      <footer className="mt-16 text-center text-xs text-slate-500 font-mono-code">
        <p>THE DECK • SANTHOSH BALAJI G • MCA GRADUATE & SOFTWARE DEVELOPER</p>
        <p className="text-[10px] text-slate-600 mt-1">
          Designed with Luxury Playing Cards × React & TypeScript
        </p>
      </footer>
    </section>
  );
};
