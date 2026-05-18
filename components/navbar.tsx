'use client'

import { useRef, useEffect, useState } from 'react'

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
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
            className={`${isScrolled ? 'text-foreground/60 hover:text-foreground' : 'text-primary-foreground/80 hover:text-primary-foreground'} font-light tracking-[0.3em] text-sm uppercase transition-colors`}
          >
            LAMBDA
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-12">
            <NavLink href="#obras" isScrolled={isScrolled}>Obras</NavLink>
            <NavLink href="#estudio" isScrolled={isScrolled}>Estudio</NavLink>
            <NavLink href="#contacto" isScrolled={isScrolled}>Contacto</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden relative z-[60]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`text-xs tracking-[0.2em] uppercase transition-colors ${
              isMenuOpen ? 'text-foreground' : (isScrolled ? 'text-foreground/50' : 'text-primary-foreground/60')
            }`}>
              {isMenuOpen ? 'Cerrar' : 'Menú'}
            </span>
          </button>
        </div>
      </div>

      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-background/98 backdrop-blur-md z-[40] transition-all duration-500 md:hidden flex flex-col items-center justify-center gap-10 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <MobileNavLink href="#obras" onClick={() => setIsMenuOpen(false)}>Obras</MobileNavLink>
        <MobileNavLink href="#estudio" onClick={() => setIsMenuOpen(false)}>Estudio</MobileNavLink>
        <MobileNavLink href="#contacto" onClick={() => setIsMenuOpen(false)}>Contacto</MobileNavLink>
      </div>
    </>
  )
}

function NavLink({ href, children, isScrolled }: { href: string; children: React.ReactNode; isScrolled: boolean }) {
  return (
    <a
      href={href}
      className={`${isScrolled ? 'text-foreground/40 hover:text-foreground' : 'text-primary-foreground/60 hover:text-primary-foreground'} text-xs tracking-[0.2em] uppercase transition-colors duration-300 relative group`}
    >
      {children}
      <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-foreground' : 'bg-primary-foreground'}`} />
    </a>
  )
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-foreground text-3xl font-light tracking-[0.2em] uppercase hover:text-foreground/50 transition-colors duration-300"
    >
      {children}
    </a>
  )
}
