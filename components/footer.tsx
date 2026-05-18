'use client'

import { useRef, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

  // Auto-scroll logic for carousel
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const autoScroll = setInterval(scrollNext, 3000)
    return () => clearInterval(autoScroll)
  }, [emblaApi, scrollNext])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, { scope: containerRef })

  return (
    <footer 
      id="contacto"
      ref={containerRef}
      className="relative bg-foreground text-primary-foreground py-24 md:py-32"
    >
      <div 
        ref={contentRef}
        className="max-w-[1800px] mx-auto px-6 md:px-12"
      >
        {/* Brands / Partners Carousel */}
        <div className="mb-24 md:mb-32 border-b border-primary-foreground/10 pb-16 md:pb-24">
          <span className="text-xs tracking-[0.3em] text-primary-foreground/50 uppercase block mb-12 text-center md:text-left">
            Trusted Partners
          </span>
          
          {/* Embla Carousel */}
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {[
                { name: "VITRA", class: "font-serif text-xl md:text-2xl tracking-[0.2em]" },
                { name: "KNOLL", class: "font-sans text-lg md:text-xl tracking-[0.3em] font-bold" },
                { name: "Flos", class: "font-serif text-2xl md:text-3xl italic tracking-wider" },
                { name: "ARTEMIDE", class: "font-mono text-lg md:text-xl tracking-[0.15em]" },
                { name: "CASSINA", class: "font-sans text-xl md:text-2xl font-light tracking-[0.25em]" }
              ].map((brand, i) => (
                <div key={i} className="flex-[0_0_50%] md:flex-[0_0_25%] min-w-0 flex justify-center items-center opacity-50 grayscale hover:opacity-100 transition-opacity duration-500">
                  <span className={brand.class}>{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <span className="text-xs tracking-[0.3em] text-primary-foreground/50 uppercase">
                Contacto
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-extralight tracking-tight text-balance">
                Hablemos de tu próximo proyecto
              </h2>
            </div>
            
            <div className="space-y-4">
              <a 
                href="mailto:hola@estudio87.com"
                className="block text-lg md:text-xl font-light text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300"
              >
                hola@estudio87.com
              </a>
              <p className="text-sm text-primary-foreground/50">
                +54 11 4567 8900
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div id="estudio">
              <span className="text-xs tracking-[0.3em] text-primary-foreground/50 uppercase">
                Estudio
              </span>
              <address className="mt-4 text-sm text-primary-foreground/70 not-italic leading-relaxed">
                Av. del Libertador 4850<br />
                Palermo, Buenos Aires<br />
                Argentina
              </address>
            </div>

            <div>
              <span className="text-xs tracking-[0.3em] text-primary-foreground/50 uppercase">
                Social
              </span>
              <div className="mt-4 flex gap-6">
                <SocialLink href="#" label="Instagram" />
                <SocialLink href="#" label="LinkedIn" />
                <SocialLink href="#" label="Pinterest" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-primary-foreground/40">
            © 2024 LAMBDA. Todos los derechos reservados.
          </p>
          <p className="text-xs text-primary-foreground/40">
            Arquitectura que trasciende
          </p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="text-xs tracking-[0.15em] text-primary-foreground/60 hover:text-primary-foreground uppercase transition-colors duration-300 relative group"
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-foreground transition-all duration-300 group-hover:w-full" />
    </a>
  )
}
