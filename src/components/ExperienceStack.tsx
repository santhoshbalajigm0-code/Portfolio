import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EXPERIENCES } from '../data/portfolioData';
import { PlayingCard } from './PlayingCard';
import { SuitIcon } from './SuitIcon';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';

export const ExperienceStack: React.FC = () => {
  const [activeExpIndex, setActiveExpIndex] = useState<number>(0);

  return (
    <section id="experience" className="py-20 px-4 max-w-5xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-950/40 text-pink-300 font-cinzel text-xs tracking-widest uppercase mb-2">
          <span>♥</span> JACK OF HEARTS • THE PRACTICUM DECK <span>♥</span>
        </div>
        <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-slate-100 tracking-wider">
          J♥ — EXPERIENCE
        </h2>
        <p className="font-card italic text-slate-400 text-sm md:text-base mt-1">
          Industry internships & software development engagements strictly from CV.
        </p>
      </div>

      <div className="w-full max-w-3xl mx-auto">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PlayingCard
              id="experience-card"
              rank="J"
              suit="hearts"
              themeColor="ruby"
              size="custom"
              interactive={true}
              cursorLabel="INSPECT"
              className="w-full"
            >
              <div className="py-4 md:py-6 px-2 md:px-6">
                {/* Header Banner */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-rose-500/30 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono-code uppercase font-bold">
                        {exp.type}
                      </span>
                      <span className="text-slate-400 text-xs flex items-center gap-1 font-mono-code">
                        <Calendar size={12} className="text-rose-400" />
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="font-cinzel text-2xl md:text-3xl font-extrabold text-slate-100 mt-1">
                      {exp.company}
                    </h3>
                    <p className="font-mono-code text-xs text-rose-300 tracking-wider uppercase">
                      {exp.role}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 self-start md:self-center font-mono-code bg-[#070b14] px-3 py-1.5 rounded-lg border border-rose-900/40">
                    <MapPin size={12} className="text-rose-400" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Primary CV Description */}
                <div className="my-5 p-4 rounded-xl bg-[#09060b] border border-rose-500/30 text-slate-300 text-sm md:text-base leading-relaxed">
                  <p className="font-sans">
                    {exp.description}
                  </p>
                </div>

                {/* Specific Responsibilities / Accomplishments */}
                <div className="space-y-2.5 my-4">
                  <span className="font-mono-code text-[11px] text-rose-400 uppercase tracking-wider block font-bold">
                    Key Execution Highlights:
                  </span>
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs md:text-sm text-slate-300">
                      <CheckCircle2 size={14} className="text-rose-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies / Skills Acquired */}
                <div className="pt-4 border-t border-rose-500/20 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {exp.skillsGained.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md border border-rose-500/40 bg-rose-950/60 font-mono-code text-[10px] text-rose-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <span className="font-cinzel text-xs text-slate-400">
                    VERIFIED IN CV RECORD
                  </span>
                </div>
              </div>
            </PlayingCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
