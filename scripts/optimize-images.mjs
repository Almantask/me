// One-off image prep. Run with `npm run images`; the outputs are committed so CI
// never needs sharp installed.
import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = resolve(root, 'assets/almantas-source.jpg')
const outDir = resolve(root, 'public/img')

/**
 * A 4:3 window on the 5000x3333 original. Keeps the raised hand, the shadow on the
 * panelling and his face, and drops the banner on the right — a tight headshot crop
 * would throw away the thing the photo is actually about.
 */
const CROP = { left: 200, top: 0, width: 4444, height: 3333 }
const WIDTHS = [640, 960, 1440]

async function main() {
  await mkdir(outDir, { recursive: true })

  const base = sharp(source).extract(CROP)

  for (const width of WIDTHS) {
    const resized = () => base.clone().resize({ width, withoutEnlargement: true })

    await resized().avif({ quality: 62, effort: 6 }).toFile(`${outDir}/almantas-${width}.avif`)
    await resized().webp({ quality: 78 }).toFile(`${outDir}/almantas-${width}.webp`)
    await resized().jpeg({ quality: 82, mozjpeg: true }).toFile(`${outDir}/almantas-${width}.jpg`)

    console.log(`almantas-${width}: avif + webp + jpg`)
  }

  // Social card. Wider than the hero crop so the frame is not just a face.
  await sharp(source)
    .extract({ left: 300, top: 150, width: 4400, height: 2310 })
    .resize(1200, 630)
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(`${outDir}/../og.jpg`)

  console.log('og.jpg: 1200x630')
}

await main()
