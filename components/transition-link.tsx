'use client'

import { useEffect, useCallback } from 'react'
import gsap from 'gsap'

interface TransitionLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

/**
 * Custom link component with cinematic page transitions
 * Note: View Transitions API is experimental in Next.js 15 and has limited browser support.
 * This component uses a combination of native View Transitions (where supported) and 
 * GSAP fallback for a consistent experience across all browsers.
 */
export function TransitionLink({ 
  href, 
  children, 
  className,
  onMouseEnter,
  onMouseLeave 
}: TransitionLinkProps) {
  const handleClick = useCallback(async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    const hasViewTransition = typeof document !== 'undefined' && 'startViewTransition' in document
    if (hasViewTransition) {
      // Use native View Transitions API
      (document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(() => {
        window.location.href = href
      })
    } else {
      // Fallback: GSAP exit animation
      const main = typeof document !== 'undefined' ? document.querySelector('main') : null
      if (main) {
        await gsap.to(main, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in',
        })
      }
      window.location.href = href
    }
  }, [href])

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </a>
  )
}

// Hook to set up View Transitions CSS
export function useViewTransitions() {
  useEffect(() => {
    // Add View Transition styles if not already present
    if (typeof document !== 'undefined') {
      const styleId = 'view-transition-styles'
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style')
        style.id = styleId
        style.textContent = `
          @view-transition {
            navigation: auto;
          }
          
          ::view-transition-old(root),
          ::view-transition-new(root) {
            animation-duration: 0.4s;
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          ::view-transition-old(root) {
            animation-name: slide-out;
          }
          
          ::view-transition-new(root) {
            animation-name: slide-in;
          }
          
          @keyframes slide-out {
            to {
              opacity: 0;
              transform: translateY(-10px);
            }
          }
          
          @keyframes slide-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
          }
        `
        document.head.appendChild(style)
      }
    }
  }, [])
}
