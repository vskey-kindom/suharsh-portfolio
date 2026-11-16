import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const SIZES = { default: 38, link: 68, view: 104 }

/**
 * Custom cursor: a precise dot plus a springy ring that grows over interactive elements.
 * Only mounts on devices with a fine pointer and hover. Add data-cursor="view" and
 * data-cursor-label="Explore" to any element to get the labelled variant.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [variant, setVariant] = useState('default')
  const [label, setLabel] = useState('')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined
    document.documentElement.classList.add('custom-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e) => {
      const el = e.target instanceof Element ? e.target.closest('[data-cursor],a,button,[role="tab"]') : null
      if (!el) {
        setVariant('default')
        setLabel('')
        return
      }
      setVariant(el.dataset.cursor || 'link')
      setLabel(el.dataset.cursorLabel || '')
    }
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const size = SIZES[variant] || SIZES.default
  return (
    <div className="cursor" aria-hidden="true" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div className="cursor-pos" style={{ x, y }}>
        <div className="cursor-dot" />
      </motion.div>
      <motion.div className="cursor-pos" style={{ x: rx, y: ry }}>
        <motion.div
          className={`cursor-ring ${variant !== 'default' ? 'is-active' : ''}`}
          animate={{ width: size, height: size }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        >
          {variant === 'view' && label ? <span>{label}</span> : null}
        </motion.div>
      </motion.div>
    </div>
  )
}
