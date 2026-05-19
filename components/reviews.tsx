'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const reviews = [
  {
    quote: "Partnering with this studio has been an extraordinary journey. Their structural clarity, command of raw materials, and capability to hit tight deadlines elevated our project to a new benchmark.",
    author: "Craig Applegath",
    role: "Lead Architect — DIALOG",
    avatarLabel: "Client Image"
  },
  {
    quote: "They don't just supply architectural designs; they sculpt space. The way they integrate natural lighting into raw concrete structures redefined our vision of commercial spaces.",
    author: "Martin Baron",
    role: "Partner — BNA Development",
    avatarLabel: "Client Image"
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
            Opinions
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground">
            What they think.
          </h2>
          <p className="text-muted-foreground text-sm font-light leading-relaxed mt-6">
            Our relationships with clients are built on shared values of architectural precision and programmatic dialogue.
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
              
              {/* Square Portrait Placeholder for Client Image */}
              <div className="w-20 h-20 md:w-24 md:h-24 bg-secondary border border-border/50 shrink-0 flex items-center justify-center relative overflow-hidden group">
                <span className="text-[9px] tracking-wider text-muted-foreground/60 font-mono text-center px-2 select-none group-hover:text-foreground transition-colors duration-300">
                  {item.avatarLabel}
                </span>
                
                {/* Minimal crosshair accent */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
                  <div className="w-6 h-px bg-foreground" />
                  <div className="h-6 w-px bg-foreground absolute" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
