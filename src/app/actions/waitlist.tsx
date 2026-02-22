"use server"

import { Resend } from "resend"

import { WaitlistThankYouEmail } from "@/emails/waitlist-thank-you"
import { prisma } from "@/lib/prisma"

export type WaitlistActionState = {
  status: "idle" | "success" | "error"
  message: string
}

const INITIAL_STATE: WaitlistActionState = {
  status: "idle",
  message: "",
}

function normalizeEmail(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim().toLowerCase() : ""
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function joinWaitlist(
  previousState: WaitlistActionState = INITIAL_STATE,
  formData: FormData
): Promise<WaitlistActionState> {
  void previousState
  const email = normalizeEmail(formData.get("email"))

  if (!isValidEmail(email)) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
    }
  }

  try {
    await prisma.waitlistEmail.upsert({
      where: { email },
      update: {},
      create: { email },
    })

    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.WAITLIST_FROM_EMAIL ?? "ShipQuick <onboarding@resend.dev>"

    if (!resendApiKey) {
      return {
        status: "success",
        message: "You are on the waitlist. Email confirmations are not configured yet.",
      }
    }

    const resend = new Resend(resendApiKey)
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Thanks for joining the ShipQuick waitlist",
      react: <WaitlistThankYouEmail email={email} />,
    })

    if (error) {
      console.error("Resend waitlist email error:", error)
      return {
        status: "success",
        message: "You are on the waitlist. Confirmation email could not be sent right now.",
      }
    }

    return {
      status: "success",
      message: "You're on the waitlist. Check your inbox for confirmation.",
    }
  } catch (error) {
    console.error("Waitlist join action error:", error)
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    }
  }
}
