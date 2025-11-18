"use client";

import { useEffect, useRef, useState } from "react";

import { ClubCard } from "@/components/clubs/ClubCard";
import { SearchInput } from "@/components/ui";
import { api } from "@/trpc/react";

export default function MyClubsList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    api.clubs.listMyClubsInfinite.useInfiniteQuery(
      {
        limit: 20,
        search: debouncedSearch || undefined,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const clubs = data?.pages.flatMap((page) => page.clubs) ?? [];

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
        placeholder="Search your clubs by name or slug..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6"
        aria-label="Search your clubs"
      />

      {isLoading ? (
        <ClubsListEmptyState>
          <p className="text-sm text-gray-500">Loading clubs...</p>
        </ClubsListEmptyState>
      ) : clubs.length === 0 ? (
        <ClubsListEmptyState>
          {search ? (
            <>
              <h3 className="text-lg font-medium text-gray-900">
                No clubs found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                No clubs match your search. Try a different search term.
              </p>
            </>
          ) : (
            <>
              <EmptyClubsIcon />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No clubs yet
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                You haven&apos;t been added to any clubs yet. Contact your
                club&apos;s primary contacts or a platform administrator to get
                access.
              </p>
            </>
          )}
        </ClubsListEmptyState>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
          {hasNextPage && (
            <div ref={loadMoreRef} className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                {isFetchingNextPage
                  ? "Loading more clubs..."
                  : "Scroll for more"}
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
}

interface ClubsListEmptyStateProps {
  children: React.ReactNode;
}

function ClubsListEmptyState({ children }: ClubsListEmptyStateProps) {
  return (
    <div className="rounded-lg bg-white px-6 py-12 text-center shadow">
      {children}
    </div>
  );
}

function EmptyClubsIcon() {
  return (
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}
