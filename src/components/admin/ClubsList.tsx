"use client";

import { Mail, Search, Settings, Trash2, UserCog, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import DeleteClubDialog from "@/components/admin/DeleteClubDialog";
import { api } from "@/trpc/react";

export default function ClubsList() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clubToDelete, setClubToDelete] = useState<{
    id: string;
    name: string;
    stats: { members: number; campaigns: number; subscribers: number };
  } | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    api.admin.listClubs.useInfiniteQuery(
      {
        limit: 50,
        search: debouncedSearch || undefined,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const clubs = data?.pages.flatMap((page) => page.clubs) ?? [];

  const utils = api.useUtils();
  const deleteClubMutation = api.admin.deleteClub.useMutation({
    onSuccess: () => {
      // Invalidate and refetch clubs list
      void utils.admin.listClubs.invalidate();
      void utils.admin.getClubStats.invalidate();
      // Close dialog and reset state
      setDeleteDialogOpen(false);
      setClubToDelete(null);
      router.refresh();
    },
    onError: (error) => {
      alert(`Failed to delete club: ${error.message}`);
    },
  });

  const handleDeleteClick = (
    e: React.MouseEvent,
    club: {
      id: string;
      name: string;
      _count: { members: number; campaigns: number; subscribers: number };
    },
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setClubToDelete({
      id: club.id,
      name: club.name,
      stats: {
        members: club._count.members,
        campaigns: club._count.campaigns,
        subscribers: club._count.subscribers,
      },
    });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (clubToDelete) {
      deleteClubMutation.mutate({ clubId: clubToDelete.id });
    }
  };

  // Automatic infinite scroll
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search clubs by name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 text-sm placeholder-gray-400 focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
          />
        </div>
      </div>

      {/* Clubs List */}
      <div className="rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">All Clubs</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-gray-500">Loading clubs...</p>
            </div>
          ) : clubs.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-gray-500">
                {search
                  ? "No clubs found matching your search."
                  : "No clubs yet."}
              </p>
              {!search && (
                <Link
                  href="/admin/clubs/new"
                  className="mt-4 inline-block text-sm font-medium text-[#b1d135] hover:text-[#9fbc2f]"
                >
                  Create your first club
                </Link>
              )}
            </div>
          ) : (
            <>
              {clubs.map((club) => (
                <div
                  key={club.id}
                  className="group relative px-6 py-4 transition hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex min-w-0 flex-1 items-center space-x-4">
                      <Link
                        href={`/clubs/${club.slug}`}
                        className="min-w-0 flex-1"
                      >
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
                      </Link>

                      <span className="text-sm whitespace-nowrap text-gray-400">
                        Created {new Date(club.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Quick action icons */}
                    <div className="ml-4 flex items-center space-x-1">
                      <Link
                        href={`/clubs/${club.slug}/campaigns`}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-md p-2 text-gray-400 transition hover:bg-blue-50 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        title="Go to campaigns"
                        aria-label={`Go to ${club.name} campaigns`}
                      >
                        <Mail className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/clubs/${club.slug}/subscribers`}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-md p-2 text-gray-400 transition hover:bg-green-50 hover:text-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        title="Go to subscribers"
                        aria-label={`Go to ${club.name} subscribers`}
                      >
                        <Users className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/clubs/${club.slug}/staff`}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-md p-2 text-gray-400 transition hover:bg-purple-50 hover:text-purple-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        title="Go to staff"
                        aria-label={`Go to ${club.name} staff`}
                      >
                        <UserCog className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/clubs/${club.slug}/settings`}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                        title="Go to settings"
                        aria-label={`Go to ${club.name} settings`}
                      >
                        <Settings className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={(e) => handleDeleteClick(e, club)}
                        className="rounded-md p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        title="Delete club"
                        aria-label={`Delete ${club.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {hasNextPage && (
                <div ref={loadMoreRef} className="px-6 py-4 text-center">
                  <p className="text-sm text-gray-500">
                    {isFetchingNextPage
                      ? "Loading more clubs..."
                      : "Scroll for more"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {clubToDelete && (
        <DeleteClubDialog
          isOpen={deleteDialogOpen}
          onClose={() => {
            setDeleteDialogOpen(false);
            setClubToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          clubName={clubToDelete.name}
          clubStats={clubToDelete.stats}
          isDeleting={deleteClubMutation.isPending}
        />
      )}
    </>
  );
}
