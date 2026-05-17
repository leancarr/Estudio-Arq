'use client'

import { useRef, useEffect, useState } from 'react'

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      } ${className}`}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="/" 
            className="text-foreground font-light tracking-[0.3em] text-sm uppercase"
          >
            Estudio 87
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-12">
            <NavLink href="#obras">Obras</NavLink>
            <NavLink href="#estudio">Estudio</NavLink>
            <NavLink href="#contacto">Contacto</NavLink>
          </div>

          {/* Mobile Menu Indicator */}
          <div className="md:hidden">
            <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Menú
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-muted-foreground hover:text-foreground text-xs tracking-[0.2em] uppercase transition-colors duration-300 relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
    </a>
  )
}
