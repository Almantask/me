import type { Book } from './types'

export const books: readonly Book[] = [
  {
    id: 'software-craftsmanship-using-ai',
    title: 'Software Craftsmanship using AI',
    publisher: 'BPB Publications',
    year: 2024,
    credit: 'Author',
    blurb:
      'How to keep applying classical best practices — design, review, testing — while genuinely making use of AI, rather than pretending either one away.',
    href: 'https://www.amazon.com/Software-Craftsmanship-Using-Practical-reviewing/dp/9365892422',
  },
  {
    id: 'the-csharp-workshop',
    title: 'The C# Workshop',
    publisher: 'Packt',
    year: 2022,
    credit: 'Co-author — 5 of 10 chapters',
    blurb:
      'A hands-on start for people kickstarting a career as a software developer: C#, git, Azure and testing fundamentals.',
    href: 'https://www.amazon.com/Workshop-Kickstart-career-software-developer/dp/1800566492',
  },
]
