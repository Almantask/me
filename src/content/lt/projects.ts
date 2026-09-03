import type { Project } from '../types'

export const projects: readonly Project[] = [
  {
    id: 'sunder',
    name: 'Sunder',
    years: '2026 — dabar',
    blurb: 'Suno kūrinių atsisiuntiklis ir muzikos klasifikatorius, modelį sukantis vietinėje GPU.',
    tech: ['Python', 'GPU', 'Garso ML'],
    href: 'https://github.com/Almantask/sunder',
  },
  {
    id: 'thunder-fx',
    name: 'Thunder-fx',
    years: '2026 — dabar',
    blurb:
      'Instrumentinės muzikos ir garso efektų generatorius su užklausų biblioteka ir šimtų užklausų apdorojimu eilėje.',
    tech: ['Python', 'Generatyvus garsas'],
    href: 'https://github.com/Almantask/thunder-fx',
  },
  {
    id: 'arcanum-audio',
    name: 'Arcanum Audio',
    years: '2025 — dabar',
    blurb:
      'Garsų pultas ir aplinkos garsų maišytuvas stalo RPG žaidimams. Pirmiausia — savo paties stalui.',
    tech: ['TypeScript', 'Web Audio', 'React'],
    href: 'https://almantask.github.io/rpg-audio-mixer-web/',
  },
  {
    id: 'baltic-gods',
    name: 'Baltic Gods',
    years: '2025 — dabar',
    blurb: 'Daugiakalbė svetainė apie baltų mitologiją.',
    tech: ['Next.js', 'MDX', 'i18n'],
    href: 'https://almantask.github.io/baltic-gods/',
  },
  {
    id: 'csharp-zero-to-hero',
    name: 'C# From Zero To Hero',
    years: '2020',
    blurb:
      'Nemokamas, užduotimis paremtas C# kursas nuo nulio. Vis dar tai, dėl ko man dažniausiai parašo.',
    tech: ['C#', '.NET', 'Mokymas'],
    href: 'https://github.com/Almantask/CSharp-From-Zero-To-Hero',
    badge: '1000+ žvaigždučių',
  },
  {
    id: 'philosophers-timeline',
    name: "Philosophers' Timeline",
    years: '2023',
    blurb:
      'Pragmatiška svetainė, kaupianti mano žinias apie filosofus — su fokusu į greitą paiešką, o ne gražius puslapius.',
    tech: ['TypeScript', 'Paieška'],
    href: 'https://github.com/Almantask/philosophers-timeline',
  },
  {
    id: 'japanese-crossword',
    name: 'Japanese Crossword',
    years: '2018',
    blurb: 'Japoniškų kryžiažodžių generatorius.',
    tech: ['C#', 'Algoritmai'],
    href: 'https://github.com/Almantask/JapaneseCrossword',
  },
]
