'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(useGSAP, SplitText)

const heroSlides = [
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90',
    alt: 'Concrete architecture with minimal design',
    title: 'Espacios que respiran pureza',
    subtitle: 'Casa Monolito',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90',
    alt: 'Brutalist interior space',
    title: 'Donde la luz encuentra forma',
    subtitle: 'Residencia Umbra',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=90',
    alt: 'Minimal architecture detail',
    title: 'Silencio construido',
    subtitle: 'Pabellón Austero',
  },
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLSpanElement>(null)
  const taglineRef = useRef<HTMLSpanElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const animateSlideContent = useCallback((slideIndex: number, isInitial = false) => {
    if (!titleRef.current || !subtitleRef.current) return

    const slide = heroSlides[slideIndex]
    
    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    })
    timelineRef.current = tl

    if (!isInitial) {
      // Exit animation for current content
      tl.to([taglineRef.current, subtitleRef.current, titleRef.current, descRef.current], {
        y: -40,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.in',
      })
      
      // Update content
      tl.call(() => {
        if (titleRef.current) titleRef.current.textContent = slide.title
        if (subtitleRef.current) subtitleRef.current.textContent = slide.subtitle
      })
    } else {
      // Set initial content
      if (titleRef.current) titleRef.current.textContent = slide.title
      if (subtitleRef.current) subtitleRef.current.textContent = slide.subtitle
    }

    // Entrance animation
    tl.fromTo(
      taglineRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      isInitial ? 0.3 : '+=0.1'
    )
    
    tl.fromTo(
      subtitleRef.current,
      { y: 40, opacity: 0, letterSpacing: '0.5em' },
      { y: 0, opacity: 1, letterSpacing: '0.3em', duration: 0.8, ease: 'power3.out' },
      '<0.1'
    )

    // Title with character-by-character reveal
    tl.fromTo(
      titleRef.current,
      { y: 60, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
      { 
        y: 0, 
        opacity: 1, 
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1,
        ease: 'power3.out',
      },
      '<0.1'
    )

    tl.fromTo(
      descRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '<0.3'
    )

  }, [])

  // Initial animation
  useGSAP(() => {
    animateSlideContent(0, true)
  }, { scope: containerRef })

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true)
        setCurrentSlide((prev) => {
          const next = (prev + 1) % heroSlides.length
          animateSlideContent(next, false)
          return next
        })
      }
    }, 6000)
    return () => clearInterval(interval)
  }, [isAnimating, animateSlideContent])

  const goToSlide = (index: number) => {
    if (index === currentSlide || isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(index)
    animateSlideContent(index, false)
  }

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-primary"
    >
      {/* Image Carousel with Ken Burns effect */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`absolute inset-0 ${index === currentSlide ? 'animate-ken-burns' : ''}`}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
            {/* High contrast overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cement/30 to-transparent" style={{ left: '10%' }} />
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cement/20 to-transparent" style={{ left: '90%' }} />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-28 md:pb-36 px-8 md:px-16 lg:px-24 max-w-[1800px] mx-auto">
        <div className="space-y-5">
          <span 
            ref={taglineRef}
            className="block text-[10px] md:text-xs tracking-[0.4em] text-cement uppercase font-light"
          >
            Arquitectura Esencial
          </span>
          
          <span 
            ref={subtitleRef}
            className="block text-sm md:text-base tracking-[0.3em] text-primary-foreground/60 uppercase font-extralight"
          >
            {heroSlides[0].subtitle}
          </span>
          
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-8xl font-extralight tracking-tight text-primary-foreground leading-[0.95] text-balance max-w-5xl"
          >
            {heroSlides[0].title}
          </h1>
          
          <p 
            ref={descRef}
            className="text-cement text-sm md:text-base max-w-lg font-light leading-relaxed pt-4"
          >
            Diseñamos arquitectura donde cada línea tiene un propósito y cada vacío cuenta una historia de luz y materia.
          </p>
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-28 md:bottom-36 right-8 md:right-16 lg:right-24 flex items-center gap-6">
          <span className="text-cement text-xs tracking-wider font-mono">
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <div className="flex gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-px transition-all duration-500 ${
                  index === currentSlide 
                    ? 'w-12 bg-primary-foreground' 
                    : 'w-6 bg-cement/50 hover:bg-cement'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <span className="text-cement/40 text-xs tracking-wider font-mono">
            {String(heroSlides.length).padStart(2, '0')}
          </span>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[9px] tracking-[0.4em] text-cement/60 uppercase">
            Explorar
          </span>
          <div className="w-px h-10 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-cement to-transparent animate-scroll-line" />
          </div>
        </div>
      </div>
    </section>
  )
}
