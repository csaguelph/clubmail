import Link from "next/link";

import PageContainer from "@/components/layout/PageContainer";
import { requireAdmin } from "@/server/auth-utils";
import { api } from "@/trpc/server";

export default async function AdminPage() {
  await requireAdmin();

  // Get clubs list
  const { clubs } = await api.admin.listClubs({ limit: 50 });

  return (
    <PageContainer>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage clubs and platform settings
          </p>
        </div>
        <Link
          href="/admin/clubs/new"
          className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#9fbc2f]"
        >
          Create Club
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {/* Stats */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Clubs</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{clubs.length}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Clubs</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {clubs.filter((c) => c.isActive).length}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Members</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {clubs.reduce((sum, c) => sum + c._count.members, 0)}
          </p>
        </div>
      </div>

      {/* Clubs List */}
      <div className="mt-8 rounded-lg bg-white shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Clubs</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {clubs.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-gray-500">No clubs yet.</p>
              <Link
                href="/admin/clubs/new"
                className="mt-4 inline-block text-sm font-medium text-[#b1d135] hover:text-[#9fbc2f]"
              >
                Create your first club
              </Link>
            </div>
          ) : (
            clubs.map((club) => (
              <Link
                key={club.id}
                href={`/admin/clubs/${club.id}`}
                className="block px-6 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {club.name}
                      </h3>
                      {!club.isActive && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                          Inactive
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span>/{club.slug}</span>
                      <span>•</span>
                      <span>{club._count.members} members</span>
                      <span>•</span>
                      <span>{club._count.campaigns} campaigns</span>
                      <span>•</span>
                      <span>{club._count.subscribers} subscribers</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">
                      Created {new Date(club.createdAt).toLocaleDateString()}
                    </span>
                    <svg
                      className="h-5 w-5 text-gray-400"
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
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </PageContainer>
  );
}
