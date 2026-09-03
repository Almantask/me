import { LazyMotion, MotionConfig } from 'motion/react'
import { LanguageProvider } from './i18n/LanguageProvider'
import { useUi } from './i18n/useContent'
import { ScrollProvider } from './motion/ScrollProvider'
import { InitialHash } from './motion/InitialHash'
import { Nav } from './components/Nav'
import { ScrollProgress } from './components/ScrollProgress'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Values } from './components/Values'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Speaking } from './components/Speaking'
import { Community } from './components/Community'
import { Writing } from './components/Writing'
import { Beyond } from './components/Beyond'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

// Loaded after first paint: the feature bundle is ~22 kB gzip that nothing needs
// until the reader interacts or scrolls.
const loadMotionFeatures = () => import('./motion/features').then((module) => module.default)

function Page() {
  const ui = useUi()

  return (
    <ScrollProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ember focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-bg"
      >
        {ui.skipToContent}
      </a>

      <InitialHash />
      <ScrollProgress />
      <Nav />

      <main id="main">
        <Hero />
        <About />
        <Values />
        <Experience />
        <Projects />
        <Speaking />
        <Community />
        <Writing />
        <Beyond />
        <Contact />
      </main>

      <Footer />
    </ScrollProvider>
  )
}

export function App() {
  return (
    // reducedMotion="user" makes Motion honour the OS preference too — GSAP and
    // Lenis are gated separately, and all three have to agree.
    <MotionConfig reducedMotion="user">
      <LazyMotion strict features={loadMotionFeatures}>
        <LanguageProvider>
          <Page />
        </LanguageProvider>
      </LazyMotion>
    </MotionConfig>
  )
}
