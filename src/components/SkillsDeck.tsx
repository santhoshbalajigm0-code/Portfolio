import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TECHNICAL_SKILLS, SOFT_SKILLS } from '../data/portfolioData';
import { SkillItem } from '../types';
import { SuitIcon } from './SuitIcon';
import { cardAudio } from '../utils/audio';
import { Sparkles, Terminal, ShieldCheck } from 'lucide-react';

export const SkillsDeck: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'core' | 'backend' | 'web' | 'database'>('all');

  const filteredSkills = filter === 'all'
    ? TECHNICAL_SKILLS
    : TECHNICAL_SKILLS.filter((s) => s.category === filter);

  return (
    <section id="skills" className="py-20 px-4 max-w-6xl mx-auto relative z-10">
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 font-cinzel text-xs tracking-widest uppercase mb-2">
          <span>♣</span> KING OF CLUBS • ARSENAL OF EXPERTISE <span>♣</span>
        </div>
        <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-slate-100 tracking-wider">
          K♣ — THE TOOLKIT
        </h2>
        <p className="font-card italic text-slate-400 text-sm md:text-base mt-1">
          Technical mastery & software craftsmanship. Hover or tap to inspect each card.
        </p>

        {/* Category Filters Styled as Mini Deck Suits */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {[
            { id: 'all', label: 'FULL DECK', icon: '♣' },
            { id: 'core', label: 'LANGUAGES (Python/Java)', icon: '♠' },
            { id: 'backend', label: 'FRAMEWORKS (Spring Boot/Flask)', icon: '♦' },
            { id: 'database', label: 'DATABASES (SQL/MySQL)', icon: '♦' },
            { id: 'web', label: 'WEB (HTML/CSS/JS)', icon: '♥' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                cardAudio.playDeal();
                setFilter(tab.id as any);
              }}
              className={`px-3.5 py-1.5 rounded-lg font-cinzel text-xs tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                filter === tab.id
                  ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-[#0b1420] border border-slate-800 text-slate-400 hover:border-emerald-500/40 hover:text-slate-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MINIATURE PLAYING CARDS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {filteredSkills.map((skill, index) => {
          const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6'];
          const rank = ranks[index % ranks.length];
          const isRed = skill.suit === 'hearts' || skill.suit === 'diamonds';

          return (
            <motion.div
              key={skill.name}
              data-cursor="DRAW"
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{
                y: -10,
                rotateZ: (index % 2 === 0 ? 1 : -1) * 2,
                scale: 1.04,
                transition: { duration: 0.2 },
              }}
              onClick={() => {
                cardAudio.playDeal();
                setSelectedSkill(skill);
              }}
              onMouseEnter={() => cardAudio.playHover()}
              className="relative group h-48 md:h-56 rounded-xl border-[1.5px] border-emerald-500/30 bg-gradient-to-b from-[#0e1d24] to-[#071015] p-3 flex flex-col justify-between shadow-lg cursor-pointer overflow-hidden select-none hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.25)] transition-colors"
            >
              {/* Card Paper Texture overlay */}
              <div className="absolute inset-0 opacity-20 card-pattern-overlay pointer-events-none" />

              {/* Inner border */}
              <div className="absolute inset-1.5 border border-emerald-400/20 rounded-lg pointer-events-none group-hover:border-emerald-400/40 transition-colors" />

              {/* Top Left Index */}
              <div className="relative z-10 flex items-center justify-between leading-none">
                <span className={`font-cinzel text-base font-black ${isRed ? 'text-rose-500' : 'text-emerald-400'}`}>
                  {rank}
                </span>
                <SuitIcon suit={skill.suit} size={14} />
              </div>

              {/* Center Skill Graphic */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-1">
                <div className="w-12 h-12 rounded-xl border border-emerald-400/30 bg-[#050b0e] flex items-center justify-center shadow-inner group-hover:border-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                  <Terminal size={20} className="text-emerald-300" />
                </div>
                <h3 className="font-cinzel text-base md:text-lg font-bold text-slate-100 mt-2 tracking-wide group-hover:text-emerald-200 transition-colors">
                  {skill.name}
                </h3>
                <span className="font-mono-code text-[10px] text-emerald-400/80 uppercase tracking-widest mt-0.5">
                  {skill.levelText}
                </span>
              </div>

              {/* Bottom Right Index */}
              <div className="relative z-10 flex items-center justify-between leading-none rotate-180">
                <span className={`font-cinzel text-base font-black ${isRed ? 'text-rose-500' : 'text-emerald-400'}`}>
                  {rank}
                </span>
                <SuitIcon suit={skill.suit} size={14} />
              </div>

              {/* Hover Glow Pill */}
              <div className="absolute bottom-1 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity text-center z-20">
                <span className="text-[9px] font-mono-code text-emerald-300 bg-emerald-950/90 border border-emerald-400/40 px-2 py-0.5 rounded-full">
                  TAP TO INSPECT
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* SKILL INSPECTOR MODAL / FLYOUT CARD */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border-2 border-emerald-400 bg-gradient-to-b from-[#0c1e19] to-[#060e0c] p-6 shadow-[0_0_50px_rgba(16,185,129,0.3)] text-slate-100 relative overflow-hidden"
            >
              {/* Inner card border */}
              <div className="absolute inset-2 border border-emerald-400/30 rounded-xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <SuitIcon suit={selectedSkill.suit} size={20} />
                  <span className="font-cinzel text-sm font-bold text-emerald-300">
                    SKILL CARD ARCHIVE
                  </span>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-2 py-1 rounded-md text-xs font-mono-code text-slate-400 hover:text-white bg-[#040807] border border-slate-700 cursor-pointer"
                >
                  ESC / CLOSE ✕
                </button>
              </div>

              <div className="text-center py-2">
                <div className="w-16 h-16 rounded-2xl border-2 border-emerald-400 bg-[#040907] mx-auto flex items-center justify-center shadow-lg">
                  <Terminal size={28} className="text-emerald-400" />
                </div>
                <h4 className="font-cinzel text-2xl font-black text-emerald-200 mt-3">
                  {selectedSkill.name}
                </h4>
                <p className="font-mono-code text-xs text-emerald-400 tracking-wider uppercase mt-0.5">
                  {selectedSkill.levelText}
                </p>
              </div>

              <div className="my-4 p-4 rounded-xl bg-[#040807] border border-emerald-500/30 text-xs text-slate-300 leading-relaxed">
                {selectedSkill.description}
              </div>

              {selectedSkill.codeSnippet && (
                <div className="p-3 rounded-lg bg-[#020504] border border-emerald-900/60 font-mono-code text-[11px] text-emerald-300 flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">$</span>
                  <code>{selectedSkill.codeSnippet}</code>
                </div>
              )}

              <div className="mt-5 text-center">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-cinzel font-bold text-xs tracking-widest uppercase hover:bg-emerald-400 transition-colors shadow-md cursor-pointer"
                >
                  RETURN CARD TO DECK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SOFT SKILLS HAND */}
      <div className="mt-14 pt-10 border-t border-emerald-500/20">
        <div className="text-center mb-6">
          <h3 className="font-cinzel text-xl md:text-2xl font-bold text-slate-200">
            SOFT SKILLS • COMPLEMENTARY HAND
          </h3>
          <p className="font-card italic text-slate-400 text-xs md:text-sm">
            Interpersonal strengths verified from my professional career objective.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {SOFT_SKILLS.map((item, idx) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-3.5 rounded-xl bg-[#0b1420] border border-emerald-500/20 flex flex-col justify-between hover:border-emerald-400/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <SuitIcon suit={item.suit} size={14} />
                <span className="font-mono-code text-[10px] text-emerald-400 uppercase font-bold">
                  CARD 0{idx + 1}
                </span>
              </div>
              <h4 className="font-cinzel text-sm font-bold text-slate-100">{item.name}</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
