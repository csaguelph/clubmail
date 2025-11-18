import Link from "next/link";

import { AdminDropdown } from "@/components/layout/AdminDropdown";
import { NavLink } from "@/components/layout/NavLink";
import { UserMenu } from "@/components/layout/UserMenu";
import { Button } from "@/components/ui";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    image?: string | null;
  } | null;
  userRole?: "ADMIN" | "USER";
}

export function Header({ user, userRole }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-[#b1d135]">Club</span>
                <span className="text-gray-900">Mail</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          {user && (
            <nav
              className="hidden md:flex md:space-x-8"
              aria-label="Main navigation"
            >
              <NavLink href="/clubs">My Clubs</NavLink>
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
