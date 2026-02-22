import crypto from "node:crypto"

import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

type JsonObject = Record<string, unknown>

function toObject(value: unknown): JsonObject {
  if (value && typeof value === "object") {
    return value as JsonObject
  }
  return {}
}

function toStringValue(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null
}

function signaturesMatch(signature: string, expectedSignature: string): boolean {
  const signatureBuffer = Buffer.from(signature)
  const expectedSignatureBuffer = Buffer.from(expectedSignature)

  if (signatureBuffer.length !== expectedSignatureBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer)
}

export async function POST(request: Request) {
  try {
    const signature = request.headers.get("x-razorpay-signature")
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET

    if (!signature) {
      return NextResponse.json({ error: "Missing x-razorpay-signature header" }, { status: 400 })
    }

    if (!webhookSecret) {
      return NextResponse.json({ error: "Missing RAZORPAY_WEBHOOK_SECRET" }, { status: 500 })
    }

    const rawBody = await request.text()
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex")

    if (!signaturesMatch(signature, expectedSignature)) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 })
    }

    const body = toObject(JSON.parse(rawBody))
    const event = toStringValue(body.event)

    if (event !== "payment.captured" && event !== "order.paid") {
      return NextResponse.json({ received: true, ignoredEvent: event }, { status: 200 })
    }

    const payload = toObject(body.payload)
    const payment = toObject(payload.payment)
    const order = toObject(payload.order)
    const paymentEntity = toObject(payment.entity)
    const orderEntity = toObject(order.entity)

    const paymentNotes = toObject(paymentEntity.notes)
    const orderNotes = toObject(orderEntity.notes)

    const razorpayPaymentId = toStringValue(paymentEntity.id)
    const razorpayOrderId =
      toStringValue(paymentEntity.order_id) ?? toStringValue(orderEntity.id)
    const status = toStringValue(paymentEntity.status) ?? "captured"

    const userId = toStringValue(paymentNotes.userId) ?? toStringValue(orderNotes.userId)
    const userEmail =
      toStringValue(paymentNotes.userEmail) ??
      toStringValue(orderNotes.userEmail) ??
      toStringValue(paymentEntity.email)

    if (!razorpayPaymentId || !razorpayOrderId) {
      return NextResponse.json({ error: "Missing payment/order id in webhook payload" }, { status: 400 })
    }

    let user = null

    if (userId) {
      user = await prisma.user.findUnique({
        where: { id: userId },
      })
    }

    if (!user && userEmail) {
      user = await prisma.user.findUnique({
        where: { email: userEmail },
      })
    }

    if (!user && userEmail) {
      user = await prisma.user.create({
        data: {
          email: userEmail,
          isPro: true,
        },
      })
    }

    if (!user) {
      return NextResponse.json({ error: "No matching user found for webhook" }, { status: 404 })
    }

    const existingSubscription = await prisma.subscription.findFirst({
      where: { razorpayPaymentId },
    })

    if (!existingSubscription) {
      await prisma.$transaction([
        prisma.user.update({
          where: { id: user.id },
          data: { isPro: true },
        }),
        prisma.subscription.create({
          data: {
            userId: user.id,
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature: signature,
            status,
          },
        }),
      ])
    } else if (!user.isPro) {
      await prisma.user.update({
        where: { id: user.id },
        data: { isPro: true },
      })
    }

    return NextResponse.json(
      {
        received: true,
        userId: user.id,
        razorpayOrderId,
        razorpayPaymentId,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Razorpay webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
