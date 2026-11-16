import { motion, useReducedMotion } from 'framer-motion'

/** Fade + rise wrapper. Scroll-triggered by default; pass `ready` to drive it manually. */
export default function Reveal({ children, delay = 0, y = 28, as = 'div', className = '', ready }) {
  const reduce = useReducedMotion()

  if (reduce) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  const M = motion[as] || motion.div
  const trigger =
    ready === undefined
      ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '0px 0px -8% 0px' } }
      : { animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y } }

  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      {...trigger}
    >
      {children}
    </M>
  )
}
