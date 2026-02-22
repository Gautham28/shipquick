import Link from "next/link"
import { LayoutGrid } from "lucide-react"

export function CtaSection() {
  return (
    <section className="mt-16 overflow-hidden rounded-3xl bg-[#f3dfe2] px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">Ready to get started?</p>
        <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-7xl">
          Start your free trial today.
        </h2>

        <Link
          href="/signup"
          className="mt-10 inline-flex h-14 items-center gap-2 rounded-xl bg-red-500 px-7 text-3xl font-semibold text-white transition hover:bg-red-600"
        >
          <LayoutGrid className="size-5" />
          Get started for free
        </Link>
      </div>
    </section>
  )
}
