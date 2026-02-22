import Link from "next/link"
import { ArrowUpRight, ShipWheel } from "lucide-react"

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Pricing", href: "#pricing" },
      { label: "Affiliation", href: "#" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Documentation", href: "#documentation", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQs", href: "#faq" },
      { label: "X (Twitter)", href: "https://x.com", external: true },
      { label: "Instagram", href: "https://instagram.com", external: true },
      { label: "LinkedIn", href: "https://linkedin.com", external: true },
      { label: "YouTube", href: "https://youtube.com", external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Vision", href: "#" },
      { label: "Contact", href: "mailto:hello@shipquick.dev", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
]

export function FooterSection() {
  return (
    <footer className="mt-16 border-t border-slate-200/80 pt-14">
      <div className="grid gap-12 lg:grid-cols-[1.5fr_3fr]">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-blue-600 text-white">
              <ShipWheel className="size-4" />
            </span>
            <span className="text-5xl font-semibold tracking-tight text-slate-900">ShipQuick</span>
          </Link>

          <p className="mt-6 max-w-md text-2xl leading-relaxed text-slate-600">
            Our Next.js boilerplate lets you skip setup and start shipping. Collect feedback and revenue while others
            are still building.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-3">
              <h3 className="text-2xl font-semibold text-slate-900">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer noopener" : undefined}
                      className="group inline-flex items-center gap-1 text-2xl text-slate-500 transition-colors hover:text-slate-800"
                    >
                      <span>{link.label}</span>
                      {link.external ? <ArrowUpRight className="size-4 opacity-70" /> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
