// import { redirect } from "next/navigation";

// const validSteps = ["", "exam-pattern", "welcome"];

export default async function CreateOrganizationPage({
  params,
}: {
  params: { step?: string[] };
}) {
  // const currentStep = params?.step?.[0] || "";

  // if (!validSteps.includes(currentStep)) {
  //   redirect("/create-organization");
  // }

  return (
    <div className="flex min-h-screen justify-center pt-28">
      No organizaiton created
    </div>
  );
}
