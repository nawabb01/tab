import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const auth = cookies().get("auth")
  return NextResponse.json({ authenticated: auth?.value === "true" })
}
