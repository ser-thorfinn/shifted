import { NextRequest, NextResponse } from "next/server";

const VALID_PASSWORD = process.env.SITE_PASSWORD || "sideshift2026";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  if (password === VALID_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("shift-auth", VALID_PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return response;
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
