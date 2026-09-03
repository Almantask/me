import type { Book } from '../types'

export const books: readonly Book[] = [
  {
    id: 'software-craftsmanship-using-ai',
    title: 'Software Craftsmanship using AI',
    publisher: 'BPB Publications',
    year: 2024,
    credit: 'Autorius',
    blurb:
      'Kaip toliau taikyti klasikines geras praktikas — projektavimą, peržiūras, testavimą — ir kartu iš tikrųjų pasinaudoti AI, o ne apsimesti, kad vieno iš jų nėra.',
    href: 'https://www.amazon.com/Software-Craftsmanship-Using-Practical-reviewing/dp/9365892422',
  },
  {
    id: 'the-csharp-workshop',
    title: 'The C# Workshop',
    publisher: 'Packt',
    year: 2022,
    credit: 'Bendraautoris — 5 iš 10 skyrių',
    blurb:
      'Praktinė pradžia tiems, kas pradeda programuotojo karjerą: C#, git, Azure ir testavimo pagrindai.',
    href: 'https://www.amazon.com/Workshop-Kickstart-career-software-developer/dp/1800566492',
  },
]
