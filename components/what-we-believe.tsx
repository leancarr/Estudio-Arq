'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const beliefs = [
  {
    number: '01',
    title: 'Reduction to the Essential',
    description: 'We eliminate the superfluous to reveal the true nature of each material. Beauty lies in structural honesty.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-6 h-6 text-foreground/75 shrink-0" fill="none">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" d="M128 24 32 80v96l96 56 96-56V80z"/>
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" d="m128 128 96-56M128 128v96M128 128 32 72"/>
      </svg>
    )
  },
  {
    number: '02',
    title: 'Light as Matter',
    description: 'We treat natural light not as an addition, but as the primary building material that sculpts space.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-6 h-6 text-foreground/75 shrink-0" fill="none">
        <circle cx="128" cy="128" r="48" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"/>
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" d="M128 24v24M128 208v24M54.4 54.4l17 17M184.6 184.6l17 17M24 128h24M208 128h24M54.4 201.6l17-17M184.6 71.4l17-17"/>
      </svg>
    )
  },
  {
    number: '03',
    title: 'Architectural Silence',
    description: 'In a saturated world, our spaces offer a pause. We design visual and acoustic sanctuaries that encourage introspection.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-6 h-6 text-foreground/75 shrink-0" fill="none">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" d="M24 128c0-44 26-80 52-80s52 36 52 80 26 80 52 80 52-36 52-80"/>
      </svg>
    )
  }
]

export function WhatWeBelieve() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          toggleActions: 'restart none restart none',
        }
      })

      // Animate title first
      tl.fromTo(
        '.believe-title',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        }
      )
      // Animate image reveal (curtain wipe)
      .fromTo(
        '.believe-image',
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.4,
          ease: 'power4.out',
        },
        "-=0.6"
      )
      // Then animate lines
      .fromTo(
        '.believe-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power4.inOut',
          transformOrigin: 'left center',
          stagger: 0.15,
        },
        "-=0.8"
      )
      // Finally animate items
      .fromTo(
        '.believe-item-content',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
        },
        "-=1.2"
      )
    }, containerRef)

    return () => ctx.revert()
  }, { scope: containerRef })

  return (
    <section 
      id="manifiesto"
      ref={containerRef}
      className="relative bg-background text-foreground py-24 md:py-40 px-6 md:px-12"
    >
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column - Title */}
        <div className="lg:col-span-4 lg:col-start-1">
          <div className="believe-title lg:sticky lg:top-32 space-y-12">
            <div>
              <span className="text-xs tracking-[0.3em] text-cement uppercase mb-4 block">
                Manifesto
              </span>
              <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground">
                What we<br />believe in.
              </h2>
            </div>

            {/* Desktop-only image under the title, with smooth transition overlay */}
            <div 
              className="believe-image hidden lg:block relative aspect-[4/5] w-full overflow-hidden border border-cement/15 group"
              style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            >
              <Image
                src="/manifesto-image.jpg"
                alt="Minimalist industrial architecture detail"
                fill
                className="object-cover transition-transform duration-[1.2s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Beliefs */}
        <div className="lg:col-span-7 lg:col-start-6 believe-list pt-8 lg:pt-0">
          <div className="believe-line h-px w-full bg-cement/20" style={{ transform: 'scaleX(0)' }} />
          
          {beliefs.map((belief, idx) => (
            <div key={idx}>
              <div className="believe-item-content py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                <div className="md:col-span-3 text-cement/60 font-mono text-sm">
                  {belief.number}
                </div>
                <div className="md:col-span-9 space-y-4">
                  <h3 className="text-2xl font-light text-foreground tracking-wide flex items-center gap-3">
                    {belief.icon}
                    <span>{belief.title}</span>
                  </h3>
                  <p className="text-cement text-sm md:text-base leading-relaxed max-w-xl">
                    {belief.description}
                  </p>
                </div>
              </div>
              <div className="believe-line h-px w-full bg-cement/20" style={{ transform: 'scaleX(0)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
