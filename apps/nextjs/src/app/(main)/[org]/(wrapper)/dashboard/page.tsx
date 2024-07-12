"use client";

import { useAuth, useUser } from "@clerk/nextjs";

export default function Page() {
  const { signOut } = useAuth();
  const { user } = useUser();
  return (
    <div>
      <h1 className="text-lg">
        Hey, <b>{user?.emailAddresses[0]?.emailAddress}</b>
      </h1>
    </div>
  );
}
