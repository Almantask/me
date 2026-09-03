import type { Education, Link, Profile, Quote, Section } from '../types'

export const profile: Profile = {
  name: 'Almantas Karpavičius',
  role: 'Inžinerijos vadovas',
  org: 'Nord Security',
  tagline: 'Man patinka programuoti. Auginti žmones — kur kas labiau.',
  intro:
    'Lyderis-tarnas, autorius, viešasis kalbėtojas, mokytojas ir mentorius, pasižymintis aistra žmonių auginimui, programinės įrangos projektavimui ir profesinės bendruomenės kūrimui.',
  location: 'Kaunas, Lietuva',
  email: 'almantusk@gmail.com',
}

export const socials: readonly Link[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/almantas-karpavicius' },
  { label: 'GitHub', href: 'https://github.com/Almantask' },
  { label: 'YouTube', href: 'https://www.youtube.com/c/AlmantasKarpavi%C4%8Dius' },
  { label: '„C# Inn“ Discord', href: 'https://discord.gg/rCMKcUU' },
  {
    label: 'Microsoft MVP',
    href: 'https://mvp.microsoft.com/en-us/PublicProfile/5004259?fullName=Almantas%20Karpavi%C4%8Dius',
  },
]

export const heroFacts: readonly string[] = [
  '3× Microsoft MVP',
  '2 knygos',
  '7000+ bendruomenės narių',
  '100+ pravestų pamokų',
]

export const about: readonly string[] = [
  'Vienu karjeros momentu teko apsispręsti: techninis kelias ar vadovavimo. Nors programuoti man patinka, auginti žmones patinka kur kas labiau nei auginti kodo bazes. 1:1 pokalbiai — mėgstamiausias mano profesinio laiko panaudojimas.',
  'Per visą karjerą mentorių turėjau vos trumpą laiką, bet nauda buvo milžiniška. Todėl nusprendžiau: būsiu tas žmogus, kurio man pačiam taip trūko. Būtent ši nuostata pastūmėjo surengti dvi C# stovyklas, trejus metus vesti Coding Dojo KTU, parašyti dvi knygas, pravesti 100+ programavimo pamokų ir įkurti „C# Inn“ bendruomenę. Man tikrai patinka dalintis tuo, ką moku, ir padėti kitiems augti.',
  'Pastaruosius trejus metus kuriu su dirbtiniu intelektu — programinę įrangą, agentus, muziką — ir aiškinuosi, kaip klasikinės inžinerijos praktikos laikosi, kai pusę kodo parašo modelis.',
  'Esu idealistas. Tikiu, kad jei kiekvienas prisidėtų prie pokalbio, o ne gintų savo nuomonę, pasaulis taptų geresne vieta. Noriu paskatinti kitus padėti už „ačiū“ — dėl bendro augimo ir dėl ramaus miego naktimis.',
]

export const quote: Quote = {
  text:
    'Saugoti neįmanomą svajonę yra kvaila, sako jie. Bet būtent svajonė, verta saugojimo, ir palaiko šią kvailą širdį gyvą.',
  source: 'Rurouni Kenshin („Samurai X“)',
  note: 'Citata — ir apskritai nuostata — man labai brangi.',
}

export const hobbies: readonly string[] = [
  'Dungeon Master',
  'D&D',
  'Stalo žaidimai',
  'Kompiuteriniai žaidimai',
  'Filosofija',
  'Viešasis kalbėjimas',
  'Sporto salė',
]

export const beyond =
  'Ne darbe vedu stalo žaidimus — esu Dungeon Master, ir nemažai mano šalutinių projektų atsirado tiesiog todėl, kad jų prireikė kampanijai. Likęs laisvas laikas — stalo žaidimai, kompiuteriniai žaidimai, filosofija ir sporto salė.'

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
  { id: 'writing', label: 'Kūryba' },
  { id: 'contact', label: 'Kontaktai' },
]
