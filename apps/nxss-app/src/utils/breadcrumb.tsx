import { useParams, usePathname } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

import { api } from "~/trpc/react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export const usePathMap = (): BreadcrumbItem[] => {
  const params = useParams() as Record<any, string>;
  const pathname = usePathname();
  const { data } = api.branch.getDetails.useQuery(
    { id: (params.branch_id as string) ?? "" },
    { enabled: !!params.branch_id },
  );
  const { organization } = useOrganization();
  const batch = api.batches.getDetails.useQuery(params.batch_id!, {
    enabled: !!params.batch_id,
  });
  const section = api.sections.getDetails.useQuery(params.section_id!, {
    enabled: !![params.section_id],
  });

  const getOrganizationName = () => organization?.name ?? ""; // Placeholder
  const getBranchName = () => data?.name ?? ""; // Use branch name from API

  const dashboardItem: BreadcrumbItem = {
    label: getOrganizationName(),
    href: `/${params.org}/dashboard`,
  };

  const otherPaths: BreadcrumbItem[] = [
    { label: "Faculty", href: `/${params.org}/faculty` },
    { label: "Calendar", href: `/${params.org}/calendar` },
    { label: "Branches", href: `/${params.org}/branches` },
    {
      label: getBranchName(),
      href: `/${params.org}/branches/${params.branch_id}`,
    },
    {
      label: "Faculty",
      href: `/${params.org}/branches/${params.branch_id}/s/${params.semester_id}/faculty`,
    },
    {
      label: "Student Profiles",
      href: `/${params.org}/branches/${params.branch_id}/s/${params.semester_id}/students/profiles`,
    },
    {
      label: "Sections & Batches",
      href: `/${params.org}/branches/${params.branch_id}/s/${params.semester_id}/students/sections-batches`,
    },
    {
      label: `Section ${section.data?.name ?? ""} / ${batch.data?.name ?? ""}`,
      href: `/${params.org}/branches/${params.branch_id}/s/${params.semester_id}/students/sections-batches/${params.section_id}/${params.batch_id}`,
    },
  ];

  const filteredPaths = otherPaths.filter(
    (item) => pathname.startsWith(item.href) || pathname === item.href,
  );

  // Sort the filtered paths by the length of their href to ensure correct order
  filteredPaths.sort((a, b) => a.href.length - b.href.length);

  // Always add the dashboard item at the beginning
  return [dashboardItem, ...filteredPaths];
};
