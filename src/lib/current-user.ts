import { prisma } from "@/lib/prisma"
import { createClient } from "@/utils/supabase/server"

function metadataString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null
}

export async function getCurrentUserRecord() {
  const supabase = await createClient()
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (!authUser || !authUser.email) {
    return null
  }

  const metadataName = metadataString(authUser.user_metadata?.name)
  const metadataAvatarUrl = metadataString(authUser.user_metadata?.avatar_url)

  const user = await prisma.user.upsert({
    where: { email: authUser.email },
    update: {
      name: metadataName ?? undefined,
      avatarUrl: metadataAvatarUrl ?? undefined,
    },
    create: {
      email: authUser.email,
      name: metadataName,
      avatarUrl: metadataAvatarUrl,
    },
  })

  return { authUser, user }
}
