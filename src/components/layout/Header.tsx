"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    image?: string | null;
  } | null;
  userRole?: "ADMIN" | "USER";
}

export function Header({ user, userRole }: HeaderProps) {
  const pathname = usePathname();
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + "/");
  };

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
            <nav className="hidden md:flex md:space-x-8">
              <Link
                href="/clubs"
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                  isActive("/clubs")
                    ? "border-[#b1d135] text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                My Clubs
              </Link>
              {userRole === "ADMIN" && (
                <div
                  className="relative"
                  onMouseEnter={() => setAdminDropdownOpen(true)}
                  onMouseLeave={() => setAdminDropdownOpen(false)}
                >
                  <Link
                    href="/admin"
                    className={`inline-flex items-center gap-1 border-b-2 px-1 pt-1 text-sm font-medium ${
                      isActive("/admin")
                        ? "border-[#b1d135] text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Admin
                    <svg
                      className={`h-3.5 w-3.5 transition-transform ${adminDropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Link>
                  {adminDropdownOpen && (
                    <div className="absolute left-0 top-full z-50 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
                      <div className="py-2">
                        <Link
                          href="/admin"
                          className={`block px-4 py-2 text-sm transition-colors ${
                            pathname === "/admin"
                              ? "bg-gray-50 font-medium text-gray-900"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/admin/scheduled-campaigns"
                          className={`block px-4 py-2 text-sm transition-colors ${
                            pathname === "/admin/scheduled-campaigns"
                              ? "bg-gray-50 font-medium text-gray-900"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          Scheduled Campaigns
                        </Link>
                        <Link
                          href="/admin/media"
                          className={`block px-4 py-2 text-sm transition-colors ${
                            pathname === "/admin/media"
                              ? "bg-gray-50 font-medium text-gray-900"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          Media Library
                        </Link>
                        <Link
                          href="/admin/platform-settings"
                          className={`block px-4 py-2 text-sm transition-colors ${
                            pathname === "/admin/platform-settings"
                              ? "bg-gray-50 font-medium text-gray-900"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          Platform Settings
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </nav>
          )}

          {/* User menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-gray-500">{user.email}</p>
                </div>
                <form action="/api/auth/sign-out" method="POST">
                  <button
                    type="submit"
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/api/auth/sign-in"
                className="rounded-md bg-[#b1d135] px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#9fbc2f]"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
