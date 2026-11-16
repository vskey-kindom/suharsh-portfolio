import { marqueeWords } from '../data/content'

/** Decorative infinite ticker. Hidden from assistive tech; stops under prefers-reduced-motion. */
export default function Marquee() {
  const row = marqueeWords.map((w) => (
    <span className="marquee-item" key={w}>
      {w}
      <i />
    </span>
  ))
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  )
}
