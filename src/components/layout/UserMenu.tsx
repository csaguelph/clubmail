import Image from "next/image";

import { Button } from "@/components/ui";

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="flex items-center space-x-3">
      {user.image ? (
        <Image
          src={user.image}
          alt={user.name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full ring-2 ring-white"
        />
      ) : (
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b1d135] text-sm font-semibold text-gray-900 ring-2 ring-white"
          aria-hidden="true"
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="text-sm">
        <p className="font-medium text-gray-900">{user.name}</p>
        <p className="text-gray-500">{user.email}</p>
      </div>
      <form action="/api/auth/logout" method="POST">
        <Button type="submit" variant="secondary" size="sm">
          Sign out
        </Button>
      </form>
    </div>
  );
}
