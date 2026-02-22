import Link from "next/link"
import { Rocket, ShieldCheck, Sparkles, Zap } from "lucide-react"

import { CheckoutButton } from "@/components/checkout-button"
import { WaitlistForm } from "@/components/waitlist-form"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#c4f1ff_0%,_#f8fafc_45%,_#ffffff_80%)] px-6 py-12">
      <section className="mx-auto max-w-6xl">
        <header className="rounded-3xl border border-slate-200/80 bg-white/85 p-8 shadow-sm backdrop-blur sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="secondary">Next.js 15 + Supabase + Prisma + Razorpay</Badge>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>

          <h1 className="mt-8 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Ship production SaaS products in days, not months.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            ShipQuick gives you authentication, subscription billing, gated dashboards, admin analytics, and waitlist
            growth loops in one clean codebase.
          </p>
        </header>

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

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card className="border-slate-200/80 bg-white/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Pre-launch Waitlist</CardTitle>
              <CardDescription className="text-base">
                Capture intent before launch. Every signup is saved in Prisma and receives an email confirmation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WaitlistForm />
            </CardContent>
          </Card>

          <Card className="border-slate-900 bg-slate-950 text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Pro Plan</CardTitle>
              <CardDescription className="text-slate-300">One-time early access offer</CardDescription>
              <p className="mt-2 text-4xl font-bold">
                INR 3000 <span className="text-base font-medium text-slate-300">lifetime</span>
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-slate-200">
                <li>SSR auth + protected routes</li>
                <li>Razorpay checkout + webhook handling</li>
                <li>Prisma schema for users and subscriptions</li>
                <li>Marketing waitlist + email automation</li>
              </ul>
              <CheckoutButton />
              <p className="text-xs text-slate-400">If not signed in, checkout will prompt login first.</p>
            </CardContent>
          </Card>
        </section>
      </section>
    </main>
  )
}

export default function HomePage() {
  const waitlistMode = process.env.NEXT_PUBLIC_WAITLIST_MODE === "true"
  return waitlistMode ? <WaitlistOnlyPage /> : <FullLandingPage />
}
