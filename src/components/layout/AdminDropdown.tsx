"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { NavLink } from "@/components/layout/NavLink";
import { cn } from "@/lib/utils";

export function AdminDropdown() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + "/");
  };

  const adminLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/scheduled-campaigns", label: "Scheduled Campaigns" },
    { href: "/admin/media", label: "Media Library" },
    { href: "/admin/platform-settings", label: "Platform Settings" },
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <NavLink
        href="/admin"
        isActive={isActive("/admin")}
        className="gap-1"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Admin
        <svg
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            isOpen && "rotate-180",
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </NavLink>
      {isOpen && (
        <div
          className="absolute top-full left-0 z-50 w-56 rounded-lg border border-gray-200 bg-white shadow-lg"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-2">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                className={cn(
                  "block px-4 py-2 text-sm transition-colors",
                  pathname === link.href
                    ? "bg-gray-50 font-medium text-gray-900"
                    : "text-gray-700 hover:bg-gray-50",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
