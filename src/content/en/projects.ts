import type { Project } from '../types'

/** Newest first — the 2026 AI/music work is where he is now. */
export const projects: readonly Project[] = [
  {
    id: 'sunderplace',
    name: 'Sunderplace',
    years: '2026 — now',
    blurb:
      'A marketplace for tabletop ambience and sound-effect packs. No subscription: buy a snapshot of a pack, or a one-time pass for its updates.',
    tech: ['React', 'Cloudflare Workers', 'Stripe'],
    href: 'https://github.com/Almantask/sounderplace',
  },
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
    id: 'tokenizer',
    name: 'Ready-to-Print Tokenizer',
    years: '2026',
    blurb:
      'Turns any picture into a round, tinted D&D token, then lays a set of them out on A4 — 70 to a page, printed at exactly one inch.',
    tech: ['TypeScript', 'Canvas', 'PDF'],
    href: 'https://almantask.github.io/dnd-ready-to-print-tokenizer/',
  },
  {
    id: 'map-to-poster',
    name: 'Map to Poster',
    years: '2026',
    blurb:
      'Splits a large map or image across A0–A6 sheets and exports a print-ready PDF, previewing the tiling and the real print DPI as you go. Nothing leaves the browser.',
    tech: ['JavaScript', 'Canvas', 'PDF'],
    href: 'https://almantask.github.io/image-splitter-for-printing/',
  },
  {
    id: 'bestiary',
    name: 'The Bestiary',
    years: '2026',
    blurb:
      'A D&D 5e monster workshop: generate a balanced statblock and a painted portrait, edit either by hand, and roll 3D physics dice straight off the sheet.',
    tech: ['TypeScript', 'Three.js', 'LLM'],
    href: 'https://bestiary-api-4klhpyohsa-uc.a.run.app/',
  },
  {
    id: 'geoclash',
    name: 'GeoClash',
    years: '2026',
    blurb:
      'A geography guessing game on a blind map. Hints unlock on a timer, and the last one turns the cursor into a hot-and-cold thermometer.',
    tech: ['JavaScript', 'Leaflet', 'i18n'],
    href: 'https://almantask.github.io/location-finder-game-hot/',
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
    id: 'dnd-zemaiciai',
    name: 'D&D Žemaičiai',
    years: '2024 — 2025',
    blurb:
      'A campaign wiki for a homebrew D&D game set in medieval Samogitia — party sheets, session logs, locations and house rules. In Lithuanian, for the table that plays it.',
    tech: ['Docusaurus', 'MDX', 'TypeScript'],
    href: 'https://almantask.github.io/dnd-zemaiciai-web/',
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
