"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AdminDropdown } from "@/components/layout/AdminDropdown";
import { Logo } from "@/components/layout/Logo";
import { NavLink } from "@/components/layout/NavLink";
import { UserMenu } from "@/components/layout/UserMenu";
import { Button } from "@/components/ui";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
  } | null;
  userRole?: "ADMIN" | "USER";
}

export function Header({ user, userRole }: HeaderProps) {
  const pathname = usePathname();
  const isClubsActive =
    pathname === "/clubs" || pathname?.startsWith("/clubs/");

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Navigation */}
          {user && (
            <nav
              className="hidden md:flex md:space-x-8"
              aria-label="Main navigation"
            >
              <NavLink href="/clubs" isActive={isClubsActive}>
                My Clubs
              </NavLink>
              {userRole === "ADMIN" && <AdminDropdown />}
            </nav>
          )}

          {/* User menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm">
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
