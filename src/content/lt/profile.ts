import type { Education, Link, Profile, Quote, Section } from '../types'

export const profile: Profile = {
  name: 'Almantas Karpavičius',
  role: 'Programų inžinerijos vadovas',
  org: 'Nord Security',
  tagline: 'Man patinka programuoti. Ugdyti žmones patinka dar labiau.',
  intro:
    'Darbe vadovauju komandai. Laisvu laiku rašau knygas, skaitau pranešimus konferencijose, mokau ir esu mentorius.',
  location: 'Kaunas, Lietuva',
  email: 'almantusk@gmail.com',
}

export const socials: readonly Link[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/almantas-karpavicius' },
  { label: 'GitHub', href: 'https://github.com/Almantask' },
  { label: 'YouTube', href: 'https://www.youtube.com/c/AlmantasKarpavi%C4%8Dius' },
]

export const about: readonly string[] = [
  'Vienu karjeros momentu teko apsispręsti: techninis kelias ar vadovavimas. Programuoti man patinka, bet padėti žmonėms augti man svarbiau. Labiausiai darbe mėgstu 1:1 pokalbius.',
  'Per karjerą mentorių turėjau vos trumpą laiką, bet tai man labai padėjo. Todėl nusprendžiau būti tuo žmogumi kitiems. Dėl to surengiau du intensyvius C# kursus, trejus metus vedžiau Coding Dojo KTU, parašiau dvi knygas, pravedžiau 100+ programavimo pamokų ir įkūriau „C# Inn“ bendruomenę. Man tikrai patinka dalytis tuo, ką moku.',
  'Pastaruosius trejus metus kuriu su dirbtiniu intelektu (programinę įrangą, agentus, muziką) ir aiškinuosi, kaip persipina klasikinės inžinerijos praktikos bei DI.',
]

export const quote: Quote = {
  text:
    'Saugoti neįmanomą svajonę yra kvaila, sako jie. Bet būtent svajonė, kurią verta saugoti, ir leidžia šiai kvailai širdžiai gyventi.',
  source: 'Rurouni Kenshin („Samurai X“)',
  note: 'Citata — ir apskritai nuostata — man labai brangi.',
}

export const hobbies: readonly string[] = [
  'D&D žaidimų vedimas',
  'Stalo žaidimai',
  'Kompiuteriniai žaidimai',
  'Filosofija',
  'Sportas',
]

export const beyond =
  'Laisvalaikiu vedu stalo žaidimus. Esu Dungeon Master, ir nemažai mano šalutinių projektų atsirado todėl, kad jų prireikė kampanijai. Likęs laisvas laikas tenka stalo ir kompiuteriniams žaidimams, filosofijai ir sportui.'

export const languages: readonly string[] = [
  'Lietuvių (gimtoji)',
  'Anglų (C1)',
  'Rusų (A1)',
]

export const education: readonly Education[] = [
  {
    id: 'ktu',
    qualification: 'Programų sistemų bakalauras',
    institution: 'Kauno technologijos universitetas',
    period: '2013 — 2017',
    note: 'Baigiamasis darbas: mobilusis žaidimas „Soul Temple“.',
  },
  {
    id: 'birstonas',
    qualification: 'Vidurinis išsilavinimas, baigta su pagyrimu',
    institution: 'Birštono gimnazija',
    period: '2004 — 2013',
    note: '',
  },
]

// Ids are URL anchors and must never be translated — only the labels change.
export const sections: readonly Section[] = [
  { id: 'about', label: 'Apie' },
  { id: 'experience', label: 'Patirtis' },
  { id: 'projects', label: 'Projektai' },
  { id: 'speaking', label: 'Pranešimai' },
  { id: 'community', label: 'Bendruomenė' },
  { id: 'writing', label: 'Knygos' },
  { id: 'contact', label: 'Kontaktai' },
]
