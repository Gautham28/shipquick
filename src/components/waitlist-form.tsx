"use client"

import { useActionState } from "react"

import { joinWaitlist, type WaitlistActionState } from "@/app/actions/waitlist"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const initialState: WaitlistActionState = {
  status: "idle",
  message: "",
}

export function WaitlistForm() {
  const [state, formAction, isPending] = useActionState(joinWaitlist, initialState)

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          name="email"
          placeholder="you@company.com"
          required
          className="h-11 bg-white/90"
          aria-label="Email"
        />
        <Button type="submit" disabled={isPending} className="h-11 px-6">
          {isPending ? "Joining..." : "Join Waitlist"}
        </Button>
      </div>

      {state.message ? (
        <p className={`text-sm ${state.status === "error" ? "text-destructive" : "text-emerald-700"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  )
}
