'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const services = [
  {
    number: '01',
    title: 'Architectural Design',
    description: 'We craft structures that respond directly to their context. From initial conceptualization to final details, we prioritize volumetric honesty, scale, and spatial flow.'
  },
  {
    number: '02',
    title: 'Interior Architecture',
    description: 'We curate tactile, authentic environments. Selecting pure materials—raw concrete, industrial steel, glass, and wood—we compose space around the sculpturing effect of light.'
  },
  {
    number: '03',
    title: 'Visual Communication',
    description: 'Translating concepts into cinematic expressions. We produce diagrams, illustrations, and materials that communicate the soul and structural clarity of each project.'
  }
]

export function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      })

      tl.fromTo(
        '.do-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(
        '.do-service-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.15 },
        '-=0.4'
      )
    }, containerRef)

    return () => ctx.revert()
  }, { scope: containerRef })

  return (
    <section 
      id="que-hacemos"
      ref={containerRef}
      className="relative bg-secondary py-24 md:py-36 px-6 md:px-12 border-t border-b border-border"
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="do-header mb-16 md:mb-24 max-w-xl">
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-3">
            Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground">
            What we do.
          </h2>
          <p className="text-muted-foreground text-sm font-light leading-relaxed mt-6">
            We operate at the interface of volumetric architecture, interior textures, and visualization, materializing functional spaces that dialogue with their environments.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="do-service-card bg-background border border-border/40 p-8 md:p-10 flex flex-col justify-between min-h-[320px] hover:border-foreground/20 transition-colors duration-500 group"
            >
              <div>
                <span className="font-mono text-xs tracking-wider text-muted-foreground/60 block mb-6">
                  {service.number}
                </span>
                <h3 className="text-2xl font-light tracking-wide text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="w-full h-px bg-border/40 mt-8 origin-left scale-x-0 group-hover:scale-x-100 group-hover:bg-foreground/20 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
