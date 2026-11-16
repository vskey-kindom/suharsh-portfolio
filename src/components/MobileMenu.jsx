import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { profile, sections } from '../data/content'
import { InstagramIcon, LinkedinIcon } from './Icons'

export default function MobileMenu({ open, onClose, onNavigate }) {
  const panel = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    document.documentElement.classList.add('menu-open')
    const focusables = () => panel.current?.querySelectorAll('a[href], button:not([disabled])') ?? []
    focusables()[0]?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const items = Array.from(focusables())
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.classList.remove('menu-open')
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panel}
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <nav aria-label="Mobile">
            <ul>
              {sections.map((s, i) => (
                <li key={s.id} className="mm-item">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: '0%', transition: { delay: 0.25 + i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
                    exit={{ y: '110%', transition: { duration: 0.3 } }}
                  >
                    <a
                      href={`#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        onNavigate(s.id, s.label)
                      }}
                    >
                      <span className="mm-num">0{i + 1}</span>
                      {s.label}
                    </a>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="mm-foot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.7 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <a href={`mailto:${profile.email}`}>
              {profile.email} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href={profile.instagram.url} target="_blank" rel="noopener noreferrer">
              <InstagramIcon width={16} height={16} /> Instagram {profile.instagram.handle} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href={profile.linkedin.url} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon width={16} height={16} /> LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
