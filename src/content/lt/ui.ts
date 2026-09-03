import type { UiStrings } from '../types'

export const ui: UiStrings = {
  skipToContent: 'Pereiti prie turinio',
  switchToDark: 'Įjungti tamsią temą',
  switchToLight: 'Įjungti šviesią temą',
  switchLanguage: 'Read in English',
  heroCtaContact: 'Susisiekime',
  heroCtaWork: 'Mano darbai',
  heroFactsLabel: 'Trumpai',
  heroPhotoAlt:
    'Almantas Karpavičius scenoje pranešimo metu, pakelta ranka, šypsosi žiūrovams',
  sectionsNavLabel: 'Skyriai',

  aboutEyebrow: 'Apie',
  aboutTitle: 'Pasirinkau auginti žmones, o ne kodo bazes.',
  educationHeading: 'Išsilavinimas',
  languagesHeading: 'Kalbos',

  valuesEyebrow: 'Kuo vadovaujuosi',
  valuesTitle: 'Trys dalykai, kurių neiškeisiu.',

  experienceEyebrow: 'Patirtis',
  experienceTitle: 'Dešimt metų kuriant programinę įrangą — ir žmones, kurie ją kuria.',
  experienceLede:
    'Naujausios pareigos pirmiausia. Ankstesnės niekur nedingo — tiesiog ne dėl jų čia atėjote.',
  showEarlierRoles: (count) => `Rodyti ankstesnes pareigas (${count})`,
  hideEarlierRoles: 'Slėpti ankstesnes pareigas',
  present: 'dabar',
  techLabel: (org) => `Technologijos, naudotos ${org}`,

  projectsEyebrow: 'Projektai',
  projectsTitle: 'Dalykai, kuriuos kuriu niekam neprašius.',
  projectsLede:
    'Dažniausiai gimę iš poreikio prie savo paties stalo — kampanijos, kuriai prireikė garso takelio; kurso, kuriam prireikė užduočių; klausimo, kuriam prireikė atsakymo.',
  openProject: 'Atidaryti',

  speakingEyebrow: 'Pranešimai',
  speakingTitle: 'Penkeri metai konferencijų scenose.',
  speakingLede:
    'BDD, testavimas, o pastaruoju metu — ką visa tai reiškia, kai pusę kodo parašo dirbtinis intelektas.',
  watchTalk: 'Žiūrėti',
  watchTalkContext: 'žiūrėti įrašą per YouTube',

  communityEyebrow: 'Bendruomenė ir mentorystė',
  communityTitle: 'Būsiu tas žmogus, kurio man pačiam taip trūko karjeroje.',

  writingEyebrow: 'Kūryba ir įvertinimai',
  writingTitle: 'Dvi knygos ir bendruomenė, dėl kurios jas verta buvo rašyti.',
  awardsHeading: 'Apdovanojimai',
  findOnAmazon: 'Rasti Amazon',

  beyondEyebrow: 'Ne darbe',
  beyondTitle: 'Dungeon Master, idealistas, retkarčiais filosofas.',

  contactEyebrow: 'Kontaktai',
  contactTitle: 'Parašykite.',
  contactLede:
    'Mentorystė, pranešimai, klausimas apie kurį nors pranešimą ar tiesiog geras ginčas apie testavimą — viskas tinka.',
  directHeading: 'Tiesiogiai',
  elsewhereHeading: 'Kitur',
  formName: 'Jūsų vardas',
  formEmail: 'Jūsų el. paštas',
  formMessage: 'Kas jums rūpi?',
  formCompany: 'Įmonė',
  formSubmit: 'Siųsti žinutę',
  errorName: 'Parašykite, kas esate.',
  errorEmailMissing: 'Reikia adreso, kuriuo galėčiau atsakyti.',
  errorEmailInvalid: 'Tai nepanašu į el. pašto adresą.',
  errorMessage: 'Šiek tiek daugiau detalių, prašau — bent 10 simbolių.',
  statusSending: 'Siunčiama…',
  statusSent: 'Ačiū — žinutė pakeliui.',
  statusFailed: 'Nepavyko išsiųsti. Parašykite man tiesiogiai el. paštu ir aš pastebėsiu.',
  statusHandedOff: 'Turėtų atsidaryti jūsų pašto programa su paruošta žinute.',
  mailSubject: (name) => `Sveiki, rašo ${name}`,

  footerNote: 'Sukurta su React, GSAP ir kiek per dideliu entuziazmu.',
  metaTitle: 'Almantas Karpavičius — inžinerijos vadovas, autorius, mentorius',
  metaDescription:
    'Inžinerijos vadovas Nord Security. 3× Microsoft MVP, dviejų knygų autorius, konferencijų pranešėjas ir mentorius Idealogue, KTU bei Nord Security.',
}
