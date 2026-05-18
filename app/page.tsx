'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Scene3D } from '@/components/scene-3d'
import { SnapGallery } from '@/components/snap-gallery'
import { Footer } from '@/components/footer'
import { Intro } from '@/components/intro'
import { Pitch } from '@/components/pitch'
import { WhatWeBelieve } from '@/components/what-we-believe'
import { ContactForm } from '@/components/contact-form'

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <main className="relative overflow-x-hidden">
      <Intro onComplete={() => setIntroComplete(true)} />
      <Navbar />
      <Hero />
      <Pitch />
      <Scene3D />
      <WhatWeBelieve />
      <SnapGallery />
      <ContactForm />
      <Footer />
    </main>
  )
}
