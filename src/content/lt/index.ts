import type { ContentBundle } from '../types'
import { about, education, heroFacts, hobbies, beyond, languages, profile, quote, sections, socials } from './profile'
import { experience } from './experience'
import { projects } from './projects'
import { talks } from './speaking'
import { community, mentorshipBeats, mentorshipLede, stats } from './community'
import { awards } from './awards'
import { books } from './books'
import { ui } from './ui'

export const lt: ContentBundle = {
  profile,
  socials,
  heroFacts,
  about,
  quote,
  hobbies,
  beyond,
  spokenLanguages: languages,
  education,
  sections,
  experience,
  projects,
  talks,
  mentorshipBeats,
  mentorshipLede,
  stats,
  community,
  awards,
  books,
  ui,
}
