import type { CommunityItem, Stat } from '../types'

/** The three beats the pinned set-piece scrubs through. Order is the argument. */
export const mentorshipBeats: readonly string[] = [
  'In my whole career, I had a mentor for only a brief time.',
  'I benefited from it enormously — more than from anything else in those years.',
  'So I decided I would be that person for someone else.',
]

export const mentorshipLede =
  'Why mentorship? Because the version of me that needed one mostly did not have one. Everything below started from that.'

export const stats: readonly Stat[] = [
  { id: 'members', value: 7000, suffix: '+', label: 'C# Inn community members' },
  { id: 'lessons', value: 100, suffix: '+', label: 'programming lessons taught' },
  { id: 'dojo', value: 3, suffix: ' yrs', label: 'of Coding Dojo at KTU' },
  { id: 'bootcamps', value: 2, label: 'C# bootcamps organised' },
  { id: 'interviews', value: 8, label: 'interviews with industry names' },
  { id: 'books', value: 2, label: 'books written' },
]

export const community: readonly CommunityItem[] = [
  {
    id: 'mentorship',
    title: 'Mentoring at Idealogue, KTU and Nord Security',
    period: 'ongoing',
    blurb:
      'Three programmes in parallel. 1:1s are my favourite spend of professional time, and this is the same thing outside my own team.',
    links: [],
  },
  {
    id: 'csharp-inn',
    title: 'Founder of C# Inn',
    period: '2018 — 2022',
    blurb:
      'Built and led a Discord community for people stuck on programming questions. It grew past 7000 members.',
    links: [{ label: 'Join the Discord', href: 'https://discord.gg/rCMKcUU' }],
  },
  {
    id: 'ktu-dojo',
    title: 'KTU Coding Dojo',
    period: '2023 — 2026',
    blurb:
      'Pair programming between students, lecturers and working developers — best practices, and lately prompt engineering.',
    links: [],
  },
  {
    id: 'lessons',
    title: 'Free programming lessons on Twitch and YouTube',
    period: '2019 — 2021',
    blurb:
      'Close to 100 sessions, most of them live: OOP, SOLID, clean code, testing, C#, Web API. All of it free, all of it still up.',
    links: [
      { label: 'v1 course', href: 'https://github.com/Almantask/CSharp-From-Zero-To-Hero' },
      {
        label: 'v1 playlist',
        href: 'https://www.youtube.com/watch?v=wwnDtE6Z-ic&list=PLbwOopTjJke7vIRVxljiUfI4BY065smhU',
      },
      { label: 'v2 course', href: 'https://github.com/csinn/CSharp-From-Zero-To-Hero-v2' },
      {
        label: 'v2 playlist',
        href: 'https://www.youtube.com/watch?v=gw9u4zjxIKE&list=PLbwOopTjJke49hTBrmz8ayxQj_Zro4zrg',
      },
    ],
  },
  {
    id: 'interviews',
    title: 'Programming interviews with people worth listening to',
    period: '2021',
    blurb:
      'Eight conversations with the likes of Uncle Bob, Jon Skeet and Mark Seemann — recorded and published free.',
    links: [
      {
        label: 'Watch the series',
        href: 'https://www.youtube.com/watch?v=ksz0PCw6Aqs&list=PLbwOopTjJke7jtU2fHvpB66XoJYL-jMpR&index=4',
      },
    ],
  },
  {
    id: 'kitm',
    title: 'KITM co-organiser',
    period: '2021 — 2022',
    blurb:
      'Helped select students for tuition, reviewed the curriculum, and pulled colleagues into the process.',
    links: [],
  },
  {
    id: 'share-learn-grow',
    title: '"Share Learn Grow" sessions',
    period: '2023 — 2025',
    blurb:
      'A standing slot at OAG for teams to teach each other what they had just figured out, instead of each rediscovering it.',
    links: [],
  },
  {
    id: 'career-changers',
    title: 'Teaching career changers',
    period: '2019 — 2021',
    blurb:
      'At Software Development Academy and Kaunas Coding School — people moving into programming from somewhere else entirely.',
    links: [],
  },
]
