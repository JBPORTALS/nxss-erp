import React from "react";
import { OrganizationList } from "@clerk/nextjs";

export default function page() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={"/:slug/dashboard"}
      afterCreateOrganizationUrl={"/create-organization"}
    />
  );
}
