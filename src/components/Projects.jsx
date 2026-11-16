import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/content'
import Magnetic from './Magnetic'
import Reveal from './Reveal'
import RevealText from './RevealText'
import TuesdayPreview from './previews/TuesdayPreview'
import VintagePreview from './previews/VintagePreview'
import VskeyPreview from './previews/VskeyPreview'

const PREVIEWS = { vskey: VskeyPreview, vintage: VintagePreview, tuesday: TuesdayPreview }

function ProjectCard({ project, flip }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 36, reduce ? 0 : -36])
  const Preview = PREVIEWS[project.id]

  return (
    <article className={`project ${flip ? 'is-flip' : ''}`} ref={ref} aria-labelledby={`p-${project.id}`}>
      <Reveal className="project-media" y={40}>
        <motion.div style={{ y }} data-cursor="view" data-cursor-label="Explore">
          <Preview />
        </motion.div>
      </Reveal>

      <div className="project-info">
        <Reveal y={16}>
          <p className="project-meta">
            <span className="mono-num">{project.index}</span>
            <span className="label">{project.kind}</span>
          </p>
        </Reveal>
        <h3 className="project-title" id={`p-${project.id}`}>
          <RevealText text={project.title} stagger={0.07} />
        </h3>
        <Reveal delay={0.1} y={20}>
          <p className="project-desc">{project.description}</p>
        </Reveal>

        <Reveal delay={0.15} y={20}>
          <ul className="project-points">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2} y={20} className="project-foot">
          <ul className="chip-row" aria-label="Technologies">
            {project.tags.map((t) => (
              <li className="tag" key={t}>
                {t}
              </li>
            ))}
          </ul>
          {project.link ? (
            <Magnetic>
              <a className="btn btn-primary" href={project.link.href} target="_blank" rel="noopener noreferrer">
                {project.link.label} <ArrowUpRight size={18} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Magnetic>
          ) : null}
        </Reveal>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="work" className="section work">
      <div className="wrap">
        <div className="section-head">
          <Reveal>
            <span className="label">(02) Selected work</span>
          </Reveal>
          <RevealText as="h2" className="h-xl" text="Featured *projects*" stagger={0.08} />
        </div>

        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
