import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-8 px-6">
        <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Error 404
        </span>
        <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-foreground">
          Project not found
        </h1>
        <p className="text-muted-foreground font-light max-w-md mx-auto">
          The project you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block text-xs tracking-[0.2em] text-foreground uppercase px-8 py-4 border border-border hover:bg-foreground hover:text-primary-foreground transition-colors duration-300"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
