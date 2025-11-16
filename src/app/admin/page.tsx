import Link from "next/link";

import ClubCSVImport from "@/components/admin/ClubCSVImport";
import ClubsList from "@/components/admin/ClubsList";
import PageContainer from "@/components/layout/PageContainer";
import { requireAdmin } from "@/server/auth-utils";
import { api } from "@/trpc/server";

export default async function AdminPage() {
  await requireAdmin();

  // Get club stats
  const stats = await api.admin.getClubStats();

  return (
    <PageContainer>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage clubs and platform settings
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/admin/scheduled-campaigns"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Scheduled Campaigns
          </Link>
          <Link
            href="/admin/platform-settings"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Platform Settings
          </Link>
          <ClubCSVImport />
          <Link
            href="/admin/clubs/new"
            className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#9fbc2f]"
          >
            Create Club
          </Link>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        {/* Stats */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Clubs</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.activeClubs}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Members</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.totalMembers}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">
            Total Subscribers
          </h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.totalSubscribers}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Campaigns</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.totalCampaigns}
          </p>
        </div>
      </div>

      {/* Clubs List with Search and Pagination */}
      <div className="mt-8">
        <ClubsList />
      </div>
    </PageContainer>
  );
}
