import type { UiStrings } from '../types'

export const ui: UiStrings = {
  skipToContent: 'Skip to content',
  switchToDark: 'Switch to dark theme',
  switchToLight: 'Switch to light theme',
  switchLanguage: 'Skaityti lietuviškai',
  heroCtaContact: 'Get in touch',
  heroCtaWork: 'See my work',
  heroPhotoAlt:
    'Almantas Karpavičius on stage mid-talk, one hand raised, smiling at the audience',
  sectionsNavLabel: 'Sections',

  aboutEyebrow: 'About',
  aboutTitle: 'Why I went into management.',
  educationHeading: 'Education',
  languagesHeading: 'Languages',

  valuesEyebrow: 'What I hold to',
  valuesTitle: 'Three things I will not trade away.',

  experienceEyebrow: 'Experience',
  experienceTitle: 'Ten years in software, the last few leading teams.',
  showEarlierRoles: (count) => `Show ${count} earlier roles`,
  hideEarlierRoles: 'Hide earlier roles',
  present: 'present',
  techLabel: (org) => `Technologies used at ${org}`,

  projectsEyebrow: 'Projects',
  projectsTitle: 'Things I build in my own time.',
  projectsLede: 'Most of them started because my D&D table or my students needed something.',
  openProject: 'Open',
  projectGallery: (name) => `Screenshots of ${name}`,
  previousScreenshot: 'Previous screenshot',
  nextScreenshot: 'Next screenshot',
  screenshotPosition: (current, total) => `${current} of ${total}`,

  speakingEyebrow: 'Speaking',
  speakingTitle: 'Five years of conference stages.',
  speakingLede: 'BDD and testing, and lately how both change when you work with AI.',
  watchTalk: 'Watch',
  watchTalkContext: 'watch the recording on YouTube',

  communityEyebrow: 'Community & mentorship',
  communityTitle: 'Why I mentor, and what came of it.',

  writingEyebrow: 'Writing & recognition',
  writingTitle: 'Two books, and some recognition along the way.',
  awardsHeading: 'Awards',
  findOnAmazon: 'Find it on Amazon',

  beyondEyebrow: 'Beyond work',
  beyondTitle: 'Dungeon master, idealist, occasional philosopher.',

  contactEyebrow: 'Contact',
  contactTitle: 'Say hello.',
  contactLede:
    'Mentoring, a question about a talk, or just a good discussion.',
  directHeading: 'Direct',
  elsewhereHeading: 'Elsewhere',
  formName: 'Your name',
  formEmail: 'Your email',
  formMessage: 'What is on your mind?',
  formCompany: 'Company',
  formSubmit: 'Send message',
  errorName: 'Please tell me who you are.',
  errorEmailMissing: 'I need an address to reply to.',
  errorEmailInvalid: 'That does not look like an email address.',
  errorMessage: 'A little more detail, please — at least 10 characters.',
  statusSending: 'Sending…',
  statusSent: 'Thank you — your message is on its way.',
  statusFailed: 'That did not go through. Email me directly and I will pick it up.',
  statusHandedOff: 'Your mail app should be opening with the message ready to send.',
  mailSubject: (name) => `Hello from ${name}`,

  footerNote: 'Built with React, GSAP and a lot of enthusiasm.',
  metaTitle: 'Almantas Karpavičius — Engineering Manager, author, mentor',
  metaDescription:
    'Engineering Manager at Nord Security. 3× Microsoft MVP, author of two books, conference speaker, and mentor at Idealogue, KTU and Nord Security.',
}
