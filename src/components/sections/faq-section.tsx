import Link from "next/link"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is ShipQuick?",
    answer:
      "ShipQuick is a Next.js SaaS boilerplate with Supabase auth, Prisma models, Razorpay billing, protected routes, and launch-ready marketing pages.",
  },
  {
    question: "How can I get started with ShipQuick?",
    answer:
      "Sign up, configure your environment variables, connect Supabase and Razorpay, and run the app locally. You can then customize the UI and ship your own SaaS quickly.",
  },
  {
    question: "Does ShipQuick support real payments?",
    answer:
      "Yes. It includes Razorpay order creation and webhook handling. Start in test mode, then switch to live credentials when you are ready to accept real payments.",
  },
  {
    question: "Can I use Google sign-in and email/password auth?",
    answer:
      "Yes. The authentication flow is powered by Supabase and supports both email/password and Google OAuth once provider settings are configured.",
  },
  {
    question: "Can I extend this boilerplate for my own product?",
    answer:
      "Absolutely. The architecture is modular, so you can add your own pages, tables, APIs, and business logic without rewriting the core auth and billing setup.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="mt-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-500">FAQ</p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
          Frequently asked questions
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-4xl space-y-3">
        {faqs.map((faq, idx) => (
          <details
            key={faq.question}
            open={idx === 1}
            className="group rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-[0_1px_0_rgba(15,23,42,0.03)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-2xl font-medium text-slate-900 marker:content-none">
              <span>{faq.question}</span>
              <ChevronDown className="size-5 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <p className="mt-4 max-w-3xl text-xl leading-relaxed text-slate-600">{faq.answer}</p>
          </details>
        ))}
      </div>

      <p className="mt-10 text-center text-lg text-slate-700">
        Still have questions? Email us at{" "}
        <Link className="font-medium underline underline-offset-4" href="mailto:hello@shipquick.dev">
          hello@shipquick.dev
        </Link>
      </p>
    </section>
  )
}
