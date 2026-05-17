'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Scene3D } from '@/components/scene-3d'
import { SnapGallery } from '@/components/snap-gallery'
import { Footer } from '@/components/footer'
import { Intro } from '@/components/intro'

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <main className="relative">
      <Intro onComplete={() => setIntroComplete(true)} />
      <Navbar />
      <Hero />
      <Scene3D />
      <SnapGallery />
      <Footer />
    </main>
  )
}
