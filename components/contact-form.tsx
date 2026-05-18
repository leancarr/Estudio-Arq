'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function ContactForm() {
  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-fade',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, { scope: containerRef })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000)
    
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  return (
    <section 
      ref={containerRef}
      className="relative bg-background text-foreground py-24 md:py-40 px-6 md:px-12 border-t border-cement/10"
    >
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column - Copy */}
        <div className="lg:col-span-5 lg:col-start-1">
          <div className="sticky top-32 contact-fade">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-8">
              Iniciemos un<br />nuevo diálogo.
            </h2>
            <p className="text-cement text-sm md:text-base leading-relaxed max-w-md">
              Cada gran obra arquitectónica comienza con una conversación. 
              Compartenos tu visión y nuestro equipo te contactará para explorar 
              las posibilidades de tu próximo proyecto.
            </p>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-6 lg:col-start-7 pt-8 lg:pt-0">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
            
            <div className="contact-fade group relative">
              <input 
                type="text" 
                id="name"
                required
                className="peer w-full bg-transparent border-b border-cement/30 py-4 text-foreground text-lg md:text-xl font-light focus:outline-none focus:border-foreground transition-colors placeholder-transparent"
                placeholder="Tu Nombre"
              />
              <label 
                htmlFor="name" 
                className="absolute left-0 top-4 text-cement/60 text-lg md:text-xl font-light transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-foreground peer-focus:tracking-widest peer-valid:-top-6 peer-valid:text-xs peer-valid:text-foreground peer-valid:tracking-widest cursor-text"
              >
                Tu Nombre
              </label>
            </div>

            <div className="contact-fade group relative">
              <input 
                type="email" 
                id="email"
                required
                className="peer w-full bg-transparent border-b border-cement/30 py-4 text-foreground text-lg md:text-xl font-light focus:outline-none focus:border-foreground transition-colors placeholder-transparent"
                placeholder="Correo Electrónico"
              />
              <label 
                htmlFor="email" 
                className="absolute left-0 top-4 text-cement/60 text-lg md:text-xl font-light transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-foreground peer-focus:tracking-widest peer-valid:-top-6 peer-valid:text-xs peer-valid:text-foreground peer-valid:tracking-widest cursor-text"
              >
                Correo Electrónico
              </label>
            </div>

            <div className="contact-fade group relative">
              <textarea 
                id="message"
                required
                rows={4}
                className="peer w-full bg-transparent border-b border-cement/30 py-4 text-foreground text-lg md:text-xl font-light focus:outline-none focus:border-foreground transition-colors placeholder-transparent resize-none"
                placeholder="Sobre el Proyecto"
              />
              <label 
                htmlFor="message" 
                className="absolute left-0 top-4 text-cement/60 text-lg md:text-xl font-light transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-foreground peer-focus:tracking-widest peer-valid:-top-6 peer-valid:text-xs peer-valid:text-foreground peer-valid:tracking-widest cursor-text"
              >
                Sobre el Proyecto
              </label>
            </div>

            <div className="contact-fade flex items-center justify-between pt-4">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center gap-4 text-sm tracking-[0.2em] uppercase text-foreground hover:text-cement transition-colors disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}</span>
                <span className="w-8 h-px bg-current transition-all group-hover:w-16" />
              </button>

              {isSuccess && (
                <span className="text-xs text-green-600 tracking-widest uppercase animate-pulse">
                  Mensaje Enviado
                </span>
              )}
            </div>

          </form>
        </div>

      </div>
    </section>
  )
}
