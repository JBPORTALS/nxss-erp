import { api } from "~/trpc/server";
import { EventDetialsForm } from "./event-detials-form";

export default async function page({
  params,
}: {
  params: { event_id: string };
}) {
  const event = await api.calendar.getEventDetails({
    id: parseInt(params.event_id),
  });

  return (
    <div className="flex justify-center p-12">
      <EventDetialsForm {...{ event }} />
    </div>
  );
}
