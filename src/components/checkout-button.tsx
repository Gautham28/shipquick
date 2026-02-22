"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

type RazorpaySuccessResponse = {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

type RazorpayFailureResponse = {
  error?: {
    code?: string
    description?: string
    source?: string
    step?: string
    reason?: string
    metadata?: {
      payment_id?: string
      order_id?: string
    }
  }
}

type RazorpayCheckoutOptions = {
  key: string
  amount: number
  currency: string
  name: string
  description?: string
  order_id: string
  prefill?: {
    name?: string
    email?: string
  }
  notes?: Record<string, string>
  theme?: {
    color?: string
  }
  handler: (response: RazorpaySuccessResponse) => void
  modal?: {
    ondismiss?: () => void
  }
}

type RazorpayInstance = {
  open: () => void
  on: (event: "payment.failed", handler: (response: RazorpayFailureResponse) => void) => void
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayInstance
  }
}

type CreateOrderResponse = {
  orderId: string
  amount: number
  currency: string
  keyId: string
}

export function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  async function loadCheckoutScript() {
    if (window.Razorpay) return true

    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  async function handleCheckout() {
    setIsLoading(true)
    setStatusMessage(null)

    try {
      const createOrderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
      })

      if (!createOrderResponse.ok) {
        const errorJson = (await createOrderResponse.json().catch(() => null)) as
          | { error?: string; details?: string }
          | null
        const fallback = `Unable to create Razorpay order (HTTP ${createOrderResponse.status})`
        throw new Error(errorJson?.details ?? errorJson?.error ?? fallback)
      }

      const order = (await createOrderResponse.json()) as CreateOrderResponse
      const scriptLoaded = await loadCheckoutScript()

      if (!scriptLoaded || !window.Razorpay) {
        throw new Error("Failed to load Razorpay checkout script")
      }

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "ShipQuick",
        description: "ShipQuick Pro Plan (INR 3000)",
        order_id: order.orderId,
        theme: {
          color: "#111827",
        },
        handler: (response) => {
          setStatusMessage(
            `Payment successful. Payment ID: ${response.razorpay_payment_id}. Pro access will be activated shortly.`
          )
          setIsLoading(false)
        },
        modal: {
          ondismiss: () => {
            setStatusMessage("Checkout cancelled.")
            setIsLoading(false)
          },
        },
      })

      razorpay.on("payment.failed", (response) => {
        const message = response.error?.description ?? "Payment failed. Please try again."
        setStatusMessage(message)
        setIsLoading(false)
      })

      razorpay.open()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Checkout failed."
      setStatusMessage(message)
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button onClick={handleCheckout} disabled={isLoading}>
        {isLoading ? "Opening checkout..." : "Upgrade to Pro - INR 3000"}
      </Button>
      {statusMessage ? <p className="text-sm text-muted-foreground">{statusMessage}</p> : null}
    </div>
  )
}
