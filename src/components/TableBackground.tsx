import React from 'react';
import { motion } from 'motion/react';

interface TableBackgroundProps {
  activeSection?: string;
}

export const TableBackground: React.FC<TableBackgroundProps> = ({ activeSection = 'hero' }) => {
  // Map sections to their atmospheric ambient gold & royal tones
  const getGlowGradients = () => {
    switch (activeSection) {
      case 'about':
        return 'from-blue-900/25 via-[#101E36]/30 to-transparent';
      case 'skills':
        return 'from-emerald-900/20 via-[#101E36]/30 to-transparent';
      case 'projects':
        return 'from-amber-900/25 via-[#101E36]/30 to-transparent';
      case 'experience':
        return 'from-rose-900/25 via-[#101E36]/30 to-transparent';
      case 'education':
        return 'from-indigo-900/25 via-[#101E36]/30 to-transparent';
      case 'certifications':
        return 'from-amber-900/25 via-[#101E36]/30 to-transparent';
      case 'hobbies':
        return 'from-red-900/20 via-[#101E36]/30 to-transparent';
      case 'contact':
        return 'from-rose-900/25 via-[#101E36]/30 to-transparent';
      default:
        return 'from-[#101E36]/40 via-[#0a1426]/30 to-transparent';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050B18]">
      {/* Immersive UI Deep Radial Gradient Base */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #101E36 0%, #050B18 100%)',
        }}
      />

      {/* Immersive UI Geometric Suit & Cards Motif Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L35 15H25L30 5zM30 55L25 45H35L30 55zM5 30L15 25V35L5 30zM55 30L45 35V25L55 30z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Atmospheric Ambient Lighting Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full blur-[130px] bg-gradient-to-br ${getGlowGradients()} transition-colors duration-1000`}
      />

      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-1/2 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] bg-gradient-to-tl ${getGlowGradients()} transition-colors duration-1000`}
      />

      {/* Extremely Faint Floating Watermark Suit Symbols */}
      <div className="absolute inset-0 select-none overflow-hidden font-cinzel">
        <motion.span
          animate={{ y: [0, -25, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[12%] left-[8%] text-8xl md:text-9xl text-[#D4AF37]/[0.035]"
        >
          ♠
        </motion.span>
        <motion.span
          animate={{ y: [0, 30, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[35%] right-[6%] text-8xl md:text-9xl text-rose-400/[0.03]"
        >
          ♥
        </motion.span>
        <motion.span
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[30%] left-[5%] text-8xl md:text-9xl text-[#D4AF37]/[0.035]"
        >
          ♦
        </motion.span>
        <motion.span
          animate={{ y: [0, 25, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[10%] right-[10%] text-8xl md:text-9xl text-emerald-400/[0.03]"
        >
          ♣
        </motion.span>
      </div>

      {/* Gold Rim Accents at Edges */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
    </div>
  );
};

