import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { profile } from '../data/content'
import { useNav } from './PageTransition'
import Magnetic from './Magnetic'
import RevealText from './RevealText'
import Reveal from './Reveal'

export default function Hero({ ready }) {
  const { go } = useNav()
  const reduce = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const nameY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -150])
  const subY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0])

  // Wine spotlight that eases toward the pointer.
  const mx = useMotionValue(72)
  const my = useMotionValue(30)
  const sx = useSpring(mx, { stiffness: 55, damping: 20 })
  const sy = useSpring(my, { stiffness: 55, damping: 20 })
  const glow = useMotionTemplate`radial-gradient(560px circle at ${sx}% ${sy}%, rgba(141, 38, 62, 0.3), transparent 66%)`

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 100)
    my.set(((e.clientY - r.top) / r.height) * 100)
  }

  const connect = (e) => {
    e.preventDefault()
    go('contact', 'Contact')
  }
  const explore = (e) => {
    e.preventDefault()
    go('work', 'Work')
  }

  return (
    <section id="top" ref={ref} className="hero" onPointerMove={onMove} aria-label="Introduction">
      <motion.div className="hero-glow" style={{ background: glow }} aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <motion.div className="hero-top wrap" style={{ opacity: fade }}>
        <Reveal ready={ready} delay={0.1} y={14}>
          <span className="label">Portfolio / {new Date().getFullYear()}</span>
        </Reveal>
        <Reveal ready={ready} delay={0.2} y={14}>
          <span className="label">B.Tech ISE · REVA University</span>
        </Reveal>
      </motion.div>

      <div className="hero-body wrap">
        <motion.h1 className="hero-name" style={{ y: nameY }}>
          <RevealText text="SUHARSH" by="char" stagger={0.065} delay={0.05} ready={ready} />
          <motion.span
            className="hero-dot"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 0.62, type: 'spring', stiffness: 260, damping: 14 }}
          >
            .
          </motion.span>
        </motion.h1>

        <motion.div className="hero-sub" style={{ y: subY, opacity: fade }}>
          <RevealText as="p" className="hero-tagline" text={profile.tagline} delay={0.7} stagger={0.08} ready={ready} />
          <div className="hero-side">
            <Reveal ready={ready} delay={1} y={20}>
              <p className="hero-intro">{profile.intro}</p>
            </Reveal>
            <Reveal ready={ready} delay={1.15} y={20} className="hero-ctas">
              <Magnetic>
                <a className="btn btn-primary" href="#work" onClick={explore}>
                  Explore My Work <ArrowRight size={18} aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn btn-ghost" href="#contact" onClick={connect}>
                  Let&apos;s Connect
                </a>
              </Magnetic>
            </Reveal>
          </div>
        </motion.div>
      </div>

      <motion.div className="hero-bottom wrap" style={{ opacity: fade }}>
        <Reveal ready={ready} delay={1.4} y={10}>
          <a
            className="scroll-cue"
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              go('about', 'About')
            }}
          >
            <span className="scroll-line" aria-hidden="true" />
            Scroll
          </a>
        </Reveal>
      </motion.div>

      <motion.div
        className="hero-badge"
        aria-hidden="true"
        initial={{ opacity: 0, rotate: -40 }}
        animate={ready ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -40 }}
        transition={{ delay: 1.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 120 120" className="badge-spin">
          <defs>
            <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <text>
            <textPath href="#badge-circle" startOffset="0">
              BUILD · LEARN · SHIP · REPEAT · BUILD · LEARN · SHIP · REPEAT ·
            </textPath>
          </text>
        </svg>
        <ArrowDown className="badge-arrow" size={22} aria-hidden="true" />
      </motion.div>
    </section>
  )
}
