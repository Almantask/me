import type { Project } from '../types'

export const projects: readonly Project[] = [
  {
    id: 'sunderplace',
    name: 'Sunderplace',
    years: '2026 — dabar',
    blurb:
      'Stalo žaidimų aplinkos ir garso efektų rinkinių prekyvietė. Be prenumeratos: perki rinkinio versijos kopiją arba vienkartinį leidimą jo atnaujinimams.',
    tech: ['React', 'Cloudflare Workers', 'Stripe'],
    href: 'https://github.com/Almantask/sounderplace',
  },
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
    id: 'tokenizer',
    name: 'Ready-to-Print Tokenizer',
    years: '2026',
    blurb:
      'Bet kokį paveikslėlį paverčia apvaliu, spalvinto krašto D&D žetonu ir sudėlioja jų rinkinį A4 lape — po 70 lape, tiksliai colio dydžio.',
    tech: ['TypeScript', 'Canvas', 'PDF'],
    href: 'https://almantask.github.io/dnd-ready-to-print-tokenizer/',
  },
  {
    id: 'map-to-poster',
    name: 'Map to Poster',
    years: '2026',
    blurb:
      'Didelį žemėlapį ar paveikslėlį padalija per A0–A6 lapus ir eksportuoja spausdinti parengtą PDF, iškart rodydamas išklotinę ir tikrąją spaudos DPI. Niekas neišeina iš naršyklės.',
    tech: ['JavaScript', 'Canvas', 'PDF'],
    href: 'https://almantask.github.io/image-splitter-for-printing/',
  },
  {
    id: 'bestiary',
    name: 'The Bestiary',
    years: '2026',
    blurb:
      'D&D 5e pabaisų dirbtuvė: sugeneruoji subalansuotą charakteristikų lentelę ir tapytą portretą, abu pasitaisai ranka, o kauliukus su tikra fizika meti tiesiai iš lentelės.',
    tech: ['TypeScript', 'Three.js', 'LLM'],
    href: 'https://bestiary-api-4klhpyohsa-uc.a.run.app/',
  },
  {
    id: 'geoclash',
    name: 'GeoClash',
    years: '2026',
    blurb:
      'Geografijos spėliojimo žaidimas akluose žemėlapiuose. Užuominos atsirakina laikmačiu, o paskutinė paverčia žymeklį „šalta–karšta“ termometru.',
    tech: ['JavaScript', 'Leaflet', 'i18n'],
    href: 'https://almantask.github.io/location-finder-game-hot/',
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
    id: 'dnd-zemaiciai',
    name: 'D&D Žemaičiai',
    years: '2024 — 2025',
    blurb:
      'Namudinės D&D kampanijos, vykstančios viduramžių Žemaitijoje, vikis — veikėjų lapai, sesijų aprašai, vietos ir namų taisyklės. Lietuviškai, savo stalui.',
    tech: ['Docusaurus', 'MDX', 'TypeScript'],
    href: 'https://almantask.github.io/dnd-zemaiciai-web/',
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
