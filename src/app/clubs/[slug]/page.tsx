import Link from "next/link";
import { ChevronRight, Users, Mail, List, Settings } from "lucide-react";

import { ClubAnalyticsDashboard } from "@/components/clubs/ClubAnalyticsDashboard";
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
  const analytics = await api.clubs.getClubAnalytics({ clubId: clubInfo.id });

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
          <div className="flex items-center gap-3">
            {canEdit && (
              <Link
                href={`/clubs/${slug}/campaigns/new`}
                className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#9fbc2f]"
              >
                New Campaign
              </Link>
            )}
            <Link
              href={`/clubs/${slug}/settings`}
              className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
            >
              <Settings className="h-4 w-4" />
              Manage Settings
            </Link>
          </div>
        }
      />
      {/* Stats & Quick Actions */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Subscribers */}
        <Link
          href={`/clubs/${slug}/subscribers`}
          className="group relative rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-3">
                <div className="shrink-0">
                  <div className="rounded-lg bg-green-100 p-2">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-500">
                  Subscribers
                </h3>
              </div>
              <p className="text-3xl font-semibold text-gray-900">
                {club._count.subscribers}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 transition group-hover:text-[#b1d135]" />
          </div>
        </Link>

        {/* Campaigns */}
        <Link
          href={`/clubs/${slug}/campaigns`}
          className="group relative rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-3">
                <div className="shrink-0">
                  <div className="rounded-lg bg-purple-100 p-2">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-500">Campaigns</h3>
              </div>
              <p className="text-3xl font-semibold text-gray-900">
                {club._count.campaigns}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 transition group-hover:text-[#b1d135]" />
          </div>
        </Link>

        {/* Email Lists */}
        <Link
          href={`/clubs/${slug}/lists`}
          className="group relative rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-3">
                <div className="shrink-0">
                  <div className="rounded-lg bg-orange-100 p-2">
                    <List className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-500">
                  Email Lists
                </h3>
              </div>
              <p className="text-3xl font-semibold text-gray-900">
                {club.emailLists.length}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 transition group-hover:text-[#b1d135]" />
          </div>
        </Link>

        {/* Staff */}
        {club.myRole === "CLUB_OWNER" ? (
          <Link
            href={`/clubs/${slug}/staff`}
            className="group relative rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-3">
                  <div className="shrink-0">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-500">Staff</h3>
                </div>
                <p className="text-3xl font-semibold text-gray-900">
                  {club.members.filter((m) => m.user.role !== "ADMIN").length}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 transition group-hover:text-[#b1d135]" />
            </div>
          </Link>
        ) : (
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-3 flex items-center gap-3">
              <div className="shrink-0">
                <div className="rounded-lg bg-blue-100 p-2">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Staff</h3>
            </div>
            <p className="text-3xl font-semibold text-gray-900">
              {club.members.filter((m) => m.user.role !== "ADMIN").length}
            </p>
          </div>
        )}
      </div>

      {/* Analytics Dashboard */}
      <div className="mt-8">
        <ClubAnalyticsDashboard
          clubId={clubInfo.id}
          clubSlug={slug}
          initialAnalytics={analytics}
        />
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
