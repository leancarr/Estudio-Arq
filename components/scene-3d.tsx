'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, useProgress, Html } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
// @ts-ignore
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
        {progress.toFixed(0)}%
      </div>
    </Html>
  )
}

// Plaster-textured abstract architectural model
function PlasterModel({ scrollProgress }: { scrollProgress: { value: number } }) {
  const meshRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  // Adjust base scale dynamically based on viewport width
  const isMobile = viewport.width < 5

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      // Automatic continuous rotation + scroll rotation
      meshRef.current.rotation.y = time * 0.15 + scrollProgress.value * Math.PI * 0.5
      meshRef.current.rotation.x = Math.sin(time * 0.08 + scrollProgress.value * Math.PI) * 0.1
      
      // Scale effect combining mobile responsiveness and scroll progress
      const baseScale = isMobile ? 0.65 : 1
      const scale = baseScale + scrollProgress.value * 0.15
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <group 
        ref={meshRef}
        position={[0, isMobile ? -0.6 : -0.2, 0]}
      >
        {/* Main architectural form - abstract building */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 2.5, 1]} />
          <meshStandardMaterial 
            color="#4d4d4d"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
        
        {/* Secondary block */}
        <mesh position={[0.9, -0.3, 0.3]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.8, 0.8]} />
          <meshStandardMaterial 
            color="#5a5a5a"
            roughness={0.88}
            metalness={0.1}
          />
        </mesh>
        
        {/* Cut-out / void detail */}
        <mesh position={[-0.2, 0.6, 0.51]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.6, 0.1]} />
          <meshStandardMaterial 
            color="#333333"
            roughness={0.85}
            metalness={0.1}
          />
        </mesh>
        
        {/* Base platform */}
        <mesh position={[0.3, -1.5, 0]} receiveShadow>
          <boxGeometry args={[3, 0.15, 2]} />
          <meshStandardMaterial 
            color="#666666"
            roughness={0.92}
            metalness={0.1}
          />
        </mesh>
        
        {/* Small detail block */}
        <mesh position={[-0.6, -0.8, 0.6]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.8, 0.3]} />
          <meshStandardMaterial 
            color="#505050"
            roughness={0.88}
            metalness={0.1}
          />
        </mesh>
      </group>
    </Float>
  )
}

function Scene({ scrollProgress }: { scrollProgress: { value: number } }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight 
        position={[-3, 4, -2]} 
        intensity={0.3}
      />
      <PlasterModel scrollProgress={scrollProgress} />
      <Environment preset="studio" />
    </>
  )
}

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef({ value: 0 })

  useGSAP(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          scrollProgressRef.current.value = self.progress
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, { scope: containerRef })

  return (
    <section 
      id="modelo-3d"
      ref={containerRef}
      className="relative h-[100vh] lg:h-[120vh] w-full bg-secondary flex items-start lg:items-center justify-start px-6 md:px-12 py-24 lg:py-0"
    >
      {/* Text overlay */}
      <div className="z-10 max-w-[1800px] w-full pointer-events-none">
        <div className="max-w-md">
          <span className="block text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-foreground leading-tight text-balance">
            From concept to matter
          </h2>
          <p className="mt-4 text-muted-foreground text-sm font-light leading-relaxed">
            Every project is born as a plaster maquette, where we test light, 
            proportions, and voids before bringing the concrete to life.
          </p>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 lg:left-[25%]">
        <Canvas
          shadows
          camera={{ position: [4, 2, 5], fov: 35 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={<Loader />}>
            <Scene scrollProgress={scrollProgressRef.current} />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlays for blending */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-secondary to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
