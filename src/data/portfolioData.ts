import {
  NavCardItem,
  SkillItem,
  ProjectItem,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  HobbyItem,
} from '../types';

export const PERSONAL_INFO = {
  name: 'SANTHOSH BALAJI G',
  shortName: 'Santhosh Balaji',
  signature: 'SB',
  role: 'MCA Graduate • Software Developer',
  title: 'SOFTWARE DEVELOPER',
  subtitle: 'Python • Java • SQL • Web Technologies',
  email: 'santhoshbalajigm07@gmail.com',
  phone: '+91 9791871968',
  location: 'Trichy - 620011, Tamil Nadu, India',
  languages: ['Tamil', 'English'],
  objective:
    'Motivated MCA graduate with strong programming skills and a passion for software development. Familiar with Java, Python, SQL, and web technologies. Quick learner, team player, and eager to apply technical knowledge to solve real-world problems and engineer scalable software.',
  references: [
    {
      name: 'Dr. R. Thamaraiselvi, M.Sc., M.Phil., Ph.D., SET.NET',
      role: 'Director - MCA, PG Department of Computer Applications',
      institution: 'Bishop Heber College, Tiruchirappalli',
      contact: 'thams.ca@bhc.edu.in | +91 94860 90372',
    },
    {
      name: 'Dr. Anita Priya Raja',
      role: 'Training & Placement Officer',
      institution: 'Bishop Heber College, Tiruchirappalli',
      contact: 'herberplacemerit@bhc.edu.in | +91 97860 88211',
    },
  ],
};

export const NAV_CARDS: NavCardItem[] = [
  { id: 'about', rank: 'A', suit: 'spades', label: 'ABOUT', sublabel: 'The Player', color: 'from-violet-600 to-indigo-700' },
  { id: 'skills', rank: 'K', suit: 'clubs', label: 'SKILLS', sublabel: 'The Toolkit', color: 'from-emerald-600 to-teal-700' },
  { id: 'projects', rank: 'Q', suit: 'diamonds', label: 'PROJECTS', sublabel: 'Project Hand', color: 'from-rose-600 to-amber-700' },
  { id: 'experience', rank: 'J', suit: 'hearts', label: 'EXPERIENCE', sublabel: 'Work Hand', color: 'from-pink-600 to-purple-700' },
  { id: 'education', rank: '10', suit: 'spades', label: 'EDUCATION', sublabel: 'Academic Deck', color: 'from-blue-600 to-cyan-700' },
  { id: 'certifications', rank: '9', suit: 'diamonds', label: 'CERTIFICATIONS', sublabel: 'Verified Badges', color: 'from-amber-600 to-yellow-600' },
  { id: 'hobbies', rank: '8', suit: 'hearts', label: 'HOBBIES', sublabel: 'Personal Hand', color: 'from-orange-500 to-rose-600' },
  { id: 'contact', rank: 'A', suit: 'hearts', label: 'CONTACT', sublabel: "Let's Connect", color: 'from-red-600 to-rose-800' },
];

export const TECHNICAL_SKILLS: SkillItem[] = [
  {
    name: 'Python',
    category: 'core',
    suit: 'spades',
    levelText: 'Core Language',
    description: 'Object-Oriented Programming, Scripting, Flask Backend API integration & Automation algorithms.',
    iconName: 'Code2',
    codeSnippet: 'def engineer(): return "Robust Solution"',
  },
  {
    name: 'Java',
    category: 'core',
    suit: 'clubs',
    levelText: 'Enterprise OOP',
    description: 'Core Java, Collections Framework, Multithreading, OOP paradigms & Enterprise architecture.',
    iconName: 'Coffee',
    codeSnippet: 'public class Developer { void solve() {} }',
  },
  {
    name: 'SQL',
    category: 'database',
    suit: 'diamonds',
    levelText: 'Data Architecture',
    description: 'Relational database schema design, Complex JOINs, Query optimization & indexing strategies.',
    iconName: 'Database',
    codeSnippet: 'SELECT * FROM talent WHERE passion = true;',
  },
  {
    name: 'MySQL',
    category: 'database',
    suit: 'diamonds',
    levelText: 'Relational DB',
    description: 'ACID transactional integrity, relational schema normalization, triggers and stored procedures.',
    iconName: 'Server',
    codeSnippet: 'CREATE TABLE secure_vault (id INT PRIMARY KEY);',
  },
  {
    name: 'Spring Boot',
    category: 'backend',
    suit: 'clubs',
    levelText: 'Java Framework',
    description: 'RESTful API controllers, Dependency Injection, Data JPA repository services & backend micro-modules.',
    iconName: 'Cpu',
    codeSnippet: '@RestController @RequestMapping("/api")',
  },
  {
    name: 'Flask',
    category: 'backend',
    suit: 'spades',
    levelText: 'Python Microframework',
    description: 'Lightweight web services, routing, OTP authentication handlers and facial recognition pipelines.',
    iconName: 'Flame',
    codeSnippet: '@app.route("/auth/verify", methods=["POST"])',
  },
  {
    name: 'JavaScript',
    category: 'web',
    suit: 'hearts',
    levelText: 'Client Scripting',
    description: 'Dynamic DOM manipulation, asynchronous Fetch API workflows, event loops, and local storage state.',
    iconName: 'Braces',
    codeSnippet: 'async function fetchHand() { await deal(); }',
  },
  {
    name: 'HTML5',
    category: 'web',
    suit: 'hearts',
    levelText: 'Markup & Semantic',
    description: 'Semantic markup architecture, accessible UI structures, and responsive cross-device layouts.',
    iconName: 'Layout',
    codeSnippet: '<section class="luxury-deck"></section>',
  },
  {
    name: 'CSS3',
    category: 'web',
    suit: 'hearts',
    levelText: 'Styling & Layouts',
    description: 'Modern Flexbox, CSS Grid systems, 3D perspective transforms, keyframe transitions & themes.',
    iconName: 'Palette',
    codeSnippet: '.card { transform: rotateY(180deg); }',
  },
];

export const SOFT_SKILLS = [
  { name: 'Fast Learner', suit: 'spades' as const, detail: 'Quickly grasps new languages, frameworks, and system architectures.' },
  { name: 'Active Listening', suit: 'hearts' as const, detail: 'Carefully understands project specifications and client requirements.' },
  { name: 'Teamwork', suit: 'clubs' as const, detail: 'Collaborative agile teammate delivering unified codebase solutions.' },
  { name: 'Time Management', suit: 'diamonds' as const, detail: 'Disciplined sprint delivery and timely milestone execution.' },
  { name: 'Effective Communication', suit: 'spades' as const, detail: 'Clear technical documentation and cross-functional synergy.' },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'secure-file-sharing',
    rank: 'A',
    suit: 'spades',
    cardNumber: 'CARD 01',
    title: 'Secure File Sharing Platform',
    subtitle: 'Using Facial Recognition & OTP Authentication',
    date: 'Jan 2026 – Mar 2026',
    description:
      'Developed a multi-layered secure file sharing system using Python, Flask, and MySQL. Features biometric facial recognition validation combined with email-based OTP verification for high-assurance user access control.',
    highlights: [
      'Biometric facial verification barrier to authenticate user identity prior to access',
      'Dual-factor email-based One-Time Password (OTP) authentication flow',
      'AES encrypted file upload & download pipelines preventing unauthorized data tampering',
      'Secure cloud storage integration with audited access logging in MySQL',
    ],
    techStack: ['Python', 'Flask', 'MySQL', 'Facial Recognition', 'OTP Authentication', 'Cryptography'],
    category: 'Cybersecurity & Web Platform',
    colorTheme: {
      accent: '#3b82f6',
      border: 'border-blue-500/40',
      glow: 'rgba(59, 130, 246, 0.3)',
      badge: 'bg-blue-950/80 text-blue-300 border-blue-700/50',
    },
  },
  {
    id: 'precision-fishing',
    rank: 'K',
    suit: 'clubs',
    cardNumber: 'CARD 02',
    title: 'Powered Precision Fishing System',
    subtitle: 'Using Internet of Things & Real-Time Analytics',
    date: 'Dec 2023 – Apr 2024',
    description:
      'Engineered an IoT-powered autonomous fishing boat prototype integrated with real-time sensor telemetry and advanced computational algorithms to optimize marine fish detection and remote navigation.',
    highlights: [
      'Autonomous boat navigation driven by micro-controller telemetric instructions',
      'Real-time marine sensor monitoring for temperature, depth, and sonar signals',
      'Intelligent fish detection algorithms optimizing catch efficiency and route planning',
      'Remote control command dashboard promoting sustainable and cost-effective fishing practices',
    ],
    techStack: ['IoT Algorithms', 'Python', 'Sensors Telemetry', 'Real-time Monitoring', 'Remote Systems'],
    category: 'IoT & Autonomous Systems',
    colorTheme: {
      accent: '#10b981',
      border: 'border-emerald-500/40',
      glow: 'rgba(16, 185, 129, 0.3)',
      badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50',
    },
  },
  {
    id: 'enterprise-web-application',
    rank: 'J',
    suit: 'diamonds',
    cardNumber: 'CARD 03',
    title: 'Interactive Web Application',
    subtitle: 'Full-Stack Architecture & State Management',
    date: 'May 2025 – Jun 2025',
    description:
      'Engineered a responsive multi-page web application featuring dynamic state handling, local storage synchronization, and RESTful service integration powered by Java Spring Boot and MySQL database persistence.',
    highlights: [
      'Modular client interface constructed with standards-compliant HTML5, CSS3, and JavaScript',
      'Client-side state persistence and caching utilizing browser Local Storage mechanisms',
      'High-throughput Java Spring Boot REST controllers for seamless frontend-backend communication',
      'Normalized relational MySQL database architecture ensuring transactional data consistency',
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Java Spring Boot', 'MySQL', 'Local Storage'],
    category: 'Full-Stack Web Engineering',
    colorTheme: {
      accent: '#f59e0b',
      border: 'border-amber-500/40',
      glow: 'rgba(245, 158, 11, 0.3)',
      badge: 'bg-amber-950/80 text-amber-300 border-amber-700/50',
    },
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    rank: 'J',
    suit: 'hearts',
    company: 'Extazee Software Solutions',
    role: 'Full Stack Development Intern',
    period: 'Dec 2023 – Apr 2024 / May 2025 – Jun 2025',
    location: 'Trichy, Tamil Nadu',
    type: 'Industry Internship',
    description:
      'Developed a responsive multi-page website and interactive web applications using HTML, CSS, and JavaScript with local storage, and gained hands-on experience in integrating frontend with backend systems using Java Spring Boot and MySQL.',
    skillsGained: ['HTML/CSS/JS', 'Java Spring Boot', 'MySQL', 'RESTful APIs', 'Client State Management'],
    highlights: [
      'Crafted pixel-perfect responsive user interfaces adhering to modern UI/UX design standards',
      'Implemented robust client-side storage mechanisms for persistent session preferences',
      'Designed and consumed RESTful endpoints connecting Java backend controllers to web views',
      'Participated in code reviews, bug remediation, and relational schema validation',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    rank: '10',
    suit: 'spades',
    degree: 'MCA',
    fullDegree: 'Master of Computer Applications',
    institution: 'Bishop Heber College',
    location: 'Tiruchirappalli, Tamil Nadu',
    period: '2024 – 2026',
    specialization: 'Computer Applications & Software Development',
    cgpa: '7.5 / 10.0',
    highlights: [
      'Advanced Software Engineering, Enterprise Java, Python & Database Design',
      'Lead student developer on cryptographic & biometric system implementations',
      'Active participant in technical symposiums and academic development seminars',
    ],
  },
  {
    rank: '9',
    suit: 'spades',
    degree: 'BCA',
    fullDegree: 'Bachelor of Computer Applications',
    institution: 'Bishop Heber College',
    location: 'Tiruchirappalli, Tamil Nadu',
    period: '2021 – 2024',
    specialization: 'Specialization in Computer Applications',
    cgpa: '7.00 / 10.0',
    highlights: [
      'Core foundation in C, C++, Java, Data Structures, Algorithms and RDBMS',
      'Completed practical capstone systems in web development and IoT prototypes',
      'Consistently demonstrated analytical excellence in core computing subjects',
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'infosys-python',
    rank: '9',
    suit: 'diamonds',
    title: 'Basics of Python',
    issuer: 'INFOSYS Springboard',
    focus: 'Python Syntax, Control Flow, Data Structures & Algorithmic Logic',
    badgeColor: 'from-amber-500/20 to-orange-500/30 text-amber-300 border-amber-500/40',
  },
  {
    id: 'systech-python',
    rank: '9',
    suit: 'clubs',
    title: 'Python Programming',
    issuer: 'SYSTECH Hardware & Networking Academy',
    focus: 'Advanced Python, Modular Scripting, File I/O & Practical Programming',
    badgeColor: 'from-emerald-500/20 to-teal-500/30 text-emerald-300 border-emerald-500/40',
  },
  {
    id: 'ibm-ai',
    rank: '9',
    suit: 'hearts',
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM SkillsBuild',
    focus: 'AI Architecture, Machine Learning Concepts, Ethics & Real-world AI Applications',
    badgeColor: 'from-rose-500/20 to-pink-500/30 text-rose-300 border-rose-500/40',
  },
];

export const HOBBIES: HobbyItem[] = [
  {
    suit: 'spades',
    title: 'Cricket',
    category: 'Strategic Athletics',
    tagline: 'Team collaboration, tactical positioning, split-second decision making under pressure.',
    icon: 'Activity',
    color: 'from-indigo-600 to-blue-700',
  },
  {
    suit: 'hearts',
    title: 'Volleyball',
    category: 'High-Agility Sport',
    tagline: 'Reflexive coordination, synchronised spiking rhythms, and high-energy camaraderie.',
    icon: 'Zap',
    color: 'from-rose-600 to-red-700',
  },
  {
    suit: 'diamonds',
    title: 'Badminton',
    category: 'Precision & Speed',
    tagline: 'Rapid footwork, wrist dexterity, stamina, and strategic court placement.',
    icon: 'Target',
    color: 'from-amber-600 to-orange-700',
  },
];
