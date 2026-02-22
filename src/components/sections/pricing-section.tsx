import Link from "next/link"

import { CheckoutButton } from "@/components/checkout-button"
import { cn } from "@/lib/utils"

type PricingItem = {
  name: string
  href: string
  price: string
  period: string
  features: string[]
  description: string
  buttonText: string
  buttonColor: string
  isPopular: boolean
  cta: "link" | "checkout"
}

const pricingItems: PricingItem[] = [
  {
    name: "Free",
    href: "/signup",
    price: "₹0",
    period: "month",
    features: ["Custom domain", "SEO-optimizations", "Auto-generated API docs", "Built-in components library"],
    description: "Perfect for individual users",
    buttonText: "Start Free",
    buttonColor: "bg-white text-primary",
    isPopular: false,
    cta: "link",
  },
  {
    name: "Startup",
    href: "#",
    price: "₹3000",
    period: "one-time",
    features: [
      "Everything in Free +",
      "Auth + protected routes",
      "Razorpay checkout integration",
      "Prisma database models",
      "Waitlist and email automation",
      "Admin analytics dashboard",
    ],
    description: "Ideal for professionals and small teams",
    buttonText: "Upgrade to Pro",
    buttonColor: "bg-blue-600 text-white hover:bg-blue-500",
    isPopular: true,
    cta: "checkout",
  },
  {
    name: "Enterprise",
    href: "mailto:hello@shipquick.dev",
    price: "₹12000",
    period: "month",
    features: [
      "Everything in Startup +",
      "Dedicated success manager",
      "Priority onboarding",
      "Architecture consultation",
      "Advanced integrations",
    ],
    description: "Best for large teams and enterprise-level organizations",
    buttonText: "Contact Sales",
    buttonColor: "bg-primary text-primary-foreground",
    isPopular: false,
    cta: "link",
  },
]

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative mt-16 flex w-full scroll-mt-28 flex-col items-center justify-center gap-10 pb-10"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
        <h2 className="text-balance text-3xl font-medium tracking-tighter text-primary md:text-4xl">
          Pricing for teams of any size
        </h2>
        <p className="text-balance font-medium text-muted-foreground">
          Start free, then scale ShipQuick as your workflows and team grow.
        </p>
      </div>

      <div className="relative h-full w-full">
        <div className="mx-auto grid w-full max-w-6xl gap-4 min-[650px]:grid-cols-2 min-[900px]:grid-cols-3">
          {pricingItems.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative grid h-fit grid-rows-[180px_auto_1fr] rounded-xl min-[650px]:h-full min-[900px]:h-fit",
                tier.isPopular
                  ? "bg-white md:shadow-[0px_61px_24px_-10px_rgba(0,0,0,0.01),0px_34px_20px_-8px_rgba(0,0,0,0.05),0px_15px_15px_-6px_rgba(0,0,0,0.09),0px_4px_8px_-2px_rgba(0,0,0,0.10),0px_0px_0px_1px_rgba(0,0,0,0.08)]"
                  : "border border-border bg-[#F3F4F6]"
              )}
            >
              <div className="flex flex-col gap-4 p-4">
                <p className="text-sm">
                  {tier.name}
                  {tier.isPopular ? (
                    <span className="ml-2 inline-flex h-6 w-fit items-center justify-center rounded-full bg-blue-600 px-2 text-sm text-white shadow-[0px_6px_6px_-3px_rgba(0,0,0,0.08),0px_3px_3px_-1.5px_rgba(0,0,0,0.08),0px_1px_1px_-0.5px_rgba(0,0,0,0.08),0px_0px_0px_1px_rgba(255,255,255,0.12)_inset,0px_1px_0px_0px_rgba(255,255,255,0.12)_inset]">
                      Popular
                    </span>
                  ) : null}
                </p>
                <div className="mt-2 flex items-baseline">
                  <span className="text-4xl font-semibold">{tier.price}</span>
                  <span className="ml-2">/{tier.period}</span>
                </div>
                <p className="mt-2 text-sm">{tier.description}</p>
              </div>

              <div className="flex flex-col gap-2 p-4">
                {tier.cta === "checkout" ? (
                  <CheckoutButton
                    buttonLabel={tier.buttonText}
                    buttonClassName={cn(
                      "h-10 w-full rounded-full px-4 text-sm font-normal tracking-wide transition-all ease-out active:scale-95",
                      "shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)]",
                      tier.buttonColor
                    )}
                  />
                ) : (
                  <Link
                    href={tier.href}
                    className={cn(
                      "flex h-10 w-full items-center justify-center rounded-full px-4 text-sm font-normal tracking-wide transition-all ease-out active:scale-95",
                      tier.isPopular
                        ? "shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)]"
                        : "shadow-[0px_1px_2px_0px_rgba(255,255,255,0.16)_inset,0px_3px_3px_-1.5px_rgba(16,24,40,0.24),0px_1px_1px_-0.5px_rgba(16,24,40,0.20)]",
                      tier.buttonColor
                    )}
                  >
                    {tier.buttonText}
                  </Link>
                )}
              </div>

              <hr className="border-border" />
              <div className="p-4">
                {tier.name !== "Free" ? (
                  <p className="mb-4 text-sm">Everything in {tier.name === "Startup" ? "Free" : "Startup"} +</p>
                ) : null}
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex size-5 items-center justify-center rounded-full border border-primary/20",
                          tier.isPopular && "border-border bg-muted-foreground/40"
                        )}
                      >
                        <div className="flex size-3 items-center justify-center">
                          <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M1.5 3.48828L3.375 5.36328L6.5 0.988281"
                              stroke="#101828"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
