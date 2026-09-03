import type { Award } from '../types'

export const awards: readonly Award[] = [
  {
    id: 'mvp',
    title: 'Microsoft MVP',
    years: '2021 · 2022 · 2023',
    blurb: 'Apdovanotas trejus metus iš eilės už pagalbą .NET bendruomenei.',
    href: 'https://mvp.microsoft.com/en-us/PublicProfile/5004259?fullName=Almantas%20Karpavi%C4%8Dius',
  },
  {
    id: 'ktu-alumnus',
    title: 'KTU metų alumnas',
    years: '2021',
    blurb:
      'Apdovanotas už indėlį dirbant su KTU studentais — paskaitos, dirbtuvės ir mentorystė.',
  },
]
