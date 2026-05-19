'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { TransitionLink, useViewTransitions } from './transition-link'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const projects = [
  {
    id: 'casa-monolito',
    title: 'Monolith House',
    year: '2024',
    location: 'Buenos Aires',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=90',
  },
  {
    id: 'refugio-andino',
    title: 'Andean Refuge',
    year: '2023',
    location: 'Bariloche',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=90',
  },
  {
    id: 'torre-silencio',
    title: 'Tower of Silence',
    year: '2023',
    location: 'Montevideo',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1600&q=90',
  },
  {
    id: 'galeria-luz',
    title: 'Gallery of Light',
    year: '2022',
    location: 'Santiago',
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1600&q=90',
  },
  {
    id: 'casa-horizonte',
    title: 'Horizon House',
    year: '2022',
    location: 'Punta del Este',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=90',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!cardRef.current || !imageRef.current || !contentRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    })

    // Image reveal with clip-path from center
    tl.fromTo(
      imageRef.current,
      {
        clipPath: 'inset(50% 50% 50% 50%)',
        scale: 1.2,
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        duration: 1.4,
        ease: 'power4.out',
      }
    )

    // Content stagger animation
    const contentElements = contentRef.current.querySelectorAll('.animate-in')
    tl.fromTo(
      contentElements,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      },
      '-=0.8'
    )
  }, { scope: cardRef })

  return (
    <div
      ref={cardRef}
      className="project-card relative min-h-0 lg:min-h-[75vh] flex items-center py-16 md:py-24 lg:py-12"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image - alternating sides */}
          <div 
            className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
          >
            <TransitionLink
              href={`/proyectos/${project.id}`}
              className="block relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div 
                ref={imageRef}
                className="absolute inset-0"
                style={{ clipPath: 'inset(50% 50% 50% 50%)' }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover transition-transform duration-700 ease-out ${
                    isHovered ? 'scale-105' : 'scale-100'
                  }`}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                
                {/* Hover overlay */}
                <div 
                  className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                
                {/* View indicator */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span className="text-xs tracking-[0.3em] text-white uppercase px-6 py-3 border border-white/40 backdrop-blur-sm">
                    View Project
                  </span>
                </div>
              </div>
            </TransitionLink>
          </div>

          {/* Content */}
          <div 
            ref={contentRef}
            className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}
          >
            {/* Project Number */}
            <span className="animate-in text-xs tracking-[0.3em] text-muted-foreground font-mono block mb-4">
              {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            
            {/* Title */}
            <h3 className="animate-in text-3xl md:text-4xl lg:text-5xl font-extralight text-foreground tracking-tight leading-tight">
              {project.title}
            </h3>
            
            {/* Divider */}
            <div className={`animate-in w-16 h-px bg-muted-foreground/30 my-6 ${index % 2 === 1 ? 'lg:ml-auto' : ''}`} />
            
            {/* Details */}
            <div className={`animate-in flex gap-8 text-sm text-muted-foreground ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
              <div>
                <span className="text-xs tracking-[0.2em] uppercase block mb-1">Location</span>
                <span className="font-light">{project.location}</span>
              </div>
              <div>
                <span className="text-xs tracking-[0.2em] uppercase block mb-1">Year</span>
                <span className="font-light">{project.year}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SnapGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useViewTransitions()

  useGSAP(() => {
    // Header entrance animation
    gsap.fromTo(
      headerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: containerRef })

  return (
    <section 
      id="obras"
      ref={containerRef}
      className="relative bg-background py-24 md:py-32"
    >
      {/* Section Header */}
      <div 
        ref={headerRef}
        className="container mx-auto px-6 md:px-12 mb-16 md:mb-24"
      >
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-3">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight">
              Selected Works
            </h2>
          </div>
          <span className="hidden md:block text-xs tracking-[0.2em] text-muted-foreground font-mono">
            {String(projects.length).padStart(2, '0')} Projects
          </span>
        </div>
        <div className="w-full h-px bg-muted-foreground/20 mt-8" />
      </div>

      {/* Vertical Gallery */}
      <div className="space-y-16 md:space-y-24 lg:space-y-12">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
