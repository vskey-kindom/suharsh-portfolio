import { useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

const FEATURES = [
  { id: 'mountain', label: 'Mountain track' },
  { id: 'lake', label: 'Lake-view safari' },
  { id: 'farm', label: 'Farm-land safari' },
]

function Layer({ depth, mx, my, children }) {
  const x = useTransform(mx, [-1, 1], [-depth, depth])
  const y = useTransform(my, [-1, 1], [-depth / 2, depth / 2])
  return <motion.g style={{ x, y }}>{children}</motion.g>
}

/** Layered line-art landscape with mouse parallax. Hover or focus a safari to light up its terrain. */
export default function VintagePreview() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 70, damping: 18 })
  const my = useSpring(rawY, { stiffness: 70, damping: 18 })

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    rawX.set(((e.clientX - r.left) / r.width) * 2 - 1)
    rawY.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const onLeave = () => {
    rawX.set(0)
    rawY.set(0)
    setActive(null)
  }

  const cls = (id) => `vs-layer ${active === id ? 'on' : ''}`
  const fan = Array.from({ length: 13 }, (_, i) => -80 + i * 80)

  return (
    <div className="pv pv-vintage" onPointerMove={onMove} onPointerLeave={onLeave}>
      <svg
        className="vs-svg"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Stylised illustration of a mountain track, a lake and farm land"
        data-active={active || undefined}
      >
        <Layer depth={6} mx={mx} my={my}>
          <circle cx="560" cy="150" r="48" className="vs-sun" />
        </Layer>

        <Layer depth={14} mx={mx} my={my}>
          <path
            className={cls('mountain')}
            d="M-80 340 L90 230 L190 300 L310 190 L430 310 L540 225 L650 320 L730 260 L880 340 L880 640 L-80 640Z"
          />
        </Layer>

        <Layer depth={26} mx={mx} my={my}>
          <path
            className={cls('mountain')}
            d="M-80 410 L120 310 L260 395 L380 300 L520 410 L670 330 L880 410 L880 640 L-80 640Z"
          />
          <path
            className="vs-track"
            d="M60 405 C150 372 210 392 270 352 S390 318 430 322"
            style={{ opacity: active === 'mountain' ? 1 : 0.35 }}
          />
        </Layer>

        <Layer depth={38} mx={mx} my={my}>
          <path className={cls('lake')} d="M90 468 Q400 438 710 468 Q730 522 400 534 Q70 522 90 468Z" />
          <g className="vs-shimmer">
            <line x1="220" y1="486" x2="330" y2="486" />
            <line x1="410" y1="500" x2="540" y2="500" />
            <line x1="300" y1="515" x2="380" y2="515" />
          </g>
        </Layer>

        <Layer depth={52} mx={mx} my={my}>
          <path className={cls('farm')} d="M-80 540 L880 540 L880 640 L-80 640Z" />
          <g className={`vs-rows ${active === 'farm' ? 'on' : ''}`}>
            {fan.map((x) => (
              <line key={x} x1="400" y1="540" x2={x * 2.6 - 760} y2="640" />
            ))}
          </g>
        </Layer>
      </svg>

      <div className="vs-chips" role="group" aria-label="Highlight an experience">
        {FEATURES.map((f) => (
          <button
            key={f.id}
            className={`chip ${active === f.id ? 'on' : ''}`}
            onMouseEnter={() => setActive(f.id)}
            onFocus={() => setActive(f.id)}
            onBlur={() => setActive(null)}
            onClick={() => setActive((a) => (a === f.id ? null : f.id))}
            aria-pressed={active === f.id}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}
