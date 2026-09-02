import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { CertificationItem } from '../types';
import { SuitIcon } from './SuitIcon';
import { cardAudio } from '../utils/audio';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CertificationDeck: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  return (
    <section id="certifications" className="py-20 px-4 max-w-5xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-300 font-cinzel text-xs tracking-widest uppercase mb-2">
          <span>♦</span> 9 OF DIAMONDS • COLLECTIBLE BADGES <span>♦</span>
        </div>
        <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-slate-100 tracking-wider">
          9♦ — CERTIFICATIONS
        </h2>
        <p className="font-card italic text-slate-400 text-sm md:text-base mt-1">
          Collectible playing card credentials certified by top industry authorities.
        </p>
      </div>

      {/* 3 COLLECTIBLE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CERTIFICATIONS.map((cert, index) => {
          const isRed = cert.suit === 'diamonds' || cert.suit === 'hearts';

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => {
                cardAudio.playDeal();
                setSelectedCert(cert);
              }}
              data-cursor="INSPECT"
              className="relative h-[360px] rounded-2xl border-[1.5px] border-amber-500/40 bg-gradient-to-b from-[#181308] via-[#0d0d08] to-[#080805] p-4 flex flex-col justify-between shadow-xl cursor-pointer overflow-hidden select-none hover:border-amber-400 hover:shadow-[0_10px_35px_rgba(245,158,11,0.25)] transition-all"
            >
              {/* Paper overlay */}
              <div className="absolute inset-0 opacity-20 card-pattern-overlay pointer-events-none" />

              {/* Inner border */}
              <div className="absolute inset-2 border border-amber-500/20 rounded-xl pointer-events-none" />

              {/* Top Index */}
              <div className="relative z-10 flex items-center justify-between leading-none">
                <span
                  className={`font-cinzel text-xl font-black ${
                    isRed ? 'text-rose-500' : 'text-amber-400'
                  }`}
                >
                  {cert.rank}
                </span>
                <SuitIcon suit={cert.suit} size={18} />
              </div>

              {/* Center Badge Illustration */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto px-2">
                <div className="w-16 h-16 rounded-2xl border border-amber-400/50 bg-[#070704] flex items-center justify-center shadow-inner mb-3">
                  <Award size={32} className="text-amber-300 drop-shadow" />
                </div>

                <span className="font-mono-code text-[11px] text-amber-400/90 font-bold uppercase tracking-widest">
                  {cert.issuer}
                </span>

                <h3 className="font-cinzel text-xl font-bold text-slate-100 mt-1">
                  {cert.title}
                </h3>

                <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                  {cert.focus}
                </p>
              </div>

              {/* Bottom Index */}
              <div className="relative z-10 flex items-center justify-between leading-none rotate-180">
                <span
                  className={`font-cinzel text-xl font-black ${
                    isRed ? 'text-rose-500' : 'text-amber-400'
                  }`}
                >
                  {cert.rank}
                </span>
                <SuitIcon suit={cert.suit} size={18} />
              </div>

              {/* Bottom Pill */}
              <div className="absolute bottom-2 inset-x-4 text-center z-20">
                <span className="text-[10px] font-mono-code text-amber-300 bg-amber-950/80 border border-amber-500/40 px-3 py-0.5 rounded-full shadow-sm">
                  TAP TO INSPECT BADGE
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MODAL INSPECT */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-[#181308] to-[#0a0805] p-6 shadow-2xl text-slate-100 relative overflow-hidden"
            >
              <div className="absolute inset-2 border border-amber-400/30 rounded-xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <SuitIcon suit={selectedCert.suit} size={18} />
                  <span className="font-cinzel text-sm font-bold text-amber-300">
                    CERTIFICATION CARD DOSSIER
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-2 py-1 rounded-md text-xs font-mono-code text-slate-400 hover:text-white bg-[#050402] border border-slate-700 cursor-pointer"
                >
                  ESC ✕
                </button>
              </div>

              <div className="text-center py-2">
                <div className="w-16 h-16 rounded-2xl border-2 border-amber-400 bg-[#050402] mx-auto flex items-center justify-center shadow-lg">
                  <Award size={32} className="text-amber-400" />
                </div>
                <h4 className="font-cinzel text-2xl font-black text-amber-200 mt-3">
                  {selectedCert.title}
                </h4>
                <p className="font-mono-code text-xs text-amber-400/90 font-bold uppercase tracking-wider mt-1">
                  ISSUED BY: {selectedCert.issuer}
                </p>
              </div>

              <div className="my-4 p-4 rounded-xl bg-[#050402] border border-amber-500/30 text-xs text-slate-300 space-y-2">
                <span className="font-mono-code text-amber-400 uppercase tracking-wider block font-bold">
                  Curriculum Competencies:
                </span>
                <p>{selectedCert.focus}</p>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold pt-2">
                  <CheckCircle2 size={14} />
                  <span>Credential verified in official resume</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-cinzel font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all cursor-pointer shadow-md"
              >
                RETURN BADGE TO DECK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
