"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { api } from "@/trpc/react";

export default function ClubsList() {
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
                <Link
                  key={club.id}
                  href={`/admin/clubs/${club.id}`}
                  className="block px-6 py-4 transition hover:bg-gray-50"
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
    </>
  );
}
