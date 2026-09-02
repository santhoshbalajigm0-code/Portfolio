import React from 'react';
import { motion } from 'motion/react';
import { HOBBIES } from '../data/portfolioData';
import { SuitIcon } from './SuitIcon';
import { cardAudio } from '../utils/audio';
import { Activity, Zap, Target } from 'lucide-react';

export const HobbiesHand: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity size={28} className="text-white" />;
      case 'Zap':
        return <Zap size={28} className="text-white" />;
      case 'Target':
      default:
        return <Target size={28} className="text-white" />;
    }
  };

  return (
    <section id="hobbies" className="py-20 px-4 max-w-5xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-950/40 text-rose-300 font-cinzel text-xs tracking-widest uppercase mb-2">
          <span>♥</span> 8 OF HEARTS • PERSONAL HAND & ATHLETICS <span>♥</span>
        </div>
        <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-slate-100 tracking-wider">
          8♥ — PERSONAL HAND
        </h2>
        <p className="font-card italic text-slate-400 text-sm md:text-base mt-1">
          Athleticism, tactical strategy, and focus beyond the IDE.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {HOBBIES.map((hobby, index) => {
          const isRed = hobby.suit === 'hearts' || hobby.suit === 'diamonds';

          return (
            <motion.div
              key={hobby.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -12,
                rotateZ: (index - 1) * 3,
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              onMouseEnter={() => cardAudio.playHover()}
              className="relative h-[320px] rounded-2xl border-2 border-slate-700/60 p-4 flex flex-col justify-between shadow-2xl cursor-pointer overflow-hidden select-none bg-gradient-to-b from-[#12182b] to-[#0a0f1d] hover:border-amber-400 transition-colors"
            >
              {/* Colorful gradient glow background */}
              <div
                className={`absolute inset-0 opacity-20 bg-gradient-to-br ${hobby.color} pointer-events-none`}
              />

              {/* Inner card border */}
              <div className="absolute inset-2 border border-slate-500/20 rounded-xl pointer-events-none" />

              {/* Top Index */}
              <div className="relative z-10 flex items-center justify-between leading-none">
                <span
                  className={`font-cinzel text-xl font-black ${
                    isRed ? 'text-rose-500' : 'text-slate-200'
                  }`}
                >
                  8
                </span>
                <SuitIcon suit={hobby.suit} size={18} />
              </div>

              {/* Center Content */}
              <div className="relative z-10 text-center my-auto flex flex-col items-center px-2">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${hobby.color} flex items-center justify-center shadow-lg mb-3`}
                >
                  {getIcon(hobby.icon)}
                </div>
                <h3 className="font-cinzel text-2xl font-black text-slate-100">
                  {hobby.title}
                </h3>
                <span className="font-mono-code text-[11px] text-amber-300 font-bold uppercase tracking-wider mt-0.5">
                  {hobby.category}
                </span>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {hobby.tagline}
                </p>
              </div>

              {/* Bottom Index */}
              <div className="relative z-10 flex items-center justify-between leading-none rotate-180">
                <span
                  className={`font-cinzel text-xl font-black ${
                    isRed ? 'text-rose-500' : 'text-slate-200'
                  }`}
                >
                  8
                </span>
                <SuitIcon suit={hobby.suit} size={18} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
