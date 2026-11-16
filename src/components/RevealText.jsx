import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** "Build *real* things" -> words, with *starred* single words rendered as accent italics. */
function tokenize(text) {
  return text
    .split(' ')
    .filter(Boolean)
    .map((raw) => {
      const em = raw.length > 2 && raw.startsWith('*') && raw.endsWith('*')
      return { word: em ? raw.slice(1, -1) : raw, em }
    })
}

const variants = {
  hidden: { y: '112%' },
  show: (d) => ({
    y: '0%',
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: d },
  }),
}

/**
 * Masked text reveal. Scroll-triggered by default; pass `ready` (boolean) to drive it manually.
 * `by="char"` splits into letters (hero), otherwise words.
 */
export default function RevealText({
  text,
  as: Tag = 'span',
  className = '',
  by = 'word',
  delay = 0,
  stagger = 0.05,
  ready,
}) {
  const reduce = useReducedMotion()
  const words = tokenize(text)

  if (reduce) {
    return (
      <Tag className={className}>
        {words.map((w, i) => (
          <Fragment key={i}>
            {w.em ? <em>{w.word}</em> : w.word}{' '}
          </Fragment>
        ))}
      </Tag>
    )
  }

  const trigger =
    ready === undefined
      ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
      : { initial: 'hidden', animate: ready ? 'show' : 'hidden' }

  let n = 0
  return (
    <Tag className={`rt ${className}`}>
      <span className="sr-only">{words.map((w) => w.word).join(' ')}</span>
      {words.map((w, wi) => {
        const units = by === 'char' ? Array.from(w.word) : [w.word]
        const inner = units.map((u, ui) => {
          const d = delay + n++ * stagger
          return (
            <span className="rt-mask" key={ui} aria-hidden="true">
              <motion.span className="rt-inner" variants={variants} custom={d} {...trigger}>
                {u}
              </motion.span>
            </span>
          )
        })
        return (
          <Fragment key={wi}>
            <span className="rt-word" aria-hidden="true">
              {w.em ? <em>{inner}</em> : inner}
            </span>{' '}
          </Fragment>
        )
      })}
    </Tag>
  )
}
