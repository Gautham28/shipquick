"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
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

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  async function handleEmailSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setIsEmailLoading(true)

    const supabase = createClient()
    const callback = `${window.location.origin}/auth/callback?next=/dashboard`

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: callback,
      },
    })

    setIsEmailLoading(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    if (data.session) {
      router.replace("/dashboard")
      router.refresh()
      return
    }

    setMessage("Signup successful. Check your email to confirm your account.")
  }

  async function handleGoogleSignIn() {
    setError(null)
    setMessage(null)
    setIsGoogleLoading(true)

    const supabase = createClient()
    const callback = `${window.location.origin}/auth/callback?next=/dashboard`
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
            <CardTitle>Create your account</CardTitle>
            <CardDescription>Start building and shipping with ShipQuick.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleEmailSignUp}>
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
                  autoComplete="new-password"
                  placeholder="Use at least 8 characters"
                  minLength={8}
                  required
                />
              </div>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
              <Button className="w-full" type="submit" disabled={isEmailLoading || isGoogleLoading}>
                {isEmailLoading ? <Loader2 className="animate-spin" /> : null}
                Sign up with Email
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
              Sign up with Google
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link className="font-medium text-foreground hover:underline" href="/login">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}
