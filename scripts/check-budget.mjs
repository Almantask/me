// Fails the build if the JavaScript the browser must have before it can render
// grows past what we agreed to. Run after `vite build`.
import { gzipSync } from 'node:zlib'
import { readFile, readdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist')

/**
 * Eager JS only. `features-*` is Motion's DOM feature bundle, dynamically imported
 * after first paint, so it does not block anything and is reported separately.
 */
const BUDGET_KB = 165
const DEFERRED = /^features-/

async function main() {
  const assets = join(dist, 'assets')
  const files = (await readdir(assets)).filter((name) => name.endsWith('.js'))

  let eager = 0
  let deferred = 0
  const rows = []

  for (const name of files) {
    const bytes = gzipSync(await readFile(join(assets, name))).length
    const isDeferred = DEFERRED.test(name)
    if (isDeferred) deferred += bytes
    else eager += bytes
    rows.push({ name, kb: bytes / 1024, isDeferred })
  }

  rows.sort((a, b) => b.kb - a.kb)
  for (const row of rows) {
    console.log(
      `${row.isDeferred ? 'deferred' : '  eager '}  ${row.kb.toFixed(1).padStart(7)} kB  ${row.name}`,
    )
  }

  const eagerKb = eager / 1024
  console.log(`\neager total   ${eagerKb.toFixed(1)} kB gzip (budget ${BUDGET_KB} kB)`)
  console.log(`deferred      ${(deferred / 1024).toFixed(1)} kB gzip`)

  if (eagerKb > BUDGET_KB) {
    console.error(
      `\nOver budget by ${(eagerKb - BUDGET_KB).toFixed(1)} kB. Cut something or raise the budget deliberately.`,
    )
    process.exit(1)
  }
}

await main()
