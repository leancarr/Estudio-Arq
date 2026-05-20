'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const services = [
  {
    number: '01',
    title: 'Diseño Arquitectónico',
    description: 'Creamos estructuras que responden directamente a su contexto. Desde la conceptualización inicial hasta los detalles finales, priorizamos la honestidad volumétrica, la escala y el flujo espacial.'
  },
  {
    number: '02',
    title: 'Arquitectura Interior',
    description: 'Comisariamos entornos táctiles y auténticos. Seleccionando materiales puros —hormigón en bruto, acero industrial, vidrio y madera— componemos el espacio en torno al efecto escultórico de la luz.'
  },
  {
    number: '03',
    title: 'Comunicación Visual',
    description: 'Traduciendo conceptos en expresiones cinematográficas. Producimos diagramas, ilustraciones y materiales que comunican el alma y la claridad estructural de cada proyecto.'
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
            Servicios
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground">
            Lo que hacemos.
          </h2>
          <p className="text-muted-foreground text-sm font-light leading-relaxed mt-6">
            Operamos en la intersección de la arquitectura volumétrica, las texturas interiores y la visualización, materializando espacios funcionales que dialogan con su entorno.
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
