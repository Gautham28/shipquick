import { CtaSection } from "@/components/sections/cta-section"
import { FaqSection } from "@/components/sections/faq-section"
import { FooterSection } from "@/components/sections/footer-section"
import { HeroSection } from "@/components/sections/hero-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { MarketingNavbar } from "@/components/sections/marketing-navbar"
import { PricingSection } from "@/components/sections/pricing-section"
import { ProblemSection } from "@/components/sections/problem-section"
import { WaitlistForm } from "@/components/waitlist-form"
import { Badge } from "@/components/ui/badge"

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
        <CtaSection />
        <FooterSection />
      </section>
    </main>
  )
}

export default function HomePage() {
  const waitlistMode = process.env.NEXT_PUBLIC_WAITLIST_MODE === "true"
  return waitlistMode ? <WaitlistOnlyPage /> : <FullLandingPage />
}
