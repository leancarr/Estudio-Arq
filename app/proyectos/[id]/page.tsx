import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const projects = [
  {
    id: 'casa-monolito',
    title: 'Casa Monolito',
    year: '2024',
    location: 'Buenos Aires, Argentina',
    area: '450 m²',
    description: 'Una residencia que emerge del paisaje como una escultura de hormigón. La pureza de sus líneas dialoga con la naturaleza circundante, creando espacios de contemplación donde la luz es la protagonista.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1920&q=90',
    ],
  },
  {
    id: 'refugio-andino',
    title: 'Refugio Andino',
    year: '2023',
    location: 'Bariloche, Argentina',
    area: '280 m²',
    description: 'Enclavado en la cordillera, este refugio reinterpreta la arquitectura alpina tradicional con un lenguaje contemporáneo. Grandes ventanales enmarcan las montañas como cuadros vivientes.',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=90',
    ],
  },
  {
    id: 'torre-silencio',
    title: 'Torre del Silencio',
    year: '2023',
    location: 'Montevideo, Uruguay',
    area: '1200 m²',
    description: 'Un edificio de oficinas que desafía la tipología convencional. Sus fachadas de hormigón visto filtran la luz creando atmósferas cambiantes a lo largo del día.',
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=90',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90',
    ],
  },
  {
    id: 'galeria-luz',
    title: 'Galería de Luz',
    year: '2022',
    location: 'Santiago, Chile',
    area: '800 m²',
    description: 'Un espacio expositivo donde la arquitectura se subordina al arte. Muros blancos y techos de doble altura crean el lienzo perfecto para cualquier manifestación artística.',
    images: [
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1920&q=90',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=90',
    ],
  },
  {
    id: 'casa-horizonte',
    title: 'Casa Horizonte',
    year: '2022',
    location: 'Punta del Este, Uruguay',
    area: '520 m²',
    description: 'Una vivienda que se extiende horizontalmente hacia el océano. La arquitectura se disuelve en el paisaje, difuminando los límites entre interior y exterior.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=90',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90',
    ],
  },
]

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  
  if (!project) {
    return { title: 'Proyecto no encontrado' }
  }

  return {
    title: `${project.title} | Estudio 87`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  const projectIndex = projects.findIndex((p) => p.id === id)
  const nextProject = projects[(projectIndex + 1) % projects.length]
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length]

  return (
    <main className="min-h-screen bg-background">
      {/* Back Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground uppercase transition-colors duration-300 flex items-center gap-3"
            >
              <span className="w-8 h-px bg-current" />
              Volver
            </Link>
            <span className="text-xs tracking-[0.2em] text-muted-foreground font-mono">
              {String(projectIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <section className="relative h-[70vh] w-full pt-20">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </section>

      {/* Project Info */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-12 md:gap-24">
          {/* Title & Description */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                {project.year}
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground">
                {project.title}
              </h1>
            </div>
            <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                Ubicación
              </span>
              <p className="mt-2 text-foreground font-light">
                {project.location}
              </p>
            </div>
            <div>
              <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                Superficie
              </span>
              <p className="mt-2 text-foreground font-light">
                {project.area}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Images */}
      {project.images.slice(1).map((image, index) => (
        <section key={index} className="relative w-full px-6 md:px-12 mb-12">
          <div className="max-w-[1800px] mx-auto">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={image}
                alt={`${project.title} - Vista ${index + 2}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 90vw"
              />
            </div>
          </div>
        </section>
      ))}

      {/* Navigation to other projects */}
      <section className="border-t border-border">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid md:grid-cols-2">
            {/* Previous Project */}
            <Link 
              href={`/proyectos/${prevProject.id}`}
              className="group relative p-8 md:p-12 border-r border-border hover:bg-secondary/50 transition-colors duration-300"
            >
              <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Proyecto Anterior
              </span>
              <h3 className="mt-4 text-xl md:text-2xl font-extralight text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                {prevProject.title}
              </h3>
            </Link>

            {/* Next Project */}
            <Link 
              href={`/proyectos/${nextProject.id}`}
              className="group relative p-8 md:p-12 text-right hover:bg-secondary/50 transition-colors duration-300"
            >
              <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Siguiente Proyecto
              </span>
              <h3 className="mt-4 text-xl md:text-2xl font-extralight text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                {nextProject.title}
              </h3>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
