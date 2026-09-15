import type { Link, Section } from '../types'

export const profile = {
  name: 'Almantas Karpavičius',
  role: 'Engineering Manager',
  org: 'Nord Security',
  /** The one line that should stick if a reader takes nothing else away. */
  tagline: 'I like coding. I like growing people a lot more.',
  intro:
    'My day job is leading a team. Outside it, I write, speak at conferences, teach and mentor.',
  location: 'Kaunas, Lithuania',
  email: 'almantusk@gmail.com',
} as const

export const socials: readonly Link[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/almantas-karpavicius' },
  { label: 'GitHub', href: 'https://github.com/Almantask' },
  { label: 'YouTube', href: 'https://www.youtube.com/c/AlmantasKarpavi%C4%8Dius' },
]

/** His own words, lightly edited. Order carries the argument. */
export const about: readonly string[] = [
  'At some point in my career I had to decide: the technical route or the management route. I like coding, but helping people grow matters more to me. 1:1s are my favourite spend of professional time.',
  'In my career I had a mentor for only a brief time, and it helped me a lot. So I decided to be that person for others. That is why I organised two C# bootcamps, ran a Coding Dojo at KTU for three years, wrote two books, taught 100+ programming lessons and started the C# Inn community. I really like sharing what I know.',
  'For the last three years I have been building things with AI (software, agents, music) and working out how classical engineering practice holds up when a model writes half the code.',
  'I am an idealist. I believe the world would be a lot better if people contributed to a conversation instead of defending their opinion. I want to encourage others to help for a "thank you", for mutual growth and for sleeping well at night.',
]

export const quote = {
  text:
    'To protect an impossible dream is foolish, they say. But a dream worth protecting is what keeps this foolish heart alive.',
  source: 'Rurouni Kenshin (Samurai X)',
  note: 'A quote, and a mindset, dear to me.',
} as const

export const hobbies: readonly string[] = [
  'Dungeon mastering',
  'Board games',
  'PC games',
  'Philosophy',
  'Gym',
]

export const beyond =
  'Outside work I run tabletop games. I am a dungeon master, and a fair few of my side projects exist because a campaign needed them. The rest of my free time goes to board games, PC games, philosophy and the gym.'

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
