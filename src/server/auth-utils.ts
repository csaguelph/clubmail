import { getSession } from "@/server/better-auth/server";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

/**
 * Get the current session and ensure the user is authenticated.
 * Redirects to home if not authenticated.
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  return session;
}

/**
 * Get the current user with their role.
 * Redirects to home if not authenticated.
 */
export async function getCurrentUser() {
  const session = await requireAuth();

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  if (!user) {
    redirect("/");
  }

  return user;
}

/**
 * Check if the current user is an admin.
 * Redirects to /clubs if not admin.
 */
export async function requireAdmin() {
  const user = await getCurrentUser();

  if (user.role !== "ADMIN") {
    redirect("/clubs");
  }

  return user;
}

/**
 * Check if the current user is an admin without redirecting.
 * Returns true if admin, false otherwise.
 */
export async function isAdmin() {
  const session = await getSession();

  if (!session?.user) {
    return false;
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  return user?.role === "ADMIN";
}
