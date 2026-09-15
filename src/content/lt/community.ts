import type { CommunityItem, Stat } from '../types'

export const mentorshipBeats: readonly string[] = [
  'Per visą karjerą mentorių turėjau vos trumpą laiką.',
  'Nauda buvo milžiniška.',
  'Todėl nusprendžiau, kad tuo žmogumi kitam būsiu aš.',
]

export const mentorshipLede = 'Viskas šiame skyriuje kyla iš vieno sprendimo.'

export const stats: readonly Stat[] = [
  { id: 'members', value: 7000, suffix: '+', label: '„C# Inn“ bendruomenės narių' },
  { id: 'lessons', value: 100, suffix: '+', label: 'pravestų programavimo pamokų' },
  { id: 'dojo', value: 3, label: 'metus vedžiau Coding Dojo KTU' },
  { id: 'bootcamps', value: 2, label: 'surengti intensyvūs C# kursai' },
  { id: 'interviews', value: 8, label: 'interviu su žinomais srities žmonėmis' },
  { id: 'books', value: 2, label: 'parašytos knygos' },
]

export const community: readonly CommunityItem[] = [
  {
    id: 'mentorship',
    title: 'Mentorystė Idealogue, KTU ir Nord Security',
    period: 'nuolat',
    blurb:
      'Trys programos vienu metu, daugiausia 1:1 pokalbiai su žmonėmis už mano komandos ribų.',
    links: [],
  },
  {
    id: 'csharp-inn',
    title: '„C# Inn“ įkūrėjas',
    period: '2018 — 2022',
    blurb:
      'Sukūriau ir vedžiau Discord bendruomenę žmonėms, užstrigusiems ties programavimo klausimais. Ji išaugo iki daugiau nei 7000 narių.',
    links: [{ label: 'Prisijungti prie Discord', href: 'https://discord.gg/rCMKcUU' }],
  },
  {
    id: 'ktu-dojo',
    title: 'KTU Coding Dojo',
    period: '2023 — 2026',
    blurb:
      'Programavimas poromis tarp studentų, dėstytojų ir dirbančių programuotojų: geros praktikos, o pastaruoju metu ir promptų inžinerija.',
    links: [],
  },
  {
    id: 'lessons',
    title: 'Nemokamos programavimo pamokos per Twitch ir YouTube',
    period: '2019 — 2021',
    blurb:
      'Daugiausia gyvos sesijos apie OOP, SOLID, švarų kodą, testavimą, C# ir Web API. Viskas nemokama ir vis dar prieinama.',
    links: [
      { label: 'v1 kursas', href: 'https://github.com/Almantask/CSharp-From-Zero-To-Hero' },
      {
        label: 'v1 grojaraštis',
        href: 'https://www.youtube.com/watch?v=wwnDtE6Z-ic&list=PLbwOopTjJke7vIRVxljiUfI4BY065smhU',
      },
      { label: 'v2 kursas', href: 'https://github.com/csinn/CSharp-From-Zero-To-Hero-v2' },
      {
        label: 'v2 grojaraštis',
        href: 'https://www.youtube.com/watch?v=gw9u4zjxIKE&list=PLbwOopTjJke49hTBrmz8ayxQj_Zro4zrg',
      },
    ],
  },
  {
    id: 'interviews',
    title: 'Programavimo interviu su žmonėmis, kurių verta klausytis',
    period: '2021',
    blurb:
      'Aštuoni pokalbiai, tarp jų su Uncle Bob, Jon Skeet ir Mark Seemann. Įrašyti ir paskelbti nemokamai.',
    links: [
      {
        label: 'Žiūrėti ciklą',
        href: 'https://www.youtube.com/watch?v=ksz0PCw6Aqs&list=PLbwOopTjJke7jtU2fHvpB66XoJYL-jMpR&index=4',
      },
    ],
  },
  {
    id: 'kitm',
    title: 'KITM bendraorganizatorius',
    period: '2021 — 2022',
    blurb:
      'Padėjau atrinkti studentus mokymams, peržiūrėjau mokymo programą ir įtraukiau į procesą kolegas.',
    links: [],
  },
  {
    id: 'share-learn-grow',
    title: '„Share Learn Grow“ sesijos',
    period: '2023 — 2025',
    blurb:
      'Reguliarūs susitikimai OAG, kuriuose komandos mokė viena kitą to, ką neseniai išsiaiškino.',
    links: [],
  },
  {
    id: 'career-changers',
    title: 'Karjerą keičiančių žmonių mokymas',
    period: '2019 — 2021',
    blurb:
      'Software Development Academy ir Kaunas Coding School: žmonės, ateinantys į programavimą iš visai kitų sričių.',
    links: [],
  },
]
