import { Rocket, ShieldCheck, Sparkles, Zap } from "lucide-react"

import { FaqSection } from "@/components/sections/faq-section"
import { HeroSection } from "@/components/sections/hero-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { MarketingNavbar } from "@/components/sections/marketing-navbar"
import { PricingSection } from "@/components/sections/pricing-section"
import { ProblemSection } from "@/components/sections/problem-section"
import { WaitlistForm } from "@/components/waitlist-form"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Rocket,
    title: "Launch Faster",
    description: "Production-ready auth, billing, and route protection without weeks of setup.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Default",
    description: "Supabase SSR sessions, server actions, and verified Razorpay webhooks out of the box.",
  },
  {
    icon: Sparkles,
    title: "Built for SaaS",
    description: "Prisma models, Pro gating, and dashboard workflows designed for subscription apps.",
  },
  {
    icon: Zap,
    title: "Scale-Ready Stack",
    description: "Next.js 15 App Router architecture that can grow from MVP to real product.",
  },
]

function WaitlistOnlyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-cyan-50 to-white px-6 py-20">
      <section className="mx-auto max-w-3xl rounded-3xl border border-cyan-200/60 bg-white/90 p-8 shadow-xl backdrop-blur sm:p-12">
        <Badge variant="success">Pre-launch</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          ShipQuick is in early access
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Join the waitlist and get first access to the full SaaS starter kit with auth, billing, and admin tools.
        </p>
        <div className="mt-8">
          <WaitlistForm />
        </div>
      </section>
    </main>
  )
}

function FullLandingPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#c4f1ff_0%,_#f8fafc_45%,_#ffffff_80%)] px-6 py-6 sm:py-8">
      <MarketingNavbar />

      <section className="mx-auto mt-2 max-w-6xl">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <PricingSection />
        <FaqSection />

        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-slate-200/80 bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Icon className="size-5" />
                  {title}
                </CardTitle>
                <CardDescription className="text-base text-slate-600">{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

      </section>
    </main>
  )
}

export default function HomePage() {
  const waitlistMode = process.env.NEXT_PUBLIC_WAITLIST_MODE === "true"
  return waitlistMode ? <WaitlistOnlyPage /> : <FullLandingPage />
}
