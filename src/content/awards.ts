import type { Award } from './types'

export const awards: readonly Award[] = [
  {
    id: 'mvp',
    title: 'Microsoft MVP',
    years: '2021 · 2022 · 2023',
    blurb: 'Awarded three years running for helping the .NET community.',
    href: 'https://mvp.microsoft.com/en-us/PublicProfile/5004259?fullName=Almantas%20Karpavi%C4%8Dius',
  },
  {
    id: 'ktu-alumnus',
    title: 'KTU Alumnus of the Year',
    years: '2021',
    blurb: 'Awarded for work with KTU students — lectures, workshops and mentoring.',
  },
]
