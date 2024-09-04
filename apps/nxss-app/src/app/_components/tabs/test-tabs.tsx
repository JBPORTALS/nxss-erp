"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { TabItem, Tabs } from "@nxss/ui/tabs";

export default function TestTabsClient() {
  const { org, branch_id, sem_id, subject_id, type_id } = useParams();
  const pathname = usePathname();

  // Array of test numbers
  const testNumbers: number[] = [1, 2]; // Empty array to simulate no data

  return (
    <div>
      {testNumbers.length > 0 ? (
        <Tabs>
          {testNumbers.map((testNumber) => (
            <Link
              key={testNumber}
              href={`/${org}/branch/${branch_id}/${sem_id}/subject/${subject_id}/test/${type_id}/${testNumber}`}
            >
              <TabItem
                isActive={
                  pathname ===
                  `/${org}/branch/${branch_id}/${sem_id}/subject/${subject_id}/test/${type_id}/${testNumber}`
                }
              >
                WrittenTest {testNumber}
              </TabItem>
            </Link>
          ))}
        </Tabs>
      ) : (
        <div className="">no data</div>
      )}
    </div>
  );
}
