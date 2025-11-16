import Link from "next/link";

import { ClubPageHeader } from "@/components/layout";
import PageContainer from "@/components/layout/PageContainer";
import { requireAuth } from "@/server/auth-utils";
import { api } from "@/trpc/server";

export default async function ClubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireAuth();

  const { slug } = await params;
  const clubInfo = await api.clubs.getClubBySlug({ slug });
  const club = await api.clubs.getClubDetails({ clubId: clubInfo.id });

  const canEdit = club.myRole === "CLUB_OWNER" || club.myRole === "CLUB_EDITOR";

  return (
    <PageContainer>
      <ClubPageHeader
        clubName={club.name}
        clubSlug={slug}
        title={club.name}
        description={`Manage email campaigns for ${club.name}`}
        showBreadcrumbs={false}
        action={
          canEdit ? (
            <Link
              href={`/clubs/${slug}/campaigns/new`}
              className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#9fbc2f]"
            >
              New Campaign
            </Link>
          ) : undefined
        }
      />
      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Staff</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {club.members.filter((m) => m.user.role !== "ADMIN").length}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Subscribers</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {club._count.subscribers}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Campaigns</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {club._count.campaigns}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Email Lists</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {club.emailLists.length}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href={`/clubs/${slug}/campaigns`}
          className="group rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
        >
          <div className="flex items-center">
            <div className="shrink-0">
              <svg
                className="h-8 w-8 text-[#b1d135]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#b1d135]">
                Campaigns
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Create and manage email campaigns
              </p>
            </div>
          </div>
        </Link>

        <Link
          href={`/clubs/${slug}/campaigns/scheduled`}
          className="group rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
        >
          <div className="flex items-center">
            <div className="shrink-0">
              <svg
                className="h-8 w-8 text-[#b1d135]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#b1d135]">
                Scheduled Campaigns
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                View campaigns scheduled for delivery
              </p>
            </div>
          </div>
        </Link>

        <Link
          href={`/clubs/${slug}/subscribers`}
          className="group rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
        >
          <div className="flex items-center">
            <div className="shrink-0">
              <svg
                className="h-8 w-8 text-[#b1d135]"
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
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#b1d135]">
                Subscribers
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage your email list
              </p>
            </div>
          </div>
        </Link>

        <Link
          href={`/clubs/${slug}/lists`}
          className="group rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
        >
          <div className="flex items-center">
            <div className="shrink-0">
              <svg
                className="h-8 w-8 text-[#b1d135]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#b1d135]">
                Email Lists
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Create and manage email lists
              </p>
            </div>
          </div>
        </Link>

        {club.myRole === "CLUB_OWNER" && (
          <Link
            href={`/clubs/${slug}/staff`}
            className="group rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
          >
            <div className="flex items-center">
              <div className="shrink-0">
                <svg
                  className="h-8 w-8 text-[#b1d135]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#b1d135]">
                  Staff
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage staff members and roles
                </p>
              </div>
            </div>
          </Link>
        )}

        <Link
          href={`/clubs/${slug}/settings`}
          className="group rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
        >
          <div className="flex items-center">
            <div className="shrink-0">
              <svg
                className="h-8 w-8 text-[#b1d135]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#b1d135]">
                Settings
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Configure club email settings
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Club Info */}
      <div className="mt-8 rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Club Information
          </h2>
        </div>
        <div className="px-6 py-4">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Club Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{club.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Slug</dt>
              <dd className="mt-1 text-sm text-gray-900">/{club.slug}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Your Role</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {club.myRole?.replace("CLUB_", "") ?? "Member"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </PageContainer>
  );
}
