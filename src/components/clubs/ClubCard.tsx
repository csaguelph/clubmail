import Link from "next/link";

import type { RouterOutputs } from "@/trpc/react";

type ClubCardData =
  RouterOutputs["clubs"]["listMyClubsInfinite"]["clubs"][number];

interface ClubCardProps {
  club: ClubCardData;
}

export function ClubCard({ club }: ClubCardProps) {
  const roleLabel =
    "myRole" in club && club.myRole && typeof club.myRole === "string"
      ? club.myRole.replace("CLUB_", "")
      : null;

  return (
    <Link
      href={`/clubs/${club.slug}`}
      className="group rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#b1d135]">
            {club.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">/{club.slug}</p>
        </div>
        <div className="flex items-center gap-2">
          {roleLabel && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
              {roleLabel}
            </span>
          )}
          <svg
            className="h-5 w-5 text-gray-400 group-hover:text-[#b1d135]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>

      <ClubStats
        members={club._count.members}
        subscribers={club._count.subscribers}
        campaigns={club._count.campaigns}
      />
    </Link>
  );
}

interface ClubStatsProps {
  members: number;
  subscribers: number;
  campaigns: number;
}

function ClubStats({ members, subscribers, campaigns }: ClubStatsProps) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
      <div>
        <p className="text-xs text-gray-500">Members</p>
        <p className="mt-1 text-lg font-semibold text-gray-900">{members}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Subscribers</p>
        <p className="mt-1 text-lg font-semibold text-gray-900">
          {subscribers}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Campaigns</p>
        <p className="mt-1 text-lg font-semibold text-gray-900">{campaigns}</p>
      </div>
    </div>
  );
}
