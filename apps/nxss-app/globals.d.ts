import "next/navigation";

declare global {
  type Params = {
    semesterId: string;
    orgId: string;
    branchId: string;
  };
}

declare module "next/navigation" {
  function useParams(): Params;
}
