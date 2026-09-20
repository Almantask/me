import type { UiStrings } from '../types'

export const ui: UiStrings = {
  skipToContent: 'Pereiti prie turinio',
  switchToDark: 'Įjungti tamsią temą',
  switchToLight: 'Įjungti šviesią temą',
  switchLanguage: 'Read in English',
  heroCtaContact: 'Susisiekime',
  heroCtaWork: 'Mano darbai',
  heroPhotoAlt:
    'Almantas Karpavičius scenoje pranešimo metu, pakelta ranka, šypsosi žiūrovams',
  sectionsNavLabel: 'Skyriai',

  aboutEyebrow: 'Apie',
  aboutTitle: 'Kodėl pasirinkau vadovavimą.',
  educationHeading: 'Išsilavinimas',
  languagesHeading: 'Kalbos',

  valuesEyebrow: 'Kuo vadovaujuosi',
  valuesTitle: 'Trys dalykai, kurių neiškeisiu.',

  experienceEyebrow: 'Patirtis',
  experienceTitle: 'Dešimt metų programinėje įrangoje, pastaruosius kelerius vadovaujant komandoms.',
  showEarlierRoles: (count) => `Rodyti ankstesnes pareigas (${count})`,
  hideEarlierRoles: 'Slėpti ankstesnes pareigas',
  present: 'dabar',
  techLabel: (org) => `Technologijos, naudotos ${org}`,

  projectsEyebrow: 'Projektai',
  projectsTitle: 'Dalykai, kuriuos kuriu laisvalaikiu.',
  projectsLede: 'Dauguma jų atsirado todėl, kad kažko prireikė mano D&D stalui ar mokiniams.',
  openProject: 'Atidaryti',
  projectGallery: (name) => `${name} ekrano nuotraukos`,
  previousScreenshot: 'Ankstesnė nuotrauka',
  nextScreenshot: 'Kita nuotrauka',
  screenshotPosition: (current, total) => `${current} iš ${total}`,

  speakingEyebrow: 'Pranešimai',
  speakingTitle: 'Penkeri metai konferencijų scenose.',
  speakingLede:
    'BDD ir testavimas, o pastaruoju metu ir tai, kaip jie keičiasi dirbant su dirbtiniu intelektu.',
  watchTalk: 'Žiūrėti',
  watchTalkContext: 'žiūrėti įrašą per YouTube',

  communityEyebrow: 'Bendruomenė ir mentorystė',
  communityTitle: 'Kodėl esu mentorius ir kas iš to išėjo.',

  writingEyebrow: 'Knygos ir apdovanojimai',
  writingTitle: 'Dvi knygos ir keli įvertinimai pakeliui.',
  awardsHeading: 'Apdovanojimai',
  findOnAmazon: 'Rasti Amazon',

  beyondEyebrow: 'Laisvalaikis',
  beyondTitle: 'Dungeon Master, idealistas, retkarčiais filosofas.',

  contactEyebrow: 'Kontaktai',
  contactTitle: 'Parašykite.',
  contactLede:
    'Mentorystė, klausimas apie kurį nors pranešimą ar tiesiog gera diskusija.',
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
  statusFailed: 'Nepavyko išsiųsti. Parašykite man tiesiogiai el. paštu ir aš atsakysiu.',
  statusHandedOff: 'Turėtų atsidaryti jūsų pašto programa su paruošta žinute.',
  mailSubject: (name) => `Sveiki, rašo ${name}`,

  footerNote: 'Sukurta su React, GSAP ir dideliu entuziazmu.',
  metaTitle: 'Almantas Karpavičius — programų inžinerijos vadovas, autorius, mentorius',
  metaDescription:
    'Programų inžinerijos vadovas Nord Security. 3× Microsoft MVP, dviejų knygų autorius, konferencijų pranešėjas ir mentorius Idealogue, KTU bei Nord Security.',
}
