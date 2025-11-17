import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { env } from "@/env";
import { auth } from "@/server/better-auth";

export async function POST() {
  try {
    // Get the session token from cookies
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("better-auth.session_token");

    if (sessionToken) {
      // Call Better Auth's sign-out API
      await auth.api.signOut({
        headers: {
          cookie: `better-auth.session_token=${sessionToken.value}`,
        },
      });
    }

    // Create response with redirect
    const response = NextResponse.redirect(
      new URL("/", env.NEXT_PUBLIC_BASE_URL),
    );

    // Clear all auth-related cookies
    response.cookies.delete("better-auth.session_token");
    response.cookies.delete("better-auth.csrf_token");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    // Even if there's an error, redirect to home
    return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_BASE_URL));
  }
}

// Support GET requests too for convenience
export async function GET() {
  return POST();
}
