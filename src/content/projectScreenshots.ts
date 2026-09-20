import type { ProjectScreenshot } from './types'

/**
 * Product screenshots shown on the project-card carousel.
 * Generated from each repo's README via `npm run screenshots`, with a live capture
 * of the public app when the README has none. Keyed by project id.
 */
export const projectScreenshots: Readonly<Record<string, readonly ProjectScreenshot[]>> = {
  degalai: [
    { file: 'map', alt: 'Map of Lithuanian fuel stations with a cheapest-first list' },
    { file: 'route', alt: 'Route from Vilnius to Kaunas with on-the-way stations' },
    { file: 'history', alt: 'Provider average prices by date and time' },
    { file: 'mobile', alt: 'Mobile map with station list sheet' },
  ],
  'thunder-play': [
    { file: 'sheet-1', alt: 'Library: combinable filters, star ratings, downloads and the mini player; Now Playing: seek, shuffle, repeat, star rating and generator metadata; A/B judging: two takes side by side, swipe or tap to keep one or call a tie' },
    { file: 'sheet-2', alt: 'History: most-played tracks and recent listening over 7 days, 30 days or all time; Prompt insights: which prompt words earn the highest and lowest star ratings; Playlists: local lists and a live 7-day share link' },
    { file: 'sheet-3', alt: 'Settings: Drive refresh, crossfade length and A/B testing; Public web player for a shared playlist, no app required' },
  ],
  sunderplace: [
    { file: 'home', alt: 'Home' },
    { file: 'catalog', alt: 'Catalog' },
    { file: 'pack-free', alt: 'Free pack' },
    { file: 'pack-paid', alt: 'Paid pack' },
    { file: 'sign-in', alt: 'Sign in' },
    { file: 'library', alt: 'Library' },
    { file: 'ecosystem', alt: 'Ecosystem' },
    { file: 'faq', alt: 'FAQ' },
    { file: 'feedback', alt: 'Feedback' },
    { file: 'admin', alt: 'Admin' },
    { file: 'admin-pack', alt: 'Admin pack editor' },
  ],
  sunder: [
    {
      file: 'library',
      alt: 'Library tab with folder picker, embed/scan/report actions, cache stats, and job console',
    },
    { file: 'categories', alt: 'Categories tab showing the YAML taxonomy editor' },
    {
      file: 'review',
      alt: 'Review tab with pending tracks, confidence meters, and a selected low-confidence suggestion',
    },
    {
      file: 'review-decisions',
      alt: 'Review decisions with accepted and rejected badges, comments, and Accept/Reject actions',
    },
    {
      file: 'settings',
      alt: 'Settings tab with scan options, classify sliders, tag checkbox, and copy/move organize',
    },
    {
      file: 'report',
      alt: 'HTML report with needs-review tracks, confidence flags, comments, and inline audio players',
    },
  ],
  'thunder-fx': [
    { file: 'generate', alt: 'Generate tab: modes, quality presets, prompt, and the resting goblin band' },
    {
      file: 'generate-clip',
      alt: 'Generated clip with waveform, Shape editing, trim/export, and a prompt queue',
    },
    {
      file: 'browse-prompts',
      alt: 'Browse prompts catalog with FX Combat / Sword entries and a full prompt preview',
    },
    { file: 'library-empty', alt: 'Empty library with starter prompts for sound effects' },
    { file: 'library', alt: 'Library with two clips, favourites, ratings, tags, Compare, and Trash' },
    { file: 'compare', alt: 'Level-matched A/B compare dialog' },
    { file: 'settings', alt: 'Settings: library folder, export format, quality preset, and precision' },
    { file: 'command-palette', alt: 'Command palette (Ctrl+K)' },
    { file: 'setup', alt: 'First-run setup: accept Stability and Gemma licenses' },
  ],
  tokenizer: [
    { file: 'forge', alt: 'Forge screen: tint a circular D&D token from any portrait' },
    { file: 'armory', alt: 'Armory of saved tokens ready to send to print' },
    { file: 'print-muster', alt: 'Print Muster laying tokens onto A4 sheets at one inch' },
  ],
  'map-to-poster': [
    {
      file: 'layout-landscape-margin',
      alt: 'Live preview: a battlemap tiled across a 3×3 landscape A4 grid with 10 mm trim margins, page numbers, and print DPI readout',
    },
    {
      file: 'preview-dark',
      alt: 'Dark-mode workspace after loading the sample battlemap: image summary card, A4 portrait layout, 3×2 sheet grid with remainder hatching, and a low-DPI warning',
    },
    {
      file: 'empty-dark',
      alt: 'Empty dark-mode workspace with drag-and-drop upload, URL loader, sample button, paper settings, and an empty live preview',
    },
    { file: 'empty-light', alt: 'Empty light-mode workspace with the same upload and layout controls' },
    {
      file: 'preview-light',
      alt: 'Light-mode workspace with the sample battlemap tiled across six A4 portrait sheets',
    },
    {
      file: 'print-guide',
      alt: 'Poster Printing & Assembly Guide modal with three steps: print at actual size, trim margins, and assemble in reading order',
    },
    {
      file: 'mobile-preview',
      alt: 'Mobile layout with stacked map input, layout settings, live preview, and download button',
    },
  ],
  bestiary: [
    { file: 'bestiary', alt: 'The Bestiary library with painted monster portraits, search, and taxonomy filters' },
    { file: 'bestiary-mobile', alt: 'Bestiary library on a narrow viewport' },
    { file: 'monster', alt: 'Samogitian Knight parchment statblock with portrait' },
    { file: 'dice-roll', alt: '3D physics d20 overlay and dice tray result' },
    { file: 'conjure', alt: 'Conjure form with party size, level, and difficulty' },
    { file: 'scribe', alt: 'Manual scribe form for creating a monster' },
    { file: 'scribe-json', alt: 'Paste JSON editor with example statblock and portrait preview' },
    { file: 'settings', alt: 'Settings page with Cloud Run API URL and provider status' },
  ],
  geoclash: [
    { file: 'start-menu', alt: 'Start menu' },
    { file: 'gameplay-map', alt: 'Gameplay on the unlabeled map' },
    { file: 'guess-result', alt: 'Guess result with thermal cursor' },
  ],
  'arcanum-audio': [
    { file: 'home', alt: 'Home dashboard with Demo Adventure, top soundscape, and top FX' },
    { file: 'campaigns', alt: 'Active Campaigns list' },
    { file: 'sessions', alt: 'Campaign sessions for Demo Adventure' },
    { file: 'session-scenes', alt: 'Session scenes for The Ancient Gate' },
    { file: 'scenes', alt: 'Scenes catalog' },
    { file: 'active-scene-soundscapes', alt: 'Active Scene soundscapes mixer' },
    { file: 'active-scene-soundboard', alt: 'Active Scene soundboard' },
    { file: 'library-soundscapes', alt: 'Library soundscape categories' },
    { file: 'library-fx', alt: 'Library FX grid' },
    { file: 'library-tracks', alt: 'Library tracks' },
    { file: 'category-composer', alt: 'Forest category composer' },
    { file: 'trash', alt: 'Trash with a recoverable campaign' },
    { file: 'credits', alt: 'Credits screen' },
  ],
  'baltic-gods': [
    { file: 'home', alt: 'Home: the ancient paths and featured deities' },
    { file: 'pantheon', alt: 'Pantheon index of deities' },
    { file: 'map', alt: 'Map of sacred and historical places' },
    { file: 'perkunas', alt: 'Perkūnas entry on the pantheon' },
  ],
  'dnd-zemaiciai': [
    { file: 'home', alt: 'Campaign wiki home' },
    { file: 'session', alt: 'Session log from the campaign wiki' },
    { file: 'party', alt: 'Party member sheet' },
    { file: 'location', alt: 'Location page on the campaign wiki' },
  ],
  'csharp-zero-to-hero': [{ file: 'kaisi-banner', alt: 'Boot camp banner' }],
  'philosophers-timeline': [
    { file: 'timeline', alt: 'Timeline starting at Zarathustra' },
    { file: 'search', alt: 'Timeline with a search query entered' },
    { file: 'later', alt: 'Timeline scrolled into later centuries' },
  ],
  'japanese-crossword': [{ file: 'japanesecrossword', alt: 'Nonogram generated from a photograph' }],
}

export function screenshotsFor(projectId: string): readonly ProjectScreenshot[] {
  return projectScreenshots[projectId] ?? []
}
