'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      // Initial page load animation
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
      return
    }

    // Page transition animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    )
  }, [pathname])

  return (
    <div ref={containerRef} className="min-h-screen">
      {children}
    </div>
  )
}
