"use client";

import { useAuth, useUser } from "@clerk/nextjs";

export default function Page() {
  const { signOut } = useAuth();
  const { user } = useUser();
  return (
    <div className="flex w-full flex-col gap-4">
      <span>Invitations Page</span>
    </div>
  );
}
