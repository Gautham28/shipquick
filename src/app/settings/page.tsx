import Link from "next/link"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getCurrentUserRecord } from "@/lib/current-user"
import { prisma } from "@/lib/prisma"

export default async function SettingsPage() {
  const currentUser = await getCurrentUserRecord()

  if (!currentUser) {
    redirect("/login")
  }

  const latestSubscription = await prisma.subscription.findFirst({
    where: { userId: currentUser.user.id },
    orderBy: { createdAt: "desc" },
  })

  const isSubscriptionActive =
    currentUser.user.isPro && (latestSubscription?.status === "captured" || latestSubscription?.status === "paid")

  const subscriptionLabel = isSubscriptionActive ? "Active" : "Free"

  async function updateName(formData: FormData) {
    "use server"

    const currentUser = await getCurrentUserRecord()

    if (!currentUser) {
      redirect("/login")
    }

    const nameValue = formData.get("name")
    const nextName = typeof nameValue === "string" ? nameValue.trim() : ""

    await prisma.user.update({
      where: { id: currentUser.user.id },
      data: {
        name: nextName.length > 0 ? nextName : null,
      },
    })

    revalidatePath("/settings")
    revalidatePath("/dashboard")
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <Badge variant={isSubscriptionActive ? "success" : "secondary"}>{subscriptionLabel}</Badge>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your display name used across the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateName} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">
                Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                defaultValue={currentUser.user.name ?? ""}
                maxLength={80}
              />
            </div>
            <p className="text-sm text-muted-foreground">Email: {currentUser.user.email}</p>
            <Button type="submit">Save Name</Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button asChild variant="outline">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </main>
  )
}
