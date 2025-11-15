import { db } from "@/server/db";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// 1x1 transparent GIF (base64 encoded)
const TRACKING_PIXEL = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ token: string }> }
) {
  const params = await props.params;
  const token = params.token;

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

    if (email) {
      // Extract user agent and IP address
      const userAgent = request.headers.get("user-agent") ?? undefined;
      const ipAddress =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        request.headers.get("x-real-ip") ??
        undefined;

      // Record the open event (don't await - fire and forget)
      db.emailOpen
        .create({
          data: {
            emailId: email.id,
            userAgent,
            ipAddress,
          },
        })
        .catch((error) => {
          console.error("Failed to record email open:", error);
        });
    }
  } catch (error) {
    console.error("Error tracking email open:", error);
  }

  // Always return the tracking pixel, even if tracking fails
  return new NextResponse(TRACKING_PIXEL, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
