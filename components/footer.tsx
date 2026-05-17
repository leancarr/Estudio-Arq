'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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
            © 2024 Estudio 87. Todos los derechos reservados.
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
