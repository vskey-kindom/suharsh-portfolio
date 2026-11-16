import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { journey } from '../data/content'
import Reveal from './Reveal'
import RevealText from './RevealText'

export default function Journey() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.55'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })

  return (
    <section id="journey" className="section journey">
      <div className="wrap">
        <div className="section-head">
          <Reveal>
            <span className="label">(04) Journey</span>
          </Reveal>
          <RevealText as="h2" className="h-xl" text="An ongoing *journey*" stagger={0.08} />
        </div>

        <ol className="timeline" ref={ref}>
          <li className="tl-rail" aria-hidden="true">
            <motion.span className="tl-fill" style={{ scaleY: reduce ? 1 : fill }} />
          </li>
          {journey.map((step, i) => (
            <Reveal as="li" className={`tl-item ${step.ongoing ? 'is-now' : ''}`} key={step.title} y={26}>
              <span className="tl-dot" aria-hidden="true" />
              <div className="tl-head">
                <span className="mono-num">0{i + 1}</span>
                <h3>{step.title}</h3>
                {step.ongoing ? <span className="tag tag-live">Ongoing</span> : null}
              </div>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
