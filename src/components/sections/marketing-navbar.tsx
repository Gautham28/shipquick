"use client"

import Link from "next/link"
import { ShipWheel } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Documentation", href: "#documentation" },
  { label: "Pricing", href: "#pricing" },
]

export function MarketingNavbar() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 12)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky z-50 flex justify-center px-4 transition-all duration-300",
        hasScrolled ? "top-3" : "top-5"
      )}
    >
      <div
        className={cn(
          "w-full rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-lg transition-all duration-300",
          hasScrolled ? "max-w-4xl px-4 py-2 shadow-lg" : "max-w-6xl px-6 py-3 shadow-sm"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-blue-600 text-white">
              <ShipWheel className="size-4" />
            </span>
            <span className="text-xl font-semibold tracking-tight text-slate-900">ShipQuick</span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button
            asChild
            className={cn(
              "rounded-full bg-blue-600 text-white hover:bg-blue-700",
              hasScrolled ? "h-9 px-4 text-sm" : "h-10 px-5 text-sm"
            )}
          >
            <Link href="/signup">Get ShipQuick</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
