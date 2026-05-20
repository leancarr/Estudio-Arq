'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const team = [
  {
    role: 'Fundador y Arquitecto Principal',
    name: 'Guido Chiarito',
    bio: 'Dirige la visión arquitectónica y la estrategia espacial del estudio, centrándose en geometrías honestas y la integración de la luz natural.'
  },
  {
    role: 'Socia y Diseñadora Principal',
    name: 'Isabella Vanni',
    bio: 'Supervisa el desarrollo de interiores y la investigación de materiales, asegurando que cada textura y detalle se alineen con la verdad estructural.'
  }
]

export function WhoWeAre() {
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
        '.team-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(
        '.team-member',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.2 },
        '-=0.4'
      )
    }, containerRef)

    return () => ctx.revert()
  }, { scope: containerRef })

  return (
    <section 
      id="quienes-somos"
      ref={containerRef}
      className="relative bg-background py-24 md:py-36 px-6 md:px-12 border-t border-border"
    >
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column - Intro */}
        <div className="lg:col-span-4 lg:col-start-1 team-header">
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-3">
            Estudio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground">
            Quiénes somos.
          </h2>
          <p className="text-muted-foreground text-sm font-light leading-relaxed mt-6">
            Somos un equipo multicultural de diseñadores, ingenieros y arquitectos. Creemos en la cooperación interdisciplinaria para construir estructuras que sobrevivan a las modas pasajeras.
          </p>
        </div>

        {/* Right Column - Team/Leadership Grid */}
        <div className="lg:col-span-8 lg:col-start-5 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {team.map((member, idx) => (
            <div key={idx} className="team-member space-y-6">
              {/* Profile Photo Placeholder Frame */}
              <div className="relative aspect-[3/4] w-full bg-secondary border border-border/40 flex items-center justify-center group overflow-hidden">
                {/* Thin technical crosshair lines in background to reinforce the design/architecture style */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.08]">
                  <div className="w-12 h-px bg-foreground" />
                  <div className="h-12 w-px bg-foreground absolute" />
                </div>
                
                <span className="text-xs tracking-[0.25em] text-muted-foreground/60 uppercase font-mono group-hover:text-foreground transition-colors duration-500">
                  Imagen Pendiente
                </span>
                
                {/* Clean hover accent border */}
                <div className="absolute inset-4 border border-foreground/0 group-hover:border-foreground/5 transition-all duration-700" />
              </div>
              
              {/* Leadership details */}
              <div className="space-y-2">
                <span className="text-xs tracking-[0.15em] text-muted-foreground uppercase block font-mono">
                  {member.role}
                </span>
                <h3 className="text-2xl font-light text-foreground tracking-wide">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm font-light leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
