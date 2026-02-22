import Link from "next/link"
import { Layers } from "lucide-react"

const hero = {
  badge: "Introducing ShipQuick boilerplate",
  title: "Ship your SaaS product faster with ShipQuick",
  description:
    "Authentication, billing, protected routes, admin analytics, and waitlist growth loops in one clean starter.",
  cta: {
    text: "Get ShipQuick",
    href: "/signup",
  },
}

export function HeroSection() {
  return (
    <section id="about" className="relative w-full scroll-mt-28">
      <div className="relative flex w-full flex-col items-center px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0 -z-10 h-[600px] w-full rounded-b-xl [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] md:h-[800px]" />
        </div>
        <div className="relative z-10 mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center gap-10 pt-20 sm:pt-24">
          <p className="flex h-8 items-center gap-2 rounded-full border border-border bg-accent px-3 text-sm">
            <Layers className="size-4 text-muted-foreground" />
            {hero.badge}
          </p>
          <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-balance text-center text-3xl font-medium tracking-tighter text-primary md:text-4xl lg:text-5xl xl:text-6xl">
              {hero.title}
            </h1>
            <p className="text-balance text-center text-base font-medium leading-relaxed tracking-tight text-muted-foreground md:text-lg">
              {hero.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href={hero.cta.href}
              className="flex h-10 min-w-40 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-medium tracking-wide text-white transition-all ease-out hover:bg-blue-500 active:scale-95"
            >
              {hero.cta.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
