import { NextResponse } from "next/server"

import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next") ?? "/dashboard"

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  const redirectPath = next.startsWith("/") ? next : "/dashboard"
  const origin = requestUrl.origin
  return NextResponse.redirect(`${origin}${redirectPath}`)
}
