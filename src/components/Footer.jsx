import { ArrowUp } from 'lucide-react'
import { profile, sections } from '../data/content'
import { InstagramIcon, LinkedinIcon } from './Icons'
import { useNav } from './PageTransition'

export default function Footer() {
  const { go } = useNav()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <p className="footer-word" aria-hidden="true">
            SUHARSH<span>.</span>
          </p>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => go('top', 'Top')}
            aria-label="Back to top"
          >
            Back to top <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="footer-grid">
          <p className="footer-quote">&ldquo;{profile.philosophy.replaceAll('*', '')}&rdquo;</p>

          <nav aria-label="Footer" className="footer-nav">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  go(s.id, s.label)
                }}
              >
                {s.label}
              </a>
            ))}
          </nav>

          <div className="footer-contact">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon size={18} width={18} height={18} />
              {profile.instagram.handle}
            </a>
            <a href={profile.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={18} width={18} height={18} />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="footer-base">
          <span>© {year} Suharsh. All rights reserved.</span>
          <span>Designed &amp; built by Suharsh with React + Vite.</span>
        </div>
      </div>
    </footer>
  )
}
