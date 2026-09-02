/**
 * Motion's DOM feature bundle, in its own module so the dynamic import in App.tsx
 * gets its own chunk. `domMax` rather than `domAnimation` because the nav indicator
 * uses a shared-layout animation, which lives in the layout features.
 */
export { domMax as default } from 'motion/react'
