import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const easeOut = (p) => 1 - Math.pow(1 - p, 3)

export default function Preloader({ onDone }) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('is-loading')
    const duration = reduce ? 250 : 850
    const start = performance.now()
    let raf
    let timer

    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setCount(Math.round(easeOut(p) * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        timer = setTimeout(() => {
          setDone(true)
          document.documentElement.classList.remove('is-loading')
          onDone?.()
        }, 120)
      }
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      document.documentElement.classList.remove('is-loading')
    }
  }, [reduce, onDone])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          role="status"
          aria-label="Loading portfolio"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.3 } }
              : { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }
          }
        >
          <div className="pre-top">
            <span className="label">Suharsh</span>
            <span className="label">Portfolio / {new Date().getFullYear()}</span>
          </div>

          <div className="pre-mid">
            <motion.p
              className="pre-line"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Building ideas into <em>reality.</em>
            </motion.p>
          </div>

          <div className="pre-bottom">
            <div className="pre-bar" aria-hidden="true">
              <span style={{ transform: `scaleX(${count / 100})` }} />
            </div>
            <div className="pre-count" aria-hidden="true">
              {String(count).padStart(2, '0')}
              <i>%</i>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
