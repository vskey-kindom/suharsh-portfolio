import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { profile } from '../data/content'
import { InstagramIcon, LinkedinIcon } from './Icons'
import Magnetic from './Magnetic'
import Reveal from './Reveal'
import RevealText from './RevealText'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const { linkedin, instagram } = profile

  return (
    <section id="contact" className="section contact">
      <div className="wrap">
        <Reveal>
          <span className="label">(05) Contact</span>
        </Reveal>

        <RevealText
          as="h2"
          className="h-xl contact-title"
          text="Have an idea? Let's build something *extraordinary.*"
          stagger={0.06}
        />

        <Reveal className="contact-email-row" delay={0.1}>
          <a className="contact-email" href={`mailto:${profile.email}`} data-cursor="link">
            {profile.email}
          </a>
          <Magnetic>
            <button className="btn btn-ghost btn-sm" onClick={copy}>
              {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </Magnetic>
          <span className="sr-only" role="status" aria-live="polite">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
        </Reveal>

        <Reveal as="ul" className="socials" delay={0.15}>
          <li>
            <a className="social" href={`mailto:${profile.email}`}>
              <Mail size={22} aria-hidden="true" />
              <span className="social-text">
                <span className="label">Email</span>
                {profile.email}
              </span>
              <ArrowUpRight size={22} className="social-arrow" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a className="social" href={instagram.url} target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
              <span className="social-text">
                <span className="label">Instagram</span>
                {instagram.handle}
              </span>
              <ArrowUpRight size={22} className="social-arrow" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a className="social" href={linkedin.url} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon />
              <span className="social-text">
                <span className="label">LinkedIn</span>
                {linkedin.handle}
              </span>
              <ArrowUpRight size={22} className="social-arrow" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        </Reveal>
      </div>
    </section>
  )
}
