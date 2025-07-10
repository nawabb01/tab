import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const body = await request.json()
  const { username, password } = body

  if (username === "admin" && password === "admin1234") {
    // In a real application, you'd want to use a more secure method of authentication
    // such as JWT tokens or sessions. This is a simplified example.
    cookies().set("auth", "true", { httpOnly: true, secure: true })
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }
}
