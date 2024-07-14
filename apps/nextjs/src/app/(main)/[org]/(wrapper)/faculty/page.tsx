"use client";

import { useAuth, useUser } from "@clerk/nextjs";

import {
  FacultyColumns,
  staffMembers,
} from "~/app/_components/faculty-columns";
import { FacultyDataTable } from "~/app/_components/faculty-tabel";

export default function Page() {
  const { signOut } = useAuth();
  const { user } = useUser();
  return (
    <div>
      <FacultyDataTable columns={FacultyColumns} data={staffMembers} />
    </div>
  );
}
