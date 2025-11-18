import { Mail, Settings, Trash2, UserCog, Users } from "lucide-react";
import Link from "next/link";

import type { RouterOutputs } from "@/trpc/react";
import { cn } from "@/lib/utils";

type ClubListItemData = RouterOutputs["admin"]["listClubs"]["clubs"][number];

interface ClubListItemProps {
  club: ClubListItemData;
  onDeleteClick: (e: React.MouseEvent, club: ClubListItemData) => void;
}

export function ClubListItem({ club, onDeleteClick }: ClubListItemProps) {
  return (
    <div className="group relative px-6 py-4 transition hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 flex-1 items-center space-x-4">
          <Link href={`/clubs/${club.slug}`} className="min-w-0 flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="text-sm font-medium text-gray-900">{club.name}</h3>
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

        <ClubActionButtons club={club} onDeleteClick={onDeleteClick} />
      </div>
    </div>
  );
}

interface ClubActionButtonsProps {
  club: ClubListItemData;
  onDeleteClick: (e: React.MouseEvent, club: ClubListItemData) => void;
}

function ClubActionButtons({ club, onDeleteClick }: ClubActionButtonsProps) {
  const actions = [
    {
      href: `/clubs/${club.slug}/campaigns`,
      icon: Mail,
      label: `Go to ${club.name} campaigns`,
      title: "Go to campaigns",
      hoverClass: "hover:bg-blue-50 hover:text-blue-600",
      focusClass: "focus:ring-blue-500",
    },
    {
      href: `/clubs/${club.slug}/subscribers`,
      icon: Users,
      label: `Go to ${club.name} subscribers`,
      title: "Go to subscribers",
      hoverClass: "hover:bg-green-50 hover:text-green-600",
      focusClass: "focus:ring-green-500",
    },
    {
      href: `/clubs/${club.slug}/staff`,
      icon: UserCog,
      label: `Go to ${club.name} staff`,
      title: "Go to staff",
      hoverClass: "hover:bg-purple-50 hover:text-purple-600",
      focusClass: "focus:ring-purple-500",
    },
    {
      href: `/clubs/${club.slug}/settings`,
      icon: Settings,
      label: `Go to ${club.name} settings`,
      title: "Go to settings",
      hoverClass: "hover:bg-gray-100 hover:text-gray-700",
      focusClass: "focus:ring-gray-500",
    },
  ];

  return (
    <div className="ml-4 flex items-center space-x-1">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.href}
            href={action.href}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "rounded-md p-2 text-gray-400 transition",
              action.hoverClass,
              "focus:ring-2 focus:outline-none",
              action.focusClass,
            )}
            title={action.title}
            aria-label={action.label}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </Link>
        );
      })}
      <button
        onClick={(e) => onDeleteClick(e, club)}
        className={cn(
          "rounded-md p-2 text-gray-400 transition",
          "hover:bg-red-50 hover:text-red-600",
          "focus:ring-2 focus:ring-red-500 focus:outline-none",
        )}
        title="Delete club"
        aria-label={`Delete ${club.name}`}
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
