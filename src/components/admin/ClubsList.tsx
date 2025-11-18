"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import DeleteClubDialog from "@/components/admin/DeleteClubDialog";
import { ClubListItem } from "@/components/admin/ClubListItem";
import { SearchInput } from "@/components/ui";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/react";

type Club = RouterOutputs["admin"]["listClubs"]["clubs"][number];

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
      void utils.admin.listClubs.invalidate();
      void utils.admin.getClubStats.invalidate();
      setDeleteDialogOpen(false);
      setClubToDelete(null);
      router.refresh();
    },
    onError: (error) => {
      alert(`Failed to delete club: ${error.message}`);
    },
  });

  const handleDeleteClick = (e: React.MouseEvent, club: Club) => {
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
      <SearchInput
        placeholder="Search clubs by name or slug..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6"
        aria-label="Search clubs"
      />

      <div className="rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">All Clubs</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <ClubsListEmptyState>
              <p className="text-sm text-gray-500">Loading clubs...</p>
            </ClubsListEmptyState>
          ) : clubs.length === 0 ? (
            <ClubsListEmptyState>
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
            </ClubsListEmptyState>
          ) : (
            <>
              {clubs.map((club) => (
                <ClubListItem
                  key={club.id}
                  club={club}
                  onDeleteClick={handleDeleteClick}
                />
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

interface ClubsListEmptyStateProps {
  children: React.ReactNode;
}

function ClubsListEmptyState({ children }: ClubsListEmptyStateProps) {
  return <div className="px-6 py-12 text-center">{children}</div>;
}
