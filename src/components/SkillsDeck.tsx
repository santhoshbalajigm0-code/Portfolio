import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TECHNICAL_SKILLS, SOFT_SKILLS } from '../data/portfolioData';
import { SkillItem } from '../types';
import { SuitIcon } from './SuitIcon';
import { cardAudio } from '../utils/audio';
import { 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Code2, 
  Coffee, 
  Database, 
  Server, 
  Cpu, 
  Flame, 
  Braces, 
  Layout, 
  Palette,
  CheckCircle2,
  X,
  Layers,
  ArrowRight
} from 'lucide-react';

export const SkillsDeck: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'core' | 'backend' | 'web' | 'database'>('all');
  const [flippedSkill, setFlippedSkill] = useState<string | null>(null);

  const filteredSkills = filter === 'all'
    ? TECHNICAL_SKILLS
    : TECHNICAL_SKILLS.filter((s) => s.category === filter);

  // Helper to render authentic tech icon for each card
  const renderSkillIcon = (name: string, suit: string) => {
    switch (name.toLowerCase()) {
      case 'python':
        return <Code2 size={24} className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />;
      case 'java':
        return <Coffee size={24} className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />;
      case 'sql':
        return <Database size={24} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />;
      case 'mysql':
        return <Server size={24} className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />;
      case 'spring boot':
        return <Cpu size={24} className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />;
      case 'flask':
        return <Flame size={24} className="text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" />;
      case 'javascript':
        return <Braces size={24} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />;
      case 'html5':
        return <Layout size={24} className="text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]" />;
      case 'css3':
        return <Palette size={24} className="text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />;
      default:
        return <Terminal size={24} className="text-emerald-400" />;
    }
  };

  const getSkillProficiency = (name: string) => {
    switch (name.toLowerCase()) {
      case 'python': return { score: 92, badge: 'Proficient • Automation & APIs' };
      case 'java': return { score: 88, badge: 'Strong OOP & Architecture' };
      case 'sql': return { score: 90, badge: 'Relational Queries & Optimization' };
      case 'mysql': return { score: 85, badge: 'Schema Design & Indexing' };
      case 'spring boot': return { score: 82, badge: 'REST Controllers & JPA' };
      case 'flask': return { score: 86, badge: 'Microservices & Routing' };
      case 'javascript': return { score: 85, badge: 'ES6+ & Async Patterns' };
      case 'html5': return { score: 95, badge: 'Semantic & Responsive' };
      case 'css3': return { score: 92, badge: 'Modern Layouts & Animations' };
      default: return { score: 85, badge: 'Technical Expertise' };
    }
  };

  return (
    <section id="skills" className="py-24 px-4 max-w-7xl mx-auto relative z-10">
      {/* Header Section with Ornate Poker Royal Badge */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#050B18]/90 text-[#D4AF37] font-cinzel text-xs tracking-widest uppercase mb-3 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <span className="text-amber-400">♣</span> KING OF CLUBS • ARSENAL OF EXPERTISE <span className="text-amber-400">♣</span>
        </div>
        <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-slate-100 tracking-wider">
          K♣ — THE TOOLKIT
        </h2>
        <p className="font-card italic text-slate-300 text-sm md:text-base mt-2 max-w-xl mx-auto">
          Technical mastery & software craftsmanship rendered in authentic casino cardstock. Tap any card to flip and inspect code specs.
        </p>

        {/* Category Filters Styled as Luxury Poker Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
          {[
            { id: 'all', label: 'FULL DECK (9 CARDS)', icon: '♣', color: 'emerald' },
            { id: 'core', label: 'LANGUAGES (Python/Java)', icon: '♠', color: 'blue' },
            { id: 'backend', label: 'FRAMEWORKS (Spring Boot/Flask)', icon: '♦', color: 'amber' },
            { id: 'database', label: 'DATABASES (SQL/MySQL)', icon: '♦', color: 'cyan' },
            { id: 'web', label: 'WEB (HTML/CSS/JS)', icon: '♥', color: 'rose' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                cardAudio.playDeal();
                setFilter(tab.id as any);
              }}
              className={`px-4 py-2 rounded-xl font-cinzel text-xs tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-[#182a24] to-[#0d1c16] border-2 border-[#D4AF37] text-amber-200 shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-105'
                  : 'bg-[#080e1a]/80 border border-slate-700/60 text-slate-400 hover:border-[#D4AF37]/50 hover:text-slate-200'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span className="font-bold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* REALISTIC PLAYING CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {filteredSkills.map((skill, index) => {
          const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6'];
          const rank = ranks[index % ranks.length];
          const isRed = skill.suit === 'hearts' || skill.suit === 'diamonds';
          const isCardFlipped = flippedSkill === skill.name;
          const proficiency = getSkillProficiency(skill.name);

          return (
            <div
              key={skill.name}
              className="perspective-1500 h-[340px] select-none"
            >
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="relative w-full h-full preserve-3d transition-transform duration-500 cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
                onClick={() => {
                  cardAudio.playFlip();
                  setFlippedSkill(isCardFlipped ? null : skill.name);
                }}
                onMouseEnter={() => cardAudio.playHover()}
              >
                {/* ========================================================
                    FRONT OF REALISTIC SKILL PLAYING CARD
                   ======================================================== */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border-2 border-[#D4AF37]/60 bg-gradient-to-b from-[#111e30] via-[#09111c] to-[#040810] p-4 flex flex-col justify-between overflow-hidden card-physical-depth card-linen-dark group"
                >
                  {/* Ornate Gold Frame & Foil Trim */}
                  <div className="absolute inset-2 border border-[#D4AF37]/35 rounded-[12px] pointer-events-none" />
                  <div className="absolute inset-3 border border-[#D4AF37]/15 rounded-[8px] pointer-events-none" />

                  {/* Corner Filigree Brackets */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#D4AF37] pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#D4AF37] pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#D4AF37] pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#D4AF37] pointer-events-none" />

                  {/* Subtle Background Watermark Suit */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                    <SuitIcon suit={skill.suit} size={160} />
                  </div>

                  {/* TOP LEFT CORNER INDEX */}
                  <div className="relative z-10 flex items-start justify-between leading-none">
                    <div className="flex flex-col items-center">
                      <span className={`font-cinzel text-2xl font-black ${isRed ? 'text-rose-500' : 'text-amber-300'}`}>
                        {rank}
                      </span>
                      <SuitIcon suit={skill.suit} size={16} className="mt-0.5" />
                    </div>
                    <span className="font-mono-code text-[10px] text-amber-300/70 border border-[#D4AF37]/30 px-2 py-0.5 rounded-full bg-[#050B18]/70">
                      {skill.category.toUpperCase()}
                    </span>
                  </div>

                  {/* CENTER EMBLEM & CARD ARTWORK */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-3">
                    {/* Metallic Crest Emblem */}
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a2c42] to-[#0a121e] border-2 border-[#D4AF37]/80 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.25)] group-hover:scale-110 group-hover:border-[#D4AF37] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all duration-300">
                      {renderSkillIcon(skill.name, skill.suit)}
                    </div>

                    <h3 className="font-cinzel text-xl md:text-2xl font-bold text-slate-100 mt-3 tracking-wider group-hover:text-amber-200 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="font-card italic text-xs text-amber-200/90 mt-0.5 font-semibold">
                      {skill.levelText}
                    </p>

                    {/* Proficiency Bar on Card */}
                    <div className="w-full max-w-[180px] mt-3">
                      <div className="flex justify-between text-[10px] font-mono-code text-slate-400 mb-1">
                        <span>MASTERY</span>
                        <span className="text-amber-300 font-bold">{proficiency.score}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-[#D4AF37]/30">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 via-[#D4AF37] to-amber-200 rounded-full"
                          style={{ width: `${proficiency.score}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM RIGHT CORNER INDEX */}
                  <div className="relative z-10 flex items-end justify-between leading-none">
                    <span className="font-mono-code text-[9px] text-[#D4AF37] opacity-80 group-hover:opacity-100 transition-opacity">
                      ↻ TAP TO FLIP
                    </span>
                    <div className="flex flex-col items-center rotate-180">
                      <span className={`font-cinzel text-2xl font-black ${isRed ? 'text-rose-500' : 'text-amber-300'}`}>
                        {rank}
                      </span>
                      <SuitIcon suit={skill.suit} size={16} className="mt-0.5" />
                    </div>
                  </div>
                </div>

                {/* ========================================================
                    BACK OF SKILL PLAYING CARD (CODE & ARCHITECTURE DETAILS)
                   ======================================================== */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl border-2 border-[#D4AF37]/80 bg-gradient-to-br from-[#0c1524] via-[#070d17] to-[#120815] p-5 flex flex-col justify-between overflow-hidden card-physical-depth"
                >
                  {/* Ornate Inner Back Border */}
                  <div className="absolute inset-2 border border-[#D4AF37]/40 rounded-[12px] pointer-events-none" />

                  {/* Top Back Header */}
                  <div className="relative z-10 flex items-center justify-between border-b border-[#D4AF37]/30 pb-2">
                    <div className="flex items-center gap-1.5">
                      <SuitIcon suit={skill.suit} size={14} />
                      <span className="font-cinzel text-xs font-bold text-amber-200">{skill.name} SPEC</span>
                    </div>
                    <span className="font-mono-code text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                      VERIFIED
                    </span>
                  </div>

                  {/* Description & Competencies */}
                  <div className="relative z-10 my-auto space-y-2.5 py-1">
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {skill.description}
                    </p>

                    <div className="p-2 rounded-lg bg-black/60 border border-[#D4AF37]/25 text-left">
                      <span className="text-[9px] font-mono-code text-[#D4AF37] block uppercase tracking-wider mb-1">
                        Syntactic Blueprint
                      </span>
                      <code className="text-[11px] font-mono-code text-amber-100 block break-all">
                        {skill.codeSnippet}
                      </code>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono-code">
                      <CheckCircle2 size={12} className="text-[#D4AF37]" />
                      <span>{proficiency.badge}</span>
                    </div>
                  </div>

                  {/* Bottom Back Footer */}
                  <div className="relative z-10 flex items-center justify-between pt-2 border-t border-[#D4AF37]/20 text-[10px] text-[#D4AF37] font-mono-code">
                    <span>SANTHOSH BALAJI</span>
                    <span>↻ TAP TO CLOSE</span>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* SOFT SKILLS HAND / HONOR CARDS */}
      <div className="mt-16 bg-gradient-to-r from-[#08101e] via-[#0c182c] to-[#08101e] border border-[#D4AF37]/35 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div>
            <span className="font-cinzel text-xs text-[#D4AF37] tracking-widest uppercase font-bold">
              ♠ ROYAL FLUSH ATTRIBUTES
            </span>
            <h3 className="font-cinzel text-2xl md:text-3xl font-extrabold text-slate-100 mt-1">
              Professional Competencies & Work Ethic
            </h3>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] font-mono-code text-xs">
            <Sparkles size={14} />
            <span>5 TRUMP CARDS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SOFT_SKILLS.map((soft, idx) => (
            <motion.div
              key={soft.name}
              whileHover={{ y: -6, scale: 1.03 }}
              className="p-4 rounded-2xl bg-[#050B18]/90 border border-[#D4AF37]/30 flex flex-col justify-between shadow-lg hover:border-[#D4AF37] transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-cinzel text-xs font-bold text-amber-300">TRUMP #{idx + 1}</span>
                <SuitIcon suit={soft.suit} size={15} />
              </div>
              <h4 className="font-cinzel text-sm font-bold text-slate-100 mb-1">
                {soft.name}
              </h4>
              <p className="text-[11px] text-slate-400 leading-snug">
                {soft.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
