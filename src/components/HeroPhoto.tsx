import { useUi } from '../i18n/useContent'

const BASE = import.meta.env.BASE_URL
const WIDTHS = [640, 960, 1440] as const

const srcSet = (extension: string) =>
  WIDTHS.map((width) => `${BASE}img/almantas-${width}.${extension} ${width}w`).join(', ')

/**
 * Paths go through BASE_URL, never a root-absolute "/img/...". The latter works
 * perfectly in dev and 404s on Pages, where the site lives under /me/.
 */
export function HeroPhoto() {
  const ui = useUi()

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes="(min-width: 1024px) 44vw, 92vw" />
      <source type="image/webp" srcSet={srcSet('webp')} sizes="(min-width: 1024px) 44vw, 92vw" />
      <img
        src={`${BASE}img/almantas-960.jpg`}
        srcSet={srcSet('jpg')}
        sizes="(min-width: 1024px) 44vw, 92vw"
        width={4444}
        height={3333}
        fetchPriority="high"
        decoding="async"
        alt={ui.heroPhotoAlt}
        className="h-full w-full object-cover"
      />
    </picture>
  )
}
