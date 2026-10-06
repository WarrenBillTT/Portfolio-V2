export interface Project {
  name: string
  desc: string
  stack: string[]
  status: 'live' | 'wip'
  image: string
  github: string
  demo: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Builder AI',
    desc: 'AI-powered no-code website builder - describe your idea in a prompt and it designs, structures, and launches the site instantly, with templates for landing pages, resumes, blogs, and portfolios.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'AI/LLM'],
    status: 'wip',
    image: '/projects/builder-ai.png',
    github: 'https://github.com/WarrenBillTT/Builder-AI',
    demo: '#',
  },
  {
    name: 'HealthFlow',
    desc: 'Health & fitness tracker for logging calories, sleep, and exercise, with automated weekly progress reports and smart reminders.',
    stack: ['PostgreSQL', 'Express', 'React', 'Node.js'],
    status: 'live',
    image: '/projects/healthflow.png',
    github: 'https://github.com/WarrenBillTT/HealthFlow',
    demo: 'https://healthflow-app.vercel.app/',
  },
  {
    name: 'Amazon Clone',
    desc: 'Full-stack e-commerce web application inspired by Amazon, featuring authentication, a shopping basket, and secure checkout with real payment processing.',
    stack: ['Firebase', 'Express', 'React', 'Node.js', 'Stripe'],
    status: 'live',
    image: '/projects/amazon-clone.png',
    github: 'https://github.com/WarrenBillTT/Amazon-Clone',
    demo: '#',
  },
  {
    name: 'Color Studio',
    desc: 'A web app for mixing multiple colors using subtractive (CMY-based) color mixing, creating realistic paint-like results rather than simple RGB averages.',
    stack: ['PostgreSQL', 'Express', 'React', 'Node.js'],
    status: 'live',
    image: '/projects/color-studio.png',
    github: 'https://github.com/WarrenBillTT/Color-Studio',
    demo: '#',
  },
  {
    name: 'Aeroluxe',
    desc: 'Luxury private aviation landing page featuring cinematic scroll-driven canvas animations, real-time timezone tracking, and an interactive private jet fleet showcase.',
    stack: ['React', 'Tailwind CSS', 'Trending'],
    status: 'live',
    image: '/projects/aeroluxe.png',
    github: 'https://github.com/WarrenBillTT/Aeroluxe',
    demo: 'https://aeroluxe-wb.vercel.app/',
  },
  {
    name: 'Portfolio V1',
    desc: 'An interactive personal portfolio built with React and Three.js, showcasing work experience and projects with 3D animations and smooth transitions.',
    stack: ['React', 'Tailwind CSS', 'Three.js'],
    status: 'live',
    image: '/projects/portfolio.png',
    github: 'https://github.com/WarrenBillTT/Portfolio-V1',
    demo: '#',
  },
  {
    name: 'iPhone Clone',
    desc: 'A cinematic, scroll-driven product landing page inspired by Apple. Features smooth 3D product animations using canvas frame rendering and inertia-based scrolling.',
    stack: ['React', 'Tailwind CSS', 'Trending'],
    status: 'live',
    image: '/projects/iphone.png',
    github: 'https://github.com/WarrenBillTT/Iphone',
    demo: 'https://iphone-wb.vercel.app/',
  },
  {
    name: 'HISHOT 2026',
    desc: 'Official website for HISHOT 2026 event by HIMTI Binus University.',
    stack: ['React', 'Tailwind CSS'],
    status: 'live',
    image: '/projects/hishot.png',
    github: 'https://github.com/HIMTI-Binus-University/HISHOT-2026',
    demo: 'https://hishot.himtibinus.or.id/',
  },
  {
    name: 'TECHNO 2026',
    desc: 'Official website for TECHNO 2026 event by HIMTI Binus University.',
    stack: ['React', 'Tailwind CSS'],
    status: 'live',
    image: '/projects/techno.png',
    github: 'https://github.com/HIMTI-Binus-University/TECHNO-2026',
    demo: 'https://techno.himtibinus.or.id/',
  },
  {
    name: 'FloodPredix',
    desc: 'Smart IoT & AI-powered flood detection platform providing real-time rainfall analysis, predictive flood hazard alerts, and sensor telemetry monitoring.',
    stack: ['React', 'Tailwind CSS', 'IoT', 'ML'],
    status: 'live',
    image: '/projects/flood-predix.png',
    github: 'https://github.com/WarrenBillTT/FloodPredix',
    demo: '#',
  },
]