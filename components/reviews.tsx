'use client'

import Image from 'next/image'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const reviews = [
  {
    quote: "Asociarnos con este estudio ha sido un viaje extraordinario. Su claridad estructural, dominio de los materiales en bruto y capacidad para cumplir con plazos ajustados elevaron nuestro proyecto a un nuevo nivel.",
    author: "Nombre*",
    role: "Arquitecto Principal — DIALOG",
    image: "/client-1.jpg"
  },
  {
    quote: "No solo entregan diseños arquitectónicos; esculpen el espacio. La forma en que integran la luz natural en estructuras de hormigón crudo redefinió nuestra visión de los espacios comerciales.",
    author: "Nombre*",
    role: "Socio — BNA Development",
    image: "/client-2.jpg"
  }
]

export function Reviews() {
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
        '.reviews-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(
        '.review-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.2 },
        '-=0.4'
      )
    }, containerRef)

    return () => ctx.revert()
  }, { scope: containerRef })

  return (
    <section 
      id="opiniones"
      ref={containerRef}
      className="relative bg-secondary py-24 md:py-36 px-6 md:px-12 border-t border-border"
    >
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column - Title */}
        <div className="lg:col-span-4 lg:col-start-1 reviews-header">
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-3">
            Opiniones
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground">
            Lo que piensan.
          </h2>
          <p className="text-muted-foreground text-sm font-light leading-relaxed mt-6">
            Nuestras relaciones con los clientes se basan en valores compartidos de precisión arquitectónica y diálogo programático.
          </p>
        </div>

        {/* Right Column - Reviews Grid */}
        <div className="lg:col-span-8 lg:col-start-5 space-y-12">
          {reviews.map((item, idx) => (
            <div 
              key={idx}
              className="review-card bg-background border border-border/40 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start justify-between hover:border-foreground/15 transition-colors duration-500"
            >
              {/* Review Text block */}
              <div className="flex-1 space-y-6">
                <blockquote className="text-lg md:text-xl font-extralight italic text-foreground leading-relaxed text-balance">
                  "{item.quote}"
                </blockquote>
                
                <div className="space-y-1">
                  <cite className="not-italic text-base font-light text-foreground block">
                    {item.author}
                  </cite>
                  <span className="text-xs tracking-wider text-muted-foreground block font-mono">
                    {item.role}
                  </span>
                </div>
              </div>
              
              {/* Client Image */}
              <div className="w-20 h-20 md:w-24 md:h-24 bg-secondary border border-border/50 shrink-0 relative overflow-hidden group">
                <Image 
                  src={item.image} 
                  alt={item.author} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
