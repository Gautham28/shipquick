import { Sparkles, Upload, Zap } from "lucide-react"

import { Card } from "@/components/ui/card"

const steps = [
  {
    id: 1,
    title: "Upload Your Data",
    content:
      "Connect your product context, metrics, and docs. ShipQuick gives you a structured starting point for faster execution.",
    icon: Upload,
  },
  {
    id: 2,
    title: "Configure and Launch",
    content:
      "Enable auth, payments, and route protection, then deploy with a clean architecture that is ready for iteration.",
    icon: Zap,
  },
  {
    id: 3,
    title: "Get Actionable Insights",
    content:
      "Track users, subscriptions, and growth loops so your team can make product decisions with confidence.",
    icon: Sparkles,
  },
]

export function HowItWorksSection() {
  return (
    <section id="documentation" className="mt-16 scroll-mt-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-500">How It Works</p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
          Just 3 steps to get started
        </h2>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-start">
        <div className="relative space-y-9 pl-6">
          <div className="absolute bottom-8 left-0 top-7 w-px bg-slate-200" />

          {steps.map(({ id, title, content, icon: Icon }) => (
            <div key={id} className="relative flex gap-5">
              <div className="relative z-10 mt-1 flex size-14 shrink-0 items-center justify-center rounded-full bg-red-100">
                <Icon className="size-6 text-red-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-semibold tracking-tight text-slate-900">
                  {id}. {title}
                </h3>
                <p className="text-xl leading-relaxed text-slate-600">{content}</p>
              </div>
            </div>
          ))}
        </div>

        <Card className="overflow-hidden border-slate-200/80 bg-white/90 p-0 shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-amber-400" />
              <span className="size-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-medium text-slate-500">ShipQuick Dashboard</span>
            </div>
          </div>

          <div className="grid min-h-[420px] grid-cols-[190px_1fr]">
            <div className="border-r border-slate-100 bg-slate-50/80 p-4">
              <div className="space-y-2">
                {["Inbox", "Users", "Billing", "Waitlist", "Analytics"].map((item) => (
                  <div key={item} className="rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-600">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 p-4">
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="rounded-lg border border-slate-100 bg-white p-3">
                  <div className="h-3 w-28 rounded bg-slate-200" />
                  <div className="mt-2 h-2.5 w-full rounded bg-slate-100" />
                  <div className="mt-1.5 h-2.5 w-4/5 rounded bg-slate-100" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
