import React from "react";

import TestTabsClient from "~/app/_components/tabs/test-tabs";

export default function page() {
  return (
    <div className="flex flex-col gap-4 pt-4">
      <TestTabsClient />
    </div>
  );
}
