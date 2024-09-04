import TestTabsClient from "~/app/_components/tabs/test-tabs";

export default async function Template({ params, children }: any) {
  return (
    <div className="flex flex-col gap-4 pt-4">
      <TestTabsClient />
      <section className="w-full">{children}</section>
    </div>
  );
}
