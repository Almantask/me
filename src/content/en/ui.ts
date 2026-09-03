import type { UiStrings } from '../types'

export const ui: UiStrings = {
  skipToContent: 'Skip to content',
  switchToDark: 'Switch to dark theme',
  switchToLight: 'Switch to light theme',
  switchLanguage: 'Skaityti lietuviškai',
  heroCtaContact: 'Get in touch',
  heroCtaWork: 'See my work',
  heroFactsLabel: 'At a glance',
  heroPhotoAlt:
    'Almantas Karpavičius on stage mid-talk, one hand raised, smiling at the audience',
  sectionsNavLabel: 'Sections',

  aboutEyebrow: 'About',
  aboutTitle: 'I chose growing people over growing codebases.',
  educationHeading: 'Education',
  languagesHeading: 'Languages',

  experienceEyebrow: 'Experience',
  experienceTitle: 'Ten years of building software, and of building the people who build it.',
  experienceLede:
    'Most recent roles first. The earlier ones are still here — they are just not what you came for.',
  showEarlierRoles: (count) => `Show ${count} earlier roles`,
  hideEarlierRoles: 'Hide earlier roles',
  present: 'present',
  techLabel: (org) => `Technologies used at ${org}`,

  projectsEyebrow: 'Projects',
  projectsTitle: 'Things I build when nobody asked me to.',
  projectsLede:
    'Mostly born from a need at my own table — a campaign that wanted a soundtrack, a course that wanted exercises, a question that wanted an answer.',
  openProject: 'Open',

  speakingEyebrow: 'Speaking',
  speakingTitle: 'Five years of conference stages.',
  speakingLede:
    'BDD, testing, and lately what all of it means once AI is writing half the code.',
  watchTalk: 'Watch',
  watchTalkContext: 'watch the recording on YouTube',

  communityEyebrow: 'Community & mentorship',
  communityTitle: 'I will be the person that I needed so much in my career.',

  writingEyebrow: 'Writing & recognition',
  writingTitle: 'Two books, and the community that made them worth writing.',
  awardsHeading: 'Awards',
  findOnAmazon: 'Find it on Amazon',

  beyondEyebrow: 'Beyond work',
  beyondTitle: 'Dungeon master, idealist, occasional philosopher.',

  contactEyebrow: 'Contact',
  contactTitle: 'Say hello.',
  contactLede:
    'Mentoring, speaking, a question about a talk, or just a good argument about testing — all welcome.',
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

  footerNote: 'Built with React, GSAP and rather too much enthusiasm.',
  metaTitle: 'Almantas Karpavičius — Engineering Manager, author, mentor',
  metaDescription:
    'Engineering Manager at Nord Security. 3× Microsoft MVP, author of two books, conference speaker, and mentor at Idealogue, KTU and Nord Security.',
}
