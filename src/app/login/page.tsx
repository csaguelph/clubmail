import { redirect } from "next/navigation";

import { env } from "@/env";
import { auth } from "@/server/better-auth";
import { getSession } from "@/server/better-auth/server";

export default async function LoginPage() {
  const session = await getSession();

  // If already logged in, redirect to clubs
  if (session) {
    redirect("/clubs");
  }

  // Check if GitHub is configured
  const isGitHubEnabled =
    !!env.BETTER_AUTH_GITHUB_CLIENT_ID &&
    !!env.BETTER_AUTH_GITHUB_CLIENT_SECRET;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white px-8 py-10 shadow-xl">
          {/* Logo */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold">
              <span className="text-[#b1d135]">Club</span>
              <span className="text-gray-900">Mail</span>
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Sign-in Options */}
          <div className="space-y-4">
            {/* Microsoft Sign-in */}
            <form>
              <button
                className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 bg-white px-6 py-3.5 text-base font-semibold text-gray-900 transition hover:border-[#088ecb] hover:bg-gray-50"
                formAction={async () => {
                  "use server";
                  const res = await auth.api.signInSocial({
                    body: {
                      provider: "microsoft",
                      callbackURL: "/clubs",
                    },
                  });
                  if (!res.url) {
                    throw new Error("No URL returned from signInSocial");
                  }
                  redirect(res.url);
                }}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="10" height="10" fill="#F25022" />
                  <rect x="11" width="10" height="10" fill="#7FBA00" />
                  <rect y="11" width="10" height="10" fill="#00A4EF" />
                  <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
                </svg>
                Continue with Microsoft
              </button>
            </form>

            {/* GitHub Sign-in - Only show if configured */}
            {isGitHubEnabled && (
              <form>
                <button
                  className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 bg-white px-6 py-3.5 text-base font-semibold text-gray-900 transition hover:border-gray-400 hover:bg-gray-50"
                  formAction={async () => {
                    "use server";
                    const res = await auth.api.signInSocial({
                      body: {
                        provider: "github",
                        callbackURL: "/clubs",
                      },
                    });
                    if (!res.url) {
                      throw new Error("No URL returned from signInSocial");
                    }
                    redirect(res.url);
                  }}
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Continue with GitHub
                </button>
              </form>
            )}
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">
                University of Guelph only
              </span>
            </div>
          </div>

          {/* Info text */}
          <p className="text-center text-sm text-gray-500">
            Microsoft sign-in is restricted to{" "}
            <span className="font-medium text-gray-700">@uoguelph.ca</span>{" "}
            email addresses
          </p>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
          >
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
