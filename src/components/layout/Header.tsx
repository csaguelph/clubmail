"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { Menu, X } from "lucide-react";

import { AdminDropdown } from "@/components/layout/AdminDropdown";
import { Logo } from "@/components/layout/Logo";
import { NavLink } from "@/components/layout/NavLink";
import { UserMenu } from "@/components/layout/UserMenu";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adminLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/scheduled-campaigns", label: "Scheduled Campaigns" },
    { href: "/admin/media", label: "Media Library" },
    { href: "/admin/platform-settings", label: "Platform Settings" },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + "/");
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Logo />
            {/* Mobile menu button */}
            {user && (
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 md:hidden"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open main menu"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Desktop Navigation */}
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

      {/* Mobile menu */}
      {user && (
        <Transition show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="md:hidden" onClose={setMobileMenuOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 z-50 bg-black/30" />
            </Transition.Child>
            <div className="fixed inset-0 z-50 flex">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pt-5 pb-2">
                    <button
                      type="button"
                      className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                      aria-label="Close menu"
                    >
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-6 space-y-1 px-4">
                    <Link
                      href="/clubs"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block rounded-md px-3 py-2 text-base font-semibold",
                        isClubsActive
                          ? "bg-gray-50 text-gray-900"
                          : "text-gray-700 hover:bg-gray-50",
                      )}
                    >
                      My Clubs
                    </Link>
                    {userRole === "ADMIN" && (
                      <>
                        <div className="border-t border-gray-200 pt-4">
                          <p className="px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                            Admin
                          </p>
                        </div>
                        <div className="mt-2 space-y-1">
                          {adminLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "block rounded-md px-3 py-2 text-base font-medium",
                                isActive(link.href)
                                  ? "bg-gray-50 text-gray-900"
                                  : "text-gray-700 hover:bg-gray-50",
                              )}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}
    </header>
  );
}
