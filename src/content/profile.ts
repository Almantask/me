import type { Link, Section } from './types'

export const profile = {
  name: 'Almantas Karpavičius',
  role: 'Engineering Manager',
  org: 'Nord Security',
  /** The one line that should stick if a reader takes nothing else away. */
  tagline: 'I like coding. I like growing people a lot more.',
  intro:
    'Servant leader, author, public speaker, teacher and mentor — with a passion for people growth, software design, and building an engineering community.',
  location: 'Kaunas, Lithuania',
  email: 'almantusk@gmail.com',
} as const

export const socials: readonly Link[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/almantas-karpavicius' },
  { label: 'GitHub', href: 'https://github.com/Almantask' },
  { label: 'YouTube', href: 'https://www.youtube.com/c/AlmantasKarpavi%C4%8Dius' },
  { label: 'C# Inn Discord', href: 'https://discord.gg/rCMKcUU' },
  {
    label: 'Microsoft MVP',
    href: 'https://mvp.microsoft.com/en-us/PublicProfile/5004259?fullName=Almantas%20Karpavi%C4%8Dius',
  },
]

/** Shown under the hero. Deliberately the four numbers that say the most. */
export const heroFacts: readonly string[] = [
  '3× Microsoft MVP',
  '2 books',
  '7000+ community members',
  '100+ lessons taught',
]

/** His own words, lightly edited. Order carries the argument. */
export const about: readonly string[] = [
  'At some point in my career I had to decide: the technical route, or the management route. Although I like coding, I like growing people a lot more than growing codebases. 1:1s are my favourite spend of professional time.',
  'In my career I had a mentor for only a brief time, but I benefited enormously from it. So I decided I would be the person I needed so much back then. That mindset is what pushed me to organise two C# bootcamps, run a Coding Dojo at KTU for three years, write two books, give 100+ programming lessons, and start the C# Inn community. I really like sharing what I know and helping others grow.',
  'For the last three years I have been building things with AI — software, agents, music — and working out how classical engineering practice holds up when a model writes half the code.',
  'I am an idealist. I believe that if everyone contributed to a conversation rather than defended their opinion, the world would grow to be a better place. I want to encourage others to help for a "thank you", for the sake of mutual growth and sleeping well at night.',
]

export const quote = {
  text:
    'To protect an impossible dream is foolish, they say. But a dream worth protecting is what keeps this foolish heart alive.',
  source: 'Rurouni Kenshin (Samurai X)',
  note: 'A quote, and a mindset, dear to me.',
} as const

export const hobbies: readonly string[] = [
  'Dungeon mastering',
  'D&D',
  'Tabletop games',
  'PC games',
  'Philosophy',
  'Public speaking',
  'Gym',
]

export const beyond =
  'Outside work I run tabletop games — I am a dungeon master, and a fair few of my side projects exist because a campaign needed them. The rest of my free time goes to board games, PC games, philosophy and the gym.'

export const languages: readonly string[] = ['Lithuanian (native)', 'English (C1)', 'Russian (A1)']

export const education = [
  {
    id: 'ktu',
    qualification: 'BSc, Programming Systems',
    institution: 'Kaunas University of Technology',
    period: '2013 — 2017',
    note: 'Final work: "Soul Temple", a mobile game.',
  },
  {
    id: 'birstonas',
    qualification: 'High school, finished with honours',
    institution: 'Birštono Gimnazija',
    period: '2004 — 2013',
    note: '',
  },
] as const

export const sections: readonly Section[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'community', label: 'Community' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
]
