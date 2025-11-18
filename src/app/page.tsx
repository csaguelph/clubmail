import { BarChart3, Layout, Mail, Shield, Users, Zap } from "lucide-react";
import Link from "next/link";

import { getSession } from "@/server/better-auth/server";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await getSession();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-[#088ecb] to-[#0667a0] text-white">
          <div className="container mx-auto px-4 py-20">
            <div className="flex flex-col items-center text-center">
              <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
                CSA <span className="text-[#b1d135]">Club</span>Mail
              </h1>
              <p className="mb-4 max-w-3xl text-xl text-slate-200 sm:text-2xl">
                Purpose-built email campaigns for CSA clubs and student leaders
              </p>
              <p className="mb-10 max-w-2xl text-lg text-slate-300">
                Launch beautiful newsletters, keep member lists tidy, and stay
                on top of engagement—no marketing degree required!
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                {!session ? (
                  <Link
                    href="/login"
                    className="rounded-lg bg-[#b1d135] px-8 py-4 text-lg font-semibold text-slate-900 transition hover:bg-[#a0c030]"
                  >
                    Get Started
                  </Link>
                ) : (
                  <Link
                    href="/clubs"
                    className="rounded-lg bg-[#b1d135] px-8 py-4 text-lg font-semibold text-slate-900 transition hover:bg-[#a0c030]"
                  >
                    Go to My Clubs
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-[0.3em] text-slate-400 uppercase">
              Platform Highlights
            </p>
            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              Everything you need to engage your members
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              CSA ClubMail brings the editor, subscriber tools, and delivery
              infrastructure together so your club can focus on storytelling
              instead of stitching different services.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-xl bg-white p-8 shadow-lg transition hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#b1d135]/10">
                <Layout className="h-6 w-6 text-[#b1d135]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                Rich Email Builder
              </h3>
              <p className="text-slate-600">
                Compose polished newsletters with our drag-and-drop editor -
                brand colors and reusable blocks included.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl bg-white p-8 shadow-lg transition hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#b1d135]/10">
                <Users className="h-6 w-6 text-[#b1d135]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                Subscriber Management
              </h3>
              <p className="text-slate-600">
                Import via CSV, sync GryphLife data, and organize subscribers
                into curated lists with custom fields.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl bg-white p-8 shadow-lg transition hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#b1d135]/10">
                <Mail className="h-6 w-6 text-[#b1d135]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                Reliable Delivery
              </h3>
              <p className="text-slate-600">
                Keep campaigns on schedule with our reliable email delivery
                infrastructure, including automatic unsubscribe links, bounce
                management, and complaint handling.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl bg-white p-8 shadow-lg transition hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#b1d135]/10">
                <Shield className="h-6 w-6 text-[#b1d135]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                Roles & Permissions
              </h3>
              <p className="text-slate-600">
                Assign Owner, Editor, and Viewer roles so club exec teams can
                collaborate confidently.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-xl bg-white p-8 shadow-lg transition hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#b1d135]/10">
                <BarChart3 className="h-6 w-6 text-[#b1d135]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                Actionable Insights
              </h3>
              <p className="text-slate-600">
                Monitor opens, clicks, bounces, and complaints in real time so
                you can celebrate wins or clean lists before the next send.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-xl bg-white p-8 shadow-lg transition hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#b1d135]/10">
                <Zap className="h-6 w-6 text-[#b1d135]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                Launch in Minutes
              </h3>
              <p className="text-slate-600">
                Draft, test, and launch in a single workflow that keeps
                approvals, scheduling, and delivery all in one place.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Section */}
        {/* <div className="bg-linear-to-r from-white via-slate-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  metric: "30+",
                  label: "CSA clubs onboarded",
                  detail: "Centralized into one shared platform",
                },
                {
                  metric: "50K+",
                  label: "Emails delivered",
                  detail: "Powered by AWS SES infrastructure",
                },
                {
                  metric: "3 min",
                  label: "Average launch time",
                  detail: "From draft to scheduled send",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200 bg-white/60 p-8 shadow-sm backdrop-blur"
                >
                  <p className="text-4xl font-extrabold text-[#0667a0]">
                    {stat.metric}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* How It Works Section */}
        <div className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-4xl font-bold text-slate-900">
              How it works
            </h2>

            <div className="mx-auto max-w-4xl space-y-8">
              <div className="flex gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b1d135] font-bold text-slate-900">
                  1
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">
                    Set up your club
                  </h3>
                  <p className="text-slate-600">
                    Configure your club settings, email preferences, and add
                    staff members with the appropriate roles.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b1d135] font-bold text-slate-900">
                  2
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">
                    Add subscribers
                  </h3>
                  <p className="text-slate-600">
                    Import your members via CSV, GryphLife, or add them
                    individually. Create email lists to organize your audience.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b1d135] font-bold text-slate-900">
                  3
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">
                    Create your campaign
                  </h3>
                  <p className="text-slate-600">
                    Use our drag-and-drop editor to build beautiful emails. Add
                    blocks, customize content, and preview your design.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b1d135] font-bold text-slate-900">
                  4
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">
                    Send and track
                  </h3>
                  <p className="text-slate-600">
                    Send test emails to verify everything looks perfect, then
                    send to your entire list and monitor delivery stats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-br from-[#088ecb] to-[#0667a0] py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-4xl font-bold">
              Ready to engage your club members?
            </h2>
            <p className="mb-10 text-xl text-slate-200">
              {session
                ? "Start creating your first campaign today"
                : "Sign in to get started"}
            </p>
            {!session ? (
              <Link
                href="/login"
                className="inline-block rounded-lg bg-[#b1d135] px-8 py-4 text-lg font-semibold text-slate-900 transition hover:bg-[#a0c030]"
              >
                Get Started
              </Link>
            ) : (
              <Link
                href="/clubs"
                className="inline-block rounded-lg bg-[#b1d135] px-8 py-4 text-lg font-semibold text-slate-900 transition hover:bg-[#a0c030]"
              >
                Go to My Clubs
              </Link>
            )}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
