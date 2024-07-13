"use client";

import { OrganizationProfile, useAuth, useUser } from "@clerk/nextjs";

export default function Page() {
  const { signOut } = useAuth();
  const { user } = useUser();
  return <OrganizationProfile />;
}
