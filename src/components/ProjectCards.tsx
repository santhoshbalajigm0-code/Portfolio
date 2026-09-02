import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { PlayingCard } from './PlayingCard';
import { SuitIcon } from './SuitIcon';
import { cardAudio } from '../utils/audio';
import {
  Layers,
  LayoutGrid,
  ShieldCheck,
  Radio,
  Cpu,
  RefreshCcw,
  CheckCircle,
  ExternalLink,
  Rotate3d,
} from 'lucide-react';

export const ProjectCards: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'hand' | 'stack'>('hand');
  const [stackCards, setStackCards] = useState<ProjectItem[]>(PROJECTS);
  const [discardedCount, setDiscardedCount] = useState<number>(0);

  const toggleFlip = (id: string) => {
    cardAudio.playFlip();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDragEnd = (id: string, info: any) => {
    // If dragged sufficiently far, discard top card
    if (Math.abs(info.offset.x) > 120 || Math.abs(info.offset.y) > 120) {
      cardAudio.playDeal();
      setStackCards((prev) => prev.filter((c) => c.id !== id));
      setDiscardedCount((prev) => prev + 1);
    }
  };

  const handleResetStack = () => {
    cardAudio.playShuffle();
    setStackCards(PROJECTS);
    setDiscardedCount(0);
    setFlippedCards({});
  };

  // Helper to render custom project visual emblem
  const renderProjectIllustration = (id: string) => {
    switch (id) {
      case 'secure-file-sharing':
        return (
          <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-pulse" />
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-tr from-blue-950 via-[#0a152e] to-blue-900/60 border border-blue-400/50 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.3)]">
              <ShieldCheck size={36} className="text-blue-300 drop-shadow-md" />
              <span className="font-mono-code text-[9px] text-blue-200 mt-1">OTP + BIOMETRIC</span>
            </div>
          </div>
        );
      case 'precision-fishing':
        return (
          <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-pulse" />
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-tr from-emerald-950 via-[#09221a] to-emerald-900/60 border border-emerald-400/50 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <Radio size={36} className="text-emerald-300 drop-shadow-md" />
              <span className="font-mono-code text-[9px] text-emerald-200 mt-1">IoT AUTONOMOUS</span>
            </div>
          </div>
        );
      case 'enterprise-web-application':
      default:
        return (
          <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-amber-500/30 animate-pulse" />
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-tr from-amber-950 via-[#271d09] to-amber-900/60 border border-amber-400/50 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.3)]">
              <Cpu size={36} className="text-amber-300 drop-shadow-md" />
              <span className="font-mono-code text-[9px] text-amber-200 mt-1">SPRING BOOT + SQL</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-950/40 text-rose-300 font-cinzel text-xs tracking-widest uppercase mb-2">
          <span>♦</span> QUEEN OF DIAMONDS • THE MAJOR ARTIFACTS <span>♦</span>
        </div>
        <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-slate-100 tracking-wider">
          Q♦ — PROJECT HAND
        </h2>
        <p className="font-card italic text-slate-400 text-sm md:text-base mt-1">
          Each card represents a core software engineering system. Tap or click any card to flip.
        </p>

        {/* View Mode Toggle: Table Hand vs Stack Deal */}
        <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-[#090f1d] border border-amber-500/30 mt-6 shadow-md">
          <button
            onClick={() => {
              cardAudio.playDeal();
              setViewMode('hand');
            }}
            className={`px-4 py-2 rounded-lg font-cinzel text-xs tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'hand'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid size={14} />
            <span>TABLE HAND (3 CARDS)</span>
          </button>

          <button
            onClick={() => {
              cardAudio.playShuffle();
              setViewMode('stack');
              setStackCards(PROJECTS);
              setDiscardedCount(0);
            }}
            className={`px-4 py-2 rounded-lg font-cinzel text-xs tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'stack'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={14} />
            <span>DEAL PROJECT STACK (DRAG MODE)</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: TABLE HAND (3 SPREAD OVERSIZED CARDS) */}
      {viewMode === 'hand' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {PROJECTS.map((project) => {
            const isFlipped = !!flippedCards[project.id];
            const theme = project.id === 'secure-file-sharing' ? 'royal' : project.id === 'precision-fishing' ? 'emerald' : 'gold';

            return (
              <div key={project.id} className="w-full flex">
                <PlayingCard
                  id={`project-card-${project.id}`}
                  rank={project.rank}
                  suit={project.suit}
                  themeColor={theme as any}
                  size="custom"
                  cursorLabel="FLIP"
                  isFlipped={isFlipped}
                  onFlip={() => toggleFlip(project.id)}
                  className="w-full h-full min-h-[520px]"
                  backContent={
                    <div className="h-full flex flex-col justify-between p-2 md:p-3 text-left">
                      {/* Back Header */}
                      <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                        <div className="flex items-center gap-2">
                          <SuitIcon suit={project.suit} size={14} />
                          <span className="font-cinzel text-xs font-bold text-amber-300">
                            {project.cardNumber} DOSSIER
                          </span>
                        </div>
                        <span className="font-mono-code text-[10px] text-slate-400">
                          {project.date}
                        </span>
                      </div>

                      {/* Back Main Content */}
                      <div className="my-auto space-y-3 py-2">
                        <h4 className="font-cinzel text-lg font-bold text-slate-100">
                          {project.title}
                        </h4>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-mono-code text-amber-400 uppercase tracking-wider block">
                            Key Architecture Highlights:
                          </span>
                          {project.highlights.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                              <CheckCircle size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Back Footer */}
                      <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFlip(project.id);
                          }}
                          className="px-3 py-1 rounded bg-amber-500/20 text-amber-300 font-cinzel text-[11px] hover:bg-amber-500/30 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Rotate3d size={12} /> FLIP TO FRONT
                        </button>
                        <span className="font-mono-code text-[10px] text-slate-400">
                          VERIFIED PROJECT
                        </span>
                      </div>
                    </div>
                  }
                >
                  {/* FRONT CONTENT */}
                  <div className="flex flex-col justify-between h-full py-4 px-2 md:px-4 text-center">
                    {/* Top Project Tag */}
                    <div className="flex items-center justify-center gap-1.5 text-slate-400 font-mono-code text-[10px] uppercase tracking-widest mb-2">
                      <span>{project.cardNumber}</span>
                      <span>•</span>
                      <span className="text-amber-300 font-bold">{project.category}</span>
                    </div>

                    {/* Central Project Graphic */}
                    <div className="my-3">
                      {renderProjectIllustration(project.id)}
                    </div>

                    {/* Title & Subtitle */}
                    <div className="my-2">
                      <h3 className="font-cinzel text-xl md:text-2xl font-extrabold text-slate-100 leading-snug">
                        {project.title}
                      </h3>
                      <p className="font-card italic text-amber-300/80 text-xs md:text-sm mt-1">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 my-4">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-full border border-slate-700 bg-[#060c18] font-mono-code text-[10px] text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Flip Cue */}
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-mono-code">{project.date}</span>
                      <span className="font-cinzel text-amber-300 flex items-center gap-1">
                        <Rotate3d size={12} /> TAP TO FLIP
                      </span>
                    </div>
                  </div>
                </PlayingCard>
              </div>
            );
          })}
        </div>
      ) : (
        /* VIEW MODE 2: DEAL PROJECT STACK (PHYSICAL DRAG/SWIPE STACK) */
        <div className="w-full max-w-lg mx-auto min-h-[580px] flex flex-col items-center justify-center relative py-6">
          {stackCards.length > 0 ? (
            <div className="relative w-full h-[520px] flex items-center justify-center perspective-1500">
              <AnimatePresence>
                {stackCards.map((project, index) => {
                  const isTop = index === stackCards.length - 1;
                  const stackOffset = (stackCards.length - 1 - index);

                  return (
                    <motion.div
                      key={project.id}
                      drag={isTop ? true : false}
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      onDragEnd={(_, info) => handleDragEnd(project.id, info)}
                      initial={{ scale: 0.9, y: 50, opacity: 0 }}
                      animate={{
                        scale: 1 - stackOffset * 0.04,
                        y: stackOffset * -14,
                        rotateZ: (index % 2 === 0 ? 1 : -1) * stackOffset * 2,
                        opacity: 1,
                        zIndex: index + 10,
                      }}
                      exit={{
                        x: 400,
                        rotateZ: 25,
                        opacity: 0,
                        transition: { duration: 0.35 },
                      }}
                      className={`absolute inset-0 w-full h-full ${
                        isTop ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
                      }`}
                      data-cursor={isTop ? 'DEAL' : ''}
                    >
                      <PlayingCard
                        rank={project.rank}
                        suit={project.suit}
                        themeColor={project.id === 'secure-file-sharing' ? 'royal' : project.id === 'precision-fishing' ? 'emerald' : 'gold'}
                        size="custom"
                        interactive={false}
                        className="w-full h-full"
                      >
                        <div className="flex flex-col justify-between h-full p-4 text-center">
                          <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-400 border-b border-slate-800 pb-2">
                            <span className="text-amber-400 font-bold">{project.cardNumber}</span>
                            <span>{project.date}</span>
                          </div>

                          <div className="my-auto">
                            {renderProjectIllustration(project.id)}
                            <h3 className="font-cinzel text-2xl font-extrabold text-slate-100 mt-3">
                              {project.title}
                            </h3>
                            <p className="font-card italic text-amber-200 text-xs mt-1">
                              {project.subtitle}
                            </p>
                            <p className="text-xs text-slate-300 mt-3 max-w-sm mx-auto leading-relaxed">
                              {project.description}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-slate-800">
                            <span className="font-mono-code text-[11px] text-amber-300 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
                              SWIPE / DRAG CARD AWAY TO DEAL NEXT
                            </span>
                          </div>
                        </div>
                      </PlayingCard>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            /* ALL CARDS DEALT SCREEN */
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-8 rounded-2xl border-2 border-amber-500/40 bg-[#0d1627] max-w-md shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full border-2 border-amber-400 bg-[#060a14] mx-auto flex items-center justify-center shadow-lg mb-4">
                <span className="font-cinzel text-2xl font-black text-amber-300">♦</span>
              </div>
              <h3 className="font-cinzel text-3xl font-black text-amber-200">
                THAT'S THE HAND.
              </h3>
              <p className="text-xs text-slate-300 mt-2">
                You've dealt through all 3 verified software project cards.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <button
                  onClick={handleResetStack}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-cinzel font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <RefreshCcw size={14} />
                  <span>RESHUFFLE HAND</span>
                </button>
                <button
                  onClick={() => setViewMode('hand')}
                  className="w-full py-2.5 rounded-xl border border-slate-700 bg-[#070b14] text-slate-300 font-cinzel text-xs hover:border-amber-400 transition-colors cursor-pointer"
                >
                  RETURN TO TABLE VIEW
                </button>
              </div>
            </motion.div>
          )}

          {stackCards.length > 0 && (
            <p className="font-card italic text-slate-400 text-xs mt-4">
              Cards remaining in stack: {stackCards.length} / 3 • Drag any direction to discard
            </p>
          )}
        </div>
      )}
    </section>
  );
};
