import { useCallback, useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Journey from './components/Journey'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import { TransitionProvider } from './components/PageTransition'
import Preloader from './components/Preloader'
import Projects from './components/Projects'
import Skills from './components/Skills'

export default function App() {
  const [ready, setReady] = useState(false)
  const onLoaded = useCallback(() => setReady(true), [])

  return (
    <TransitionProvider>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Cursor />
      <Preloader onDone={onLoaded} />
      <Navbar ready={ready} />
      <main id="main" tabIndex={-1}>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </TransitionProvider>
  )
}
