import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PlayingCard } from './PlayingCard';
import { SuitIcon } from './SuitIcon';
import { User, GraduationCap, MapPin, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const chips = ['MCA', 'BCA', 'Python', 'Java', 'SQL', 'Web Development'];

  return (
    <section id="about" className="py-20 px-4 max-w-5xl mx-auto relative z-10">
      {/* Section Header Card Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-950/40 text-violet-300 font-cinzel text-xs tracking-widest uppercase mb-2">
          <span>♠</span> ACE OF SPADES • THE CARD OF ORIGIN <span>♠</span>
        </div>
        <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-slate-100 tracking-wider">
          A♠ — ABOUT THE PLAYER
        </h2>
        <p className="font-card italic text-slate-400 text-sm md:text-base mt-1">
          The foundation, passion, and professional ethos.
        </p>
      </div>

      <div className="w-full max-w-3xl mx-auto">
        <PlayingCard
          id="about-card"
          rank="A"
          suit="spades"
          themeColor="violet"
          size="custom"
          cursorLabel="FLIP"
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped(!isFlipped)}
          className="w-full"
          backContent={
            <div className="h-full flex flex-col justify-between p-4 md:p-6">
              <div className="flex items-center justify-between border-b border-violet-500/30 pb-3">
                <span className="font-cinzel text-xs font-bold text-violet-300">
                  PLAYER ATTRIBUTES & CREDENTIALS
                </span>
                <span className="font-mono-code text-[11px] text-amber-400">STATUS: VERIFIED</span>
              </div>

              <div className="my-auto space-y-4 py-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#090b14] border border-violet-500/30">
                    <span className="text-[10px] text-violet-400 uppercase font-mono-code">Master's Degree</span>
                    <h4 className="font-cinzel text-sm font-bold text-slate-100 mt-0.5">MCA (2024–2026)</h4>
                    <p className="text-xs text-slate-400">Bishop Heber College, Trichy</p>
                    <span className="text-[11px] text-amber-300 font-bold block mt-1">CGPA: 7.5</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#090b14] border border-violet-500/30">
                    <span className="text-[10px] text-violet-400 uppercase font-mono-code">Bachelor's Degree</span>
                    <h4 className="font-cinzel text-sm font-bold text-slate-100 mt-0.5">BCA (2021–2024)</h4>
                    <p className="text-xs text-slate-400">Bishop Heber College, Trichy</p>
                    <span className="text-[11px] text-amber-300 font-bold block mt-1">CGPA: 7.00</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090b14] border border-violet-500/30 text-left">
                  <span className="text-[10px] text-amber-400 uppercase font-mono-code flex items-center gap-1">
                    <Sparkles size={12} /> Core Competencies
                  </span>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      <span>Software Engineering</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      <span>Full-Stack Architecture</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      <span>Database Normalization</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      <span>Biometric & OTP Systems</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-violet-500/30 text-center">
                <span className="text-xs text-slate-400 font-card italic">
                  Click card to flip back to player bio
                </span>
              </div>
            </div>
          }
        >
          {/* FRONT FACE OF ABOUT CARD */}
          <div className="py-4 md:py-8 px-2 md:px-6">
            {/* Ornate Ace Spade Graphic */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-violet-900/60 via-[#130b24] to-[#0a0614] border border-violet-500/50 flex items-center justify-center shadow-[0_0_25px_rgba(139,92,246,0.3)]">
                  <SuitIcon suit="spades" size={38} className="text-violet-300 drop-shadow-md" />
                </div>
              </div>

              <h3 className="font-cinzel text-2xl md:text-3xl font-extrabold text-slate-100 tracking-wider">
                {PERSONAL_INFO.name}
              </h3>
              <p className="font-mono-code text-xs text-violet-300 tracking-widest uppercase mt-1">
                MCA GRADUATE • SOFTWARE DEVELOPER
              </p>

              {/* Verified Location & Details */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 mt-3">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-violet-400" />
                  Trichy, Tamil Nadu
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <GraduationCap size={12} className="text-violet-400" />
                  Bishop Heber College
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail size={12} className="text-violet-400" />
                  {PERSONAL_INFO.email}
                </span>
              </div>
            </div>

            {/* Concise Objective / Story Strictly from CV */}
            <div className="my-6 p-4 md:p-6 rounded-xl bg-[#090b14]/80 border border-violet-500/30 text-slate-300 text-sm md:text-base leading-relaxed text-center relative overflow-hidden">
              <div className="absolute top-2 left-3 font-cinzel text-4xl text-violet-500/15 pointer-events-none select-none">
                “
              </div>
              <p className="relative z-10 font-sans">
                {PERSONAL_INFO.objective}
              </p>
            </div>

            {/* Information Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {chips.map((chip, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1 rounded-full border border-violet-500/40 bg-violet-950/50 text-violet-200 font-mono-code text-xs font-medium tracking-wide shadow-sm hover:border-amber-400/60 hover:text-amber-300 transition-colors"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* Animated Luxury Monogram Signature "SB" */}
            <div className="pt-4 border-t border-violet-500/20 flex items-center justify-between px-2">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-cinzel">
                <span>SUIT: SPADES</span>
                <span>•</span>
                <span>ORIGIN: TRICHY</span>
              </div>

              {/* Signature Monogram */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-400 font-mono-code uppercase tracking-wider">
                  Player Signature:
                </span>
                <div className="relative px-3 py-1 rounded-lg border border-amber-500/30 bg-[#070b14]">
                  <span className="font-card italic font-bold text-2xl text-amber-300 tracking-widest drop-shadow-sm select-none">
                    SB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </PlayingCard>
      </div>
    </section>
  );
};
