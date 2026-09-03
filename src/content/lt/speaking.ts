import type { Talk } from '../types'

/**
 * Pranešimų pavadinimai palikti originalo kalba — taip jie skelbti konferencijose
 * ir taip jie surašyti lietuviškame CV.
 */
export const talks: readonly Talk[] = [
  {
    id: 'verslo-zinios-2025',
    year: 2025,
    events: ['Verslo Žinios'],
    title: 'Effective use of AI',
  },
  {
    id: 'devcon-2024',
    year: 2024,
    events: ['DevCon'],
    title: 'The Power of Tests in the World of AI',
  },
  {
    id: 'testcon-2023',
    year: 2023,
    events: ['TestCon'],
    title: 'Identifying and testing details that matter in automated tests',
    href: 'https://www.youtube.com/watch?v=3NFpABLwk4M',
  },
  {
    id: 'kit-club-2023',
    year: 2023,
    events: ['KIT Club'],
    title: 'Coding Dojo',
  },
  {
    id: 'bdd-2022',
    year: 2022,
    events: ['TestCon', 'SEETEST', 'AutomateIT'],
    title: 'The 4 Pillars of BDD',
  },
  {
    id: 'ktu-lectures',
    year: 2021,
    events: ['KTU'],
    title: 'Kviestinės paskaitos apie karjerą ir programinės įrangos architektūrą (2021 — 2024)',
  },
  {
    id: 'build-stuff-2021',
    year: 2021,
    events: ['Build Stuff'],
    title: 'Liberating Structures',
    href: 'https://www.youtube.com/watch?v=_rRwiHhPNE8',
  },
]
