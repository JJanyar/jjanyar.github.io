// All content of the portfolio lives here. Edit this file to update the site.

export const profile = {
  name: 'Janyar Muslem',
  shortName: 'Janyar M.',
  role: 'IT Developer @ Holysmartphone',
  location: 'Beverwijk',
  age: 19,
  photo: '/img/profilephoto.jpeg',
  photoFallback: '/img/profilephoto_alt.png',
  quote: "I'm a passionate developer, always looking for new challenges and opportunities to learn.",
  email: 'janyarmuslem@gmail.com',
  phone: '+31657710552',
  phoneDisplay: '+31 6 57710552',
};

export const socials = [
  { label: 'GitHub', icon: 'brand-github', href: 'https://github.com/JJanyar' },
  { label: 'LinkedIn', icon: 'brand-linkedin', href: 'https://www.linkedin.com/in/janyarmuslem' },
  { label: 'CV', icon: 'file-cv', href: '/CV_Janyar.pdf' },
  { label: 'Email', icon: 'mail', href: `mailto:${profile.email}` },
  { label: 'Phone', icon: 'phone', href: `tel:${profile.phone}` },
];

export type Skill = { name: string; icon: string };

export const skillGroups: { label: string; skills: Skill[] }[] = [
  {
    label: 'Frontend',
    skills: [
      { name: 'HTML', icon: 'brand-html5' },
      { name: 'CSS', icon: 'brand-css3' },
      { name: 'JavaScript', icon: 'brand-javascript' },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'PHP', icon: 'brand-php' },
      { name: 'MySQL', icon: 'database' },
    ],
  },
  {
    label: 'CMS',
    skills: [{ name: 'WordPress', icon: 'brand-wordpress' }],
  },
];

// Dates are 'YYYY-MM'. Leave `end` out for a job you still have.
export type Role = { title: string; start: string; end?: string; description: string };
export type Company = { name: string; place?: string; logo: string; roles: Role[] };

// Newest first.
export const experience: Company[] = [
  {
    name: 'Holysmartphone',
    logo: '/img/holysmartphone-logo.png',
    roles: [
      {
        title: 'IT Developer',
        start: '2026-05',
        description:
          'I develop and maintain holysmartphone.nl, the webshop and repair website of a phone, tablet and laptop repair store.',
      },
      {
        title: 'Intern',
        start: '2026-01',
        end: '2026-05',
        description:
          'A five-month internship focused on web development and design, after which I was hired as IT Developer.',
      },
    ],
  },
  {
    name: 'DHL',
    logo: '/img/DHL-Logo.png',
    roles: [
      {
        title: 'Courier',
        start: '2025-04',
        description: 'Delivering parcels on the side next to my study and work.',
      },
    ],
  },
  {
    name: "Mes's Burger Factory",
    place: 'Beverwijk',
    logo: '/img/Mess-Burger-Factory-Logo.png',
    roles: [
      {
        title: 'All round',
        start: '2023-01',
        end: '2025-03',
        description:
          'All-round worker at a local restaurant for two years. I learned a lot about working in a team, handling customers and training new crew members.',
      },
    ],
  },
  {
    name: 'Albert Heijn',
    place: 'Beverwijk',
    logo: '/img/Albert-Heijn-Logo.png',
    roles: [
      {
        title: 'Filling crew',
        start: '2021-11',
        end: '2022-03',
        description:
          'Stocking shelves for about five months, where I learned social interaction and patience with customers.',
      },
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  site?: { href: string; label: string };
  source?: string;
};

export const projects: Project[] = [
  {
    title: 'Holysmartphone',
    description:
      'Webshop and repair website for a phone, tablet and laptop repair store. Built and maintained in my role as IT Developer.',
    image: '/img/holysmartphone.jpg',
    tags: ['Webshop', 'Web Design', 'SEO'],
    site: { href: 'https://holysmartphone.nl', label: 'Visit Site' },
  },
  {
    title: 'Tripframe',
    description:
      'Free dashcam footage viewer that opens your SD card in the browser, with synced front and rear playback, frame stepping and a GPS route map.',
    image: '/img/tripframe.jpg',
    tags: ['Web App', 'Video', 'GPS'],
    site: { href: 'https://tripframe.vercel.app', label: 'Visit Site' },
  },
  {
    title: 'OvenExpert',
    description: 'Professional service landing page optimized for client conversion and online visibility.',
    image: '/img/ovenexpert.jpg',
    tags: ['Web Design', 'JS', 'SEO'],
    site: { href: 'https://ovenexpert.nl', label: 'Visit Site' },
  },
  {
    title: 'Movie Mentor',
    description: 'Interactive platform for discovering movies and games with real-time data integration.',
    image: '/img/moviementor.png',
    tags: ['JS', 'API', 'CSS'],
    source: 'https://github.com/JJanyar/MovieMentor',
  },
  {
    title: 'File Explorer',
    description: 'A modern web-based file manager for browsing and managing files directly in the browser.',
    image: '/img/fileexplorer.png',
    tags: ['PHP', 'HTML', 'CSS'],
    source: 'https://github.com/JJanyar/PHP-File-Explorer',
  },
];

export const contacts = [
  { label: 'Email', icon: 'mail', text: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', icon: 'phone-ringing', text: profile.phoneDisplay, href: `tel:${profile.phone}` },
  { label: 'GitHub', icon: 'brand-github', text: '@JJanyar', href: 'https://github.com/JJanyar' },
  { label: 'Instagram', icon: 'brand-instagram', text: '@Janyar.7', href: 'https://instagram.com/janyar.7/' },
];
