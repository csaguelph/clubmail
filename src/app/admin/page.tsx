import Link from "next/link";
import {
  Building2,
  Mail,
  Send,
  TrendingUp,
  MousePointerClick,
  User,
  Calendar,
  type LucideIcon,
} from "lucide-react";

import ClubCSVImport from "@/components/admin/ClubCSVImport";
import ClubsList from "@/components/admin/ClubsList";
import PageContainer from "@/components/layout/PageContainer";
import { requireAdmin } from "@/server/auth-utils";
import { api } from "@/trpc/server";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconColor: string;
  bgColor: string;
};

function StatCard({
  icon: Icon,
  label,
  value,
  iconColor,
  bgColor,
}: StatCardProps) {
  const displayValue =
    typeof value === "number" ? value.toLocaleString() : value;

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {displayValue}
          </p>
        </div>
        <div className={`rounded-full ${bgColor} p-3`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}

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
      {/* Key Metrics */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Platform Overview
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Building2}
            label="Active Clubs"
            value={stats.activeClubs}
            iconColor="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={Send}
            label="Total Campaigns"
            value={stats.totalCampaigns}
            iconColor="text-orange-600"
            bgColor="bg-orange-50"
          />
          <StatCard
            icon={Mail}
            label="Total Subscribers"
            value={stats.totalSubscribers}
            iconColor="text-green-600"
            bgColor="bg-green-50"
          />
          <StatCard
            icon={User}
            label="Active Users"
            value={stats.activeUsers}
            iconColor="text-indigo-600"
            bgColor="bg-indigo-50"
          />
        </div>
      </div>

      {/* Email & Campaign Metrics */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Email & Campaigns
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={Send}
            label="All-Time Emails Sent"
            value={stats.allTimeEmailsSent}
            iconColor="text-emerald-600"
            bgColor="bg-emerald-50"
          />
          <StatCard
            icon={Calendar}
            label="Emails (Last 30 Days)"
            value={stats.emailsLast30Days}
            iconColor="text-teal-600"
            bgColor="bg-teal-50"
          />
          <StatCard
            label="Emails (Last 7 Days)"
            value={stats.emailsLast7Days}
            icon={TrendingUp}
            iconColor="text-cyan-600"
            bgColor="bg-cyan-50"
          />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={Send}
            label="Sent Campaigns"
            value={stats.sentCampaigns}
            iconColor="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={TrendingUp}
            label="Total Opens"
            value={stats.totalEmailOpens}
            iconColor="text-green-600"
            bgColor="bg-green-50"
          />
          <StatCard
            icon={MousePointerClick}
            label="Total Clicks"
            value={stats.totalEmailClicks}
            iconColor="text-purple-600"
            bgColor="bg-purple-50"
          />
        </div>
      </div>

      {/* Clubs List with Search and Pagination */}
      <div className="mt-8">
        <ClubsList />
      </div>
    </PageContainer>
  );
}
