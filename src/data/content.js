export const profile = {
  name: 'Suharsh',
  tagline: 'Building ideas into *reality.*',
  intro:
    'Information Science & Engineering student, independent builder, and technology enthusiast exploring software, AI, and entrepreneurship.',
  philosophy: "Don't just follow the future. *Build* something that becomes part of it.",
  email: 'suharsh543@gmail.com',
  instagram: { handle: '@sm_suharsh', url: 'https://www.instagram.com/sm_suharsh/' },
  linkedin: { handle: 'suharsh-math', url: 'https://www.linkedin.com/in/suharsh-math-59269333a' },
}

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  statement:
    "I'm Suharsh, a B.Tech student of Information Science & Engineering at REVA University. Alongside my degree, I independently explore software development, AI and entrepreneurship, turning ideas into real products and businesses.",
  interests: ['Software development', 'AI', 'Business', 'Startups', 'Financial markets'],
  mindset: [
    { title: 'Curious by nature', text: 'I follow questions until they turn into experiments.' },
    { title: 'Learning through building', text: 'The fastest way to understand something is to make it.' },
    { title: 'Solving real-world problems', text: 'Ideas matter most when they help someone get something done.' },
    { title: 'Focused on long-term growth', text: 'Compounding skills and judgement, one project at a time.' },
  ],
}

export const projects = [
  {
    id: 'vskey',
    index: '01',
    title: 'VSKEY',
    kind: 'B2B trade brokerage concept',
    description:
      'VSKEY aims to connect buyers and suppliers through a structured brokerage process, with separate buyer and supplier experiences.',
    highlights: [
      'Product development',
      'Business model thinking',
      'Authentication flows',
      'Buyer and supplier portals',
    ],
    tags: ['React', 'Vite', 'Supabase', 'JavaScript'],
    link: null,
  },
  {
    id: 'vintage',
    index: '02',
    title: 'Vintage Stables',
    kind: 'Website for a horse stable and safari business',
    description:
      'A premium, mobile-first web experience created for a horse stable and safari business, presenting its mountain track, lake-view, and farm-land experiences.',
    highlights: [
      'Mountain track experience',
      'Lake-view safari',
      'Farm-land safari',
      'Premium visual presentation',
      'Mobile-first responsive design',
    ],
    tags: ['Web design', 'Web development', 'Mobile-first'],
    link: { href: 'https://vintagestables.com', label: 'Visit live website' },
  },
  {
    id: 'tuesday',
    index: '03',
    title: 'Tuesday / ACE',
    kind: 'Personal desktop AI assistant experiment',
    description:
      'Explored building a desktop voice assistant with wake-word detection, speech recognition, text generation, and desktop functionality.',
    highlights: ['Wake-word detection', 'Speech recognition', 'Text generation', 'Desktop functionality'],
    tags: ['Python', 'Vosk', 'Voice recognition'],
    link: null,
  },
]

export const skillGroups = [
  { id: 'programming', label: 'Programming', items: ['Python', 'C', 'C++'] },
  { id: 'frontend', label: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite'] },
  { id: 'tools', label: 'Tools & Technologies', items: ['Supabase', 'Git', 'GitHub', 'Three.js'] },
  {
    id: 'interests',
    label: 'Other Interests',
    items: ['AI & machine learning', 'Product development', 'Entrepreneurship', 'Forex & financial markets'],
  },
]

export const journey = [
  {
    title: 'Academic foundation',
    text: 'Studying Information Science & Engineering at REVA University, the base everything else is built on.',
  },
  {
    title: 'Exploring code',
    text: 'Discovering programming and software development, from Python, C and C++ to the modern web.',
  },
  {
    title: 'Personal AI experiments',
    text: 'Building Tuesday / ACE, a desktop voice assistant that explores wake-word detection and speech recognition.',
  },
  {
    title: 'Business websites',
    text: 'Designing and developing a premium website for Vintage Stables, a horse stable and safari business.',
  },
  {
    title: 'VSKEY',
    text: 'Creating a B2B trade brokerage concept: product development meets business model thinking.',
  },
  {
    title: 'Still building',
    text: 'Continuing to learn and build. The next chapter is not written yet.',
    ongoing: true,
  },
]

export const marqueeWords = ['Technology', 'Business', 'Innovation', 'AI', 'Startups', 'Markets']
