import { LogOut } from "lucide-react";

import { Button } from "@/components/ui";

interface UserMenuProps {
  user: {
    name: string;
    email: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#b1d135] to-[#83a124] text-sm font-semibold text-gray-900 shadow-sm"
        aria-hidden="true"
      >
        {user.name.charAt(0).toUpperCase()}
      </div>

      <div className="hidden min-w-0 text-right text-sm leading-tight sm:block">
        <p className="font-semibold text-gray-900">{user.name}</p>
        <p className="truncate text-xs text-gray-500">{user.email}</p>
      </div>

      <form action="/api/auth/logout" method="POST">
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-full p-0 text-gray-500 hover:text-gray-900"
          aria-label="Sign out"
        >
          <LogOut className="h-6 w-6" aria-hidden="true" />
        </Button>
      </form>
    </div>
  );
}
