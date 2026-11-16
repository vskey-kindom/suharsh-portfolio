import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skillGroups } from '../data/content'
import Reveal from './Reveal'
import RevealText from './RevealText'

export default function Skills() {
  const [index, setIndex] = useState(0)
  const tabs = useRef([])
  const group = skillGroups[index]

  const onKeyDown = (e) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
    if (!(e.key in keys)) return
    e.preventDefault()
    const next = (index + keys[e.key] + skillGroups.length) % skillGroups.length
    setIndex(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="skills" className="section skills">
      <div className="wrap">
        <div className="section-head">
          <Reveal>
            <span className="label">(03) Toolkit</span>
          </Reveal>
          <RevealText as="h2" className="h-xl" text="Skills & *interests*" stagger={0.08} />
        </div>

        <div className="skills-layout">
          <div className="skill-tabs" role="tablist" aria-label="Skill categories" onKeyDown={onKeyDown}>
            {skillGroups.map((g, i) => (
              <button
                key={g.id}
                ref={(el) => (tabs.current[i] = el)}
                role="tab"
                id={`tab-${g.id}`}
                aria-selected={i === index}
                aria-controls="skill-panel"
                tabIndex={i === index ? 0 : -1}
                className="skill-tab"
                onClick={() => setIndex(i)}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setIndex(i)}
              >
                {g.label}
                <sup>{String(g.items.length).padStart(2, '0')}</sup>
              </button>
            ))}
          </div>

          <div id="skill-panel" role="tabpanel" aria-labelledby={`tab-${group.id}`} className="skill-panel">
            <AnimatePresence mode="wait">
              <motion.ul
                key={group.id}
                className="skill-items"
                initial="hidden"
                animate="show"
                exit="out"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06 } },
                  out: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
                }}
              >
                {group.items.map((item, i) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                      out: { opacity: 0, transition: { duration: 0.15 } },
                    }}
                  >
                    <span className="mono-num">0{i + 1}</span>
                    <span className="skill-name">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
