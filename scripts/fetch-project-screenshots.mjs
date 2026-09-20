// Pulls product screenshots out of each project's GitHub README, resizes them for
// the project-card carousel, and writes src/content/projectScreenshots.ts.
// Run with `npm run screenshots`. Outputs are committed so CI never hits GitHub.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
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
function pages(origin, shots) {
  return shots.map(([file, path, alt, action]) => ({
    file,
    alt,
    url: `${origin}${path}`,
    ...(action ? { action } : {}),
  }))
}

const PROJECTS = [
  { id: 'degalai', repo: 'Almantask/Degalai-web', branch: 'main' },
  { id: 'sunderplace', repo: 'Almantask/sounderplace', branch: 'main' },
  { id: 'sunder', repo: 'Almantask/sunder', branch: 'main' },
  { id: 'thunder-fx', repo: 'Almantask/thunder-fx', branch: 'main' },
  {
    id: 'tokenizer',
    repo: 'Almantask/dnd-ready-to-print-tokenizer',
    branch: 'main',
    liveShots: pages('https://almantask.github.io/dnd-ready-to-print-tokenizer', [
      ['forge', '/', 'Forge screen: tint a circular D&D token from any portrait'],
      ['armory', '/#/tokens', 'Armory of saved tokens ready to send to print'],
      ['print-muster', '/#/print', 'Print Muster laying tokens onto A4 sheets at one inch'],
    ]),
  },
  { id: 'map-to-poster', repo: 'Almantask/image-splitter-for-printing', branch: 'main' },
  { id: 'bestiary', repo: 'Almantask/dnd-monster-generator', branch: 'main' },
  { id: 'geoclash', repo: 'Almantask/location-finder-game-hot', branch: 'main' },
  { id: 'arcanum-audio', repo: 'Almantask/rpg-audio-mixer-web', branch: 'main' },
  {
    id: 'baltic-gods',
    repo: 'Almantask/baltic-gods',
    branch: 'main',
    liveShots: pages('https://almantask.github.io/baltic-gods', [
      ['home', '/', 'Home: the ancient paths and featured deities'],
      ['pantheon', '/pantheon', 'Pantheon index of deities'],
      ['map', '/map', 'Map of sacred and historical places'],
      ['perkunas', '/pantheon/perkunas', 'Perkūnas entry on the pantheon'],
    ]),
  },
  {
    id: 'dnd-zemaiciai',
    repo: 'Almantask/dnd-zemaiciai-web',
    branch: 'main',
    liveShots: pages('https://almantask.github.io/dnd-zemaiciai-web', [
      ['home', '/', 'Campaign wiki home'],
      ['session', '/docs/sessions/sesija1', 'Session log from the campaign wiki'],
      ['party', '/docs/group/Grimantas-StoneFist', 'Party member sheet'],
      ['location', '/docs/locations/Klaip%C4%97da', 'Location page on the campaign wiki'],
    ]),
  },
  { id: 'csharp-zero-to-hero', repo: 'Almantask/CSharp-From-Zero-To-Hero', branch: 'master' },
  {
    id: 'philosophers-timeline',
    repo: 'Almantask/philosophers-timeline',
    branch: 'main',
    liveShots: pages('https://almantask.github.io/philosophers-timeline/', [
      ['timeline', '', 'Timeline starting at Zarathustra'],
      ['search', '', 'Timeline with a search query entered', 'search'],
      ['later', '', 'Timeline scrolled into later centuries', 'scroll'],
    ]),
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
      if (shot.action === 'search') {
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

/** Single-quoted where it can be, matching the style the rest of the catalog is in. */
function quote(value) {
  return value.includes("'") ? JSON.stringify(value) : `'${value}'`
}

/** Ids that are valid identifiers sit bare, the rest get quoted — as the catalog has them. */
function quoteKey(id) {
  return /^[A-Za-z_$][\w$]*$/.test(id) ? id : quote(id)
}

/** One `id: [...]` entry, in the shape the formatter leaves the catalog in. */
function renderEntry(id, shots) {
  const lines = shots
    .map((shot) => `    { file: ${quote(shot.file)}, alt: ${quote(shot.alt)} },`)
    .join('\n')
  return `  ${quoteKey(id)}: [\n${lines}\n  ],`
}

function renderCatalog(blocks) {
  return `import type { ProjectScreenshot } from './types'

/**
 * Product screenshots shown on the project-card carousel.
 * Generated from each repo's README via \`npm run screenshots\`, with a live capture
 * of the public app when the README has none. Keyed by project id.
 */
export const projectScreenshots: Readonly<Record<string, readonly ProjectScreenshot[]>> = {
${blocks.join('\n')}
}

export function screenshotsFor(projectId: string): readonly ProjectScreenshot[] {
  return projectScreenshots[projectId] ?? []
}
`
}

/** Entry keys survive formatting either bare or quoted, so accept all three spellings. */
const ENTRY_START = /^ {2}(?:'([^']*)'|"([^"]*)"|([\w$]+)): \[/

/**
 * Splits a previously generated catalog into its per-project blocks, keyed by id.
 * Blocks stay raw source: a scoped run re-renders only what it fetched, so the
 * projects it was not asked about keep their exact alt text and formatting.
 */
export function splitCatalog(source) {
  const lines = source.split('\n')
  const blocks = new Map()

  for (let i = 0; i < lines.length; i += 1) {
    const match = ENTRY_START.exec(lines[i])
    if (!match) continue
    let end = i
    while (end < lines.length && !lines[end].endsWith('],')) end += 1
    if (end === lines.length) break
    blocks.set(match[1] ?? match[2] ?? match[3], lines.slice(i, end + 1).join('\n'))
    i = end
  }

  return blocks
}

async function existingBlocks() {
  try {
    return splitCatalog(await readFile(catalogPath, 'utf8'))
  } catch {
    return new Map()
  }
}

/** Shots for one project: README images first, a live capture of the app as fallback. */
async function fetchShots(project) {
  const dir = join(outDir, project.id)
  await mkdir(dir, { recursive: true })

  let markdown = ''
  try {
    markdown = await readmeMarkdown(project.repo)
  } catch (error) {
    console.warn(`README skip ${project.repo}:`, error)
  }

  /** @type {{ file: string, alt: string }[]} */
  const shots = []
  const usedSlugs = new Set()

  for (const image of parseReadmeImages(markdown)) {
    let slug = slugFromPath(image.src)
    if (usedSlugs.has(slug)) slug = `${slug}-${usedSlugs.size}`
    usedSlugs.add(slug)

    const url = resolveRawUrl(image.src, project.repo, project.branch)
    try {
      await writeVariants(await download(url), join(dir, slug))
      shots.push({ file: slug, alt: image.alt || `${project.id} screenshot` })
      console.log(`${project.id}: ${slug}`)
    } catch (error) {
      console.warn(`${project.id}: failed ${url}`, error)
    }
  }

  if (shots.length === 0 && project.liveShots?.length) {
    try {
      shots.push(...(await captureLiveShots(project.liveShots, dir)))
    } catch (error) {
      console.warn(`${project.id}: live capture failed`, error)
    }
  }

  return shots
}

async function main() {
  // `npm run screenshots -- geoclash degalai` refreshes just those; no ids means all.
  const requested = process.argv.slice(2).filter((arg) => !arg.startsWith('-'))
  const unknown = requested.filter((id) => !PROJECTS.some((project) => project.id === id))
  if (unknown.length > 0) {
    throw new Error(
      `unknown project id: ${unknown.join(', ')}\nknown: ${PROJECTS.map((p) => p.id).join(', ')}`,
    )
  }

  const selected =
    requested.length > 0 ? PROJECTS.filter((project) => requested.includes(project.id)) : PROJECTS

  const kept = await existingBlocks()
  const blocks = []

  for (const project of PROJECTS) {
    if (!selected.includes(project)) {
      const block = kept.get(project.id)
      if (block) blocks.push(block)
      continue
    }
    const shots = await fetchShots(project)
    if (shots.length > 0) blocks.push(renderEntry(project.id, shots))
  }

  await writeFile(catalogPath, renderCatalog(blocks))
  console.log(`wrote ${catalogPath}`)
}

const isDirect = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])
if (isDirect) await main()
