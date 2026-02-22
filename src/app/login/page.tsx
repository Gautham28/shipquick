"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { type FormEvent, useMemo, useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { createClient } from "@/utils/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const redirectedFrom = useMemo(
    () => searchParams.get("redirectedFrom") ?? "/dashboard",
    [searchParams]
  )

  async function handleEmailSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsEmailLoading(true)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setIsEmailLoading(false)

    if (signInError) {
      setError(signInError.message)
      return
    }

    router.replace(redirectedFrom)
    router.refresh()
  }

  async function handleGoogleSignIn() {
    setError(null)
    setIsGoogleLoading(true)

    const supabase = createClient()
    const callback = `${window.location.origin}/auth/callback?next=${encodeURIComponent(
      redirectedFrom
    )}`
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callback,
      },
    })

    if (oauthError) {
      setError(oauthError.message)
      setIsGoogleLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-muted/30 px-6 py-10">
      <section className="mx-auto flex max-w-md flex-col justify-center pt-10 sm:pt-16">
        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Sign in to access your ShipQuick dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleEmailSignIn}>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                />
              </div>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <Button className="w-full" type="submit" disabled={isEmailLoading || isGoogleLoading}>
                {isEmailLoading ? <Loader2 className="animate-spin" /> : null}
                Sign in with Email
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button
              className="w-full"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={isEmailLoading || isGoogleLoading}
            >
              {isGoogleLoading ? <Loader2 className="animate-spin" /> : null}
              Sign in with Google
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              New to ShipQuick?{" "}
              <Link className="font-medium text-foreground hover:underline" href="/signup">
                Create an account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}
