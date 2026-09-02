import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PlayingCard } from './PlayingCard';
import { SuitIcon } from './SuitIcon';
import { cardAudio } from '../utils/audio';
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  Sparkles,
  ExternalLink,
  Users,
} from 'lucide-react';

export const ContactCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    cardAudio.playDeal();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    cardAudio.playDeal();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subject || 'Software Developer Opportunity for Santhosh Balaji'
    )}&body=${encodeURIComponent(message || 'Hello Santhosh, I came across your developer playing card deck...')}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-20 px-4 max-w-5xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-950/40 text-rose-300 font-cinzel text-xs tracking-widest uppercase mb-2">
          <span>♥</span> ACE OF HEARTS • THE FINAL HAND <span>♥</span>
        </div>
        <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-slate-100 tracking-wider">
          A♥ — LET'S PLAY A NEW HAND
        </h2>
        <p className="font-card italic text-slate-400 text-sm md:text-base mt-1">
          Have an opportunity, project, or idea? Let's connect and engineer something memorable.
        </p>
      </div>

      <div className="w-full max-w-3xl mx-auto">
        <PlayingCard
          id="contact-card"
          rank="A"
          suit="hearts"
          themeColor="ruby"
          size="custom"
          cursorLabel="CONTACT"
          className="w-full"
        >
          <div className="py-6 px-2 md:px-6">
            {/* Ace of Hearts Center graphic */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-900 via-[#1f080c] to-[#0d0305] border border-rose-500/50 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(244,63,94,0.3)] mb-3">
                <SuitIcon suit="hearts" size={36} className="text-rose-400" />
              </div>

              <h3 className="font-cinzel text-2xl md:text-3xl font-extrabold text-slate-100">
                LET'S PLAY A NEW HAND
              </h3>
              <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-md mx-auto">
                Open to Software Developer, Python/Java Developer, and Full-Stack Engineering roles.
              </p>
            </div>

            {/* Direct Contact Pill Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {/* Email pill */}
              <div className="p-3 rounded-xl bg-[#0a0507] border border-rose-500/30 flex flex-col justify-between">
                <span className="text-[10px] font-mono-code text-rose-400 uppercase font-bold flex items-center gap-1">
                  <Mail size={12} /> Direct Email
                </span>
                <p className="text-xs text-slate-200 font-mono-code truncate my-1">
                  {PERSONAL_INFO.email}
                </p>
                <button
                  onClick={handleCopyEmail}
                  className="mt-1 py-1 px-2 rounded bg-rose-500/20 text-rose-300 font-cinzel text-[10px] hover:bg-rose-500/30 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span>COPIED TO CLIPBOARD</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>COPY ADDRESS</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone pill */}
              <div className="p-3 rounded-xl bg-[#0a0507] border border-rose-500/30 flex flex-col justify-between">
                <span className="text-[10px] font-mono-code text-rose-400 uppercase font-bold flex items-center gap-1">
                  <Phone size={12} /> Phone Contact
                </span>
                <p className="text-xs text-slate-200 font-mono-code my-1">
                  {PERSONAL_INFO.phone}
                </p>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="mt-1 py-1 px-2 rounded bg-rose-500/20 text-rose-300 font-cinzel text-[10px] hover:bg-rose-500/30 flex items-center justify-center gap-1 transition-colors text-center"
                >
                  CALL DIRECTLY
                </a>
              </div>

              {/* Location pill */}
              <div className="p-3 rounded-xl bg-[#0a0507] border border-rose-500/30 flex flex-col justify-between">
                <span className="text-[10px] font-mono-code text-rose-400 uppercase font-bold flex items-center gap-1">
                  <MapPin size={12} /> Location
                </span>
                <p className="text-xs text-slate-200 my-1">
                  {PERSONAL_INFO.location}
                </p>
                <span className="mt-1 py-1 px-2 rounded bg-rose-950/60 text-slate-400 font-mono-code text-[10px] text-center border border-rose-900/30">
                  TAMIL NADU, INDIA
                </span>
              </div>
            </div>

            {/* Quick Mail Dispatch Form */}
            <form onSubmit={handleSendEmail} className="space-y-3 p-4 rounded-xl bg-[#070305] border border-rose-500/20">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                <span className="font-cinzel text-xs font-bold text-rose-300">
                  SEND A DIRECT MESSAGE INVITATION
                </span>
                <span className="font-mono-code text-[10px] text-slate-400">
                  santhoshbalajigm07@gmail.com
                </span>
              </div>

              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject / Opportunity Role (e.g., Software Developer Interview)"
                className="w-full px-3.5 py-2 rounded-lg bg-[#0e0609] border border-rose-900/50 text-slate-200 text-xs focus:outline-none focus:border-rose-400 font-sans"
              />

              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your note or project inquiry here..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#0e0609] border border-rose-900/50 text-slate-200 text-xs focus:outline-none focus:border-rose-400 font-sans resize-none"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="px-4 py-2.5 rounded-lg border border-rose-500/40 text-rose-300 font-cinzel text-xs hover:bg-rose-500/10 transition-colors flex items-center gap-1.5"
                >
                  <Mail size={14} />
                  <span>OPEN EMAIL CLIENT</span>
                </a>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-rose-600 to-red-600 text-white font-cinzel font-bold text-xs tracking-wider uppercase hover:brightness-110 shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Send size={14} />
                  <span>SEND INVITATION</span>
                </button>
              </div>
            </form>

            {/* Academic References Verified from CV */}
            <div className="mt-8 pt-6 border-t border-rose-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Users size={14} className="text-amber-400" />
                <span className="font-cinzel text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Academic References (Bishop Heber College)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PERSONAL_INFO.references.map((ref, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[#080406] border border-slate-800 text-left">
                    <h5 className="font-cinzel text-xs font-bold text-slate-200">{ref.name}</h5>
                    <p className="text-[11px] text-rose-300">{ref.role}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{ref.institution}</p>
                    <span className="font-mono-code text-[10px] text-amber-400 block mt-1">
                      {ref.contact}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PlayingCard>
      </div>
    </section>
  );
};
