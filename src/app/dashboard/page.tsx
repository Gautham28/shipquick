import Link from "next/link"
import { redirect } from "next/navigation"

import { Paywall } from "@/components/paywall"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUserRecord } from "@/lib/current-user"
import { createClient } from "@/utils/supabase/server"

export default async function DashboardPage() {
  const currentUser = await getCurrentUserRecord()

  if (!currentUser) {
    redirect("/login")
  }

  async function handleSignOut() {
    "use server"

    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/login")
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Signed in as {currentUser.user.name ?? currentUser.authUser.email}
      </p>

      <section className="mt-6">
        {currentUser.user.isPro ? (
          <Card>
            <CardHeader>
              <CardTitle>Welcome to the Pro Dashboard</CardTitle>
              <CardDescription>
                Your Pro subscription is active. You can now access premium features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Pro plan status: Active</li>
                <li>Payments are tracked via Razorpay webhook + Prisma</li>
                <li>You can manage account details from Settings</li>
              </ul>
            </CardContent>
          </Card>
        ) : (
          <Paywall />
        )}
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/settings">Go to Settings</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin">Go to Admin</Link>
        </Button>
        <form action={handleSignOut}>
          <Button type="submit" variant="secondary">
            Sign out
          </Button>
        </form>
      </div>
    </main>
  )
}
