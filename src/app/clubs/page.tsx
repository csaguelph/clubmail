import Link from "next/link";

import PageContainer from "@/components/layout/PageContainer";
import { requireAuth } from "@/server/auth-utils";
import { api } from "@/trpc/server";

export default async function ClubsPage() {
  await requireAuth();

  const clubs = await api.clubs.listMyClubs();

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Clubs</h1>
        <p className="mt-2 text-sm text-gray-600">
          View and manage your clubs, email lists, and campaigns
        </p>
      </div>
      {clubs.length === 0 ? (
        <div className="rounded-lg bg-white px-6 py-12 text-center shadow">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No clubs yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            You haven&apos;t been added to any clubs yet. Contact your club&apos;s
            primary contacts or a platform administrator to get access.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <Link
              key={club.id}
              href={`/clubs/${club.slug}`}
              className="group rounded-lg bg-white p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#b1d135]">
                    {club.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">/{club.slug}</p>
                </div>
                {("myRole" in club && club.myRole && typeof club.myRole === "string") ? (
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    {club.myRole.replace("CLUB_", "")}
                  </span>
                ) : null}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-xs text-gray-500">Members</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {club._count.members}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Subscribers</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {club._count.subscribers}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Campaigns</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {club._count.campaigns}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {club.settings?.fromName ?? "No sender configured"}
                </span>
                <svg
                  className="h-5 w-5 text-gray-400 group-hover:text-[#b1d135]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
