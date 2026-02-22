import { Brain, Shield, Zap } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const problems = [
  {
    title: "Unclear Product Direction",
    description:
      "Teams juggle conflicting priorities, making it hard to define what to build first and why it matters.",
    icon: Brain,
  },
  {
    title: "Slow Delivery Cycles",
    description:
      "Without focused execution, roadmap items drag across quarters and momentum drops across the organization.",
    icon: Zap,
  },
  {
    title: "Inconsistent User Experience",
    description:
      "Fragmented interfaces and technical debt create friction for users and increase maintenance cost for teams.",
    icon: Shield,
  },
]

export function ProblemSection() {
  return (
    <section className="mt-12">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-500">Problem</p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Shipping a high-quality product with a lean team is hard.
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {problems.map(({ title, description, icon: Icon }) => (
          <Card key={title} className="border-none bg-transparent shadow-none">
            <CardContent className="space-y-4 p-3 sm:p-6">
              <div className="flex size-14 items-center justify-center rounded-full bg-red-100/80">
                <Icon className="size-6 text-red-500" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h3>
              <p className="text-lg leading-relaxed text-slate-600">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
