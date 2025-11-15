import { db } from "@/server/db";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ token: string }> }
) {
  const params = await props.params;
  const token = params.token;
  const url = request.nextUrl.searchParams.get("url");

  // Redirect destination (default to homepage if URL missing/invalid)
  let redirectUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (url) {
    try {
      // Validate URL
      const parsedUrl = new URL(url);
      redirectUrl = parsedUrl.toString();
    } catch {
      console.error("Invalid URL in click tracking:", url);
    }
  }

  try {
    // Look up the email by tracking token
    const email = await db.email.findUnique({
      where: { trackingToken: token },
      select: {
        id: true,
        campaignId: true,
        subscriberId: true,
      },
    });

    if (email && url) {
      // Extract user agent and IP address
      const userAgent = request.headers.get("user-agent") ?? undefined;
      const ipAddress =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        request.headers.get("x-real-ip") ??
        undefined;

      // Record the click event (don't await - fire and forget)
      db.emailClick
        .create({
          data: {
            emailId: email.id,
            url,
            userAgent,
            ipAddress,
          },
        })
        .catch((error) => {
          console.error("Failed to record email click:", error);
        });
    }
  } catch (error) {
    console.error("Error tracking email click:", error);
  }

  // Always redirect to the destination URL, even if tracking fails
  return NextResponse.redirect(redirectUrl);
}
