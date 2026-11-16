import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const STEPS = ['Wake-word detection', 'Speech recognition', 'Text generation', 'Desktop functionality']
const AMPLITUDE = [0.34, 0.8, 1, 0.55]
const BARS = Array.from({ length: 44 }, (_, i) => ({ i, r: ((i * 37 + 11) % 100) / 100 }))

/** Voice-pipeline illustration: a waveform that cycles through the stages of the assistant. */
export default function TuesdayPreview() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { margin: '-10% 0px' })
  const [step, setStep] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto || reduce || !inView) return undefined
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2400)
    return () => clearInterval(t)
  }, [auto, reduce, inView])

  return (
    <div className="pv pv-tuesday" ref={ref}>
      <div className="pv-grid" aria-hidden="true" />
      <div className="tu-head">
        <span className="label">Voice pipeline</span>
        <span className="tu-state">
          <i aria-hidden="true" />
          {STEPS[step]}
        </span>
      </div>

      <div
        className={`wv ${step === 0 ? 'is-wake' : ''}`}
        style={{ '--amp': AMPLITUDE[step] }}
        aria-hidden="true"
      >
        {BARS.map((b) => (
          <span key={b.i} style={{ '--i': b.i, '--r': b.r }} />
        ))}
      </div>

      <ol className="tu-steps">
        {STEPS.map((s, i) => (
          <li key={s}>
            <button
              className={i === step ? 'on' : ''}
              aria-pressed={i === step}
              onClick={() => {
                setAuto(false)
                setStep(i)
              }}
            >
              <span className="mono-num">0{i + 1}</span>
              {s}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
