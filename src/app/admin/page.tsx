import Link from "next/link"
import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUserRecord } from "@/lib/current-user"
import { prisma } from "@/lib/prisma"

export default async function AdminPage() {
  const currentUser = await getCurrentUserRecord()

  if (!currentUser) {
    redirect("/login")
  }

  const [totalUsers, totalProUsers, totalWaitlistEmails] = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.count({ where: { isPro: true } }),
    prisma.waitlistEmail.count(),
  ])

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold">Admin</h1>
        <Button asChild variant="outline">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Pro Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalProUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Waitlist Emails</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalWaitlistEmails}</p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
