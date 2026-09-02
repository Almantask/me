import type { Project } from './types'

/** Newest first — the 2026 AI/music work is where he is now. */
export const projects: readonly Project[] = [
  {
    id: 'sunder',
    name: 'Sunder',
    years: '2026 — now',
    blurb: 'Suno track downloader and music classifier that runs the model on the host GPU.',
    tech: ['Python', 'GPU', 'Audio ML'],
    href: 'https://github.com/Almantask/sunder',
  },
  {
    id: 'thunder-fx',
    name: 'Thunder-fx',
    years: '2026 — now',
    blurb:
      'Instrumental music and sound-effect generator, with a prompt library and batch queueing for hundreds of prompts at once.',
    tech: ['Python', 'Generative audio'],
    href: 'https://github.com/Almantask/thunder-fx',
  },
  {
    id: 'arcanum-audio',
    name: 'Arcanum Audio',
    years: '2025 — now',
    blurb: 'A soundboard and ambience mixer for tabletop RPGs. Built for my own table first.',
    tech: ['TypeScript', 'Web Audio', 'React'],
    href: 'https://almantask.github.io/rpg-audio-mixer-web/',
  },
  {
    id: 'baltic-gods',
    name: 'Baltic Gods',
    years: '2025 — now',
    blurb: 'A multi-language reference site on Baltic mythology.',
    tech: ['Next.js', 'MDX', 'i18n'],
    href: 'https://almantask.github.io/baltic-gods/',
  },
  {
    id: 'csharp-zero-to-hero',
    name: 'C# From Zero To Hero',
    years: '2020',
    blurb:
      'A free, exercise-driven course for learning C# from scratch. Still the thing people email me about most.',
    tech: ['C#', '.NET', 'Teaching'],
    href: 'https://github.com/Almantask/CSharp-From-Zero-To-Hero',
    badge: '1000+ stars',
  },
  {
    id: 'philosophers-timeline',
    name: "Philosophers' Timeline",
    years: '2023',
    blurb:
      'A pragmatic site capturing what I know about philosophers, built around fast search rather than pretty pages.',
    tech: ['TypeScript', 'Search'],
    href: 'https://github.com/Almantask/philosophers-timeline',
  },
  {
    id: 'japanese-crossword',
    name: 'Japanese Crossword',
    years: '2018',
    blurb: 'A generator for nonogram puzzles.',
    tech: ['C#', 'Algorithms'],
    href: 'https://github.com/Almantask/JapaneseCrossword',
  },
]
