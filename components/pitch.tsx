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
          color: 'rgba(255, 255, 255, 0.3)',
          opacity: 0.3,
        },
        {
          color: '#ffffff',
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

  const words = [
    { text: "Concebimos", italic: false },
    { text: "espacios", italic: true },
    { text: "que", italic: false },
    { text: "dialogan", italic: false },
    { text: "con", italic: false },
    { text: "su", italic: false },
    { text: "entorno,", italic: true },
    { text: "estructuras", italic: true },
    { text: "que", italic: false },
    { text: "perduran,", italic: true },
    { text: "y", italic: false },
    { text: "vacíos", italic: true },
    { text: "que", italic: false },
    { text: "inspiran.", italic: true },
  ]

  return (
    <section 
      ref={containerRef}
      className="relative bg-black text-white py-32 md:py-48 px-6 md:px-12 flex items-center justify-center min-h-[60vh]"
    >
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.2] md:leading-[1.2] font-extralight tracking-tight text-balance flex flex-wrap justify-center gap-x-[1.5vw] md:gap-x-[1vw] gap-y-2 md:gap-y-4">
          {words.map((item, i) => (
            <span key={i} className={`pitch-word opacity-30 transition-colors duration-300 ${item.italic ? 'font-serif italic underline decoration-white/40 decoration-[0.5px] underline-offset-[6px] md:underline-offset-[10px]' : ''}`}>
              {item.text}
            </span>
          ))}
        </h2>
        
        <div className="pitch-deco mt-12 md:mt-16 origin-top">
          <div className="h-16 w-px bg-white/50" />
        </div>
      </div>
    </section>
  )
}
