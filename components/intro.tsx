'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export function Intro({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => setIsReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useGSAP(() => {
    if (!isReady) return

    const tl = gsap.timeline({
      onComplete: () => {
        // Animate out and call onComplete
        gsap.to(containerRef.current, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.pointerEvents = 'none'
            }
            onComplete?.()
          }
        })
      }
    })

    // Initial state
    gsap.set('.lambda-letter', { 
      yPercent: 100, 
      opacity: 0 
    })
    gsap.set('.tagline-word', { 
      yPercent: 50, 
      opacity: 0 
    })
    gsap.set('.intro-line', { 
      scaleX: 0 
    })
    gsap.set('.scroll-hint', { 
      opacity: 0, 
      y: 20 
    })

    // Animation sequence
    tl.to('.lambda-letter', {
      yPercent: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.08,
      ease: 'power4.out',
    })
    .to('.intro-line', {
      scaleX: 1,
      duration: 0.8,
      ease: 'power2.inOut',
    }, '-=0.4')
    .to('.tagline-word', {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.4')
    .to('.scroll-hint', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.2')
    .to({}, { duration: 2 }) // Pause before exit

  }, { scope: containerRef, dependencies: [isReady] })

  const lambdaLetters = 'LAMBDA'.split('')
  const taglineWords = ['ARQUITECTURA', '·', 'DISEÑO', '·', 'ESPACIO']

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-primary flex items-center justify-center overflow-hidden"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        poster="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-white-sand-beach-background-1564-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-0 bottom-0 w-px bg-cement/10" />
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-cement/10" />
        <div className="absolute left-[90%] top-0 bottom-0 w-px bg-cement/10" />
        <div className="absolute top-[20%] left-0 right-0 h-px bg-cement/10" />
        <div className="absolute top-[80%] left-0 right-0 h-px bg-cement/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Lambda logo text */}
        <div className="overflow-hidden mb-6">
          <h1 className="font-serif text-[15vw] md:text-[12vw] lg:text-[10vw] font-light tracking-[0.2em] text-secondary leading-none flex justify-center">
            {lambdaLetters.map((letter, i) => (
              <span
                key={i}
                className="lambda-letter inline-block"
                style={{ opacity: 0 }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Decorative line */}
        <div className="intro-line h-px bg-cement/40 w-32 md:w-48 mx-auto mb-6" style={{ transform: 'scaleX(0)' }} />

        {/* Tagline */}
        <div className="overflow-hidden">
          <p className="font-sans text-xs md:text-sm tracking-[0.4em] text-cement flex items-center justify-center gap-3 md:gap-4">
            {taglineWords.map((word, i) => (
              <span
                key={i}
                className="tagline-word inline-block"
                style={{ opacity: 0 }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" style={{ opacity: 0 }}>
          <span className="text-[10px] tracking-[0.3em] text-cement/60 uppercase">Entrar</span>
          <div className="w-px h-8 bg-cement/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-cement/60 animate-scroll-line" />
          </div>
        </div>
      </div>

      {/* Corner marks */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-cement/20" />
      <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-cement/20" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-cement/20" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-cement/20" />
    </div>
  )
}
