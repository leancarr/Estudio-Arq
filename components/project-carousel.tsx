'use client'

import { useState } from 'react'
import Image from 'next/image'

export function ProjectCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!images || images.length === 0) return null

  return (
    <section className="relative w-full px-6 md:px-12 mb-24">
      <div className="max-w-[1800px] mx-auto">
        <div className="relative aspect-[4/3] md:aspect-[16/7] w-full overflow-hidden group">
          {images.map((img, i) => (
            <div 
              key={i}
              className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${i === currentIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
            >
              <Image 
                src={img} 
                alt={`Vista ${i + 1}`} 
                fill 
                className="object-cover" 
                sizes="(max-width: 768px) 100vw, 90vw"
              />
            </div>
          ))}
          
          {/* Controles */}
          <button 
            onClick={prevSlide} 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-background/30 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-background/60"
          >
            <span className="sr-only">Anterior</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <button 
            onClick={nextSlide} 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-background/30 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-background/60"
          >
            <span className="sr-only">Siguiente</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          
          {/* Indicadores */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {images.map((_, i) => (
              <button 
                key={i} 
                onClick={() => goToSlide(i)}
                className={`h-px transition-all duration-500 ${i === currentIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/80 w-4'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
