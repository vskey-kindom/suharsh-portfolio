import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { about, profile } from '../data/content'
import Reveal from './Reveal'
import RevealText from './RevealText'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span className="sw" style={{ opacity }}>
      {children}
    </motion.span>
  )
}

/** Words light up one by one as the paragraph scrolls through the viewport. */
function ScrollWords({ text }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  if (reduce) return <p className="about-statement">{text}</p>

  return (
    <p className="about-statement" ref={ref}>
      {words.map((w, i) => {
        const start = i / words.length
        const end = Math.min(1, start + 1.6 / words.length)
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {w}{' '}
          </Word>
        )
      })}
    </p>
  )
}

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="wrap">
        <div className="about-grid">
          <Reveal className="about-label">
            <span className="label">(01) About</span>
          </Reveal>
          <div>
            <ScrollWords text={about.statement} />
            <Reveal className="chip-row" delay={0.1}>
              {about.interests.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </Reveal>
          </div>
        </div>

        <ul className="mindset" aria-label="Mindset">
          {about.mindset.map((m, i) => (
            <Reveal as="li" className="mindset-row" key={m.title} delay={i * 0.05} y={20}>
              <span className="mono-num">0{i + 1}</span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </Reveal>
          ))}
        </ul>

        <figure className="philosophy">
          <span className="philosophy-mark" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote>
            <RevealText text={profile.philosophy} stagger={0.06} />
          </blockquote>
          <figcaption className="label">My philosophy</figcaption>
        </figure>
      </div>
    </section>
  )
}
