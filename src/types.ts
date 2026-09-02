export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';

export interface NavCardItem {
  id: string;
  rank: string;
  suit: Suit;
  label: string;
  sublabel: string;
  color: string;
}

export interface SkillItem {
  name: string;
  category: 'core' | 'web' | 'backend' | 'database' | 'soft';
  suit: Suit;
  levelText: string;
  description: string;
  iconName?: string;
  codeSnippet?: string;
}

export interface ProjectItem {
  id: string;
  rank: string;
  suit: Suit;
  cardNumber: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  highlights: string[];
  techStack: string[];
  category: string;
  colorTheme: {
    accent: string;
    border: string;
    glow: string;
    badge: string;
  };
}

export interface ExperienceItem {
  rank: string;
  suit: Suit;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  skillsGained: string[];
  highlights: string[];
}

export interface EducationItem {
  rank: string;
  suit: Suit;
  degree: string;
  fullDegree: string;
  institution: string;
  location: string;
  period: string;
  specialization: string;
  cgpa: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  rank: string;
  suit: Suit;
  title: string;
  issuer: string;
  focus: string;
  badgeColor: string;
}

export interface HobbyItem {
  suit: Suit;
  title: string;
  category: string;
  tagline: string;
  icon: string;
  color: string;
}
