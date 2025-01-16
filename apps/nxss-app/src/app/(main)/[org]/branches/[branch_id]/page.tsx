export default async function BranchPage({
  params,
}: {
  params: { branch_id: string; org: string };
}) {
  return (
    <div className="flex h-screen items-center justify-center">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Branch Dashboard
      </h3>
    </div>
  );
}
