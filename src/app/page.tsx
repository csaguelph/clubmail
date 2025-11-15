import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/server/better-auth";
import { getSession } from "@/server/better-auth/server";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await getSession();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Clubs <span className="text-[#b1d135]">Mail</span>
          </h1>
          <p className="text-xl text-white/80">
            Emailing platform for student clubs
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="/clubs"
            >
              <h3 className="text-2xl font-bold">My Clubs →</h3>
              <div className="text-lg">
                View and manage your clubs, email lists, and campaigns.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="/admin"
            >
              <h3 className="text-2xl font-bold">Admin Panel →</h3>
              <div className="text-lg">
                Create and manage clubs across the platform (admin only).
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              {!session ? (
                <form>
                  <button
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                    formAction={async () => {
                      "use server";
                      const res = await auth.api.signInSocial({
                        body: {
                          provider: "github",
                          callbackURL: "/",
                        },
                      });
                      if (!res.url) {
                        throw new Error("No URL returned from signInSocial");
                      }
                      redirect(res.url);
                    }}
                  >
                    Sign in with Github
                  </button>
                </form>
              ) : (
                <form>
                  <button
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                    formAction={async () => {
                      "use server";
                      await auth.api.signOut({
                        headers: await headers(),
                      });
                      redirect("/");
                    }}
                  >
                    Sign out
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
