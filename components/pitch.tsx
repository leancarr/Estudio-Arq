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
          opacity: 0.25,
        },
        {
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

  const pitchWords = [
    { text: "We", className: "text-zinc-200 font-extralight" },
    { text: "conceive", className: "text-zinc-200 font-extralight italic" },
    { text: "spaces", className: "font-serif text-zinc-950 font-light tracking-wide underline decoration-zinc-800 decoration-[0.5px] underline-offset-[6px] md:underline-offset-[10px]" },
    { text: "that", className: "text-zinc-200 font-extralight" },
    { text: "dialogue", className: "text-zinc-900 font-light italic" },
    { text: "with", className: "text-zinc-200 font-extralight" },
    { text: "their", className: "text-zinc-200 font-extralight" },
    { text: "environment,", className: "font-serif text-zinc-950 font-light italic underline decoration-zinc-800 decoration-[0.5px] underline-offset-[6px] md:underline-offset-[10px]" },
    { text: "structures", className: "text-zinc-950 font-light underline decoration-zinc-800 decoration-[0.5px] underline-offset-[6px] md:underline-offset-[10px]" },
    { text: "that", className: "text-zinc-200 font-extralight" },
    { text: "endure,", className: "text-zinc-900 font-light italic" },
    { text: "and", className: "text-zinc-200 font-extralight" },
    { text: "voids", className: "font-serif text-zinc-950 font-light tracking-wider underline decoration-zinc-800 decoration-[0.5px] underline-offset-[6px] md:underline-offset-[10px]" },
    { text: "that", className: "text-zinc-200 font-extralight" },
    { text: "inspire.", className: "text-zinc-950 font-light italic underline decoration-zinc-800 decoration-[0.5px] underline-offset-[6px] md:underline-offset-[10px]" }
  ]

  return (
    <section 
      ref={containerRef}
      className="relative bg-gradient-to-b from-zinc-950 via-zinc-600 to-secondary py-36 md:py-52 px-6 md:px-12 flex items-center justify-center min-h-[60vh]"
    >
      {/* Decorative vertical lines matching Hero */}
      <div className="absolute top-0 left-[10%] w-px h-full bg-foreground/5 pointer-events-none" />
      <div className="absolute top-0 left-[90%] w-px h-full bg-foreground/5 pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
        <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.2] md:leading-[1.2] font-extralight tracking-tight text-balance flex flex-wrap justify-center gap-x-[1.5vw] md:gap-x-[1vw] gap-y-2 md:gap-y-4">
          {pitchWords.map((word, i) => (
            <span key={i} className={`pitch-word opacity-25 transition-all duration-300 ${word.className}`}>
              {word.text}
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
