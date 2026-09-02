/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TableBackground } from './components/TableBackground';
import { CustomCursor } from './components/CustomCursor';
import { CardFanNav } from './components/CardFanNav';
import { OpeningDeckModal } from './components/OpeningDeckModal';
import { HeroCard } from './components/HeroCard';
import { AboutCard } from './components/AboutCard';
import { SkillsDeck } from './components/SkillsDeck';
import { ProjectCards } from './components/ProjectCards';
import { ExperienceStack } from './components/ExperienceStack';
import { EducationHand } from './components/EducationHand';
import { CertificationDeck } from './components/CertificationDeck';
import { HobbiesHand } from './components/HobbiesHand';
import { ContactCard } from './components/ContactCard';
import { FinalDeckAnimation } from './components/FinalDeckAnimation';
import { cardAudio } from './utils/audio';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMuted, setIsMuted] = useState(false);

  // Toggle sound effects
  const handleToggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    cardAudio.enabled = !nextState;
    if (!nextState) {
      cardAudio.playDeal();
    }
  };

  // Scroll to selected section
  const handleSelectSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Intersection observer to track current section for background & navigation
  useEffect(() => {
    const sections = [
      'hero',
      'about',
      'skills',
      'projects',
      'experience',
      'education',
      'certifications',
      'hobbies',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  const handleReshuffle = () => {
    setHasStarted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-100 overflow-x-hidden">
      {/* Custom Physics Cursor for Desktop */}
      <CustomCursor />

      {/* Dynamic Luxury Velvet Card Table Background */}
      <TableBackground activeSection={activeSection} />

      {/* Opening Intro Deck Experience */}
      {!hasStarted && (
        <OpeningDeckModal onComplete={() => setHasStarted(true)} />
      )}

      {/* Persistent Card Fan Navigation */}
      <CardFanNav
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Portfolio Sections Structured as Playing Card Deck */}
      <main className="relative z-10 space-y-16 pb-24">
        {/* HERO CARD (K♠) */}
        <HeroCard
          onDrawDeck={() => handleSelectSection('about')}
          onViewProjects={() => handleSelectSection('projects')}
        />

        {/* ABOUT CARD (A♠) */}
        <AboutCard />

        {/* SKILLS TOOLKIT (K♣) */}
        <SkillsDeck />

        {/* PROJECTS HAND (Q♦) */}
        <ProjectCards />

        {/* EXPERIENCE STACK (J♥) */}
        <ExperienceStack />

        {/* EDUCATION HAND (10♠ & 9♠) */}
        <EducationHand />

        {/* CERTIFICATIONS DECK (9♦) */}
        <CertificationDeck />

        {/* HOBBIES HAND (8♥) */}
        <HobbiesHand />

        {/* CONTACT CARD (A♥) */}
        <ContactCard />

        {/* FINAL DECK ANIMATION & RESHUFFLE (S♠) */}
        <FinalDeckAnimation onReshuffle={handleReshuffle} />
      </main>

      {/* IMMERSIVE UI BOTTOM STATUS HUD */}
      <div className="fixed bottom-3 inset-x-0 z-30 px-4 md:px-8 pointer-events-none hidden sm:flex justify-between items-center max-w-7xl mx-auto">
        {/* Bottom Left: Deck Statistics */}
        <div className="pointer-events-auto flex items-center gap-3 bg-[#050B18]/90 backdrop-blur-md border border-[#D4AF37]/35 px-4 py-2 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-cinzel text-[11px] font-bold text-[#D4AF37] tracking-wider">
            DECK STATUS: DEALT
          </span>
          <span className="text-[#E4E3E0]/40">•</span>
          <span className="font-mono-code text-[10px] text-[#E4E3E0]/80">
            52-CARD ARCHITECTURE
          </span>
        </div>

        {/* Bottom Center: Suit Quick Nav Indicators */}
        <div className="pointer-events-auto hidden lg:flex items-center gap-2 bg-[#050B18]/90 backdrop-blur-md border border-[#D4AF37]/35 px-4 py-1.5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          {[
            { id: 'hero', icon: '♠', label: 'HERO (K♠)', active: activeSection === 'hero' },
            { id: 'about', icon: '♠', label: 'ORIGIN (A♠)', active: activeSection === 'about' },
            { id: 'skills', icon: '♣', label: 'TOOLKIT (K♣)', active: activeSection === 'skills' },
            { id: 'projects', icon: '♦', label: 'PROJECTS (Q♦)', active: activeSection === 'projects' },
            { id: 'experience', icon: '♥', label: 'PRACTICUM (J♥)', active: activeSection === 'experience' },
            { id: 'contact', icon: '♥', label: 'CONNECT (A♥)', active: activeSection === 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectSection(item.id)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-cinzel font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                item.active
                  ? 'bg-[#D4AF37] text-[#141414] shadow-sm'
                  : 'text-[#E4E3E0]/70 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Bottom Right: Active Hand Indicator */}
        <div className="pointer-events-auto flex items-center gap-2 bg-[#050B18]/90 backdrop-blur-md border border-[#D4AF37]/35 px-4 py-2 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <span className="font-mono-code text-[10px] text-[#E4E3E0]/70">ACTIVE HAND:</span>
          <span className="font-cinzel text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
            {activeSection}
          </span>
        </div>
      </div>
    </div>
  );
}
