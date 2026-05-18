'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const beliefs = [
  {
    number: '01',
    title: 'Reducción al Esencial',
    description: 'Eliminamos lo superfluo para revelar la verdadera naturaleza de cada material. La belleza reside en la honestidad estructural.'
  },
  {
    number: '02',
    title: 'Luz como Materia',
    description: 'Tratamos la luz natural no como un complemento, sino como el principal material de construcción que esculpe el espacio.'
  },
  {
    number: '03',
    title: 'Silencio Arquitectónico',
    description: 'En un mundo saturado, nuestros espacios ofrecen pausa. Diseñamos refugios visuales y acústicos que fomentan la introspección.'
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
          toggleActions: 'restart reverse restart reverse',
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
        "-=0.4"
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
      ref={containerRef}
      className="relative bg-background text-foreground py-24 md:py-40 px-6 md:px-12"
    >
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column - Title */}
        <div className="lg:col-span-4 lg:col-start-1">
          <div className="believe-title sticky top-32">
            <span className="text-xs tracking-[0.3em] text-cement uppercase mb-4 block">
              Manifiesto
            </span>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground">
              What we<br />believe in.
            </h2>
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
                  <h3 className="text-2xl font-light text-foreground tracking-wide">
                    {belief.title}
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
