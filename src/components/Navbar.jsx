import { useCallback, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { sections } from '../data/content'
import useActiveSection from '../hooks/useActiveSection'
import { useNav } from './PageTransition'
import MobileMenu from './MobileMenu'

const IDS = ['top', ...sections.map((s) => s.id)]

export default function Navbar({ ready }) {
  const { go } = useNav()
  const active = useActiveSection(IDS)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const btn = useRef(null)

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > prev && y > 260 && !open)
  })

  const close = useCallback(() => {
    setOpen(false)
    btn.current?.focus()
  }, [])

  const navigate = (id, name) => {
    setOpen(false)
    setTimeout(() => go(id, name), 450)
  }

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: '-110%' }}
        animate={{ y: ready && !hidden ? '0%' : '-110%' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-inner wrap">
          <a
            className="nav-logo"
            href="#top"
            aria-label="Suharsh, back to top"
            onClick={(e) => {
              e.preventDefault()
              go('top', 'Home')
            }}
          >
            S<span>.</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={active === s.id ? 'is-active' : ''}
                aria-current={active === s.id ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  go(s.id, s.label)
                }}
              >
                <span className="nav-num">0{i + 1}</span>
                {s.label}
              </a>
            ))}
          </nav>

          <button
            ref={btn}
            className="nav-menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => (open ? close() : setOpen(true))}
          >
            <span>{open ? 'Close' : 'Menu'}</span>
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </motion.header>
      <MobileMenu open={open} onClose={close} onNavigate={navigate} />
    </>
  )
}
