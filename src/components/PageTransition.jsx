import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const NavContext = createContext({ go: () => {} })
export const useNav = () => useContext(NavContext)

/**
 * Provides go(id): a wine-coloured curtain wipes across, the page jumps to the section
 * underneath it, and the curtain exits upward. Falls back to an instant jump when the user
 * prefers reduced motion.
 */
export function TransitionProvider({ children }) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState('idle') // idle | in | out
  const [label, setLabel] = useState('')
  const busy = useRef(false)

  const go = useCallback(
    (id, name = '') => {
      const el = id === 'top' ? document.getElementById('top') : document.getElementById(id)
      if (!el) return

      const jump = () => {
        window.scrollTo({ top: id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY, behavior: 'instant' })
        history.replaceState(null, '', id === 'top' ? window.location.pathname : `#${id}`)
        el.setAttribute('tabindex', '-1')
        el.focus({ preventScroll: true })
      }

      if (reduce) {
        jump()
        return
      }
      if (busy.current) return
      busy.current = true
      setLabel(name)
      setPhase('in')
      setTimeout(() => {
        jump()
        setPhase('out')
        setTimeout(() => {
          setPhase('idle')
          busy.current = false
        }, 700)
      }, 700)
    },
    [reduce],
  )

  return (
    <NavContext.Provider value={{ go }}>
      {children}
      <motion.div
        className="wipe"
        aria-hidden="true"
        initial={false}
        animate={{ y: phase === 'in' ? '0%' : phase === 'out' ? '-100%' : '100%' }}
        transition={phase === 'idle' ? { duration: 0 } : { duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        <span>{label}</span>
      </motion.div>
    </NavContext.Provider>
  )
}
