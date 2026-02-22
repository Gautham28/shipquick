import { NextResponse } from "next/server"

import { getRazorpayInstance } from "@/lib/razorpay"
import { createClient as createSupabaseServerClient } from "@/utils/supabase/server"

export const runtime = "nodejs"

const PLAN_AMOUNT_RUPEES = 3000
const PLAN_AMOUNT_PAISE = PLAN_AMOUNT_RUPEES * 100

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!authUser.email) {
      return NextResponse.json({ error: "Authenticated user has no email" }, { status: 400 })
    }

    const { razorpay, keyId } = getRazorpayInstance()

    const order = await razorpay.orders.create({
      amount: PLAN_AMOUNT_PAISE,
      currency: "INR",
      receipt: `sq_${Date.now()}`,
      notes: {
        userEmail: authUser.email,
        supabaseUserId: authUser.id,
      },
    })

    return NextResponse.json(
      {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Razorpay create-order error:", error)
    return NextResponse.json(
      {
        error: "Failed to create order",
        details: process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    )
  }
}
