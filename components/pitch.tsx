'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Pitch() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Line for the decorative bar
      gsap.fromTo(
        '.pitch-deco',
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'restart reverse restart reverse',
          },
        }
      )

      // Words scrub animation
      gsap.fromTo('.pitch-word', 
        {
          color: 'var(--cement)',
          opacity: 0.3,
        },
        {
          color: 'var(--foreground)',
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: true,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, { scope: containerRef })

  const text = "Concebimos espacios que dialogan con su entorno, estructuras que perduran, y vacíos que inspiran."
  const words = text.split(' ')

  return (
    <section 
      ref={containerRef}
      className="relative bg-background text-foreground py-32 md:py-48 px-6 md:px-12 flex items-center justify-center min-h-[60vh]"
    >
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.2] md:leading-[1.2] font-extralight tracking-tight text-balance flex flex-wrap justify-center gap-x-[1.5vw] md:gap-x-[1vw] gap-y-2 md:gap-y-4">
          {words.map((word, i) => (
            <span key={i} className="pitch-word text-cement opacity-30 transition-colors duration-300">
              {word}
            </span>
          ))}
        </h2>
        
        <div className="pitch-deco mt-12 md:mt-16 origin-top">
          <div className="h-16 w-px bg-foreground/50" />
        </div>
      </div>
    </section>
  )
}
