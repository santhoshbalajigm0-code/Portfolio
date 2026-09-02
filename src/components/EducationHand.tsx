import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EDUCATION } from '../data/portfolioData';
import { PlayingCard } from './PlayingCard';
import { SuitIcon } from './SuitIcon';
import { cardAudio } from '../utils/audio';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle, Sparkles } from 'lucide-react';

export const EducationHand: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const mca = EDUCATION[0];
  const bca = EDUCATION[1];

  return (
    <section id="education" className="py-20 px-4 max-w-5xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-950/40 text-blue-300 font-cinzel text-xs tracking-widest uppercase mb-2">
          <span>♠</span> 10 OF SPADES • THE ACADEMIC PAIR <span>♠</span>
        </div>
        <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-slate-100 tracking-wider">
          10♠ & 9♠ — EDUCATION HAND
        </h2>
        <p className="font-card italic text-slate-400 text-sm md:text-base mt-1">
          Two cards held in hand. Hovering slides one forward; click to expand academic record.
        </p>
      </div>

      {/* TWO CARDS HELD LIKE A POKER HAND */}
      <div className="relative max-w-2xl mx-auto h-[480px] md:h-[520px] flex items-center justify-center perspective-1500">
        {/* CARD 1: 10♠ (MCA) */}
        <motion.div
          animate={{
            x: hoveredCard === 'mca' ? -90 : hoveredCard === 'bca' ? -150 : -60,
            y: hoveredCard === 'mca' ? -20 : 0,
            rotateZ: hoveredCard === 'mca' ? -8 : -5,
            scale: hoveredCard === 'mca' ? 1.05 : 1,
            zIndex: hoveredCard === 'mca' ? 20 : 10,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onMouseEnter={() => {
            cardAudio.playHover();
            setHoveredCard('mca');
          }}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => {
            cardAudio.playDeal();
            setExpandedCard('mca');
          }}
          data-cursor="EXPAND"
          className="absolute w-72 md:w-80 h-[420px] md:h-[460px] cursor-pointer"
        >
          <PlayingCard
            rank={mca.rank}
            suit={mca.suit}
            themeColor="royal"
            size="custom"
            className="w-full h-full"
            interactive={false}
          >
            <div className="flex flex-col justify-between h-full p-3 text-center">
              <div className="flex items-center justify-between text-[11px] font-mono-code text-blue-300 border-b border-blue-500/30 pb-2">
                <span>POST GRADUATION</span>
                <span className="text-amber-400 font-bold">{mca.period}</span>
              </div>

              <div className="my-auto py-2">
                <div className="w-14 h-14 rounded-2xl border border-blue-400/50 bg-[#060c18] mx-auto flex items-center justify-center shadow-lg">
                  <GraduationCap size={28} className="text-blue-300" />
                </div>
                <h3 className="font-cinzel text-3xl font-black text-blue-100 mt-2">
                  {mca.degree}
                </h3>
                <p className="font-mono-code text-xs text-blue-300 uppercase tracking-wider mt-0.5">
                  {mca.fullDegree}
                </p>
                <p className="font-card text-xs text-slate-300 mt-2">
                  {mca.institution}, {mca.location}
                </p>

                <div className="inline-block mt-3 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-950/40 font-cinzel text-xs font-bold text-amber-300 shadow-sm">
                  CGPA: {mca.cgpa}
                </div>
              </div>

              <div className="pt-2 border-t border-blue-500/20 text-[10px] font-mono-code text-blue-300">
                CLICK TO EXPAND RECORD ↗
              </div>
            </div>
          </PlayingCard>
        </motion.div>

        {/* CARD 2: 9♠ (BCA) */}
        <motion.div
          animate={{
            x: hoveredCard === 'bca' ? 90 : hoveredCard === 'mca' ? 150 : 60,
            y: hoveredCard === 'bca' ? -20 : 0,
            rotateZ: hoveredCard === 'bca' ? 8 : 5,
            scale: hoveredCard === 'bca' ? 1.05 : 1,
            zIndex: hoveredCard === 'bca' ? 20 : 10,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onMouseEnter={() => {
            cardAudio.playHover();
            setHoveredCard('bca');
          }}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => {
            cardAudio.playDeal();
            setExpandedCard('bca');
          }}
          data-cursor="EXPAND"
          className="absolute w-72 md:w-80 h-[420px] md:h-[460px] cursor-pointer"
        >
          <PlayingCard
            rank={bca.rank}
            suit={bca.suit}
            themeColor="royal"
            size="custom"
            className="w-full h-full"
            interactive={false}
          >
            <div className="flex flex-col justify-between h-full p-3 text-center">
              <div className="flex items-center justify-between text-[11px] font-mono-code text-blue-300 border-b border-blue-500/30 pb-2">
                <span>UNDER GRADUATION</span>
                <span className="text-amber-400 font-bold">{bca.period}</span>
              </div>

              <div className="my-auto py-2">
                <div className="w-14 h-14 rounded-2xl border border-blue-400/50 bg-[#060c18] mx-auto flex items-center justify-center shadow-lg">
                  <GraduationCap size={28} className="text-cyan-300" />
                </div>
                <h3 className="font-cinzel text-3xl font-black text-cyan-100 mt-2">
                  {bca.degree}
                </h3>
                <p className="font-mono-code text-xs text-cyan-300 uppercase tracking-wider mt-0.5">
                  {bca.fullDegree}
                </p>
                <p className="font-card text-xs text-slate-300 mt-2">
                  {bca.institution}, {bca.location}
                </p>

                <div className="inline-block mt-3 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-950/40 font-cinzel text-xs font-bold text-amber-300 shadow-sm">
                  CGPA: {bca.cgpa}
                </div>
              </div>

              <div className="pt-2 border-t border-blue-500/20 text-[10px] font-mono-code text-blue-300">
                CLICK TO EXPAND RECORD ↗
              </div>
            </div>
          </PlayingCard>
        </motion.div>
      </div>

      {/* EXPANDED ACADEMIC DETAILS MODAL */}
      <AnimatePresence>
        {expandedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedCard(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border-2 border-blue-400 bg-[#081020] p-6 shadow-2xl text-slate-100 relative overflow-hidden"
            >
              <div className="absolute inset-2 border border-blue-400/20 rounded-xl pointer-events-none" />

              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-blue-500/30 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <SuitIcon suit="spades" size={18} />
                  <span className="font-cinzel text-sm font-bold text-blue-300">
                    ACADEMIC CARD ARCHIVE • {expandedCard === 'mca' ? '10♠' : '9♠'}
                  </span>
                </div>
                <button
                  onClick={() => setExpandedCard(null)}
                  className="px-2 py-1 rounded-md text-xs font-mono-code text-slate-400 hover:text-white bg-[#040810] border border-slate-700 cursor-pointer"
                >
                  ESC / CLOSE ✕
                </button>
              </div>

              {expandedCard === 'mca' ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-cinzel text-2xl font-black text-blue-100">
                      Master of Computer Applications (MCA)
                    </h3>
                    <p className="font-mono-code text-xs text-amber-300 mt-1">
                      Bishop Heber College, Tiruchirappalli (2024–2026)
                    </p>
                    <div className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-400 font-cinzel text-xs text-amber-300 font-bold">
                      Verified CGPA: 7.5
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#040810] border border-blue-900/50 space-y-2 text-xs text-slate-300">
                    <span className="font-mono-code text-blue-400 uppercase tracking-wider block font-bold">
                      Specialization & Academic Focus:
                    </span>
                    <p>Computer Applications & Advanced Software Engineering paradigms.</p>
                    <div className="pt-2 space-y-1.5">
                      {mca.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <CheckCircle size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-cinzel text-2xl font-black text-cyan-100">
                      Bachelor of Computer Applications (BCA)
                    </h3>
                    <p className="font-mono-code text-xs text-amber-300 mt-1">
                      Bishop Heber College, Tiruchirappalli (2021–2024)
                    </p>
                    <div className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-950 border border-cyan-400 font-cinzel text-xs text-amber-300 font-bold">
                      Verified CGPA: 7.00
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#040810] border border-cyan-900/50 space-y-2 text-xs text-slate-300">
                    <span className="font-mono-code text-cyan-400 uppercase tracking-wider block font-bold">
                      Specialization & Academic Focus:
                    </span>
                    <p>Specialization in Computer Applications, Data Structures, Algorithms & Databases.</p>
                    <div className="pt-2 space-y-1.5">
                      {bca.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <CheckCircle size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <button
                  onClick={() => setExpandedCard(null)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 text-slate-100 font-cinzel font-bold text-xs tracking-widest uppercase hover:bg-blue-500 transition-colors cursor-pointer shadow-lg"
                >
                  RETURN TO HAND
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
