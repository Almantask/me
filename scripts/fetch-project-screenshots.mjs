// Pulls product screenshots out of each project's GitHub README, resizes them for
// the project-card carousel, and writes src/content/projectScreenshots.ts.
// Run with `npm run screenshots`. Outputs are committed so CI never hits GitHub.
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'public/img/projects')
const catalogPath = resolve(root, 'src/content/projectScreenshots.ts')

const WIDTH = 800
const WEBP_QUALITY = 64
const JPEG_QUALITY = 72

/**
 * Project cards on the site, mapped to the GitHub repo their README lives in.
 * `liveShots` is a fallback when the README has no product screenshots — we capture
 * the public GitHub Pages (or hosted) app instead so every card still has a slide.
 */
const PROJECTS = [
  { id: 'sunderplace', repo: 'Almantask/sounderplace', branch: 'main' },
  { id: 'sunder', repo: 'Almantask/sunder', branch: 'main' },
  { id: 'thunder-fx', repo: 'Almantask/thunder-fx', branch: 'main' },
  {
    id: 'tokenizer',
    repo: 'Almantask/dnd-ready-to-print-tokenizer',
    branch: 'main',
    liveShots: [
      {
        file: 'forge',
        alt: 'Forge screen: tint a circular D&D token from any portrait',
        url: 'https://almantask.github.io/dnd-ready-to-print-tokenizer/',
      },
      {
        file: 'armory',
        alt: 'Armory of saved tokens ready to send to print',
        url: 'https://almantask.github.io/dnd-ready-to-print-tokenizer/#/tokens',
      },
      {
        file: 'print-muster',
        alt: 'Print Muster laying tokens onto A4 sheets at one inch',
        url: 'https://almantask.github.io/dnd-ready-to-print-tokenizer/#/print',
      },
    ],
  },
  { id: 'map-to-poster', repo: 'Almantask/image-splitter-for-printing', branch: 'main' },
  { id: 'bestiary', repo: 'Almantask/dnd-monster-generator', branch: 'main' },
  {
    id: 'geoclash',
    repo: 'Almantask/location-finder-game-hot',
    branch: 'main',
    liveShots: [
      {
        file: 'title',
        alt: 'Title screen with Start Mission and high scores',
        url: 'https://almantask.github.io/location-finder-game-hot/',
      },
      {
        file: 'mission',
        alt: 'In-mission blind map with the thermal cursor',
        url: 'https://almantask.github.io/location-finder-game-hot/',
        action: 'start',
      },
      {
        file: 'scores',
        alt: 'High scores table',
        url: 'https://almantask.github.io/location-finder-game-hot/',
        action: 'scores',
      },
    ],
  },
  { id: 'arcanum-audio', repo: 'Almantask/rpg-audio-mixer-web', branch: 'main' },
  {
    id: 'baltic-gods',
    repo: 'Almantask/baltic-gods',
    branch: 'main',
    liveShots: [
      {
        file: 'home',
        alt: 'Home: the ancient paths and featured deities',
        url: 'https://almantask.github.io/baltic-gods/',
      },
      {
        file: 'pantheon',
        alt: 'Pantheon index of deities',
        url: 'https://almantask.github.io/baltic-gods/pantheon',
      },
      {
        file: 'map',
        alt: 'Map of sacred and historical places',
        url: 'https://almantask.github.io/baltic-gods/map',
      },
      {
        file: 'perkunas',
        alt: 'Perkūnas entry on the pantheon',
        url: 'https://almantask.github.io/baltic-gods/pantheon/perkunas',
      },
    ],
  },
  {
    id: 'dnd-zemaiciai',
    repo: 'Almantask/dnd-zemaiciai-web',
    branch: 'main',
    liveShots: [
      {
        file: 'home',
        alt: 'Campaign wiki home',
        url: 'https://almantask.github.io/dnd-zemaiciai-web/',
      },
      {
        file: 'session',
        alt: 'Session log from the campaign wiki',
        url: 'https://almantask.github.io/dnd-zemaiciai-web/docs/sessions/sesija1',
      },
      {
        file: 'party',
        alt: 'Party member sheet',
        url: 'https://almantask.github.io/dnd-zemaiciai-web/docs/group/Grimantas-StoneFist',
      },
      {
        file: 'location',
        alt: 'Location page on the campaign wiki',
        url: 'https://almantask.github.io/dnd-zemaiciai-web/docs/locations/Klaip%C4%97da',
      },
    ],
  },
  { id: 'csharp-zero-to-hero', repo: 'Almantask/CSharp-From-Zero-To-Hero', branch: 'master' },
  {
    id: 'philosophers-timeline',
    repo: 'Almantask/philosophers-timeline',
    branch: 'main',
    liveShots: [
      {
        file: 'timeline',
        alt: 'Timeline starting at Zarathustra',
        url: 'https://almantask.github.io/philosophers-timeline/',
      },
      {
        file: 'search',
        alt: 'Timeline with a search query entered',
        url: 'https://almantask.github.io/philosophers-timeline/',
        action: 'search',
      },
      {
        file: 'later',
        alt: 'Timeline scrolled into later centuries',
        url: 'https://almantask.github.io/philosophers-timeline/',
        action: 'scroll',
      },
    ],
  },
  { id: 'japanese-crossword', repo: 'Almantask/JapaneseCrossword', branch: 'master' },
]

const BADGE =
  /(?:shields\.io|badge\.svg|sonarcloud\.io\/api\/project_badges|komarev\.com\/ghpvc|\/actions\/workflows\/|img\.shields\.io)/i
const RASTER = /\.(png|jpe?g|gif|webp|avif)(?:$|[?#])/i
const SKIP_NAME = /(?:gh-pages-config|favicon|og-image|social-card)/i

export function isProductScreenshot(url) {
  if (BADGE.test(url) || SKIP_NAME.test(url)) return false
  if (/\.svg(?:$|[?#])/i.test(url)) return false
  return RASTER.test(url) || url.includes('user-images.githubusercontent.com')
}

export function parseReadmeImages(markdown) {
  const found = []
  const seen = new Set()

  const add = (alt, src) => {
    const url = src.trim().replace(/^<|>$/g, '')
    if (!url || !isProductScreenshot(url) || seen.has(url)) return
    seen.add(url)
    found.push({ alt: decodeEntities(alt.trim()), src: url })
  }

  for (const match of markdown.matchAll(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    add(match[1] ?? '', match[2] ?? '')
  }

  for (const match of markdown.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0]
    const src = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1]
    const alt = tag.match(/\balt\s*=\s*["']([^"']*)["']/i)?.[1] ?? ''
    if (src) add(alt, src)
  }

  return found
}

function decodeEntities(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
}

function slugFromPath(src) {
  const path = src.split('?')[0] ?? src
  const base = (path.split('/').pop() ?? 'shot').replace(/\.[^.]+$/, '')
  const slug = base
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-|-$/g, '')
  return slug || 'shot'
}

function resolveRawUrl(src, repo, branch) {
  if (/^https?:\/\//i.test(src)) {
    const githubBlob = src.match(
      /^https?:\/\/github\.com\/([^/]+\/[^/]+)\/(?:blob|raw)\/([^/]+)\/(.+)$/i,
    )
    if (githubBlob) {
      return `https://raw.githubusercontent.com/${githubBlob[1]}/${githubBlob[2]}/${githubBlob[3]}`
    }
    return src
  }
  const cleaned = src.replace(/^\.\//, '').replace(/^\/+/, '')
  return `https://raw.githubusercontent.com/${repo}/${branch}/${cleaned}`
}

async function readmeMarkdown(repo) {
  const response = await fetch(`https://api.github.com/repos/${repo}/readme`, {
    headers: {
      Accept: 'application/vnd.github.raw',
      'User-Agent': 'almantas-site-screenshots',
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
  })
  if (response.status === 404) return ''
  if (!response.ok) {
    throw new Error(`README ${repo}: ${response.status} ${await response.text()}`)
  }
  return response.text()
}

async function download(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'almantas-site-screenshots' },
    redirect: 'follow',
  })
  if (!response.ok) throw new Error(`${response.status} ${url}`)
  return Buffer.from(await response.arrayBuffer())
}

async function writeVariants(buffer, destBase) {
  const image = sharp(buffer).rotate().resize({ width: WIDTH, withoutEnlargement: true })
  await image.clone().webp({ quality: WEBP_QUALITY }).toFile(`${destBase}.webp`)
  await image.clone().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(`${destBase}.jpg`)
}

async function captureLiveShots(liveShots, destDir) {
  const { chromium } = await import('@playwright/test')
  const browser = await chromium.launch()
  /** @type {{ file: string, alt: string }[]} */
  const captured = []
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    })
    for (const shot of liveShots) {
      await page.goto(shot.url, { waitUntil: 'domcontentloaded', timeout: 60_000 })
      await page.waitForTimeout(1800)
      if (shot.action === 'start') {
        const button = page.getByRole('button', { name: /start mission/i })
        if ((await button.count()) > 0) {
          await button.click()
          await page.waitForTimeout(1500)
        }
      } else if (shot.action === 'scores') {
        const button = page.getByRole('button', { name: /high scores/i })
        if ((await button.count()) > 0) {
          await button.click()
          await page.waitForTimeout(800)
        }
      } else if (shot.action === 'search') {
        const input = page.locator('input').first()
        if ((await input.count()) > 0) {
          await input.fill('stoic')
          await page.waitForTimeout(600)
        }
      } else if (shot.action === 'scroll') {
        await page.evaluate(() => window.scrollTo(0, 2400))
        await page.waitForTimeout(500)
      }
      const buffer = await page.screenshot({ type: 'png' })
      await writeVariants(buffer, join(destDir, shot.file))
      captured.push({ file: shot.file, alt: shot.alt })
      console.log(`live: ${shot.file}`)
    }
  } finally {
    await browser.close()
  }
  return captured
}

function renderCatalog(entries) {
  const blocks = entries
    .filter((entry) => entry.shots.length > 0)
    .map((entry) => {
      const shots = entry.shots
        .map((shot) => `    { file: ${JSON.stringify(shot.file)}, alt: ${JSON.stringify(shot.alt)} },`)
        .join('\n')
      return `  ${JSON.stringify(entry.id)}: [\n${shots}\n  ],`
    })
    .join('\n')

  return `import type { ProjectScreenshot } from './types'

/**
 * Product screenshots shown on the project-card carousel.
 * Generated by \`npm run screenshots\` from each repo's README (and a live capture
 * when the README has none). Keyed by project id.
 */
export const projectScreenshots: Readonly<Record<string, readonly ProjectScreenshot[]>> = {
${blocks}
}

export function screenshotsFor(projectId: string): readonly ProjectScreenshot[] {
  return projectScreenshots[projectId] ?? []
}
`
}

async function main() {
  /** @type {{ id: string, shots: { file: string, alt: string }[] }[]} */
  const catalog = []

  for (const project of PROJECTS) {
    const dir = join(outDir, project.id)
    await mkdir(dir, { recursive: true })

    let markdown = ''
    try {
      markdown = await readmeMarkdown(project.repo)
    } catch (error) {
      console.warn(`README skip ${project.repo}:`, error)
    }

    const remote = parseReadmeImages(markdown)
    /** @type {{ file: string, alt: string }[]} */
    const shots = []
    const usedSlugs = new Set()

    for (const image of remote) {
      let slug = slugFromPath(image.src)
      if (usedSlugs.has(slug)) slug = `${slug}-${usedSlugs.size}`
      usedSlugs.add(slug)

      const url = resolveRawUrl(image.src, project.repo, project.branch)
      try {
        const buffer = await download(url)
        await writeVariants(buffer, join(dir, slug))
        shots.push({ file: slug, alt: image.alt || `${project.id} screenshot` })
        console.log(`${project.id}: ${slug}`)
      } catch (error) {
        console.warn(`${project.id}: failed ${url}`, error)
      }
    }

    if (shots.length === 0 && project.liveShots?.length) {
      try {
        const captured = await captureLiveShots(project.liveShots, dir)
        shots.push(...captured)
      } catch (error) {
        console.warn(`${project.id}: live capture failed`, error)
      }
    }

    catalog.push({ id: project.id, shots })
  }

  await writeFile(catalogPath, renderCatalog(catalog))
  console.log(`wrote ${catalogPath}`)
}

const isDirect = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])
if (isDirect) await main()
